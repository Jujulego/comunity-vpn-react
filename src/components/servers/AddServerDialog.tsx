import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@material-ui/core';

// Types
interface FormState {
  ip: string
}

export interface AddServerDialogProps {
  open: boolean, onClose: () => void,
  onAddServer: (ip: string) => void
}

// Component
const AddServerDialog: FC<AddServerDialogProps> = (props) => {
  // Props
  const {
    open, onClose,
    onAddServer
  } = props;

  // Form
  const { errors, formState, handleSubmit, register } = useForm<FormState>();

  // Handlers
  const handleAdd = ({ ip }: FormState) => {
    onAddServer(ip);
    onClose();
  };

  // Render
  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth
    >
      <DialogTitle>Ajout de serveur</DialogTitle>
      <DialogContent>
        <TextField
          label="Adresse IP" fullWidth
          error={!!errors.ip} helperText={errors.ip?.message}
          name="ip" inputRef={
            register({
              validate: (value: string) => validator.isIP(value) || "Adresse IP invalide"
            })
          }
        />
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