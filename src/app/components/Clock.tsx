import { useEffect, useRef } from "react";
import { CLOCK_INTERVAL } from "../constants";

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
        <time dateTime="12:00">12</time>
        <time dateTime="1:00">1</time>
        <time dateTime="2:00">2</time>
        <time dateTime="3:00">3</time>
        <time dateTime="4:00">4</time>
        <time dateTime="5:00">5</time>
        <time dateTime="6:00">6</time>
        <time dateTime="7:00">7</time>
        <time dateTime="8:00">8</time>
        <time dateTime="9:00">9</time>
        <time dateTime="10:00">10</time>
        <time dateTime="11:00">11</time>
        <div className="center">
          <div className="second"></div>
        </div>
      </div>
    </div>
  );
};
export default Clock;
