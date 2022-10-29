import {Button} from "@mui/material";
import React, { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";
import {ProductionOrder} from "../models/ProductionOrder";

export const ActiveProcessListItem = (props: { onClick: MouseEventHandler<HTMLButtonElement>; order: ProductionOrder }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div>
          <h1> {"OP#" + props.order.orderNumber} </h1>
          <h2 style={{ fontWeight: "normal" }}> {(props.order.internalNumber === 202 ? "Tuerca" : (props.order.internalNumber === 293 ? "Piston" : "Guia")) + " - " + props.order.amountOfPieces + " unidades"} </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button style={{ background: 'white', color: '#03396c', margin: '2px' }} onClick={props.onClick}>
            <h2>Ver Detalle</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};