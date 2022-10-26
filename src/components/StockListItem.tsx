import React from "react";
import {StockModel} from "../models/Stock";

export const StockListItem = (props: { stock: StockModel }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <div>
        <h2 style={{ textAlign: "center" }}> Polvo </h2>
        <h3 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfDust + " toneladas"} </h3>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}> Polvo Reciclado </h2>
        <h3 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfDustRecycled + " toneladas"} </h3>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}> Tuercas </h2>
        <h3 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfTuerca + " unidades"} </h3>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}> Piston </h2>
        <h3 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfPiston + " unidades"} </h3>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}> Guias </h2>
        <h3 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfGuia + " unidades"} </h3>
      </div>
    </div>
  );
};