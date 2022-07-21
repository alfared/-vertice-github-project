export interface Repository {
  id: number;
  full_name: string;
  description: string;
  default_branch: string;
  open_issues_count: number;
}

export interface RepositoryArray {
  repos: Array<Repository>;
}
