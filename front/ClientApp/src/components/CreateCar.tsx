import React from 'react'
import { ApplicationState } from '../store';
import * as CreateCarStore from '../store/CreateCarStore';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography,Alert } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import './styles/create.css';

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
    if(state!.checkModelId!.length==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("brandModel",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("brandModel",false))
    if(state!.checkCarForm!.color!.length==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("color",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("color",false))
    if(state!.checkCarForm!.description!.length==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("description",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("description",false))
    if(state!.checkCarForm!.numberDors==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("year",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("year",false))
    if(state!.checkCarForm!.price==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("number",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("number",false))
    if(state!.checkCarForm!.state!.length==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("state",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("state",false)) 
    if(state!.imageFile.length==0)
    dispatch(CreateCarStore.actionCreators.errorChangeAction("image",true))
    else
    dispatch(CreateCarStore.actionCreators.errorChangeAction("image",false))
  
    dispatch(CreateCarStore.actionCreators.addCar());
  
   
  }
  return (
    <div className='createCss'>
          <Typography variant="h3" align="center" color={"#5daeff"}>Create new car</Typography>
          <div style={{display:state!.response!.success!? "block":"none", marginBottom:"10px"}}>
  

                <Alert severity="success">You have successfully create car!</Alert>
            </div>
            <div style={{display:state!.response!.faild!? "block":"none",marginBottom:"10px"}}>
                <Alert severity="error">The action failed</Alert>
            </div>
          <TextField
           autoFocus
          id="outlined-select-currency-native"
          select
          margin="dense"
          name="brandModel"
          error={state!.error!.brandModel}
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
            error={state!.error!.color}
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
            error={state!.error!.year}
            label="Year"
            type="number"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            error={state!.error!.description}
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
            error={state!.error!.number}
            type="number"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
          <TextField
            autoFocus
            margin="dense"
            name="state"
            error={state!.error!.state}
            label="State"
            type="text"
            fullWidth
            onChange={handleTextCnage}
            variant="standard"
         />
          <div>
          <label htmlFor="image_uploads" style={{color:state!.error!.image? "red":"black",marginTop:"5px"}}>Choose images to upload (PNG, JPG):  </label>
         <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple onChange={handleFileInput}/>
         </div>
         
         <Button startIcon={<SendSharpIcon />} onClick={() => submitForm()} variant='contained' fullWidth>Submit</Button>

    </div>
  )
}

export default CreateCar