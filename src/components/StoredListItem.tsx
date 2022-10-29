import {Button} from "@mui/material";
import React, { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";

export const StoredListItem = (props: { stored: Stored }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <h1 style={{ textAlign: "center" }}> {props.stored.product} </h1>
      <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.stored.amount + (props.stored.product === "Polvo" ?  " kg" : " unidades")} </h2>
    </div>
  );
};