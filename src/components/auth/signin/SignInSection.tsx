import { Modal } from '@/components/modal';
import { cn } from '@/utils/tailwind/cn';
import Link from 'next/link';
import SendResetPasswordForm from '../resetPassword/SendResetPasswordForm';
import SignInForm from './SignInForm';

function SignInSection() {
  return (
    <section
      className="mt-[8.75rem] flex w-full max-w-[28.75rem] flex-col
								items-center tab:mt-[6.25rem] mob:mt-[1.5rem]"
    >
      <div
        className="mb-20 font-pretendard text-4xl 
									tab:text-2xl-medium 
									mob:mb-7 mob:text-2xl-medium"
      >
        로그인
      </div>
      <SignInForm />
      <div
        className={cn(
          'mt-6 flex justify-center gap-2 text-lg-medium text-primary'
        )}
      >
        <p>아직 계정이 없으신가요?</p>
        <Link className="text-interaction-focus underline" href="/signup">
          가입하기
        </Link>
      </div>

      <Modal>
        <Modal.Toggle className="mt-2">
          <span className={cn('text-lg-semibold text-brand-primary underline')}>
            비밀번호를 잊으셨나요?
          </span>
        </Modal.Toggle>
        <Modal.Portal>
          <Modal.Overlay />
          <Modal.Content withToggle>
            <Modal.Header>
              <Modal.Title>비밀번호 재설정</Modal.Title>
              <Modal.Summary className="text-md-medium text-default">
                비밀번호 재설정 링크를 보내드립니다.
              </Modal.Summary>
            </Modal.Header>
            <Modal.Body className="mt-4 w-[18rem]">
              <SendResetPasswordForm />
            </Modal.Body>
          </Modal.Content>
        </Modal.Portal>
      </Modal>
    </section>
  );
}

export default SignInSection;
