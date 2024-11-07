import Image from 'next/image';

interface BadgeProps {
  count?: number;
  left?: number;
  type?: 'done' | 'best';
}

function Badge(props: BadgeProps): JSX.Element {
  const { count, left, type } = props;
  const isOngoing = count !== left;
  const no = count === 0 && left === 0;
  const badgeClass = `flex items-center gap-1 rounded-2xl 
  bg-primary pb-1 pl-2 pr-2 pt-1 shadow-md`;
  const ongoingSrc = 'icons/Progress_ongoing.svg';
  const checkSrc = 'icons/Progress_done.svg';
  const bestSrc = 'icons/Best.svg';
  const doneSrc = 'icons/Check_lightGreen.svg';
  const xSrc = 'icons/X.svg';

  let imageSrc;
  let altText;
  let textColor;
  let badgeText;

  if (type === 'done') {
    imageSrc = doneSrc;
    altText = 'Done';
    textColor = 'text-brand-tertiary';
    badgeText = '완료';
  } else if (type === 'best') {
    imageSrc = bestSrc;
    altText = 'Best';
    textColor = 'text-white';
    badgeText = 'Best';
  } else if (isOngoing) {
    imageSrc = ongoingSrc;
    altText = 'Ongoing';
    textColor = 'text-brand-primary';
    badgeText = `${count}/${left}`;
  } else if (no) {
    imageSrc = xSrc;
    altText = 'no';
    textColor = 'text-white';
    badgeText = '없음';
  } else {
    imageSrc = checkSrc;
    altText = 'Check';
    textColor = 'text-brand-primary';
    badgeText = `${count}개`;
  }

  const badgeContent = (
    <div className={`text-sm font-bold ${textColor}`}>{badgeText}</div>
  );

  return (
    <div className={badgeClass}>
      <Image src={imageSrc} alt={altText} width={16} height={16} />
      {badgeContent}
    </div>
  );
}

export default Badge;
