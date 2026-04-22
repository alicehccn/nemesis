import { CSSProperties, useEffect, useRef, useState } from "react";
import { CLOCK_INTERVAL, CLOCK_NUMERALS } from "../constants";

const Clock: React.FC = () => {
  const today = new Date();
  const [hour, setHour] = useState<number>(today.getHours());
  const [minute, setMinute] = useState<number>(today.getMinutes());
  const [second, setSecond] = useState<number>(today.getSeconds());

  function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    const now = new Date();
    if (minute !== now.getMinutes()) {
      setHour(now.getHours());
      setMinute(now.getMinutes());
      setSecond(now.getSeconds());
    }
  }, CLOCK_INTERVAL);

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
