type PageLink = string | null;

export interface Paginate<T> {
  data: T[];
  total: number;
  current_page: number;
  first_page_url: PageLink;
  from: number;
  last_page: number;
  last_page_url: PageLink;
  links: Link[];
  next_page_url: PageLink;
  path: string;
  per_page: number;
  prev_page_url: PageLink;
  to: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}
