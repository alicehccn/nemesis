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
    <>
      {MENU_OPTIONS.map((option, index) => (
        <Button
          key={option}
          onClick={() => {
            handleButtonClick(index);
          }}
        >
          {option}
        </Button>
      ))}
    </>
  );
};
