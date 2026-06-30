import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import {
  BASE_MODAL_STYLE,
  composeEpicImageUrl,
  EPIC_COLOR,
  EPIC_INTERVAL,
  EPIC_TAB,
  fetchEpicApi,
  TAB_PROPS,
} from "../constants";
import ReactModal from "react-modal";
import { Box, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import { EpicProps, EpicResponse } from "../types";

export const Epic: React.FC<EpicProps> = ({
  modalIsOpen,
  closeModal,
  assets,
}) => {
  const [currentAssets, setCurrentAssets] = useState<EpicResponse[]>(assets);
  const [asset, setAsset] = useState<EpicResponse | null>(assets[0]);
  // eslint-disable-next-line prefer-const
  let [assetIndex, setAssetIndex] = useState(0);
  const [color, setColor] = useState<EPIC_COLOR>(EPIC_COLOR.NATURAL);
  const [albums, setAlbum] = useState<{ [key: string]: EpicResponse[] }>({});

  useEffect(() => {
    if (!albums[color]) {
      fetch(fetchEpicApi(color))
        .then((response) =>
          response?.json().then((json) => {
            setCurrentAssets(json);
            setAsset(json[0]);
            setAssetIndex(0);
            albums[color] = json;
            setAlbum(albums);
          }),
        )
        .catch((error) => console.error(error));
    } else {
      setAssetIndex(0);
      setCurrentAssets(albums[color]);
      setAsset(albums[color][0]);
    }
  }, [color]);

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
    if (assetIndex < currentAssets.length - 1) {
      assetIndex++;
      setAssetIndex(assetIndex);
      setAsset(currentAssets[assetIndex]);
    }
    if (assetIndex === currentAssets.length - 1) {
      setAssetIndex(0);
      setAsset(currentAssets[0]);
    }
  }, EPIC_INTERVAL);

  if (!asset) {
    return null;
  }

  function onTabChange(e: BaseSyntheticEvent) {
    albums[color] = currentAssets;
    setAlbum(albums);
    setColor(e.target.id);
    setAssetIndex(0);
  }
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          ...BASE_MODAL_STYLE,
          maxWidth: "800px",
        },
      }}
      contentLabel="EPIC Modal"
      ariaHideApp={false}
    >
      <div className="epic">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={color} onChange={onTabChange} aria-label={color}>
              {EPIC_TAB.map((tab, i) => (
                <Tab key={i} {...TAB_PROPS(i)} />
              ))}
            </Tabs>
          </Box>
        </Box>
        <a target="_blank" href="https://epic.gsfc.nasa.gov">
          <Box
            display="flex"
            justifyContent="space-evenly"
            width="100%"
            position="fixed"
            bottom="0"
            margin="5px 0"
            color="#808080"
            fontSize={14}
          >
            <div>Lat: {asset?.centroid_coordinates?.lat}</div>
            <div>Lng: {asset?.centroid_coordinates?.lon}</div>
            <div>{asset?.date}</div>
          </Box>
        </a>
        <Image
          src={composeEpicImageUrl(asset.image, asset.date, color)}
          alt="epic"
          width={1000}
          height={1000}
        />
      </div>
    </ReactModal>
  );
};
