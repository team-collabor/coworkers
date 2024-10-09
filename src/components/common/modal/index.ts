import dynamic from 'next/dynamic';

import ModalBody from './ui/Modal.body';
import ModalClose from './ui/Modal.close';
import ModalFooter from './ui/Modal.footer';
import ModalFrame from './ui/Modal.frame';
import ModalOpen from './ui/Modal.open';
import ModalSummary from './ui/Modal.summary';
import ModalTitle from './ui/Modal.title';

const ModalRoot = dynamic(() => import('./ui/Modal.root'), { ssr: false });

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
