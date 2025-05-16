import React, { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,

    InputAdornment,
    IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { API, setAuthData } from "../../utils/config";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Password is required');
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');

            // Register logic


            API.post("/signup", {
                name: username,
                email: "nur@gmail.com",
                key: password,
                secret: "my-secret"
            }).then((res) => {
                const { key, secret } = res.data.data;
                setAuthData(key, secret);
                navigate("/")
                console.log("Tizimga muvaffaqiyatli kirdingiz");
            });

            console.log({ username, password });
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                p: 4,
                mt: 10,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Sign up
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error && !password}
                    helperText={!password && error ? error : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Confirm password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!error && password !== confirmPassword}
                    helperText={
                        password && confirmPassword && password !== confirmPassword
                            ? 'Passwords do not match'
                            : ''
                    }
                />

                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 2, backgroundColor: '#6A00FF' }}
                >
                    Submit
                </Button>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already signed up?{' '}
                <Link to="/login" underline="hover">
                    Go to sign in.
                </Link>
            </Typography>
        </Container>
    );
};

export default Register;
