
(()=>{const b=document.body,m=document.querySelector('.menu-btn'),n=document.querySelector('.mobile-nav');if(m&&n){m.addEventListener('click',()=>{const o=m.getAttribute('aria-expanded')==='true';m.setAttribute('aria-expanded',String(!o));n.hidden=o;b.classList.toggle('menu-open',!o)});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.hidden=true;m.setAttribute('aria-expanded','false')}))}
document.querySelectorAll('[data-lead-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f),s=encodeURIComponent('Demande depuis immobilier-grand-narbonne.fr'),t=['Bonjour Mickael,','','Nouvelle demande depuis votre site :',`Nom : ${d.get('name')||''}`,`Téléphone : ${d.get('phone')||''}`,`E-mail : ${d.get('email')||''}`,`Secteur : ${d.get('sector')||''}`,`Type de bien : ${d.get('property')||''}`,'',d.get('message')?`Message : ${d.get('message')}`:''].filter(Boolean).join('\n');const st=f.querySelector('.form-status');if(st)st.textContent='Votre messagerie va s’ouvrir avec la demande préremplie.';location.href=`mailto:mickael.patini@iadfrance.fr?subject=${s}&body=${encodeURIComponent(t)}`}));
const c=document.querySelector('[data-filter-city]'),y=document.querySelector('[data-filter-type]'),cards=[...document.querySelectorAll('.listing-card')],count=document.querySelector('[data-listing-count]');function filter(){let v=0;cards.forEach(k=>{const ok=(!c||c.value==='all'||k.dataset.city===c.value)&&(!y||y.value==='all'||k.dataset.type.includes(y.value));k.hidden=!ok;if(ok)v++});if(count)count.textContent=`${v} bien${v>1?'s':''}`}c?.addEventListener('change',filter);y?.addEventListener('change',filter);filter();
const ban=document.querySelector('[data-cookie-banner]');if(ban&&!localStorage.getItem('ign-cookie-choice'))setTimeout(()=>ban.hidden=false,800);document.querySelectorAll('[data-cookie]').forEach(x=>x.addEventListener('click',()=>{localStorage.setItem('ign-cookie-choice',x.dataset.cookie);if(ban)ban.hidden=true}))})();


/* PropertyTips video modal */
(function(){
  const VIDEO_ID = "d-kWucxZf6I";
  function closeVideoModal(modal){
    if (!modal) return;
    modal.remove();
    document.body.style.overflow = "";
  }
  function openVideoModal(){
    if (document.querySelector(".propertips-video-modal")) return;
    const modal = document.createElement("div");
    modal.className = "propertips-video-modal";
    modal.innerHTML = `
      <div class="propertips-video-dialog" role="dialog" aria-modal="true" aria-label="Vidéo de présentation PropertyTips">
        <iframe
          class="propertips-video-frame"
          src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1"
          title="Vidéo de présentation PropertyTips"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowfullscreen></iframe>
        <button type="button" class="propertips-video-close" aria-label="Fermer la vidéo">×</button>
      </div>`;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeVideoModal(modal);
    });
    modal.querySelector(".propertips-video-close").addEventListener("click", () => closeVideoModal(modal));
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
  }
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-propertips-video]");
    if (!trigger) return;
    e.preventDefault();
    openVideoModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideoModal(document.querySelector(".propertips-video-modal"));
  });
})();
