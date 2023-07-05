import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8133f1',
      main: '#6200EE',
      dark: '#4400a6',
      contrastText: '#fff',
    },
    secondary: {
      light: '#35e1d1',
      main: '#03DaC6',
      dark: '#02988a',
      contrastText: '#000',
    }
  },
});

export default theme