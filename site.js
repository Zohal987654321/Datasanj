/* DATASANJ — shared behaviour */
(function(){
  'use strict';
  var btn=document.querySelector('.nav-toggle'),menu=document.getElementById('nav-menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){var o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
  }
  document.querySelectorAll('img[data-fallback]').forEach(function(img){
    img.addEventListener('error',function(){img.style.display='none';var f=document.getElementById(img.getAttribute('data-fallback'));if(f)f.style.display='flex';});
  });
  document.querySelectorAll('.media img').forEach(function(img){
    img.addEventListener('error',function(){var m=img.closest('.media');if(m)m.classList.add('is-empty');});
  });
  document.querySelectorAll('form[data-ajax="true"]').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=form.querySelector('.success'),submit=form.querySelector('button[type="submit"]'),orig=submit?submit.textContent:'';
      if(submit){submit.disabled=true;submit.textContent='Sending';}
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
        .then(function(r){if(!r.ok)throw new Error('failed');if(msg){msg.textContent='Sent. You will hear back within two business days.';msg.classList.add('show');msg.scrollIntoView({behavior:'smooth',block:'center'});}form.reset();})
        .catch(function(){if(msg){msg.textContent='That did not send. Email d_zohal@datasanj.com directly and it will be picked up.';msg.classList.add('show');}})
        .then(function(){if(submit){submit.disabled=false;submit.textContent=orig;}});
    });
  });
})();
