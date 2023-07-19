
import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { useEffect } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';


let buttonTheme = createTheme({
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
})

buttonTheme = responsiveFontSizes(buttonTheme)

const StyledButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-text': {
    color: theme.palette.primary.dark,
    padding: theme.spacing(1, 2, 1, 2),
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    textTransform: 'none',
    minWidth: 'auto',
    justifyContent: 'flex-start',
    borderRadius: 20,
    alignItems: 'center',
    outline: 'none',
    boxShadow: 'rgba(108, 2, 2, 0.4) 0px 30px 60px -12px inset',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.primary.main,
    },
  },
}));

const Question = ({ quizQuestions, url, handleSelectedAnswer, gameOver }) => {
  const [shuffledArray, setShuffledArray] = useState([])
  const [quizQuestionText, setQuizQuestionText] = useState('')

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * array.length)
      currentIndex--
      let temp = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temp
    }
    return array
  }

  useEffect(() => {
    quizQuestions.incorrect_answers.push(quizQuestions.correct_answer)
    setShuffledArray(prevShuffleArray => prevShuffleArray = shuffle(quizQuestions.incorrect_answers))
    setQuizQuestionText(prevQuizQestionText => prevQuizQestionText = decode(quizQuestions.question))
  }, [url])

  const answerButton = shuffledArray.map(answer => {
    const selectedAnsBtn = {
      backgroundColor: ((quizQuestions.selectedAnswer === answer) && (quizQuestions.revealCorrectAnswer === false) && buttonTheme.palette.secondary.light) ||
        ((quizQuestions.revealCorrectAnswer === true) && (quizQuestions.correct_answer === answer) && buttonTheme.palette.success.main) ||
        ((quizQuestions.selectedAnswer === answer) && (quizQuestions.revealCorrectAnswer === true) && (quizQuestions.correct_answer !== answer) && buttonTheme.palette.error.main),
    }
    return (
      <ThemeProvider theme={buttonTheme} key={nanoid()}>
        <StyledButton
          onClick={() => handleSelectedAnswer(quizQuestions.id, answer)}
          style={selectedAnsBtn}
          disabled={gameOver}
        >
          <Typography variant='h5' sx={{ fontFamily: 'Dosis', fontWeight: 'bold' }}
            style={{
              color: (quizQuestions.selectedAnswer === answer) && buttonTheme.palette.primary.dark,
            }}
          >
            {decode(answer)}
          </Typography>
        </StyledButton>
      </ThemeProvider>
    )
  })

  return (
    <Stack sx={{ mt: 2, pb: 2, borderBottom: 'solid 1px white' }}>
      <ThemeProvider theme={buttonTheme}>
        <Typography variant='h4' sx={{ fontFamily: 'Dosis', color: "white", }}>
          {quizQuestionText}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}
          alignItems='center'
        >
          {answerButton}
        </Stack>
      </ThemeProvider>
    </Stack>
  )
}

export default Question