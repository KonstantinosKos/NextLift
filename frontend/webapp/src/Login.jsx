import React, {useEffect, useMemo, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useSnackbar} from "notistack";
import Password from "./Password.jsx";
import Box from "@mui/material/Box";
import CuTextField from "./CuTextField.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setPassword, setUser, setUsername} from "./appStore/slices/userSlice.js";
import {useAddNewUserMutation, useLoginUserMutation} from "./appStore/service/userService.js";
import {jwtDecode} from "jwt-decode";

const SlideTransition = React.forwardRef(function SlideTransition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function Login() {

    const [addNewUser, {data, error, isLoading}] = useAddNewUserMutation();
    const [loginUser, {dataLog, errorLog, isLoadingLog}] = useLoginUserMutation();
    const [open, setOpen] = useState(true);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const {enqueueSnackbar} = useSnackbar();
    const [confirmPassword, setConfirmPassword] = useState('');
    const toggleDialogType = () => {
        dispatch(setUser());
        setConfirmPassword('');
        setIsLogin(!isLogin);
    };

    const username = useSelector((state) => state.userCredentials.username);
    const password = useSelector((state) => state.userCredentials.password);

    const dispatch = useDispatch();

    const handleConfirmPassword = (e) => {
        const {value} = e.target;
        setConfirmPassword(value);
    }

    // Handle username change
    const handleUsernameChange = (e) => {
        dispatch(setUsername(e.target.value));
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    };

    const passwordConfirmed = useMemo(() => {
        return confirmPassword === password;
    }, [password, confirmPassword]);

    const handleLogin = async (e) => {
        console.log(isLogin);
        if (isLogin) {
            try {
                const token = await loginUser({ username, password });
                if (token) {
                    console.log("Token received: ",token.data);
                    const decodedToken = jwtDecode(token.data.jwt);
                    console.log(decodedToken);
                    localStorage.setItem("authToken", JSON.stringify(decodedToken));  // Store the token
                    const tak =  JSON.parse(localStorage.getItem("authToken"));
                    console.log(tak);
                } else {
                    console.error("Login failed: No token received");
                }
            } catch (err) {
                console.error("Login failed:", err.error || err.message);  // Log the specific error message
            }
        } else {
            console.log(password);
            console.log(username);
            await addNewUser({
                    username: username,
                    password: password,
                }
            )
        }

    };


    return (<Dialog
            slots={{transition: SlideTransition}}
            open={open}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '20px',
                },
            }}
        >
            <DialogTitle>{isLogin ? 'Login to Your Account' : 'Create a New Account'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {isLogin ? 'Enter your credentials to access your account.' : 'Fill in the details below to create a new account.'}
                </DialogContentText>
                {isLogin && (<Box sx={{
                    display: 'flex', flexDirection: 'column',
                }}>
                    <CuTextField
                        autoFocus={true}
                        label="Username"
                        type="text"
                        name="username"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                    <Password
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Box>)}
                {!isLogin && (<Box sx={{
                    display: 'flex', flexDirection: 'column',
                }}>
                    <CuTextField
                        required
                        label="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Password
                        required
                        error={!passwordConfirmed}
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Password
                        required
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                    />
                </Box>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialogType}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </Button>
                <Button onClick={handleLogin} color="primary">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default Login;