import React, { useEffect } from 'react'
import { Button, TextField, Box, Typography, Container, Alert, LinearProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../redux/actions/admin'
import { useHistory, useLocation } from 'react-router-dom'

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    
    const admin = useSelector(state => state.admin)
    const { loading, error } = admin

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        dispatch(adminLogin(userData))
    }

    useEffect(() => {
        if(admin.adminInfo) {
            history.push('/')
        }
    }, [history, admin.adminInfo])

    return (
        <Container component="main" maxWidth="xs">
            {error && <Alert severity='error'>Invalid Email or Password</Alert>}
            {loading ? (
                <div className="h-[100vh] flex flex-col justify-center w-2/4 mx-auto " >
                    <LinearProgress color="primary" />
                </div>
            )
                : (
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>)}
        </Container>
    )
}


export default Login;
// admin123
// admin@namasys.co