"use client";

import { APOD } from "./components/Apod";
import { Catalog } from "./components/Catalog";
import { Weather } from "./components/Weather";
import { Epic } from "./components/Epic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchApodApi } from "./constants";
import { ApodResponse } from "./types";

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [asset, setAsset] = useState<ApodResponse>();

  useEffect(() => {
    const today = new Date();
    if (!asset) {
      fetch(fetchApodApi(today))
        .then((response) =>
          response?.json().then((json) => {
            setAsset(json);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [asset]);

  return (
    <div className="App">
      <div className="logo">
        <Image
          width={200}
          height={100}
          src="/logo3.png"
          alt="alice-huang"
          priority
        />
      </div>

      <div className="actions">
        <APOD
          modalIsOpen={selectedIndex === 1}
          closeModal={() => setSelectedIndex(0)}
          asset={asset}
        />
        <Epic
          modalIsOpen={selectedIndex === 2}
          closeModal={() => setSelectedIndex(0)}
        />
        <Weather
          modalIsOpen={selectedIndex === 3}
          closeModal={() => setSelectedIndex(0)}
        />
        <Catalog
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </div>
      <footer>
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
        <div>&copy; 2026 Alice Huang</div>
      </footer>
    </div>
  );
};
export default App;
