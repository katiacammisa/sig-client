import {Button} from "@mui/material";
import { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";
import {Failure} from "../models/Failure";
import {ProductionOrder} from "../models/ProductionOrder";

export const FailureListItem = (props: { onClick: MouseEventHandler<HTMLButtonElement>; failure: Failure }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div>
          <h2> {props.failure.machine.name} </h2>
          <h3 style={{ fontWeight: 'normal' }} > {props.failure.date.toString()} </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)', margin: '2px' }} className={'homeButton'} onClick={props.onClick}>
            <h2>Ver Detalle</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};