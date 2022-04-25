import React from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../../action';
import CreateOrNo from './FilterOrder/CreateOrNo/CreateOrNo';
import Order from './FilterOrder/Order/Order';
import Temperament from './FilterOrder/Temperament/Temperament';
import HomeGif from '../../assets/HomeGif.gif'
import './FiltersOrders.css'

export default function FiltersOrders({pagina, set}) {
    const dispatch = useDispatch()
    

    function handleClick(e) {
        e.preventDefault();
        pagina(1)
        dispatch(getDogs(e.target.value))
    }

    return (
        <nav className='contendor-filters'>
            <div className="contenido-filters">
            <button onClick={e => {handleClick(e)}} className='filtersOrders_button_icon'>
            <img src={HomeGif} alt="" className='filtersOrders_icon' />
            </button>
               <div>
               <Order
               pagina={pagina}
               set={set}/>
               </div>
            <div>
                <Temperament
                pagina={pagina}/>
            </div>
            <div>
                <CreateOrNo/>
            </div>
            </div>
        </nav>
    )
}