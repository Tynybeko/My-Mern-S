import React from 'react'
import '../../Styles/ConfirmPage.scss'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
export default function ConfirmPage({ params, setState, state }) {
  const dispatch = useDispatch()
  return (
    <center >
      <div
        onClick={(event => {
          event.stopPropagation()
        })}
        className='confirmPage'
      >
        <h2>Подтвердите!</h2>
        <div>
          <Button
            onClick={() => {
              dispatch(setState(params))
              state[1](prev => !prev)
              if (typeof state[0] == 'function') {
                state[0](prev => !prev)
              }
            }}
            variant="contained"
            xs={{ background: "#FF5C00" }}
          >Подтвердить</Button>
          <Button onClick={() => {
            state[1](prev => !prev)
          }} variant="contained">Отмена</Button>
        </div>
      </div>
    </center>

  )
}
