import React from 'react'
import '../../Styles/PostBlock.scss'
import { postMethods } from '../../Utils/redux/slices/posts';
import { useDispatch } from 'react-redux';
import { Checkbox, } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
const Block = function ({ state, users, show, setShow }) {
  const { postChecked, deleteChecked, postFavorite } = postMethods
  const dispatch = useDispatch()
  if (show) {
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
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
    </div>
  )
}
export default Block