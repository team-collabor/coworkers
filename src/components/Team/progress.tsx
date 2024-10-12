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
  size = '150px',
  value = 25,
  pathColor = '#5F81FF',
  trailColor = '#DFE8FF',
  textColor = '#2B2D36',
}: CircularProgressProps) {
  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={value}
        strokeWidth={20}
        strokeLinecap="round"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        styles={buildStyles({
          pathColor,
          trailColor,
          textColor,
          strokeLinecap: 'round',
        })}
      />
    </div>
  );
}

export default CircularProgressChart;
