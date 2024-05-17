import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number"; // Define type prop to indicate input type
}

const StyledDiv = styled('div')({
  display: "flex",
  justifyContent: "center",
  "& .MuiTextField-root": {
    minWidth: "150px", // Adjust width as needed
    maxWidth: "220px",
    minHeight: "75px",
  },
});

export const CenterAlignedNumTextbox = (props: TextboxProps) => {
  return (
    <StyledDiv>
      <TextField
        id="outlined-number"
        label={props.label}
        variant="outlined"
        type={props.type} // Set input type
        inputProps={{ min: 0 }}
        value={props.value}
        onChange={props.onChange}
      />
    </StyledDiv>
  );
};
