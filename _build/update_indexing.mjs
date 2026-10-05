// Keep the public sitemap, internal links and permanent URL redirects consistent.
// Technical, legal and unfinished pages retain their existing noindex directives.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://immobiliernarbonne.com';
const merged = new Map([['/conseils/guide-2-vendre', '/vendre-bien-narbonne']]);
const today = new Date().toISOString().slice(0, 10);
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const write = (name, value) => { if (!fs.existsSync(path.join(root,name)) || read(name) !== value) fs.writeFileSync(path.join(root,name), value); };
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const names = [...fs.readdirSync(root).filter(n => n.endsWith('.html')), ...fs.readdirSync(path.join(root,'conseils')).filter(n => n.endsWith('.html')).map(n => 'conseils/'+n)].sort();
const pages = names.flatMap(name => {
 const html = read(name);
 if (!/<head\b/i.test(html)) return []; // Domain-verification files are not pages.
 const route = name === 'index.html' ? '/' : name.endsWith('/index.html') ? '/'+name.slice(0,-10) : '/'+name.slice(0,-5);
 const excluded = /<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*noindex/i.test(html);
 return [{name, route, html, original:html, excluded: excluded || merged.has(route)}];
});
const active = pages.filter(p => !p.excluded);
const aliases = new Map();
for (const p of pages.filter(p => p.name !== '404.html')) {
 const target = merged.get(p.route) || p.route;
 if (merged.has(p.route)) aliases.set(p.route,target);
 aliases.set('/'+p.name,target);
 if (p.route !== '/') aliases.set(p.route.endsWith('/') ? p.route.slice(0,-1) : p.route+'/',target);
}
const groups = [
 ['guide-3-acheter','acheter-appartement-copropriete-narbonne','vendre-bien-succession-narbonne','guide-2-vendre'],
 ['guide-2-vendre','article-erreurs-vente-narbonne','erreurs-qui-ralentissent-vente-narbonne','article-delai-vente-narbonne','diagnostics-vente-narbonne','vendre-bien-succession-narbonne'],
 ['article-juste-prix','juste-prix-maison-narbonne','combien-vaut-maison-narbonne','article-narbonne','article-quartiers-narbonne'],
 ['article-aude','article-narbonne','article-carcassonne','article-lezignan','article-minervois','article-quarante'],
 ['article-beziers','article-herault-hauts-cantons','article-pezenas','article-saint-chinian','article-saint-pons','article-sete','barometre-immobilier-narbonne-minervois']
];
const titles = new Map(active.map(p => [p.route,(p.html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || p.html.match(/<title>(.*?)<\/title>/i)?.[1] || p.route).replace(/<[^>]*>/g,'').trim()]));
const byRoute = new Map(active.map(p => [p.route,p]));
for (const p of pages) {
 let html = p.html;
 if (merged.has(p.route)) {
  html = html.replace(/<link\b[^>]*>/gi, tag => attr(tag,'rel') === 'canonical' ? `<link rel="canonical" href="${origin+merged.get(p.route)}">` : tag);
 }
 if (p.route === '/vendre-bien-narbonne' && !html.includes('id="guide-vendeur-pratique"')) {
  const guide = `<section class="section wrap" id="guide-vendeur-pratique" aria-labelledby="guide-vendeur-title">
  <h2 id="guide-vendeur-title">Le guide pratique pour préparer votre vente</h2>
  <h3>Préparer le bien avant les photos et les visites</h3>
  <ul><li>Désencombrer les pièces pour permettre aux acquéreurs d'en apprécier les volumes.</li><li>Réparer les petits défauts visibles : poignée, joint, ampoule ou robinetterie.</li><li>Soigner la lumière, ouvrir les volets et choisir un créneau adapté aux visites.</li><li>Présenter des photos fidèles au logement afin que la visite corresponde à ce qui a été annoncé.</li></ul>
  <h3>Distinguer commercialisation et préparation de la signature</h3>
  <p>La commercialisation va de la diffusion de l'annonce à l'offre acceptée. Le positionnement du prix, la présentation du bien, la qualité du dossier et les retours de visite permettent d'ajuster la démarche.</p>
  <p>Après l'accord, le calendrier dépend notamment du financement, des documents à réunir et des démarches suivies avec le notaire. Le délai s'apprécie donc selon le dossier, sans durée garantie.</p>
  <h3>Les repères pour avancer</h3>
  <ul><li><a href="/conseils/combien-vaut-maison-narbonne">Comprendre les critères d'estimation de votre bien</a></li><li><a href="/conseils/diagnostics-vente-narbonne">Préparer les diagnostics et le dossier de vente</a></li><li><a href="/conseils/erreurs-qui-ralentissent-vente-narbonne">Éviter les erreurs qui ralentissent la commercialisation</a></li></ul>
  </section>`;
  html = html.replace('</main>',guide+'</main>');
 }
 if (!p.excluded) {
  const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].filter(m => attr(m[0],'rel') === 'canonical');
  if (canonicals.length !== 1 || attr(canonicals[0][0],'href') !== origin+p.route) throw new Error('Unexpected canonical: '+p.name);
 }
 html = html.replace(/<a\b[^>]*>/gi, tag => {
  const href = attr(tag,'href');
  if (!href || /^(?:mailto:|tel:|javascript:|#)/i.test(href)) return tag;
  const url = new URL(href,origin+p.route);
  if (url.origin === 'https://tribu-immo.com' && /^\/article-aude(?:\.html)?$/.test(url.pathname)) return tag.replace(href,'/conseils/article-aude'+url.search+url.hash);
  if (url.origin !== origin) return tag;
  const target = aliases.get(url.pathname);
  return target ? tag.replace(href,target+url.search+url.hash) : tag;
 });
 if (p.name === 'conseils/index.html' && !html.includes('href="/conseils/vendre-bien-succession-narbonne"')) {
  const item = '<li><a href="/conseils/vendre-bien-succession-narbonne">Vendre un bien après une succession à Narbonne : les étapes</a></li>';
  const end = html.lastIndexOf('</ul>',html.indexOf('</main>'));
  if (end < 0) throw new Error('Advice index list not found');
  html = html.slice(0,end)+item+html.slice(end);
 }
 if (!p.excluded && p.name.startsWith('conseils/') && p.name !== 'conseils/index.html') {
  html = html.replace(/<!-- related-indexing:start -->[\s\S]*?<!-- related-indexing:end -->/g,'');
  const slug = p.name.slice(9,-5);
  const group = groups.find(g => g.includes(slug)) || groups[1];
  const candidates = [...group, ...groups[0]].map(s => '/conseils/'+s).filter((route,i,a) => route !== p.route && byRoute.has(route) && a.indexOf(route)===i).slice(0,3);
  const section = '<!-- related-indexing:start --><section class="wrap" aria-labelledby="related-guides-title"><h2 id="related-guides-title">Pour poursuivre votre projet immobilier</h2><ul>'+candidates.map(route => `<li><a href="${route}">${titles.get(route)}</a></li>`).join('')+'</ul><p><a href="/conseils/">Tous les conseils immobiliers</a></p></section><!-- related-indexing:end -->';
  html = html.replace('</main>',section+'</main>');
 }
 p.html = html;
 write(p.name,html);
}
// Explicit 301s replace the implicit temporary HTML redirects for known pages.
const marker = '# BEGIN GENERATED INDEXING REDIRECTS';
let redirects = read('_redirects').split(marker)[0].trimEnd();
const existing = new Set(redirects.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.trim().split(/\s+/)[0]));
const added = [...aliases].filter(([source,target]) => source!==target && !existing.has(source)).sort(([a],[b]) => a.localeCompare(b));
write('_redirects',redirects+'\n\n'+marker+'\n'+added.map(([source,target]) => `${source} ${target} 301`).join('\n')+'\n');
const stateFile = '_build/indexing-state.json';
const state = fs.existsSync(path.join(root,stateFile)) ? JSON.parse(read(stateFile)) : {};
const historic = new Map([...read('sitemap.xml').matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => [m[1].match(/<loc>(.*?)<\/loc>/)?.[1],m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1]]));
for (const p of active) {
 const sha256 = crypto.createHash('sha256').update(p.html).digest('hex');
 const previous = state[p.name];
 const lastmod = previous ? (previous.sha256===sha256 ? previous.lastmod : today) : (p.html!==p.original ? today : historic.get(origin+p.route));
 state[p.name] = {sha256,...(lastmod ? {lastmod} : {})};
}
write(stateFile,JSON.stringify(state,null,2)+'\n');
write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+active.map(p => '  <url><loc>'+escape(origin+p.route)+'</loc>'+(state[p.name].lastmod ? '<lastmod>'+state[p.name].lastmod+'</lastmod>' : '')+'</url>').join('\n')+'\n</urlset>\n');
console.log(`Indexing: ${active.length} public URLs, ${pages.length-active.length} deliberate exclusions, ${added.length} additional permanent redirects.`);
