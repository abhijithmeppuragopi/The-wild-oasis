import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"
import { deleteBooking } from "../../services/apiBookings";

export default function useDeleteBooking(){
    const queryClient=useQueryClient();
    const {mutate:isdeleteBooking,isLoading:isDeletingBooking}=useMutation({
        mutationFn:(id)=>deleteBooking(id),
        onSuccess:()=>{
            toast.success("Succesfully deleted the booking");
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
        },
        onError:()=>{
            toast.error("Something went wrong while deleting the booking")
        }
    })
    return {isdeleteBooking,isDeletingBooking}
}