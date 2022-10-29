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
import { Quality } from '../../models/Quality';

export const ViewControlRoscado = () => {
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

  const initialQuality = {
    id: 0,
    sample1: [],
    sample2: [],
    sample3: [],
    sample4: [],
    sample5: [],
    turn: initialTurn
  }

  const [turn, setTurn] = useState<Turn>(initialTurn)
  const [order, setOrder] = useState<ProductionOrder>(initial)
  const [quality, setQuality] = useState<Quality>(initialQuality)
  const [list, setList] = useState([])

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
        axios
          .get(baseurl + '/quality/' + turnId, {})
          .then((res2) => {
            setQuality(res2.data)
          })
          .catch(() => {
            toast.error("Hubo un problema obteniendo el control de calidad")
          });
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo el turno")
      });
  }, [])

  useEffect(()=>{}, [turn, order])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%', fontSize: '40px', color: '#03396c' }}> {'Calidad de Roscado - Turno' } </h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '1%' }}>
        <div>
          <div>
            <h2> {"Muestra #1"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"1"} checked={quality.sample1[0]==1} disabled />
              <p style={{ fontSize: '20px' }} > El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p style={{ fontSize: '20px' }} > El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={quality.sample1[1]}
                disabled
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
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
            <h2> {"Muestra #2"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"2"} checked={quality.sample2[0]==1} disabled />
              <p style={{ fontSize: '20px' }} > El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p style={{ fontSize: '20px' }} > El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={quality.sample2[1]}
                disabled
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
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
            <h2> {"Muestra #3"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"3"} checked={quality.sample3[0]==1} disabled />
              <p style={{ fontSize: '20px' }} > El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p style={{ fontSize: '20px' }} > El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={quality.sample3[1]}
                disabled
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
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
            <h2> {"Muestra #4"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"4"} checked={quality.sample4[0]==1} disabled />
              <p style={{ fontSize: '20px' }} > El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p style={{ fontSize: '20px' }} > El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={quality.sample4[1]}
                disabled
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
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
            <h2> {"Muestra #5"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"5"} checked={quality.sample5[0]==1} disabled />
              <p style={{ fontSize: '20px' }} > El tapón esta bien </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <p style={{ fontSize: '20px' }} > El torque debe ser mayor a 25 N/m </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={quality.sample5[1]}
                disabled
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 20}}}
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
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
          <h3>Volver</h3>
        </Button>
      </Stack>
    </div>
  );
};