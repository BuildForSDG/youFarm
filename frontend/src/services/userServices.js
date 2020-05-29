import { ApiClient } from "./apiClient";
var jwtDecode = require('jwt-decode')
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

  static allUsers() {
    return apiClient.get("users");
  }

  static deleteUser(userId) {
    return apiClient.delete("user/delete/" + userId);
  }

  static update(data) {
    return apiClient.put("user/update/profile", data);
  }

  static userDetails(userId) {
    return apiClient.get("user/" + userId);
  }

  static userLoggedIn() {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  static isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  static setToken(UToken) {
    localStorage.setItem('access-token', UToken)
  }

  static setUserId(userId) {
    localStorage.setItem('userId', userId)
  }

  static getUserId() {
    return localStorage.getItem('userId')
  }

  static getToken() {
    return localStorage.getItem('access-token')
  }

  static logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('userId');
  }
}
