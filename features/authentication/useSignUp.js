import { useMutation } from "@tanstack/react-query";
import { SignUpApi } from "../../services/apiLogin";
import toast from "react-hot-toast";

export default function useSignUp(){
   
    const {mutate:SignUp,isLoading:SigningUpLoading}=useMutation({
        mutationFn:({fullName,email,password})=>SignUpApi({fullName,email,password}),
        onSuccess:(user)=>{
            toast.success("Succesfully created new account,Please verify the email on your email account");
            console.log(user,'userrr');
        }
    })
    return {SignUp,SigningUpLoading}
}