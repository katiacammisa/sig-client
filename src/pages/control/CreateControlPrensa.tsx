import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import {CheckCircleOutlineOutlined, ExpandMore, PendingActionsOutlined, SyncOutlined} from "@mui/icons-material";
import {Control} from "../../models/Control";
import {Machine} from "../../models/Machine";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';

export const CreateControlPrensa = () => {
  const navigate = useNavigate();

  const initial =  {
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
    state: ""
  }

  const initialTurn = {
    id: 0,
    responsible: '',
    pieces: 0,
    machine: {
      id: 0,
      name: ''
    },
    localDate: new Date(),
    productionOrder: initial,
    turn: '',
    passedControl: false,
    done: false
  }

  const [turn, setTurn] = useState<Turn>(initialTurn)
  const [order, setOrder] = useState<ProductionOrder>(initial)
  const [list, setList] = useState([])

  const [altura1, setAltura1] = useState('')
  const [altura2, setAltura2] = useState('')

  const [altura3, setAltura3] = useState('')
  const [altura4, setAltura4] = useState('')

  const [altura5, setAltura5] = useState('')
  const [altura6, setAltura6] = useState('')

  const [altura7, setAltura7] = useState('')
  const [altura8, setAltura8] = useState('')

  const [altura9, setAltura9] = useState('')
  const [altura10, setAltura10] = useState('')

  const { turnId } = useParams()
  const numbers = [0,1,2,3,4]

  useEffect(() => {
    axios
      .get(baseurl + '/turn/' + turnId, {})
      .then((res) => {
        setTurn(res.data)
        axios
          .get(baseurl + '/productionOrder/' + res.data.productionOrder.id, {})
          .then((res1) => {
            setOrder(res1.data)
          })
          .catch(() => {
            toast.error("Hubo un problema obteniendo la orden")
          });
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo el turno")
      });
  }, [])

  const validateAll = () => {
    switch (order.internalNumber) {
      case 202:
      case 204: {
        return altura1 !== '' && altura2 !== '' && altura3 !== '' && altura4 !== '' && altura5 !== '' && altura6 !== '' && altura7 !== '' && altura8 !== '' && altura9 !== '' && altura10 !== ''
        break
      }
      case 293: {
        return altura1 !== '' && altura3 !== '' && altura5 !== '' && altura7 !== '' && altura9 !== ''
        break
      }
    }
    return true;
  }

  const handleRequest = () => {
    if(validateAll()) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };

      let send: number[][] = [[Number(altura1), Number(altura2)]]
      send.push([Number(altura3), Number(altura4)])
      send.push([Number(altura5), Number(altura6)])
      send.push([Number(altura7), Number(altura8)])
      send.push([Number(altura9), Number(altura10)])
      console.log(send)
      axios
        .post(baseurl + '/turn/complete/' + turnId, send, config)
        .then((res) => {
          toast.success("Se guardó correctamente el control de calidad")
          navigate(-1)
        })
        .catch(() => {
          toast.error("Hubo un problema guardando el control de calidad")
        });
    } else {
      toast.error("Por favor completar todos los campos requeridos")
    }
  }

  useEffect(()=>{}, [turn, order])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%', fontSize: '40px', color: '#03396c' }}> {'Calidad de Prensado - Turno' } </h1>
      <Stack spacing={5} style={{ width: '40%', marginTop: '1%' }}>
        <div>
          <div>
            <h2> {"Muestra #1"} </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <p style={{ fontSize: '20px' }} > {"La altura total debe estar entre los siguientes valores: " + (order.internalNumber === 293 ? "13,00-13,10" : (order.internalNumber === 202 ? "17,95-18,05" : "12,95-13,05"))} </p>
              <TextField
                id="outlined-basic"
                label="Altura total"
                variant="outlined"
                value={altura1}
                onChange={(e) => {setAltura1(e.target.value)}}
                required={true}
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >mm</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {order.internalNumber !== 293 ?
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <p style={{ fontSize: '20px' }} > {"La altura del cuello debe estar entre los siguientes valores: " + (order.internalNumber === 202 ? "14,45-14,55" : "14,05-14,15")} </p>
                <TextField
                  id="outlined-basic"
                  label="Altura cuello"
                  variant="outlined"
                  value={altura2}
                  onChange={(e) => {setAltura2(e.target.value)}}
                  required={true}
                  inputProps={{style: {fontSize: 20}}}
                  InputLabelProps={{style: {fontSize: 20}}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <span style={{ color: '#cecece' }} >mm</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </div> : <></>
            }
          </div>

          <div>
            <h2> {"Muestra #2"} </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <p style={{ fontSize: '20px' }} > {"La altura total debe estar entre los siguientes valores: " + (order.internalNumber === 293 ? "13,00-13,10" : (order.internalNumber === 202 ? "17,95-18,05" : "12,95-13,05"))} </p>
              <TextField
                id="outlined-basic"
                label="Altura total"
                variant="outlined"
                value={altura3}
                onChange={(e) => {setAltura3(e.target.value)}}
                required={true}
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >mm</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {order.internalNumber !== 293 ?
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <p style={{ fontSize: '20px' }} > {"La altura del cuello debe estar entre los siguientes valores: " + (order.internalNumber === 202 ? "14,45-14,55" : "14,05-14,15")} </p>
                <TextField
                  id="outlined-basic"
                  label="Altura cuello"
                  variant="outlined"
                  value={altura4}
                  onChange={(e) => {setAltura4(e.target.value)}}
                  required={true}
                  inputProps={{style: {fontSize: 20}}}
                  InputLabelProps={{style: {fontSize: 20}}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <span style={{ color: '#cecece' }} >mm</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </div> : <></>
            }
          </div>

          <div>
            <h2> {"Muestra #3"} </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <p style={{ fontSize: '20px' }} > {"La altura total debe estar entre los siguientes valores: " + (order.internalNumber === 293 ? "13,00-13,10" : (order.internalNumber === 202 ? "17,95-18,05" : "12,95-13,05"))} </p>
              <TextField
                id="outlined-basic"
                label="Altura total"
                variant="outlined"
                value={altura5}
                onChange={(e) => {setAltura5(e.target.value)}}
                required={true}
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >mm</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {order.internalNumber !== 293 ?
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <p style={{ fontSize: '20px' }} > {"La altura del cuello debe estar entre los siguientes valores: " + (order.internalNumber === 202 ? "14,45-14,55" : "14,05-14,15")} </p>
                <TextField
                  id="outlined-basic"
                  label="Altura cuello"
                  variant="outlined"
                  value={altura6}
                  onChange={(e) => {setAltura6(e.target.value)}}
                  required={true}
                  inputProps={{style: {fontSize: 20}}}
                  InputLabelProps={{style: {fontSize: 20}}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <span style={{ color: '#cecece' }} >mm</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </div> : <></>
            }
          </div>

          <div>
            <h2> {"Muestra #4"} </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <p style={{ fontSize: '20px' }} > {"La altura total debe estar entre los siguientes valores: " + (order.internalNumber === 293 ? "13,00-13,10" : (order.internalNumber === 202 ? "17,95-18,05" : "12,95-13,05"))} </p>
              <TextField
                id="outlined-basic"
                label="Altura total"
                variant="outlined"
                value={altura7}
                onChange={(e) => {setAltura7(e.target.value)}}
                required={true}
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >mm</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {order.internalNumber !== 293 ?
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <p style={{ fontSize: '20px' }} > {"La altura del cuello debe estar entre los siguientes valores: " + (order.internalNumber === 202 ? "14,45-14,55" : "14,05-14,15")} </p>
                <TextField
                  id="outlined-basic"
                  label="Altura cuello"
                  variant="outlined"
                  value={altura8}
                  onChange={(e) => {setAltura8(e.target.value)}}
                  required={true}
                  inputProps={{style: {fontSize: 20}}}
                  InputLabelProps={{style: {fontSize: 20}}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <span style={{ color: '#cecece' }} >mm</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </div> : <></>
            }
          </div>

          <div>
            <h2> {"Muestra #5"} </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <p style={{ fontSize: '20px' }} > {"La altura total debe estar entre los siguientes valores: " + (order.internalNumber === 293 ? "13,00-13,10" : (order.internalNumber === 202 ? "17,95-18,05" : "12,95-13,05"))} </p>
              <TextField
                id="outlined-basic"
                label="Altura total"
                variant="outlined"
                value={altura9}
                onChange={(e) => {setAltura9(e.target.value)}}
                required={true}
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >mm</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {order.internalNumber !== 293 ?
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <p style={{ fontSize: '20px' }} > {"La altura del cuello debe estar entre los siguientes valores: " + (order.internalNumber === 202 ? "14,45-14,55" : "14,05-14,15")} </p>
                <TextField
                  id="outlined-basic"
                  label="Altura cuello"
                  variant="outlined"
                  value={altura10}
                  onChange={(e) => {setAltura10(e.target.value)}}
                  required={true}
                  inputProps={{style: {fontSize: 20}}}
                  InputLabelProps={{style: {fontSize: 20}}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <span style={{ color: '#cecece' }} >mm</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </div> : <></>
            }
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
            <h3>Volver</h3>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => handleRequest()}>
            <h3>Enviar</h3>
          </Button>
        </div>
      </Stack>
    </div>
  );
};