import { CSSProperties, useEffect, useRef, useState } from "react";
import { CLOCK_INTERVAL, CLOCK_NUMERALS } from "../constants";

const Clock: React.FC = () => {
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());
  const [second, setSecond] = useState<number>(new Date().getSeconds());

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
    if (minute !== new Date().getMinutes()) {
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
      setSecond(new Date().getSeconds());
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
