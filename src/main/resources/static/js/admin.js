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
        dropdownParent: selectDropdown,
      });
    });
  } catch (err) {
    console.log(err);
  }
})(jQuery);

if (sessionStorage.getItem('user')) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user.userType.toLowerCase() !== 'admin') {
    window.location.href = `/${user.userType.toLowerCase()}.html`;
  }
} else {
  window.location.href = '/login.html';
}

window.onload = () => {
  let forms = document.getElementsByTagName('form');
  forms[0].addEventListener('submit', handleUserRegistration);
  forms[1].addEventListener('submit', handleLoanRegistration);
  forms[2].addEventListener('submit', handleUserUpdate);
  forms[3].addEventListener('submit', handleLoanUpdate);

  getUsersList();
};

/** -------------------------------- */

function getUsersList() {
  fetchUsersList()
    .then((res) => {
      sessionStorage.setItem('users-list', JSON.stringify(res));
      renderUsers(res)
    })
    .catch((err) => console.warn(err));
}

function renderUsers(users) {
  const template = (user) => `<tr data-id='${user.userId}'>
                            <td>${user.userLogin}</td>
                            <td>${user.userName}</td>
                            <td>${user.userType}</td>
                            <td>
                              <i class="fa fa-pencil" aria-hidden="true"  onclick="handleUserEditBtnClick(this)"></i>
                              &nbsp; &nbsp; &nbsp;
                              <i class="fa fa-trash" aria-hidden="true" onclick="handleUserDelete(this)"></i>
                            </td>
                          </tr>`;

  let html = '';

  users.forEach((user) => {
    if (user.userType.toLowerCase() !== 'admin') 
    html += template(user);
  });

  document.getElementById('users-list').innerHTML = html;
}

function renderLoans(loans){
  const template = (loan) => `<tr data-id='${loan.loanId}'>
                            <td>${loan.loanType}</td>
                            <td>${loan.interestRate}</td>
                            <td>${loan.minPeriod}-${loan.maxPeriod} Years</td>
                            <td>${loan.minSalaryRequired}</td>
                            <td>
                              <i class="fa fa-pencil" aria-hidden="true"  onclick="handleLoanEditBtnClick(this)"></i>
                              &nbsp; &nbsp; &nbsp;
                              <i class="fa fa-trash" aria-hidden="true" onclick="handleLoanDelete(this)"></i>
                            </td>
                          </tr>`;

  let html = '';

  loans.forEach((loan) => {
    html += template(loan);
  });

  document.getElementById('loans-list').innerHTML = html;
}

function getLoansList(){
  fetchLoanList()
    .then(res=>{
      sessionStorage.setItem('loan-list', JSON.stringify(res));
      renderLoans(res)
    })
    .catch(err=>console.warn(err));
}

function displayUser() {
  document.getElementById('displayLoans').style.display = 'none';
  document.getElementById('displayEmployees').style.display = 'block';
  getUsersList();
}

function displayLoan() {
  document.getElementById('displayLoans').style.display = 'block';
  document.getElementById('displayEmployees').style.display = 'none';
  getLoansList();
}

// Get the modal
const addUserModal = document.getElementById('myModal');
const addLoanModal = document.getElementById('myModal2');
const updateUserModal = document.getElementById('updateForm');
const updateLoanModal = document.getElementById('updateLoanForm');


// Get the button that opens the modal
const addUserBtn = document.getElementById('addUserBtn');
const addLoanBtn = document.getElementById('addLoanBtn');
// Get the <span> element that closes the modal
const userModalCloseBtn = document.getElementsByClassName('close')[0];
const loanModalCloseBtn = document.getElementsByClassName('close')[1];
const userUpdateModalCloseBtn = document.getElementsByClassName('close')[2];
const loanUpdateModalCloseBtn = document.getElementsByClassName('close')[3];

// When the user clicks on the button, open the modal
addUserBtn.onclick = function () {
  addUserModal.style.display = 'block';
};
addLoanBtn.onclick = function () {
  addLoanModal.style.display = 'block';
};

const closeModal = (modal) => modal.style.display = 'none';

// When the user clicks on <span> (x), close the modal
userModalCloseBtn.onclick =  () => { closeModal(addUserModal) }
loanModalCloseBtn.onclick =  () => { closeModal(addLoanModal) }  
userUpdateModalCloseBtn.onclick = () => {closeModal(updateUserModal) }
loanUpdateModalCloseBtn.onclick = () => {closeModal(updateLoanModal) }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == addUserModal) {
    addUserModal.style.display = 'none';
  }
};
window.onclick = function (event) {
  if (event.target == addLoanModal) {
    addLoanModal.style.display = 'none';
  }
};

/** -------------------------------- */
function handleUserDelete(target){
  const trTag = target.parentNode.parentNode;    
  deleteUser(trTag.getAttribute('data-id'))
    .then(res=>getUsersList())
    .catch(err=>console.warn(err));
}

function handleLoanDelete(target){
  const trTag = target.parentNode.parentNode;    
  deleteLoan(trTag.getAttribute('data-id'))
    .then(res=>getLoansList())
    .catch(err=>console.warn(err));
}



function handleUserUpdate(e){
  e.preventDefault();
  let formData = new FormData(e.target);

  updateUser(formData)
    .then(res => { 
      console.log(res) 
      closeModal(updateUserModal);
      getUsersList();
    })
    .catch(err => console.warn(err));
}

function handleLoanUpdate(e){
  e.preventDefault();
  let formData = new FormData(e.target);

  updateLoan(formData)
    .then(res => { 
      console.log(res) 
      closeModal(updateLoanModal);
      getLoansList();
    })
    .catch(err => console.warn(err));
}

function handleUserEditBtnClick(target){  
  const trTag = target.parentNode.parentNode.getAttribute('data-id');    
  const usersList = JSON.parse(sessionStorage.getItem('users-list'));
  const inputs = Array.from(document.forms[2].elements);

  const user = usersList.filter(user=>user.userId === trTag);

  console.log(user);

  inputs.forEach(input=>{    
    input.value = user[0][input.getAttribute('name')];    
  })  
  updateUserModal.style.display = 'block';

}

function handleLoanEditBtnClick(target){  
  const trTag = target.parentNode.parentNode.getAttribute('data-id');    
  console.log(sessionStorage.getItem('loan-list'));
  const loanList = JSON.parse(sessionStorage.getItem('loan-list'));
  const inputs = Array.from(document.forms[3].elements);

  console.log(loanList)

  let loan = loanList.filter(l=>l.loanId === trTag);

  loan = loan[0];  

  inputs.forEach(input=>{    
    input.value = loan[input.getAttribute('name')];
  })  
  updateLoanModal.style.display = 'block';

}

/** -------------------------------- */
function handleUserRegistration(e) {
  e.preventDefault();
  let formData = new FormData(e.target);

  // formData.append('reportsTo', 'dis321');

  addUser(formData)
    .then((res) => {
      console.info(res)
      closeModal(addUserModal);
      getUsersList();
    })
    .catch((err) => console.warn(err));
}

function handleLoanRegistration(e) {
  e.preventDefault();
  let formData = new FormData(e.target);

  addLoan(formData)
    .then((res) => {
      console.log(res)
      closeModal(addLoanModal);
      getLoansList();
    })
    .catch((err) => console.log(err));
}

function validate(formData) {
  let check = true;
  formData.forEach((f) => {
    console.log(f);
    if (f.trim() === '') {
      check = false;
    }
  });
  return check;
}

function logOut(){
  sessionStorage.clear();
  window.location.href = '/login.html';
}
