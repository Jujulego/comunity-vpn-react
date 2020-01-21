import React, { ChangeEvent, FC, useState } from 'react';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@material-ui/core';

// Types
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

  // State
  const [ip, setIp] = useState('');

  // Handlers
  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    event.persist();
    setIp(event.target.value);
  };

  const handleAdd = () => {
    onAddServer(ip);
    onClose();
  };

  // Render
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajout de serveur</DialogTitle>
      <DialogContent>
        <TextField
          label="Adresse" fullWidth
          value={ip} onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleAdd} color="primary" disabled={!ip}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddServerDialog;