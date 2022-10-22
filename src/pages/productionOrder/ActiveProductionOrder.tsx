import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";

export const ActiveProductionOrder = () => {
  const navigate = useNavigate();
  const initial = {
    id: 0,
    orderNumber: 0,
    internalNumber: 0,
    matrixCode: "",
    amountOfPieces: 0,
    date: new Date(),
    observations: "",
    finished: false,
    productionTime: [],
    amountOfDust: 0
  }

  const [orderList, setOrderList] = useState<ProductionOrder[]>([]);

  useEffect(() => {
    const orderAux = {
      id: 1,
      orderNumber: 2354,
      internalNumber: 202,
      matrixCode: "nfd759",
      amountOfPieces: 650,
      date: new Date(),
      observations: "Ninguna",
      finished: false,
      productionTime: [{
        id: 2,
        machine: {
          id: 3,
          name: "Prensa"
        },
        start: new Date(),
        end: new Date()
      }],
      amountOfDust: 1.5,
      state: 5
    }
    const orderAux2 = {
      id: 1,
      orderNumber: 5748,
      internalNumber: 204,
      matrixCode: "gfigfm67",
      amountOfPieces: 875,
      date: new Date(),
      observations: "Es una orden muy importante",
      finished: false,
      productionTime: [{
        id: 2,
        machine: {
          id: 3,
          name: "Horno de Sinterizado"
        },
        start: new Date(),
        end: new Date()
      }],
      amountOfDust: 2.3,
      state: 3
    }
    const orderAux3 = {
      id: 1,
      orderNumber: 5748,
      internalNumber: 293,
      matrixCode: "gfigfm67",
      amountOfPieces: 570,
      date: new Date(),
      observations: "",
      finished: false,
      productionTime: [{
        id: 2,
        machine: {
          id: 3,
          name: "Torno"
        },
        start: new Date(),
        end: new Date()
      }],
      amountOfDust: 2.3,
      state: 2
    }
    setOrderList([orderAux, orderAux2, orderAux3])
    // get('stock')
    // axios
    //   .get('http://localhost:8080/activeProcesses' ,{})
    //   .then((res) => {
    //     setList(res.data)
    //   })
    //   .catch(() => {
    //     ErrorToast("Hubo un problema obteniendo los productos almacenados")
    //   });
  }, [])

  useEffect(()=>{}, [orderList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver procesos activos</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        {orderList.map((element) => {
          return (
            <ActiveProcessListItem onClick={() => navigate('/details')} order={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};