// Размер L в архиве соответствует квадратному слоту Medium на стенде.
const products = [
  ['bills','Платежи','Платите ЖКУ','0% комиссии'],
  ['referral','Реферальная программа','До 4000 баллов за друга','Приглашайте в РСХБ'],
  ['home','Страховки','Страхование жилья','Защита от БПЛА, пожар и взломов'],
  ['loan','Кредит','Кредит наличными','Онлайн ставка ниже на 2,4% - 6,4%'],
  ['saving','НС','Накопить на мечту','До 14% годовых по счёту']
];
const modes=by('referenceMode'), drafts=new Map(); let current;
function material(id, sz, kind){const url=`assets/examples/${id}/${sz}-${kind}.${kind==='bg'?'png':'webp'}`;return {url,name:{bg:'фон примера',anim:'анимированный WebP',still:'первый кадр'}[kind],type:kind==='bg'?'image/png':'image/webp'};}
function choose(entry){
 if(current) drafts.set(current[0],{title:by('title').value,desc:by('desc').value,small:assets.small,medium:assets.medium});
 current=entry;const [id,label,title,desc]=entry, saved=drafts.get(id);
 by('title').value=saved?.title??title;by('desc').value=saved?.desc??desc;
 for(const sz of ['small','medium']){assets[sz]=saved?.[sz]??{};if(!assets[sz].file?.url.startsWith('blob:'))assets[sz].file=material(id,sz,modes.value);assets[sz].bg??=material(id,sz,'bg');}
 for(const b of by('products').children)b.setAttribute('aria-pressed',b.dataset.product===id);
 wrap.hidden=false;by('restore').hidden=true;render();note(label+' · готовый пример');
}
for(const entry of products){const btn=document.createElement('button'),img=new Image();btn.type='button';btn.dataset.product=entry[0];img.src=material(entry[0],'medium','still').url;img.alt='';btn.append(img,entry[1]);btn.onclick=()=>choose(entry);by('products').append(btn);}
modes.onchange=()=>{for(const sz of ['small','medium']){const f=assets[sz].file;if(f?.url.startsWith('blob:'))URL.revokeObjectURL(f.url);assets[sz].file=material(current[0],sz,modes.value);}render();};
by('clear').textContent='Вернуть материалы примера';by('clear').onclick=()=>{const sz=size();Object.values(assets[sz]).filter(x=>x.url.startsWith('blob:')).forEach(x=>URL.revokeObjectURL(x.url));assets[sz]={file:material(current[0],sz,modes.value),bg:material(current[0],sz,'bg')};render();};
if(matchMedia('(prefers-reduced-motion: reduce)').matches)modes.value='still';choose(products[0]);
