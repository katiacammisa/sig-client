import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, MenuItem, Select, Stack, TextareaAutosize, TextField} from "@mui/material";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../../common/Toasts";
import {CreateProductionOrderModel, ProductionOrder} from "../../models/ProductionOrder";
import {authRequestInterceptor} from "../../common/axios";
import {baseurl, post} from "../../common/http";
import toast from 'react-hot-toast';
import { CreateTurnModel, Turn } from '../../models/Turn';
import dayjs, { Dayjs } from 'dayjs';

export const CreateTurn = () => {
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

  const [turn, setTurn] = useState('');
  const [turn2, setTurn2] = useState('1');
  const [amount, setAmount] = useState('');
  const [responsible, setResponsible] = useState('');
  const [passed, setPassed] = useState('');
  const [order, setOrder] = useState<ProductionOrder>(initial);
  const [turnsList, setTurnsList] = useState([]);
  const { id, machine } = useParams()
  
  const validateAllFields = () => {
    return turn !== '' && amount !== '' && responsible !== ''
  }

  const handleRequest = () => {
    if(Number(amount) <= order.missingPieces) {
      if(validateAllFields()) {
        const turnModel: CreateTurnModel = {
          responsible: responsible,
          pieces: Number(amount),
          machine: machine!,
          productionOrder: order,
          turn: (machine! !== "Sinterizado" ? turn : turn2),
          passed: Boolean(passed)
        };
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        };
        axios
          .post(baseurl + '/turn', turnModel, config)
          .then((res) => {
            toast.success("Turno ingresado")
            navigate(-1)
          })
          .catch(() => {
            toast.error("Hubo un problema ingresando el turno")
          });
      } else {
        toast.error("Por favor completar todos los campos requeridos")
      }
    } else {
      toast.error("No se pueden procesar más de " + order.missingPieces + " piezas")
    }
  }

  useEffect(() => {
    axios
      .get(baseurl + '/productionOrder/' + id, {})
      .then((res) => {
        setOrder(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo la orden")
      });

    let mach = machine;
    if(mach == "Pavonado" || mach == "Sinterizado") {
      mach = "Horno de " + machine
    }
    axios
      .get(baseurl + '/turn/all/' + id + '/' + mach, {})
      .then((res) => {
        console.log(res.data)
        console.log(dayjs().format("YYYY-MM-DD"))
        setTurnsList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo la orden")
      });
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ingresar turno</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        <TextField
          id="outlined-basic"
          label="Responsable"
          variant="outlined"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          required={true}
        />
        { machine! !== "Sinterizado" ?
          <Select
            className="selectGD"
            labelId="demo-simple-select-label"
            defaultValue={turn}
            value={turn}
            onChange={(e) => {
              setTurn(e.target.value);
            }}
            required={true}
          >
            { turnsList.filter((e: Turn) => e.turn === 'Mañana' && e.localDate.toString() === dayjs().format("YYYY-MM-DD")).length === 0 ?
              <MenuItem key={'Mañana'} value={'Mañana'}>
                Mañana
              </MenuItem>
              : <></>
            }
            { turnsList.filter((e: Turn) => e.turn === 'Tarde' && e.localDate.toString() === dayjs().format("YYYY-MM-DD")).length === 0 ?
              <MenuItem key={'Tarde'} value={'Tarde'}>
                Tarde
              </MenuItem>
              : <></>
            }
            { turnsList.filter((e: Turn) => e.turn === 'Noche' && e.localDate.toString() === dayjs().format("yyyy-mm-dd")).length === 0 ?
              <MenuItem key={'Noche'} value={'Noche'}>
                Noche
              </MenuItem>
              : <></>
            }
          </Select> :
          <Select
            className="selectGD"
            labelId="demo-simple-select-label"
            defaultValue={turn2}
            value={turn2}
            onChange={(e) => {
              setTurn2(e.target.value);
            }}
            required={true}
          >
            { turnsList.filter((e: Turn) => e.turn === '1' && e.localDate.toString() === dayjs().format("yyyy-mm-dd")).length === 0 ?
              <MenuItem key={'1'} value={'1'}>
                1
              </MenuItem>
              : <></>
            }
            { turnsList.filter((e: Turn) => e.turn === '2' && e.localDate.toString() === dayjs().format("yyyy-mm-dd")).length === 0 ?
              <MenuItem key={'2'} value={'2'}>
                2
              </MenuItem>
              : <></>
            }
          </Select>
        }
        <div style={{ marginTop: '0', display: 'flex', flexDirection: 'column', width: '100%' }} >
          <h3 style={{ fontWeight: 'normal', marginBottom: '10px', textAlign: 'center' }}> {"Quedan " + order.missingPieces + " piezas por procesar"} </h3>
          <TextField
            id="outlined-basic"
            label="Cantidad de piezas"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required={true}
          />
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