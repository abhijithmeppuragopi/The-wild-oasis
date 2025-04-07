import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUSer as updateUSerApi } from "../../services/apiLogin"
import toast from "react-hot-toast"

export default function useUpdateUser(){
    const queryClient=useQueryClient();
    const{mutate:updateUser,isLoading:isUpdating}=useMutation({
        mutationFn:updateUSerApi,
        onSuccess:({user})=>{
            toast.success("Succesfully updated the user details");
            queryClient.setQueryData(['user'],user)
            
        },
        onError:()=>{
            toast.error("Something went wrong")
        }
    })
    return {updateUser,isUpdating}
}