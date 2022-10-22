import {Machine} from "./Machine";

export interface ProductionTime {
  id: number;
  machine: Machine;
  startTime: Date;
  endTime: Date;
}
