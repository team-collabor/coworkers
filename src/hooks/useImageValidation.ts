import { useToast } from '@/hooks/useToast';

export const useImageValidation = () => {
  const { toast } = useToast();

  const imageExtensionValidCheck = (fileName: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateImage = (file: File) => {
    if (!imageExtensionValidCheck(file.name)) {
      toast({
        title: '이미지 등록 실패',
        description: '이미지 확장자는 jpg, jpeg, png, bmp, webp만 가능합니다',
        variant: 'destructive',
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: '이미지 등록 실패',
        description: '이미지 파일 크기는 10MB를 초과할 수 없습니다',
        variant: 'destructive',
      });
      return false;
    }

    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(file.name.normalize('NFC'));

    if (hasKorean) {
      toast({
        title: '이미지 등록 실패',
        description: '파일명에 한글을 사용할 수 없습니다',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  return { validateImage };
};
