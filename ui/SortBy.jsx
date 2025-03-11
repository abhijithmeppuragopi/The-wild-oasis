import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({options}){
    const [searchParams,setSearchParams]=useSearchParams();
    const sortValue=searchParams.get('sortBy') || 'cabinAsc';
    function handleChange(e){
      searchParams.set('sortBy',e.target.value);
      setSearchParams(searchParams);
    }
    return <Select options={options} onChange={handleChange} value={sortValue} type='white'/>
}