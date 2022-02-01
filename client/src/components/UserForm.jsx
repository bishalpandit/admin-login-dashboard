import React from 'react';
import { Button, TextField, Box, Typography, Container, Alert, CircularProgress } from '@mui/material'
import { createUser } from '../redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';

const UserForm = () => {
    const dispatch = useDispatch()

    const userCreate = useSelector(state => state.userCreate)

    const { success, error, loading } = userCreate


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            username: data.get('username'),
            mobile: data.get('mobile'),
            email: data.get('email'),
            address: data.get('address')

        }
        dispatch(createUser(userData))
    }

    return (

        loading ?
            (<CircularProgress />)
            :
            (

                <div>
                    {success && <Alert severity='success'>User Created!</Alert>}
                    {error && <Alert severity='error'>Invalid username</Alert>}
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h3" variant="h6">
                                Add User
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile Number"
                                    type="text"
                                    id="mobile"
                                    autoComplete="mobile-number"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    autoComplete="address"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </div>
            )

    );
};

export default UserForm;
