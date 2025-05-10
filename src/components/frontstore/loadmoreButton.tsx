"use client"; // ✅ Mark this as a Client Component

import { Button } from "../ui/button";

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

// const LoadMoreButton = () => {
//   const [coef, setCoef] = useState(1);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const handleLoadMore = () => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     newParams.set("coef", (coef + 1).toString());
//     router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
//     setCoef((prev) => prev + 1); // ✅ Update state to trigger re-render
//   };
const LoadMoreButton = ({ onLoadMore, loading }: LoadMoreButtonProps) => {
  return (
    <>
      <Button
        className="self-center bg-storeSecondary hover:bg-white hover:text-storeSecondary border border-storeSecondary text-white"
        disabled={loading}
        onClick={onLoadMore}
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Loading...
          </>
        ) : (
          "Show More"
        )}
      </Button>
    </>
  );
};

export default LoadMoreButton;
