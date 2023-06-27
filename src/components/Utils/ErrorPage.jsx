import { useRouteError } from 'react-router-dom'
import '../../Styles/ErrorPage.scss'
export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)
    return (
        <div className='errorPage'>
            <h1>ErrorPage</h1>
            <b><h3>{error.status} {error.statusText}</h3></b>
        </div>
    )
}
