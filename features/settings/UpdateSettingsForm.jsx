import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const{isLoading,settings:{minBookingLength,maxBookingLength,maxGuestPerBooking,breakfastPrice}={}}=useSettings();
  const {updateSetting,isUpdatingSetting}=useUpdateSetting();
  function handleUpdate(e,field){
    const {value}=e.target;
    console.log(value,field)
  if(!value) return;

    updateSetting({[field]:value})

  }
 
  if(isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdatingSetting} defaultValue={minBookingLength} onBlur={(e)=>handleUpdate(e,'minBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdatingSetting} defaultValue={maxBookingLength} onBlur={(e)=>handleUpdate(e,'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdatingSetting} defaultValue={maxGuestPerBooking} onBlur={(e)=>handleUpdate(e,'maxGuestPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdatingSetting} defaultValue={breakfastPrice} onBlur={(e)=>handleUpdate(e,'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
