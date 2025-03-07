import { MapNodeType } from "common/src/map/MapNodeType.ts";
import client from "./bin/database-connection.ts";
import { Coordinates } from "common/src/Coordinates.ts";

export class FloorNodes {
  mapNodes: MapNodeType[];
  floor: string;
  nodes: {
    nodeID: string;
    coordinates: Coordinates;
  }[];

  public constructor(floor: string) {
    this.mapNodes = [];
    this.floor = floor;
    this.nodes = [];
  }

  async putIntoTypes() {
    this.mapNodes = await client.node.findMany();
    for (let i = 0; i < this.mapNodes.length; i++) {
      if (this.mapNodes[i].floor === this.floor) {
        this.nodes[i] = {
          nodeID: this.mapNodes[i].nodeID,
          coordinates: {
            x: this.mapNodes[i].xcoord,
            y: this.mapNodes[i].ycoord,
          },
        };
      }
    }

    return this.nodes;
  }
}
