import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import './ProductionOrder.css'
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import {CheckCircleOutlineOutlined, PendingActionsOutlined, SyncOutlined} from "@mui/icons-material";
import {Control} from "../../models/Control";
import {Machine} from "../../models/Machine";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FormDialog } from '../../components/FormDialog';

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
    amountOfDustUsed: 0,
    state: "POLVO"
  }
  
  const states = [
    'POLVO',
    'PRENSADO',
    'ESPERA_CONTROL_PRENSADO',
    'CONTROL_PRENSADO',
    'ESPERA_ALMACENADO_PRENSADO',
    'ALMACENADO_PRENSADO',
    'ESPERA_SINTERIZADO',
    'SINTERIZADO',
    'ESPERA_CONTROL_SINTERIZADO',
    'CONTROL_SINTERIZADO',
    'ESPERA_ALMACENADO_SINTERIZADO',
    'ALMACENADO_SINTERIZADO',
    'ESPERA_ROSCADO',
    'ROSCADO',
    'ESPERA_CONTROL_ROSCADO',
    'CONTROL_ROSCADO',
    'ESPERA_MECANIZADO',
    'MECANIZADO',
    'ESPERA_CONTROL_MECANIZADO',
    'CONTROL_MECANIZADO',
    'ESPERA_PAVONADO',
    'PAVONADO',
    'ESPERA_CONTROL_PAVONADO',
    'CONTROL_PAVONADO',
    'STOCK'
  ]

  const [order, setOrder] = useState<ProductionOrder>(initial);
  const [controlList, setControlList] = useState<Control[]>([]);
  const { id } = useParams()

  const handleAdvanceProcess = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .post('https://sig-api-austral.herokuapp.com/productionOrder/advance/' + id, {}, config)
      .then((res) => {
        setOrder(res.data)
        toast.success("Proceso avanzado")
      })
      .catch(() => {
        toast.error("Hubo un problema avanzando en el proceso")
      });
  }

  const finishProductionOrder = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .post('https://sig-api-austral.herokuapp.com/productionOrder/' + id, {}, config)
      .then((res) => {
        setOrder(res.data)
        toast.success("Proceso finalizado correctamente")
      })
      .catch(() => {
        toast.error("Hubo un problema finalizando el proceso")
      });
  }

  useEffect(() => {
    axios
      .get('https://sig-api-austral.herokuapp.com/productionOrder/' + id, {})
      .then((res) => {
        console.log(res.data)
        setOrder(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos almacenados")
      });
    axios
      .get('https://sig-api-austral.herokuapp.com/productionOrder/control/' + id, {})
      .then((res) => {
        setControlList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos almacenados")
      });
  }, [])

  useEffect(()=>{}, [order, controlList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%' }}>{"Ver detalle - OP#" + order.orderNumber}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'space-around' }}>
        <h3 style={{ marginTop: '1%' }}>{order.amountOfPieces + " unidades de " + (order.internalNumber === 202 ? "tuercas" : (order.internalNumber === 293 ? "pistones" : "guias")) }</h3>
        <h3 style={{ marginTop: '1%' }}>{"Código de matriz: " + order.matrixCode}</h3>

      </div>
      <Stack spacing={2} style={{ width: '30%', marginTop: '3%' }}>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) === 0 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 1 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Prensado </h2>
          </div>
          { states.indexOf(order.state) === 1 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
              <p>Finalizar Proceso</p>
            </Button>
            : (states.indexOf(order.state) === 0 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                <p>Comenzar Proceso</p>
              </Button>
              : ( order.amountOfDustUsed === 0 ? <FormDialog id={id} setOrder={setOrder} /> : <></>))
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 3 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Prensado</h2>
          </div>
          { states.indexOf(order.state) >= 4 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Prensa')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 2 && order.amountOfDustUsed !== 0 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Prensa')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) <= 4 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 5 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Almacenado Prensado </h2>
          </div>
          { states.indexOf(order.state) === 4 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
              <p>Comenzar Almacenado</p>
            </Button> : ( states.indexOf(order.state) === 5 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                <p>Finalizar Almacenado</p>
              </Button>
              : <></> 
            )
          }
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 7 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 7 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Sinterizado </h2>
          </div>
          { states.indexOf(order.state) === 7 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
              <p>Finalizar Proceso</p>
            </Button>
            : (states.indexOf(order.state) === 6 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                <p>Comenzar Proceso</p>
              </Button>
              : <></>
            )
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 9 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Sinterizado</h2>
          </div>
          { states.indexOf(order.state) > 9 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Horno de sinterizado')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 8 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Horno de sinterizado')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 11 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 11 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Almacenado Sinterizado </h2>
          </div>
          { states.indexOf(order.state) === 10 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
              <p>Comenzar Almacenado</p>
            </Button> : ( states.indexOf(order.state) === 11 ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                  <p>Finalizar Almacenado</p>
                </Button>
                : <></>
            )
          }
        </div>


        { order.internalNumber === 202 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              {states.indexOf(order.state) < 13 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 13 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
              <h2 style={{ marginLeft: '10px' }}> Roscado </h2>
            </div>
            { states.indexOf(order.state) === 13 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                <p>Finalizar Proceso</p>
              </Button>
              : (states.indexOf(order.state) === 12 ?
                  <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                    <p>Comenzar Proceso</p>
                  </Button>
                  : <></>
              )
            }
          </div> : <></>
        }
        {order.internalNumber === 202 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              { states.indexOf(order.state) >= 16 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
              <h2 style={{ marginLeft: '10px' }}> Control Roscado </h2>
            </div>
            { states.indexOf(order.state) >= 16 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Torno')[0].id)}>
              <p>Ver Checklist</p>
            </Button> : (states.indexOf(order.state) === 14 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Torno')[0].id)}>
              <p>Generar control</p>
            </Button> : <></> ) }
          </div> : <></>
        }

        {order.internalNumber === 293 ?
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              {states.indexOf(order.state) < 17 ? <PendingActionsOutlined fontSize={"inherit"}
                                                                          style={{fontSize: '60px'}}/> : (states.indexOf(order.state) === 17 ?
                <SyncOutlined fontSize={"inherit"} style={{fontSize: '60px'}}/> :
                <CheckCircleOutlineOutlined fontSize={"inherit"} style={{fontSize: '60px'}}/>)}
              <h2 style={{marginLeft: '10px'}}> Mecanizado </h2>
            </div>
            {states.indexOf(order.state) === 17 ?
              <Button variant="contained" style={{backgroundColor: '#000000', width: '50%'}}
                      onClick={() => handleAdvanceProcess()}>
                <p>Finalizar Proceso</p>
              </Button>
              : (states.indexOf(order.state) === 16 ?
                  <Button variant="contained" style={{backgroundColor: '#000000', width: '50%'}}
                          onClick={() => handleAdvanceProcess()}>
                    <p>Comenzar Proceso</p>
                  </Button>
                  : <></>
              )
            }
          </div> : <></>
        }
        {order.internalNumber === 293 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              { states.indexOf(order.state) >= 20 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
              <h2 style={{ marginLeft: '10px' }}> Control Mecanizado </h2>
            </div>
            { states.indexOf(order.state) >= 20 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Roscadora')[0].id)}>
              <p>Ver Checklist</p>
            </Button> : (states.indexOf(order.state) === 18 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Roscadora')[0].id)}>
              <p>Generar control</p>
            </Button> : <></> ) }
          </div> : <></>
        }


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 21 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 21 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Pavonado </h2>
          </div>
          { states.indexOf(order.state) === 21 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
              <p>Finalizar Proceso</p>
            </Button>
            : (states.indexOf(order.state) === 20 ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '50%' }} onClick={() => handleAdvanceProcess()}>
                  <p>Comenzar Proceso</p>
                </Button>
                : <></>
            )
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) >= 24 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Pavonado</h2>
          </div>
          { states.indexOf(order.state) >= 24 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Horno de pavonado')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 22 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Horno de pavonado')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 24 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (!order.finished ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Stock </h2>
          </div>
          {states.indexOf(order.state) === 24 && !order.finished ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => finishProductionOrder()}>
            <p>Finalizar Proceso</p>
          </Button> : <></>}
        </div>

        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};