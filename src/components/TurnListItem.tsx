import {Button} from "@mui/material";
import React, { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";
import {ProductionOrder} from "../models/ProductionOrder";
import { Turn } from "../models/Turn";

export const TurnListItem = (props: { turn: Turn }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div>
          <h1> {"Piezas terminadas: " + props.turn.pieces} </h1>
          <h1> {"Máquina: " + props.turn.machine.name} </h1>
          <h2 style={{ fontWeight: "normal" }}> {"Hecho por: " + props.turn.responsible} </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <h1> {"Turno: " + props.turn.turn} </h1>
          <h2 style={{ fontWeight: "normal" }}> {props.turn.localDate.toString()} </h2>
        </div>
      </div>
    </div>
  );
};