
import React from 'react';
import { fetchingFromAPI } from '../utils/fetchingFromAPI';
import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Question } from './';
import { nanoid } from 'nanoid';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

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
    border: 'solid 1px',
  },
}));

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
}));

const GameScreen = ({ quizOptions: { category, difficulty, type }, changeState }) => {
  const [quizQuestions, setQuizQuestions] = useState([])
  const [disabledButton, setDisabledButton] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [playerScore, setPlayerScore] = useState('')
  const allQuestionsAnswered = quizQuestions.every(question => question.selectedAnswer !== "");

  let categoryParam = '';
  let difficultyParam = '';
  let typeParam = '';

  if (category !== '')
    categoryParam = `&category=${category}`;
  if (difficulty !== '')
    difficultyParam = `&difficulty=${difficulty}`;
  if (type !== '')
    typeParam = `&type=${type}`;

  let url = `${categoryParam}${difficultyParam}${typeParam}`

  useEffect(() => {
    fetchingFromAPI(`${url}`)
      .then(questions => {
        setQuizQuestions(questions.map(question => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: '',
            revealCorrectAnswer: false,
          }
        }))
      })
  }, [url])

  useEffect(() => {
    if (quizQuestions.length !== 0 && allQuestionsAnswered) {
      let currentScore = 0
      quizQuestions.forEach(question => {
        if (question.correct_answer === question.selectedAnswer) {
          currentScore++
        }
      })
      setPlayerScore(currentScore)
      setDisabledButton(false)
    }
  }, [quizQuestions, allQuestionsAnswered])


  const handleSelectedAnswer = (questionId, answer) => {
    setQuizQuestions(prevQuestionsArray => (
      prevQuestionsArray.map(question => {
        return (
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      })
    ))
  }

  if (quizQuestions.length === 0) {
    return (
      <ThemeProvider theme={buttonTheme}>
        <Stack>
          <Typography variant='h4' sx={{ fontFamily: 'Dosis', color: 'white', ml: 2 }} >
            Loading...
          </Typography>
          <StyledControllButton value='Settings' onClick={changeState}>
            Or... try again
          </StyledControllButton>
        </Stack>
      </ThemeProvider>
    )
  }

  const checkQuizAnswers = () => {
    if (allQuestionsAnswered) {
      setQuizQuestions(prevQuizQestions => (
        prevQuizQestions.map(question => {
          return {
            ...question,
            revealCorrectAnswer: true
          }
        })
      ))
      setGameOver(true)
    }
  }

  const questionList = quizQuestions.map(question => {
    return (
      <Stack key={question.id}>
        <Question quizQuestions={question} url={url} handleSelectedAnswer={handleSelectedAnswer} gameOver={gameOver} />
      </Stack>
    )
  })

  return (
    <Stack>
      {questionList}
      <ThemeProvider theme={buttonTheme}>
        <Stack direction='row' display='flex' alignItems='center'>
          {<StyledControllButton value='Settings' onClick={changeState}>
            Back
          </StyledControllButton>}
          {gameOver && <StyledControllButton value='Home' onClick={changeState}>
            Play again?
          </StyledControllButton>}
          {!gameOver && <StyledControllButton disabled={disabledButton} onClick={checkQuizAnswers} >
            Check answers
          </StyledControllButton>}
          {gameOver && playerScore === 0 &&
            <a href="https://www.youtube.com/watch?v=wW_ikQbTD-4" className='link'>
              <StyledTypo variant='h4' sx={{ fontFamily: 'Dosis', color: 'white', ml: 2 }}>
                {`You answered ${playerScore} out of 5 questions correctly`}
              </StyledTypo>
            </a>
          }
          {gameOver && playerScore >= 1 && playerScore <= 4 &&
            <a href="https://www.youtube.com/watch?v=fqT5_3jaVjE" className='link'>
              <StyledTypo variant='h4' sx={{ fontFamily: 'Dosis', color: 'white', ml: 2 }}>
                {`You answered ${playerScore} out of 5 questions correctly`}
              </StyledTypo>
            </a>
          }
          {gameOver && playerScore === 5 &&
            <a href="https://www.youtube.com/watch?v=y7Ymw5aQkLs" className='link'>
              <StyledTypo variant='h4' sx={{ fontFamily: 'Dosis', color: 'white', ml: 2 }}>
                {`You answered ${playerScore} out of 5 questions correctly`}
              </StyledTypo>
            </a>
          }
        </Stack>
      </ThemeProvider>
    </Stack>
  )
}

export default GameScreen