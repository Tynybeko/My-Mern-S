import React from 'react'
import '../../Styles/Modal.scss'
import { Outlet } from 'react-router-dom'

export default function Modal({ block }) {
    return (
        <div id='Modal'>
            <center>
                <div className="body">
                    {block}
                </div>
            </center>
        </div>
    )
}
