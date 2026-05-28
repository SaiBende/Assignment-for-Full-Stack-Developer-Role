import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getPublicContent, getUserContent, getAdminContent } from '../api/demo';

const roleBadge: Record<string, { bg: string; text: string; ring: string }> = {
  USER: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-blue-600/20',
  },
  ADMIN: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    ring: 'ring-purple-600/20',
  },
};

export default function Dashboard() {
  const { user } = useAuth();

  const publicQuery = useQuery({
    queryKey: ['public'],
    queryFn: getPublicContent,
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUserContent,
    enabled: !!user,
  });

  const adminQuery = useQuery({
    queryKey: ['admin'],
    queryFn: getAdminContent,
    enabled: user?.role === 'ADMIN',
  });

  const badge = user ? roleBadge[user.role] : null;

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-6 sm:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-indigo-100">
            Welcome back, {user?.name}
          </p>
        </div>

        {user && badge && (
          <div className="flex flex-wrap gap-6 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="font-medium text-slate-800">{user.name}</p>
                <p className="text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span
                className={`rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${badge.bg} ${badge.text} ${badge.ring}`}
              >
                {user.role}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ContentCard
          title="Public"
          description="Everyone can see this"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          }
          color="slate"
          data={publicQuery.data}
          isLoading={publicQuery.isLoading}
          error={publicQuery.error}
        />

        <ContentCard
          title="User"
          description="Users and admins can see this"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
          color="blue"
          data={userQuery.data}
          isLoading={userQuery.isLoading}
          error={userQuery.error}
          requiredRoles={['USER', 'ADMIN']}
          userRole={user?.role}
        />

        <ContentCard
          title="Admin"
          description="Only admins can see this"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          }
          color="purple"
          data={adminQuery.data}
          isLoading={adminQuery.isLoading}
          error={adminQuery.error}
          requiredRoles={['ADMIN']}
          userRole={user?.role}
        />
      </div>
    </div>
  );
}

const colorConfig: Record<
  string,
  { border: string; bg: string; icon: string; badge: string; badgeText: string; badgeRing: string }
> = {
  slate: {
    border: 'border-slate-200',
    bg: 'bg-white',
    icon: 'text-slate-500',
    badge: 'bg-slate-50',
    badgeText: 'text-slate-600',
    badgeRing: 'ring-slate-500/20',
  },
  blue: {
    border: 'border-blue-200',
    bg: 'bg-blue-50/40',
    icon: 'text-blue-600',
    badge: 'bg-blue-100',
    badgeText: 'text-blue-700',
    badgeRing: 'ring-blue-600/20',
  },
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-50/40',
    icon: 'text-purple-600',
    badge: 'bg-purple-100',
    badgeText: 'text-purple-700',
    badgeRing: 'ring-purple-600/20',
  },
};

function ContentCard({
  title,
  description,
  icon,
  color,
  data,
  isLoading,
  error,
  requiredRoles,
  userRole,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  color: 'slate' | 'blue' | 'purple';
  data?: { message: string } | null;
  isLoading: boolean;
  error: Error | null;
  requiredRoles?: ('USER' | 'ADMIN')[];
  userRole?: 'USER' | 'ADMIN' | null;
}) {
  const styles = colorConfig[color];
  const isLocked =
    !!requiredRoles &&
    (!userRole || !requiredRoles.includes(userRole));

  return (
    <div
      className={`rounded-xl border-2 bg-white p-5 shadow-sm ring-1 ring-slate-200 transition ${isLocked ? 'opacity-50' : ''}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles.bg} ${styles.icon}`}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {isLocked ? (
        <div className="rounded-lg bg-slate-50 px-3 py-3 text-center text-xs text-slate-400 ring-1 ring-slate-200">
          <svg className="mx-auto mb-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          Requires {requiredRoles?.join(' / ')} role
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-4">
          <svg className="h-5 w-5 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : error ? (
        <p className="text-center text-sm text-red-500">Failed to load</p>
      ) : (
        <p className="text-sm leading-relaxed text-slate-600">
          {data?.message}
        </p>
      )}
    </div>
  );
}
