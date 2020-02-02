import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { env } from 'env';
import { WSErrorLog } from 'data/ErrorLog';

import { AppState } from 'store';
import { addError } from 'store/errors/actions';

// Types
type Socket = typeof io.Socket;

// Component
const EventProvider: FC = ({ children }) => {
  // Redux
  const dispatch = useDispatch();
  const token = useSelector((state: AppState) => state.auth.token);

  // Refs
  const socket = useRef<Socket | null>(null);

  // Effects
  useEffect(() => {
    if (!token) return;

    // Connect
    socket.current = io.connect(env.API_BASE_URL, { query: { token }});
    socket.current.on('error', (error: string) => dispatch(addError(new WSErrorLog(error))));

    // Disconnect
    return () => {
      socket.current?.close();
    };
  }, [dispatch, token]);

  // Render
  return (
    <>{ children }</>
  );
};

export default EventProvider;