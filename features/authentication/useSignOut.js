import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignOut } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function useSignOut(){
const navigate=useNavigate();
const queryClient=useQueryClient();
const {mutate:signingOut,isLoading}=useMutation({
    mutationFn:SignOut,
    onSuccess:()=>{
        navigate('/login',{replace:true}),
        queryClient.removeQueries(),
        toast.success('Succesfully Loged Out')
    },
    onError:()=>{
        toast.error('Something went wrong while loging out')
    }
})
return {signingOut,isLoading}
}