import { api, BASE_URL } from "./AxiosConfig"

const useSignUp = async (data) => {
    try {
        const response = await api.post(`${BASE_URL}/authentication/sign-up`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default useSignUp