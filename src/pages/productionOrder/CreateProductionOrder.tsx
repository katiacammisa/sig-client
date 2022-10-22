import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import {Button, MenuItem, Select, Stack, TextareaAutosize, TextField} from "@mui/material";
import './ProductionOrder.css'
import axios from "axios";
import {ErrorToast, SuccessToast} from "../../common/Toasts";
import {CreateProductionOrderModel} from "../../models/ProductionOrder";
import {authRequestInterceptor} from "../../common/axios";
import {post} from "../../common/http";

export const CreateProductionOrder = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState('');
  const [code, setCode] = useState('202');
  const [matrix, setMatrix] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleRequest = () => {
    const productionOrder: CreateProductionOrderModel = {
      orderNumber: Number(number),
      internalNumber: Number(code),
      matrixCode: matrix,
      amountOfPieces: Number(amount),
      observations: description
    };
    post('productionOrder', productionOrder)
    // axios
    //   .post('http://localhost:8080/productionOrder', productionOrder, authRequestInterceptor())
    //   .then((res) => {
    //     SuccessToast("Orden de produccion ingresada")
    //     navigate('/')
    //   })
    //   .catch(() => {
    //     ErrorToast("Hubo un problema generando la orden de produccion")
    //   });
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
        />
        <Select
          className="selectGD"
          labelId="demo-simple-select-label"
          defaultValue={code}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
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
          label="Codigo de Matriz"
          variant="outlined"
          value={matrix}
          onChange={(e) => setMatrix(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Cantidad de piezas"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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