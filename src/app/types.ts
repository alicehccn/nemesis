export type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  asset?: ApodResponse;
};

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
