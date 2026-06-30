import { useState, useRef, useEffect } from 'react';
import '../css/common-table.css';
import Pagination from './pagination';

const CommonTable = ({
  tableData,
  headers,
  handleActionClick = () => { },
  index = 0,
  multipleReturn = false,
  multipleReturnIntex1 = 0,
  multipleReturnIntex2 = 0,
  specificReturn = '',
  pagination = null,
  actionButtons = [
    { label: 'Edit', action: 'edit' },
    { label: 'View', action: 'view' },
    { label: 'Delete', action: 'delete' }
  ]
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [actionMenu, setActionMenu] = useState({ isOpen: false, rowIndex: null });
  const itemsPerPage = pagination?.pageSize ?? 10;
  const useServerPagination = pagination != null;
  const menuRef = useRef(null);
  const tableRef = useRef(null);

  // Click outside handler to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActionMenu({ isOpen: false, rowIndex: null });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!useServerPagination) {
      setCurrentPage(1);
    }
  }, [tableData?.length, useServerPagination]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useServerPagination
    ? tableData
    : tableData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = useServerPagination
    ? (pagination.totalItems ?? 0)
    : (tableData?.length || 0);
  const totalPages = useServerPagination
    ? (pagination.totalPages ?? 0)
    : (totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0);
  const activePage = useServerPagination ? pagination.currentPage : currentPage;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      if (useServerPagination) {
        pagination.onPageChange(pageNumber);
      } else {
        setCurrentPage(pageNumber);
      }
    }
  };

  // Toggle action menu with position calculation
  const toggleActionMenu = (rowIndex, event) => {
    event.stopPropagation();
    setActionMenu(prev => ({
      isOpen: prev.rowIndex === rowIndex ? !prev.isOpen : true,
      rowIndex: prev.rowIndex === rowIndex && prev.isOpen ? null : rowIndex
    }));
  };

  const renderCellContent = (item, header, rowIndex) => {
    let idValue;
    if (specificReturn && specificReturn !== '') {
      idValue = item[specificReturn];
    } else if (multipleReturn) {
      idValue = [item[headers[multipleReturnIntex1]?.value], item[headers[multipleReturnIntex2]?.value]];
    } else {
      idValue = item[headers[index]?.value];
    }

    if (header?.value === 'action') {
      return (
        <div className="table1-action-container">
          <button className="table1-three-dots-button" onClick={(e) => toggleActionMenu(rowIndex, e)}>
           <img src="/three-dots-icon.svg" alt="" />
          </button>

          {actionMenu.isOpen && actionMenu.rowIndex === rowIndex && (
            <div
              className="table1-action-dropdown"
              ref={menuRef}
            >
              {actionButtons.map((button, btnIndex) => (
                <button
                  key={btnIndex}
                  className="table1-action-button"
                  onClick={() => {
                    handleActionClick(button.action, idValue);
                    setActionMenu({ isOpen: false, rowIndex: null });
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (header?.value === 'action2') {
      return (
        <div className="table-action2-container" onClick={() => handleActionClick('view', idValue)}>
          <img src="/eye-icon-table.svg" alt="" />
        </div>
      )
    }
    if (header?.value === 'status') {
      return (
        <div
          className={`table1-status-container ${(item[header?.value] === 'Active' || item[header?.value] === 'Completed' || item[header?.value] === 'Good' || item[header?.value] === 'Closed')
            ? 'status-success'
            : item[header?.value] === 'Upcoming' || item[header?.value] === 'New'
              ? 'status-upcoming'
              : (item[header?.value] === 'Inactive' || item[header?.value] === 'Canceled' || item[header?.value] === 'Pending' || item[header?.value] === 'Open')
                ? 'status-inactive'
                : item[header?.value] === 'In Progress' || item[header?.value] === 'Ongoing'
                  ? 'status-progress'
                  : ''
            }`}
        >
          {item[header?.value]}
        </div>
      )
    }

    if (header?.value === 'customerName' || header?.value === 'companyName' || header?.value === 'expertName' || header?.value === 'raisedBy' || header?.value === 'against' || header?.value === 'projectName') {
      return (
        <div className='table1-customer-container'>
          {item[header?.value]?.image && <div className='table1-customer-image-container'><img src={item[header?.value]?.image} alt="" /></div>}
          <div className='table1-customer-name-container'>
            <h2>{item[header?.value]?.name}</h2>
            <p>{item[header?.value]?.id}</p>
          </div>
        </div>
      )
    }

    if (header?.value === 'message') {
      return (
        <div className='table-message-container'>
          <p className='table-message'>{item[header?.value]}</p>
        </div>
      )
    }

    return item[header?.value];
  };

  return (
    <div className="table1-container">
      <div className='table1-table-container' ref={tableRef}>
        <table className="table1">
          <thead>
            <tr>
              {
                headers?.map((header, index) => (
                  <th key={index} className={header?.value === 'action' || header?.value === 'action2' || header?.value === 'action3' ? 'table1-action-header' : ''}>
                    {header?.title}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {currentItems?.length > 0 && currentItems?.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {headers?.map((header, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`}>
                    {renderCellContent(item, header, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {currentItems?.length === 0 && (
          <div className='table1-no-data-container'>
            <p>No data found</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={activePage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default CommonTable;