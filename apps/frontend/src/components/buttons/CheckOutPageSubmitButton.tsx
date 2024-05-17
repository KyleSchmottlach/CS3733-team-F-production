import { Alert, AlertProps, Button, Snackbar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import {Link} from "react-router-dom";
import {CheckOutPageFormSubmission} from "../../common/formSubmission/CheckOutPageFormSubmission.ts";
import InitCart from "../../common/InitCart.ts";


interface ButtonProps {
  text: string;
  input: CheckOutPageFormSubmission;
  clear: () => void;
}

export function CheckOutPageSubmitButton(props: ButtonProps) {
  // Logic for snackbar alert
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />;
    },
  );

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function openWithSuccess() {
    setType("success");
    setMessage("Thank you for your order!");
    setOpen(true);
  }

  function openWithError(message: string) {
    setType("error");
    setMessage(message);
    setOpen(true);
  }

  // Handles the onClick for the submit button and will continue only if all required fields are filled out
  async function handleSubmit() {
    if (props.input.nameOnCard === "") {
      openWithError("Please enter your name");
    }  else if (props.input.cardNum === "") {
      openWithError("Please enter your card number");
    } else if (props.input.expiration === "") {
      openWithError("Please select a expiration");
    } else if (props.input.cvc === "") {
      openWithError("Please enter your cvc");
    } else {
      console.log(props.input);
      console.log(props.input);

        handleClear();
        openWithSuccess();

        InitCart.clearCart();
    }
  }

  function handleClear() {
    props.clear();
  }






  return (
    <Link to={"/Cart"} state={props.input} onClick={() => handleSubmit()}>
      <Button
        variant="contained"
        id={"submitButton"}
      >
        {props.text}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          {/*@ts-expect-error Severity will only be of type "success" or "error"*/}
          <SnackbarAlert severity={type}>{message}</SnackbarAlert>
        </Snackbar>
      </Button>
    </Link>
  );
}
