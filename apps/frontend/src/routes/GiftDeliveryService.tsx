import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { GiftDeliveryFormSubmission } from "../common/GiftDeliveryFormSubmission.ts";
import TopBanner from "../components/TopBanner.tsx";
import giftbackground from "../../public/giftbackground.jpg";
import { GiftDeliverySubmitButton } from "../components/GiftDeliverySubmitButton.tsx";
import React from "react";
import Confetti from "react-confetti";
import axios from "axios";

function GiftDeliveryService() {
  const [form, setFormResponses] = useState<GiftDeliveryFormSubmission>({
    name: "",
    recipientName: "",
    status: "",
    location: "",
    message: "",
    delivery: "",
    giftSize: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }
  function handlerecipientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, recipientName: e.target.value });
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }
  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, location: e.target.value });
    return e.target.value;
  }
  function handleMessageInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, message: e.target.value });
  }
  function handleDeliveryInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, delivery: e.target.value });
  }

  function handleGiftSizeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, giftSize: e.target.value });
    return e.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      recipientName: "",
      status: "",
      location: "",
      message: "",
      delivery: "",
      giftSize: "",
    });
  }

  // Define an interface for the node data
  interface NodeData {
    longName: string;
  }

  // Storing the node numbers in a use state so that we only make a get request once
  const [nodeNumbers, setNodeNumbers] = useState<string[]>([]);

  // GET request to retrieve node numbers wrapped in a useEffect function
  useEffect(() => {
    axios
      .get<NodeData[]>("/api/database/nodes")
      .then((response) =>
        setNodeNumbers(response.data.map((node) => node.longName)),
      )
      .catch((error) => console.error(error));
  }, []);

  const [submittedData, setSubmittedData] = useState<
    GiftDeliveryFormSubmission[]
  >([]);

  function updateList() {
    setSubmittedData([...submittedData, form]);
  }

  const [showConfetti, setShowConfetti] = useState(false);

  function displayConfetti() {
    setShowConfetti(true);
  }

  function hideConfetti() {
    setShowConfetti(false);
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100vw",
        height: "auto",
        display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        backgroundImage: `url(${giftbackground})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <TopBanner />
      <Grid
        container
        direction={"row"}
        rowSpacing={1}
        columnSpacing={5}
        justifyContent={"center"}
        boxShadow={4}
        sx={{
          backgroundColor: "white",
          width: "40vw", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
          mb: "5vh",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#186BD9",
          }}
        >
          <Typography color={"white"} align={"center"} fontSize={40}>
            Gift Delivery Service
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Name:</Typography>
          <LeftAlignedTextbox
            label={"Name"}
            value={form.name}
            onChange={handleNameInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Recipient Name:</Typography>
          <LeftAlignedTextbox
            label={"Recipient Name"}
            value={form.recipientName}
            onChange={handlerecipientNameInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Location:</Typography>
          <DropDown
            label={"Location"}
            returnData={form.location}
            handleChange={handleLocationInput}
            items={nodeNumbers}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Optional Message:</Typography>
          <LeftAlignedTextbox
            label={"Optional Message"}
            value={form.message}
            onChange={handleMessageInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Delivery:</Typography>
          <RadioButtonsGroup
            label={"Delivery"}
            options={[
              "Standard Delivery",
              "Express Delivery",
              "Same Day Delivery",
              "Emergency Delivery",
            ]}
            returnData={form.delivery}
            handleChange={handleDeliveryInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Gift Size:</Typography>
          <RadioButtonsGroup
            label={"Gift Add-on"}
            options={["Small", "Medium", "Large", "Extra Large"]}
            returnData={form.giftSize}
            handleChange={handleGiftSizeInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Status of the request:</Typography>
          <RadioButtonsGroup
            label={"Status"}
            options={["Unassigned", "Assigned", "InProgress", "Closed"]}
            returnData={form.status}
            handleChange={handleStatusInput}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            my: 2,
            justifyContent: "center",
          }}
        >
          {showConfetti && (
            <Confetti
              numberOfPieces={100}
              width={innerWidth}
              height={innerHeight}
              //recycle={false}
            />
          )}
          <GiftDeliverySubmitButton
            text={"SUBMIT"}
            input={form}
            clear={clear}
            updateList={updateList}
            displayConfetti={displayConfetti}
            hideConfetti={hideConfetti}
          />
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: "40vw",
          backgroundColor: "white",
          width: "60vw", //Adjust this to change the width of the table
          height: "auto",
          mb: "5vh",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Recipient Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Optional Message</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Gift Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData.map((item: GiftDeliveryFormSubmission) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align={"right"}>
                  {item.name}
                </TableCell>
                <TableCell align={"right"}>{item.name}</TableCell>
                <TableCell align={"right"}>{item.recipientName}</TableCell>
                <TableCell align={"right"}>{item.status}</TableCell>
                <TableCell align={"right"}>{item.location}</TableCell>
                <TableCell align={"right"}>{item.message}</TableCell>
                <TableCell align={"right"}>{item.delivery}</TableCell>
                <TableCell align={"right"}>{item.giftSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Yitao Hong, Arayah Remillard</Typography>
    </Stack>
  );
}

export default GiftDeliveryService;