import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addAndEditCabin } from "../../services/apiCabins";

export default function useUpdateCabin(){
const queryClient=useQueryClient();
const {mutate:editCabin,isLoading:isEditingCabin}=useMutation({
    mutationFn:({newCabinData,id})=>addAndEditCabin(newCabinData,id),
    onSuccess: ()=>{
      toast.success('Cabin Successfully updated');
      queryClient.invalidateQueries({
        queryKey:['cabins'],
      });
    },
    onError:()=>{
      toast.error("something went wrong while updating the cabin")
    }
  })
  return {editCabin,isEditingCabin}

}