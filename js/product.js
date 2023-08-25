import {nav} from "../components/Navbar.js";


document.getElementById("navbar").innerHTML=nav();

let products=[];

const display = (products1) => {
  document.getElementById("right-box").innerHTML="";
    products1.map((item) => {
    let img = document.createElement("img");
    img.src = item.image;
    let title = document.createElement("h2");
    title.innerHTML = item.title;
    let cat = document.createElement("h3");
    cat.innerHTML = item.category;
    let price = document.createElement("h4");
    price.innerHTML = item.price;
    let desc = document.createElement("p");
    desc.innerHTML = item.description;
    let rating=document.createElement("h5");
    if(item.rating.rate>4){
        rating.innerHTML="****";
    }
    else if(item.rating.rate<=3&&item.rating.rate>=4){
        rating.innerHTML="***";
    }
    else{
        rating.innerHTML="**";
    }
    let btn1=document.createElement("button");
    btn1.innerHTML="Buy now";
    btn1.setAttribute("id","buy");
    let btn2=document.createElement("button");
    btn2.innerHTML="Add to Cart";
    btn2.setAttribute("id","cart");
    btn2.addEventListener("click",()=>{
        let login = localStorage.getItem("login")
        if(login){
            fetch(`http://localhost:1020/cart?id=${item.id}`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data.length > 0){
                    data[0].qty=data[0].qty+1;
                    fetch(`http://localhost:1020/cart/${data[0].id}`,{
                        method:"PATCH",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(...data)
                    })
                }
                else{
                    fetch(`http://localhost:1020/cart`,{
                        method:"POST",
                        headers:{"Content-type":"application/json"},
                        body:JSON.stringify({...item,qty:1})
                    })
                }
            })
        }   
        else{
            alert("Please Login first")
            setTimeout(() => {
                window.location.href="../pages/login.html"
            }, 1000);
        }
    });
    let div=document.createElement("div");
    div.append(img,title,cat,price,desc,rating,btn1,btn2);
    document.getElementById("right-box").append(div);
});
};


const get = () => {
  fetch("http://localhost:1020/product")
    .then((res) => res.json())
    .then((data) => {
        display(data);
        products=data
    });
};
get();

const handellth=()=>{
  let data=products.sort((a,b)=>a.price-b.price);
  display(data);
};

document.getElementById("lth").addEventListener("click",handellth);

const handelhtl=()=>{
  let data=products.sort((a,b)=>b.price-a.price);
  display(data);
};


document.getElementById("htl").addEventListener("click",handelhtl);


const searchData=()=>{
  let inputvalue=document.getElementById("search").value;
  let data=products.filter((item)=>item.category.match(inputvalue.toLowerCase()));
  display(data);
};


document.getElementById("search").addEventListener("keypress",searchData);