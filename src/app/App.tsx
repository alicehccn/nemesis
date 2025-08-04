"use client";

import { APOD } from "./components/Apod";
import { SplitButton } from "./components/Menu";
import { Weather } from "./components/Weather";
import { Epic } from "./components/Epic";
import { useState } from "react";
import Image from "next/image";

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="App">
      <div className="App-header">
        <div className="logo">
          <Image width={200} height={100} src="/logo2.png" alt="alice-huang" />
        </div>
      </div>
      <div className="App-content">
        <APOD
          modalIsOpen={selectedIndex === 1}
          closeModal={() => setSelectedIndex(0)}
        />
        <Epic
          modalIsOpen={selectedIndex === 2}
          closeModal={() => setSelectedIndex(0)}
        />
        <Weather
          modalIsOpen={selectedIndex === 3}
          closeModal={() => setSelectedIndex(0)}
        />
        <SplitButton
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
        <div className="social">
          <a target="_blank" href="https://www.github.com/alicehccn/">
            <Image width={40} height={40} src="/github.png" alt="github" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/alicehccn/">
            <Image width={40} height={40} src="/linkedin.png" alt="linkedIn" />
          </a>
          <a href="mailto:alicehccn@gmail.com">
            <Image width={40} height={40} src="/email.png" alt="email" />
          </a>
        </div>
      </div>
      <footer>
        <div>&copy; 2025-2026 Alice Huang</div>
      </footer>
    </div>
  );
};
export default App;
