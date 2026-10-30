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
  document.querySelectorAll('form[data-subscribe="true"]').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=form.querySelector('.sub-msg'),btn=form.querySelector('button[type="submit"]'),orig=btn?btn.textContent:'';
      var hp=form.querySelector('[name="_gotcha"]'); if(hp&&hp.value)return;
      if(btn){btn.disabled=true;btn.textContent='Sending';}
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
        .then(function(r){if(!r.ok)throw new Error('failed');if(msg){msg.textContent='Thanks, you\u2019re on the list.';msg.className='sub-msg ok';}form.reset();})
        .catch(function(){if(msg){msg.textContent='That didn\u2019t go through. Please try again, or email d_zohal@datasanj.com.';msg.className='sub-msg bad';}})
        .then(function(){if(btn){btn.disabled=false;btn.textContent=orig;}});
    });
  });
})();

// Share buttons: copy link + count share clicks in GoatCounter
document.addEventListener('click',function(e){
  var el=e.target.closest&&e.target.closest('[data-share]');if(!el)return;
  var k=el.getAttribute('data-share'),box=el.closest('.te-share'),slug=box?box.getAttribute('data-slug'):location.pathname;
  try{if(window.goatcounter&&window.goatcounter.count){window.goatcounter.count({path:'share-'+k+'-'+slug,title:'Share '+k+': '+slug,event:true});}}catch(_){}
  if(k==='copy'){e.preventDefault();var u=el.getAttribute('data-url')||location.href;var lab=el.querySelector('span');
    var done=function(){if(lab){var o=lab.textContent;lab.textContent='Copied';setTimeout(function(){lab.textContent=o},1800);}};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(done,done);}else{var t=document.createElement('textarea');t.value=u;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(_){}document.body.removeChild(t);done();}}
});

// Sticky "Book a free call" bar on phones (not on Contact)
(function(){
  if(/Contact\.html$/i.test(location.pathname))return;
  var bar=document.createElement('div');bar.className='m-cta';
  var pg=location.pathname.split('/').pop(),
    mp={'month-end-reporting-automation.html':['Month-end%20reporting','free-guides.html#me','Free checklist'],
        'multi-site-reporting.html':['Comparing%20sites','tel:+61435916536','Call Zohal'],
        'microsoft-fabric-for-small-business.html':['Data%20ready%20for%20AI','ai-ready-scorecard.html','Is your data AI-ready?']},
    c=mp[pg]||['', 'tel:+61435916536','Call Zohal'];
  bar.innerHTML='<a href="Contact.html'+(c[0]?'?topic='+c[0]:'')+'" class="btn btn-primary" data-share="sticky-call">Book a free call</a><a href="'+c[1]+'" class="m-cta-2">'+c[2]+'</a>';
  document.body.appendChild(bar);
  var shown=false;window.addEventListener('scroll',function(){var s=window.scrollY>420;if(s!==shown){shown=s;bar.classList.toggle('show',s);}},{passive:true});
})();

/* Pre-tick a topic on the contact form from ?topic= */
(function(){try{var t=new URLSearchParams(location.search).get('topic');if(!t)return;
document.querySelectorAll('input[name="topics"]').forEach(function(c){if(c.value===t)c.checked=true;});}catch(e){}})();
