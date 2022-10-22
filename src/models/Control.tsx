import {Check} from "./Check";
import {Machine} from "./Machine";
import {ProductionOrder} from "./ProductionOrder";

export interface Control {
  id: number;
  checks: Check[];
  scrap: number;
  machine: Machine;
  localDate: Date;
  productionOrder: ProductionOrder;
}
