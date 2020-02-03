import { createContext, useContext, useEffect } from 'react';

import User from 'data/User';

// Types
export interface Event<S extends string> { to: string, scope: S }
export interface UserEvent extends Event<'users'>{
  kind: 'create' | 'update' | 'delete',
  user: User
}

export type AppEvents = UserEvent;
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
  // Contexts
  const ctx = useContext(EventContext);

  // Effects
  useEffect(() => {
    if (!room) return;

    const cb = (event: AppEvents) => {
      console.log(event.to, room);
      if (event.to === room) handler(event);
    };

    // Register
    ctx.register(room, cb);

    // Unregister
    return () => {
      ctx.unregister(room, cb);
    }
  }, [ctx, room, handler]);
}

export default EventContext;