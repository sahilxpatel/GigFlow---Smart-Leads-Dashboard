import { Link } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/forms/LoginForm';

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Sign in</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-400">Access your leads dashboard and manage your pipeline.</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link className="font-medium text-blue-300 hover:text-blue-200" to="/register">
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
