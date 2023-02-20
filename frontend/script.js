const form = document.querySelector("form");
const showDataBtn = document.querySelector("#showData");
const updateDataBtn = document.querySelector("update");
const deleteDataBtn = document.querySelector("#delete_data");
const del = document.querySelector("#del_data");

document.getElementById("signup").addEventListener("click", () => {
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
  document.getElementsByClassName("showTable")[0].style.display = "none";
});
document.getElementById("login").addEventListener("click", () => {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
  document.getElementsByClassName("showTable")[0].style.display = "none";
});
document.getElementById("showData").addEventListener("click", () => {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "none";
  document.getElementsByClassName("showTable")[0].style.display = "block";
});

//////////////////////////////////////////////// SignUp ////////////////////////////////////////////////////////////
document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let obj = {
    firstName: document.querySelector("#fname").value,
    lastName: document.querySelector("#lname").value,
    phone: document.querySelector("#phone").value,
    gender: document.querySelector("#gender").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#pass").value,
    cpassword: document.querySelector("#cpass").value,
  };

  // var regName = /^[A-Za-z]+$/;
  // if (obj.firstName === null || obj.firstName.match(regName) === null) {
  //   alert("Please enter valid first name");
  //   return false;
  // }

  // if (obj.lastName === null || obj.lastName.match(regName) === null) {
  //   alert("Please enter valid first name");
  //   return false;
  // }

  dataInsert(obj);

    document.querySelector("#fname").value = "";
    document.querySelector("#lname").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#pass").value = "";
    document.querySelector("#cpass").value = "";

  // if(obj.password === obj.cpassword){
  //   dataInsert(obj);
  //   document.querySelector("#fname").value = "";
  //   document.querySelector("#lname").value = "";
  //   document.querySelector("#phone").value = "";
  //   document.querySelector("#gender").value = "";
  //   document.querySelector("#email").value = "";
  //   document.querySelector("#pass").value = "";
  //   document.querySelector("#cpass").value = "";
  // }
  // else{
  //   alert("passwords are not same");
  // }

});


///////////////////////////////////////////////////// Login ////////////////////////////////////////////////
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let obj = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    validation(obj);
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });

/////////////////////////////////////////////////// After Login //////////////////////////////////////////////
function afterLogin(result) {
  document.getElementById("login-form").style.display = "none";
  


  let str;
  if (typeof (result) === "string") {
    alert(result);
    return;
  }
  else {
    str = `<tr class = "header">
        <th>First Name</th>
        <th>Last Name Name</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Email</th>  `
    str += `<tr>
        <td>${result.fname}</td>
        <td>${result.lname}</td>
        <td>${result.phone}</td>
        <td>${result.gender}</td>
        <td>${result.email}</td>
        </tr>`;
        document.getElementById("afterLogin").style.display = "block";
    const output = document.getElementById('afterLoginTable');
    output.innerHTML = str;

    document.getElementById("update").addEventListener("click", () => {
      document.getElementById("updateForm").style.display = "block";
    });
  
    deleteDataBtn.addEventListener("click", () => {
      deleteData(result.userId);
    });
  }


  
  /////////////////////////////////////////////////////  Update  ///////////////////////////////////////////////
  document.getElementById("updateForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let obj = {
      id: result.userId,
      firstName: document.querySelector("#Ufname").value,
      lastName: document.querySelector("#Ulname").value,
      phone: document.querySelector("#Uphone").value,
      gender: document.querySelector("#Ugender").value,
      email: document.querySelector("#Uemail").value,
      password: document.querySelector("#Upass").value,
    };
    updateData(obj);
  });
}



// show data
showDataBtn.addEventListener("click", () => {
  showData();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////   AJAX   /////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ajax for data insertion
function dataInsert(user) {
  $.ajax({
    url: "http://localhost:9000/user/insert",
    type: "POST",
    data: user,
    success: function (result) {
      if(typeof result === "string"){
        alert(result);
      }else{
        console.log(result);
      }
      
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// ajax to fetch whole data
function showData() {
  $.ajax({
    url: "http://localhost:9000/user/fetch",
    type: "GET",
    success: (result) => {
      rows = result;
      let str =
        rows.length > 0
          ? `<tr class = "header">
          <th>First Name</th>
          <th>Last Name Name</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Email</th>  `
          : "No data in database";
      rows.forEach((user) => {
        str += `<tr>
        <td>${user.fname}</td>
        <td>${user.lname}</td>
        <td>${user.phone}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td>
    </tr>`;
      });
      // console.log(str);
      const output = document.getElementsByClassName("showTable")[0];
      output.innerHTML = str;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// ajax to update record of the given id
function updateData(user) {
  $.ajax({
    url: "http://localhost:9000/user/update",
    type: "POST",
    data: user,
    success: (result) => {
      // console.log("Record Updated");
      if(typeof result === "string"){
        alert(result);
      }else{
        console.log("Record Updated");
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
}

// ajax to delete record of the given id
function deleteData(id) {
  $.ajax({
    url: "http://localhost:9000/user/delete",
    type: "POST",
    data: { id },
    success: (result) => {
      console.log();
    },
    error: (error) => {
      console.log(error);
    },
  });
}

// ajax to login
function validation(details) {
  $.ajax({
    url: "http://localhost:9000/user/login",
    type: "POST",
    data: details,
    success: (result) => {
      // afterLogin(result);
      if(typeof result === "string"){
        alert(result);
      }else{
        afterLogin(result);
      }
    },
    error: (error) => {
      console.log(error);
    }
  });
}
