import { createSlice } from "@reduxjs/toolkit"


interface ProjectSlice {
    title: string,
    description: string

}

const initialState : ProjectSlice = {
    title: '',
    description: ''
}


const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers : {
        setTitle: (state, action) => {
            state.title = action.payload
        
        },
        setDescription: (state, action) => {
            state.description = action.payload
        }
    }
})


export const { setTitle, setDescription } = ProjectSlice.actions
export default ProjectSlice.reducer