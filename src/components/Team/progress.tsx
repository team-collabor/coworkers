/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface CircularProgressProps {
  size?: string;
  value?: number;
  pathColor?: string;
  trailColor?: string;
  textColor?: string;
}
function CircularProgressChart({
  size = '160px',
  value = 25,
  pathColor = '#5F81FF',
  trailColor = '#DFE8FF',
  textColor = '#2B2D36',
}: CircularProgressProps) {
  return (
    <div className="flex items-center gap-12">
      <div style={{ width: size, height: size }}>
        <CircularProgressbar
          value={value}
          strokeWidth={20}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          styles={buildStyles({
            pathColor,
            trailColor,
            textColor,
            strokeLinecap: 'round',
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-md-medium">
          오늘의 <br />
          진행 상황
        </p>
        <p className=" text-4xl">{value}%</p>
      </div>
    </div>
  );
}

export default CircularProgressChart;
