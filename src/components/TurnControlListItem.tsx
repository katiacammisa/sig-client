import {Button} from "@mui/material";
import {Stored} from "../models/Stored";
import {ProductionOrder} from "../models/ProductionOrder";
import React, { MouseEventHandler } from "react";
import { Turn } from "../models/Turn";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';

export const TurnControlListItem = (props: { onClick: MouseEventHandler<HTMLButtonElement>; turn: Turn }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
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
      {!props.turn.done ? <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={props.onClick}>
        <p>Realizar Control</p>
      </Button> : (props.turn.passedControl ?
          <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> :
          <CancelIcon fontSize={"inherit"} style={{ fontSize: '60px' }} />
        )

      }
    </div>
  );
};