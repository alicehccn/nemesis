import ReactModal from "react-modal";
import { fetchApodApi, APOD_HOMEPAGE, BASE_MODAL_STYLE } from "../constants";
import { Accordion, AccordionSummary, Box } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { ApodResponse, ModalProps } from "../types";
import { PickerValue } from "@mui/x-date-pickers/internals";

export const APOD: React.FC<ModalProps> = ({
  modalIsOpen,
  closeModal,
  asset,
}) => {
  const today = new Date();
  const [value, setValue] = useState<Dayjs>(dayjs(asset?.date) ?? dayjs(today));
  const [currentAsset, setCurrentAsset] = useState<ApodResponse | undefined>(
    asset,
  );

  useEffect(() => {
    if (asset && !currentAsset) {
      setCurrentAsset(asset);
    }
  }, [asset, currentAsset]);

  if (!currentAsset) {
    return;
  }

  const handleDateChange = (newValue: PickerValue) => {
    setValue(dayjs(newValue));
    fetch(fetchApodApi(value.toDate()))
      .then((response) =>
        response?.json().then((json) => {
          setCurrentAsset(json);
        }),
      )
      .catch((error) => console.error(error));
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          ...BASE_MODAL_STYLE,
          width: "min-content",
          height: "auto",
        },
      }}
      contentLabel="APOD Modal"
      ariaHideApp={false}
    >
      <div className="apod">
        <Accordion>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <h2>{currentAsset?.title}</h2>
            <ExpandMoreIcon width="30px" height="100%" className="expand" />
          </AccordionSummary>
          <AccordionDetails>
            <p>{currentAsset?.explanation}</p>
          </AccordionDetails>
        </Accordion>

        {currentAsset?.media_type === "image" && (
          <Image alt="apod" src={currentAsset?.url} width={1000} height={500} />
        )}
        {currentAsset?.media_type === "html" && (
          <embed type="text/html" src={currentAsset?.url} />
        )}
        {currentAsset?.media_type === "video" && (
          <iframe src={currentAsset?.url + "?autoplay=1"} />
        )}
        <Box width="100%" display="flex" justifyContent="space-around">
          <small>
            <a target="_blank" href={APOD_HOMEPAGE}>
              &copy; {currentAsset?.copyright ?? "NASA"}
            </a>
          </small>
          {currentAsset?.date && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Search date"
                value={value}
                onChange={(newValue) => handleDateChange(newValue)}
                className="date-picker"
                maxDate={dayjs(today)}
              />
            </LocalizationProvider>
          )}
        </Box>
      </div>
    </ReactModal>
  );
};
