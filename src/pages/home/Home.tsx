import { useNavigate } from 'react-router-dom';
import React from "react";
import {Button, Stack} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh', backgroundColor: '#f5f5f5', backgroundSize: 'cover' }}>
      <h1 style={{ marginTop: '3%', fontSize: '50px', color: '#03396c' }}>Gestión de Inventarios</h1>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'center' }}>
        <Stack spacing={5} style={{ width: '30%', marginTop: '5%', marginRight: '20px' }}>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/productionOrder/creation')}>
            <h2>Ingresar orden de producción</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/dust/enter')}>
            <h2>Ingresar polvo</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/storedItems')}>
            <h2>Ver productos almacenados</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/activeProductionOrders')}>
            <h2>Ver procesos activos</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/endedProductionOrders')}>
            <h2>Ver procesos finalizados</h2>
          </Button>
        </Stack>
        <Stack spacing={5} style={{ width: '30%', marginTop: '5%', marginLeft: '20px' }}>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/stock')}>
            <h2>Ver stock</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/scrap')}>
            <h2>Ver scrap</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/failures/creation')}>
            <h2>Ingresar fallo de máquina</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/failures/view')}>
            <h2>Ver fallos de máquina</h2>
          </Button>
          <Button variant="contained" style={{ background: 'linear-gradient(#03396c, #005b96)' }} onClick={() => navigate('/indicators')}>
            <h2>Ver indicadores</h2>
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Home;
