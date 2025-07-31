import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import {
  BASE_MODAL_STYLE,
  composeEpicImageUrl,
  EPIC_COLOR,
  EPIC_INTERVAL,
  fetchEpicApi,
} from "./constants";
import ReactModal from "react-modal";
import { BasicTab } from "./mui/BasicTab";
import { Box } from "@mui/material";
import Image from "next/image";
type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

type EpicReponse = {
  caption: string;
  date: string;
  identifier: string;
  image: string;
  centroid_coordinates: { lat: number; lon: number };
};

export const Epic: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [assets, setAssets] = useState<EpicReponse[]>([]);
  const [asset, setAsset] = useState<EpicReponse | null>();
  // eslint-disable-next-line prefer-const
  let [assetIndex, setAssetIndex] = useState(0);
  const [color, setColor] = useState<EPIC_COLOR>(EPIC_COLOR.NATURAL);
  const [albums, setAlbum] = useState<{ [key: string]: EpicReponse[] }>({});

  useEffect(() => {
    if (albums?.[color]) {
      setAssets(albums[color]);
      setAsset(albums[color][0]);
      setAssetIndex(0);
      return;
    } else {
      fetch(fetchEpicApi(color))
        .then((response) =>
          response?.json().then((json) => {
            setAssets(json);
            setAsset(json[0]);
            setAssetIndex(0);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [color, albums]);

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
    if (assetIndex < assets.length - 1) {
      assetIndex++;
      setAssetIndex(assetIndex);
      setAsset(assets[assetIndex]);
    }
    if (assetIndex === assets.length - 1) {
      setAssetIndex(0);
      setAsset(assets[0]);
    }
  }, EPIC_INTERVAL);

  if (!asset) {
    return null;
  }

  function onTabChange(e: BaseSyntheticEvent) {
    albums[color] = assets;
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
        <BasicTab handleChange={onTabChange} value={color} />
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
        <Image src={composeEpicImageUrl(asset.image, asset.date, color)} alt="epic" width={1000} height={1000} />
      </div>
    </ReactModal>
  );
};
