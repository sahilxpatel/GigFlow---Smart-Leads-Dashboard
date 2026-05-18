import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { authStore } from '../../store/authStore';
import { loginSchema, type LoginFormValues } from '../../utils/schemas';
import { getApiErrorMessage } from '../../api/http';

export function LoginForm() {
  const navigate = useNavigate();
  const login = authStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" autoComplete="current-password" {...register('password')} error={errors.password?.message} />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}
