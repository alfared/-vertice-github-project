import React, { useState } from "react";
import { getIssues } from "../../api/api";
import { Issue } from "../../types/issue";
import { Repository, RepositoryArray } from "../../types/repository";
import axios from "axios";
import { URL_API } from "../../constants/api";
import Issues from "../issues";

const Repositories = (params: RepositoryArray) => {
  const { repos } = params;
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repositoryName, setRepositoryName] = useState("");

  const getRepositoryIssues = async (
    repositoryName: string
  ): Promise<boolean> => {
    axios.get(
      URL_API +
        getIssues(repositoryName).then((response) => {
          setIssues(response.data);
        })
    );

    return true;
  };

  const handleIssue = (
    event: React.MouseEvent<HTMLElement>,
    repositoryName: string
  ) => {
    try {
      event.preventDefault();
      setRepositoryName(repositoryName);
      getRepositoryIssues(repositoryName);
    } catch (err) {
      setIssues([]);
    }
  };

  return (
    <>
      <div className="github-container__core--repositories">
        <div className="github-container__core--repositories__header">
          <h1>Repositories</h1>
        </div>

        {repos?.map((repository: Repository) => (
          <div
            key={repository.id}
            className="github-container__core--repositories__repository"
          >
            <div className="github-container__core--repositories__repository--left">
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
              <p>
                Default branch: <span>{repository.default_branch}</span>
              </p>
            </div>
            <div className="github-container__core--repositories__repository--right">
              {repository.open_issues_count > 0 && (
                <a onClick={(e) => handleIssue(e, repository.full_name)}>
                  Show issues
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {issues && <Issues issues={issues} repository_url={repositoryName} />}
    </>
  );
};

export default Repositories;
