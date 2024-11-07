import { FrequencyType, FrequencyTypeKorean } from '@/types/tasks.types';

export function formatDate(isoString: string): string {
  if (/^\d{4}\. \d{2}\. \d{2}$/.test(isoString)) {
    return isoString;
  }
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}`;
}

export function formatKoreanDate(date: Date | string | number): string {
  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string' || typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return '유효하지 않은 날짜입니다';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  return dateObj.toLocaleDateString('ko-KR', options);
}

export function formatFrequencyToKorean(
  frequency: FrequencyType
): FrequencyTypeKorean {
  const frequencyMap: Record<FrequencyType, FrequencyTypeKorean> = {
    DAILY: '매일 반복',
    WEEKLY: '매주 반복',
    MONTHLY: '매월 반복',
    ONCE: '반복 없음',
  };

  return frequencyMap[frequency];
}
