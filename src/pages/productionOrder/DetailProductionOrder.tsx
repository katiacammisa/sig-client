import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField} from "@mui/material";
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
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';

export const DetailProductionOrder = () => {
  const navigate = useNavigate();
  const initial = {
    id: 0,
    orderNumber: 0,
    internalNumber: 0,
    matrixCode: "",
    amountOfPieces: 0,
    finalAmountOfPieces: 0,
    missingPieces: 0,
    date: new Date(),
    observations: "",
    finished: false,
    productionTime: [],
    amountOfDustUsed: 0,
    state: "POLVO"
  }
  
  const states = [
    'ESPERA_CONTROL_MAQUINA_PRENSA',
    'CONTROL_MAQUINA_PRENSA',
    'ESPERA_PRENSADO',
    'PRENSADO',
    'ESPERA_CONTROL_PRENSADO',
    'CONTROL_PRENSADO',
    'ESPERA_ALMACENADO_PRENSADO',
    'ALMACENADO_PRENSADO',
    'ESPERA_CONTROL_MAQUINA_HORNO_S',
    'CONTROL_MAQUINA_HORNO_S',
    'ESPERA_SINTERIZADO',
    'SINTERIZADO',
    'ESPERA_CONTROL_SINTERIZADO',
    'CONTROL_SINTERIZADO',
    'ESPERA_ALMACENADO_SINTERIZADO',
    'ALMACENADO_SINTERIZADO',
    'ESPERA_CONTROL_MAQUINA_ROSCADORA',
    'CONTROL_MAQUINA_ROSCADORA',
    'ESPERA_ROSCADO',
    'ROSCADO',
    'ESPERA_CONTROL_ROSCADO',
    'CONTROL_ROSCADO',
    'ESPERA_CONTROL_MAQUINA_TORNO',
    'CONTROL_MAQUINA_TORNO',
    'ESPERA_MECANIZADO',
    'MECANIZADO',
    'ESPERA_CONTROL_MECANIZADO',
    'CONTROL_MECANIZADO',
    'ESPERA_CONTROL_MAQUINA_HORNO_P',
    'CONTROL_MAQUINA_HORNO_P',
    'ESPERA_PAVONADO',
    'PAVONADO',
    'ESPERA_CONTROL_PAVONADO',
    'CONTROL_PAVONADO',
    'STOCK'
  ]

  const [order, setOrder] = useState<ProductionOrder>(initial);
  const [controlList, setControlList] = useState<Control[]>([]);
  const { id } = useParams()
  const [open, setOpen] = React.useState(false);
  const [amountDust, setAmountDust] = React.useState('');

  const [turnPrensaList, setTurnPrensaList] = useState(true);
  const [turnHornoSList, setTurnHornoSList] = useState(true);
  const [turnRoscaList, setTurnRoscaList] = useState(true);
  const [turnTornoList, setTurnTornoList] = useState(true);
  const [turnHornoPList, setTurnHornoPList] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    if(amountDust !== '' && amountDust !== '0') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post(baseurl + '/productionOrder/dust/' + id, Number(amountDust), config)
        .then((res) => {
          setOrder(res.data)
          toast.success("Cantidad de polvo utilizada guardada")
        })
        .catch(() => {
          toast.error("Hubo un problema guardando la cantidad de polvo")
        });
    } else {
      toast.error("Por favor completar la cantidad de polvo utilizada")
    }
  }

  const handleAdvanceProcess = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .post(baseurl + '/productionOrder/advance/' + id, {}, config)
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
      .post(baseurl + '/productionOrder/' + id, {}, config)
      .then((res) => {
        setOrder(res.data)
        toast.success("Proceso finalizado correctamente")
      })
      .catch(() => {
        toast.error("Hubo un problema finalizando la orden")
      });
  }

  useEffect(() => {
    axios
      .get(baseurl + '/productionOrder/' + id, {})
      .then((res) => {
        console.log(res.data)
        setOrder(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos almacenados")
      });
    axios
      .get(baseurl + '/productionOrder/control/' + id, {})
      .then((res) => {
        setControlList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos almacenados")
      });

    axios
      .get(baseurl + '/turn/available/' + id + '/Prensa', {})
      .then((res) => {
        setTurnPrensaList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });

    axios
      .get(baseurl + '/turn/available/' + id + '/Horno de Sinterizado', {})
      .then((res) => {
        setTurnHornoSList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });

    axios
      .get(baseurl + '/turn/available/' + id + '/Roscadora', {})
      .then((res) => {
        setTurnRoscaList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });

    axios
      .get(baseurl + '/turn/available/' + id + '/Torno', {})
      .then((res) => {
        setTurnTornoList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });

    axios
      .get(baseurl + '/turn/available/' + id + '/Horno de Pavonado', {})
      .then((res) => {
        setTurnHornoPList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });
  }, [])

  useEffect(()=>{}, [order, controlList, turnHornoPList, turnPrensaList, turnRoscaList, turnTornoList, turnHornoSList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%' }}>{"Ver detalle - OP#" + order.orderNumber}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-around', marginTop: '1%' }}>
        <h3 style={{ marginTop: '0.2%' }}>{"Planificado: " + order.amountOfPieces + " unidades de " + (order.internalNumber === 202 ? "tuercas" : (order.internalNumber === 293 ? "pistones" : "guias")) }</h3>
        <h3 style={{ marginTop: '0.2%' }}>{"Actual: " + order.finalAmountOfPieces + " unidades de " + (order.internalNumber === 202 ? "tuercas" : (order.internalNumber === 293 ? "pistones" : "guias")) }</h3>
        <h3 style={{ marginTop: '0.2%' }}>{"Código de matriz: " + order.matrixCode}</h3>
      </div>
      <Stack spacing={2} style={{ width: '40%', marginTop: '1.5%' }}>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 1 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Máquina - Prensa</h2>
          </div>
          { states.indexOf(order.state) > 1 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Prensa')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 0 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Prensa')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 3 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 3 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Prensado </h2>
          </div>
          { states.indexOf(order.state) === 3 ?
            turnPrensaList ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createTurn/Prensa/' + order.id)}>
                  <p>Agregar Turno</p>
                </Button> : <></>
            : (states.indexOf(order.state) === 2 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
                <p>Comenzar Proceso</p>
              </Button>
              : (states.indexOf(order.state) > 3 && order.amountOfDustUsed === 0 ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', height: '65px' }}>
                  <Button variant="contained" style={{ backgroundColor: '#000000', width: '60%' }} onClick={handleClickOpen}>
                    Polvo utilizado
                  </Button>
                  <Dialog open={open} onClose={handleClose} style={{ width: '100%' }}>
                    <DialogTitle>Polvo</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Ingresar la cantidad de polvo utilizada
                      </DialogContentText>
                      <TextField
                        id="outlined-basic"
                        label="Polvo en tn"
                        variant="outlined"
                        value={amountDust}
                        onChange={(e) => setAmountDust(e.target.value)}
                        required={true}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Volver</Button>
                      <Button onClick={handleSend}>Enviar</Button>
                    </DialogActions>
                  </Dialog>
                </div>
                : <></>))
          }
          { states.indexOf(order.state) > 3 && order.amountOfDustUsed !== 0 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/turns/Prensa/' + order.id)}>
              <p>Ver Turnos</p>
            </Button> : <></>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 5 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Prensado</h2>
          </div>
          { states.indexOf(order.state) > 5 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Prensa/' + order.id)}>
            <p>Ver Control</p>
          </Button> : (states.indexOf(order.state) === 4 && order.amountOfDustUsed !== 0 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Prensa/' + order.id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 7 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 7 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Almacenado Prensado </h2>
          </div>
          { states.indexOf(order.state) === 6 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
              <p>Comenzar Almacenado</p>
            </Button> : ( states.indexOf(order.state) === 7 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
                <p>Finalizar Almacenado</p>
              </Button>
              : <></> 
            )
          }
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 9 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Máquina - Horno Sinterizado</h2>
          </div>
          { states.indexOf(order.state) > 9 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Sinterizado')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 8 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Sinterizado')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 11 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 11 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Sinterizado </h2>
          </div>
          { states.indexOf(order.state) === 11 ?
            turnHornoSList ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createTurn/Sinterizado/' + order.id)}>
                <p>Agregar Turno</p>
              </Button> : <></>
            : (states.indexOf(order.state) === 10 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
                <p>Comenzar Proceso</p>
              </Button>
              : <></>
            )
          }
          { states.indexOf(order.state) > 11 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/turns/Sinterizado/' + order.id)}>
              <p>Ver Turnos</p>
            </Button> : <></>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 13 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Sinterizado</h2>
          </div>
          { states.indexOf(order.state) > 13 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Sinterizado/' + order.id)}>
            <p>Ver Control</p>
          </Button> : (states.indexOf(order.state) === 12 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Sinterizado/' + order.id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 15 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 15 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Almacenado Sinterizado </h2>
          </div>
          { states.indexOf(order.state) === 14 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
              <p>Comenzar Almacenado</p>
            </Button> : ( states.indexOf(order.state) === 15 ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
                  <p>Finalizar Almacenado</p>
                </Button>
                : <></>
            )
          }
        </div>

        { order.internalNumber === 202 ?
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 17 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Máquina - Roscadora</h2>
          </div>
          { states.indexOf(order.state) > 17 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Torno')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 16 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Torno')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div> : <></> }

        { order.internalNumber === 202 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              {states.indexOf(order.state) < 19 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 19 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
              <h2 style={{ marginLeft: '10px' }}> Roscado </h2>
            </div>
            { states.indexOf(order.state) === 19 ?
              turnRoscaList ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createTurn/Roscadora/' + order.id)}>
                  <p>Agregar Turno</p>
                </Button> : <></>
              : (states.indexOf(order.state) === 18 ?
                  <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
                    <p>Comenzar Proceso</p>
                  </Button>
                  : <></>
              )
            }
            { states.indexOf(order.state) > 19 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/turns/Roscadora/' + order.id)}>
                <p>Ver Turnos</p>
              </Button> : <></>
            }
          </div> : <></>
        }
        {order.internalNumber === 202 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              { states.indexOf(order.state) > 21 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
              <h2 style={{ marginLeft: '10px' }}> Control Roscado </h2>
            </div>
            { states.indexOf(order.state) > 21 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Roscadora/' + order.id)}>
              <p>Ver Control</p>
            </Button> : (states.indexOf(order.state) === 20 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Roscadora/' + order.id)}>
              <p>Generar control</p>
            </Button> : <></> ) }
          </div> : <></>
        }

        { order.internalNumber === 293 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              { states.indexOf(order.state) > 23 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
              <h2 style={{ marginLeft: '10px' }}>Control Máquina - Torno</h2>
            </div>
            { states.indexOf(order.state) > 23 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Roscadora')[0].id)}>
              <p>Ver Checklist</p>
            </Button> : (states.indexOf(order.state) === 22 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Roscadora')[0].id)}>
              <p>Generar Control</p>
            </Button> : <></> ) }
          </div> : <></> }
        {order.internalNumber === 293 ?
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              {states.indexOf(order.state) < 25 ? <PendingActionsOutlined fontSize={"inherit"} style={{fontSize: '60px'}}/> : (states.indexOf(order.state) === 25 ? <SyncOutlined fontSize={"inherit"} style={{fontSize: '60px'}}/> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{fontSize: '60px'}}/>)}
              <h2 style={{marginLeft: '10px'}}> Mecanizado </h2>
            </div>
            {states.indexOf(order.state) === 25 ?
              turnTornoList ?
                <Button variant="contained" style={{backgroundColor: '#000000', width: '40%'}} onClick={() => navigate('/createTurn/Torno/' + order.id)}>
                  <p>Agregar Turno</p>
                </Button> : <></>
              : (states.indexOf(order.state) === 24 ?
                  <Button variant="contained" style={{backgroundColor: '#000000', width: '40%'}}
                          onClick={() => handleAdvanceProcess()}>
                    <p>Comenzar Proceso</p>
                  </Button>
                  : <></>
              )
            }
            { order.internalNumber === 293 && states.indexOf(order.state) > 25 ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/turns/Torno/' + order.id)}>
                <p>Ver Turnos</p>
              </Button> : <></>
            }
          </div> : <></>
        }
        {order.internalNumber === 293 ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              { states.indexOf(order.state) > 27 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
              <h2 style={{ marginLeft: '10px' }}> Control Mecanizado </h2>
            </div>
            { states.indexOf(order.state) > 27 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Torno/' + order.id)}>
              <p>Ver Control</p>
            </Button> : (states.indexOf(order.state) === 26 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Torno/' + order.id)}>
              <p>Generar control</p>
            </Button> : <></> ) }
          </div> : <></>
        }

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 29 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Máquina - Horno Pavonado</h2>
          </div>
          { states.indexOf(order.state) > 29 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/checklist/' + controlList.filter(e => e.machine.name === 'Pavonado')[0].id)}>
            <p>Ver Checklist</p>
          </Button> : (states.indexOf(order.state) === 28 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createChecklist/' + controlList.filter(e => e.machine.name === 'Pavonado')[0].id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 31 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (states.indexOf(order.state) === 31 ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Pavonado </h2>
          </div>
          { states.indexOf(order.state) === 31 ?
            turnHornoPList ?
              <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/createTurn/Pavonado/' + order.id)}>
                <p>Agregar Turno</p>
              </Button> : <></>
            : (states.indexOf(order.state) === 30 ?
                <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => handleAdvanceProcess()}>
                  <p>Comenzar Proceso</p>
                </Button>
                : <></>
            )
          }
          { states.indexOf(order.state) > 31 ?
            <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/turns/Pavonado/' + order.id)}>
              <p>Ver Turnos</p>
            </Button> : <></>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            { states.indexOf(order.state) > 33 ? <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> }
            <h2 style={{ marginLeft: '10px' }}>Control Pavonado</h2>
          </div>
          { states.indexOf(order.state) > 33 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Pavonado/' + order.id)}>
            <p>Ver Control</p>
          </Button> : (states.indexOf(order.state) === 32 ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => navigate('/controlTurns/Pavonado/' + order.id)}>
            <p>Generar Control</p>
          </Button> : <></> ) }
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {states.indexOf(order.state) < 34 ? <PendingActionsOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : (!order.finished ? <SyncOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} /> : <CheckCircleOutlineOutlined fontSize={"inherit"} style={{ fontSize: '60px' }} />) }
            <h2 style={{ marginLeft: '10px' }}> Stock </h2>
          </div>
          {states.indexOf(order.state) === 34 && !order.finished ? <Button variant="contained" style={{ backgroundColor: '#000000', width: '40%' }} onClick={() => finishProductionOrder()}>
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