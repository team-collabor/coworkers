/* eslint-disable max-len */
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import HeaderList from './header.list';
import HeaderLogo from './header.logo';
import HeaderNav from './header.nav';
import HeaderProfile from './header.profile';

export default function HeaderMain() {
  const { user } = useAuthStore();
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-16 w-screen select-none justify-center bg-secondary text-primary">
        <div className="relative flex size-full max-w-screen-xl flex-row items-center px-4">
          <div className="flex min-w-max items-center">
            {user && <HeaderList className="mr-4" />}
            <HeaderLogo className="mr-4" />
          </div>
          {user ? (
            <>
              <HeaderNav />
              <HeaderProfile />
            </>
          ) : (
            <Link href="/signin" className="ml-auto hover:opacity-90">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
