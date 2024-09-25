import { api, BASE_URL } from "./AxiosConfig"

const useUpdateTask = async (data) => {
    try {
        const response = await api.post(`${BASE_URL}/task/update`, data);
        return response.data;
    } catch (error) {
        throw error
    }
}

export default useUpdateTask