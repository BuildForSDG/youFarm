import { ApiClient } from "./apiClient";

let apiClient = new ApiClient();

export class ArticleServices {

  static add(data) {
    return apiClient.post("article/add", data);
  }

  static update(data, articleId) {
    return apiClient.put(`article/update/${articleId}`, data);
  }

  static articles() {
    return apiClient.get("articles");
  }

  static article(articleId) {
    return apiClient.get(`article/${articleId}`);
  }

  static delete(articleId) {
    return apiClient.delete(`article/delete/${articleId}`);
  }
}