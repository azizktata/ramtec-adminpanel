"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CategoryWithSubCategories } from "@/types/category-with-products";
import { MarqueWithProducts } from "@/types/marques";
import {
  ChevronDown,
  CircleDollarSign,
  LucideIcon,
  RefreshCcw,
  Star,
  Tag,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

type PriceRange = { from: number; to: number };

const ProductFilterDesktop = ({
  categories,
  marques,
  maxPriceData,
}: {
  categories: CategoryWithSubCategories[];
  marques: MarqueWithProducts[];
  maxPriceData: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  function resetFilters() {
    router.push(pathname, { scroll: false });
  }
  return (
    <div className="w-full max-w-xs divide-y-2  overflow-y-auto">
      <PriceRangeFilter maxPriceData={maxPriceData} />
      <CategoryFilter categories={categories} />
      <MarqueFilter marques={marques} />
      <Button
        onClick={resetFilters}
        className="text-light dark:text-darkmode-light mt-8"
        variant={"outline"}
      >
        <RefreshCcw />
      </Button>
    </div>
  );
};

const MIN_PRICE = 0;

function PriceRangeFilter({ maxPriceData }: { maxPriceData: number }) {
  const [value, setValue] = useState<PriceRange>({
    from: MIN_PRICE,
    to: maxPriceData,
  });

  const handleChange = (newValue: PriceRange) => {
    setValue(newValue);
    handleSliderChange([newValue.from, newValue.to]);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  function handleSliderChange(value: number[]) {
    const params = new URLSearchParams(searchParams.toString());

    if (value[0] !== MIN_PRICE) {
      params.set("minPrice", value[0].toString());
    } else {
      params.delete("minPrice");
    }
    if (value[1] !== maxPriceData) {
      params.set("maxPrice", value[1].toString());
    } else {
      params.delete("maxPrice");
    }
    router.replace(`${pathname}?${params.toString()}`); // }
  }

  return (
    <CollapsibleFilter title="Price Range" icon={CircleDollarSign}>
      <div className="flex justify-between space-x-4">
        <Input
          type="number"
          value={value.from}
          onChange={(e) => {
            handleChange({ from: +e.target.value, to: value.to });
            handleSliderChange([+e.target.value, value.to]);
          }}
          // onBlur={handleBlur}
          className="w-20"
        />
        <Input
          type="number"
          value={value.to}
          onChange={(e) => {
            handleChange({ from: value.from, to: +e.target.value });
            handleSliderChange([value.from, +e.target.value]);
          }}
          // onBlur={handleBlur}
          className="w-20"
        />
      </div>
      <Slider
        min={MIN_PRICE}
        max={maxPriceData}
        step={100}
        value={[value.from, value.to]}
        onValueChange={([from, to]) => handleChange({ from, to })}
        className="w-full mt-4 mb-3"
      />
    </CollapsibleFilter>
  );
}
function MarqueFilter({ marques }: { marques: MarqueWithProducts[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedMarques = searchParams.getAll("m");
  const [loading, setLoading] = useState(false);
  const handleMarqueClick = (handle: string) => {
    setLoading(true);
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedMarques.includes(handle)) {
      newParams.delete("m");
    } else {
      newParams.append("m", handle);
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    setLoading(false);
  };
  return (
    <CollapsibleFilter title="Marque" icon={Star}>
      {marques.map((marque) => (
        <div key={marque.id} className="mb-2 flex items-center space-x-3 pl-4">
          <Checkbox
            onClick={() => handleMarqueClick(marque.name)}
            defaultChecked={selectedMarques.includes(marque.name)}
            id={marque.id}
            disabled={loading}
          />
          <Label htmlFor={marque.id}>
            {marque.name}{" "}
            <span className="text-muted-foreground font-light text-xs">
              ({marque.products?.length}+)
            </span>{" "}
          </Label>
        </div>
      ))}
    </CollapsibleFilter>
  );
}

function CategoryFilter({
  categories,
}: {
  categories: CategoryWithSubCategories[];
}) {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("c");
  const router = useRouter();
  const pathname = usePathname();
  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedCategories.includes(handle)) {
      newParams.delete("c", handle); // Remove only the specific category
    } else {
      newParams.append("c", handle);
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };
  return (
    <CollapsibleFilter title="Category" icon={Tag} defaultOpen={false}>
      {categories
        .filter((cat) => !cat.parentId)
        .map((parent) => (
          <CollapsibleFilter
            key={parent.id}
            title={parent.name}
            defaultOpen={false}
          >
            <div className="flex  flex-col">
              <div className="mb-4 flex items-center space-x-3 ">
                <Checkbox
                  onClick={() => {
                    handleCategoryClick(parent.slug);
                  }}
                  defaultChecked={selectedCategories.includes(parent.slug)}
                  id={parent.id}
                />
                <Label htmlFor={parent.id}>{parent.name}</Label>
              </div>
              {parent.subcategories.map((sub) => (
                <div key={sub.id} className="flex flex-col">
                  <div
                    key={sub.id}
                    className="mb-2 flex items-center space-x-3 pl-4"
                  >
                    <Checkbox
                      onClick={() => {
                        handleCategoryClick(sub.slug);
                      }}
                      defaultChecked={selectedCategories.includes(sub.id)}
                      id={sub.id}
                    />
                    <Label htmlFor={sub.id}>{sub.name}</Label>
                  </div>
                  {sub.subcategories.map((subsub) => (
                    <div
                      key={subsub.id}
                      className="mb-2 flex items-center space-x-3 text-gray-700 pl-8"
                    >
                      <Checkbox
                        onClick={() => {
                          handleCategoryClick(subsub.slug);
                        }}
                        defaultChecked={selectedCategories.includes(subsub.id)}
                        id={subsub.id}
                      />
                      <Label htmlFor={subsub.id}>
                        {subsub.name}{" "}
                        <span className="text-muted-foreground font-light text-xs">
                          ({subsub.products?.length}+)
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CollapsibleFilter>
        ))}
    </CollapsibleFilter>
  );
}

const CollapsibleFilter = ({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  children: ReactNode;
}) => (
  <Collapsible defaultOpen={defaultOpen}>
    <CollapsibleTrigger className="group flex w-full items-center justify-between py-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        {!!Icon && <Icon className="h-5 w-5 text-storeAccent " />} {title}
      </h3>
      <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180 transition-transform text-muted-foreground" />
    </CollapsibleTrigger>
    <CollapsibleContent className="pt-1 pb-3">{children}</CollapsibleContent>
  </Collapsible>
);

export default ProductFilterDesktop;
