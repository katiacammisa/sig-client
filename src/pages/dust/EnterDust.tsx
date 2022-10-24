import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import axios from 'axios';
import toast from 'react-hot-toast';

export const EnterDust = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');

  const handleRequest = () => {
    if(amount !== '' && Number(amount) !== 0) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post('https://sig-api-austral.herokuapp.com/stock/dust', Number(amount), config)
        .then((res) => {
          toast.success("Polvo ingresado")
          navigate('/')
        })
        .catch(() => {
          toast.error("Hubo un problema ingresando polvo")
        });
    } else {
      toast.error("Por favor ingresar una cantidad valida de polvo")
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ingresar polvo</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <TextField
          id="outlined-basic"
          label="Cantidad de polvo en toneladas"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
            <p>Volver</p>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => handleRequest()}>
            <p>Almacenar</p>
          </Button>
        </div>
      </Stack>
    </div>
  );
};
