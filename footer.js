let currentService="";
let currentPrice="";
let selectedMethod="";

// صوت
const sound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

// لايك
document.querySelectorAll(".like-btn").forEach(btn=>{
btn.onclick=()=>{
let num=btn.querySelector("span");

if(!btn.classList.contains("active")){
btn.classList.add("active");
num.innerText=parseInt(num.innerText)+1;
sound.play();
}
};
});

// فتح الدفع
const modal=document.getElementById("paymentModal");
const title=document.getElementById("serviceTitle");

document.querySelectorAll(".buy-btn").forEach(btn=>{
btn.onclick=()=>{
currentService=btn.dataset.service;
currentPrice=btn.dataset.price;

title.innerHTML=`${currentService} - ${currentPrice} جنيه`;
modal.classList.add("active");
};
});

// اختيار الدفع
document.querySelectorAll(".pay-item").forEach(item=>{
item.onclick=()=>{
document.querySelectorAll(".pay-item").forEach(i=>i.classList.remove("selected"));
item.classList.add("selected");
selectedMethod=item.dataset.method;
};
});

// تأكيد
document.getElementById("confirmBtn").onclick=()=>{
if(!selectedMethod){
alert("اختار طريقة دفع");
return;
}

window.open("https://wa.me/201066047545","_blank");
};
