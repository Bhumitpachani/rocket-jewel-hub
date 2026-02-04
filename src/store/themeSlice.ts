import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalThemeSettings {
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
  companyName: string;
}

interface ThemeState {
  mode: 'light' | 'dark';
  globalSettings: GlobalThemeSettings;
}

// Get initial theme from localStorage or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme-mode');
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  }
  return 'dark';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
  globalSettings: {
    primaryColor: '#c4b5a0',
    accentColor: '#1e3a5f',
    logoUrl: '',
    companyName: 'Rocket Diamond'
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-mode', state.mode);
      }
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-mode', state.mode);
      }
    },
    updateGlobalThemeSettings: (state, action: PayloadAction<Partial<GlobalThemeSettings>>) => {
      state.globalSettings = { ...state.globalSettings, ...action.payload };
    }
  }
});

export const { toggleTheme, setThemeMode, updateGlobalThemeSettings } = themeSlice.actions;
export default themeSlice.reducer;
