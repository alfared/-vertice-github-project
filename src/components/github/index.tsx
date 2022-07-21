import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Repositories from "../repositories";
import { getRepository } from "../../api/api";
import { Repository } from "../../types/repository";
import { URL_API } from "../../constants/api";

const Github = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepos = localStorage.getItem("@GithubExplorer:repositories");

    if (storageRepos) {
      return JSON.parse(storageRepos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      "@GithubExplorer:repositories",
      JSON.stringify(repositories)
    );
  }, [repositories]);

  const getRepositoryByName = async (
    repositoryName: string
  ): Promise<boolean> => {
    axios.get(
      URL_API +
        getRepository(repositoryName).then((response) => {
          console.log(response.data);
          setRepositories([...repositories, response.data]);
          setInputError("");
          setNewRepo("");
        })
    );

    return true;
  };

  const handleRepository = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Enter organization/repository name");
      return;
    }

    try {
      const repository = newRepo.replace(/\s/g, "");
      getRepositoryByName(repository);
    } catch (err) {
      setInputError("Error searching for this repository");
      setNewRepo("");
    }
  };

  return (
    <>
      <form className="github-container__form" onSubmit={handleRepository}>
        <input
          value={newRepo}
          placeholder="Enter organization/repository"
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {inputError && (
        <div className="github-container__error">
          <span>{inputError}</span>
        </div>
      )}
      <div className="github-container__core">
        {repositories && <Repositories repos={repositories} />}
      </div>
    </>
  );
};

export default Github;
