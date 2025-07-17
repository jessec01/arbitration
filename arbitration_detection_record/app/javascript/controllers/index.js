// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

//accesses and reads data from the DOM
function ready_data_information(){
    
    const value_date=[];
    const name_date=[];
    const list_value = document.getElementsByClassName('form-group'); 
    
for (let i = 0; i < list_value.length; i++) {
    //selects all the internal elements of the form-group class
    const auxlist_value = list_value[i]; 

    // Try to find an input, textarea, or select within this formGroup
    const inputelement = auxlist_value.querySelector('input, textarea, select');
    if (inputelement) {
        
        value_date[i]=inputelement.value;
        name_date[i]=inputelement.name;
    }
} 
const arraydate=[];
for(let i=0;i<value_date.length;i++){
    arraydate.push([name_date[i],value_date[i]]);
}
    //I create a map with the name and value of the input to validate it
    let mapinput=new Map(arraydate);

    return mapinput;
}
function validate_data(){
    let mapdata=ready_data_information();
    validate_name(mapdata.get("name"));
    validate_email(mapdata.get("email"));
    validate_password_timenow(mapdata.get("password"));
    validate_password(mapdata.get("password"),mapdata.get("confirm-password"));
}
validate_data();
function validate_name(name){
    name.trim();
    
    if (name.length==0){
        alert("pagina no espacio en blanco");
    }else if(name.length==1){
        alert("ingrese un nombre valido");
    }
    else{
        console.log("nombre correcto");
    }
    
}
function validate_email(email){
    // Expresión regular para la validación de email (RFC 5322 compatible)
  // Esta es una expresión regular robusta que cubre la mayoría de los casos válidos
  const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  // El método .test() de la expresión regular devuelve true si la cadena coincide con el patrón
  if (!emailRegex.test(email)){
    console.log(emailRegex.test(email));
    console.log(email);
    alert("email invalido");
  }
}
function validate_password(password_A,password_B){
    if (password_A!=password_B){
        alert("contraseña no coincide")
    }

}

function validate_password_timenow(password){
    if (validate_space(password)){
        alert("no se permite espacio en blanco")
    }
    if (password.length<8){
        alert("debe tener un minimo de 8 caracteres");
    }
    const password_good=new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/);
    if (password_good.test(password)){
        alert("contraseña invalida debe tener minimo:Mayuscula A, minimuscula a, caracter especial .")
    }

}
function validate_space(str){
    if(str.includes(' ')){
        return true;
    }
    return false;
}