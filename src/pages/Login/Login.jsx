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
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Password is required');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const res = await API.post("/signup", {
                name: username,
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
                Sign In
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
                <Link to="/register" underline="hover">
                    Go to sign up.
                </Link>
            </Typography>
        </Container>
    );
};

export default Register;
