// import axiosInstance from "@/utils/axiosInstance";

// import { Order } from "@/types/order";
// import { PaginationData, PaginationQueryProps } from "@/types/pagination";

// export const fetchOrders = async ({
//   page,
//   perPage = 10,
// }: PaginationQueryProps) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   await new Promise((resolve, reject) => setTimeout(resolve, 500));
//   const { data } = await axiosInstance.get(
//     `/orders?_page=${page}&_per_page=${perPage}`
//   );
//   return data as PaginationData<Order>;
// };