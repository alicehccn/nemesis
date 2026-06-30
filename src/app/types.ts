import { Feature } from "geojson";
export type ApodResponse = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
};

export type ApodProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  asset: ApodResponse | undefined;
};

export type EpicResponse = {
  caption: string;
  date: string;
  identifier: string;
  image: string;
  centroid_coordinates: { lat: number; lon: number };
};
export type EpicProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  assets: EpicResponse[] | [];
};

export type AlertGroup = {
  features: Feature[];
  updated: string;
  type: "FeatureCollection";
};

export type NoaaProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  alerts: AlertGroup | undefined;
};
