import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { leadSchema, type LeadFormSchemaValues } from '../../utils/schemas';
import type { LeadFormValues } from '../../types/lead';

const defaultLeadValues: LeadFormSchemaValues = {
  name: '',
  email: '',
  status: 'New',
  source: 'Website'
};

interface LeadFormProps {
  initialValues?: LeadFormValues | undefined;
  onSubmit: (values: LeadFormSchemaValues) => Promise<void> | void;
  isSubmitting?: boolean | undefined;
}

export function LeadForm({ initialValues, onSubmit, isSubmitting = false }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadFormSchemaValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: initialValues ?? defaultLeadValues
  });

  useEffect(() => {
    reset(initialValues ?? defaultLeadValues);
  }, [initialValues, reset]);

  const handleFormSubmit: SubmitHandler<LeadFormSchemaValues> = (values) => {
    return onSubmit(values);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Lead name" {...register('name')} error={errors.name?.message} />
        <Input label="Lead email" type="email" {...register('email')} error={errors.email?.message} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Status"
          {...register('status')}
          error={errors.status?.message}
          options={[
            { label: 'New', value: 'New' },
            { label: 'Contacted', value: 'Contacted' },
            { label: 'Qualified', value: 'Qualified' },
            { label: 'Lost', value: 'Lost' }
          ]}
        />
        <Select
          label="Source"
          {...register('source')}
          error={errors.source?.message}
          options={[
            { label: 'Website', value: 'Website' },
            { label: 'Instagram', value: 'Instagram' },
            { label: 'Referral', value: 'Referral' }
          ]}
        />
      </div>
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Save lead
      </Button>
    </form>
  );
}
