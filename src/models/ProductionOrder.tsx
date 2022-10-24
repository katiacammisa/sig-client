import {ProductionTime} from "./ProductionTime";

export interface ProductionOrder {
  id: number;
  orderNumber: number;
  internalNumber: number;
  matrixCode: string;
  amountOfPieces: number;
  date: Date;
  observations: string;
  finished: boolean;
  productionTime: ProductionTime[];
  amountOfDust: number;
  state: string;
}

export interface CreateProductionOrderModel {
  orderNumber: number;
  internalNumber: number;
  matrixCode: string;
  amountOfPieces: number;
  observations: string;
}
