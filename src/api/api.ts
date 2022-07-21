import axios from "axios";
import { URL_API } from "../constants/api";
import { Issue } from "../types/issue";
import { Repository } from "../types/repository";

export const getRepository = async (repository: string) => {
  const url = URL_API + `repos/${repository}`;

  return await axios.get<Repository>(url);
};

export const getIssues = async (repository: string) => {
  const url = URL_API + `repos/${repository}/issues?per_page=10`;

  return await axios.get<Issue[]>(url);
};

// For tests
export const getIssue = async (repository: string, issueId: number) => {
  const url = URL_API + `repos/${repository}/issues/${issueId}`;

  return await axios.get<Issue>(url);
};
