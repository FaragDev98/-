/* ============================================================
   FOOTER.JS - HEADER + FOLDER MENU + BOTTOM NAV
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     1) إدراج الهيدر
  ======================= */
  if (!document.querySelector("header.header")) {
    const headerHTML = `
      <header class="header">
        <div class="header-inner">
          <a class="brand" href="../AB/index.html">
            <div class="logo">
              <img src="/icons/ai-icon.png" alt="AI Icon">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>
          <div class="header-actions">
            <!-- زر المجلد -->
            <button id="menuToggle" class="btn-icon" aria-label="القائمة">🗂</button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* =======================
     2) إدراج قائمة المجلد
  ======================= */
  if (!document.getElementById("folderMenu")) {
    const folderMenuHTML = `
      <nav id="folderMenu" class="folder-menu">
        <a href="/FR/index.html">
          <i class="fa-solid fa-briefcase"></i> خدمات
        </a>
        <a href="/dev-english/index.html">
          <i class="fa-solid fa-language"></i> الإنجليزية
        </a>
        <a href="/ish/index.html">
          <i class="fa-solid fa-graduation-cap"></i> كورسات
        </a>
      </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", folderMenuHTML);
  }
const modal = document.getElementById("paymentModal");
const status = document.getElementById("payStatus");

let selectedMethod = "";

// فتح الدفع
document.querySelector(".buy-btn").onclick = () => {
  modal.classList.add("active");
};

// قفل
function closePayment(){
  modal.classList.remove("active");
}

// اختيار طريقة
document.querySelectorAll(".pay-item").forEach(item=>{
  item.onclick = ()=>{
    selectedMethod = item.dataset.method;
    status.innerHTML = "تم اختيار: " + selectedMethod;
  };
});

// تأكيد
document.getElementById("confirmBtn").onclick = ()=>{

  if(!selectedMethod){
    status.innerHTML = "اختار طريقة الدفع";
    return;
  }

  status.innerHTML = "تم الطلب بنجاح";

  window.open("https://wa.me/201066047545","_blank");
};


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('paymentModal');
    const payStatus = document.getElementById('payStatus');
    const serviceTitle = document.getElementById('serviceTitle');
    const copyBtn = document.getElementById('copyBtn');
    const payNumberInput = document.getElementById('payNumber');
    
    let currentService = "";
    let currentPrice = "";
    let selectedMethod = "";
    let copyTime = 0;
    let timerInterval;

    const numbers = {
        "فودافون كاش": "01066047545",
        "أورنج كاش": "01285895096",
        "وي كاش": "01558516081",
        "PayPal": "Farajbdallh"
    };

    // فتح المودال عند الضغط على أزرار الشراء
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener("click", () => {
            currentService = btn.dataset.service;
            currentPrice = btn.dataset.price;
            serviceTitle.innerHTML = `الخدمة: ${currentService} <br> السعر: ${currentPrice} جنيه`;
            modal.classList.add('active');
            payStatus.innerHTML = "";
        });
    });

    // قفل المودال
    window.closePayment = () => {
        modal.classList.remove('active');
        clearInterval(timerInterval);
    };

    // اختيار طريقة الدفع
    document.querySelectorAll('.pay-item').forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll('.pay-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedMethod = item.dataset.method;
            
            if(selectedMethod === "PayPal") {
                document.getElementById('normalPayment').style.display = "none";
                document.getElementById('paypalPayment').style.display = "block";
            } else {
                document.getElementById('normalPayment').style.display = "block";
                document.getElementById('paypalPayment').style.display = "none";
                payNumberInput.value = numbers[selectedMethod];
            }
        });
    });

    // زر النسخ والتايمر
    copyBtn.addEventListener("click", () => {
        if(!payNumberInput.value) return alert("اختار طريقة الدفع أولاً");
        navigator.clipboard.writeText(payNumberInput.value);
        copyTime = Date.now();
        let timeLeft = 300; // 5 دقائق

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            if(timeLeft > 0) {
                payStatus.style.color = "blue";
                payStatus.innerHTML = `✅ تم النسخ. متبقي ${timeLeft} ثانية لإتمام التحويل.`;
            } else {
                clearInterval(timerInterval);
                payStatus.style.color = "red";
                payStatus.innerHTML = "❌ انتهى الوقت، يرجى النسخ مجدداً.";
                copyTime = 0;
            }
        }, 1000);
    });

    // تأكيد الدفع
    document.getElementById('confirmBtn').addEventListener("click", () => {
        const userNum = document.getElementById('userNumber').value;
        const file = document.getElementById('payProof').files[0];

        if(!copyTime) return alert("يجب نسخ الرقم أولاً!");
        if(!userNum || !file) return alert("أكمل البيانات وارفع الصورة!");

        payStatus.innerHTML = "⏳ جاري التحقق...";
        setTimeout(() => {
            payStatus.style.color = "green";
            payStatus.innerHTML = "✅ تم الإرسال بنجاح! سيتم تحويلك للواتساب.";
            const msg = `طلب اشتراك: ${currentService}\nالرقم المحول منه: ${userNum}\nالطريقة: ${selectedMethod}`;
            window.open(`https://wa.me/201066047545?text=${encodeURIComponent(msg)}`, '_blank');
        }, 2000);
    });
});
