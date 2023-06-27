import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Block from './Utils/PostsBlock'
import FilterTools from './Utils/FilterTools'
import { postMethods } from '../Utils/redux/slices/posts'
import { Grid } from '@mui/material'
import '../Styles/Posts.scss'
const Posts = function () {
    const [slice, setSlice] = useState(JSON.parse(sessionStorage.getItem('posts:count')) || 10)
    const { posts, users } = useSelector(state => state)
    return (
        <div id='posts'>
            <FilterTools
                state={postMethods}
                slice={slice}
                setSlice={setSlice}
                item={'posts'}
            />
            <div className='main'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    {
                        posts.data && users.data ? posts.data.slice(0, slice).map(item => (
                            <Grid item xs={6}>
                                <Block state={item} users={users.data} />
                            </Grid>
                        ))
                            : 'LOADING'

                    }
                </Grid>
            </div>
        </div>
    )
}
export default Posts