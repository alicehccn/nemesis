'use client'

import { APOD } from "./Apod";
import { SplitButton } from "./mui/SplitButton";
import { Weather } from "./Weather";
import { Epic } from "./Epic";
import { useState } from "react";
import { Wiki } from "./Wiki";

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="App">
      <div className="App-header">
        <div className="social">
          <a href="mailto:alicehccn@gmail.com">
            <img src="./email.png" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/alicehccn/">
            <img src="./linkedin.png" />
          </a>
          <a target="_blank" href="https://www.github.com/alicehccn/">
            <img src="./github.png" />
          </a>
        </div>
        <div className="logo">
          <img src="./logo2.png" alt="logo" />
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
        <Wiki
          modalIsOpen={selectedIndex === 4}
          closeModal={() => setSelectedIndex(0)}
        />
        <SplitButton
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </div>
      <footer>
        <span>&copy; 2025-2026 Alice Huang</span>
      </footer>
    </div>
  );
};
export default App;
