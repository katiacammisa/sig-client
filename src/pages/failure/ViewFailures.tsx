import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {ProductionOrder} from "../../models/ProductionOrder";
import {Failure} from "../../models/Failure";
import {ActiveProcessListItem} from "../../components/ActiveProcessListItem";
import {FailureListItem} from "../../components/FailureListItem";
import {StoredListItem} from "../../components/StoredListItem";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';

export const ViewFailures = () => {
  const navigate = useNavigate();

  const [failureList, setFailureList] = useState<Failure[]>([]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .get(baseurl + '/failure', config)
      .then((res) => {
        setFailureList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los fallos")
      });
  }, [])

  useEffect(()=>{}, [failureList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver fallos</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        {failureList.map((element) => {
          return (
            <FailureListItem onClick={() => navigate('/failures/view/' + element.id)} failure={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate(-1)}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};