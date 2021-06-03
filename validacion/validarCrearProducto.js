export default function validarCrearProducto(valores){
    let errores = {};

    //Validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = 'El nombre es obligatorio';
    }
    //Validar empresa
    if(!valores.empresa){
        errores.empresa = 'La empresa es obligatoria';
    }
    //Validar url
    if(!valores.url){
        errores.url = 'La url del producto es obligatoria';
    }
    //Expresion regular 
    else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = 'Url no valida'

    }
    //Validar descripcion
    if(!valores.descripcion){
        errores.descripcion= 'La descripcion de tu producto es obligatoria'
    }
    return errores;
}