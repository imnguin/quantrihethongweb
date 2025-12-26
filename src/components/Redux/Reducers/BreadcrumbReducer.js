import { createSlice } from '@reduxjs/toolkit'

const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState: [],
    reducers: {
        setBreadcrumb: (state, action) => {
            return action.payload
        }
    },
})

export const { setBreadcrumb } = breadcrumbSlice.actions

export const selectBreadcrumb = state => state.breadcrumb.value;

export default breadcrumbSlice.reducer;