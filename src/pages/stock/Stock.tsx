import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {StockModel} from "../../models/Stock";
import {StockListItem} from "../../components/StockListItem";

export const Stock = () => {
  const navigate = useNavigate();

  const [stock, setStock] = useState<StockModel>({amountTuercas: 0, amountPiston: 0, amountGuia: 0});

  useEffect(() => {
    const stockAux = {
      amountTuercas: 26,
      amountPiston: 67,
      amountGuia: 56
    }
    setStock(stockAux)
    // get('stock')
    // axios
    //   .get('http://localhost:8080/stock' ,{})
    //   .then((res) => {
    //     setList(res.data)
    //   })
    //   .catch(() => {
    //     ErrorToast("Hubo un problema obteniendo los productos almacenados")
    //   });
  }, [])

  useEffect(()=>{}, [stock])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver productos en stock</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <StockListItem stock={stock}/>
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};