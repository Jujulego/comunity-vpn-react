import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';

import ErrorLog from 'data/ErrorLog';
import { AppState } from 'store';

import ErrorAlert from './ErrorAlert';

// Types
export type ErrorSnackbarProps = Omit<SnackbarProps, 'open' | 'onClose' | 'onExited'>

// Component
const ErrorSnackbar: FC<ErrorSnackbarProps> = (props) => {
  // State
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<ErrorLog | undefined>(undefined);

  // Redux
  const errors = useSelector((state: AppState) => state.errors.errors);
  const nextError = () => {
    if (errors.length > 0 && (!error || errors[0].date.isAfter(error.date))) {
      // New error !
      setError(errors[0]);
      setOpen(true);
    }
  };

  // Effects
  useEffect(() => {
    if (open) {
      setOpen(false);
    } else {
      nextError();
    }
  }, [errors]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleExited = () => {
    nextError();
  };

  // Render
  return (
    <Snackbar
      autoHideDuration={6000} {...props}
      open={open} onClose={handleClose} onExited={handleExited}
    >
      { error && (
        <ErrorAlert
          error={error}
          elevation={6} variant="filled"
          onClose={handleClose}
        />
      ) }
    </Snackbar>
  )
};

export default ErrorSnackbar;