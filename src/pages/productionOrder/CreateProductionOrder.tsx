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
      <h1 style={{ marginTop: '5%' }}>Ingresar orden de produccion</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <TextField
          id="outlined-basic"
          label="Numero de orden"
          variant="outlined"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required={true}
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
            202 - Tuerca
          </MenuItem>
          <MenuItem key={'293'} value={'293'}>
            293 - Pistón
          </MenuItem>
          <MenuItem key={'204'} value={'204'}>
            204 - Guía
          </MenuItem>
        </Select>
        <TextField
          id="outlined-basic"
          label="Cantidad de piezas"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required={true}
        />
        <textarea
          placeholder="Observaciones"
          className="descriptionField"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
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