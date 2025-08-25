const KEY = "openai_api_key";

export const keyStore = {
  get() {
    return localStorage.getItem(KEY);
  },
  set() {
    localStorage.setItem(KEY, k.trim());
  },
  clear() {
    localStorage.removeItem(KEY);
  }
};
