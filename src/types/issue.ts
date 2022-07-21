export interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
  body: string;
}

export interface IssuesArray {
  issues: Array<Issue>;
  repository_url: string;
}
