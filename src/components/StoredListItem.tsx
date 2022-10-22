import {Button} from "@mui/material";
import React, { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";

export const StoredListItem = (props: { onClick: MouseEventHandler<HTMLButtonElement>; stored: Stored }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div>
          <h2> {props.stored.product} </h2>
          <h3 style={{ fontWeight: "normal" }}> {props.stored.amount + (props.stored.product === "Polvo" ?  " kg" : " unidades")} </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {props.stored.nextProcess.map((element) => {
            return (
              <Button variant="contained" style={{ backgroundColor: '#000000', margin: '2px' }} className={'homeButton'} onClick={props.onClick}>
                {element}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};