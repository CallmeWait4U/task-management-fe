import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={'/'} replace={true} />
    }

    return children
}
export default PrivateRoute