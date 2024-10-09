import type { ReactNode } from 'react';

import List from './header.list';
import Logo from './header.logo';
import Navbar from './header.navbar';
import Profile from './header.profile';

function Header({ sidebar }: { sidebar?: ReactNode }) {
  return (
    <>
      <header className="bg-primary text-primary fixed inset-x-0">
        <div
          className={`
          flex h-header max-w-screen-xl items-center gap-x-8 px-6 
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
};

export default Header;
