import { BasicResponse } from "@/service/server/message/BasicResponse";
import { Category } from "@/model/Category";

export interface AddCategoryRequest {
  label: string;
}

export interface UpdateCategoryRequest {
  id: string;
  label: string;
}

export interface GetCategoryResponse extends BasicResponse {
  category?: Category;
}
