import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { authStore } from '../../store/authStore';
import { registerSchema, type RegisterFormValues } from '../../utils/schemas';
import { getApiErrorMessage } from '../../api/http';

export function RegisterForm() {
  const navigate = useNavigate();
  const registerUser = authStore((state) => state.register);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema), defaultValues: { role: 'sales' } });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Full name" autoComplete="name" {...register('name')} error={errors.name?.message} />
      <Input label="Email" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" autoComplete="new-password" {...register('password')} error={errors.password?.message} />
      <Select
        label="Role"
        {...register('role')}
        error={errors.role?.message}
        options={[
          { label: 'Sales User', value: 'sales' },
          { label: 'Admin', value: 'admin' }
        ]}
      />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Create account
      </Button>
    </form>
  );
}
