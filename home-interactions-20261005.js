
  (function() {
    // Les avis sont déjà présents dans le HTML (liste <ul id="carTrack">) : ce script
    // se contente de transformer cette liste statique en carrousel, sans jamais générer
    // le contenu lui-même. Si JavaScript est désactivé, la liste reste lisible normalement.
    var track = document.getElementById('carTrack');
    var cards = track ? Array.prototype.slice.call(track.querySelectorAll('.rv-card')) : [];
    var dots = document.getElementById('carDots');
    var cur = 0;
    var carrouselActif = false;

    function pp() {
      return window.innerWidth < 700 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }

    function cardW() {
      var vp = track.parentElement.offsetWidth;
      return (vp / pp()) - 12;
    }

    function activerCarrousel() {
      if (!track || !cards.length) return;
      carrouselActif = true;
      track.style.display = 'flex';
      var cw = cardW();
      cards.forEach(function(d) { d.style.minWidth = cw + 'px'; d.style.width = cw + 'px'; });
      dots.innerHTML = '';
      var pages = Math.ceil(cards.length / pp());
      for (var i = 0; i < pages; i++) {
        var btn = document.createElement('button');
        btn.style.cssText = 'width:8px;height:8px;border-radius:4px;border:none;background:rgba(0,0,0,.15);cursor:pointer;padding:0;transition:background-color .2s';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Afficher le groupe d\'avis ' + (i + 1));
        btn.setAttribute('data-p', i);
        btn.onclick = function() { goTo(parseInt(this.getAttribute('data-p'))); };
        dots.appendChild(btn);
      }
      updatePos();
    }

    function updatePos() {
      if (!carrouselActif) return;
      var cw = cardW() + 12;
      track.style.transform = 'translateX(-' + (cur * cw) + 'px)';
      var pg = Math.floor(cur / pp());
      document.querySelectorAll('#carDots button').forEach(function(b, i) {
        b.style.background = i === pg ? '#00B4EC' : 'rgba(0,0,0,.15)';
        b.style.width = i === pg ? '24px' : '8px';
      });
    }

    document.getElementById('carPrevBtn').addEventListener('click', function() {
      cur = Math.max(0, cur - pp());
      updatePos();
    });

    document.getElementById('carNextBtn').addEventListener('click', function() {
      cur = Math.min(Math.max(0, cards.length - pp()), cur + pp());
      updatePos();
    });

    window.goTo = function(p) {
      cur = p * pp();
      updatePos();
    };

    window.addEventListener('load', activerCarrousel);
    window.addEventListener('resize', function() { cur = 0; activerCarrousel(); });
  })();
  
