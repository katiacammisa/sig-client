import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
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

export const CreateControlRoscado = () => {
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
    return altura1 !== '' && altura2 !== '' && altura3 !== '' && altura4 !== '' && altura5 !== ''
  }

  const handleRequest = () => {
    if(validateAll()) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      const checkbox1 = document.getElementById("1") as HTMLInputElement | null;
      const checkbox2 = document.getElementById("2") as HTMLInputElement | null;
      const checkbox3 = document.getElementById("3") as HTMLInputElement | null;
      const checkbox4 = document.getElementById("4") as HTMLInputElement | null;
      const checkbox5 = document.getElementById("5") as HTMLInputElement | null;

      let send: number[][] = [[checkbox1 != null && checkbox1.checked == false ? 0 : 1, Number(altura1)]]
      send.push([checkbox2 != null && checkbox2.checked == false ? 0 : 1, Number(altura2)])
      send.push([checkbox3 != null && checkbox3.checked == false ? 0 : 1, Number(altura3)])
      send.push([checkbox4 != null && checkbox4.checked == false ? 0 : 1, Number(altura4)])
      send.push([checkbox5 != null && checkbox5.checked == false ? 0 : 1, Number(altura5)])

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
      <h1 style={{ marginTop: '2%' }}> {'Calidad de Roscado - Turno' } </h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '1%' }}>
        <div>
          <div>
            <h3 style={{ fontWeight: 'normal' }}> {"Muestra #1"} </h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"1"} />
              <p> El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p> El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                label="Altura cuello"
                variant="outlined"
                value={altura1}
                onChange={(e) => {setAltura1(e.target.value)}}
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >N/m</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 'normal' }}> {"Muestra #2"} </h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"2"} />
              <p> El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p> El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                label="Torque"
                variant="outlined"
                value={altura2}
                onChange={(e) => {setAltura2(e.target.value)}}
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >N/m</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 'normal' }}> {"Muestra #3"} </h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"3"} />
              <p> El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p> El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                label="Torque"
                variant="outlined"
                value={altura3}
                onChange={(e) => {setAltura3(e.target.value)}}
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >N/m</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 'normal' }}> {"Muestra #4"} </h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"4"} />
              <p> El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p> El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                label="Torque"
                variant="outlined"
                value={altura4}
                onChange={(e) => {setAltura4(e.target.value)}}
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >N/m</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 'normal' }}> {"Muestra #5"} </h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"5"}/>
              <p> El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p> El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                label="Torque"
                variant="outlined"
                value={altura5}
                onChange={(e) => {setAltura5(e.target.value)}}
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span style={{ color: '#cecece' }} >N/m</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
            <p>Volver</p>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => handleRequest()}>
            <p>Enviar</p>
          </Button>
        </div>
      </Stack>
    </div>
  );
};