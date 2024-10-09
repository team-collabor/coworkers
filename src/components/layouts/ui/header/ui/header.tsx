import type { ReactNode } from 'react';

import List from './Header.list';
import Logo from './Header.logo';
import Navbar from './Header.navbar';
import Profile from './Header.profile';

function Header({ sidebar }: { sidebar?: ReactNode }) {
  return (
    <>
      <header className="fixed inset-x-0 bg-primary text-primary">
        <div
          className={`
          h-header flex max-w-screen-xl items-center gap-x-8 px-6 
          transition-[gap] duration-300 ease-in-out xl:mx-auto xl:gap-x-10
          `}
        >
          <section className="flex min-w-max items-center gap-x-4 md:gap-x-0">
            <List />
            <Logo />
          </section>
          <Navbar />
          <Profile />
        </div>
        {sidebar}
      </header>
      <div className="h-header" />
    </>
  );
}

export default Header;
