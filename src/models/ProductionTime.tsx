import {Machine} from "./Machine";

export interface ProductionTime {
  id: number;
  machine: Machine;
  start: Date;
  end: Date;
}
