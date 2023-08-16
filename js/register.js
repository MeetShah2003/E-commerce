const userData = (e) => {
  e.preventDefault();
  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    pass: document.getElementById("passwd").value,
  };
  console.log(user);

  let u_pattern = /^[a-zA-Z ]{2,}$/;
  let e_pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let p_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  let patt1 = u_pattern.test(user.name);
  let patt2 = e_pattern.test(user.email);
  let patt3 = p_pattern.test(user.pass);

  if (!patt1) {
    document.getElementById("u_err").innerHTML = "Enter valid Username";
  } else {
    document.getElementById("u_err").innerHTML = "";
  }
  if (!patt2) {
    document.getElementById("e_err").innerHTML = "Enter valid Email";
  } else {
    document.getElementById("e_err").innerHTML = "";
  }
  if (!patt3) {
    document.getElementById("p_err").innerHTML = "Enter strong password";
  } else {
    document.getElementById("p_err").innerHTML = "";
  }

  if (patt1 && patt2 && patt3) {
    fetch(`http://localhost:1020/register?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          alert("User already Exist...!");
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 1000);
        } else {
          try {
            fetch(`http://localhost:1020/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            });
            localStorage.setItem("login", true);
          } catch (err) {
            alert("Error...!");
          }
        }
      });
  }
};

document.getElementById("form").addEventListener("submit", userData);