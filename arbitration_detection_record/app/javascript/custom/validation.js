//accesses and reads data from the DOM
class ManssegerError{
    constructor(id,massenger,name_span){
        this.id=id;
        this.massenger=mansseger;
        this.name_span=name_span;
        
    }
}

const mansseger_error=[];
mansseger_error.push(new ManssegerError(1,"El campo no puede estar en blanco.","error-name"));
mansseger_error.push(new ManssegerError(2,"Nombre invalido.","error-name"));
mansseger_error.push(new(3,"Email invalido","error-email"));
mansseger_error.push(new(4,"Password invalido.","error-password"));
mansseger_error.push(new(5,"El password debe tener un minimo de 8 caracteres.","error-password"));
mansseger_error.push(new(6,"Password invalido debe tener minimo:(1)Mayuscula A, (1)minimuscula a, (.)caracter especial .","error-password"));
mansseger_error.push(new(7,"El password no coincide",error-password));

let maperror;
array_id=[];
array_boolean=[false,false,false,false,false,false,false];
function ready_data_information(){
    
    const value_date=[];
    const name_date=[];
    const name_span=[];
    const list_value = document.
    getElementsByClassName('form-group'); 
    
for (let i = 0; i < list_value.length; i++) {
    //selects all the internal elements of the form-group class
    const auxlist_value = list_value[i]; 

    // Try to find an input, textarea, or select within this formGroup
    const inputelement = auxlist_value.querySelector('input, textarea, select');
    //verifica si encontro la etiqueta
    if (inputelement) {
        
        value_date[i]=inputelement.value;
        name_date[i]=inputelement.name;
    }
} 
//console.log(_span);
const arraydate=[];
//const arrayspan=[];
for(let i=0;i<value_date.length;i++){
    arraydate.push([name_date[i],value_date[i]]);
    //arrayspan.push([name_span[i]," "]);
    //console.log(name_span[i]);
}
    //I create a map with the name and value of the input to validate it
    let mapinput=new Map(arraydate);
   // mapspan=new(arrayspan);
    //alert(mapinput);
    return mapinput;
}
function validate_data(){
    
    let mapdata=ready_data_information();
    var is_data_valid=true;
    //para validar que el se puede enviar los datos
    if (!validate_name(mapdata.get("name"))){
        is_data_valid=false;
    }
    if (!validate_email(mapdata.get("email"))){
        is_data_valid=false;
    }
    if (!validate_password_timenow(mapdata.get("password"))){
        is_data_valid=false;
    }
    if (!validate_password(mapdata.get("password"),mapdata.get("confirm-password"))){
        is_data_valid=false;
    }
   // alert("pause");
    return is_data_valid;
}
//validate_data();
function validate_name(name){
    namenew=name.trim();
    if(namenew==""){
        array_id[0]=1
        array_boolean[0]=true;
        return false;
    }
    else if(namenew.length==1){
        array_id[1]=2;
        array_boolean[1]=true;
        return false;
    }
    
    
}
function validate_email(email){
    // Expresión regular para la validación de email (RFC 5322 compatible)
  // Esta es una expresión regular robusta que cubre la mayoría de los casos válidos
  const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  // El método .test() de la expresión regular devuelve true si la cadena coincide con el patrón
  if (!emailRegex.test(email)){
    console.log(emailRegex.test(email));
    array_id[2]=3;
    array_boolean[2]=true;
    return false;
  }
  return true;
}
function validate_password(password_A,password_B){
    if (password_A!=password_B){
        array_id[6]=7;
        array_boolean[6]=true;
        return false;
    }
    return true;

}

function validate_password_timenow(password){
    if (validate_space(password)){
        alert("no se permite espacio en blanco")
        array_id[3]=4;
        array_boolean[3]=true;
        return false;
    }
    if (password.length<8){
        array_id[4]=5;
        array_boolean[4]=true;
        return false;
    }
    const password_good=new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/);
    if (!password_good.test(password)){
        array_id[5]=6;
        array_boolean[5]=true;
        return false;
    }
    return true

}
function validate_space(str){
    if(str.includes(' ')){
        return true;
    }
    return false;
}
//se activa cuando la pagina esta cargada
document.addEventListener("turbo:load", () => {
   
  // 1. Selecciona el PRIMER elemento que tenga la clase "form".
  // querySelector es más directo y seguro para este caso.
  const form = document.querySelector(".form");
    
  // 2. Si el formulario realmente existe en la página...
  if (form) {
    // 3. ...adjunta el listener al evento "submit" DEL FORMULARIO.
    form.addEventListener("submit", (event) => {
      console.log("El formulario está intentando enviarse...");

      // 4. Si la función de validación principal devuelve 'false'...
      if (!validate_data()) {
        const new
        document.
        // ...detenemos el envío del formulario. ¡Esto es lo más importante!
        event.preventDefault();
      } else {
        console.log("La validación fue exitosa. El formulario se enviará.");
      }
    });
  } else {
    // Un mensaje útil si el script no encuentra el formulario.
    console.error("El script de validación no pudo encontrar el formulario con la clase '.form'");
  }
});