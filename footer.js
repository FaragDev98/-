// ================= زر الاشتراك =================
// أزرار السوشيال العامة
document.querySelectorAll(".social-btn").forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.preventDefault(); // يمنع فتح الرابط مباشرة
    this.classList.add("done");
    this.querySelector("span").innerText = "✔ تم";
    
    // Optional: فتح الرابط بعد 1 ثانية
    setTimeout(()=>{
      window.open(this.href,"_blank");
    },1000);
  });
});

// زر الاشتراك في يوتيوب
document.querySelectorAll(".follow-btn").forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.preventDefault(); // يمنع التحويل العادي للصفحة

    const url = this.href;

    // فتح نافذة صغيرة للاشتراك
    const popup = window.open(url, "subscribe", "width=500,height=600");

    // تغيير شكل الزر فورًا
    this.classList.add("done");
    this.querySelector("span").innerText = "✔ تم الضغط";

    // التحقق من غلق النافذة لإعلام المستخدم بالعودة للموقع
    const self = this;
    const timer = setInterval(function(){
      if(popup.closed){
        clearInterval(timer);
        alert("تم إغلاق نافذة الاشتراك، الرجوع للموقع.");
      }
    },500);
  });
});
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
