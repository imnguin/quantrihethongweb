import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataUser: (state, action) => {
            state.value = action.payload
            console.log('state', state.value)
        },
        clearDataUser: (state) => {
            state.value = null;
        }
    }
})

export const { setDataUser, clearDataUser } = userSlice.actions
export default userSlice.reducer