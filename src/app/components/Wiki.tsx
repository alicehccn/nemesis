import { useState, useEffect } from "react";
import { BASE_MODAL_STYLE, fetchWikiApi, formatDateTime } from "../constants";
import ReactModal from "react-modal";
import { ModalProps } from "../types";

interface WikiLink {
  content_urls: [key: string];
  coordinates: { lat: number; lon: number };
  description: string;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  originalimage: { source: string };
  pageId: string;
  thumbnail: { source: string };
  timestamp: string;
  wikibase_item: string | number;
}

export const Wiki: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [page, setPage] = useState<WikiLink>();

  useEffect(() => {
    if (!page) {
      fetch(fetchWikiApi())
        .then((response) =>
          response?.json().then((json) => {
            setPage(json.tfa);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [page]);

  if (!page) {
    return null;
  }
  console.log(page);
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          ...BASE_MODAL_STYLE,
          maxWidth: "800px",
          height: "auto",
          maxHeight: "100%",
        },
      }}
      contentLabel="Wiki Modal"
      ariaHideApp={false}
    >
      <div className="wiki"></div>
    </ReactModal>
  );
};
