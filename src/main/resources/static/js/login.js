window.onload = () => {
    document.getElementById('loginForm').addEventListener('submit', handleSubmit)
}



function handleSubmit(e){
    e.preventDefault();
    const errorField = document.getElementById('error-message');
    errorField.style.display = 'none';

    inputs = Array.from(e.target)
    inputs = inputs.filter(el=>el.tagName == 'INPUT')

    let check = true;

    inputs.forEach(input=>{
        if (!validate(input)){
            showValidate(input);
            check = false;
        }
    });
    if (check){
        authenticateUser(inputs[0].value, inputs[1].value)                
            .then(res=>{            
                sessionStorage.clear();
                sessionStorage.setItem('user', JSON.stringify(res));
                switch(res.userType.toLowerCase()){
                    case "employee": window.location.href = '/employee.html'; break;
                    case "manager": window.location.href = '/manager.html'; break;
                    case "admin": window.location.href = '/admin.html'; break;
                    case "finance": window.location.href = '/finance.html'; break;
                    default : window.location.href = '/login.html';
                }                
            })
            .catch(err=>{
                errorField.style.display = 'block';
                console.warn(err)
            });
    }

}

function validate(input){
    
    input.getAttribute('type')
    if (input.getAttribute('type') === 'email' || input.getAttribute('name') == 'email'){
        if(input.value.trim().match(/^([a-zA-Z0-9_\-]+)/) == null){
            return false;
        }
        else{
            if(input.value.trim() === ''){
                return false;
            }
        }
    }
    return true
}

function showValidate(input){    
    let thisAlert = input.parentNode;
    thisAlert.classList.add('alert-validate');
}

function hideValidate(input){
    let thisAlert = input.parentNode;
    thisAlert.classList.remove('alert-validate');
}



(function ($) {
    "use strict";

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

})(jQuery);