;

    // Web App Google Apps Script (script.google.com) déployée sous le compte
    // guillaume.roque@iadfrance.fr : reçoit le formulaire et envoie l'e-mail
    // directement, sans passer par la messagerie du visiteur.
    var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzU-4t-ANgQ-DhKVK5834dXPIhYZXdOrwiUwZshaL4_Hb4RSIRUFrz9dMJ4eyU2kzofLQ/exec';

    var formesDejaDemarrees = {};
    // Seuls les evenements de la liste controlee (section 15 de l'audit) sont emis ici :
    // le formulaire guide n'a pas d'evenement "start" dedie, seulement 'download_seller_guide' au succes.
    var NOMS_EVT_DEBUT = { estimation: 'estimate_form_start', contact: 'contact_form_start' };
    function suivreDebutFormulaire(contexte) {
      if (formesDejaDemarrees[contexte]) return;
      formesDejaDemarrees[contexte] = true;
      var nomEvt = NOMS_EVT_DEBUT[contexte];
      if (nomEvt && typeof trackEvent === 'function') trackEvent(nomEvt, {form_type: contexte});
    }

    // Consentement au rappel telephonique (article L.223-2 du Code de la consommation,
    // en vigueur depuis le 11/08/2026, source Legifrance) : le canal de contact choisi
    // conditionne le caractere obligatoire du telephone et de la case de consentement.
    // Aucune case non cochee n'est jamais interpretee comme un consentement.
    function majCanalContact(form) {
      var choix = form.querySelector('[name=canal_contact]:checked');
      var canal = choix ? choix.value : '';
      var champTel = form.querySelector('[name=telephone]');
      var blocConsent = form.querySelector('.bloc-consent-tel');
      var caseConsent = form.querySelector('[name=consent_telephone]');
      var estTelephone = canal === 'telephone';
      if (champTel) champTel.required = estTelephone;
      if (blocConsent) blocConsent.style.display = estTelephone ? '' : 'none';
      if (caseConsent) {
        caseConsent.required = estTelephone;
        if (!estTelephone) caseConsent.checked = false;
      }
    }

    async function envoyerMail(e, contexte) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('button[type=submit]');
      var note = form.querySelector('.fnote');

      // Anti-spam : champ honeypot invisible pour un visiteur humain.
      // Un bot qui remplit tous les champs remplira aussi celui-ci ; on
      // abandonne alors silencieusement, sans requete reseau.
      var piege = form.querySelector('[name=site_web]');
      if (piege && piege.value) { return false; }

      var nom = form.querySelector('[name=nom]') ? form.querySelector('[name=nom]').value : '';
      var email = form.querySelector('[name=email]') ? form.querySelector('[name=email]').value : '';
      var tel = form.querySelector('[name=telephone]') ? form.querySelector('[name=telephone]').value : '';
      var secteur = form.querySelector('[name=secteur]') ? form.querySelector('[name=secteur]').value : '';
      var typebien = form.querySelector('[name=typebien]') ? form.querySelector('[name=typebien]').value : '';
      var message = form.querySelector('[name=message]') ? form.querySelector('[name=message]').value : '';
      var canalChoisi = form.querySelector('[name=canal_contact]:checked');
      var canal = canalChoisi ? canalChoisi.value : '';
      var caseConsentTel = form.querySelector('[name=consent_telephone]');
      var consentTel = (caseConsentTel && caseConsentTel.checked) ? 'oui' : 'non';
      var sujet = contexte === 'guide' ? 'Demande du guide vendeur - Narbonne' : 'Projet de vente a Narbonne';
      var corps = 'Nom : ' + nom + '\nTelephone : ' + tel + '\nEmail : ' + email
        + (canal ? '\nCanal de contact souhaite : ' + (canal === 'telephone' ? 'Telephone' : 'Email') : '')
        + '\nConsentement rappel telephonique : ' + (consentTel === 'oui' ? 'Oui' : 'Non')
        + (secteur ? '\nSecteur : ' + secteur : '')
        + (typebien ? '\nType de bien : ' + typebien : '')
        + (message ? '\nMessage : ' + message : '');

      function envoyerParMailto() {
        window.location.href = 'mailto:guillaume.roque@iadfrance.fr?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);
      }

      // Si l'URL du script n'est pas configurée, on garde l'ancien
      // comportement (ouverture de la messagerie) pour ne rien casser.
      if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.indexOf('REMPLACER') === 0) {
        envoyerParMailto();
        return false;
      }

      var texteOriginal = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours...'; }

      try {
        var fd = new FormData();
        fd.append('contexte', contexte);
        fd.append('nom', nom);
        fd.append('email', email);
        fd.append('telephone', tel);
        fd.append('secteur', secteur);
        fd.append('typebien', typebien);
        fd.append('message', message);
        if (canal) fd.append('canal_contact', canal);
        fd.append('consent_telephone', consentTel);
        if (consentTel === 'oui') {
          // Preuve tracable du consentement : horodatage ISO, page d'origine et
          // version du texte de consentement affiche au moment de la collecte.
          fd.append('consent_timestamp', new Date().toISOString());
          fd.append('consent_source', window.location.href);
          fd.append('consent_text_version', '2026-08');
        }
        // FormData evite le preflight CORS (multipart/form-data est "safelisted").
        // On lit la vraie reponse JSON renvoyee par Apps Script ({success:true/false})
        // pour n'afficher le message de succes qu'apres confirmation reelle.
        var resp = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: fd });
        var data = null;
        try { data = await resp.json(); } catch (e2) { data = null; }
        if (!resp.ok || !data || data.success !== true) { throw new Error('reponse serveur invalide'); }
        form.reset();
        if (typeof majCanalContact === 'function') majCanalContact(form); // reinitialise l'affichage du bloc de consentement apres reset()
        if (typeof trackEvent === 'function') {
          // Aucune donnee personnelle (nom, email, telephone) n'est transmise a la mesure d'audience.
          var nomEvtSucces = contexte === 'estimation' ? 'estimate_form_success' : (contexte === 'guide' ? 'download_seller_guide' : 'contact_form_success');
          trackEvent(nomEvtSucces, {form_type: contexte});
          // Evenement de conversion standard GA4, envoye uniquement ici, apres
          // confirmation reelle du serveur (data.success === true ci-dessus) —
          // jamais sur une erreur d'envoi.
          trackEvent('generate_lead', {lead_source: contexte, form_type: contexte});
        }
        if (btn) { btn.textContent = 'Message envoyé ✓'; }
        if (note) {
          note.textContent = 'Merci ' + (nom || '') + ', votre demande a bien été transmise à Guillaume. Il vous répond personnellement sous 24h — ou appelez directement le ';
          var telLink = document.createElement('a');
          telLink.href = 'tel:+33662108396';
          telLink.style.color = 'inherit';
          telLink.style.textDecoration = 'underline';
          telLink.textContent = '06 62 10 83 96';
          note.appendChild(telLink);
          note.appendChild(document.createTextNode('.'));
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = texteOriginal; }
        if (note) { note.textContent = "L'envoi automatique a rencontré un problème : votre messagerie s'ouvre avec votre demande pré-remplie, il ne vous reste qu'à l'envoyer. Vous pouvez aussi appeler directement le 06 62 10 83 96."; }
        envoyerParMailto();
      }
      return false;
    }
    
