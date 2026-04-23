import { CSSProperties } from "react";
import { CLOCK_NUMERALS } from "../constants";

const Clock: React.FC = () => {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

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
