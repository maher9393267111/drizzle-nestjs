import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onlineUsers: {}, // { userId: { isOnline: boolean, lastSeen: timestamp } }
  engineerPresence: {}, // { orderId: { engineerId: { isOnline: boolean, lastSeen: timestamp } } }
  vendorPresence: {}, // { orderId: { vendorId: { isOnline: boolean, lastSeen: timestamp } } }
  typingUsers: {}, // { orderId: { userId: { isTyping: boolean, name: string } } }
};

const slice = createSlice({
  name: 'presence',
  initialState,
  reducers: {
    updateEngineerPresence(state, action) {
      const { orderId, engineerId, isOnline, lastSeen } = action.payload;
      if (!state.engineerPresence[orderId]) {
        state.engineerPresence[orderId] = {};
      }
      state.engineerPresence[orderId][engineerId] = {
        isOnline,
        lastSeen: lastSeen || Date.now(),
      };
    },
    updateVendorPresence(state, action) {
      const { orderId, vendorId, isOnline, lastSeen } = action.payload;
      if (!state.vendorPresence[orderId]) {
        state.vendorPresence[orderId] = {};
      }
      state.vendorPresence[orderId][vendorId] = {
        isOnline,
        lastSeen: lastSeen || Date.now(),
      };
    },
    setUserTyping(state, action) {
      const { orderId, userId, isTyping, name } = action.payload;
      if (!state.typingUsers[orderId]) {
        state.typingUsers[orderId] = {};
      }
      if (isTyping) {
        state.typingUsers[orderId][userId] = { isTyping, name };
      } else {
        delete state.typingUsers[orderId][userId];
      }
    },
    clearPresence(state) {
      state.onlineUsers = {};
      state.engineerPresence = {};
      state.vendorPresence = {};
      state.typingUsers = {};
    },
    resetVendorPresence(state, action) {
      const { orderId, vendorId } = action.payload;
      if (state.vendorPresence[orderId]?.[vendorId]) {
        delete state.vendorPresence[orderId][vendorId];
        
        // Clean up empty order entries
        if (Object.keys(state.vendorPresence[orderId]).length === 0) {
          delete state.vendorPresence[orderId];
        }
      }
    },



    resetEngineerPresence(state, action) {
      const { orderId, engineerId } = action.payload;
      if (state.engineerPresence[orderId]?.[engineerId]) {
        delete state.engineerPresence[orderId][engineerId];

        // Clean up empty order entries
        if (Object.keys(state.engineerPresence[orderId]).length === 0) {
          delete state.engineerPresence[orderId];
        }
      }

    },

  },
});

export const { 
  updateEngineerPresence, 
  updateVendorPresence, 
  setUserTyping, 
  clearPresence,
  resetVendorPresence,
  resetEngineerPresence
} = slice.actions;

export default slice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   onlineUsers: {}, // { userId: { isOnline: boolean, lastSeen: timestamp } }
//   engineerPresence: {}, // { engineerId: { isOnline: boolean, lastSeen: timestamp } }
//   vendorPresence: {}, // { vendorId: { isOnline: boolean, lastSeen: timestamp } }
//   typingUsers: {}, // { orderId: { userId: { isTyping: boolean, name: string } } }
// };

// const slice = createSlice({
//   name: 'presence',
//   initialState,
//   reducers: {
//     updateEngineerPresence(state, action) {
//       const { engineerId, isOnline, lastSeen } = action.payload;
//       state.engineerPresence[engineerId] = {
//         isOnline,
//         lastSeen: lastSeen || Date.now(),
//       };
//     },
//     updateVendorPresence(state, action) {
//       const { vendorId, isOnline, lastSeen } = action.payload;
//       state.vendorPresence[vendorId] = {
//         isOnline,
//         lastSeen: lastSeen || Date.now(),
//       };
//     },
//     // New reducer for typing status from Pusher
//     setUserTyping(state, action) {
//       const { orderId, userId, isTyping, name } = action.payload;
//       if (!state.typingUsers[orderId]) {
//         state.typingUsers[orderId] = {};
//       }
//       if (isTyping) {
//         state.typingUsers[orderId][userId] = { isTyping, name };
//       } else {
//         delete state.typingUsers[orderId][userId];
//       }
//     },
//     clearPresence(state) {
//       state.onlineUsers = {};
//       state.engineerPresence = {};
//       state.vendorPresence = {};
//       state.typingUsers = {};
//     },
//   },
// });

// export const { 
//   updateEngineerPresence, 
//   updateVendorPresence, 
//   setUserTyping, 
//   clearPresence 
// } = slice.actions;

// export default slice.reducer; 