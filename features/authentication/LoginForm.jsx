import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import useSignIn from "./useSignIn";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("abhi123@gmail.com");
  const [password, setPassword] = useState("abhi123");
  const {signingIn,isSigningIn}=useSignIn();


  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password ) return
    signingIn({email,password},{
      onSettled:()=>{
        setEmail(""),
        setPassword("")
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isSigningIn}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isSigningIn}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isSigningIn ? <SpinnerMini/> :"Log in"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
