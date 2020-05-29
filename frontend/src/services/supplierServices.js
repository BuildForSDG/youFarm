import { ApiClient } from "./apiClient";

let apiClient = new ApiClient();

export class SupplierServices {

  static apply(data) {
    return apiClient.post("supplier/apply", data);
  }

  static allSuppliers() {
    return apiClient.get("suppliers");
  }

  static deleteSupplier(supplierId) {
    return apiClient.delete("supplier/delete/" + supplierId);
  }
}