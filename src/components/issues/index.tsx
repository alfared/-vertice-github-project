import React from "react";
import { Issue, IssuesArray } from "../../types/issue";

const Issues = (params: IssuesArray) => {
  const { issues, repository_url } = params;
  const issueDescLength = 200;

  const formatIssueBody = (issueBody: string) => {
    const noSpecialCharacters = issueBody.replace(/[^\w ]/g, "");
    return noSpecialCharacters.substring(0, issueDescLength);
  };

  return (
    <>
      <div className="github-container__core--issues">
        <div className="github-container__core--issues__header">
          <h1>{repository_url}</h1>
        </div>
        {issues?.map((issue: Issue) => (
          <>
            <div
              key={issue.id}
              className="github-container__core--issues__issue"
            >
              <div className="github-container__core--issues__issue--title">
                <strong>{issue.title}</strong>
              </div>

              <div className="github-container__core--issues__issue--desc">
                <p>{formatIssueBody(issue.body)}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Issues;
