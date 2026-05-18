import { Link } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { RegisterForm } from '../../components/forms/RegisterForm';

export function RegisterPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Create account</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Start managing leads</h2>
          <p className="mt-2 text-sm text-slate-400">Create a secure account for your sales workflow.</p>
        </div>
        <RegisterForm />
        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link className="font-medium text-blue-300 hover:text-blue-200" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
