import { Machine } from "./Machine";

export interface Failure {
  id: number;
  responsible: string;
  description: string;
  machine: Machine;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface CreateFailureModel {
  responsible: string;
  description: string;
  machine: string;
  startTime: string;
  endTime: string;
}
