import React, { FC, useEffect, useRef, useState } from 'react';

import {
  IconButton,
  InputAdornment,
  TextField, StandardTextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps, TextFieldProps
} from '@material-ui/core';
import {
  Edit,
  Visibility, VisibilityOff
} from '@material-ui/icons';

// Types
type TextToPassword<T extends TextFieldProps> =
  Omit<T, 'type' | 'InputProps'> &
  {
    editable?: boolean,
    onChangeEditable?: (editable: boolean) => void,
    InputProps?: Omit<T['InputProps'], 'endAdornment' | 'inputRef'>
  }

export type FilledPasswordFieldProps   = TextToPassword<FilledTextFieldProps>;
export type OutlinedPasswordFieldProps = TextToPassword<OutlinedTextFieldProps>;
export type StandardPasswordFieldProps = TextToPassword<StandardTextFieldProps>;

export type EditPasswordFieldProps =
  FilledPasswordFieldProps       |
  OutlinedPasswordFieldProps     |
  StandardPasswordFieldProps;

// Component
const EditPasswordField: FC<EditPasswordFieldProps> = (props) => {
  // Props
  const {
    editable: pEditable,
    onChangeEditable = () => {},

    disabled, required, value,
    InputProps = {},
    ...field
  } = props;

  // State
  const [sEditable, setSEditable] = useState(false);
  const [visible, setVisible] = useState(false);

  const editable =    (pEditable !== undefined) ? pEditable        : sEditable;
  const setEditable = (pEditable !== undefined) ? onChangeEditable : setSEditable;

  // Refs
  const input = useRef<HTMLInputElement>(null);

  // Effects
  useEffect(() => {
    if (editable && input.current != null) {
      input.current.focus();
    }
  }, [editable, input]);

  // Render
  const endAdornment = (
    <InputAdornment position="end">
      { editable ? (
        <IconButton onClick={() => setVisible(!visible)}>
          { visible ? <VisibilityOff /> : <Visibility /> }
        </IconButton>
      ) : (
        <IconButton
          disabled={disabled}
          onClick={() => setEditable(true)}
        >
          <Edit />
        </IconButton>
      )}
    </InputAdornment>
  );

  return (
    <TextField
      {...field}
      disabled={disabled || !editable}
      required={editable && required}

      type={(editable && visible) ? 'text' : 'password'}
      value={editable ? value : 'secretpassword!'}

      InputProps={{
        ...InputProps,
        inputRef: input,
        endAdornment
      }}
    />
  );
};

export default EditPasswordField;