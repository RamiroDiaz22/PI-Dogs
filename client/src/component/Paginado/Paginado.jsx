import React from "react";
import { CgArrowLeftO, CgArrowRightO } from "react-icons/cg";
import './Paginado.css'

export default function Paginado({dogsPage, allDogs, paginado, currentPage}){
    const pageNumber = [];
    var paginadoTotal = Math.floor(allDogs/dogsPage) + 1;
    for(let i = 0; i <= Math.floor(allDogs/dogsPage); i++){
        pageNumber.push(i+1)
    }

    function handleBack(e){
        e.preventDefault();
        currentPage === 1
        ? paginado(currentPage)
        : paginado(currentPage-1)
    }

    function handleNext(e){
        e.preventDefault();
        currentPage === pageNumber.length
        ? paginado(currentPage)
        :paginado(currentPage+1)
    }

    if(pageNumber.length > 1){
    return(
        <nav>
             <ul className="paginado_contenedor">
                <li>
                    <CgArrowLeftO
                    onClick={e => handleBack(e)}
                    className='paginado_icon paginado'/>
                </li>
                <li className="paginado_buttons">
                    <button
                    onClick={() => paginado(currentPage)}
                    className='paginado_current paginado'>
                        {currentPage}
                    </button>
                    <p className="paginado_text--numbertotal">of</p>
                    <button className='paginado_current paginado'>
                        {paginadoTotal}
                    </button>
                </li>
                <li>
                    <CgArrowRightO
                    onClick={e => handleNext(e)}
                    className='paginado_icon paginado'/>
                </li>
            </ul>
        </nav>
    )
}else return(<></>)
}