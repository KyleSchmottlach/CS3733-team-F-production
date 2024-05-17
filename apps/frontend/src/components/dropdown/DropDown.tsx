import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel, SelectVariants,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {LabelValuePair} from "../../common/LabelValuePair.ts";

interface DropDownProps {
  items: LabelValuePair[] | string[];
  handleChange: (event: SelectChangeEvent) => string;
  label: string;
  returnData: string | number;
  variant?: SelectVariants;
}

const isOptionArray = (
  items: LabelValuePair[] | string[],
): items is LabelValuePair[] => {
  return (
    items.length > 0 &&
    typeof items[0] === "object" &&
    "value" in items[0] &&
    "label" in items[0]
  );
};

const StyledDiv = styled('div')({
  display: "flex",
  justifyContent: "center",
  minWidth: "150px", // Adjust width as needed
});

export function DropDown(props: DropDownProps) {
  const handleSelectChange = (event: SelectChangeEvent) => {
    props.handleChange(event);
  };

  const renderItems = () => {
    if (isOptionArray(props.items)) {
      return props.items.map((item) => (
        <MenuItem key={item.label} value={item.value}>
          {item.label}
        </MenuItem>
      ));
    } else {
      return props.items.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ));
    }
  };

  return (
    <StyledDiv>
      <FormControl sx={{ width: 220, height: 75 }}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            textAlign: "left", // Center text within the label
            width: "100%", // Ensure full width
          }}
        >
          {props.label}
        </InputLabel>
        <Select
          onChange={handleSelectChange}
          value={props.returnData}
          defaultValue={""}
          variant={props.variant}
          labelId="demo-simple-select-label"
          label={props.label}
          sx={
            {
              // mx: "12px",
              // my: "7px",
            }
          }
        >
          {renderItems()}
        </Select>
      </FormControl>
    </StyledDiv>
  );
}
