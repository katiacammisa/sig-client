import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";

export const EnterDust = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');

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
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
            <p>Almacenar</p>
          </Button>
        </div>
      </Stack>
    </div>
  );
};
