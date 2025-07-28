import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resendDisabled: false,
  countdown: 0
};

const slice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    startResendCooldown(state) {
      state.resendDisabled = true;
      state.countdown = 60;
    },
    decrementCountdown(state) {
      if (state.countdown > 0) {
        state.countdown -= 1;
      }
      if (state.countdown === 0) {
        state.resendDisabled = false;
      }
    },
    resetVerificationState(state) {
      state.resendDisabled = false;
      state.countdown = 0;
    }
  }
});

export const { startResendCooldown, decrementCountdown, resetVerificationState } = slice.actions;
export default slice.reducer; 