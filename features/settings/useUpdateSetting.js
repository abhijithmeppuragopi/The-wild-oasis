import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting(){
const queryClient=useQueryClient();
const {mutate:updateSetting,isLoading:isUpdatingSetting}=useMutation({
    mutationFn:(newSetting)=>updateSettingApi(newSetting),
    onSuccess: ()=>{
      toast.success('Setting Successfully updated');
      queryClient.invalidateQueries({
        queryKey:['settings'],
      });
    },
    onError:()=>{
      toast.error("something went wrong while updating the cabin")
    }
  })
  return {updateSetting,isUpdatingSetting}

}