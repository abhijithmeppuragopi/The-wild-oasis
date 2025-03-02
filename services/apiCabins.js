import supabase, { supabaseUrl } from "./supabase";



export async function getAllCabins(){
    let { data, error } = await supabase
.from('cabins')
.select('*')
    
if (error) {
    console.log(error)
    throw new Error("Something happened while loading cabins")
}
return data;
}
export async function deleteCabin(id){
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    
if (error) {
    console.log(error)
    throw new Error("Something happened while loading cabins")
}
}

export async function addAndEditCabin(cabin,id){
    console.log(cabin,id)
    const hasImage=cabin.image?.startsWith?.(supabaseUrl);
    console.log(hasImage,'has image');
    const imageName=`${Math.random()}-${cabin.image.name}`.replaceAll("/","");
    const imageUrl = hasImage ? cabin.image :`${supabaseUrl}/storage/v1/object/public/Cabin-images/${imageName}`;
    let query= supabase .from('cabins');

    if(!id) query=  query.insert([{...cabin,image:imageUrl}])
    

    if(id) query=  query.update({...cabin,image:imageUrl}).eq('id', id)



const {data,error}=await query.select()
.single()

if(error){
    throw new Error("something happened while adding new cabin",error); 
}

if(hasImage) return data;
const { error:storageError } = await supabase
  .storage
  .from('Cabin-images')
  .upload(imageName, cabin.image, {
  })


   if(storageError){
     await supabase
     .from('cabins')
     .delete()
     .eq('id', data.id)

   }

return data;
}




