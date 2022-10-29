import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import {Button, MenuItem, Select, Stack, TextareaAutosize, TextField} from "@mui/material";
import './ProductionOrder.css'
import axios from "axios";
import {ErrorToast, SuccessToast} from "../../common/Toasts";
import {CreateProductionOrderModel} from "../../models/ProductionOrder";
import {authRequestInterceptor} from "../../common/axios";
import {baseurl, post} from "../../common/http";
import toast from 'react-hot-toast';

export const CreateProductionOrder = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState('');
  const [code, setCode] = useState('202');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  const validateAllFields = () => {
    return number !== '' && code !== '' && amount !== '';
  }

  const handleRequest = () => {
    if(validateAllFields()) {
      const productionOrder: CreateProductionOrderModel = {
        orderNumber: Number(number),
        internalNumber: Number(code),
        amountOfPieces: Number(amount),
        observations: description
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post(baseurl + '/productionOrder', productionOrder, config)
        .then((res) => {
          toast.success("Orden de produccion ingresada")
          navigate('/')
        })
        .catch(() => {
          toast.error("Hubo un problema generando la orden de produccion")
        });
    } else {
      toast.error("Por favor completar todos los campos requeridos")
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%', fontSize: '40px', color: '#03396c' }}>Ingresar orden de produccion</h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '3%' }}>
        <TextField
          id="outlined-basic"
          label="Numero de orden"
          variant="outlined"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required={true}
          inputProps={{style: {fontSize: 20}}}
          InputLabelProps={{style: {fontSize: 20}}}
        />
        <Select
          className="selectGD"
          labelId="demo-simple-select-label"
          defaultValue={code}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          required={true}
        >
          <MenuItem key={'202'} value={'202'}>
            <p style={{ fontSize: '20px', margin: '3px' }} >202 - Tuerca</p>
          </MenuItem>
          <MenuItem key={'293'} value={'293'}>
            <p style={{ fontSize: '20px', margin: '3px' }} >293 - Pistón</p>
          </MenuItem>
          <MenuItem key={'204'} value={'204'}>
            <p style={{ fontSize: '20px', margin: '3px' }} >204 - Guía</p>
          </MenuItem>
        </Select>
        <TextField
          id="outlined-basic"
          label="Cantidad de piezas"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required={true}
          inputProps={{style: {fontSize: 20}}}
          InputLabelProps={{style: {fontSize: 20}}}
        />
        <textarea
          placeholder="Observaciones"
          className="descriptionField"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ fontSize: '20px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
            <h3>Volver</h3>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => handleRequest()}>
            <h3>Continuar</h3>
          </Button>
        </div>
      </Stack>
    </div>
  );
};