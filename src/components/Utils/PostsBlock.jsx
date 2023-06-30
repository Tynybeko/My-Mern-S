import React, { useEffect, useState } from 'react'
import '../../Styles/PostBlock.scss'
import { postMethods } from '../../Utils/redux/slices/posts';
import { useDispatch } from 'react-redux';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder, Tune } from '@mui/icons-material';
import ConfirmPage from './ConfirmPage';
import { Modal } from '@mui/material'
import { List } from './List';

const Block = function ({ state, users }) {
  const dispatch = useDispatch()
  const { postChecked, updatePost, postFavorite, deletePost, postSingle } = postMethods
  const [confirm, setConfirm] = useState(false)
  const [singlePage, setSinglePage] = useState(state.single)
  useEffect(() => {
    state = state
  }, [state])

  return (
    <div className='blocks'>
      <div className="title">
        <p><svg class="feather feather-user" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>{users.find(elem => elem.id == state.userId).name}</p>
        <div>
          <Checkbox
            sx={{
              '&.Mui-checked': {
                color: "#FF5C00"
              }
            }}
            checked={state.checked}
            onClick={(event) => {
              console.log(event.target.checked);
              dispatch(postChecked({ id: state.id, status: event.target.checked }))
            }}
          >
          </Checkbox>
          <Checkbox
            sx={{
              '&.Mui-checked': {
                color: "red"
              }
            }}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={state.favorite}
            onClick={(event) => {
              dispatch(postFavorite({ id: state.id, status: event.target.checked }))
            }}
          />
        </div>
      </div>
      <h2>{state.title.split('').map((elem, index) => !index ? elem = elem.toUpperCase() : elem = elem).join('')} {state.id}</h2>
      <div className="footer">
        <p>{state.body}</p>
      </div>
      <Modal
        className='modal'
        open={confirm}
        onClick={(event) => {
          setConfirm(prev => !prev)
        }}
      >
        <ConfirmPage
          params={state.id}
          setState={deletePost}
          state={[confirm, setConfirm]}
        />
      </Modal>
      <Modal
        className='modal'
        open={singlePage}
        onClick={(event) => {
          dispatch(postSingle({ state: true, id: state.id }))
          setSinglePage(prev => !prev)
        }}
      >
        <List
          state={state}
          users={users}
          setState={setSinglePage} />
      </Modal>
      <div className="tools">
        <button onClick={() => {
          dispatch(postSingle({ state: true, id: state.id }))
          setSinglePage(true)
        }
        }>Подробнее...</button>
        <button
          onClick={() => {
            setConfirm(!confirm)
          }}
        >Удалить</button>
      </div>
    </div >
  )
}
export default Block