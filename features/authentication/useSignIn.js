import { useMutation, useQueryClient } from "@tanstack/react-query";
import signIn from "../../services/apiLogin";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";

export default function useSignIn(){
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const {mutate:signingIn,isLoading:isSigningIn}=useMutation({
        mutationFn:({email,password})=>signIn({email,password}),
        onSuccess:(data)=>{
            console.log(data)
            queryClient.setQueryData(['user'],data.data.user)
            toast.success("success");
            navigate('/dashboard',{replace:true})
        },
        onError:(error)=>{
            toast.error("Wrong email or password");
            console.log(error)
        }
    })
    return {signingIn,isSigningIn}
}