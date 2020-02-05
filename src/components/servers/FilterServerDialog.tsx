import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid,
  TextField, MenuItem
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

import { useTableContext } from 'contexts/TableContext';
import Server from 'data/Server';
import { useMe } from 'store/users/hooks';
import { Filter } from 'utils/filter';

import UserSelect from 'components/users/UserSelect';

// Types
interface FormState {
  ip: string,
  port: string,
  user: string,
  country: string
}

export interface FilterServerDialogProps {
  open: boolean, onClose: () => void,
  filterUser?: boolean
}

// Component
const FilterServerDialog: FC<FilterServerDialogProps> = (props) => {
  // Props
  const {
    open, onClose,
    filterUser = false
  } = props;

  // Context
  const { documents, filter, onFilter } = useTableContext<Server>();

  // Redux
  const me = useMe();
  const isAdmin = me?.admin || false;

  // Memos
  const countries = useMemo<string[]>(
    () => Object.keys(documents.reduce((acc, srv) => ({ ...acc, [srv.country]: true }), {})),
    [documents]
  );

  // Form
  const { control, errors, formState, handleSubmit, register } = useForm<FormState>();

  // Handlers
  const handleFilter = ({ ip, port, user, country }: FormState) => {
    if (formState.touched) {
      if (!filterUser) user = '';

      const filter: Filter<Server> = {};
      if (ip)      filter.ip      = ip;
      if (port)    filter.port    = parseInt(port);
      if (user)    filter.user    = user;
      if (country) filter.country = country;

      onFilter(filter);
    }

    onClose();
  };

  // Render
  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth
    >
      <DialogTitle>Filtres actifs</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  label="Adresse IP" fullWidth
                  error={!!errors.ip} helperText={errors.ip?.message}
                  name="ip" inputRef={
                    register({
                      validate: (value: string) => !value || validator.isIP(value) || "Adresse IP invalide"
                    })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Port" fullWidth
                  error={!!errors.port} helperText={errors.port?.message}
                  name="port" inputRef={
                    register({
                      validate: (value: string) => !value || validator.isNumeric(value) || "Port invalide"
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Controller
              name="country" defaultValue={filter.country || ''}
              control={control} as={TextField}

              select
              label="Pays" fullWidth
              error={!!errors.country} helperText={errors.country?.message}
            >
              <MenuItem value=""><em>Tous les pays</em></MenuItem>
              { countries.map(country => (
                <MenuItem key={country} value={country}>
                  { country }
                </MenuItem>
              )) }
            </Controller>
          </Grid>
          { (filterUser && isAdmin) && (
            <Grid item>
              <Controller
                name="user" defaultValue={filter.user || ''}
                control={control} as={UserSelect}

                empty="Tous les utilisateurs"
                label="Utilisateur" fullWidth
                error={!!errors.user} helperText={errors.user?.message}
              />
            </Grid>
          ) }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleSubmit(handleFilter)} color="primary">
          Filtrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterServerDialog;