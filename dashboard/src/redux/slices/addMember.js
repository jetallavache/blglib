import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAddMember = createAsyncThunk(
    'addMember/fetchAddMember',
    async (params) => {
        const { data } = await axios.post('/', params);
        return data;
    }
);

const initialState = {
    data: null,
    status: 'loading',
};

const addMemberSlice = createSlice({
    name: 'addMember',
    initialState,
    extraReducers: {
        [fetchAddMember.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAddMember.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAddMember.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});

export const selectIsAddMember = (state) => Boolean(state.addMember.data);

export const addMemberReducer = addMemberSlice.reducer;
