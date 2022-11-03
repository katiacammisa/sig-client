import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Box, Button, Stack, Tab, Tabs} from "@mui/material";
import { BaseMaterialIndicator } from "../../models/Indicators";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';
import Chart from "../../components/Chart"
import { ViewBaseMaterialIndicators } from './ViewBaseMaterialIndicators';
import { ViewProductivityIndicators } from './ViewProductivityIndicators';
import { ViewHourProductivityIndicators } from './ViewHourProductivityIndicators';
import { ViewQualityIndicators } from './ViewQualityIndicators';

export interface DataType {
  x: Date;
  y: number;
}

export const Indicators = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <h1 style={{ marginTop: '2%', fontSize: '40px', color: '#03396c' }}>Indicadores</h1>
      <ViewBaseMaterialIndicators />
      <hr style={{ color: '#bababa', backgroundColor: '#bababa', height: '1px', width: '80%', marginTop: '2%' }} />
      <ViewQualityIndicators />
      <hr style={{ color: '#bababa', backgroundColor: '#bababa', height: '1px', width: '80%', marginTop: '2%' }} />
      <ViewProductivityIndicators />
      <hr style={{ color: '#bababa', backgroundColor: '#bababa', height: '1px', width: '80%', marginTop: '2%' }} />
      <ViewHourProductivityIndicators />
      <Button variant="contained" style={{ backgroundColor: '#000000', marginTop: '2%', marginBottom: '2%' }} onClick={() => navigate(-1)}>
        <h3>Volver</h3>
      </Button>
    </div>
  );
};
