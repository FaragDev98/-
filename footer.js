// ================= زر الاشتراك =================

// نحط الزر بعد تحميل الصفحة
window.onload = function () {

  const container = document.getElementById("yt-subscribe");

  // مهم: استخدمنا اسم القناة
  container.innerHTML = `
    <div class="g-ytsubscribe"
         data-channel="FRWEBS"
         data-layout="full"
         data-theme="dark"
         data-count="default">
    </div>
  `;

  // إعادة تحميل زر يوتيوب
  if (window.gapi) {
    window.gapi.ytsubscribe.go();
  }

};


// ================= الشراء =================

let currentService="";
let currentPrice="";

const popup=document.getElementById("popup");
const payment=document.getElementById("payment");

// لما المستخدم يضغط شراء
document.querySelectorAll(".buy-btn").forEach(btn=>{
  btn.onclick=()=>{

    currentService=btn.dataset.service;
    currentPrice=btn.dataset.price;

    popup.style.display="flex";

    document.getElementById("title").innerText=currentService;

    document.getElementById("desc").innerText=
    "🔥 عرض محدود\n\nالسعر: "+currentPrice+" جنيه\n\nابدأ دلوقتي 💰";

  };
});

// قفل البوب
function closePopup(){
  popup.style.display="none";
}

// فتح الدفع
function openPayment(){
  popup.style.display="none";
  payment.style.display="flex";

  document.getElementById("payTitle").innerText=
  currentService+" - "+currentPrice+" جنيه";
}

// تنفيذ الدفع (واتساب)
function pay(){

  alert("تم الطلب ✅");

  window.open(
    "https://wa.me/201066047545?text=طلب "+currentService,
    "_blank"
  );

}
