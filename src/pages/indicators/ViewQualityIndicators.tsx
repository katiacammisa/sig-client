import { useNavigate, useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Box, Button, Stack, Tab, Tabs} from "@mui/material";
import { BaseMaterialIndicator, QualityIndicator } from "../../models/Indicators";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseurl } from '../../common/http';
import { Turn } from '../../models/Turn';
import Chart from "../../components/Chart"

export interface DataType {
  x: Date;
  y: number;
}

export const ViewQualityIndicators = () => {
  const navigate = useNavigate();

  const [indicator, setIndicator] = useState<QualityIndicator[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [machine, setMachine] = useState(0);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios
      .get(baseurl + '/indicators/quality', config)
      .then((res) => {
        setIndicator(res.data)
        let aux = []
        for (let i = 0; i < res.data.length; i++) {
          aux.push({x: res.data[i].date, y: res.data[i].prensaQuality})
        }
        setData([...aux])
      })
      .catch(() => {
        toast.error("Hubo un problema obteniendo el indicador de calidad")
      });
  }, [])
  
  useEffect(() => {
    if(machine === 0) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].prensaQuality})
      }
      setData([...aux])
    } else if(machine === 1) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].sinterizadoQuality})
      }
      setData([...aux])
    } else if(machine === 2) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].roscadoQuality})
      }
      setData([...aux])
    } else if(machine === 3) {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].tornoQuality})
      }
      setData([...aux])
    } else {
      let aux = []
      for (let i = 0; i < indicator.length; i++) {
        aux.push({x: indicator[i].date, y: indicator[i].pavonadoQuality})
      }
      setData([...aux])
    }
  }, [machine])

  useEffect(()=>{}, [indicator, data])

  const options = {
    animationEnabled: true,
    title:{
      text: "Calidad del producto"
    },
    axisY: {
      maximum: 100
    },
    toolTip: {
      animationEnabled: true,
      contentFormatter: function ( e: { entries: { dataPoint: { y: string; }; }[]; } ) {
        if(e.entries[0].dataPoint.y.toString().length > 5) {
          return e.entries[0].dataPoint.y.toString().substring(0, 5) + "%";
        } else {
          return e.entries[0].dataPoint.y + "%";
        }
      }
    },
    data: [{
      type: "spline",
      dataPoints: indicator.length > 0 ? [
        {y: data[0].y, label: 'Ene 1-15'},
        {y: data[1].y, label: 'Ene 15-30'},
        {y: data[2].y, label: 'Feb 1-15'},
        {y: data[3].y, label: 'Feb 15-30'},
        {y: data[4].y, label: 'Mar 1-15'},
        {y: data[5].y, label: 'Mar 15-30'},
        {y: data[6].y, label: 'Abr 1-15'},
        {y: data[7].y, label: 'Abr 15-30'},
        {y: data[8].y, label: 'May 1-15'},
        {y: data[9].y, label: 'May 15-30'},
        {y: data[10].y, label: 'Jun 1-15'},
        {y: data[11].y, label: 'Jun 15-30'},
        {y: data[12].y, label: 'Jul 1-15'},
        {y: data[13].y, label: 'Jul 15-30'},
        {y: data[14].y, label: 'Ago 1-15'},
        {y: data[15].y, label: 'Ago 15-30'},
        {y: data[16].y, label: 'Sep 1-15'},
        {y: data[17].y, label: 'Sep 15-30'},
        {y: data[18].y, label: 'Oct 1-15'},
        {y: data[19].y, label: 'Oct 15-30'},
        {y: data[20].y, label: 'Nov 1-15'},
        // {y: data[17].y, label: 'Nov 15-30'},
        // {y: data[18].y, label: 'Dec 1-15'},
        // {y: data[19].y, label: 'Dec 15-30'},
      ] : []
    }]
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMachine(newValue);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={machine} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Prensa" value={0} />
            <Tab label="Sinterizado" value={1} />
            <Tab label="Roscadora" value={2} />
            <Tab label="Torno" value={3} />
            <Tab label="Pavonado" value={4} />
          </Tabs>
        </Box>
      </Box>
      <Chart options={options} />
    </div>
  );
};
