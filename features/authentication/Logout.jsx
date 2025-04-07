import { IoLogOutOutline } from "react-icons/io5";
import ButtonIcon from "../../ui/ButtonIcon";
import useSignOut from "./useSignOut";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout(){
    const {signingOut,isLoading}=useSignOut();
    return <ButtonIcon disabled={isLoading} onClick={signingOut}>
       {isLoading ? <SpinnerMini/> : <IoLogOutOutline/>}
    </ButtonIcon>
}