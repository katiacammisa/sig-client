import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {ProductionOrder} from "../../models/ProductionOrder";
import {TurnControlListItem} from "../../components/TurnControlListItem";
import {StoredListItem} from "../../components/StoredListItem";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';

export const ViewTurnsControl = () => {
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
    axios
      .get(baseurl + '/turn/all/' + id + '/' + machine, config)
      .then((res) => {
        setTurnList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los turnos")
      });
  }, [])

  useEffect(()=>{}, [setTurnList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver turnos</h1>
      <Stack spacing={5} style={{ width: '30%', marginTop: '3%' }}>
        {turnList.map((element) => {
          return (
            <TurnControlListItem onClick={() => navigate('/control' + machine + '/' + element.id)} turn={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};
