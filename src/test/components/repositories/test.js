import axios from "axios";
import { getRepository } from "../../../api/api";

jest.mock("axios");

describe("Fetch repository", () => {
  it("Fetch repositoryfrom an Github API", async () => {
    const repository = {
      id: 10270250,
      full_name: "facebook/react",
      html_url: "https://github.com/facebook/react",
      description:
        "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      default_branch: "main",
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(repository));
    await expect(getRepository("facebook/react")).resolves.toEqual(repository);

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.github.com/repos/facebook/react"
    );
  });

  it("Fetches erroneously repository from an Github API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getRepository("facebook/react")).rejects.toThrow(errorMessage);
  });
});
