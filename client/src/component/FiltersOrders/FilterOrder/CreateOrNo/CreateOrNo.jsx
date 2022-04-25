import React from 'react';
import {useDispatch} from 'react-redux';
import { filterCreate } from '../../../../action';
import arrow from '../../../../assets/arrow.svg';
import './CreateOrNo.css'

export default function CreateOrNo() {
    const dispatch = useDispatch();

    function handleFilter(e){
        e.preventDefault();
        dispatch(filterCreate(e.target.name))
    }

    return(
        <div>
            <ul className="filter_links">
                <li className="filter_item filter_item--show">
                    <p className="filter_link">
                        Filter
                        <img src={arrow} alt="No do found"
                        className="filter_arrow"/>
                        </p>
                    <ul className="filter_nesting" >
                        <li className="filter_inside" >
                            <button className="filter_link filter_link--inside" name="allDogs" onClick={e => handleFilter(e)}>All the Doggies</button>
                        </li>
                        <li className="filter_inside"  >
                            <button className="filter_link filter_link--inside" name="created" onClick={e => handleFilter(e)}>Created</button>
                        </li>
                        <li className="filter_inside"  >
                            <button className="filter_link filter_link--inside" name="createDefaul" onClick={e => handleFilter(e)}>Created by default</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}