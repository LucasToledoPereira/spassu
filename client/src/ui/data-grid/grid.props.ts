export interface UIDataGridProps {
  children: React.ReactNode;
  template: UIDataGridTemplate | string;
}

export interface UIColumnProps {
  children: React.ReactNode;
  name: string;
  label?: string;
  className?: string;
}

export interface UIRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  header?: boolean;
}

export interface UIDataGridTemplate {
  sm: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface UIPaginationProps {
  next?: (nextPage: number) => void;
  previous?: (previousPage: number) => void;
  page?: (selectedPage: number) => void;
  pageSize?: number;
  totalRecords?: number;
  currentPage?: number;
  totalPages?: number;
}
