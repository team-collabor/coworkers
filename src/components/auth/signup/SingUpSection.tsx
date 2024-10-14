import SignUpForm from './SignUpForm';

function SignUpSection() {
  return (
    <section
      className="mt-[8.75rem] flex w-full max-w-[28.75rem] flex-col
								items-center tab:mt-[6.25rem] mob:mt-[1.5rem] "
    >
      <div
        className="mb-20 font-pretendard text-4xl 
									tab:text-2xl-medium 
									mob:mb-7 mob:text-2xl-medium"
      >
        회원가입
      </div>
      <SignUpForm />
    </section>
  );
}

export default SignUpSection;
