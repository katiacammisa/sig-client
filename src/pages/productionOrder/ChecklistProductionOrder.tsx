import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Stack, Typography} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import {CheckCircleOutlineOutlined, ExpandMore, PendingActionsOutlined, SyncOutlined} from "@mui/icons-material";
import {Control} from "../../models/Control";
import {Machine} from "../../models/Machine";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';

export const ChecklistProductionOrder = () => {
  const navigate = useNavigate();
  const initial = {
    id: 0,
    items: [],
    machine: {
      id: 0,
      name: ""
    },
    localDate: new Date(),
    productionOrder: {
      id: 0,
      orderNumber: 0,
      internalNumber: 0,
      matrixCode: "",
      amountOfPieces: 0,
      finalAmountOfPieces: 0,
      missingPieces: 0,
      date: new Date(),
      observations: "",
      finished: false,
      productionTime: [],
      amountOfDustUsed: 0,
      state: ""
    },
    state: "pending"
  }

  const [control, setControl] = useState<Control>(initial);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { id } = useParams()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    axios
      .get(baseurl + '/controls/' + id, {})
      .then((res) => {
        setControl(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo la checklist")
      });
  }, [])

  useEffect(()=>{}, [control])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%', fontSize: '40px', color: '#03396c' }}> Ver Control de M??quina </h1>
      <Stack spacing={5} style={{ width: '40%', marginTop: '3%' }}>

        <div>
          {control.items.map((item) => {
            return (
              <Accordion expanded={expanded === String(control.items.indexOf(item))} onChange={handleChange(String(control.items.indexOf(item)))}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header">
                  <h2> {item.name} </h2>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Checkbox disabled checked />
                    <h2 style={{ fontWeight: 'normal', margin: '0' }}> {item.description} </h2>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>

        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
          <h3>Volver</h3>
        </Button>
      </Stack>
    </div>
  );
};