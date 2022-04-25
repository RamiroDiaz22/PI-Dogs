import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperament } from '../../action';
import icon from '../../assets/collar-de-perro.png';
import './CreateDog.css'

function validate(form) {
    let error = {};

    if (!form.name) {
        error.name = 'Your breed must have a name';
    }
    else if (form.name.length > 30) {
        error.name = 'That´s way too long a name. Keep it simple!!';
    }
    else if (!form.height_min) {
        error.height_min = 'Minimum height is required!!';
    }
    else if (isNaN(parseInt(form.height_min))) {
        error.height_min = 'Height should be a number';
    }
    else if (form.height_min <= 0) {
        error.height_min = 'Your breed can´t be shorter than 0';
    }
    else if (parseInt(form.height_min) >= parseInt(form.height_max)) {
        error.height_max = 'Maximum height should be lower than minimum height.';
    }
    else if (!form.height_max) {
        error.height_max = 'Maximum height is required!!';
    }
    else if (isNaN(parseInt(form.height_max))) {
        error.height_max = 'Height should be a number';
    }
    else if (form.height_max > 150) {
        error.height_max = 'I think 150cm is enough for a dog´s height, don´t you?';
    }
    else if (!form.weight_min) {
        error.weight_min = 'Minimum weight is required!!';
    }
    else if (isNaN(parseInt(form.weight_min))) {
        error.weight_min = 'Weight should be a number';
    }
    else if (form.weight_min <= 0) {
        error.weight_min = 'Your breed must weight at least more than nothingness';
    }
    else if (!form.weight_max) {
        error.weight_max = 'Maximum weight is required!!';
    }
    else if (isNaN(parseInt(form.weight_max))) {
        error.weight_max = 'Weight should be a number';
    }
    else if (parseInt(form.weight_max) <= parseInt(form.weight_min)) {
        error.weight_max = 'Maximum weight should be higher than minimum weight';
    }
    else if (form.weight_max > 200) {
        error.weight_max = 'We are creating a dog, not an elephant 🐘!! Keep your weight under 200';
    }
    else if (!form.life_span) {
        error.life_span = 'Life span is required!!';
    }
    else if (isNaN(parseInt(form.life_span))) {
        error.life_span = 'Life span should be a number';
    }
    else if (form.life_span > 50) {
        error.life_span = 'Saddly, dogs don´t live that long 😥';
    }
    else if (form.life_span <= 0) {
        error.life_span = 'You don´t want your dog to live???? 😮';
    }
    return error
}


export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory()
    const allTemperament = useSelector((state) => state.temperaments);
    const [error, setError] = useState({})

    const [form, setForm ] = useState({
        name:'',
        life_span:'',
        height_min:'',
        height_max:'',
        weight_min:'',
        weight_max:'',
        image:'',
        origin:'',
        temperament:[]
    });

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch]);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        setError(validate({
            ...form,
            [e.target.name] : e.target.value,
        }))
    };

    function handleSelectTemp(e) {
        setForm({
      ...form,
      temperament: form.temperament.includes(e.target.value)
        ? form.temperament
        : [...form.temperament, e.target.value],
    });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!Object.getOwnPropertyNames(error).length && form.name && form.height_min && form.height_max && form.weight_min && form.weight_max && form.life_span) {
            dispatch(createDog(form));
            alert('Dog created successfully👏');
            setForm({
                name:'',
                life_span:'',
                height_min:'',
                height_max:'',
                weight_min:'',
                weight_max:'',
                image:'',
                origin:'',
                temperament:[]
            });
            history.push('/home');
        } else {
            alert('Dog can´t be created with these data 🤷‍♂️')
        }
    }

    function deleteTemperament(e) {
        e.preventDefault()
        setForm({
            ...form,
            temperament: form.temperament.filter(d => d !== e.target.value)
        })
    }

    return (
        <div>
            <nav className='contenedor-SearchBar contenedor_searchBar--create'>
                <div className='searchBar-contenador-nav'>
                    <Link to="/home" className='details_links--home'>
                    <img src={icon} alt="" className='searchBar_icon'/>
                    </Link>
                    <Link to='/create'>
                        <button className='create_link create_create' onClick={e => handleSubmit(e)}>
                            <p className='create_text'>
                                CREATE YOUR DOG
                            </p>
                        </button>
                    </Link>
                    <Link to="/home">
                        <button className='create_link create_home'>
                            <p className='create_text'>HOME</p>
                        </button>
                    </Link>
                </div>
            </nav>
            <div className='create_contenedor'>
                <h1 className='create_title'>¡Create a Dog!</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className='create_items'>
                        <label className='create_label'>Name: </label>
                        <input
                        type='text'
                        value={form.name}
                        placeholder='Name'
                        name= 'name'
                        onChange={handleChange}
                        className='create_input'/>
                        { error.name && ( <p className='create_error'>
                            <strong>
                                {error.name}
                            </strong></p>)}
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Height min: </label>
                        <input type="text"
                        value={form.height_min}
                        placeholder='Height min'
                        name='height_min'
                        onChange={handleChange} 
                        className='create_input'/>
                        { error.height_min && ( <p className='create_error'> {error.height_min} </p>)}
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Height max: </label>
                        <input type="text"
                        value={form.height_max}
                        placeholder='Height max'
                        name='height_max'
                        onChange={handleChange} 
                        className='create_input'/>
                        { error.height_max && ( <p className='create_error'> {error.height_max} </p>)}
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Weight min: </label>
                        <input type="text"
                        value={form.weight_min}
                        placeholder='Weight min'
                        name='weight_min'
                        onChange={handleChange} 
                        className='create_input'/>
                        { error.weight_min && ( <p className='create_error'> {error.weight_min} </p>)}
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Weight max: </label>
                        <input type="text"
                        value={form.weight_max}
                        placeholder='Weight max'
                        name='weight_max'
                        onChange={handleChange} 
                        className='create_input'/>
                        { error.weight_max && ( <p className='create_error'> {error.weight_max} </p>)}
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Life span: </label>
                        <input type="text"
                        value={form.life_span}
                        placeholder='Life span'
                        name='life_span'
                        onChange={handleChange} 
                        className='create_input'/>
                        { error.life_span && ( <p className='create_error'> {error.life_span} </p>)}
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Image: </label>
                        <input type="text"
                        placeholder='URL'
                        value={form.image}
                        name='image'
                        onChange={handleChange} 
                        className='create_input'/>
                    </div>
                    <div className='create_items'>
                        <label className='create_label'>Temperament/s: </label>
                        <select onChange={(e) => handleSelectTemp(e)} className='create_select'>
                        <option value='temp' className='create_options'>Select Temperaments </option>
                            {
                            allTemperament && allTemperament?.map(d => (
                                <option key={d.id} value={d.name} className='create_options'>{d.name}</option>
                                ))
                            }
                        </select>
                            <div className='create_temperament'>
                            {form.temperament.map((e, i)=>(
                                <p>
                                    {e}
                                    <button className='create_delete'
                                    key={i} value={e}
                                    onClick={(e)=>deleteTemperament(e)}>
                                        X
                                    </button>
                                </p>
                            ))} 
                        </div>
                    </div>
                    <button type='submit' onSubmit={e => handleSubmit(e)}
                    className='create_link create_create'>
                        <p className='create_text'>
                            CREATE YOUR DOG
                        </p>
                    </button>
                </form>
            </div>
                </div>
    )
}