import { cn } from "@/lib/utils";

export const NotificationCount = ({
  count,
  className,
}: {
  count: number;
  className?: string;
}) => {
  const showCount = count >= 10 ? "9+" : `${count}`;

  return (
    <span
      className={cn(
        "flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-black font-inter text-[10px] font-semibold text-white",
        className
      )}
    >
      {showCount}
    </span>
  );
};
