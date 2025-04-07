import supabase, { supabaseUrl } from "./supabase";

export default async function signIn({email,password}){
let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if(error){
    throw new Error("Wrong email or password");
  }
  return {data,error}
}

export async function getCurrentUser(){
    const {data:session}=await supabase.auth.getSession();
    if(!session.session) return null;
    
const { data,error } = await supabase.auth.getUser()
console.log(data,'data')

if(error){
    throw new Error("Something went wrong");
  }
  return data?.user
}

export async function SignOut() {
  const {error}=await supabase.auth.signOut();
  if(error){
    throw new Error("Something went wrong");
  }
  
}

export async function SignUpApi({fullName,email,password}){
  const {data,error}= await supabase.auth.signUp({
    email,
    password,
    options:{
      data:{
        fullName,
        avatar:'',
      }
    }
  })
  if(error){
    throw new Error("Something went wrong while creating new account",error);
  }
  return data
}

export async function updateUSer({fullName,password,avatar}) {
 
  let userData;
  if(fullName) userData={data:{fullName}};
  if(password) userData={password};
  const {data,error}=await supabase.auth.updateUser(
   userData
  )
  if(error) throw new Error(error.message)

    if(!avatar) return data;

    let avatarName=`avatar-${data.user.id}-${Math.random()}`;
    const {error:storageError}= await supabase.storage
    .from('Avatar')
    .upload(avatarName,avatar)
    if(storageError) throw new Error(storageError.message)

 let filePath=`${supabaseUrl}/storage/v1/object/public/Avatar/${avatarName}`;
  const {data:updatedUserData,error:uploadError}=await supabase.auth.updateUser({
data:{avatar:filePath}})

if(uploadError) throw new Error(uploadError.message)
return updatedUserData
}