import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MenuItem,
  TextField, StandardTextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps, TextFieldProps
} from '@material-ui/core';

import { AppState } from 'store';
import { refreshAllUsers } from 'store/admin/thunks';
import { useMe } from 'store/users/hooks';

// Types
type TextToUserSelect<T extends TextFieldProps> =
  Omit<T, 'select' | 'input' | 'InputProps'> &
  {
    empty?: string
  }

export type FilledUserSelectProps   = TextToUserSelect<FilledTextFieldProps>;
export type OutlinedUserSelectProps = TextToUserSelect<OutlinedTextFieldProps>;
export type StandardUserSelectProps = TextToUserSelect<StandardTextFieldProps>;

export type UserSelectProps =
  FilledUserSelectProps       |
  OutlinedUserSelectProps     |
  StandardUserSelectProps;

// Component
const UserSelect: FC<UserSelectProps> = (props) => {
  // Props
  const { empty, ...field } = props;

  // Redux
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);
  const me = useMe();

  const isAdmin = me?.admin || false;

  // Memos
  const options = useMemo(
    () => Object.values(users).map(user => user.data),
    [users]
  );

  // Effects
  useEffect(() => {
    if (isAdmin) dispatch(refreshAllUsers());
  }, [dispatch, isAdmin]);

  // Render
  return (
    <TextField {...field} select>
      { (empty !== undefined) && (
        <MenuItem value=""><em>{ empty }</em></MenuItem>
      ) }
      { options.map(opt => opt && (
        <MenuItem key={opt._id} value={opt._id}>
          { opt.email }
        </MenuItem>
      )) }
    </TextField>
  )
};

export default UserSelect;