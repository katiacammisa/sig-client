import { Item } from "./Item";
import {Machine} from "./Machine";
import {ProductionOrder} from "./ProductionOrder";

export interface Control {
  id: number;
  items: Item[];
  scrap: number;
  machine: Machine;
  localDate: Date;
  productionOrder: ProductionOrder;
  state: string;
}
