import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {Stored} from "../../models/Stored";
import {StoredListItem} from "../../components/StoredListItem";
import {baseurl, get} from "../../common/http";
import axios from 'axios';
import toast from 'react-hot-toast';

export const StoredItems = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<Stored[]>([]);

  useEffect(() => {
    axios
      .get(baseurl + '/storage', {})
      .then((res) => {
        setList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos almacenados")
      });
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '3%', fontSize: '40px', color: '#03396c' }}>Productos almacenados</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '1.5%' }}>
        {list.map((element) => {
          return (
            <StoredListItem stored={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <h3>Volver</h3>
        </Button>
      </Stack>
    </div>
  );
};