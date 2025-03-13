import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: ''
};

export const userSlice = createSlice({
    name: 'userCredentials',
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setUser: (state, action) => {
            state.username = '';
            state.password = '';
        },
        user: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        }
    }
})

export const {setPassword, setUsername, setUser} = userSlice.actions;

export default userSlice.reducer;