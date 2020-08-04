import { SWRVCache, useSWRV } from "swrv";
import axios, { AxiosRequestConfig } from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
export default http;

class SessionStorageCache extends SWRVCache {
  STORAGE_KEY = "swrv";

  private encode(storage: any) {
    return btoa(JSON.stringify(storage));
  }
  private decode(storage: any) {
    return JSON.parse(atob(storage));
  }

  get(k: any, ttl: any) {
    const item = sessionStorage.getItem(this.STORAGE_KEY);
    if (item) {
      return JSON.parse(atob(item))[k];
    }
  }

  set(k: any, v: any) {
    let payload: any = {};
    const storage = sessionStorage.getItem(this.STORAGE_KEY);
    if (storage) {
      payload = this.decode(storage);
      payload[k] = { data: v, ttl: Date.now() };
    } else {
      payload = { [k]: { data: v, ttl: Date.now() } };
    }

    sessionStorage.setItem(this.STORAGE_KEY, this.encode(payload));
  }
}

const cache = new SessionStorageCache();

export { AxiosRequestConfig, cache };
