import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Stack, TextField, Typography} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import {CheckCircleOutlineOutlined, ExpandMore, PendingActionsOutlined, SyncOutlined} from "@mui/icons-material";
import {Control} from "../../models/Control";
import {Machine} from "../../models/Machine";
import axios from 'axios';
import toast from 'react-hot-toast';

export const CreateChecklist = () => {
  const navigate = useNavigate();
  const initial = {
    id: 0,
    items: [],
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
      amountOfDustUsed: 0,
      state: ""
    },
    state: "pending"
  }

  const [control, setControl] = useState<Control>(initial);
  const [scrap, setScrap] = useState('');
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { id } = useParams()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const validateAll = () => {
    for(let item of control.items) {
      const checkbox = document.getElementById(String(item.id)) as HTMLInputElement | null;
      if(checkbox != null && checkbox.checked == false) return false;
    }
    return scrap !== '';
  }


  const handleRequest = () => {
    if(validateAll()) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post('https://sig-api-austral.herokuapp.com/controls/' + id, Number(scrap), config)
        .then((res) => {
          toast.success("Se guardó correctamente el control")
          navigate(-1)
        })
        .catch(() => {
          toast.error("Hubo un problema guardando el control")
        });
    } else {
      toast.error("Por favor completar todos los campos requeridos")
    }
  }

  useEffect(() => {
    axios
      .get('https://sig-api-austral.herokuapp.com/controls/' + id, {})
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
      <h1 style={{ marginTop: '2%' }}> Ver Checklist </h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '3%' }}>

        <div>
          {control.items.map((item) => {
            return (
              <Accordion expanded={expanded === String(control.items.indexOf(item))} onChange={handleChange(String(control.items.indexOf(item)))}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header">
                  <h3> {item.name} </h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Checkbox id={String(item.id)} />
                    <h3> {item.description} </h3>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>

        <TextField
          id="outlined-basic"
          label="Piezas en scrap"
          variant="outlined"
          value={scrap}
          onChange={(e) => setScrap(e.target.value)}
          required={true}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
            <p>Volver</p>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => handleRequest()}>
            <p>Guardar</p>
          </Button>
        </div>
      </Stack>
    </div>
  );
};