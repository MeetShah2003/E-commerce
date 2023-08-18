import { nav } from "../components/Navbar.js";

document.getElementById("navbar").innerHTML = nav();

let product = [];

const display = ((products1) => {
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
    let div=document.createElement("div");
    // let rating=document.createElement("h5");
    // if(rating.item.rating.rate>4){
    //     rating.innerHTML="****";
    // }
    // else if(rating.item.rating.rate<=3&&rating.item.rating.rate>=4){
    //     rating.innerHTML="***";
    // }
    // else{
    //     rating.innerHTML="**";
    // }
    let btn1=document.createElement("button");
    btn1.innerHTML="Buy now";
    btn1.setAttribute("id","buy");
    let btn2=document.createElement("button");
    btn2.innerHTML="Add to Cart";
    btn2.setAttribute("id","cart");
    div.append(img,title,cat,price,desc,btn1,btn2);
    document.getElementById("right-box").append(div);
  });
});


const get = () => {
  fetch("http://localhost:1020/product")
    .then((res) => res.json())
    .then((data) => {
        display(data);
        product= data;
    });
};
get();

// const handellth=((item)=>{
//     let data=item.price.sort((a,b)=>a.item.price-b.item.price);
//     display(data);
//     console.log(data);
// });

// document.getElementById("lth").addEventListener("click",handellth);