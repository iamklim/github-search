import { apiUrl, resultsPerPage } from "../config";
import requestWithCache from "./requestWithCache";
import axios from "axios";

// fetching data using axios with cancel token and cache wrapper

const getRepositories = ({
  query,
  page = 1,
  sort = "stars",
  order = "desc",
  languages,
  cancelTokenSource,
}) => {
  console.log(page);
  try {
    let languageFilter = "";
    if (languages) {
      languages.forEach((language) => {
        if (language.isEnabled) {
          languageFilter += `+language:${language.key}`;
        }
      });
    }

    const requestBody = `${apiUrl}/search/repositories`;
    const requestQuery = `q=${query}${languageFilter}`;
    const requestSort = `sort=${sort}`;
    const requestOrder = `order=${order}`;
    const requestPage = `page=${page}`;
    const requestPerPage = `per_page=${resultsPerPage}`;

    const url = `${requestBody}?${requestQuery}&${requestSort}&${requestOrder}&${requestPage}&${requestPerPage}`;

    // caching requests using wrapper
    return requestWithCache.get(url, {
      cancelToken: cancelTokenSource.token,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      // the error due to cancel of request is thrown
    } else {
      console.log(err);
    }
  }
};

export default getRepositories;
