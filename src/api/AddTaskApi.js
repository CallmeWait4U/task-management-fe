import { api, BASE_URL } from "./AxiosConfig"

const useAddTask = async (data) => {
    try {
        const response = await api.post(`${BASE_URL}/task/create`, data);
        return response.data;
    } catch (error) {
        throw error
    }
}

export default useAddTask