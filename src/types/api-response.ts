export type APIResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export type Pagination = {
  current_page: number;
  limit: number;
  total_items: number;
  total_pages: number;
};

export type Filters = {
  search: string;
  sort_by: string;
};

export type APIListResponse<T> = {
  success: boolean;
  message: string;
  filters: Filters;
  pagination: Pagination;
  data: T[];
};
