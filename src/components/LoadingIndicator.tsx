import { cn } from "@/lib/utils";

const LoadingIndicator = ({className}:{className?: string}) => {
    return (
      <div className="flex items-center justify-center ">
        <div className={cn("w-4 h-4 border-2 border-black border-dashed rounded-full animate-spin",className)}></div>
      </div>
    );
  };
  
  export default LoadingIndicator;
  