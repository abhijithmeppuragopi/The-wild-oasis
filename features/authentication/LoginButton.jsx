import { FaUser } from "react-icons/fa";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function LoginButton(){
    const navigate=useNavigate();
    return <Button onClick={()=>navigate('/login')}>
        <FaUser/>
    </Button>
}