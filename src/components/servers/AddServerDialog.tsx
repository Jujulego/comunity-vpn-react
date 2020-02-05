import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  InputAdornment,
  Grid,
  TextField, MenuItem
} from '@material-ui/core';
import { Casino as CasinoIcon } from '@material-ui/icons';
import { Controller } from 'react-hook-form';

import { AppState } from 'store';
import { refreshAllUsers } from 'store/admin/thunks';
import { useMe } from 'store/users/hooks';

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
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);

  // Memos
  const options = useMemo(
    () => Object.keys(users).map(id => users[id].data),
    [users]
  );

  // Form
  const { control, errors, formState, getValues, handleSubmit, register, setValue } = useForm<FormState>();

  // Effects
  const isAdmin = me?.admin || false;
  useEffect(() => {
    if (selectUser && isAdmin) {
      dispatch(refreshAllUsers());
    }
  }, [selectUser, isAdmin, dispatch]);

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
          <Grid item>
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
          { (selectUser && isAdmin) && (
            <Grid item>
              <Controller
                name="user" defaultValue={me?._id || ''}
                control={control} as={TextField}
                rules={{
                  required: "Utilisateur requis"
                }}

                select
                label="Utilisateur" fullWidth required
                error={!!errors.user} helperText={errors.user?.message}
              >
                <MenuItem value=""><em>Pas d'utilisateur</em></MenuItem>
                { options.map(opt => opt && (
                  <MenuItem key={opt._id} value={opt._id}>
                    { opt.email }
                  </MenuItem>
                )) }
              </Controller>
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