// Handles errors using a message class with a unique identifier, an associated message, and the associated span.
class MessageError{
    constructor(id,message,name_span){
        this.id=id;
        this.message=message;
        this.name_span=name_span;
        
    }
}
// An array of messages is defined to store a flexible array of objects for defining new dynamic spans.
const message_error=[];
message_error.push(new MessageError(1,"The field cannot be blank.","error-name"));
message_error.push(new MessageError(2,"Invalid name.","error-name"));
message_error.push(new MessageError(3,"Invalid email","error-email"));
message_error.push(new MessageError(4,"Invalid password.","error-password")); // For blank space
message_error.push(new MessageError(5,"The password must be at least 8 characters long.","error-password"));
message_error.push(new MessageError(6,"Invalid password must have at least: (1)Uppercase A, (1)lowercase a, (.)special character .","error-password"));
message_error.push(new MessageError(7,"The password does not match","error-confirm-password"));
message_error.push(new MessageError(8,"Invalid phone number.","error-phone"));
message_error.push(new MessageError(9,"The phone field cannot be blank.","error-phone"));
const array_id=[]; // Associates the identifier of each error message
const array_boolean=[false,false,false,false,false,false,false,false,false]; // Handles error states
function ready_data_information(){
    const value_date=[];
    const name_date=[];
    // The logic to access DOM fields was reduced
    // by accessing with document.querySelectorALL 
    const container= document.querySelectorAll('input');
    const containerselect=document.querySelectorAll('select');
    const arraycontainer=[];
    for(let i=0;i<container.length;i++){
        arraycontainer.push(container[i]);
    }
    arraycontainer.push(containerselect);
    // Defines keys and values for the form input map
    for (let i = 0; i < arraycontainer.length-1; i++) {
        name_date[i]=arraycontainer[i].name;
        value_date[i]=arraycontainer[i].value;
    } 
    const arraydate=[];
    for (let i=0;i<value_date.length;i++){
        arraydate.push([name_date[i],value_date[i]]);
   }
    // Creates a map with the input name and value for validation
    let mapinput=new Map(arraydate);
    return mapinput;
}
function validate_data(){
    // This allows resetting error states
    for(let i = 0; i < array_boolean.length; i++) {
        array_boolean[i] = false;
    }
    for(let i = 0; i < array_id.length; i++) {
        array_id[i] = undefined; 
    }
    let mapdata=ready_data_information();
    var is_data_valid=true; // Variable to track overall validity
    // Existing validations
    if (!validate_name(mapdata.get("name"))){
        is_data_valid=false;
    }
    if (!validate_email(mapdata.get("email"))){
        is_data_valid=false;
    }
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
    let namenew=name.trim();
    if(namenew===""){ 
        array_id[0]=1;
        array_boolean[0]=true;
        return false;
    }
    else if(namenew.length===1){ 
        array_id[1]=2;
        array_boolean[1]=true;
        return false;
    }
    return true; 
}
function validate_email(email){
    // Regular expression to reinforce correct email handling with greater precision for incorrect cases
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegex.test(email)){
        console.log(emailRegex.test(email));
        array_id[2]=3;
        array_boolean[2]=true;
        return false;
    }
    return true;
}
function validate_phone(phone) {
    console.log(phone);
    let phonenew = phone.trim();

    if (phonenew === "") {
        array_id[8] = 9; 
        array_boolean[8] = true;
        return false;
    }
    // Regular expression that validates the phone number format
    const phoneRegex = new RegExp(/^[0-9]{7}$/); 
    if (!phoneRegex.test(phonenew)) {
        array_id[7] = 8; 
        array_boolean[7] = true;
        return false;
    }
    return true;
}
function validate_password(password_A,password_B){
    if (password_A!==password_B){ 
        array_id[6]=7;
        array_boolean[6]=true;
        return false;
    }
    return true;
}
function validate_password_timenow(password){
    if (validate_space(password)){
        array_id[3]=4;
        array_boolean[3]=true;
        return false;
    }
    if (password.length<8){
        array_id[4]=5;
        array_boolean[4]=true;
        return false;
    }
    // Regular expression that validates the password format
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
// Activates when the page is loaded
document.addEventListener("turbo:load", () => {
   
    // 1. Selects the FIRST element that has the class "form".
    // querySelector is more direct and safer for this case.
    const form = document.querySelector(".container__form");
    
    // 2. If the form actually exists on the page...
    if (form) {
        // 3. ...attaches the listener to the "submit" event OF THE FORM.
        form.addEventListener("submit", (event) => {
            console.log("The form is attempting to submit...");
            // Always prevent default submission to handle validation
            event.preventDefault(); 
            // 1. Clear all existing error messages before re-validating
            // Select all spans that have a 'name' attribute starting with 'error-'
            document.querySelectorAll('span[name^="error-"]').forEach(span => {
                span.textContent = ""; // Clears the content of the span
            });

            // 2. Call the validation function. This will update the global array_boolean.
            const is_form_valid = validate_data(); 
            // 3. Iterate over your error messages and the array_boolean to display active errors
            if (!is_form_valid) {
                console.log("Validation failed. Displaying errors...");
                for (let i = 0; i < message_error.length; i++) {
                    // If the boolean at position 'i' is true, it means error 'i' is active
                    if (array_boolean[i]) {
                        const errorInfo = message_error[i];
                        // Find the span by its 'name' attribute
                        const targetSpan = document.getElementsByName(errorInfo.name_span)[0];
                        if (targetSpan) {
                            targetSpan.textContent = errorInfo.message;
                        } else {
                            console.warn(`Warning: No span with name="${errorInfo.name_span}" found for error: ${errorInfo.message}`);
                        }
                    }
                }
            } else {
                console.log("Validation was successful. The form will be submitted (simulated).");
                // Here you could submit the form if validation is successful
                // form.submit(); // Uncomment to submit the real form
            }
        });
    } else {
        // A helpful message if the script could not find the form.
        console.error("The validation script could not find the form with the class '.container__form'");
    }
});