;

var GA4_MEASUREMENT_ID = 'G-DXS5R3BPDY'; // identifiant fourni par Guillaume le 14/08/2026 — charge uniquement apres consentement (voir loadGA4())
var CONSENT_KEY = 'consent_mesure_audience';
var CONSENT_DUREE_MS = 183 * 24 * 60 * 60 * 1000; // ~6 mois — passé ce délai, le choix expire et est redemandé

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('consent', 'default', { analytics_storage: 'denied' }); // mode Consent par défaut : refusé tant que non accepté explicitement

function trackEvent(nom, params) {
  // Appel officiel gtag('event', ...) : le site charge gtag.js directement
  // (sans conteneur Google Tag Manager), donc un simple dataLayer.push()
  // d'un objet ne produit aucun envoi reel. On repasse par window.gtag(),
  // et on revalide le consentement a chaque appel (pas seulement au chargement).
  var consentement = lireConsentement();
  if (!consentement || consentement.choice !== 'accepted') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', nom, params || {});
}

function lireConsentement() {
  try {
    var brut = localStorage.getItem(CONSENT_KEY);
    if (!brut) return null;
    var data = JSON.parse(brut);
    if (!data || !data.expiresAt || Date.now() > Date.parse(data.expiresAt)) return null; // choix expiré : on redemande
    return data;
  } catch (e) { return null; }
}

function ecrireConsentement(choice) {
  var maintenant = new Date();
  var expiration = new Date(maintenant.getTime() + CONSENT_DUREE_MS);
  var data = { choice: choice, date: maintenant.toISOString(), expiresAt: expiration.toISOString() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); } catch (e) {}
  return data;
}

