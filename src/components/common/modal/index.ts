import dynamic from 'next/dynamic';

import ModalBody from './ui/modal.body';
import ModalClose from './ui/modal.close';
import ModalFooter from './ui/modal.footer';
import ModalFrame from './ui/modal.frame';
import ModalOpen from './ui/modal.open';
import ModalSummary from './ui/modal.summary';
import ModalTitle from './ui/modal.title';

const ModalRoot = dynamic(() => import('./ui/modal.root'), { ssr: false });

export const Modal = {
  Root: ModalRoot,
  Frame: ModalFrame,
  Open: ModalOpen,
  Close: ModalClose,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
  Summary: ModalSummary,
};
