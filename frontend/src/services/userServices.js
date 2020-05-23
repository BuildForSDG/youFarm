import { ApiClient } from "./apiClient";

let apiClient = new ApiClient();

export class UserServices {
  constructor() {
    this.isUser = false;
  }
  static login(data) {
    return apiClient.post("login", data);
  }

  static register(data) {
    return apiClient.post("register", data);
  }

  static logout() {
    localStorage.removeItem("access-token");
    this.isUser = false;
  }

  static isUser() {
    return this.isUser;
  }
}
