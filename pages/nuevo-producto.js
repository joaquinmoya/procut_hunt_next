import React,{useState, useContext} from 'react'
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import Router,{useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import {Formulario,Campo, InputSubmit,Error} from '../components/ui/Formulario';
import {FirebaseContext} from '../firebase';
import firebase from '../firebase/firebase';
import Error404 from '../components/layout/404';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';


const STATE_INICIAL = {
    nombre:'',
    empresa:'',
   // imagen:'',
    url:'',
    descripcion:''
}

const NuevoProducto = () => {
  //state de las imagenes

  const[nombreImagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [progeso, guardarProgreso] = useState(0);
  const [urlImagen, guardarUrl] = useState('');

  const [error,guardarError]= useState(false);
    const { 
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur} = useValidacion(STATE_INICIAL,validarCrearProducto,crearProducto);

    const {nombre,empresa,imagen,url,descripcion} = valores;
    //hook de routing para redireccionar

    const router = useRouter();

    //context con las operaciones crud de firebase
    const {usuario} = useContext(FirebaseContext);
    

    async function crearProducto(){
   //si el usuario no esta autenticado llevar al login
      if(!usuario){
        return router.push('/login')
      }
      //crear objeto de nuevo producto
      const producto = {
        nombre,
        empresa,
        url,
        urlImagen,
        descripcion,
        votos:0,
        comentarios: [],
        creado: Date.now(),
        creador:{
          id: usuario.uid,
          nombre: usuario.displayName
        },
        haVotado:[]

      }

      //insertarlo en la BD
      firebase.db.collection('productos').add(producto);

      return router.push('/');
    }

  const handleUploadStart = () => {
      guardarProgreso(0);
      guardarSubiendo(true);
    }
 
  const handleProgress = progress => guardarProgreso({progress})
 
  const  handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  }
 
  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase
      .storage
      .ref('productos')
      .child(nombre)
      .getDownloadURL()
      .then(url => {console.log(url), guardarUrl(url)});

  }

  return (
    <div>
      <Layout>
        {!usuario ? <Error404/> : (
          <>
          <h1
          css={css`
          text-align:center;
          margin-top: 5rem;
  
          `}
          >Nuevo Producto</h1>
          <Formulario
          onSubmit={handleSubmit}
          noValidate
          >
            <fieldset>
              <legend>Información General</legend>
            
              <Campo>
                  <label htmlFor='nombre'>Nombre</label>
                  <input
                  type='text'
                  id='nombre'
                  placeholder='Nombre producto'
                  name='nombre'
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}
              <Campo>
                  <label htmlFor='empresa'>Empresa</label>
                  <input
                  type='text'
                  id='empresa'
                  placeholder='Nombre empresa'
                  name='empresa'
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}
  
              <Campo>
                  <label htmlFor='imagen'>Imagen</label>
                  <FileUploader
                  accept='image/*'
                  id='imagen'
                  name='imagen'
                  randomizeFileName
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                  />
              </Campo>
              <Campo>
                  <label htmlFor='url'>Url</label>
                  <input
                  type='url'
                  id='url'
                  name='url'
                  placeholder='URL de tu producto'
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
  
              </fieldset>
              <fieldset>
                <legend>Sobre tu Producto</legend>
  
                <Campo>
                  <label htmlFor='descripcion'>Descripcion</label>
                  <textarea
                  id='descripcion'
                  name='descripcion'
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>
            
              {error && <Error>{error}</Error>}
              
                  <InputSubmit
                  type='submit'
                  value='Crear Producto'
                  />
              
          </Formulario>
          </>

        )}
          
      </Layout>
      
    </div>
  )
}

export default NuevoProducto;