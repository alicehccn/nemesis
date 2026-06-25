/* eslint-disable @typescript-eslint/no-unused-vars */

import Button from "@mui/material/Button";
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
    <div>
      {MENU_OPTIONS.map((option, index) => (
        <Button
          key={option}
          variant="contained"
          onClick={() => {
            handleButtonClick(index);
          }}
          size="large"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};
