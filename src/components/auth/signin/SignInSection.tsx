import SignInForm from './SignInForm';

function SignInSection() {
  return (
    <section
      className="mt-[8.75rem] flex flex-col items-center
								tab:mt-[6.25rem] mob:mt-[1.5rem]"
    >
      <div
        className="mb-20 font-pretendard text-4xl 
									tab:text-2xl-medium 
									mob:mb-7 mob:text-2xl-medium"
      >
        로그인
      </div>
      <SignInForm />
    </section>
  );
}

export default SignInSection;
