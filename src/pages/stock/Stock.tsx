import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {StockModel} from "../../models/Stock";
import {StockListItem} from "../../components/StockListItem";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';

export const Stock = () => {
  const navigate = useNavigate();

  const [stock, setStock] = useState<StockModel>({amountOfDust: 0, amountOfDustRecycled: 0, amountOfTuerca: 0, amountOfPiston: 0, amountOfGuia: 0, localDate: new Date()});

  useEffect(() => {
    axios
      .get(baseurl + '/stock', {})
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
      <h1 style={{ marginTop: '3%', fontSize: '40px', color: '#03396c' }}>Productos en stock</h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '1.5%' }}>
        <StockListItem stock={stock}/>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <h3>Volver</h3>
        </Button>
      </Stack>
    </div>
  );
};