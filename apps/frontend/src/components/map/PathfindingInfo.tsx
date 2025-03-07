import {Button, IconButton, Stack} from "@mui/material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import PathAlgorithmSelector from "./map2/PathAlgorithmSelector.tsx";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {PathAlgorithmType} from "../../common/types/PathAlgorithmType.ts";
import {LocationInfo} from "common/src/LocationInfo.ts";
import MapNode from "common/src/map/MapNode.ts";
import axios from "axios";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import TextDirections from "./map2/TextDirections.tsx";
import {Floor} from "common/src/map/Floor.ts";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

interface PathfindingInfoProps {
  startNode: MapNode | null;
  endNode: MapNode | null;
  pathRendered: boolean;
  setPathNodesDataCallback: (newPathNodesData: TypeCoordinates[]) => void;
  setAlgorithmCallback: (algorithm: PathAlgorithmType) => void;
  setFloor: (newFloor: Floor) => void;
  clearPathCallback: () => void;

  generateInitPathSignal: boolean;
  hasGeneratedInitPath: boolean;
  setHasGeneratedInitPath: (pathGenerated: boolean) => void;
}

export default function PathfindingInfo(props: PathfindingInfoProps) {
  const [algorithm, setAlgorithm] = useState<PathAlgorithmType>(PathAlgorithmType.ASTAR);
  const [startNode, setStartNode] = useState<MapNode | null>(props.startNode);
  const [endNode, setEndNode] = useState<MapNode | null>(props.endNode);

  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[]>([]);

  const [textDirectionsEnabled, setTextDirectionsEnabled] = useState<boolean>(false);

  const [generateInitPathSignal, setGenerateInitPathSignal] = useState<boolean>(props.generateInitPathSignal);
  const [hasGeneratedInitPath, setHasGeneratedInitPath] = useState<boolean>(props.hasGeneratedInitPath);

  const setHasGeneratedInitPathCallback = useRef<(hasGenerated: boolean) => void>(props.setHasGeneratedInitPath);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    if (!startNode || !endNode) {
      setErrorMessage("Please enter both start and end nodes");
      return;
    }

    if (startNode.nodeID == endNode.nodeID) {
      setErrorMessage("Please enter different nodes");
      return;
    }

    const request: LocationInfo = {
      algorithm: algorithm,
      startNode: startNode.nodeID,
      endNode: endNode.nodeID,
    };

    try {
      axios.post("/api/path", request, {
        headers: { "Content-Type": "application/json" },
      }).then(res => {
        const data = res.data;
        const path = data.message;

        setPathNodesData(path);
        props.setPathNodesDataCallback(path);
        props.setFloor(startNode.floor as Floor);

        console.log(path);

        if(!path) {
          setErrorMessage("There is no path between nodes");
        } else {
          setErrorMessage("");
        }

        setTextDirectionsEnabled(true);
      });

    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  }, [algorithm, endNode, props, startNode]);

  useEffect(() => {
    setStartNode(props.startNode);
  }, [props.startNode]);

  useEffect(() => {
    setEndNode(props.endNode);
  }, [props.endNode]);

  useEffect(() => {
    setGenerateInitPathSignal(props.generateInitPathSignal);
  }, [props.generateInitPathSignal]);

  useEffect(() => {
    setHasGeneratedInitPath(props.hasGeneratedInitPath);
  }, [props.hasGeneratedInitPath]);

  useEffect(() => {
    if(generateInitPathSignal && !hasGeneratedInitPath) {
      handleSubmit();
      setHasGeneratedInitPathCallback.current(true);
    }
  }, [generateInitPathSignal, handleSubmit, hasGeneratedInitPath]);

  useEffect(() => {
    console.log(`Setting text directions enabled to ${props.pathRendered}`);
    setTextDirectionsEnabled(props.pathRendered);
  }, [props.pathRendered]);

  return (
    <Stack>
      <PathAlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={(algorithm: PathAlgorithmType) => {
          setAlgorithm(algorithm);
          props.setAlgorithmCallback(algorithm);
        }}
      />
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        justifyContent={"center"}
        spacing={2}
      >
        <Button
          startIcon={<AltRouteIcon />}
          variant={"contained"}
          onClick={handleSubmit}
          sx={{
            width: "75%"
          }}
        >
          Find Path
        </Button>
        {textDirectionsEnabled && (
          <IconButton
            onClick={props.clearPathCallback}
          >
            <RotateLeftIcon />
          </IconButton>
        )}
      </Stack>
      <TextDirections
        textDirectionsEnabled={textDirectionsEnabled}
        pathNodesData={pathNodesData}
        setFloor={props.setFloor}
      />
    </Stack>
  );
}
