import {ProductionTime} from "./ProductionTime";

export interface ProductionOrder {
  id: number;
  orderNumber: number;
  internalNumber: number;
  matrixCode: string;
  amountOfPieces: number;
  finalAmountOfPieces: number;
  missingPieces: number;
  date: Date;
  observations: string;
  finished: boolean;
  productionTime: ProductionTime[];
  amountOfDustUsed: number;
  state: string;
}

export interface CreateProductionOrderModel {
  orderNumber: number;
  internalNumber: number;
  amountOfPieces: number;
  observations: string;
}
