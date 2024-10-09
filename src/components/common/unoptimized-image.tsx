import Image, { ImageProps } from 'next/image';

export function UnoptimizedImage(props: ImageProps) {
  return <Image {...props} unoptimized />;
}
