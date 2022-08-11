import React from 'react'
import { ApplicationState } from '../store';
import * as CreateCarStore from '../store/CreateCarStore';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { Button, Grid, TextField, Typography,Alert } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';

function CreateCar() {
    const dispatch = useDispatch()
   
  const state = useSelector((appstate:ApplicationState) => appstate.car)
  React.useEffect(()=>{
       dispatch(CreateCarStore.actionCreators.initBrandModelAction())
  },[])
  const handleTextCnage=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const filedName:string=event.target.name;
    const fieldVal: string = event.target.value;
    dispatch(CreateCarStore.actionCreators.valueFormAction(filedName,fieldVal))

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    dispatch(CreateCarStore.actionCreators.checkModelIdAction(event.target.value))
  };

  const handleFileInput = (e:any) => {
   dispatch(CreateCarStore.actionCreators.chaneImageAction(e))
   
  }
  
  const submitForm=()=>{
    console.log("aaa")
     dispatch(CreateCarStore.actionCreators.addCar());
  }
  return (
    <div>
          <Typography variant="h3" align="center" color={"#5daeff"}>Change password</Typography>
          <TextField
           autoFocus
          id="outlined-select-currency-native"
          select
          margin="dense"
          name="brandModel"
          label="Brand and Model car"
          variant="standard"
          onChange={handleChange}
          fullWidth
          SelectProps={{
            native: true,
          }}
         >
             <option aria-label="None" value="" />
             {state && state.brandModel && state.brandModel.map((option)=>(<optgroup label={option.name}>
            {option.modelCars.map((niz)=>(
                  <option key={niz.id} value={niz.id}>{niz.name}</option>
            ))}
          </optgroup>))}
        </TextField>
        <TextField
            autoFocus
            margin="dense"
            name="color"
            label="Color"
            type="text"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
         <TextField
            autoFocus
            margin="dense"
            name="numberDors"
            label="Number dors"
            type="number"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
         <TextField
            autoFocus
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
          <TextField
            autoFocus
            margin="dense"
            name="state"
            label="State"
            type="text"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
          <div>
          <label htmlFor="image_uploads">Choose images to upload (PNG, JPG):  </label>
         <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple onChange={handleFileInput}/>
         </div>
         
         <Button startIcon={<SendSharpIcon />} onClick={() => submitForm()} variant='contained' fullWidth>Submit</Button>

    </div>
  )
}

export default CreateCar