function supprimerCookiesAnalytics() {
  // Retire les cookies Google Analytics accessibles en JS (_ga, _ga_<container-id>, _gid)
  document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); })
    .filter(function (n) { return n === '_gid' || n.indexOf('_ga') === 0; })
    .forEach(function (n) {
      document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname + ';';
    });
}

function loadGA4() {
  if (!GA4_MEASUREMENT_ID) return;
  // Toujours remettre le consentement a jour, meme si le script est deja charge :
  // sinon le scenario accepter -> retirer -> re-accepter sur la meme page (sans
  // recharger) restait bloque avant la mise a jour du consentement.
  gtag('consent', 'update', { analytics_storage: 'granted' });
  if (window.__ga4Loaded) return; // empeche un second chargement du script (ex. double clic, appel repete)
  window.__ga4Loaded = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, { anonymize_ip: true });
}

function majInterfaceConsentement() {
  var data = lireConsentement();
  var elStatut = document.getElementById('consentStatutTexte');
  var btnRetirer = document.getElementById('consentBtnRetirer');
  if (!elStatut) return;
  if (!GA4_MEASUREMENT_ID) {
    elStatut.textContent = "Google Analytics 4 n'est pas actif actuellement. La mesure technique Cloudflare fonctionne sans cookie.";
    if (btnRetirer) btnRetirer.style.display = 'none';
  } else if (data && data.choice === 'accepted') {
    elStatut.textContent = 'Mesure d\'audience acceptée le ' + new Date(data.date).toLocaleDateString('fr-FR') + '.';
    if (btnRetirer) btnRetirer.style.display = 'inline-block';
  } else if (data && data.choice === 'denied') {
    elStatut.textContent = 'Mesure d\'audience refusée le ' + new Date(data.date).toLocaleDateString('fr-FR') + '.';
    if (btnRetirer) btnRetirer.style.display = 'none';
  } else {
    elStatut.textContent = 'Aucun choix enregistré pour le moment.';
    if (btnRetirer) btnRetirer.style.display = 'none';
  }
}

function setConsent(accepte) {
  ecrireConsentement(accepte ? 'accepted' : 'denied');
  var banniere = document.getElementById('cookieBanner');
  if (banniere) banniere.style.display = 'none';
  if (accepte) {
    loadGA4();
  } else {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    supprimerCookiesAnalytics();
  }
  majInterfaceConsentement();
}

function retirerConsentement() {
  ecrireConsentement('denied');
  gtag('consent', 'update', { analytics_storage: 'denied' });
  supprimerCookiesAnalytics();
  majInterfaceConsentement();
  var banniere = document.getElementById('cookieBanner');
  if (banniere) banniere.style.display = 'none';
}

function ouvrirGestionCookies() {
  majInterfaceConsentement();
  var banniere = document.getElementById('cookieBanner');
  if (banniere) banniere.style.display = 'block';
  return false;
}

(function initConsentement() {
  var data = lireConsentement();
  var banniere = document.getElementById('cookieBanner');
  if (data && data.choice === 'accepted') {
    if (banniere) banniere.style.display = 'none';
    loadGA4();
  } else if (data && data.choice === 'denied') {
    if (banniere) banniere.style.display = 'none';
  } else if (!data && GA4_MEASUREMENT_ID) {
    if (banniere) banniere.style.display = 'block';
  } else if (banniere) {
    banniere.style.display = 'none';
  }
  majInterfaceConsentement();
  if (location.hash === '#cookies') { ouvrirGestionCookies(); }
})();

// Suivi du 1er focus dans un formulaire (remplace les attributs inline onfocusin)
document.addEventListener('focusin', function (e) {
  var f = e.target.closest('form');
  if (!f) return;
  if (f.id === 'fm-guide') suivreDebutFormulaire('guide');
  else if (f.id === 'fm') suivreDebutFormulaire('contact');
});
