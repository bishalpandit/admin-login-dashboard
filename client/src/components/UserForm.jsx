import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Alert, CircularProgress } from '@mui/material'
import { createUser } from '../redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';

const validateUsername = (username) => {

    if (username === "") {
        return "Enter Username"
    }
    for (let i = 0; i < username.length; i++) {

        let ch = username.charCodeAt(i)

        if (ch === 32) // Space
            return "No spaces allowed!"

        // Check for alphanumeric values
        if ((ch >= 48 && ch <= 57) || (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122)) {
            continue;
        }

        return "Only alphanumeric values"
    }

    return ""
}



const validateMobile = (mob) => {

    if (mob === "") {
        return "Enter Mobile"
    }

    if (mob.length !== 10)
        return "Only 10 digits"

    for (let i = 0; i < mob.length; i++) {

        let ch = mob.charCodeAt(i);

        if (ch >= 48 && ch <= 57) {
            continue;
        }
        else
            return "Enter digits only"
    }

    return ""
}

const validateEmail = (email) => {

    if (email === "") {
        return "Enter Email"
    }

    if (!email.includes("@")) {
        return "Invalid Email"
    }

    let idx;

    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            idx = i;
            break;
        }
    }

    const remStringAfterAt = email.substr(idx)

    if (!remStringAfterAt.includes("."))
        return "Invalid Email"

    return ""
}

const UserForm = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        username: "",
        mobile: "",
        email: "",
        address: "",
        usernameErr: "",
        mobileErr: "",
        emailErr: ""
    })

    const userCreate = useSelector(state => state.userCreate)

    const { success, error, loading } = userCreate


    const handleSubmit = (event) => {
        event.preventDefault();

        // setForm((prevForm) => {
        //     return {
        //         ...prevForm,
        //         usernameErr: validateUsername(prevForm.username),
        //         mobileErr: validateMobile(prevForm.mobile),
        //         emailErr: validateEmail(prevForm.email),
        //     }
        // })

        const data = new FormData(event.currentTarget);

        const userData = {
            username: data.get('username'),
            mobile: data.get('mobile'),
            email: data.get('email'),
            address: data.get('address')

        }
        if (form.usernameErr === "" && form.mobileErr === "" && form.emailErr === "") {
            dispatch(createUser(userData))
        }
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
                                    onChange={(e) => {
                                        setForm((prevForm) => { return { ...prevForm, username: e.target.value }; })
                                        setForm((prevForm) => { return { ...prevForm, usernameErr: validateUsername(prevForm.username) }; })
                                    }}
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
                                {
                                    form.usernameErr && (<Alert severity='warning'>{form.usernameErr}</Alert>)
                                }
                                <TextField
                                    onChange={(e) => {
                                        setForm((prevForm) => { return { ...prevForm, mobile: e.target.value } })
                                        setForm((prevForm) => { return { ...prevForm, mobileErr: validateMobile(prevForm.mobile) } })
                                    }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile Number"
                                    type="text"
                                    id="mobile"
                                    autoComplete="mobile-number"
                                />
                                {
                                    form.mobileErr && (<Alert severity='warning'>{form.mobileErr}</Alert>)
                                }
                                <TextField
                                    onChange={(e) => {
                                        setForm((prevForm) => { return { ...prevForm, email: e.target.value } })
                                        setForm((prevForm) => { return { ...prevForm, emailErr: validateEmail(prevForm.email) } })
                                    }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                />
                                {
                                    form.emailErr && (<Alert severity='warning'>{form.emailErr}</Alert>)
                                }
                                <TextField
                                    onChange={(e) => setForm((prevForm) => { return { ...prevForm, address: e.target.value } })}
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
