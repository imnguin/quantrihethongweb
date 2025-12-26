import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const loaddingSlice = createSlice({
    name: 'loadding',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.value += 1
        },
        hideLoading: (state) => {
            let val = 1
            if (state.value === 0)
                val = 0
            state.value -= val
        },
    },
})

export const { showLoading, hideLoading } = loaddingSlice.actions

export const selectLoadding = state => state.loadding.value;

export default loaddingSlice.reducer