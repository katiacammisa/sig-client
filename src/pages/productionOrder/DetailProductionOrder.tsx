import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import {CheckCircleOutlineOutlined, PendingActionsOutlined, SyncOutlined} from "@mui/icons-material";
import {Control} from "../../models/Control";
import {Machine} from "../../models/Machine";

export const DetailProductionOrder = () => {
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
    amountOfDust: 0,
    state: 0
  }

  const [order, setOrder] = useState<ProductionOrder>(initial);
  const [controlList, setControlList] = useState<Control[]>([]);

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
        startTime: new Date(),
        endTime: new Date()
      }],
      amountOfDust: 1.5,
      state: 4
    }
    setOrder(orderAux)

    const check1 = {
      id: 1,
      name: "Altura",
      description: "Debe tener 10cm por lo menos",
      done: true
    }
    const check2 = {
      id: 1,
      name: "Diametro",
      description: "Debe tener 3cm por lo menos",
      done: true
    }
    const control1 = {
      id: 0,
      items: [check1, check2],
      scrap: 5,
      machine: {
        id: 0,
        name: "Prensa"
      },
      localDate: new Date(),
      productionOrder: orderAux,
    }

    const check3 = {
      id: 1,
      name: "Profundidad",
      description: "No debe ser mas de 3cm",
      done: true
    }
    const check4 = {
      id: 1,
      name: "Alto",
      description: "Debe ser entre 5 y 8cm",
      done: true
    }
    const control2 = {
      id: 0,
      items: [check3, check4],
      scrap: 2,
      machine: {
        id: 0,
        name: "Horno de Sinterizado"
      },
      localDate: new Date(),
      productionOrder: orderAux,
    }
    setControlList([control1, control2])

    // get('stock')
    // axios
    //   .get('http://localhost:8080/controls' ,{})
    //   .then((res) => {
    //     setList(res.data)
    //   })
    //   .catch(() => {
    //     ErrorToast("Hubo un problema obteniendo los productos almacenados")
    //   });
  }, [])

  useEffect(()=>{}, [order, controlList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%' }}>{"Ver detalle - OP#" + order.orderNumber}</h1>
      <Stack spacing={2} style={{ width: '30%', marginTop: '3%' }}>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {order.state === 0 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 1 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Prensado </h2>
          </div>
          { order.state === 1 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/finalize')}>
              <p>Finalizar Proceso</p>
            </Button>
            : (order.state === 0 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/start')}>
                <p>Comenzar Proceso</p>
              </Button>
            : <></>)
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { order.state >= 2 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Prensado</h2>
          </div>
          { order.state >= 2 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/checklist')}>
            <p>Ver Checklist</p>
          </Button> : (order.state === 2 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/')}>
            <p>Generar control</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          {order.state < 3 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 3 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
          <h2 style={{ marginLeft: '10px' }}> Almacenado Prensado </h2>
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {order.state < 4 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 4 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Sinterizado </h2>
          </div>
          { order.state === 4 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/finalize')}>
              <p>Finalizar Proceso</p>
            </Button>
            : <></>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { order.state >= 5 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Sinterizado</h2>
          </div>
          { order.state >= 5 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/checklist')}>
            <p>Ver Checklist</p>
          </Button> : (order.state === 5 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/')}>
            <p>Completar Checklist</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          {order.state < 6 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 6 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
          <h2 style={{ marginLeft: '10px' }}> Almacenado Sinterizado </h2>
        </div>


        { order.orderNumber === 202 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {order.state < 7 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 7 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
                <h2 style={{ marginLeft: '10px' }}> Roscado </h2>
              </div>
              { order.state === 7 ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/finalize')}>
                  <p>Finalizar Proceso</p>
                </Button>
                : <></>
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                { order.state >= 8 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
                <h2 style={{ marginLeft: '10px' }}> Control Roscado </h2>
              </div>
              { order.state >= 8 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/checklist')}>
                <p>Ver Checklist</p>
              </Button> : (order.state === 8 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/')}>
                <p>Generar control</p>
              </Button> : <></> ) }
            </div>
          </div> : <></>
        }

        { order.orderNumber === 293 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {order.state < 9 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 9 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
                <h2 style={{ marginLeft: '10px' }}> Mecanizado </h2>
              </div>
              { order.state === 9 ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/finalize')}>
                  <p>Finalizar Proceso</p>
                </Button>
                : <></>
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                { order.state >= 10 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
                <h2 style={{ marginLeft: '10px' }}> Control Mecanizado </h2>
              </div>
              { order.state >= 10 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/checklist')}>
                <p>Ver Checklist</p>
              </Button> : (order.state === 10 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/')}>
                <p>Generar control</p>
              </Button> : <></> ) }
            </div>
          </div> : <></>
        }


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {order.state < 11 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (order.state === 11 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Pavonado </h2>
          </div>
          { order.state === 11 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/finalize')}>
              <p>Finalizar Proceso</p>
            </Button>
            : <></>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { order.state >= 12 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Pavonado</h2>
          </div>
          { order.state >= 12 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/checklist')}>
            <p>Ver Checklist</p>
          </Button> : (order.state === 12 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '30%' }} onClick={() => navigate('/')}>
            <p>Completar Checklist</p>
          </Button> : <></> ) }
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          {order.state < 13 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (!order.finished ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
          <h2 style={{ marginLeft: '10px' }}> Stock </h2>
        </div>

        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/activeProductionOrders')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};