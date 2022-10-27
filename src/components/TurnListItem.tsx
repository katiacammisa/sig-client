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
          <h2> {"Piezas terminadas: " + props.turn.pieces} </h2>
          <h2> {"Máquina: " + props.turn.machine.name} </h2>
          <h3 style={{ fontWeight: "normal" }}> {"Hecho por: " + props.turn.responsible} </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <h2> {"Turno: " + props.turn.turn} </h2>
          <h3 style={{ fontWeight: "normal" }}> {props.turn.localDate.toString()} </h3>
        </div>
      </div>
    </div>
  );
};