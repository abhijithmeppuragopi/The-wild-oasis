import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";

export default function useCabins(){
    const {isLoading,data:cabins}=useQuery({
        queryKey:['cabins'],
        queryFn:getAllCabins,
      })
      return {isLoading,cabins}
      
}