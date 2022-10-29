import {Button, IconButton} from "@mui/material";
import {Stored} from "../models/Stored";
import {ProductionOrder} from "../models/ProductionOrder";
import React, { MouseEventHandler } from "react";
import { Turn } from "../models/Turn";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";

export const TurnControlListItem = (props: { onClick: MouseEventHandler<HTMLButtonElement>; turn: Turn }) => {

  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
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
      {!props.turn.done ? <Button style={{ background: 'white', color: '#03396c' }} onClick={props.onClick}>
        <h2>Realizar Control</h2>
      </Button> : (props.turn.passedControl ?
          <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} onClick={() => navigate('/viewControl' + props.turn.machine.name + '/' + props.turn.id)} /> :
          <IconButton>
            <CancelIcon fontSize={"inherit"} style={{ fontSize: '60px' }} onClick={() => navigate('/viewControl' + props.turn.machine.name + '/' + props.turn.id)} />
          </IconButton>
        )
      }
    </div>
  );
};