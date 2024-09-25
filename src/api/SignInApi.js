import { api, BASE_URL } from "./AxiosConfig"

const useSignIn = async (data) => {
    try {
        const response = await api.post(`${BASE_URL}/authentication/sign-in`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default useSignIn