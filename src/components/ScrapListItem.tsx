import {Button} from "@mui/material";
import React, { MouseEventHandler } from "react";
import { Scrap } from "../models/Scrap";
import {Stored} from "../models/Stored";

export const ScrapListItem = (props: { scrap: Scrap }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <h1 style={{ textAlign: "center" }}> {props.scrap.machine} </h1>
      <h2 style={{ fontWeight: "normal", textAlign: "center" }}> {props.scrap.scrap + " unidades"} </h2>
    </div>
  );
};