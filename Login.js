
function Validator(option){

    function validate(inputElement,rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        // save thẻ span vào biến errorElement

        

        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        // else{
        //     errorElement.innerText = "";
        //     inputElement.parentElement.classList.remove('invalid');
        // }   
        return !errorMessage;         
    }

    var formElement = document.querySelector(option.form);

    if(formElement){

        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;

            option.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if(!isValid){
                    isFormValid = false;
                }
            });

            // if(isFormValid){
            //     console.log("All thông tin phù hợp")
            // }else{
            //     console.log("Bug a lot of inform")
            // }

            if(isFormValid){
               if(typeof option.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('input:not([disabled])')
                    //'input:not([disabled])' nghĩa là lấy ~ thẻ input mà ko có attribute là disabled (1 thuộc tính ko cho phép input)
                    // or dùng '[name]:not([disabled])' nghĩa là lấy những thẻ có thuộc tính name và ko có attribut disabled
                    var formValues = Array.from(enableInputs).reduce((values, input) =>
                        (values[input.name] = input.value) && values, {});

                    option.onSubmit(formValues)
               }
            }
        }

        option.rules.forEach(rule => {

            var inputElement = document.querySelector(rule.selector);

            if(inputElement){
                inputElement.onblur = function(){
                   validate(inputElement,rule);
                }

                inputElement.oninput = function(){
                    
                    var errorElement = inputElement.parentElement.querySelector('.form-message')
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
            
        });

    }
}

Validator.isRequired = function(selector,message){
    return{
        selector: selector,
        test: function(value){
            return value ? undefined : message;
        }
    }
}

Validator.isCheckLogIn = function(valuesInput){
    return valuesInput['userName'] == 'kaichouHKT'&& valuesInput['passWord'] == '1832003';
}
// Validator.isPassword= function(selector,message){
//     return{
//         selector: selector,
//         test: function(value){
//             return value.length>=6 ? undefined : message 
//         }
//     }
// }

