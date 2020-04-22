import axios from "axios";
import wrapper from "axios-cache-plugin";
import { apiUrl } from "../config";

// Caching requests here to prevent unnecessary API calls
const requestWithCache = wrapper(axios, {
  maxCacheSize: 50,
});

// Adding filter by Regexps, only the GET request whose url hit the filter reg will be cached.
const filter = new RegExp(`${apiUrl}/search/repositories`);
console.log(filter);
requestWithCache.__addFilter(filter);

export default requestWithCache;
