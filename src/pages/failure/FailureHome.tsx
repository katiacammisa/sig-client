import { useNavigate } from 'react-router-dom';
import React from "react";
import {Button, Stack} from "@mui/material";

const FailureHome = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Fallos de máquina</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/failures/creation')}>
          <p>Reportar fallo</p>
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/failures/view')}>
          <p>Ver fallos</p>
        </Button>
      </Stack>
    </div>
  );
};

export default FailureHome;
