import { nav } from "../components/Navbar.js";

document.getElementById("navbar").innerHTML = nav();

const display = (cart) => {
  cart.map((item) => {
    let img = document.createElement("img");
    img.src = item.image;
    let price = document.createElement("h4");
    price.innerHTML = item.price;
    let qty = document.createElement("h4");
    qty.innerHTML = item.qty;
    let add = document.createElement("button");
    add.innerHTML = `<i class="fa-solid fa-plus pl-10"></i>`;
    add.addEventListener("click", () => {
      fetch(`http://localhost:1020/cart/${item.id}`)
        .then((res) => res.json())
        .then((data) => {
          data.qty = data.qty + 1;
          fetch(`http://localhost:1020/cart/${data.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          console.log(data);
        });
    });
    let sub = document.createElement("button");
    sub.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    sub.addEventListener("click", () => {
      fetch(`http://localhost:1020/cart/${item.id}`)
        .then((res) => res.json())
        .then((data) => {
          data.qty = data.qty - 1;
          fetch(`http://localhost:1020/cart/${data.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        });
    });
    if (item.qty == 0) {
      fetch(`http://localhost:1020/cart/${item.id}`, {
        method: "DELETE",
      });
    }

    let total = document.createElement("h4");
    let final_total = item.qty * item.price;
    total.innerHTML = final_total;

    let dlt = document.createElement("button");
    dlt.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    dlt.addEventListener("click", () => {
      fetch(`http://localhost:1020/cart/${item.id}`, {
        method: "DELETE",
      });
    });
    dlt.style.color = "red";

    let td1 = document.createElement("td");
    td1.append(img);
    let td2 = document.createElement("td");
    td2.append(price);
    let td3 = document.createElement("td");
    td3.append(sub, qty, add);
    td3.setAttribute("class", "qty11");
    let td4 = document.createElement("td");
    td4.append(total);
    let td5 = document.createElement("td");
    td5.append(dlt);

    let tr = document.createElement("tr");
    tr.append(td1, td2, td3, td4, td5);
    document.getElementById("tbody").append(tr);
  });
};

fetch(`http://localhost:1020/cart`)
  .then((res) => res.json())
  .then((data) => display(data));
