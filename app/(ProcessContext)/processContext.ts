// import { AppContext } from "next/app";
// import { PrefetchAction } from "next/dist/client/components/router-reducer/router-reducer-types";
// import { createContext, useContext, useReducer, Dispatch } from "react";

// export type ActionMap<M extends { [index: string]: any } > = {

//     [Key in keyof M] : M[Key] extends undefined ? {        
//         type: Key
//     }
//     : {
//         type: Key,
//         value: M[Key]
//     }
// }

// export enum Types {
//     SET_STACK = "SET_STACK",
//     SET_PROJECT = "SET_PROJECT"
// }



// type StackType = {      
//         stack: string,
//         project: string
// }


// type ProcessStateType = {

//     processStack?: StackType

// }

// type StatePayload = {
//     [Types.SET_STACK] : {
//         stack: string 
//     }
    
//     [Types.SET_PROJECT] : {
        
//         project: string
//     }

// }


// const InitialState: ProcessStateType = {
//     processStack: {
//         stack: '',
//         project: ''
//     }
// }

// type ProductActions = ActionMap<StatePayload>[keyof ActionMap<StatePayload>]




// const processReducer = (state = InitialState.processStack, action: ProductActions) => {
    
//     switch(action.type){
//         case Types.SET_STACK:
//             return {...state, stack: action.value}
//         case Types.SET_PROJECT:
//             return {...state, project: action.value}    
//         default: 
            
//             console.log(`This action type ${action} isn't supported.`)
//     }    
// }



// const AppContext = createContext<{
//     state: ProcessStateType;
//     dispatch: Dispatch<ProductActions>
// }>({
//         state: InitialState,
//         dispatch : () => null

// })


// const mainReducer = ( state: ProcessStateType = InitialState, action: ProductActions ) : ProcessStateType => {
//     const { processStack } = state
//     if(!processStack){
//         return state
//     }
//     return {
//         ...state,
//         processStack: processReducer(state, action)
//     }

// }


// const AppProvider: React.FC = ({ children }) => {
//     const [state, dispatch] = useReducer(mainReducer, InitialState)

//     return (
//         <AppContext.Provider >

//         </AppContext>
//     )
// }
 



