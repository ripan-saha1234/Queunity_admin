import { useState } from 'react';
import CommonInput from '../../components/common-input';
import CommonButton from '../../components/common-button';
import { useToast } from '../../components/toast/ToastProvider';
import { addSubCategory, validateSubCategoryForm } from '../../api/offence';

const AddSubCategoryModal = ({ setAddSubCategory, offenseId, onSuccess }) => {
  const { showToast } = useToast();
  const [subCategoryName, setSubCategoryName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    if (!submitting) setAddSubCategory(false);
  };

  const handleAdd = async () => {
    if (!offenseId) {
      showToast('Offense ID is missing', 'error');
      return;
    }

    const validationError = validateSubCategoryForm({ subCategoryName });
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    setSubmitting(true);
    try {
      const response = await addSubCategory(offenseId, { subCategoryName });
      showToast(response?.message || 'Sub-category added successfully', 'success');
      setAddSubCategory(false);
      await onSuccess?.();
    } catch (err) {
      showToast(err?.message || 'Failed to add sub-category', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Add Sub-Category</h5>
          <i className="fa-solid fa-xmark" onClick={handleClose} />
        </div>
        <div className="radio_main">
          <label
            style={{
              marginLeft: '10px',
              display: 'block',
            }}
          >
            Sub-Category Name <span>*</span>
          </label>
          <CommonInput
            placeholder="Enter sub-category name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div
          onClick={submitting ? undefined : handleAdd}
          style={{
            marginLeft: 'auto',
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          <CommonButton
            text={submitting ? 'Adding...' : 'Add'}
            backgroundColor="var(--primary-color)"
            borderColor="transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
