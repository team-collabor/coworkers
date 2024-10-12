/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface CircularProgressProps {
  size?: string;
  value?: number;
  pathColor?: string;
  trailColor?: string;
  textColor?: string;
}
function CircularProgressChart({
  size = '100px',
  value = 10,
  pathColor = '#5F81FF',
  trailColor = '#DFE8FF',
  textColor = '#2B2D36',
}: CircularProgressProps) {
  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={10}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        styles={buildStyles({
          pathColor,
          trailColor,
          textColor,
        })}
      />
    </div>
  );
}

export default CircularProgressChart;
