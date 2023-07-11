
import React from 'react';
import { Stack, Typography, Button, } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { categories } from '../utils/constants'
import { difficulties } from '../utils/constants'
import { types } from '../utils/constants'
import '../fonts/fonts.css'

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#cad5ed',
      light: '#365eb5',
      dark: '#000000',

    },
    secondary: {
      main: '#38ccae',
      light: '#c6f7d3',
      dark: '#27695c'
    }
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-text': {
    color: theme.palette.primary.dark,
    padding: theme.spacing(1, 2, 1, 2),
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(0),
    minWidth: 'auto',
    justifyContent: 'flex-start',
    borderRadius: 20,
    alignItems: 'center',
    outline: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.primary.main,
    },
  },
}));

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
}));


const SettingScreen = ({ changeState, quizOptions, handleQuizOptions }) => {

  return (
    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, width: 'auto' }}>
      <Typography variant='h4' sx={{ color: 'white', fontFamily: 'Dosis' }}>
        Category:
      </Typography>
      <Stack
        direction='row'
        display='flex'
        alignItems='center'
        flexWrap='wrap'
        justifyContent='center'
        gap={2}
        sx={{ width: '1200px', height: '100%', mt: 2 }}
      >
        {categories.map((category) => (
          <ThemeProvider theme={buttonTheme} key={category.name}>
            <StyledButton
              variant='text'
              sx={{ boxShadow: 'rgba(108, 2, 2, 0.4) 0px 30px 60px -12px inset' }}
              name='category'
              value={category.id}
              style={{ background: category.id === quizOptions.category && buttonTheme.palette.secondary.light }}
              onClick={handleQuizOptions}
            >
              <Typography variant='h5' display='flex' alignItems='center' justifyContent='center' sx={{ fontFamily: 'Dosis', fontWeight: 'bold' }}
                style={{ color: category.id === quizOptions.category && buttonTheme.palette.primary.dark }}
              >
                {category.name}
              </Typography>
            </StyledButton>
          </ThemeProvider>
        ))}
      </Stack>
      <Typography variant='h4' sx={{ color: 'white', mt: 5, fontFamily: 'Dosis' }}>
        Difficulty:
      </Typography>
      <Stack direction='row' gap={2} sx={{ mt: 2 }}>
        {difficulties.map((difficulty) => (
          <ThemeProvider theme={buttonTheme} key={difficulty.name}>
            <StyledButton
              variant='text'
              sx={{ boxShadow: 'rgba(108, 2, 2, 0.4) 0px 30px 60px -12px inset' }}
              name='difficulty'
              value={difficulty.id}
              style={{ background: difficulty.id === quizOptions.difficulty && buttonTheme.palette.secondary.light }}
              onClick={handleQuizOptions}
            >
              <Typography variant='h5' display='flex' alignItems='center' justifyContent='center' sx={{ fontFamily: 'Dosis', fontWeight: 'bold' }}
                style={{ color: difficulty.id === quizOptions.difficulty && buttonTheme.palette.primary.dark }}
              >
                {difficulty.name}
              </Typography>
            </StyledButton>
          </ThemeProvider>
        ))}
      </Stack>
      <Typography variant='h4' sx={{ color: 'white', mt: 5, fontFamily: 'Dosis' }}>
        Type:
      </Typography>
      <Stack direction='row' gap={2} sx={{ mt: 2 }}>
        {types.map((type) => (
          <ThemeProvider theme={buttonTheme} key={type.name}>
            <StyledButton
              variant='text'
              sx={{ boxShadow: 'rgba(108, 2, 2, 0.4) 0px 30px 60px -12px inset' }}
              name='type'
              value={type.id}
              style={{ background: type.id === quizOptions.type && buttonTheme.palette.secondary.light }}
              onClick={handleQuizOptions}
            >
              <Typography variant='h5' display='flex' alignItems='center' justifyContent='center' sx={{ fontFamily: 'Dosis', fontWeight: 'bold' }}
                style={{ color: type.id === quizOptions.type && buttonTheme.palette.primary.dark }}
              >
                {type.name}
              </Typography>
            </StyledButton>
          </ThemeProvider>
        ))}
      </Stack>
      <ThemeProvider theme={buttonTheme}>
        <Stack direction='row'>
          <StyledControllButton value='Home' onClick={changeState}>
            Back
          </StyledControllButton>
          <StyledControllButton value='QuizScreen' onClick={changeState}>
            Start quiz
          </StyledControllButton>
        </Stack>
      </ThemeProvider>

    </Stack>
  )
}

export default SettingScreen
