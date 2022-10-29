import React from "react";
import {StockModel} from "../models/Stock";

export const StockListItem = (props: { stock: StockModel }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <div>
        <h1 style={{ textAlign: "center" }}> Polvo </h1>
        <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfDust + " toneladas"} </h2>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Polvo Reciclado </h1>
        <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfDustRecycled + " toneladas"} </h2>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Tuercas </h1>
        <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfTuerca + " unidades"} </h2>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Piston </h1>
        <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfPiston + " unidades"} </h2>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Guias </h1>
        <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stock.amountOfGuia + " unidades"} </h2>
      </div>
    </div>
  );
};