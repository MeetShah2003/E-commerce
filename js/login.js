const loginData = (e) => {
  e.preventDefault();
  let login = {
    email: document.getElementById("email").value,
    pass: document.getElementById("passwd").value,
  };

  fetch(`http://localhost:1020/register?email=${login.email}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        if (data[0].pass === login.pass) {
          alert("Login Successfull");
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 1000);
          localStorage.setItem("login", true);
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User not found..!");
        setTimeout(() => {
          window.location.href = "../pages/register.html";
        }, 1000);
      }
    });
};

document.getElementById("form").addEventListener("submit", loginData);
