import { uploadImage } from '@/apis/uploadImage.api';
import { useMutation } from '@tanstack/react-query';

export function useUploadImageMutation() {
  const uploadImageMutation = useMutation({
    mutationFn: (image: File) => uploadImage(image),
  });

  return uploadImageMutation;
}
