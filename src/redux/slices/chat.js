import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCustomerChat: null,
  selectedOrderChat: null,
  selectedCustomerChat2: null,
  deletedChats: [], // Track recently deleted chats
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectCustomerChat(state, action) {
      state.selectedCustomerChat = action.payload;
    },
    selectCustomerChat2(state, action) {
      state.selectedCustomerChat2 = action.payload;
    },
    selectOrderChat(state, action) {
      state.selectedOrderChat = action.payload;
    },
    customerChatDeleted(state, action) {
      // Add the deleted chat ID to the list
      state.deletedChats.push(action.payload);
      
      // If the deleted chat was selected, unselect it
      if (state.selectedCustomerChat === action.payload) {
        state.selectedCustomerChat = null;
        state.selectedCustomerChat2 = null;
      }
    },
    orderChatDeleted(state, action) {
      // Add the deleted chat ID to the list
      state.deletedChats.push(action.payload);
      
      // If the deleted chat was selected, unselect it
      if (state.selectedOrderChat === action.payload) {
        state.selectedOrderChat = null;
      }
    },
    clearDeletedChats(state) {
      state.deletedChats = [];
    }
  }
});

export const { 
  selectCustomerChat, 
  selectOrderChat, 
  customerChatDeleted, 
  orderChatDeleted,
  clearDeletedChats
} = slice.actions;

export default slice.reducer;