import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { SecurityRequestFormSubmission } from "../common/SecurityRequestFormSubmission.ts";
import TopBanner from "../components/TopBanner.tsx";
import sanitationBackground from "../images/sanitationBackground.webp";
import { SecuritySubmitButton } from "../components/SecuritySubmitButton.tsx";
import axios from "axios";

function SecurityService() {
  const [form, setFormResponses] = useState<SecurityRequestFormSubmission>({
    name: "",
    location: "",
    priority: "",
    securityPersonnel: "",
    securityCategory: "",
    securityDetail: "",
    status: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }

  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, location: e.target.value });
    return e.target.value;
  }

  function handlePriorityInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, priority: e.target.value });
  }

  function handleSecurityPersonnelInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, securityPersonnel: e.target.value });
    return e.target.value;
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }

  function handleSecurityCategoryInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, securityCategory: e.target.value });
    return e.target.value;
  }

  function handleSecurityDetailInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, securityDetail: e.target.value });
    return e.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      location: "",
      priority: "",
      securityDetail: "",
      securityCategory: "",
      securityPersonnel: "",
      status: "",
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
        backgroundImage: `url(${sanitationBackground})`,
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
            Security Service Form
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
          <Typography color={"black"}>Location:</Typography>
          <DropDown
            label={"Location"}
            returnData={form.location}
            handleChange={handleLocationInput}
            items={nodeNumbers}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Priority of Security:</Typography>
          <RadioButtonsGroup
            label={"Priority"}
            options={["Low", "Medium", "High", "Emergency"]}
            returnData={form.priority}
            handleChange={handlePriorityInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Security Personnel:</Typography>
          <DropDown
            items={["Local Security", "Local Police", "State Police", "Other"]}
            handleChange={handleSecurityPersonnelInput}
            label={"Personnel"}
            returnData={form.securityPersonnel}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Why is Security Needed:</Typography>
          <DropDown
            items={[
              "I feel generally unsafe",
              "I would like to report someone",
              "I would like to report something",
              "I would like someone removed from my room",
              "There is a major emergency",
              "Other",
            ]}
            handleChange={handleSecurityCategoryInput}
            label={"Category"}
            returnData={form.securityCategory}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>
            Additional Details (optional):
          </Typography>
          <LeftAlignedTextbox
            label={"Details"}
            value={form.securityDetail}
            onChange={handleSecurityDetailInput}
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
          <SecuritySubmitButton input={form} text={"SUBMIT"} clear={clear} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default SecurityService;