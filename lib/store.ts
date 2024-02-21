import { configureStore } from '@reduxjs/toolkit'
import projectReduce from '@/lib/features/project-prop/projectSlice'
export const makeStore = () => {
    return configureStore({ 
        reducer: {
            project: projectReduce
        }
    })

}





export type AppStore = ReturnType<typeof makeStore >
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']