let currentService="";
let currentPrice="";

const popup=document.getElementById("popup");
const payment=document.getElementById("payment");

document.querySelectorAll(".buy-btn").forEach(btn=>{
btn.onclick=()=>{

currentService=btn.dataset.service;
currentPrice=btn.dataset.price;

popup.style.display="flex";

document.getElementById("title").innerText=currentService;

document.getElementById("desc").innerText=
"🔥 عرض محدود\n\nالسعر: "+currentPrice+" جنيه\n\nابدأ دلوقتي واشتغل من البيت 💰";

};
});

function closePopup(){
popup.style.display="none";
}

function openPayment(){
popup.style.display="none";
payment.style.display="flex";

document.getElementById("payTitle").innerText=
currentService+" - "+currentPrice+" جنيه";
}

function pay(){

alert("تم الطلب ✅\nسيتم التواصل معك");

window.open(
"https://wa.me/201066047545?text=طلب "+currentService,
"_blank"
);

}
