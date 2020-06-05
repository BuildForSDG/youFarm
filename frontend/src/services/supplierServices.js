import { ApiClient } from "./apiClient";

let apiClient = new ApiClient();

export class SupplierServices {

  static apply(data) {
    return apiClient.post("supplier/apply", data);
  }

  static allSuppliers() {
    return apiClient.get("suppliers");
  }

  static approve(supplierId) {
    return apiClient.get(`supplier/approve/${supplierId}`);
  }

  static reject(supplierId) {
    return apiClient.get(`supplier/reject/${supplierId}`);
  }

  static disable(supplierId) {
    return apiClient.get(`supplier/disable/${supplierId}`);
  }

  static deleteSupplier(supplierId) {
    return apiClient.delete("supplier/delete/" + supplierId);
  }
}