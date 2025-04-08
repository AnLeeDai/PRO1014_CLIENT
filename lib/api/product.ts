import axiosInstance from "../axiosInstance";

interface Product {
  id: number;
  product_name: string;
  price: string;
  thumbnail: string;
  short_description: string;
  full_description: string;
  extra_info: string;
  in_stock: number;
  created_at: string;
  updated_at: string;
  brand: string;
  is_active: number;
  category_name: null | string;
  gallery: string[];
}

interface Filters {
  sort_by: string;
  search: string;
  category_id: null | number;
}

interface Pagination {
  current_page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}

export interface GetAllProductResponse {
  success: boolean;
  message: string;
  filters: Filters;
  pagination: Pagination;
  data: Product[];
}

export const getAllProduct = async (
  category_id?: number,
): Promise<GetAllProductResponse> => {
  const res = await axiosInstance.get<GetAllProductResponse>(
    "?request=get-products",
    {
      params: {
        ...(category_id && { category_id }),
      },
    },
  );

  return res.data;
};
