import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Box, Button, Stack, Tab, Tabs} from "@mui/material";
import {HourProductivityIndicator, ProductivityIndicator, QualityIndicator } from "../../models/Indicators";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';
import Chart from "../../components/Chart"

export interface DataType {
  x: Date;
  y: number;
}

export const ViewHourProductivityIndicators = () => {
  const navigate = useNavigate();

  const [indicator, setIndicator] = useState<HourProductivityIndicator[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [piece, setPiece] = useState(0);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .get(baseurl + '/indicators/hour-productivity', config)
      .then((res) => {
        setIndicator(res.data)
        let aux = []
        for (let i = 0; i < res.data.length; i++) {
          aux.push({x: res.data[i].date, y: res.data[i].tuercaHourProductivity})
        }
        setData([...aux])
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo el indicador de productividad de mano de obra")
      });
  }, [])
  
  useEffect(() => {
    if(piece === 0) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].tuercaHourProductivity})
      }
      setData([...aux])
    } else if(piece === 1) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].pistonHourProductivity})
      }
      setData([...aux])
    } else if(piece === 2) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].guiaHourProductivity})
      }
      setData([...aux])
    }
    console.log(data)
  }, [piece])

  useEffect(()=>{}, [indicator, data])

  const options = {
    animationEnabled: true,
    title:{
      text: "Productividad de mano de obra"
    },
    toolTip: {
      animationEnabled: true,
      contentFormatter: function ( e: { entries: { dataPoint: { y: string; }; }[]; } ) {
        if(e.entries[0].dataPoint.y.toString().length > 5) {
          return e.entries[0].dataPoint.y.toString().substring(0, 5) + ' u/hh';
        } else {
          return e.entries[0].dataPoint.y + ' u/hh';
        }
      }
    },
    data: [{
      type: "spline",
      dataPoints: indicator.length > 0 ? [
        {y: data[0].y, label: 'Ene'},
        {y: data[1].y, label: 'May'},
        {y: data[2].y, label: 'Sep'},
      ] : []
    }]
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setPiece(newValue);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', marginTop: '2%' }}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={piece} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tuerca" value={0} />
            <Tab label="Pist??n" value={1} />
            <Tab label="Gu??a" value={2} />
          </Tabs>
        </Box>
      </Box>
      <Chart options={options} />
    </div>
  );
};
