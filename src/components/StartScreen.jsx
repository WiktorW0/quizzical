/* eslint-disable react/prop-types */
import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import '../fonts/fonts.css'

let buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#cad5ed',
      light: '#365eb5',
      dark: '#193269',
    },
    secondary: {
      main: '#38ccae'
    }
  },
})

buttonTheme = responsiveFontSizes(buttonTheme)

const StyledControllButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-text': {
    fontFamily: 'Dosis',
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 4, 2, 4),
    margin: theme.spacing(3, 1),
    minWidth: 'auto',
    fontSize: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px'
  },
}))

const StyledTypo = styled(Typography)(({ theme }) => ({
  '&.MuiTypography-root': {
    position: 'relative',
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    fontFamily: 'Dosis',
    '&:after': {
      content: '""',
      width: 0,
      height: '3px',
      position: 'absolute',
      backgroundColor: theme.palette.secondary.main,
      top: '100%',
      left: 0,
      background: 'linear-gradient(to right, transparent, #38ccae)',
      transition: theme.transitions.create('width'),
    },
    '&:hover:after': {
      width: '100%'
    }
  }
}))

const StartScreen = ({ changeState }) => {
  return (
    <ThemeProvider theme={buttonTheme}>
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        <Typography variant='h3' sx={{ color: '#cad5ed', fontFamily: 'Dosis', textAlign: 'center' }}>
          Quizzical
        </Typography>
        <Typography variant='h4' sx={{ mt: 2, color: '#cad5ed', fontFamily: 'Dosis', textAlign: 'center' }}>
          Answer the questions and test your knowledge!
        </Typography>

        <StyledControllButton variant='text' value='Settings' onClick={changeState}>
          New quiz
        </StyledControllButton>
        <a href="https://opentdb.com/" className='link'>
          <StyledTypo variant='h5' sx={{ textAlign: 'center' }}>
            If quizzes are quizzical then what are tests ?
          </StyledTypo>
        </a>
      </Stack>
    </ThemeProvider>
  )
}

export default StartScreen 