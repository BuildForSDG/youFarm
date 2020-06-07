import { ApiClient } from "./apiClient";

let apiClient = new ApiClient();

export class ProductServices {

  static add(data) {
    return apiClient.post("product/add", data);
  }

  static update(data, productId) {
    return apiClient.put(`product/update/${productId}`, data);
  }

  static products() {
    return apiClient.get("products");
  }

  static product(productId) {
    return apiClient.get(`product/${productId}`);
  }

  static myProducts() {
    return apiClient.get("products/supplier");
  }

  static delete(productId) {
    return apiClient.delete(`product/delete/${productId}`);
  }
}