(function ($) {
    'use strict';
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);

if (sessionStorage.getItem('user')){
    const user = JSON.parse(sessionStorage.getItem('user'));    
    if (user.userType.toLowerCase() !== 'employee'){
        window.location.href = `/${user.userType.toLowerCase()}.html`;
    }
}else{
    window.location.href = '/login.html';
}

function handleTimePeriodSlider(target){
    const targetField = target.previousSibling.previousSibling;
    targetField.innerHTML = `(${target.value} Years)`;    
}


window.onload = () => {     
    showUserNameOnNav();
    getAppliedLoanDetails();   
    getLoanList();
    renderUserDetails();

    document.getElementById('myLoanBtn').addEventListener('click', getAppliedLoanDetails);
    document.getElementById('myAccountBtn').addEventListener('click', getUserAccountDetails);
    
}

function getUserAccountDetails(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    getUserDetails(user.userId)
        .then(res=>{
            sessionStorage.setItem('user', JSON.stringify(res));
            renderUserDetails()
        })
        .catch(err=>console.warn(err));
}

function showUserNameOnNav(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('userBtn').innerHTML = user.userName;
}

function getLoanList(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    fetchLoanListForUser(user)
        .then(res=>{
            sessionStorage.setItem('loan-list', JSON.stringify(res));
            renderLoanList(res);
        })
        .catch(err=>console.warn(err));
}

function displayModal(target) {
    const loanList = JSON.parse(sessionStorage.getItem('loan-list'))
    const curId = target.getAttribute('data-id');
    let loan = loanList.filter(loan=>loan.loanId === curId);
    loan = loan[0];
    modal.style.display = "block";

    let template = (_loan) => `
        <div>Header</div>
        <div>Loan Type: ${_loan.loanType}</div>
        <div>
            <input class='form-control' placeholder='Loan Amount'/>
            <input class='form-control' placeholder='Time Period (In) Years' />
        </div>
        <button type='button' class='btn btn-success' data-id=${_loan.loanId} onClick='handleApplyLoan(this)'>Apply</button>    
    `

    let html = template(loan);

    document.getElementById('loan-body').innerHTML = html;
    
  }

function renderLoanList(loan_list){    
    const template = (loan, applied) => `<div class="card my-1" style="width: 100%;">        
            <div class="card-body">
            <h5 class="card-title">${loan.loanType}</h5>
            <p class="card-text">${loan.loanDescription}</p>
            <p><span>Interest Rate: <span>${loan.interestRate}</span></span><br>
            <span>Time Period: <span>${loan.minPeriod} - ${loan.maxPeriod} years</span></span></p>

            <p>
                <a class="" data-toggle="collapse" href="#${loan.loanId}" role="button" aria-expanded="false" aria-controls="collapseExample">
                Apply Loan
                </a>
            </p>
            <div class="collapse" id="${loan.loanId}">
                <div class="card card-body">
                    <div class="p-2">                  
                        <div><input type="number" step='0.1' min='500' max='1000' class="form-control" name='amount' placeholder="Amount"></div>
                        <div class="m-2">Time Period <span class='time-period'>(${loan.minPeriod} Years)</span>: <input type="range" min='${loan.minPeriod}' max='${loan.maxPeriod}' step='1' value='${loan.minPeriod}' oninput="handleTimePeriodSlider(this)"></div>
                        
                    </div>              
                    <a href="#" class="btn btn-primary w-25 my-2 ${ applied ? 'disabled' : ''}" onclick='applyForLoan(this)'>Apply</a>
                </div>
            </div>
            
            </div>
        </div>`;

    html = '';
    const appliedLoans = JSON.parse(sessionStorage.getItem('appliedLoan'))    

    loan_list.forEach(loan=>{        
        let _loan = appliedLoans.filter(al => al.loanId === loan.loanId);        
        let applied = (_loan.length === 0) ? false : true;
        html += template(loan, applied);
    })

    document.getElementById('loan-list').innerHTML = html;    
}

function applyForLoan(target){                

    const user = JSON.parse(sessionStorage.getItem('user'));

    const loadId = target.parentNode.parentNode.getAttribute('id');
    const inputs = target.parentNode.parentNode.querySelectorAll('input');

    const current_date = new Date();

    const date = `${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()}`


    const data = {
        "userId": user.userId,
        "loanId": loadId,
        "loanAmount": inputs[0].value,
        "loanPeriod": inputs[1].value,
        "installments": inputs[1].value * 12,
        "applicationDate": date
    };

    sendApplicationRequest(data)
        .then(res=>{
            console.log(res)
            showSnackbar();
        })
        .catch(err=>console.warn(err));
    

}

function renderUserDetails(){    
    const user = JSON.parse(sessionStorage.getItem('user'));        
    template = (key, value) => ` <li class="list-group-item">${key} : ${value}</li>`;
    html = '';
    const validFields = ['userName', 'userLogin', 'userAddress', 'userMobileNo', 'salary', 'accountBalance', 'reportsTo']

    Object.keys(user).forEach(k=>{
        if (validFields.includes(k))
            html += template(k, user[k]);
    })

    document.getElementById('user-detail').innerHTML = html;    
}

function getAppliedLoanDetails(){
    const user = JSON.parse(sessionStorage.getItem('user'));    
    getApplicationsListOfUser(user.userId)
        .then(res=>{
            sessionStorage.setItem('appliedLoan', JSON.stringify(res));
            renderAppliedLoans(res);
        })
        .catch(err=>console.warn(err));
}

function renderAppliedLoans(data){    
    const loanList = JSON.parse(sessionStorage.getItem('loan-list'));

    const template = (app, loan) => `<div class="card">
    <div class="card-body">
      <div class='font-weight-bold'>${loan.loanType}</div>
      ${loan.loanDescription}
      <div>
        <span class="form-control-sm">Interest Rate : ${loan.interestRate}</span>
        <span class="form-control-sm">Time Period : ${app.loanPeriod} Years</span>
        <span class="form-control-sm">Status : ${app.status}</span>
      </div>
    </div>
  </div>`

    let html = ''

  data.forEach(form=>{
    let loan = loanList.filter(l => l.loadId === form.loadId)
    html += template(form, loan[0]);
  })

  document.getElementById('appliedLoans').innerHTML = html;
}

function showSnackbar(){
    const x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}

function logout(){
    sessionStorage.clear();
    window.location.href = '/login.html';
}