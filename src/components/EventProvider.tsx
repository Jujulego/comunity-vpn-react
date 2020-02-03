import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { env } from 'env';
import EventContext, { AppEvents, EventHandler } from 'contexts/EventContext';
import ErrorLog, { WSErrorLog } from 'data/ErrorLog';

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
    socket.current.on('event', (event: AppEvents) => {
      console.log(event);
    });
    socket.current.on('error', (error: any) => {
      if (typeof error === 'string') {
        dispatch(addError(new WSErrorLog(error)));
      } else if (error instanceof Error) {
        dispatch(addError(new ErrorLog(error.message)));
      }
    });

    // Disconnect
    return () => {
      socket.current?.close();
    };
  }, [dispatch, token]);

  // Render
  const register = useCallback((room: string, handler: EventHandler) => {
    if (!socket.current) return;

    // Add handler and register !
    socket.current.on('event', handler);
    socket.current.emit('register', room);
  }, [socket]);

  const unregister = useCallback((room: string, handler: EventHandler) => {
    if (!socket.current) return;

    // Add handler and register !
    socket.current.off('event', handler);
    socket.current.emit('register', room);
  }, [socket]);

  return (
    <EventContext.Provider
      value={{
        register, unregister
      }}
    >
      { children }
    </EventContext.Provider>
  );
};

export default EventProvider;