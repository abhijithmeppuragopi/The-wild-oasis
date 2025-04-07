import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiLogin"

export default function useUSer(){
   const {data:user,isLoading}=useQuery({
    queryFn:getCurrentUser,
    queryKey:['user']
    })
    return {user,isLoading,isAuthenticated:user?.role==='authenticated'}
}