import {Button} from "@mui/material";
import React, { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";
import {ProductionOrder} from "../models/ProductionOrder";

export const ActiveProcessListItem = (props: { onClick: MouseEventHandler<HTMLButtonElement>; order: ProductionOrder }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div>
          <h2> {"OP#" + props.order.orderNumber} </h2>
          <h3 style={{ fontWeight: "normal" }}> {(props.order.internalNumber === 202 ? "Tuerca" : (props.order.internalNumber === 293 ? "Piston" : "Guia")) + " - " + props.order.amountOfPieces + " unidades"} </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000', margin: '2px' }} className={'homeButton'} onClick={props.onClick}>
            Ver Detalle
          </Button>
        </div>
      </div>
    </div>
  );
};