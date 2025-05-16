import React, { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { API, setAuthData } from "../../utils/config";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // loader uchun state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Password is required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!email) {
            setError('Email is required');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const res = await API.post("/signup", {
                name: username,
                email: email,
                key: password,
                secret: "my-secret"
            });

            const { key, secret } = res.data.data;
            setAuthData(key, secret);
            navigate("/");
            console.log("Tizimga muvaffaqiyatli kirdingiz");
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
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

            {/* Error message chiqarish */}
            {error && (
                <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    sx={{ mb: 2 }}
                >
                    {error}
                </Typography>
            )}

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
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error && !email}
                    helperText={!email && error === 'Email is required' ? error : ''}
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
                    helperText={!password && error === 'Password is required' ? error : ''}
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
                    disabled={loading}
                    sx={{ mt: 2, backgroundColor: '#6A00FF' }}
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        'Submit'
                    )}
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
