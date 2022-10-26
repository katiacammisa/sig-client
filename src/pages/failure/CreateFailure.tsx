import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import {Button, MenuItem, Select, Stack, TextareaAutosize, TextField} from "@mui/material";
import axios from "axios";
import {CreateFailureModel} from "../../models/Failure"
import {ErrorToast, SuccessToast} from "../../common/Toasts";
import {CreateProductionOrderModel} from "../../models/ProductionOrder";
import {authRequestInterceptor} from "../../common/axios";
import {baseurl, post} from "../../common/http";
import toast from 'react-hot-toast';
import {LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

export const CreateFailure = () => {
  const navigate = useNavigate();

  const [machine, setMachine] = useState('Prensa');
  const [startTime, setStartTime] = React.useState<Dayjs>(dayjs());
  const [endTime, setEndTime] = React.useState<Dayjs>(dayjs());
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  
  const validateAllFields = () => {
    return machine !== '' && responsible !== '';
  }

  const handleRequest = () => {
    if(validateAllFields()) {
      const failure: CreateFailureModel = {
        responsible: responsible,
        description: description,
        machine: machine,
        startTime: startTime.format("hh:MM"),
        endTime: endTime.format("hh:MM"),
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post(baseurl + '/failure', failure, config)
        .then((res) => {
          toast.success("Reporte de fallo ingresado")
          navigate('/')
        })
        .catch(() => {
          toast.error("Hubo un problema generando el reporte de fallo")
        });
    } else {
      toast.error("Por favor completar todos los campos requeridos")
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Generar reporte de fallo</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora de inicio"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue!);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Hora de fin"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue!);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Select
          className="selectGD"
          labelId="demo-simple-select-label"
          defaultValue={machine}
          value={machine}
          onChange={(e) => {
            setMachine(e.target.value);
          }}
          required={true}
        >
          <MenuItem key={'Prensa'} value={'Prensa'}>
            Prensa
          </MenuItem>
          <MenuItem key={'Horno de sinterizado'} value={'Horno de sinterizado'}>
            Horno de Sinterizado
          </MenuItem>
          <MenuItem key={'Roscadora'} value={'Roscadora'}>
            Roscadora
          </MenuItem>
          <MenuItem key={'Torno'} value={'Torno'}>
            Torno
          </MenuItem>
          <MenuItem key={'Horno de pavonado'} value={'Horno de pavonado'}>
            Horno de Pavonado
          </MenuItem>
        </Select>
        <TextField
          id="outlined-basic"
          label="Responsable"
          variant="outlined"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          required={true}
        />
        <textarea
          placeholder="Descripcion"
          className="descriptionField"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/failures')}>
            <p>Volver</p>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => handleRequest()}>
            <p>Continuar</p>
          </Button>
        </div>
      </Stack>
    </div>
  );
};