/* eslint-disable max-len */
import dynamic from 'next/dynamic';

import ModalClose from './ui/modal.close';
import ModalContent from './ui/modal.content';
import ModalHeader from './ui/modal.header';
import ModalOverlay from './ui/modal.overlay';
import ModalPortal from './ui/modal.portal';
import ModalSummary from './ui/modal.summary';
import ModalTitle from './ui/modal.title';
import ModalToggle from './ui/modal.toggle';

/**
 *
 * @param {boolean} [withToggle=false] 우측 상단에 X버튼 추가.
 * @param {object} withIcon 아이콘을 컴포넌트로 추가 가능.
 * @example
 * <Modal>
 *   <Modal.Toggle className="">
 *     열기
 *   </Modal.Toggle>
 *   <Modal.Portal>
 *     <Modal.Overlay />
 *     <Modal.Content addToggle>
 *       <Modal.Header withIcon={<UnoptimizedImage className="mb-4" src="/icons/Alert.svg" alt="" width={24} height={24} />}>
 *         <Modal.Title>
 *           회원탈퇴를 진행하시겠어요?
 *         </Modal.Title>
 *       </Modal.Header>
 *       <Modal.Summary>
 *         그룹장으로 있는 그룹은 자동으로 삭제되고,
 *         {"\n"}
 *         모든 그룹에서 나가집니다.
 *       </Modal.Summary>
 *     </Modal.Content>
 *   </Modal.Portal>
 * <Modal>
 */
export const Modal = Object.assign(
  dynamic(async () => (await import('./ui/modal.root')).default, {
    ssr: false,
  }),
  {
    Portal: ModalPortal,
    Close: ModalClose,
    Overlay: ModalOverlay,
    Toggle: ModalToggle,
    Content: ModalContent,
    Header: ModalHeader,
    Title: ModalTitle,
    Summary: ModalSummary,
  }
);
