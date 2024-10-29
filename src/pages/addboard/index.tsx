import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Input from '@/components/common/Input';
import { useImageValidation } from '@/hooks/useImageValidation';
import { useToast } from '@/hooks/useToast';
import { usePostArticleMutation } from '@/queries/article.queries';
import { useUploadImageMutation } from '@/queries/uploadImage.query';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

type ArticleValue = {
  title: string;
  content: string;
  image: File | null;
};

function AddBoard() {
  const [articleValue, setArticleValue] = useState<ArticleValue>({
    title: '',
    content: '',
    image: null,
  });

  const { validateImage } = useImageValidation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>('');

  const router = useRouter();

  const { toast } = useToast();

  const { mutateAsync: postArticleMutate, status: postArticleStatus } =
    usePostArticleMutation();

  const { mutateAsync: uploadImageMutate, status: uploadImageStatus } =
    useUploadImageMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!articleValue.title || !articleValue.content) {
      toast({
        title: '제목 또는 내용이 비어있습니다.',
        variant: 'destructive',
      });
      return;
    }

    const imageUrl = articleValue.image
      ? await uploadImageMutate(articleValue.image)
      : null;

    await postArticleMutate({
      ...(imageUrl && { image: imageUrl }),
      title: articleValue.title,
      content: articleValue.content,
    });
    setArticleValue({
      title: '',
      content: '',
      image: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/boards');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticleValue({ ...articleValue, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const file = files[0];

    if (!validateImage(file)) {
      e.target.value = '';
      return;
    }

    setArticleValue({ ...articleValue, image: file });
  };

  const handleDeleteImage = () => {
    const inputNode = fileInputRef.current;
    if (!inputNode) return;
    inputNode.value = '';
    setArticleValue({ ...articleValue, image: null });
    setPreview('');
  };

  useEffect(() => {
    if (!articleValue.image) return;
    const previewUrl = URL.createObjectURL(articleValue.image);
    setPreview(previewUrl);

    return () => {
      setPreview('');
      URL.revokeObjectURL(previewUrl);
    };
  }, [articleValue.image]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="mt-20 flex w-full flex-col gap-10" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl-bold text-primary">게시글 쓰기</h1>
        <Button
          buttonStyle={ButtonStyle.Box}
          textColor={TextColor.White}
          textSize={TextSize.Large}
          buttonBackgroundColor={ButtonBackgroundColor.Green}
          buttonBorderColor={ButtonBorderColor.None}
          buttonPadding={ButtonPadding.Large}
          className="w-52 mob:fixed mob:bottom-5 mob:left-5 mob:right-5 
          mob:w-auto"
          type="submit"
          disabled={
            postArticleStatus === 'pending' || uploadImageStatus === 'pending'
          }
        >
          등록
        </Button>
      </div>
      <div className="h-[1px] w-full border-b border-primary" />
      <div className="gap flex flex-col gap-4">
        <div className="flex gap-1 text-lg-medium">
          <p className="text-brand-tertiary">*</p>
          <h2 className="text-primary">제목</h2>
        </div>
        <Input
          placeholder="제목을 입력해주세요."
          className="w-full rounded-xl border-[1px] border-primary bg-secondary 
                    px-6 py-4 outline-none"
          value={articleValue.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 text-lg-medium">
          <p className="text-brand-tertiary">*</p>
          <h2 className="text-primary">내용</h2>
        </div>
        <textarea
          placeholder="내용을 입력해주세요."
          className="h-[240px] w-full resize-none rounded-xl
                    border-[1px] border-primary bg-secondary px-6 py-4 
                    outline-none "
          onChange={handleChange}
          value={articleValue.content}
          name="content"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 text-lg-medium">
          <h2 className="text-primary">이미지</h2>
        </div>
        <div className="relative h-60 w-60">
          <label
            htmlFor="article-image"
            className={`absolute inset-0 flex cursor-pointer flex-col 
              items-center justify-center gap-2 
                rounded-xl border-[1px] border-primary bg-secondary
                ${preview ? 'hidden' : 'flex'}`}
          >
            <Image
              src="/icons/Upload_plus.svg"
              alt="이미지 업로드"
              width={48}
              height={48}
            />
            <p className="text-lg-regular text-gray-400">이미지 등록</p>

            <input
              type="file"
              id="article-image"
              className="absolute inset-0 cursor-pointer opacity-0"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </label>
          {preview && (
            <div
              className="absolute inset-0 flex items-center 
              justify-center rounded-xl"
            >
              <div className="w-240 h-240 relative">
                <Image
                  src={preview}
                  alt="이미지 미리보기"
                  width={240}
                  height={240}
                  objectFit="cover"
                  className="rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute inset-0 z-40 flex cursor-pointer 
                  items-center justify-center hover:bg-black
                  hover:bg-opacity-40"
                  disabled={uploadImageStatus === 'pending'}
                >
                  <Image
                    src="/icons/X.svg"
                    alt="x-icon"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddBoard;
