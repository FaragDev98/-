// ================= البوب أب (عنّي) =================

// فتح البوب أب
function openAbout(){
  document.getElementById("aboutPopup").style.display = "flex";
}

// قفل البوب أب (زر ×)
function closeAbout(){
  document.getElementById("aboutPopup").style.display = "none";
}
// ================= فيديوهات أوتو بلاي ذكية =================

// متغير يخلي فيديو واحد بس شغال
let currentVideo = null;

// جلب كل الفيديوهات (سواء video أو iframe)
const allVideos = document.querySelectorAll("video, iframe");

// المراقب
const autoPlayObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{

    const el = entry.target;

    // ================= لو VIDEO =================
    if(el.tagName === "VIDEO"){

      if(entry.isIntersecting){

        // وقف أي فيديو تاني
        if(currentVideo && currentVideo !== el){
          currentVideo.pause();
        }

        el.play().catch(()=>{});
        currentVideo = el;

      }else{
        el.pause();
      }
    }

    // ================= لو YouTube iframe =================
    if(el.tagName === "IFRAME"){

      if(entry.isIntersecting){

        el.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );

      }else{

        el.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );

      }
    }

  });
},{
  threshold:0.6 // لازم يظهر 60%
});


// ربط كل الفيديوهات
allVideos.forEach(v=>{
  autoPlayObserver.observe(v);
});


// ================= زر الاشتراك =================

// أزرار السوشيال
document.querySelectorAll(".social-btn").forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.preventDefault(); // منع فتح الرابط مباشرة
    this.classList.add("done");
    this.querySelector("span").innerText = "✔ تم";

    // فتح الرابط بعد ثانية
    setTimeout(()=>{
      window.open(this.href,"_blank");
    },1000);
  });
});

// زر يوتيوب
document.querySelectorAll(".follow-btn").forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.preventDefault();

    const popup = window.open(this.href, "subscribe", "width=500,height=600");

    this.classList.add("done");
    this.querySelector("span").innerText = "✔ تم الضغط";

    // متابعة غلق النافذة
    const timer = setInterval(()=>{
      if(popup.closed){
        clearInterval(timer);
        alert("تم الرجوع للموقع");
      }
    },500);
  });
});


// ================= الفيديو الذكي =================

// متغير عشان يمنع تشغيل أكتر من فيديو
let currentMedia = null;

// جلب الفيديوهات
const videos = document.querySelectorAll('.service-video');

// مراقب الظهور
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video = entry.target;

    if(video.tagName !== "VIDEO") return;

    if(entry.isIntersecting){

      // إيقاف أي فيديو تاني
      if(currentMedia && currentMedia !== video){
        currentMedia.pause();
      }

      video.currentTime = 0;
      video.muted = false;
      video.play().catch(()=>{});

      currentMedia = video;

    }else{
      video.pause();
    }
  });
},{threshold:0.6});

// ربط الفيديوهات
videos.forEach(v=>{
  observer.observe(v);
});


// ================= الدروس (فتح/قفل) =================

function toggleLesson(btn){
  const post = btn.closest(".post");
  const content = post.querySelector(".lesson-content");

  if(content.style.display === "block"){
    content.style.display = "none";
    btn.innerText = "عرض الدرس";
  }else{
    content.style.display = "block";
    btn.innerText = "إخفاء الدرس";
  }
}


// ================= الصوت =================

let currentAudio = null; // منع صوتين

function toggleAudio(btn){
  const post = btn.closest(".post");
  const audio = post.querySelector("audio");

  if(!audio) return;

  // وقف أي صوت تاني
  if(currentAudio && currentAudio !== audio){
    currentAudio.pause();
  }

  if(audio.paused){
    audio.play();
    btn.innerText = "إيقاف الصوت";
    currentAudio = audio;
  }else{
    audio.pause();
    btn.innerText = "تشغيل الصوت";
  }
}


// ================= تشغيل تلقائي للدروس =================

const lessonObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const post = entry.target;
    const media = post.querySelector("video, audio");

    if(!media) return;

    if(entry.isIntersecting){

      // وقف القديم
      if(currentMedia && currentMedia !== media){
        currentMedia.pause();
      }

      media.play().catch(()=>{});
      currentMedia = media;

    }else{
      media.pause();
    }
  });
},{threshold:0.6});

