import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="mt-3 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[100px] rounded-xl" />
        <Skeleton className="h-[100px] rounded-xl" />
        <Skeleton className="h-[100px] rounded-xl" />
        <Skeleton className="h-[100px] rounded-xl" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[350px] rounded-xl" />
        <Skeleton className="col-span-3 h-[350px] rounded-xl" />
      </div>
    </main>
  );
};

export default Loading;
