import { api, BASE_URL } from "./AxiosConfig"

const useSignOut = async () => {
    try {
        const response = await api.post(`${BASE_URL}/authentication/sign-out`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default useSignOut