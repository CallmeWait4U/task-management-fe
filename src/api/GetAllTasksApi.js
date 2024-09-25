import { useQuery } from "@tanstack/react-query"
import { api } from "./AxiosConfig"

const useGetAllTasks = (searchWord, filter, order, pageNumber) => {
    const fetchData = async () => { 
        if (searchWord !== '') {
            try {
                const response = await api.get(`/task/all?search=${searchWord}&status=${filter}&chosenDate=${order}&pageNumber=${pageNumber}`)
                return response.data
            } catch (error) {
                throw error
            }
        } else {
            try {
                const response = await api.get(`/task/all?status=${filter}&chosenDate=${order}&pageNumber=${pageNumber}`)
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
    return useQuery({
      queryKey: ['ListTasks', searchWord, filter, order, pageNumber],
      queryFn: () => fetchData(),
      staleTime: 3 * 1000,
      refetchOnWindowFocus: false,
      retry: 2
    })
}

export default useGetAllTasks