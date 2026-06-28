/* eslint-disable @typescript-eslint/no-unused-vars */

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import { MENU_OPTIONS } from "../constants";

interface CatalogProps {
  setSelectedIndex: (arg0: number) => void;
  selectedIndex: number;
}

export const Catalog: React.FC<CatalogProps> = ({
  selectedIndex,
  setSelectedIndex,
}) => {
  const handleButtonClick = (index: number) => {
    setSelectedIndex(index + 1);
  };

  return (
    <>
      {MENU_OPTIONS.map((option, index) => (
        <Button
          key={option.title}
          variant="contained"
          onClick={() => {
            handleButtonClick(index);
          }}
          size="large"
        >
          {option.title}
        </Button>
      ))}
    </>
  );
};
