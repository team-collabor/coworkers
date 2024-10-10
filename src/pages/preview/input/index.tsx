import Input from '@/components/common/Input';
import Select from '@/components/common/Select';

export default function InputPreviewPage() {
  return (
    <form className="mt-20 flex w-80 flex-col gap-6">
      <Input
        id="email"
        type="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
      />
      <Input
        id="name"
        type="text"
        placeholder="이름을 입력해주세요"
        sideButton={
          <button
            className="rounded-xl bg-green-500 px-4 py-1 text-white 
						hover:bg-green-600
						focus:outline-none focus:ring-2
						focus:ring-green-400"
            type="button"
          >
            변경하기
          </button>
        }
      />
      <Input
        id="email2"
        inputClassName="bg-tertiary" // <input> 클래스 추가
        type="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        errorMessage="이메일 형식이 올바르지 않습니다."
      />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        hasVisibilityButton // visibility button 추가
      />
      <Input
        inputClassName="bg-tertiary"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        sideButton={
          <button
            className="rounded-xl bg-green-500 px-4 py-1 text-white 
						hover:bg-green-600
						focus:outline-none focus:ring-2
						focus:ring-green-400"
            type="button"
          >
            변경하기
          </button>
        }
      />
      <Select
        id="select"
        label="반복 선택"
        errorMessage="반복 선택을 해주세요"
        selectClassName="bg-select"
      >
        <option value="1">반복 안함</option>
        <option value="2">매일</option>
        <option value="3">매주</option>
        <option value="4">매월</option>
        <option value="4">
          매월매월매월매월매월매월매월매월매월매월매월매월매월매월매월매월매월매월
        </option>
      </Select>
    </form>
  );
}
