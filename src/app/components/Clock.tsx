import { useEffect, useRef } from "react";
import { CLOCK_INTERVAL, CLOCK_NUMERALS } from "../constants";

const Clock: React.FC = () => {
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
    const today = new Date();
    const now = `${today.getHours()}: ${today.getMinutes()}: ${today.getSeconds()}`;
    // console.log(now)
  }, CLOCK_INTERVAL);
  return (
    <div className="clock-container">
      <div className="clock">
        {CLOCK_NUMERALS.map((num) => (
          <time key={num}>{num}</time>
        ))}
        <div className="center">
          <div className="second"></div>
        </div>
      </div>
    </div>
  );
};
export default Clock;
