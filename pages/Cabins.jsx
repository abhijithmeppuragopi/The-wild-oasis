
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import Select from "../ui/Select";
import SortBy from "../ui/SortBy";


function Cabins() {


  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p><Filter filterField='discount' options={[
        {label:'All',value:'all'},
        {label:'With Discount', value:'with-discount'},
        {label:'No Discount', value:'no-discount'}]}/></p>
      <SortBy options={[
        {label:'Sort by Cabin Name (A-Z)',value:'name-Asc'},
        {label:'Sort by Cabin Name (Z-A)',value:'name-Dsc'},
        {label:'Price (Low-High)',value:'regularPrice-Asc'},
        {label:'Price (High-Low)',value:'regularPrice-Dsc'},
        {label:'Maximum Night(Low-High)',value:'maxCapacity-Asc'},
        {label:'Maximum Night (High-Low)',value:'maxCapacity-Dsc'}
      ]}>
        </SortBy>
      </Row>
      <Row>
      <CabinTable/>
      <AddCabin/>
      </Row>
      </>
  );
}

export default Cabins;
