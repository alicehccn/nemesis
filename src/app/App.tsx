"use client";

import { APOD } from "./components/Apod";
import { Catalog } from "./components/Catalog";
import { Weather } from "./components/Weather";
import { Epic } from "./components/Epic";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  EPIC_COLOR,
  fetchApodApi,
  fetchEpicApi,
  fetchWeatherApi,
} from "./constants";
import { AlertGroup, ApodResponse, EpicResponse } from "./types";
import _ from "lodash";

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reloading, setReload] = useState(false);
  const [alerts, setAlerts] = useState<AlertGroup>();
  const [apodAsset, setApodAsset] = useState<ApodResponse>();
  const [epicAsset, setEpicAsset] = useState<EpicResponse[]>([]);

  useEffect(() => {
    const today = new Date();
    if (!apodAsset) {
      fetch(fetchApodApi(today))
        .then((response) =>
          response?.json().then((json) => {
            setApodAsset(json);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [apodAsset]);

  useEffect(() => {
    if (_.isEmpty(epicAsset)) {
      fetch(fetchEpicApi(EPIC_COLOR.NATURAL))
        .then((response) =>
          response?.json().then((json) => {
            setEpicAsset(json);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [epicAsset]);

  useEffect(() => {
    if (!alerts && !reloading) {
      fetch(fetchWeatherApi())
        .then((response) => response?.json())
        .then((json) => {
          setAlerts(json);
        })
        .catch((error) => console.error(error));
    }
    setReload(false);
  }, [alerts, reloading]);

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
          asset={apodAsset}
        />
        <Epic
          modalIsOpen={selectedIndex === 2}
          closeModal={() => setSelectedIndex(0)}
          assets={epicAsset}
        />
        <Weather
          modalIsOpen={selectedIndex === 3}
          closeModal={() => setSelectedIndex(0)}
          alerts={alerts}
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
