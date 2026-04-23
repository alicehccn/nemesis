import { CSSProperties, useEffect, useState } from "react";
import { CLOCK_NUMERALS } from "../constants";

const Clock: React.FC = () => {
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();
  const [second, setSecond] = useState<number>();

  useEffect(() => {
    if (!hour) {
      const now = new Date();
      setHour(now.getHours());
      setMinute(now.getMinutes());
      setSecond(now.getSeconds());
    }
  }, [hour, minute, second]);

  if (!hour || !minute || !second) {
    return;
  }

  return (
    <div className="clock-container">
      <div
        className="clock"
        style={
          { "--_dh": hour, "--_dm": minute, "--_ds": second } as CSSProperties
        }
      >
        {CLOCK_NUMERALS.map((num) => (
          <time key={num}>{num}</time>
        ))}
        <div className="arm">
          <div className="hour"></div>
          <div className="minute"></div>
          <div className="second"></div>
        </div>
      </div>
    </div>
  );
};
export default Clock;
