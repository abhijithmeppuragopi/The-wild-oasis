import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin(){
const queryClient=useQueryClient();

const {mutate:updateCabin,isLoading:isCreatingCabin}=useMutation({
  mutationFn:(newCabinData)=>addAndEditCabin(newCabinData),
  onSuccess: ()=>{
    toast.success('New Cabin Successfully Added');
    queryClient.invalidateQueries({
      queryKey:['cabins'],
    });
  },
  onError:()=>{
    toast.error("something went wrong while adding new cabin")
  }
})

return {updateCabin,isCreatingCabin}
}