// ربط كل درس
document.querySelectorAll(".post").forEach(post=>{
  lessonObserver.observe(post);
});


// ================= الدفع =================

const modal=document.getElementById('paymentModal'); // نافذة الدفع
const status=document.getElementById('payStatus'); // الرسالة
const serviceTitle=document.getElementById('serviceTitle');

const normalBox=document.getElementById('normalPayment');
const paypalBox=document.getElementById('paypalPayment');

// أرقام الدفع
const numbers={
 "فودافون كاش":"01066047545",
 "أورنج كاش":"01285895096",
 "وي كاش":"01558516081",
 "PayPal":"Farajbdallh"
};


// ================= فتح الدفع =================

document.querySelectorAll('.buy-btn').forEach(btn=>{
 btn.addEventListener("click",()=>{

  currentService=btn.dataset.service;
  currentPrice=btn.dataset.price;

  serviceTitle.innerHTML =
  `${currentService} <br> السعر: ${currentPrice} جنيه`;

  modal.classList.add('active');

  status.innerHTML='';
  copyTime=0;

 });
});


// ================= قفل الدفع =================

window.closePayment = function(){
  modal.classList.remove('active');
};


// ================= اختيار طريقة الدفع =================

document.querySelectorAll('.pay-item').forEach(item=>{
 item.addEventListener("click",()=>{

  document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
  item.classList.add('selected');

  selectedMethod=item.dataset.method;

  if(selectedMethod === "PayPal"){
    normalBox.style.display="none";
    paypalBox.style.display="block";
  }else{
    normalBox.style.display="block";
    paypalBox.style.display="none";
    document.getElementById('payNumber').value = numbers[selectedMethod];
  }

  status.style.color="blue";
  status.innerHTML="📌 انسخ الرقم وادفع وارفع Screenshot";

 });
});


// ================= نسخ الرقم =================

const copyBtn = document.getElementById('copyBtn');

if(copyBtn){
 copyBtn.addEventListener("click",()=>{

  const val=document.getElementById('payNumber').value;

  if(!val){
    alert("اختار طريقة الدفع");
    return;
  }

  navigator.clipboard.writeText(val);

  copyTime = Date.now();

  status.style.color="blue";
  status.innerHTML="✅ تم النسخ";

 });
}


// ================= تأكيد الدفع =================

document.getElementById('confirmBtn').addEventListener("click",()=>{

 if(selectedMethod === "PayPal"){
   window.open("https://www.paypal.com",'_blank');
   return;
 }

 const payNumber=document.getElementById('payNumber').value.trim();
 const userNumber=document.getElementById('userNumber').value.trim();
 const file=document.getElementById('payProof').files[0];

 if(!copyTime){
  status.style.color="red";
  status.innerHTML="❌ لازم تنسخ الرقم الأول";
  return;
 }

 if(!selectedMethod || !userNumber || !file){
  status.style.color="red";
  status.innerHTML="❌ كمل البيانات";
  return;
 }

 status.style.color="green";
 status.innerHTML="✅ تم";

 window.open(
   `https://wa.me/201066047545`,
   '_blank'
 );

});


// ================= إعادة المحاولة =================

const retryBtn = document.getElementById('retryBtn');

retryBtn.addEventListener("click",()=>{
  document.getElementById('payNumber').value='';
  document.getElementById('userNumber').value='';
  document.getElementById('payProof').value='';
  
  document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
  
  normalBox.style.display="block";
  paypalBox.style.display="none";

  status.innerHTML='';
});


// ================= نص + صوت =================

// إظهار/إخفاء النص
function toggleText(id){
  const el = document.getElementById(id);

  if(el.style.display === "block"){
    el.style.display = "none";
  }else{
    el.style.display = "block";
  }
}

// ================= تحميل ملفات الملخص =================

function downloadFile(filePath){

  // إنشاء لينك وهمي
  const link = document.createElement("a");

  link.href = filePath;

  // يخليه يحمل بدل ما يفتح
  link.download = "";

  // ضغط تلقائي
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
