import { ApiClient } from "./apiClient";
var jwtDecode = require('jwt-decode')
let apiClient = new ApiClient();

export class AdminServices {
  static login(data) {
    return apiClient.post("admin/login", data);
  }

  static addAdmin(data) {
    return apiClient.post("admin/add", data);
  }

  static update(data) {
    return apiClient.put("admin/update/profile", data);
  }

  static adminDetails(adminId) {
    return apiClient.get("admin/" + adminId);
  }

  static allAdmins() {
    return apiClient.get("admins");
  }

  static deleteAdmin(adminId) {
    return apiClient.delete("admin/delete/" + adminId);
  }

  static adminLoggedIn() {
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

  static setToken(AToken) {
    localStorage.setItem('access-token', AToken)
  }

  static setAdminId(adminId) {
    localStorage.setItem('adminId', adminId)
  }

  static getToken() {
    return localStorage.getItem('access-token')
  }

  static logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('adminId');
  }
}