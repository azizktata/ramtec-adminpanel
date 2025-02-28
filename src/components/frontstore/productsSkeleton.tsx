export default function ProductsSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:items-stretch gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded-lg h-[280px] w-[280px] flex-grow"
        ></div>
      ))}
    </div>
  );
}
