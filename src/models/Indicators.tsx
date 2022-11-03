import { Item } from "./Item";
import {Machine} from "./Machine";
import {ProductionOrder} from "./ProductionOrder";

export interface BaseMaterialIndicator {
  id: number;
  tuercaPercentage: number;
  pistonPercentage: number;
  guiaPercentage: number;
  date: Date;
}

export interface QualityIndicator {
  id: number;
  prensaQuality: number;
  sinterizadoQuality: number;
  roscadoQuality: number;
  tornoQuality: number;
  pavonadoQuality: number;
  date: Date;
}

export interface ProductivityIndicator {
  id: number;
  tuercaProductivity: number;
  pistonProductivity: number;
  guiaProductivity: number;
  date: Date;
}

export interface HourProductivityIndicator {
  id: number;
  tuercaHourProductivity: number;
  pistonHourProductivity: number;
  guiaHourProductivity: number;
  date: Date;
}
