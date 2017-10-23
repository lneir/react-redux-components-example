import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getChats = (state):Array<string> => state[STATE_NAME].chats;

export const chatsSelector = createSelector(
  getChats,
  (chats) => { return chats; }
);
