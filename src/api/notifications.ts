import { FormDataResponse } from "@/types";
import apiClient from "./apiClient";
import { INotification } from "@/types/notification";

export const getNotifications = async (): Promise<
    FormDataResponse<INotification[]>
> => {
    const response = await apiClient.get("/notifications");
    return response.data;
};
