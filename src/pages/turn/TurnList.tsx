import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {ProductionOrder} from "../../models/ProductionOrder";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {StoredListItem} from "../../components/StoredListItem";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';
import { TurnListItem } from '../../components/TurnListItem';

export const TurnList = () => {
  const navigate = useNavigate();

  const [turnList, setTurnList] = useState<Turn[]>([]);
  const { id, machine } = useParams()

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    let mach = machine;
    if(mach == "Pavonado" || mach == "Sinterizado") {
      mach = "Horno de " + machine
    }
    axios
      .get(baseurl + '/turn/all/' + id + '/' + mach, config)
      .then((res) => {
        setTurnList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });
  }, [])

  useEffect(()=>{}, [turnList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver turnos del proceso</h1>
      <Stack spacing={3} style={{ width: '50%', marginTop: '3%' }}>
        {turnList.map((element) => {
          return (
            <TurnListItem turn={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};