import { createContext, useContext, useEffect } from 'react';

import User from 'data/User';
import Server from 'data/Server';

import { useMe } from 'store/users/hooks';

// Types
export interface Event<S extends string> { to: string, scope: S }
export interface UserEvent extends Event<'users'>{
  kind: 'create' | 'update' | 'delete',
  user: User
}

export interface ServerEvent extends Event<'servers'>{
  kind: 'up' | 'down',
  server: Server
}

export type AppEvents = UserEvent | ServerEvent;
export type EventHandler = (event: AppEvents) => void;

export interface EventContextProps {
  register: (room: string, handler: EventHandler) => void,
  unregister: (room: string, handler: EventHandler) => void
}

// Default values
const eventDefaults: EventContextProps = {
  register:   () => {},
  unregister: () => {}
};

// Context
const EventContext = createContext(eventDefaults);

// Hooks
export function useEventRoom(room: string | undefined, handler: EventHandler) {
  // Redux
  const me = useMe();

  // Contexts
  const ctx = useContext(EventContext);

  // Effects
  useEffect(() => {
    // Check up room
    if (room === 'me') room = me?._id; // eslint-disable-line react-hooks/exhaustive-deps
    if (!room) return;

    // Callback
    const cb = (event: AppEvents) => {
      if (event.to === room) handler(event);
    };

    // Register
    ctx.register(room, cb);

    // Unregister
    return () => {
      if (!room) return;
      ctx.unregister(room, cb);
    }
  }, [me, ctx, room, handler]);
}

export default EventContext;