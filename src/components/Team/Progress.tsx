/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import useIsMobile from '@/hooks/useIsMobile';
import ChangingProgressProvider from '@/providers/ChangingProgressProvider';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

interface CircularProgressProps {
  value?: number;
}

function CircularProgressChart({ value = 0 }: CircularProgressProps) {
  const isMobileView = useIsMobile();
  return (
    <div className="flex items-center gap-12">
      <div className="h-[160px] w-[160px] mob:h-[120px] mob:w-[120px]">
        <ChangingProgressProvider values={[0, value]}>
          {(currentValue) => (
            <>
              <svg style={{ height: 0 }}>
                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#a3e635" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <CircularProgressbarWithChildren
                value={currentValue}
                strokeWidth={18}
                styles={buildStyles({
                  rotation: 0.25,
                  pathColor: 'url(#progressGradient)',
                  trailColor: '#334155',
                  strokeLinecap: 'round',
                })}
              >
                {isMobileView && (
                  <div style={{ color: '#DFE8FF', textAlign: 'center' }}>
                    <p>오늘</p>
                    <p
                      className="bg-gradient-to-r from-[#10b981] to-[#a3e635] 
                  bg-clip-text text-2xl font-bold text-transparent"
                    >
                      {Math.round(currentValue)}%
                    </p>
                  </div>
                )}
              </CircularProgressbarWithChildren>
            </>
          )}
        </ChangingProgressProvider>
      </div>
      {!isMobileView && (
        <div className="flex flex-col gap-2">
          <p className="text-md-medium">
            오늘의 <br />
            진행 상황
          </p>
          <p
            className="bg-gradient-to-r from-[#10b981] to-[#a3e635]
           bg-clip-text text-4xl font-bold text-transparent"
          >
            {value}%
          </p>
        </div>
      )}
    </div>
  );
}

export default CircularProgressChart;
