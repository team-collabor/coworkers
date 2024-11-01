import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { useImageValidation } from '@/hooks/useImageValidation';
import { useToast } from '@/hooks/useToast';
import { useUpdateArticleMutation } from '@/queries/article.queries';
import { useUploadImageMutation } from '@/queries/uploadImage.query';
import { ArticleDetail, ArticleValue } from '@/types/article.types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type EditArticleFormProps = {
  setIsEditArticle: (isEditArticle: boolean) => void;
  article: ArticleDetail;
  boardId: number;
};

function EditArticleForm({
  setIsEditArticle,
  article,
  boardId,
}: EditArticleFormProps) {
  const [articleValue, setArticleValue] = useState<ArticleValue>({
    title: article.title,
    content: article.content,
    image: null,
  });
  const [preview, setPreview] = useState<string | null>(article.image);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { validateImage } = useImageValidation();

  const { mutateAsync: uploadImageMutate, status: uploadImageStatus } =
    useUploadImageMutation();

  const { mutateAsync: updateArticleMutate, status: updateArticleStatus } =
    useUpdateArticleMutation(boardId);

  const handleArticleEditCancel = () => {
    setIsEditArticle(false);
  };

  const handleArticleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleValue({ ...articleValue, title: e.target.value });
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setArticleValue({ ...articleValue, image: null });
    setPreview(null);
  };

  const handleArticleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setArticleValue({ ...articleValue, content: e.target.value });
  };

  const handleArticleEditSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!articleValue.title || !articleValue.content) {
      toast({
        title: '제목 또는 내용이 비어있습니다.',
        variant: 'destructive',
      });
      return;
    }

    let imageUrl = null;
    if (articleValue.image) {
      imageUrl = await uploadImageMutate(articleValue.image);
    } else if (preview) {
      imageUrl = article.image;
    }

    await updateArticleMutate({
      image: imageUrl ?? null,
      title: articleValue.title,
      content: articleValue.content,
    });
    setArticleValue({
      title: '',
      content: '',
      image: null,
    });
    setIsEditArticle(false);
  };

  useEffect(() => {
    if (!articleValue.image) return;
    const previewUrl = URL.createObjectURL(articleValue.image);
    setPreview(previewUrl);
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [articleValue.image]);
  return (
    <form className="flex flex-col gap-6" onSubmit={handleArticleEditSubmit}>
      <div>
        <Input
          type="text"
          value={articleValue.title}
          inputClassName="bg-primary "
          onChange={handleArticleTitleChange}
          label="제목"
        />
      </div>
      <TextArea
        value={articleValue.content}
        textAreaClassName="bg-primary h-[10rem] resize-none"
        onChange={handleArticleContentChange}
        label="내용"
      />
      <div className="flex justify-between">
        <div className="relative h-60 w-60">
          <label
            htmlFor="edit-article-image"
            className={`absolute inset-0 flex cursor-pointer flex-col 
              items-center justify-center gap-2 rounded-xl border-[1px] 
              border-primary bg-primary hover:border-brand-primary 
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
              id="edit-article-image"
              className="absolute inset-0 cursor-pointer opacity-0"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </label>
          {preview && (
            <div
              className="absolute inset-0 flex items-center justify-center 
            rounded-xl"
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
                  items-center 
                    justify-center hover:bg-black hover:bg-opacity-40"
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
        <div className="flex items-end gap-2">
          <Button
            type="submit"
            buttonStyle={ButtonStyle.Box}
            textColor={TextColor.White}
            textSize={TextSize.Medium}
            buttonWidth={ButtonWidth.Fit}
            buttonBackgroundColor={ButtonBackgroundColor.None}
            buttonBorderColor={ButtonBorderColor.LightGray}
            buttonPadding={ButtonPadding.Small}
            disabled={
              updateArticleStatus === 'pending' ||
              uploadImageStatus === 'pending'
            }
          >
            저장
          </Button>
          <Button
            type="button"
            buttonStyle={ButtonStyle.Box}
            textColor={TextColor.White}
            textSize={TextSize.Medium}
            buttonWidth={ButtonWidth.Fit}
            buttonBackgroundColor={ButtonBackgroundColor.None}
            buttonBorderColor={ButtonBorderColor.LightGray}
            buttonPadding={ButtonPadding.Small}
            onClick={handleArticleEditCancel}
            disabled={
              updateArticleStatus === 'pending' ||
              uploadImageStatus === 'pending'
            }
          >
            취소
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditArticleForm;
