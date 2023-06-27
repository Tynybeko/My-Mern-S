import React from 'react'
import { useDispatch } from 'react-redux'
import {
    fetchPosts,
    postMethods
} from '../../Utils/redux/slices/posts'
import {
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    InputLabel,
    OutlinedInput,
    DialogActions
} from '@mui/material'
import '../../Styles/FilterTools.scss'
export default function FilterTools({ state, slice, setSlice, item }) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };
    // const handleClick = (event) => {
    //     if (event.target.name == 'name') {

    //     } else {
    //         dispatch(state.filter())
    //     }
    // }

    return (
        <div id="filters">
            <div className='inner'>
                <Button onClick={handleClickOpen}>Фильтер</Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle >Фильтер</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    native
                                    value={age}
                                    onChange={handleChange}
                                >
                                    <option value={'title'}>По названию</option>
                                    <option value={'id'}>По ID</option>
                                    <option value={'userName'}>По пользователю</option>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={age}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'down'}>По возрастанию</MenuItem>
                                    <MenuItem value={'up'}>По убыванию</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
                <FormControl sx={{ m: 1, minWidth: 120, p: 0 }} fontSize='12px' size="small">

                    <Select
                        value={slice}
                        onChange={(event) => {
                            setSlice(+event.target.value)
                            sessionStorage.setItem(`${item}:count`, JSON.stringify(+event.target.value))
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={-1}>Все</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}
