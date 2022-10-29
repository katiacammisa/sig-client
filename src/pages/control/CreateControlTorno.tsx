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

export const CreateControlTorno = () => {
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


  const handleRequest = () => {
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

    let send: number[][] = [[checkbox1 != null && checkbox1.checked == false ? 0 : 1]]
    send.push([checkbox2 != null && checkbox2.checked == false ? 0 : 1])
    send.push([checkbox3 != null && checkbox3.checked == false ? 0 : 1])
    send.push([checkbox4 != null && checkbox4.checked == false ? 0 : 1])
    send.push([checkbox5 != null && checkbox5.checked == false ? 0 : 1])

    axios
      .post(baseurl + '/turn/complete/' + turnId, send, config)
      .then((res) => {
        toast.success("Se guardó correctamente el control de calidad")
        navigate(-1)
      })
      .catch(() => {
        toast.error("Hubo un problema guardando el control de calidad")
      });
  }

  useEffect(()=>{}, [turn, order])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '2%', fontSize: '40px', color: '#03396c' }}> {'Calidad de Torno - Turno' } </h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '1%' }}>
        <div>
          <div>
            <h2> {"Muestra #1"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"1"} />
              <p style={{ fontSize: '20px' }} > Control visual ranura </p>
            </div>
          </div>

          <div>
            <h2> {"Muestra #2"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"2"} />
              <p style={{ fontSize: '20px' }} > Control visual ranura </p>
            </div>
          </div>

          <div>
            <h2> {"Muestra #3"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"3"} />
              <p style={{ fontSize: '20px' }} > Control visual ranura </p>
            </div>
          </div>

          <div>
            <h2> {"Muestra #4"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"4"} />
              <p style={{ fontSize: '20px' }} > Control visual ranura </p>
            </div>
          </div>

          <div>
            <h2> {"Muestra #5"} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <Checkbox id={"5"} />
              <p style={{ fontSize: '20px' }} > Control visual ranura </p>
            </div>
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