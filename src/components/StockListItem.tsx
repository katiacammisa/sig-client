import React from "react";
import {StockModel} from "../models/Stock";

export const StockListItem = (props: { stock: StockModel }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <div>
        <h2> Tuercas </h2>
        <h3 style={{ fontWeight: "normal" }}> {props.stock.amountTuercas + " unidades"} </h3>
      </div>
      <div>
        <h2> Piston </h2>
        <h3 style={{ fontWeight: "normal" }}> {props.stock.amountPiston + " unidades"} </h3>
      </div>
      <div>
        <h2> Guias </h2>
        <h3 style={{ fontWeight: "normal" }}> {props.stock.amountGuia + " unidades"} </h3>
      </div>
    </div>
  );
};