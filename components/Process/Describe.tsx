import { Textarea } from "@/components/ui/textarea"


type DescribeProps = {
    handleProjectDescribeChange: (e: React.ChangeEvent<HTMLTextAreaElement> ) => void 
}

const Describe = ( { handleProjectDescribeChange } : DescribeProps )  => {
  return (
    <div className="flex items-center flex-col ">
        <div className="">
            <h1 className="text-[20px] text-blue-950 font-bold text-center ">Describe your Project</h1>
            <p className="text-[18px] text-blue-950 opacity-[.65] text-center">Write the process of implementing your project</p>
        </div>
        <div className="mt-[45px] w-full ">

            <Textarea onChange={handleProjectDescribeChange} placeholder="Enter name for the project" />
        </div>
        <button className="bg-blue-950 mt-[45px] text-white rounded-[6px] px-[65px] py-[11px]">
                Continue
        </button>
    </div>
  )
}

export default Describe