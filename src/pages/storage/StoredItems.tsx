import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {Stored} from "../../models/Stored";
import {StoredListItem} from "../../components/StoredListItem";
import {get} from "../../common/http";

export const StoredItems = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<Stored[]>([]);

  useEffect(() => {
    const s1 = {
      product: "Polvo",
      amount: 5748,
      nextProcess: ["Prensar"]
    }
    const s2 = {
      product: "Pieza Prensada",
      amount: 279,
      nextProcess: ["Sinterizar"]
    }
    const s3 = {
      product: "Pieza Sinterizada",
      amount: 78,
      nextProcess: ["Mecanizar", "Roscar", "Pavonar"]
    }

    const aux = []
    aux.push(s1, s2, s3)
    setList([...aux])
    // get('stock')
    // axios
    //   .get('http://localhost:8080/storedItems' ,{})
    //   .then((res) => {
    //     setList(res.data)
    //   })
    //   .catch(() => {
    //     ErrorToast("Hubo un problema obteniendo los productos almacenados")
    //   });
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginTop: '5%' }}>Ver productos almacenados</h1>
      <Stack spacing={5} style={{ width: '20%', marginTop: '3%' }}>
        {list.map((element) => {
          return (
            <StoredListItem onClick={() => navigate('/search')} stored={element}/>
          );
        })}
        <Button variant="contained" style={{ backgroundColor: '#000000' }} onClick={() => navigate('/')}>
          <p>Volver</p>
        </Button>
      </Stack>
    </div>
  );
};