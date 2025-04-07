import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register,formState,getValues,handleSubmit,reset}=useForm();
  const {errors}=formState;
  const {SignUp,SigningUpLoading}=useSignUp();
  function onSubmit({fullName,email,password}){
   SignUp({fullName,email,password},
    {onSettled:()=>reset()})
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={SigningUpLoading} {...register('fullName',{required:true})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={SigningUpLoading} {...register('email',{required:true,
          pattern:{value:/\S+@\S+\.\S+/,
            message:'Wrong gmail format'
          }})} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled={SigningUpLoading}  {...register('password',{required:true,minLength:{value:8,message:'password required min 8 character long'}})} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={SigningUpLoading}  {...register('passwordConfirm',
          {required:true,
          validate:(value)=>value===getValues().password || 'Password should be the same'})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={SigningUpLoading}>
          Cancel
        </Button>
        <Button disabled={SigningUpLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
