import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  values: number[];
  duration?: number;
  children: (value: number) => ReactNode;
}

const ChangingProgressProvider: React.FC<Props> = ({
  values,
  duration = 1000, // 애니메이션 지속 시간 (1초)
  children,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(values[0]);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      const nextValue =
        values[0] + (values[1] - values[0]) * Math.min(progress, 1);
      // 시작과 끝 값을 기준으로 보간
      setCurrentValue(nextValue);
      if (progress < 1) {
        window.requestAnimationFrame(step); // 계속해서 애니메이션
      }
    };

    window.requestAnimationFrame(step); // 애니메이션 시작

    return () => {
      start = null; // 애니메이션 취소
    };
  }, [values, duration]);

  return children(currentValue);
};

export default ChangingProgressProvider;
