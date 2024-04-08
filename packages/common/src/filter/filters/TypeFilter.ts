import Filter from "./Filter.ts";
import { FilterName } from "../FilterName.ts";
import MapNode from "../../map/MapNode.ts";

export default class TypeFilter extends Filter {
  public constructor() {
    super(FilterName.TYPE);
  }

  applyFilter(nodes: MapNode[]): MapNode[] {
    const newNodes: MapNode[] = [];

    nodes.forEach((node) => {
      if (
        this.filterValues &&
        this.filterValues.includes(node.nodeType as never)
      ) {
        newNodes.push(node);
      }
    });

    return newNodes;
  }
}