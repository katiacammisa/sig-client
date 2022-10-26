import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';

export const ActiveProductionOrder = () => {
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState<ProductionOrder[]>([]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .get(baseurl + '/productionOrder/active', config)
      .then((res) => {
        setOrderList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo las ordenes activas")
      });
  }, [])

  useEffect(()=>{}, [orderList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver procesos activos</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        {orderList.map((element) => {
          return (
            <ActiveProcessListItem onClick={() => navigate('/details/' + element.id)} order={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};