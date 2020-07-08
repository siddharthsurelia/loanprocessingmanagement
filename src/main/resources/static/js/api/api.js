HOST = window.location.hostname;
PORT = window.location.port;

let baseUrl = '';
if (`${HOST}:${PORT}` === '127.0.0.1:5500') {
  baseUrl = 'http://127.0.0.1:8080';
}

let apiPath = '/lpm/api/v1';
const URL = `${baseUrl}${apiPath}`;

//--------------------------------------
//USER API
//--------------------------------------

/**
 * Login user
 * @param {*} userLogin 
 * @param {*} userPassword 
 */
async function authenticateUser(userLogin, userPassword) {
  data = {
    userLogin,
    userPassword,
  };

  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    return Promise.reject(response);
  }

  return response.json();
}

// Add User : /lpm/api/v1/user/
/**
 *
 * @param {*} userData
 * @returns {text} userId
 */
async function addUser(userData) {
  const data = {};
  for (const pair of userData) {
    data[pair[0]] = pair[1];
  }
  
  data['accountBalance'] = 0;

  const response = await fetch(`${URL}/user`, {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    return Promise.reject(response);
  }

  console.log(response.headers.get('content-type'));

  return response.text();
}

async function deleteUser(userId){
  console.log(userId);

  const response = await fetch(`${URL}/user/${userId}`, {
    method: 'DELETE'
  });

  if (response.status !== 200) return Promise.reject(response);

  return Promise.resolve();
}

async function updateUser(user){
  const data = {};
  for (const pair of user) {
    data[pair[0]] = pair[1];
  }
    
  const response = await fetch(`${URL}/user`, {
    method: 'PUT',
    body: JSON.stringify(data),
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    return Promise.reject(response);
  }

  console.log(response.headers.get('content-type'));

  return response.text();
}

async function fetchUsersList() {
  const response = await fetch(`${URL}/user`);

  if (response.status !== 200) {
    return Promise.reject(response);
  }

  return response.json();
}

async function getUserDetails(userId){
  const response = await fetch(`${URL}/user/${userId}`)

  if (response.status !== 200)
    return Promise.reject(response)

  return response.json();
}

// Manager Api
//get requested user list
async function getReportingUsersList(userLogin) {
  let data = { userLogin }; //userLogin

  const response = await fetch(`${URL}/fetchReportingUsersList`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  });

  return response.json();
}

async function getPendingApplicationsList(userLogin){
  let data = { userLogin }; //userLogin

  const response = await fetch(`${URL}/pendingApplications/${userLogin}`);

  return response.json();
}

//--------------------------------------
//LOAN API
//--------------------------------------

// Add Loan : /lpm/api/v1/loan
async function addLoan(loanData) {
  const data = {};
  for (const pair of loanData) {
    data[pair[0]] = pair[1];
  }

  const response = await fetch(`${URL}/loan`, {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    return Promise.reject(response);
  }

  return response.text();
}

async function updateLoan(loanData) {
  const data = {};
  for (const pair of loanData) {
    data[pair[0]] = pair[1];
  }

  const response = await fetch(`${URL}/loan`, {
    method: 'PUT',
    body: JSON.stringify(data),
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    return Promise.reject(response);
  }

  return response.text();
}

async function deleteLoan(loanId){
  const response = await fetch(`${URL}/loan/${loanId}`, {
    method: 'DELETE'
  });

  if (response.status !== 200) return Promise.reject(response);

  return Promise.resolve();
}

async function fetchLoanList() {
  const response = await fetch(`${URL}/loan`);

  if (response.status !== 200) {
    return Promise.reject(response);
  }
  return response.json();
}

async function fetchLoanListForUser(data){
  const response = await fetch(`${URL}/loanList`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
    mode: 'cors'
  })

  if (response.status !== 200){
    return Promise.reject(response);
  }

  return response.json();
}

//send approve to backend
async function approveRequest() {}




//APPLICATION REQUEST

async function sendApplicationRequest(data){

  const response = await fetch(`${URL}/application`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })

  if (response.status !== 200){
    return Promise.reject(response);
  }

  console.log(response.headers.get('content-type'));

  return response.text();

}

async function updateApplication(data){
  const response = await fetch(`${URL}/application`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })

  if (response.status !== 200){
    return Promise.reject(response);
  }

  console.log(response.headers.get('content-type'));

  return response.text();
}

async function processLoan(data){
  const response = await fetch(`${URL}/creditLoan/${data.appId}/${data.userId}/${data.amt}`)

  if (response.status !== 200){
    return Promise.reject(response);
  }

  return response.text();

}

async function getApplicationsListOfUser(userId){
  const response = await fetch(`${URL}/myApplications/${userId}`)

  if (response.status !== 200){
    return Promise.reject(response);
  }
  return response.json();
}

//Finance Wala
async function getAcceptedApplications(){
  const response = await fetch(`${URL}/acceptedApplications`)

  if (response.status !== 200){
    return Promise.reject(response);
  }
  return response.json();
}