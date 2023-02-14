const form = document.querySelector("form");
const showDataBtn = document.querySelector("#show_data");
const updateDataBtn = document.querySelector("update");
const deleteDataBtn = document.querySelector("#delete_data");
const del = document.querySelector("#del_data");


document.getElementById("signup").addEventListener('click', ()=>{
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("updateForm").style.display = "none";
})
document.getElementById("login").addEventListener('click', ()=>{
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("updateForm").style.display = "none";
})

document.getElementById("update").addEventListener('click', ()=>{
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("updateForm").style.display = "block";
})

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  _validation(username,password);
}); 




document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let obj = {
    firstName : document.querySelector("#fname").value,
    lastName : document.querySelector("#lname").value,
    phone : document.querySelector("#phone").value,
    gender : document.querySelector("#gender").value,  
    email : document.querySelector("#email").value,
    password : document.querySelector("#pass").value
  }

  var regName = /^[A-Za-z]+$/;
  if (obj.firstName === null || obj.firstName.match(regName)===null) {
    alert('Please enter valid first name');
    return false;
  }

  if (obj.lastName === null || obj.lastName.match(regName)===null) {
    alert('Please enter valid first name');
    return false;
  }

 dataInsert(obj);
});








document.getElementById("updateForm").addEventListener('click', (event) => {
  event.preventDefault();

  let obj = {
    id : document.querySelector("#Uuserid").value,
    firstName : document.querySelector("#Ufname").value,
    lastName : document.querySelector("#Ulname").value,
    phone : document.querySelector("#Uphone").value,
    gender : document.querySelector("#Ugender").value,  
    email : document.querySelector("#Uemail").value,
    password : document.querySelector("#Upass").value
  }
  updateData(obj);
});



// show data
showDataBtn.addEventListener("click",()=>{
  showData();
});


// delete data
deleteDataBtn.addEventListener("click",()=>{
    deleteData(del.value);
});


// ajax for data insertion
function dataInsert(user){  
    $.ajax({
      url: "http://localhost:9000/user/insert",
      type:"POST",
      data : user,
      success: function(result){
        console.log(result); 
      },
      error: function(error){
        console.log(error);
      }
    })
}



// ajax to fetch whole data
function showData(){
    $.ajax({
      url: "http://localhost:9000/user/fetch",
      type:"GET",
      success: (result)=>{
        rows = result;
        let str = rows.length>0 ?
        `<tr class = "header">
          <th>User Id</th>
          <th>First Name</th>
          <th>Last Name Name</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Password</th>`: "No data in database";
      rows.forEach((user) => {
        str+=`<tr>
        <td>${user.userId}</td>
        <td>${user.fname}</td>
        <td>${user.lname}</td>
        <td>${user.phone}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td>
        <td>${user.pass}</td>
    </tr>`;
});
console.log(str);
const output = document.getElementsByClassName("showTable")[0];
output.innerHTML = str;
      },
      error: function(error){
        console.log(error);
      }
    })
}





// ajax to update record of the given id
function updateData(user){
  $.ajax({
    url: "http://localhost:9000/user/update",
    type:"POST",
    data: user,
    success: (result)=>{
      console.log('Record Updated');
    },
    error:(error)=>{
      console.log(error);
    }
  })
}





// ajax to delete record of the given id
function deleteData(id){
  $.ajax({
    url: "http://localhost:9000/user/delete",
    type:"POST",
    data: {id},
    success: (result)=>{
      console.log();
    },
    error: (error)=>{
      console.log(error);
    }
  })
}