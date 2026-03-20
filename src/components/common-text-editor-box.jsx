import { useState, useRef, useEffect, useCallback } from 'react';
import '../css/common-text-editor-box.css';

const CommonTextEditorBox = ({
  initialContent = '',
  value = '', // New prop for controlled component behavior
  onChange = () => { },
  onSelectionChange = () => { },
  placeholder = 'Start typing...',
  className = '',
  disabled = false,
  required = false,
  error = false,
  errorMessage = '',
  minHeight = '200px',
  maxHeight = 'none',
  label = ''
}) => {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    insertUnorderedList: false
  });

  // Initialize editor content - prioritize value prop over initialContent
  useEffect(() => {
    if (editorRef.current) {
      const contentToSet = value || initialContent;
      if (contentToSet && editorRef.current.innerHTML !== contentToSet) {
        editorRef.current.innerHTML = contentToSet;
        // Update active formats after setting content
        setTimeout(() => {
          updateActiveFormats();
        }, 10);
      }
    }
  }, [value, initialContent]);

  // Handle value prop changes (controlled component behavior)
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      // Only update if the current content is different from the value prop
      if (editorRef.current.innerHTML !== value) {
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        const startOffset = range ? range.startOffset : 0;
        const endOffset = range ? range.endOffset : 0;
        const startContainer = range ? range.startContainer : null;

        // Set the new content
        editorRef.current.innerHTML = value;

        // Try to restore cursor position
        try {
          if (startContainer && editorRef.current.contains(startContainer)) {
            const newRange = document.createRange();
            newRange.setStart(startContainer, Math.min(startOffset, startContainer.textContent?.length || 0));
            newRange.setEnd(startContainer, Math.min(endOffset, startContainer.textContent?.length || 0));
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        } catch (e) {
          // If cursor restoration fails, just focus the editor
          editorRef.current.focus();
        }

        // Update active formats
        setTimeout(() => {
          updateActiveFormats();
        }, 10);
      }
    }
  }, [value]);

  // Update active formats based on current selection
  const updateActiveFormats = useCallback(() => {
    const formats = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList')
    };

    setActiveFormats(formats);
    onSelectionChange(formats);
  }, [onSelectionChange]);

  // Handle selection change
  const handleSelectionChange = useCallback(() => {
    updateActiveFormats();
  }, [updateActiveFormats]);

  // Handle content change
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent || editorRef.current.innerText || '';

      // Create structured data
      const structuredData = {
        html: content,
        text: textContent,
        formatted: extractFormattedContent(editorRef.current)
      };

      onChange(structuredData);
      updateActiveFormats();
    }
  }, [onChange, updateActiveFormats]);

  // Extract formatted content with structure
  const extractFormattedContent = (element) => {
    const result = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    let node;
    let currentLine = { content: [], lineNumber: 1, alignment: 'left', isList: false };
    let lineNumber = 1;

    while (node = walker.nextNode()) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const parentStyles = getAppliedStyles(node.parentElement);
        const textContent = node.textContent;

        // Check for line breaks
        const lines = textContent.split('\n');
        lines.forEach((line, index) => {
          if (line.trim()) {
            currentLine.content.push({
              text: line,
              styles: parentStyles,
              position: { start: 0, end: line.length }
            });
          }

          if (index < lines.length - 1 || textContent.endsWith('\n')) {
            result.push({ ...currentLine });
            lineNumber++;
            currentLine = { content: [], lineNumber, alignment: 'left', isList: false };
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'BR') {
          result.push({ ...currentLine });
          lineNumber++;
          currentLine = { content: [], lineNumber, alignment: 'left', isList: false };
        } else if (node.tagName === 'DIV' || node.tagName === 'P') {
          const alignment = getAlignment(node);
          currentLine.alignment = alignment;
        } else if (node.tagName === 'UL' || node.tagName === 'LI') {
          currentLine.isList = true;
        }
      }
    }

    if (currentLine.content.length > 0) {
      result.push(currentLine);
    }

    return result;
  };

  // Get applied styles for an element
  const getAppliedStyles = (element) => {
    const styles = {
      bold: false,
      italic: false,
      underline: false
    };

    let current = element;
    while (current && current !== editorRef.current) {
      const tagName = current.tagName?.toLowerCase();
      const computedStyle = window.getComputedStyle(current);

      if (tagName === 'b' || tagName === 'strong' || computedStyle.fontWeight === 'bold' || computedStyle.fontWeight >= 700) {
        styles.bold = true;
      }
      if (tagName === 'i' || tagName === 'em' || computedStyle.fontStyle === 'italic') {
        styles.italic = true;
      }
      if (tagName === 'u' || computedStyle.textDecoration.includes('underline')) {
        styles.underline = true;
      }

      current = current.parentElement;
    }

    return styles;
  };

  // Get text alignment
  const getAlignment = (element) => {
    const style = window.getComputedStyle(element);
    const textAlign = style.textAlign;

    switch (textAlign) {
      case 'center': return 'center';
      case 'right': return 'right';
      case 'justify': return 'justify';
      default: return 'left';
    }
  };

  // Execute formatting command
  const executeCommand = (command, value = null) => {
    if (disabled) return;

    document.execCommand(command, false, value);
    editorRef.current?.focus();

    // Small delay to ensure DOM is updated
    setTimeout(() => {
      updateActiveFormats();
      handleInput();
    }, 10);
  };

  // Handle key events
  const handleKeyDown = (e) => {
    if (disabled) return;

    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          executeCommand('underline');
          break;
      }
    }
  };

  // Add event listeners
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleMouseUp = () => setTimeout(handleSelectionChange, 10);
    const handleKeyUp = () => setTimeout(handleSelectionChange, 10);

    editor.addEventListener('mouseup', handleMouseUp);
    editor.addEventListener('keyup', handleKeyUp);
    editor.addEventListener('input', handleInput);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      editor.removeEventListener('mouseup', handleMouseUp);
      editor.removeEventListener('keyup', handleKeyUp);
      editor.removeEventListener('input', handleInput);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [handleSelectionChange, handleInput]);

  return (
    <div className='common-text-editor-box'>
      <p className='rte-label'>{label}{required ? <span>*</span> : null}</p>
      <div className={`rich-text-editor ${className} ${error ? 'error' : ''}`}>
        {/* Toolbar */}
        <div className="rte-toolbar">
          {/* Text Formatting */}
          <div className="rte-group">
            <button
              type="button"
              className={`rte-btn ${activeFormats.bold ? 'active' : ''}`}
              onClick={() => executeCommand('bold')}
              disabled={disabled}
              title="Bold (Ctrl+B)"
            >
              <strong>B</strong>
            </button>

            <button
              type="button"
              className={`rte-btn ${activeFormats.italic ? 'active' : ''}`}
              onClick={() => executeCommand('italic')}
              disabled={disabled}
              title="Italic (Ctrl+I)"
            >
              <em>I</em>
            </button>

            <button
              type="button"
              className={`rte-btn ${activeFormats.underline ? 'active' : ''}`}
              onClick={() => executeCommand('underline')}
              disabled={disabled}
              title="Underline (Ctrl+U)"
            >
              <u>U</u>
            </button>
          </div>

          {/* List */}
          <div className="rte-group">
            <button
              type="button"
              className={`rte-btn ${activeFormats.insertUnorderedList ? 'active' : ''}`}
              onClick={() => executeCommand('insertUnorderedList')}
              disabled={disabled}
              title="Bullet List"
            >
              ☰
            </button>
          </div>

          {/* Alignment */}
          <div className="rte-group">
            <button
              type="button"
              className={`rte-btn ${activeFormats.justifyLeft ? 'active' : ''}`}
              onClick={() => executeCommand('justifyLeft')}
              disabled={disabled}
              title="Align Left"
            >
              ⬅
            </button>

            <button
              type="button"
              className={`rte-btn ${activeFormats.justifyCenter ? 'active' : ''}`}
              onClick={() => executeCommand('justifyCenter')}
              disabled={disabled}
              title="Align Center"
            >
              ↔
            </button>

            <button
              type="button"
              className={`rte-btn ${activeFormats.justifyRight ? 'active' : ''}`}
              onClick={() => executeCommand('justifyRight')}
              disabled={disabled}
              title="Align Right"
            >
              ➡
            </button>

            <button
              type="button"
              className={`rte-btn ${activeFormats.justifyFull ? 'active' : ''}`}
              onClick={() => executeCommand('justifyFull')}
              disabled={disabled}
              title="Justify"
            >
              ⬌
            </button>
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          className={`rte-editor ${disabled ? 'disabled' : ''} `}
          contentEditable={!disabled}
          suppressContentEditableWarning={true}
          onKeyDown={handleKeyDown}
          style={{
            minHeight,
            maxHeight: maxHeight !== 'none' ? maxHeight : undefined
          }}
          data-placeholder={placeholder}
        />

      </div>
      {/* Error Message */}
      {required && error && <p className="rte-error-message">{errorMessage}</p>}
    </div>
  );
};

export default CommonTextEditorBox;