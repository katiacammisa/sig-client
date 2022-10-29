import { useNavigate } from 'react-router-dom';
import React from "react";
import {Button, Stack} from "@mui/material";

const FailureHome = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '3%', fontSize: '40px', color: '#03396c' }}>Fallos de máquina</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '1.5%' }}>
        <Button style={{ background: 'white', color: '#03396c' }} onClick={() => navigate('/failures/creation')}>
          <h2>Reportar fallo</h2>
        </Button>
        <Button style={{ background: 'white', color: '#03396c' }} onClick={() => navigate('/failures/view')}>
          <h2>Ver fallos</h2>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <h3>Volver</h3>
        </Button>
      </Stack>
    </div>
  );
};

export default FailureHome;
