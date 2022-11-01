import {Button} from "@mui/material";
import { MouseEventHandler } from "react";
import {Stored} from "../models/Stored";
import {Failure} from "../models/Failure";
import {ProductionOrder} from "../models/ProductionOrder";

export const FailureListItem = (props: { failure: Failure }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
          <h2> {props.failure.machine.name} </h2>
          <h3 style={{ fontWeight: 'normal' }} > {props.failure.responsible} </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 'normal' }} > {props.failure.startTime + " - " + props.failure.endTime} </h3>
          <h2 style={{ fontWeight: 'normal' }} > {props.failure.date.toString()} </h2>
        </div>
      </div>
      <div>
        <p>{props.failure.description}</p>
      </div>
    </div>
  );
};