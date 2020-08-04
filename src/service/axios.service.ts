import { SWRVCache, useSWRV } from "swrv";
import axios, { AxiosRequestConfig } from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

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
    const storage = localStorage.getItem(this.STORAGE_KEY);
    if (storage) {
      payload = this.decode(storage);
      payload[k] = { data: v, ttl: Date.now() };
    } else {
      payload = { [k]: { data: v, ttl: Date.now() } };
    }

    localStorage.setItem(this.STORAGE_KEY, this.encode(payload));
  }
}

const cache = new SessionStorageCache();

const get = async (url: string, config?: AxiosRequestConfig) => {
  const { data, error } = useSWRV(
    [url, config?.params],
    () =>
      http
        .get(`${process.env.VUE_APP_API_URL}/${url}`, config)
        .then((res) => res.data)
        .catch((err) => err),
    { cache: cache }
  );
};
