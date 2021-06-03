import React,{useState} from 'react';
import styled from '@emotion/styled';
import {jsx,css} from '@emotion/react';
import Router from 'next/router';

const InputText= styled.input`
border:1px solid grey;
padding:1rem;
min-width:300px;
`;
const ButtonSumbit = styled.button`
height:3rem;
width:3rem;
display:block;
background-size: 4rem;
background-image: url('/static/img/buscar.png');
background-repeat: no-repeat;
position:absolute;
right:1rem;
top:1px;
background-color:white;
border:none;
&:hover{
    cursor:pointer;
}
`

const Buscar = () => {

    const[busqueda, guardarBusqueda] = useState('');

    const buscarProducto = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        //redireccionar a /buscar
        Router.push({
            pathname:'/buscar',
            query:{ q : busqueda}
        });
    }

    return(
        <form
         css={css`position:relative;`}
         onSubmit={buscarProducto}
         >
            <InputText 
            type='text'
            placeholder='Buscar productos'
            onChange={e => guardarBusqueda(e.target.value)}
            />

            <ButtonSumbit type='submit'></ButtonSumbit>
        </form>
    )
}

export default Buscar;