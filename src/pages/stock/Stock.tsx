import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {StockModel} from "../../models/Stock";
import {StockListItem} from "../../components/StockListItem";
import axios from 'axios';
import toast from 'react-hot-toast';

export const Stock = () => {
  const navigate = useNavigate();

  const [stock, setStock] = useState<StockModel>({amountOfDust: 0, amountOfTuerca: 0, amountOfPiston: 0, amountOfGuia: 0, localDate: new Date()});

  useEffect(() => {
    axios
      .get('http://localhost:8080/stock', {})
      .then((res) => {
        console.log(res)
        setStock(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos almacenados")
      });
  }, [])

  useEffect(()=>{}, [stock])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Productos en stock</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <StockListItem stock={stock}/>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};