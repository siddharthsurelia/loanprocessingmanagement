$('.to-top').on('click', function (a) {
  a.preventDefault();
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    800,
  );
  return false;
});
// scroll animation ------------------
$(window).on('scroll', function (a) {
  if ($(this).scrollTop() > 150) {
    $('.to-top').fadeIn(500);
  } else {
    $('.to-top').fadeOut(500);
  }
});

String.prototype.format = function () {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

window.onload = () => {
  if (typeof Storage !== undefined) {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user.userType.toLowerCase() !== 'manager') {
        window.location.href = `/${user.userType.toLowerCase()}.html`;
      } else {
        getData();
      }
    } else {
      window.location.href = '/login.html';
    }
  }
  showUserNameOnNav();
  document.getElementById('logoutBtn').addEventListener('click', logout);
};

function showUserNameOnNav(){
  const user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('userBtn').innerHTML = user.userName;
}

async function getData() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const loanList = await fetchLoanList();
  // console.log(loanList);

  const userList = await getReportingUsersList(user.userLogin);
  // console.log(userList);

  const pendingList = await getPendingApplicationsList(user.userLogin);
  sessionStorage.setItem('applications', JSON.stringify(pendingList));
  // console.log(pendingList);

  data = { loanList, userList, pendingList };

  renderUserList(data);
}

function renderUserList({ loanList, userList, pendingList }) {
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
    <td class='${status}'>${application.status}</td>
    ${(application.status === 'APPROVED' ||application.status === 'REJECTED' ) ? '' :     
    `<td><i class="fas fa-check btn btn-outline-success" onclick='approve(this)'></i></td>
  <td><i class="fas fa-times btn btn-outline-danger" onclick='decline(this)'></i></td>`}`};

  console.log(userList);
  console.log(loanList);

  html = '';

  pendingList.forEach((app) => {
    let loan = loanList.filter((l) => l.loanId === app.loanId);
    let user = userList.filter((u) => u.userId === app.userId);

    html += template(app, loan[0], user[0]);
  });

  document.getElementById('table-body').innerHTML = html;
}

function approve(target) {
  const id = target.parentNode.parentNode.getAttribute('data-id');
  makeRequest(id, 'APPROVED');
}
function decline(target) {
  const id = target.parentNode.parentNode.getAttribute('data-id');
  makeRequest(id, 'REJECTED');
}

function makeRequest(id, type) {
  const applications = JSON.parse(sessionStorage.getItem('applications'));

  const application = applications.filter((app) => app.applicationId === id);

  const current_date = new Date();
  const date = `${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()}`

  const data = { ...application[0] };


  data['status'] = type;
  data['approvedDate'] = date;

  console.log(data);
  updateApplication(data)
    .then((res) => {      
      console.log(res)
      getData();
    })
    .catch((err) => console.warn(err));
}

function logout() {
  sessionStorage.clear();
  window.location.href = '/login.html';
}
