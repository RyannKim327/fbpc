export interface command {
  title: string;
  description?: string;
  command: string;
  maintenance?: boolean;
  unprefix?: boolean;
}
