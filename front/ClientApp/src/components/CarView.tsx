import React from 'react'
import {Car} from '../store/Interfaces/HomeInterfaces'
import { ApplicationState } from '../store';
import * as CreateCarStore from '../store/CreateCarStore';
import {CarForm} from '../store/CreateCarStore';
import { useDispatch, useSelector } from 'react-redux';
import ImageViewer from './ImageViewer'
import './styles/home.css'
import {Alert, TextField, Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Model } from '../store/Interfaces/BrandModel';
interface Props{
  car : Car,
  pom?:boolean
}
function CarView(props:Props) {
  const [btn1,setBtn1]=React.useState(false)
  const [btn2,setBtn2]=React.useState(false)
  const dispatch = useDispatch()
  const state = useSelector((appstate:ApplicationState) => appstate.car)
  
  const handleBtn1=()=>{
    setBtn1(true)
  }
  const modelId=(value:Car)=>{
    
    let models:Array<any> = state!.brandModel.map((brand)=>{
      return brand.modelCars
    })
    let model:Model[] = [].concat.apply([],models).filter((el:any)=>{
      if(el.name == value.modelCar)
        return true;
    })
    const id=model[0].id.toString()
    return (id);

  }
  const handleBtn2=(value:Car)=>{
   
    const carForm:CarForm={
    color:value.color,
    numberDors:value.numberDors,
    description:value.description,
    price:value.price,
    state:value.state
    }
    
   dispatch(CreateCarStore.actionCreators.CheckCarByIdAction(modelId(value),carForm))
  
    setBtn2(true)
  }
  const UpdateAction=(id:number)=>{
      dispatch(CreateCarStore.actionCreators.updateCarAcation(id))
      window. location. reload(); 
  }
  const handleClose=()=>{
    setBtn1(false)
    setBtn2(false)
  }
  const DeleteAction=(id:number)=>{
    dispatch(CreateCarStore.actionCreators.deleteCarByIdACtion(id))
     setBtn1(false)
     window. location. reload(); 
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       dispatch(CreateCarStore.actionCreators.checkModelIdAction(event.target.value))
      
  };
  const handleTextCnage=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const filedName:string=event.target.name;
    const fieldVal: string = event.target.value;
    dispatch(CreateCarStore.actionCreators.valueFormAction(filedName,fieldVal))

  };
  
  React.useEffect(()=>{
      
      dispatch(CreateCarStore.actionCreators.initBrandModelAction());
  },[])

  return (
    <div className='carView'>
      <ImageViewer imageUrls={props.car.urlImage}></ImageViewer>
      <div>
        <h6>{props.car.brandCar + " " + props.car.modelCar}</h6>
        <p>Godiste:{props.car.numberDors}</p>
        <p>Cijena:{props.car.price + "KM"}</p>   
        <p>Boja:{props.car.color}</p>
        <p>Stanje:{props.car.state}</p>
        <p>Dodatni opis:{props.car.description}</p>      
        <div>
          <h6>{"Contact by:" + props.car.nameUser}</h6>
          <p>{"Email:" + props.car.emailUser}</p>
          <p>{" Number:" + props.car.numberUser}</p> 
          </div>
          {  props.pom &&
             ( <div> 
                 <div>
                      <Button variant="contained" style={{marginRight:'40px', background:'red'}} onClick={handleBtn1}>DELETE</Button>
                      <Button variant="contained" onClick={()=>handleBtn2(props.car)}>UPDATE</Button>
                 </div>
                 <div>
                      <Dialog open={btn1}>
                           <DialogTitle>Delete</DialogTitle>
                            <DialogContent>
                             <DialogContentText>
                             Are you sure you want to delete the car?
                             </DialogContentText>
                             </DialogContent>
                             <DialogActions>
                             <Button onClick={handleClose}>Cancel</Button>
                             <Button onClick={()=>DeleteAction(props.car.id)}>Confirm</Button>
                             </DialogActions>
                     </Dialog>
                  </div>
                  <div>
                            <Dialog open={btn2}>
                            <DialogTitle>Update</DialogTitle>
                           <DialogContent>
                           <DialogContentText>
                           Please enter the correct data to modify your car
                            </DialogContentText>
                                  <TextField
                                   autoFocus
                                   id="outlined-select-currency-native"
                                   select
                                   margin="dense"
                                   name="brandModel"
                                   label="Brand and Model car"
                                   variant="standard"
                                   onChange={handleChange}
                                   defaultValue={state!.checkModelId}
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
                                    name="description"
                                    label="Description"
                                     type="text"
                                     fullWidth
                                     defaultValue={props.car.description}
                                     onChange={handleTextCnage}
                                     variant="standard"
                                     />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="color"
                                        label="Color"
                                        type="text"
                                        fullWidth
                                        defaultValue={props.car.color}
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
                                         defaultValue={props.car.price}
                                         onChange={handleTextCnage}
                                         variant="standard"
                                    />
                                    <TextField
                                         autoFocus
                                         margin="dense"
                                         name="numberDors"
                                         label="Years old"
                                         type="number"
                                         fullWidth
                                         defaultValue={props.car.numberDors}
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
                                         defaultValue={props.car.state}
                                         onChange={handleTextCnage}
                                         variant="standard"
                                    />
          
                            </DialogContent>
                           <DialogActions>
                             <Button onClick={handleClose}>Cancel</Button>
                             <Button onClick={()=>UpdateAction(props.car.id)}>Confirm</Button>
                            </DialogActions>
                         </Dialog>
                  </div>
                 

             </div>)
          }
       
      </div>   
    </div>
  )
}

export default CarView