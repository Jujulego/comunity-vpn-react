import React, { FC } from 'react';

import Alert, { AlertProps } from '@material-ui/lab/Alert';

import ErrorLog from 'data/ErrorLog';

// Types
export interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
  error: ErrorLog
}

// Component
const ErrorAlert: FC<ErrorAlertProps> = (props) => {
  // Props
  const { error, ...alert } = props;

  // Render
  return (
    <Alert {...alert} severity='error'>
      { error.format() }
    </Alert>
  )
};

export default ErrorAlert;