import { useNavigate } from 'react-router-dom';
import React from "react";
import {Button, Stack} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Gestion de Inventarios</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/productionOrder/creation')}>
          <p>Ingresar orden de produccion</p>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/dust/enter')}>
          <p>Ingresar polvo</p>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/storedItems')}>
          <p>Ver productos almacenados</p>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/activeProductionOrders')}>
          <p>Ver procesos activos</p>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/stock')}>
          <p>Ver stock</p>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/indicators')}>
          <p>Ver indicadores</p>
        </Button>
      </Stack>
    </div>
  );
};

export default Home;
