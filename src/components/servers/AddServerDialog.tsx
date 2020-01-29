import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { Casino as CasinoIcon } from '@material-ui/icons';

// Types
interface FormState {
  ip: string, port: string
}

export interface AddServerDialogProps {
  open: boolean, onClose: () => void,
  onAddServer: (ip: string, port: number) => void
}

// Component
const AddServerDialog: FC<AddServerDialogProps> = (props) => {
  // Props
  const {
    open, onClose,
    onAddServer
  } = props;

  // Form
  const { errors, formState, getValues, handleSubmit, register, setValue } = useForm<FormState>();

  // Handlers
  const handleAdd = ({ ip, port }: FormState) => {
    onAddServer(ip, parseInt(port));
    onClose();
  };

  const handleRandomPort = () => {
    const port = 1024 + Math.floor(Math.random() * (65535 - 1024));
    setValue('port', port.toString());
  };

  // Render
  const randomButton = (
    <InputAdornment position="end">
      <IconButton onClick={handleRandomPort}>
        <CasinoIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth
    >
      <DialogTitle>Ajout de serveur</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="Adresse IP" fullWidth required
              error={!!errors.ip} helperText={errors.ip?.message}
              name="ip" inputRef={
                register({
                  validate: (value: string) => validator.isIP(value) || "Adresse IP invalide"
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              label="Port" fullWidth required
              error={!!errors.port} helperText={errors.port?.message}
              name="port" inputRef={
                register({
                  validate: (value: string) => validator.isNumeric(value) || "Port invalide"
                })
              }
              InputLabelProps={{ shrink: !!getValues().port || undefined }}
              InputProps={{ endAdornment: randomButton }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleSubmit(handleAdd)} color="primary" disabled={!formState.dirty}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddServerDialog;