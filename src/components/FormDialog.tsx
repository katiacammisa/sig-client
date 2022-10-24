import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import toast from 'react-hot-toast';

export const FormDialog = (props: {id: string | undefined, setOrder: (arg0: any) => void}) => {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    if(amount !== '' && amount !== '0') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post('https://sig-api-austral.herokuapp.com/productionOrder/dust/' + props.id, Number(amount), config)
        .then((res) => {
          props.setOrder(res.data)
          toast.success("Cantidad de polvo utilizada guardada")
        })
        .catch(() => {
          toast.error("Hubo un problema guardando la cantidad de polvo")
        });
    } else {
      toast.error("Por favor completar la cantidad de polvo utilizada")
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Button variant="contained" style={{ backgroundColor: '#000000', width: '60%' }} onClick={handleClickOpen}>
        Polvo utilizado
      </Button>
      <Dialog open={open} onClose={handleClose} style={{ width: '100%' }}>
        <DialogTitle>Polvo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresar la cantidad de polvo utilizada
          </DialogContentText>
          <TextField
            id="outlined-basic"
            label="Polvo en tn"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Volver</Button>
          <Button onClick={handleSend}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}