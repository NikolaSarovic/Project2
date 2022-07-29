import React from 'react'
import {Car} from '../store/Interfaces/HomeInterfaces'
import './styles/home.css'
interface Props{
  car : Car
}
function CarView(props:Props) {
  return (
    <div className='carView'>
      <img src={props.car.urlImage[0]} alt="Nema"></img>
      <div>
        <h6>{props.car.brandCar + " " + props.car.modelCar}</h6>
        <p>{props.car.description}</p>
        <p>{props.car.price + "KM"}</p>
        <div>
          <h6>{"By:" + props.car.nameUser}</h6>
          <p>{"Contact:" + props.car.emailUser + props.car.numberUser}</p>
        </div>
      </div>   
    </div>
  )
}

export default CarView