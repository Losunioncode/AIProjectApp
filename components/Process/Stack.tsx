import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
// import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Input } from "../ui/input";
import { setTitle } from "@/lib/features/project-prop/projectSlice";

type StackProps = {
  handleProjectTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accountUserApiKey: string;
  SubmitProjectAPILemonSquezzy: () => void;
};

const Stack = ({
  handleProjectTitleChange,
  accountUserApiKey,
  SubmitProjectAPILemonSquezzy,
}: StackProps) => {
  return (
    <div className="flex items-center flex-col ">
      <div className="">
        <h1 className="text-[20px] text-blue-950 font-bold text-center ">
          Connect your LemonSquezze account!
        </h1>
        <p className="text-[18px] text-blue-950 mt-[6px] opacity-[.65] text-center ">
          Use your API Key from LemonSquezzy. You can find that{" "}
          <a
            className="text-blue-950 font-bold underline "
            href="https://app.lemonsqueezy.com/settings/api"
          >
            here
          </a>
        </p>
      </div>
      <div className="mt-[45px] w-full rounded-[3px]">
        <Input
          onChange={handleProjectTitleChange}
          className=""
          type="text"
          placeholder="Enter your API key"
          value={accountUserApiKey}
        />
      </div>

      <p className="text-[16px] text-blue-950 mt-[16px] italic opacity-[.60] text-center ">
        {`All of the data from your account will remain private and <br /> won't
        be shared to anyone.`}
      </p>

      <button
        onClick={SubmitProjectAPILemonSquezzy}
        className="bg-blue-950 mt-[45px] text-white rounded-[6px] px-[65px] py-[11px]"
      >
        Continue
      </button>
    </div>
  );
};

export default Stack;
