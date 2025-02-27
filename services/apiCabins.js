import supabase from "./supabase"

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

export async function addCabin(cabin){
    
const {data, error } = await supabase
.from('cabins')
.insert([cabin])
.select()

if(error){
    throw new Error("something happened while adding new cabin",error); 
}

return data;
}




