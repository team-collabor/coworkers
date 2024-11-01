// eslint-disable-next-line max-len
import { UploadImageResponse } from '@/types/dto/responses/uploadImage.response.type';
import { axiosInstance } from './_axiosInstance';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axiosInstance<UploadImageResponse>({
    method: 'POST',
    url: 'images/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url;
};
