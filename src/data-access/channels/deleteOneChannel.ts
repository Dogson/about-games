import { AxiosError } from "axios";
import ApiConfig from "../../config/api.config";
import { api } from "../../helpers/axios/axios";
import { SpecificError, ApiErrorType } from "../../types/error/error.types";

const deleteOneChannel = async (id: number): Promise<void> => {
  try {
    return (await api.delete<void>(`${ApiConfig.routes.channels}/${id}`)).data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        throw new SpecificError(ApiErrorType.FORBIDDEN);
      }
    }
    throw new Error("An error occured");
  }
};

export default deleteOneChannel;
