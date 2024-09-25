import { api, BASE_URL } from "./AxiosConfig"

const useDeleteTask = async (data) => {
    try {
        const response = await api.post(`${BASE_URL}/task/delete`, data);
        return response.data;
    } catch (error) {
        throw error
    }
}

export default useDeleteTask