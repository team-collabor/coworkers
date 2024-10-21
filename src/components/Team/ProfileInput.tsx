import Input from '@/components/common/Input';
import { useToast } from '@/hooks/useToast';
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

  const { toast } = useToast();

  const imageExtensionValidCheck = (fileName: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!imageExtensionValidCheck(file.name)) {
        toast({
          title: '이미지 등록 실패',
          description: '이미지 확장자는 jpg, jpeg, png, bmp, webp만 가능합니다',
          variant: 'destructive',
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: '이미지 등록 실패',
          description: '이미지 파일 크기는 10MB를 초과할 수 없습니다',
          variant: 'destructive',
        });
        return;
      }

      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(file.name);
      if (hasKorean) {
        toast({
          title: '이미지 등록 실패',
          description: '파일명에 한글을 사용할 수 없습니다',
          variant: 'destructive',
        });
        return;
      }

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
          <Image src={image} alt={image} width={64} height={64} />
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
