import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-800"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            A
          </div>
          Auth<span className="text-indigo-600">RBAC</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden items-center gap-2 text-sm text-slate-600 sm:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </span>
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
