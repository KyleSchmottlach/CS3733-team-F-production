import { Alert, AlertProps, Button, Snackbar } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import axios from "axios";
import { forwardRef, useState } from "react";

interface ButtonProps {
  text: string;
  input: FlowerDeliveryFormSubmission;
  clear: () => void;
}

export function SubmitButton(props: ButtonProps) {
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
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function openWithSuccess() {
    setType("success");
    setMessage("Form submitted successfully!");
    setOpen(true);
  }

  function openWithError(message: string) {
    setType("error");
    setMessage(message);
    setOpen(true);
  }

  // Handles the onClick for the submit button and will continue only if all required fields are filled out
  async function handleSubmit() {
    if (props.input.flowerType === "") {
      openWithError("Please select a flower type");
    } else if (props.input.name === "") {
      openWithError("Please enter your name");
    } else if (props.input.recipientName === "") {
      openWithError("Please enter the recipient's name");
    } else if (props.input.roomNumber === "") {
      openWithError("Please enter a valid room number");
    } else {
      const submission = props.input;
      console.log(props.input);

      const result = await pushToDB(submission);

      if (!result) {
        openWithError("Failed to post form data to database");
      } else {
        handleClear();
        openWithSuccess();
      }
    }
  }

  function handleClear() {
    props.clear();
  }

  // Function for posting the form submission to the database
  async function pushToDB(form: FlowerDeliveryFormSubmission) {
    const returnData = {
      userID: "admin",
      nodeID: form.roomNumber,
      serviceType: "flower-delivery",
      services: JSON.stringify(form),
    };

    const res = await axios
      .post("/api/database/servicerequest", returnData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((e) => {
        console.log(`Failed to send form data to database: ${e}`);
      });
    if (res != undefined) {
      console.log(`Success: response code - ${res.status}`);
      return true;
    }

    return false;
  }

  return (
    <Button
      variant="contained"
      id={"submitButton"}
      onClick={() => handleSubmit()}
      color={"secondary"}
    >
      {props.text}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/*@ts-expect-error Severity will only be of type "success" or "error"*/}
        <SnackbarAlert severity={type}>{message}</SnackbarAlert>
      </Snackbar>
    </Button>
  );
}
