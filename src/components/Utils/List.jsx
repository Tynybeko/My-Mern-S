import '../../Styles/List.scss'
import React, { useState } from 'react'
import { postMethods } from '../../Utils/redux/slices/posts';
import { useDispatch } from 'react-redux';
import { Checkbox, Modal } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import ConfirmPage from './ConfirmPage';
import { useForm } from 'react-hook-form'




export const List = function ({ state, users, setState }) {
  const dispatch = useDispatch()
  const { postChecked, deleteChecked, postFavorite, postSingle, deletePost } = postMethods
  const [confirm, setConfirm] = useState(false)
  const [editor, setEditor] = useState(JSON.parse(sessionStorage.getItem('post:edit')) || false)
  return (
    <center>
      <div onClick={(event => {
        event.stopPropagation()
      })} id='singlePage' >
        <div className="blocks">
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
            open={editor}
            onClick={(event) => {
              sessionStorage.setItem('post:edit', false)
              setEditor(prev => !prev)
            }}
          >
            <Edit
              state={state}
              users={users}
              setState={setEditor}
            />
          </Modal>
          <div className="tools">
            <button onClick={() => {
              dispatch(postSingle({ state: false, id: state.id }))
              setState(prev => !prev)
            }}>Назад</button>
            <button
              onClick={() => {
                setConfirm(!confirm)
              }}
            >Удалить</button>
            <button
              onClick={() => {
                sessionStorage.setItem('post:edit', true)
                setEditor(!editor)
              }}
            >Редактировать</button>
          </div>
        </div>
      </div>
    </center>
  )
}


export const Edit = function ({ state, users, setState }) {
  const dispatch = useDispatch()
  const { postChecked, updatePost, postFavorite, deletePost } = postMethods
  const [confirm, setConfirm] = useState(false)
  const [input, setInput] = useState('')
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      title: state.title,
      body: state.body,
    }
  })

  const onSubmit = (values) => {
    setConfirm(!confirm)
    setInput({ data: values, id: state.id })
    sessionStorage.setItem('post:edit', false)
  }



  return (
    <center>
      <div onClick={(event => {
        event.stopPropagation()
      })} id='singlePage' >
        <div className="blocks">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className='editor'>
              <svg class="feather feather-edit-3" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>   <input
                {...register('title', { required: 'Поле не должен быть пустым!' })} type="text" />
            </div>
            <div className="footer">
              <div className='editor'>
                <svg class="feather feather-edit-3" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>   <input
                  {...register('body', { required: 'Поле не должен быть пустым!' })} type="text" />
              </div>
            </div>
            <div className="tools">
              <button onClick={() => {
                setState(prev => !prev)
              }}>Назад</button>
              <button
                type='submit'
              >Сохранить</button>
            </div>
          </form>
          <Modal
            className='modal'
            open={confirm}
            onClick={(event) => {
              setConfirm(prev => !prev)
            }}
          >
            <ConfirmPage
              params={input}
              setState={updatePost}
              state={[setState, setConfirm]}
            />
          </Modal>

        </div>
      </div>
    </center>
  )
}
