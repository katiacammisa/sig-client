import { Item } from "./Item";
import {Machine} from "./Machine";
import {ProductionOrder} from "./ProductionOrder";

export interface Control {
  values: number[],
  turnId: number
}
