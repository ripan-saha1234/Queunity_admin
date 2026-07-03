import { useEffect, useState } from 'react';
import CommonInput from '../../components/common-input';
import CommonButton from '../../components/common-button';
import { useToast } from '../../components/toast/ToastProvider';
import { updateOffence, validateOffenceForm } from '../../api/offence';

const EditOffenceModal = ({ offenseId, offenseMeta, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [offenseName, setOffenseName] = useState(offenseMeta?.offenseName || '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setOffenseName(offenseMeta?.offenseName || '');
  }, [offenseMeta?.offenseName, offenseId]);

  const handleClose = () => {
    if (!submitting) onClose?.();
  };

  const handleSave = async () => {
    if (!offenseId) {
      showToast('Offense ID is missing', 'error');
      return;
    }

    const validationError = validateOffenceForm({ offenseName });
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    setSubmitting(true);
    try {
      const response = await updateOffence(
        offenseId,
        { offenseName },
        {
          offense_id: offenseId,
          case_assigned_count: offenseMeta?.case_assigned_count ?? 0,
          system_info: offenseMeta?.system_info ?? '',
          created_at: offenseMeta?.created_at,
          isactive: offenseMeta?.isactive ?? true,
        },
      );
      showToast(response?.message || 'Offense updated successfully', 'success');
      onSuccess?.();
      onClose?.();
    } catch (err) {
      showToast(err?.message || 'Failed to update offense', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Edit Offense</h5>
          <i className="fa-solid fa-xmark" onClick={handleClose} />
        </div>
        <div className="radio_main">
          <label
            style={{
              marginLeft: '10px',
              display: 'block',
            }}
          >
            Offense Name <span>*</span>
          </label>
          <CommonInput
            placeholder="Enter offence name"
            value={offenseName}
            onChange={(e) => setOffenseName(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div
          onClick={submitting ? undefined : handleSave}
          style={{
            marginLeft: 'auto',
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          <CommonButton
            text={submitting ? 'Saving...' : 'Save'}
            backgroundColor="var(--primary-color)"
            borderColor="transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default EditOffenceModal;
