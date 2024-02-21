import { Select,SelectContent, SelectTrigger, SelectItem, SelectValue} from "../ui/select"
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks"
import { Input } from "../ui/input"
import { setTitle } from "@/lib/features/project-prop/projectSlice"

type StackProps = {
    handleProjectTitleChange: (e: React.ChangeEvent<HTMLInputElement> ) => void
    projectTitleValue: string,
    ChangeMoveToDescribeComponent: () => void
}


const Stack = ({ handleProjectTitleChange, projectTitleValue, ChangeMoveToDescribeComponent}: StackProps) => {

    
    return (
        
        <div className="flex items-center flex-col ">
            <div className="">
                <h1 className="text-[20px] text-blue-950 font-bold text-center ">Write a name for your Project Planner</h1>
            </div>
            <div className="mt-[45px] w-full ">
    
                <Input onChange={handleProjectTitleChange} type= "text" placeholder="Enter name for the project" value={projectTitleValue}/>
            </div>
            <button onClick= {ChangeMoveToDescribeComponent} className="bg-blue-950 mt-[45px] text-white rounded-[6px] px-[65px] py-[11px]">
                    Continue
            </button>
        </div>
  )
}

export default Stack