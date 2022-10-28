import { Item } from "./Item";
import {Machine} from "./Machine";
import {ProductionOrder} from "./ProductionOrder";

export interface Turn {
  id: number;
  responsible: string;
  pieces: number;
  machine: Machine;
  localDate: Date;
  productionOrder: ProductionOrder;
  turn: string;
  passedControl: boolean;
  done: boolean;
}

export interface CreateTurnModel {
  responsible: string;
  pieces: number;
  machine: string;
  productionOrder: ProductionOrder;
  turn: string;
  passed: boolean;
}
