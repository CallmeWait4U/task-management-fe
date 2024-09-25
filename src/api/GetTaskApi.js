import { useQuery } from "@tanstack/react-query"
import { api } from "./AxiosConfig"

const useGetTask = (id) => {
    const fetchData = async () => {
        try {
            const response = await api.get(`/task/detail?id=${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    }
    return useQuery({
        queryKey: ['DetailTask', id],
        queryFn: () => fetchData(),
        staleTime: 3 * 1000,
        refetchOnWindowFocus: false,
        retry: 2
    })
}

export default useGetTask