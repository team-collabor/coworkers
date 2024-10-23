import Input from '@/components/common/Input';
import { useImageValidation } from '@/hooks/useImageValidation';
import Image from 'next/image';
import { useRef } from 'react';

interface ProfileInputProps {
  image: string;
  onImageChange: (file: File) => void;
  error?: boolean;
}

export default function ProfileInput({
  image,
  onImageChange,
  error,
}: ProfileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { validateImage } = useImageValidation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && validateImage(file)) {
      onImageChange(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex flex-col">
      <Input
        id="teamImage"
        label="팀 프로필"
        type="file"
        name="teamImage"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <div className="relative mb-2 inline-block h-16 w-16">
        <button
          type="button"
          aria-label="팀 프로필 이미지 추가"
          onClick={handleImageClick}
          className="h-16 w-16 overflow-hidden 
          rounded-full border-2 border-primary"
        >
          <Image
            src={image || '/icons/BaseTeam_Icon.svg'}
            alt={image || '기본 이미지'}
            width={64}
            height={64}
          />
        </button>
        <div
          className="absolute bottom-0 right-0 flex h-5 w-5 
      translate-x-1 translate-y-1 transform items-center
      justify-center rounded-full border
      border-primary bg-tertiary"
        >
          <Image
            src="/icons/Edit_small.svg"
            alt="편집"
            width={10}
            height={10}
          />
        </div>
      </div>
      {error && (
        <p
          className="ml-5 mt-3 font-pretendard 
        text-md-medium text-status-danger"
        >
          프로필 이미지를 넣어주세요.
        </p>
      )}
    </div>
  );
}
