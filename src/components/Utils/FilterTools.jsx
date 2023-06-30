import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import {
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    DialogActions,
    FormControlLabel,
    Checkbox,
    Modal
} from '@mui/material'
import '../../Styles/FilterTools.scss'
import ConfirmPage from './ConfirmPage'


export default function FilterTools({ state, slice, setSlice, item, data, disable }) {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState(JSON.parse(sessionStorage.getItem(`${item}:filter:`)) ?? { state: 'id', substate: 'down', checked: false })
    const [open, setOpen] = React.useState(false);
    const users = useSelector(state => state.users)
    const [confirm, setConfirm] = useState(false)
    const [disabled, setDisabled] = useState(data.some(item => item.checked))
    const [[call], setCall] = useState([])


    const handleChange = (event) => {
        setFilters({ substate: filters.substate, state: event.target.value, checked: filters.checked });
        sessionStorage.setItem(`${item}:filter:`, JSON.stringify({ substate: filters.substate, state: event.target.value, checked: filters.checked }))
        dispatch(state[`${filters.state}Filter`]({ state: filters.substate, data: users.data, check: filters.checked }))
    };
    useEffect(() => {
        setDisabled(data.some(item => item.checked))
    }, [data])
    const handleChangeFilter = (event) => {
        setFilters({ state: filters.state, substate: event.target.value, checked: filters.checked });
        sessionStorage.setItem(`${item}:filter:`, JSON.stringify({ state: filters.state, substate: event.target.value, checked: filters.checked }))
        dispatch(state[`${filters.state}Filter`]({ state: filters.substate, data: users.data, check: filters.checked }))
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleConfirm = (event) => {
        if (event.target.classList.contains('favorite')) {
            setCall([state[`${item}FavoriteChecker`]])
            setConfirm(!confirm)
        } else {
            setCall([state[`${item}DeleteChecked`]])
            setConfirm(!confirm)
        }
    }


    const handleCheckBox = (event) => {
        sessionStorage.setItem(`${item}:filter:`, JSON.stringify({ ...filters, checked: event.target.checked }))
        setFilters({ ...filters, checked: event.target.checked })
        if (event.target.checked) {
            return dispatch(state.favoriteFilter())
        }
        dispatch(state[`${filters.state}Filter`]({ state: filters.substate, data: users.data, checked: filters.checked }))
    }
    const handleClose = (event, reason) => {
        setOpen(false);
    };
    return (
        <div id="filters">
            <Modal
                className='modal'
                open={confirm}
                onClick={(event) => {
                    setConfirm(prev => !prev)
                }}
            >
                <ConfirmPage
                    setState={call}
                    state={[confirm, setConfirm]}
                />
            </Modal>
            <div className='inner'>
                <div className="left">
                    <Button color="primary" onClick={handleClickOpen}>Фильтер</Button>
                    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle color="primary" >Фильтер</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        native
                                        value={filters.state}
                                        onChange={handleChange}
                                    >
                                        <option value={'id'}>По ID</option>
                                        <option value={'title'}>По названию</option>
                                        <option value={'username'}>По пользователю</option>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={filters.substate}
                                        onChange={handleChangeFilter}
                                    >
                                        <MenuItem value={'down'}>По возрастанию</MenuItem>
                                        <MenuItem value={'up'}>По убыванию</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                    <FormControlLabel color='primary' control={<Checkbox onChange={handleCheckBox} defaultChecked={filters.checked} />} label="Избранные" />
                </div>
                <div className="midle">
                    <Button
                        className='delete'
                        disabled={!disabled}
                        onClick={handleConfirm}
                        size='small'
                        variant="contained"
                    >Удалить</Button>
                    <Button
                        className='favorite'
                        onClick={handleConfirm}
                        disabled={!disabled}
                        size='small'
                        variant="contained"
                    >В избранное</Button>
                </div>

                <FormControl sx={{ m: 1, minWidth: 120, p: 0 }} fontSize='12px' size="small">

                    <Select
                        value={slice}
                        color='primary'
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
