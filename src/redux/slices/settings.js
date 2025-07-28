import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  themeMode: 'light',
  openSidebar: true,
  currency: process.env.BASE_CURRENCY || 'USD',
  rate: 1,
  themeColor: 'default',
  customPrimaryColor: '#000000', // New state for custom color
  sidebarBgColor: '#ffffff',
  sidebarTextColor: '',
  activeLinkColor: '#1976d2', // Default active link color (primary blue)
  // websiteBgColor: '#ffffff', 
    websiteBgColor: '', 
  fontFamily: 'Figtree, sans-serif', // Add default font family
  fontSize: 'medium', // Default font size
};

// slice
const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    toggleSidebar(state, action) {
      state.openSidebar = action.payload;
    },
    handleChangeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.rate = action.payload.rate;
    },
    setThemeColor(state, action) {
      state.themeColor = action.payload;
    },
    setSidebarBgColor(state, action) {
      state.sidebarBgColor = action.payload;
    },
    setSidebarTextColor(state, action) {
      state.sidebarTextColor = action.payload;
    },
    setActiveLinkColor(state, action) {
      state.activeLinkColor = action.payload;
    },
    setCustomPrimaryColor: (state, action) => { // New action
      state.customPrimaryColor = action.payload;
    },
    setWebsiteBgColor(state, action) {
      state.websiteBgColor = action.payload;
    },
    setFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { 
  setThemeMode, 
  toggleSidebar, 
  handleChangeCurrency, 
  setThemeColor,
  setSidebarBgColor,
  setSidebarTextColor,
  setActiveLinkColor,
  setCustomPrimaryColor,
  setWebsiteBgColor,
  setFontFamily,
  setFontSize
} = slice.actions;

// ----------------------------------------------------------------------
