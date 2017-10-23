import { createSelector } from 'reselect';

const getChats = (state):Array<string> => state.grid.chats;

export const chatsSelector = createSelector(
  getChats,
  (chats) => { return chats; }
);
