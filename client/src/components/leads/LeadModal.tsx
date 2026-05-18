import { Modal } from '../common/Modal';
import { LeadForm } from '../forms/LeadForm';
import type { Lead } from '../../types/lead';
import type { LeadFormSchemaValues } from '../../utils/schemas';

interface LeadModalProps {
  isOpen: boolean;
  lead?: Lead | null;
  isSubmitting?: boolean | undefined;
  onClose: () => void;
  onSubmit: (values: LeadFormSchemaValues) => Promise<void> | void;
}

export function LeadModal({ isOpen, lead, isSubmitting, onClose, onSubmit }: LeadModalProps) {
  const initialValues = lead
    ? {
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      }
    : undefined;

  return (
    <Modal
      isOpen={isOpen}
      title={lead ? 'Edit Lead' : 'Create Lead'}
      description={lead ? 'Update the lead details below.' : 'Add a new lead to your pipeline.'}
      onClose={onClose}
    >
      <LeadForm initialValues={initialValues} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </Modal>
  );
}
