import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <Skeleton className="h-12 w-1/4 rounded-md my-2" />
      <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
      <Skeleton className="h-6 w-3/4 rounded-md mt-3" />
      <Skeleton className="h-6 w-2/4 rounded-md mt-3" />
    </>
  );
};
export default loading;
