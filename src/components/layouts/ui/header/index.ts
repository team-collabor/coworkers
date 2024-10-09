import dynamic from 'next/dynamic';

export const Header = dynamic(() => import('./ui/Header'), { ssr: false });
