import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetails } from '../../action';
import Loading from '../../assets/Loading.gif'
import { GiWeight, GiSittingDog } from "react-icons/gi";
import { VscSymbolRuler } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAddReaction } from "react-icons/md";
import icon from '../../assets/collar-de-perro.png';
import './Details.css';

export default function Details(props) {
    const dispatch = useDispatch();

    const dogsDetails = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    }, [props.match.params.id, dispatch])

    return (
        <div>
             
            {
                dogsDetails ?
                <div>
                    <nav className='contenedor-SearchBar contenedor_searchBar--details'>
                        <div className='searchBar-contenador-nav'>
                            <Link to="/home" className='details_links--home'>
                            <img src={icon} alt="" className='searchBar_icon'/>
                            </Link>
                            <Link to='/create'>
                                <button className='details_link details_create'><p className='details_text'>CREATE YOUR DOG</p></button>
                            </Link>
                            <Link to="/home">
                                <button className='details_link details_home'>
                                    <p className='details_text'>HOME</p>
                                </button>
                            </Link>
                        </div>
                    </nav>
                    <div className='contenedor-Details'>
                    <div>
                        <div className='details_name'>
                            <h1>
                            {dogsDetails.name
                            ? dogsDetails.name
                            : dogsDetails[0].name}
                            </h1>
                            <GiSittingDog className='details_name_icon'/> 
                        </div>
                        <div className='details_contenedor_img'>
                            <img className='img-Details'
                            src={dogsDetails.image
                            ? dogsDetails.image
                            : dogsDetails[0].image}
                             alt="Not do found" />
                        </div>
                    </div>
                    <div className='contenido-Details'>
                    <div className='details_items'>
                        <h3 className='details_subtitle'>Height <VscSymbolRuler className='details_icons'/> </h3>
                        {dogsDetails.height?
                        <p>{dogsDetails.height} cm</p>
                        : <p>
                            {dogsDetails[0].height_min} - {dogsDetails[0].height_max} cm
                            </p>}
                    </div>
                   <div className='details_items'>
                        <h3 className='details_subtitle'>Weight <GiWeight className='details_icons'/> </h3>
                        {dogsDetails.weight?
                        <p>{dogsDetails.weight} kg</p>
                        : <p>
                            {dogsDetails[0].weight_min} - {dogsDetails[0].weight_max} kg
                            </p>}
                   </div>
                    <div className='details_items'>
                        <h3 className='details_subtitle'>Life span <AiOutlineHeart className='details_icons'/> </h3>
                        {dogsDetails.life_span?
                        <p>{dogsDetails.life_span}</p> :
                        <p>{dogsDetails[0].life_span} years</p>
                        }
                    </div>
                   <div className='details_items'>
                        <h3 className='details_subtitle'>Temperament <MdOutlineAddReaction className='details_icons'/> </h3>
                        <p>{dogsDetails.temperament? dogsDetails.temperament
                        : dogsDetails[0].temperaments.map(t => t.name + (' '))}</p>
                   </div>
                    </div>
                </div>
                </div> :
                <div>
                    <img src={Loading} alt="" className='loading_icon'/>
                        <h3 className="loading">LOADING...</h3>
                    </div>
            }
        </div>
    )
}

