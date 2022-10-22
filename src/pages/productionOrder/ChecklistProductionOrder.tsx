import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Stack, Typography} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import {CheckCircleOutlineOutlined, ExpandMore, PendingActionsOutlined, SyncOutlined} from "@mui/icons-material";
import {Control} from "../../models/Control";
import {Check} from "../../models/Check";
import {Machine} from "../../models/Machine";

export const ChecklistProductionOrder = () => {
  const navigate = useNavigate();
  const initial = {
    id: 0,
    checks: [],
    scrap: 0,
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
      date: new Date(),
      observations: "",
      finished: false,
      productionTime: [],
      amountOfDust: 0,
      state: 0
    }
  }

  const [control, setControl] = useState<Control>(initial);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    const orderAux = {
      id: 1,
      orderNumber: 2354,
      internalNumber: 202,
      matrixCode: "nfd759",
      amountOfPieces: 650,
      date: new Date(),
      observations: "Ninguna",
      finished: false,
      productionTime: [{
        id: 2,
        machine: {
          id: 3,
          name: "Prensa"
        },
        start: new Date(),
        end: new Date()
      }],
      amountOfDust: 1.5,
      state: 4
    }

    const check1 = {
      id: 1,
      name: "Altura",
      description: "Debe tener 10cm por lo menos",
      done: true
    }
    const check2 = {
      id: 1,
      name: "Diametro",
      description: "Debe tener 3cm por lo menos",
      done: true
    }
    const control1 = {
      id: 0,
      checks: [check1, check2],
      scrap: 5,
      machine: {
        id: 0,
        name: "Prensa"
      },
      localDate: new Date(),
      productionOrder: orderAux,
    }

    setControl(control1)

    // get('stock')
    // axios
    //   .get('http://localhost:8080/controls' ,{})
    //   .then((res) => {
    //     setList(res.data)
    //   })
    //   .catch(() => {
    //     ErrorToast("Hubo un problema obteniendo los productos almacenados")
    //   });
  }, [])

  useEffect(()=>{}, [control])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%' }}> Ver Checklist </h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '3%' }}>

        <div>
          {control.checks.map((check) => {
            return (
              <Accordion expanded={expanded === String(control.checks.indexOf(check))} onChange={handleChange(String(control.checks.indexOf(check)))}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header">
                  <h3> {check.name} </h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Checkbox disabled checked />
                    <h3> {check.description} </h3>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>

        <h2 style={{ marginTop: '2%', textAlign: 'center' }}> { control.scrap + " piezas fueron a scrap" } </h2>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/details')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};