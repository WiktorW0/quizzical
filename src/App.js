
import './App.css';
import { Box, } from '@mui/material';
import { StartScreen } from './components';
import { SettingScreen } from './components';
import uqestionMarkImg from './img/questionMark.png'
import { useState } from 'react';
import { GameScreen } from './components';

function App() {
  const [gameState, setGameState] = useState(
    {
      state: 'Home'
    }
  )
  const [quizOptions, setQuizOptions] = useState(
    {
      category: '',
      difficulty: '',
      type: ''
    }
  )

  function handleQuizOptions(e) {
    const { name, value } = e.currentTarget
    setQuizOptions(prevQuizOptions => {
      return {
        ...prevQuizOptions,
        [name]: value
      }
    })
  }

  function handleGameState(e) {
    const { value } = e.currentTarget
    setGameState(prevGameState => {
      return {
        ...prevGameState,
        state: value
      }
    })
  }


  return (
    <Box
      sx={{ overflowY: "auto", width: 'auto' }}
    >
      <img src={uqestionMarkImg} className='bg--img' alt="questionMarkImg" />
      {gameState.state === 'Home' && <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
          m: 0.5,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(to right top, rgba(39, 116, 184,0.75),rgba(0, 0, 0,0.4))',
          p: 4,
          borderRadius: 20,
        }}>
        <StartScreen changeState={handleGameState} />
      </Box >}
      {gameState.state !== 'Home' && <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
          m: 0.5,
          position: { md: 'absolute' },
          top: { md: '50%' },
          left: { md: '50%' },
          transform: { md: 'translate(-50%, -50%)' },
          background: 'linear-gradient(to right top, rgba(39, 116, 184,0.75),rgba(0, 0, 0,0.4))',
          p: 4,
          borderRadius: 20,
          width: 'auto'
        }}>
        {gameState.state === 'Settings' && <SettingScreen changeState={handleGameState} handleQuizOptions={handleQuizOptions} quizOptions={quizOptions} />}
        {gameState.state === 'QuizScreen' && <GameScreen quizOptions={quizOptions} changeState={handleGameState} />}
      </Box >}
    </Box>

  );
}

export default App;
