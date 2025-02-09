import axiosInstance from "@/utils/axiosInstance";

import { Category } from "@/types/category";
// import { PaginationData, PaginationQueryProps } from "@/types/pagination";

export const fetchAllCategories = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { data } = await axiosInstance.get("/categories");
    return data as Category[];
  };