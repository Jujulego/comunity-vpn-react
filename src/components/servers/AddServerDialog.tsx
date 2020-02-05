import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid,
  TextField, InputAdornment
} from '@material-ui/core';
import { Casino as CasinoIcon } from '@material-ui/icons';
import { Controller } from 'react-hook-form';

import { useMe } from 'store/users/hooks';

import UserSelect from 'components/users/UserSelect';

// Types
interface FormState {
  ip: string, port: string,
  user: string
}

export interface AddServerDialogProps {
  open: boolean, onClose: () => void,
  selectUser?: boolean,
  onAddServer: (ip: string, port: number, user: string) => void
}

// Component
const AddServerDialog: FC<AddServerDialogProps> = (props) => {
  // Props
  const {
    open, onClose,
    selectUser = false,
    onAddServer
  } = props;

  // Redux
  const me = useMe();
  const isAdmin = me?.admin || false;

  // Form
  const { control, errors, formState, getValues, handleSubmit, register, setValue } = useForm<FormState>();

  // Handlers
  const handleAdd = ({ ip, port, user }: FormState) => {
    onAddServer(ip, parseInt(port), user);
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Adresse IP" fullWidth required
                  error={!!errors.ip} helperText={errors.ip?.message}
                  name="ip" inputRef={
                    register({
                      required: "Adresse IP requise",
                      validate: (value: string) => validator.isIP(value) || "Adresse IP invalide"
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Port" fullWidth required
                  error={!!errors.port} helperText={errors.port?.message}
                  name="port" inputRef={
                    register({
                      required: "Port requis",
                      validate: (value: string) => validator.isNumeric(value) || "Port invalide"
                    })
                  }
                  InputLabelProps={{ shrink: !!getValues().port || undefined }}
                  InputProps={{ endAdornment: randomButton }}
                />
              </Grid>
            </Grid>
          </Grid>
          { (selectUser && isAdmin) && (
            <Grid item>
              <Controller
                name="user" defaultValue={me?._id || ''}
                control={control} as={UserSelect}
                rules={{
                  required: "Utilisateur requis"
                }}

                empty={me ? undefined : "Pas d'utilisateur"}
                label="Utilisateur" fullWidth required
                error={!!errors.user} helperText={errors.user?.message}
              />
            </Grid>
          ) }
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