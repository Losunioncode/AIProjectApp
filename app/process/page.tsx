"use client"
import { useEffect, useState } from "react";
import Stack from "@/components/Process/Stack";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks"
import { setTitle, setDescription } from "@/lib/features/project-prop/projectSlice"
import Describe from "@/components/Process/Describe";
interface textArea {
   
    textarea: string

}

export default function Page(){

    
    const [moveToDescribeComponent, setMoveToDescibeComponent] = useState<boolean>(false)
    const [textRes, setTextRes] = useState<string>('')
    const [textArea, setTextArea] = useState<string>('')
    const projectTitle = useAppSelector(state => state.project.title)
    console.log(projectTitle)
    const dispatch = useAppDispatch()

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value1 = e.target.value as string
    //     setTextArea(value1)
    // }

    const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value as string
        dispatch(setTitle(title))
    }
     
    const handleProjectDescribeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const describe = e.target.value as string

        dispatch(setDescription(describe))
    }

    const ChangeMoveToDescibeComponent = () => {
        setMoveToDescibeComponent(true)
    }
    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        try {        
            const res = await fetch('http://localhost:3000/api/createReq', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: textArea
                })
            })

            const recievedData = await res.json()
            setTextRes(recievedData.responseText)
        } catch(err){
            
            console.log(err)
        }
  }

  useEffect(() => {
    console.log(textRes)

  }, [textRes])


  return (
       
        <section className="max-w-xl mx-auto  ">
            
            <div className="mt-[65px]">
                
                {!moveToDescribeComponent ?
                    <Stack handleProjectTitleChange= {handleProjectTitleChange} projectTitleValue={projectTitle} ChangeMoveToDescribeComponent= {ChangeMoveToDescibeComponent}/>
                    : <Describe handleProjectDescribeChange= {handleProjectDescribeChange} />
                    
                }
                
            </div>
            
            { textRes && (
                <div className="mt-[45px] ">
                    <h1 className="text-center ">
                        {textRes}
                    </h1>
                </div>
            )}
        </section>
  )
}

