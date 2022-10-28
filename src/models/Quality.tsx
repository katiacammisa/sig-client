import { Item } from "./Item";
import {Machine} from "./Machine";
import {ProductionOrder} from "./ProductionOrder";
import { Turn } from "./Turn";

export interface Quality {
  id: number;
  sample1: number[];
  sample2: number[];
  sample3: number[];
  sample4: number[];
  sample5: number[];
  turn: Turn;
}
