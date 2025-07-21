//accede y lee datos del DOM
class MessageError{
    constructor(id,message,name_span){
        this.id=id;
        this.message=message;
        this.name_span=name_span;
        
    }
}
const message_error=[];
message_error.push(new MessageError(1,"El campo no puede estar en blanco.","error-name"));
message_error.push(new MessageError(2,"Nombre invalido.","error-name"));
message_error.push(new MessageError(3,"Email invalido","error-email"));
message_error.push(new MessageError(4,"Password invalido.","error-password")); // Para espacio en blanco
message_error.push(new MessageError(5,"El password debe tener un minimo de 8 caracteres.","error-password"));
message_error.push(new MessageError(6,"Password invalido debe tener minimo:(1)Mayuscula A, (1)minimuscula a, (.)caracter especial .","error-password"));
// CORRECCIÓN: Apunta al span correcto para el error de confirmación de contraseña
message_error.push(new MessageError(7,"El password no coincide","error-confirm-password"));
// NUEVO: Mensajes de error para el teléfono
message_error.push(new MessageError(8,"Número de teléfono inválido.","error-phone"));
message_error.push(new MessageError(9,"El campo de teléfono no puede estar en blanco.","error-phone"));


let maperror; // Esta variable ya no se usará directamente para la visualización de errores
const array_id=[]; // Se mantiene pero no se usa directamente para la visualización de errores
// Aumentado el tamaño de array_boolean para incluir la validación del teléfono
// Ahora son 9 posibles errores (0-8)
const array_boolean=[false,false,false,false,false,false,false,false,false]; // Se mantiene y se reinicia

function ready_data_information(){
    const value_date=[];
    const name_date=[];
    const container= document.querySelectorAll('input');
    const containerselect=document.querySelectorAll('select');
    const arraycontainer=[];
    for(let i=0;i<container.length;i++){
        arraycontainer.push(container[i]);
    }
    arraycontainer.push(containerselect);

    for (let i = 0; i < arraycontainer.length-1; i++) {
        name_date[i]=arraycontainer[i].name;
        value_date[i]=arraycontainer[i].value;
    } 
    const arraydate=[];
    for (let i=0;i<value_date.length;i++){
        arraydate.push([name_date[i],value_date[i]]);
   }
    //Creo un mapa con el nombre y valor del input para validarlo
    let mapinput=new Map(arraydate);
    //console.log(mapinput);
    return mapinput;
}

function validate_data(){
    // CORRECCIÓN CRÍTICA: Reiniciar array_boolean al inicio de la validación
    // Esto asegura que solo los errores actuales se reflejen, borrando los errores de intentos anteriores.
    for(let i = 0; i < array_boolean.length; i++) {
        array_boolean[i] = false;
    }
    // También es buena práctica limpiar array_id si se usa para algo más que solo la asignación
    for(let i = 0; i < array_id.length; i++) {
        array_id[i] = undefined; // O un valor por defecto si lo necesitas
    }


    let mapdata=ready_data_information();
    var is_data_valid=true; // Variable para rastrear la validez general

    // Validaciones existentes
    if (!validate_name(mapdata.get("name"))){
        is_data_valid=false;
    }
    if (!validate_email(mapdata.get("email"))){
        is_data_valid=false;
    }
    // NUEVO: Validación del teléfono
    if (!validate_phone(mapdata.get("phone"))){
        is_data_valid=false;
    }
    if (!validate_password_timenow(mapdata.get("password"))){
        is_data_valid=false;
    }
    if (!validate_password(mapdata.get("password"),mapdata.get("confirm-password"))){
        is_data_valid=false;
    }
    return is_data_valid;
}

function validate_name(name){
    let namenew=name.trim(); // Usar let para declarar la variable
    if(namenew===""){ // Usar === para comparación estricta
        array_id[0]=1;
        array_boolean[0]=true;
        return false;
    }
    else if(namenew.length===1){ // Usar ===
        array_id[1]=2;
        array_boolean[1]=true;
        return false;
    }
    return true; // Importante retornar true si es válido
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

// NUEVO: Función para validar el teléfono
function validate_phone(phone) {
    console.log(phone);
    let phonenew = phone.trim();

    if (phonenew === "") {
        array_id[8] = 9; // ID del mensaje "El campo de teléfono no puede estar en blanco."
        array_boolean[8] = true;
        return false;
    }

    // Expresión regular para validar números de teléfono (ejemplo básico, puede ser más complejo)
    // Permite dígitos, espacios, guiones, paréntesis y un signo '+' inicial opcional.
    // Asegura al menos 7 dígitos.
    const phoneRegex = new RegExp(/^\+?[0-9\s\-\(\)]{7,20}$/); 

    if (!phoneRegex.test(phonenew)) {
        array_id[7] = 8; // ID del mensaje "Número de teléfono inválido."
        array_boolean[7] = true;
        return false;
    }
    return true;
}


function validate_password(password_A,password_B){
    if (password_A!==password_B){ // Usar !== para comparación estricta
        array_id[6]=7;
        array_boolean[6]=true;
        return false;
    }
    return true;
}

function validate_password_timenow(password){
    if (validate_space(password)){
        // CORRECCIÓN: Se eliminó el alert(). El mensaje se mostrará en el span.
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
    return true;
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
    const form = document.querySelector(".container__form");
    
    // 2. Si el formulario realmente existe en la página...
    if (form) {
        // 3. ...adjunta el listener al evento "submit" DEL FORMULARIO.
        form.addEventListener("submit", (event) => {
            console.log("El formulario está intentando enviarse...");

            // Siempre previene el envío por defecto para manejar la validación
            event.preventDefault(); 

            // 1. Limpia todos los mensajes de error existentes antes de validar de nuevo
            // Selecciona todos los spans que tienen un atributo 'name' que comienza con 'error-'
            document.querySelectorAll('span[name^="error-"]').forEach(span => {
                span.textContent = ""; // Borra el contenido del span
            });

            // 2. Llama a la función de validación. Esta actualizará el array_boolean global.
            const is_form_valid = validate_data(); 

            // 3. Itera sobre tus mensajes de error y el array_boolean para mostrar los errores activos
            if (!is_form_valid) {
                console.log("La validación falló. Mostrando errores...");
                for (let i = 0; i < message_error.length; i++) {
                    // Si el booleano en la posición 'i' es true, significa que el error 'i' está activo
                    if (array_boolean[i]) {
                        const errorInfo = message_error[i];
                        // Busca el span por su atributo 'name'
                        const targetSpan = document.getElementsByName(errorInfo.name_span)[0];
                        if (targetSpan) {
                            targetSpan.textContent = errorInfo.message;
                        } else {
                            console.warn(`Advertencia: No se encontró el span con name="${errorInfo.name_span}" para el error: ${errorInfo.message}`);
                        }
                    }
                }
            } else {
                console.log("La validación fue exitosa. El formulario se enviará (simulado).");
                // Aquí podrías enviar el formulario si la validación es exitosa
                // form.submit(); // Descomentar para enviar el formulario real
            }
        });
    } else {
        // Un mensaje útil si el script no pudo encontrar el formulario.
        console.error("El script de validación no pudo encontrar el formulario con la clase '.container__form'");
    }
});



