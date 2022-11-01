import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {Stored} from "../../models/Stored";
import {StoredListItem} from "../../components/StoredListItem";
import {baseurl, get} from "../../common/http";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Scrap } from '../../models/Scrap';
import { ScrapListItem } from '../../components/ScrapListItem';

export const ScrapItems = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<Scrap[]>([]);

  useEffect(() => {
    axios
      .get(baseurl + '/turn/scrap', {})
      .then((res) => {
        setList(res.data)
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo los productos en scrap")
      });
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '3%', fontSize: '40px', color: '#03396c' }}>Productos en scrap</h1>
      <Stack spacing={2} style={{ width: '20%', marginTop: '1.5%' }}>
        {list.map((element) => {
          return (
            <ScrapListItem scrap={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <h3>Volver</h3>
        </Button>
      </Stack>
    </div>
  );
};