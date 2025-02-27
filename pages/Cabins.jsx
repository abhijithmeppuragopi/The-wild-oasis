
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useForm } from 'react-hook-form';
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import { useState } from "react";


function Cabins() {
  const [isButtonClicked,setIsButtonClicked]=useState(false);
  

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
      </Row>
      {/* <Row type="horizontal"> */}
      <CabinTable/>
      {/* </Row> */}
      <Row type="horizontal">
      <Button variation="primary" size="medium" onClick={()=>setIsButtonClicked((show)=>!show)} >Add Form</Button>
      </Row>
      {isButtonClicked && <CreateCabinForm/>}
      
      </>
  );
}

export default Cabins;
