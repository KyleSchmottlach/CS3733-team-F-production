import { MapEdgeType } from "common/src/map/MapEdgeType.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
// import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { NodeBFS } from "common/src/NodeBFS.ts";
import client from "./bin/database-connection.ts";
import Algorithms from "./Algorithms.ts";
import { Coordinates } from "common/src/Coordinates.ts";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";

export class BFSalgorithm extends Algorithms {
  all_nodes: NodeBFS[];

  constructor() {
    super();
    this.all_nodes = [];
  }

  async loadData(): Promise<void> {
    const edges: MapEdgeType[] = await client.edge.findMany();
    const nodes: MapNodeType[] = await client.node.findMany();

    if (!edges) return;
    if (!nodes) return;

    for (let i = 0; i < edges.length; i++) {
      const start_node_now: NodeBFS = {
        current_node: edges[i].startNodeID,
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
        inUse: false,
      };

      const end_neighbor_now: NodeBFS = {
        current_node: edges[i].endNodeID,
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
        inUse: false,
      };

      // adds coordinates
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].nodeID === start_node_now.current_node) {
          start_node_now.x_coordinate = Number(nodes[j].xcoord);
          start_node_now.y_coordinate = Number(nodes[j].ycoord);
        }
        if (nodes[j].nodeID === end_neighbor_now.current_node) {
          end_neighbor_now.x_coordinate = Number(nodes[j].xcoord);
          end_neighbor_now.y_coordinate = Number(nodes[j].ycoord);
        }
      }

      // checks if the node already exists
      const isStartNodePresent = this.all_nodes.some(
        (node) => node.current_node === start_node_now.current_node,
      );
      const isNeighborNodePresent = this.all_nodes.some(
        (node) => node.current_node === end_neighbor_now.current_node,
      );

      if (!isStartNodePresent) {
        this.all_nodes.push(start_node_now);
      }

      if (!isNeighborNodePresent) {
        this.all_nodes.push(end_neighbor_now);
      }

      // adds neighboring nodes
      for (let j = 0; j < this.all_nodes.length; j++) {
        if (this.all_nodes[j].current_node === start_node_now.current_node)
          this.all_nodes[j].neighbors.push(end_neighbor_now.current_node);
        if (this.all_nodes[j].current_node === end_neighbor_now.current_node)
          this.all_nodes[j].neighbors.push(start_node_now.current_node);
      }
    }
  }

  getCoordinates(currentNode: string): Coordinates {
    return super.getCoordinates(currentNode);
  }

  runAlgorithm(start: string, end: string): TypeCoordinates[] {
    const start_node = this.all_nodes.find(
      (node) => node.current_node === start,
    );
    const end_node = this.all_nodes.find((node) => node.current_node === end);

    // Check if start and end nodes are found
    if (!start_node || !end_node) {
      console.error("Start or end node not found.");
      return [];
    }

    const queue: NodeBFS[] = [];
    const parentsMap: Map<string, NodeBFS[]> = new Map(); // Map to store parent nodes for each node
    const visited: boolean[] = new Array(this.all_nodes.length).fill(false);

    visited[start_node.index] = true;
    queue.push(start_node);

    while (queue.length !== 0) {
      const current_node = queue.shift();

      if (current_node) {
        if (current_node === end_node) {
          // backtrack from end node to start node
          const path: string[] = []; // array to store the shortest path
          // const coordinate_path: IDCoordinates[] = [];
          let current = end_node; // initialize to be the starting node
          while (current !== start_node) {
            // loop to check if the current node is the starting node
            path.unshift(current.current_node); // adds the current node to the beginning of the path
            // coordinate_path.unshift({
            //   nodeID: current.current_node,
            //   coordinates: {
            //     x: current.x_coordinate,
            //     y: current.y_coordinate,
            //   },
            // });

            const parents = parentsMap.get(current.current_node);
            if (parents && parents.length > 0)
              current = parents[0]; // choose the first parent because of BFS algorithm
            else {
              console.error(
                "Error: Parent not found for node",
                current.current_node,
              );
              return [];
            }
          }
          path.unshift(start_node.current_node); // adds the first node to index 0
          // coordinate_path.unshift({
          //   nodeID: start_node.current_node,
          //   coordinates: {
          //     x: start_node.x_coordinate,
          //     y: start_node.y_coordinate,
          //   },
          // });
          // console.log(path.join(" -> "));
          return [];
        }

        for (let i = 0; i < current_node.neighbors.length; i++) {
          const neighbor_index = this.all_nodes.findIndex(
            (node) => node.current_node === current_node.neighbors[i],
          );
          if (neighbor_index !== -1 && !visited[neighbor_index]) {
            visited[neighbor_index] = true;
            queue.push(this.all_nodes[neighbor_index]);

            // lines below help to add this current node as the parent of all neighboring nodes
            const parents = parentsMap.get(current_node.neighbors[i]) || []; // gets the current parents for the node
            parents.push(current_node); // adds a parent to the node
            parentsMap.set(current_node.neighbors[i], parents); // sets the neighbor parents to updated parents
          }
        }
      }
    }

    return [];
  }
}
