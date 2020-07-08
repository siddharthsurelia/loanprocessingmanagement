if (sessionStorage.getItem('user')){
  const user = JSON.parse(sessionStorage.getItem('user'));    
  if (user.userType.toLowerCase() !== 'finance'){
      window.location.href = `/${user.userType.toLowerCase()}.html`;
  }
}else{
  window.location.href = '/login.html';
}


window.onload = () => {
  getData();

  showUserNameOnNav();
  
}


function showUserNameOnNav(){
  const user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('userBtn').innerHTML = user.userName;
}


async function getData() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const loanList = await fetchLoanList();
  // console.log(loanList);

  const userList = await fetchUsersList();
  // console.log(userList);

  const approvedList = await getAcceptedApplications()    
  sessionStorage.setItem('applications', JSON.stringify(approvedList));

  // const pendingList = await getPendingApplicationsList(user.userLogin);
  // console.log(pendingList);

  data = { loanList, userList, approvedList };

  renderList(data);
}

function renderList({ loanList, userList, approvedList }) {
  template = (application,loan,user,) => {
    let status = '';
    switch(application.status){
      case 'APPROVED': status = 'text-success';break;
      case 'REJECTED': status = 'text-danger';break;
      default : status = 'text-secondary';
    }
    
    return `<tr data-id='${application.applicationId}'>
    <th scope='row'></th>
    <td>${user.userName}</td>
    <td>${loan.loanType}</td>
    <td>${loan.interestRate}</td>
    <td>${application.loanAmount}</td>
    <td>${application.loanPeriod}</td>        
    <td><button class='btn btn-secondary' onclick='handleProcessBtn("${user.userId}", "${application.loanAmount}", this)'>Process</button></td>
    <td></td>`};

  console.log(userList);
  console.log(loanList);

  html = '';

  approvedList.forEach((app) => {
    let loan = loanList.filter((l) => l.loanId === app.loanId);
    let user = userList.filter((u) => u.userId === app.userId);

    html += template(app, loan[0], user[0]);
  });

  document.getElementById('table-body').innerHTML = html;
}

function handleProcessBtn(userId, amt, target){
  const appId = target.parentNode.parentNode.getAttribute('data-id');
  

  processLoan({appId, userId, amt})
    .then(res=> getData())
    .catch(err=> console.warn(err))

}


function logout(){sessionStorage.clear(); window.location.href = '/login.html'}