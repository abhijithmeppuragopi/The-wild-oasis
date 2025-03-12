import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable(){
const {isLoading,cabins}=useCabins();
const[searchParams]=useSearchParams();
const filterValue=searchParams.get('discount') || 'all';
const sortValue=searchParams.get('sortBy') || 'cabinAsc';
console.log(sortValue);
if(isLoading) return <Spinner/>
let filteredCabin;
if(filterValue==='all') filteredCabin=cabins;
if(filterValue==='with-discount') filteredCabin=cabins.filter((cabin)=>cabin.discount>0);
if(filterValue==='no-discount') filteredCabin=cabins.filter((cabin)=>cabin.discount===0);  
console.log(filteredCabin,'filter')

 let sortedCabin;
 const[field,direction]=sortValue.split('-');
 console.log(field,direction);
 const modifier= direction === 'Asc' ? 1:-1;
//  if(field ==='name'){
// sortedCabin=filteredCabin.sort((a,b)=> a.name.localeCompare(b.name));
//  } else {
 sortedCabin=filteredCabin.sort((a, b) => (a[field]-b[field])*modifier );

// const sorted=sortedCabin.sort((a, b) => (a[field]-b[field])*modifier );
console.log(sortedCabin,'sorted');
 

  return <>
  <Row type='horizontal' >
  <Menus>  
  <Table columns='.8fr 2.4fr 2.6fr 1fr 1fr 1fr'>
    <Table.Header>
      <div></div>
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>
      <div></div>
    </Table.Header>
    {/* // using render prop method // */}
    <Table.Body data={sortedCabin} render={(cabin)=> <CabinRow cabin={cabin} key={cabin.id}/>}/>
  </Table>
  </Menus>
  </Row>
  </>
}