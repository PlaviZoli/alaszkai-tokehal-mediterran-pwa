const BASE=3;

const groups=[
  {t:'Hal',a:[
    {id:'fish',name:'Alaszkai tőkehalfilé, kiolvasztva',g:500,shop:1},
    {id:'salt',name:'Só',g:2.25,kq:.5,ku:'tk'},
    {id:'pepper',name:'Frissen őrölt fekete bors',g:1,kq:.5,ku:'tk'},
    {id:'lemon',name:'Citromlé',g:22.5,kq:.5,ku:'citrom',special:'lé',shop:1},
    {id:'zest',name:'Reszelt citromhéj',text:'ízlés szerint',optional:1}
  ]},
  {t:'Mediterrán zöldségalap',a:[
    {id:'tomato',name:'Paradicsom',g:300,shop:1},
    {id:'paprika',name:'Kápia vagy piros kaliforniai paprika',g:150,kq:1,ku:'nagyobb db',shop:1},
    {id:'onion',name:'Vörös- vagy lilahagyma',g:100,kq:1,ku:'kisebb db',shop:1},
    {id:'garlic',name:'Fokhagyma',g:11,kq:3,ku:'gerezd',shop:1},
    {id:'olive',name:'Magozott olívabogyó',g:60,shop:1},
    {id:'oil',name:'Extra szűz olívaolaj',g:13.5,kq:1,ku:'ek',shop:1},
    {id:'oregano',name:'Szárított oregánó',g:1,kq:1,ku:'tk',shop:1},
    {id:'paprikapowder',name:'Édes vagy füstölt paprika',g:1,kq:.5,ku:'tk',optional:1}
  ]},
  {t:'Opcionális kiegészítők',a:[
    {id:'capers',name:'Kapribogyó',g:12.5,kq:1,ku:'ek',optional:1,shop:1},
    {id:'parsley',name:'Friss petrezselyem',g:12,optional:1,shop:1},
    {id:'basil',name:'Friss bazsalikom',text:'ízlés szerint',optional:1},
    {id:'zucchini',name:'Cukkini',g:125,kq:.5,ku:'kisebb db',optional:1},
    {id:'chili',name:'Chilipehely',text:'1 csipet',optional:1}
  ]},
  {t:'Ajánlott köret',a:[
    {id:'bulgur',name:'Száraz bulgur',g:165,optional:1,shop:1}
  ]}
];

let servings=+(localStorage.getItem('fishServ')||BASE);
let ci=+(localStorage.getItem('fishStep')||0);
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const all=()=>groups.flatMap(g=>g.a);
const item=id=>all().find(x=>x.id===id);
const scale=n=>n==null?null:n*servings/BASE;
function dec(n){return (Math.round(n*100)/100).toString().replace('.',',')}
function mixed(n){
  const r=Math.round(n*6)/6, whole=Math.floor(r), f=Math.round((r-whole)*6);
  const frac={0:'',1:'⅙',2:'⅓',3:'½',4:'⅔',5:'⅚'}[f]||'';
  return (whole?whole:'')+frac || '0';
}
function kitchen(x,factor=1){
  if(x.kq==null)return '';
  const q=scale(x.kq)*factor, val=(Math.abs(q-Math.round(q*6)/6)<.03)?mixed(q):dec(q);
  return `${val} ${x.ku}`;
}
function amount(x,factor=1){
  if(x.text)return x.text;
  const g=scale(x.g)*factor, k=kitchen(x,factor);
  if(x.id==='lemon') return `${k} (kb. ${dec(g)} g lé)`;
  if(k&&g!=null) return `${k} (${dec(g)} g)`;
  if(g!=null) return `${dec(g)} g`;
  return '';
}
function A(id,factor=1){return amount(item(id),factor)}

function getSteps(){
  const perBulgur=dec(scale(item('bulgur').g)/servings);
  return [
    ['1. Kiolvasztás és szárítás',`A ${A('fish')} alaszkai tőkehalfilét lehetőleg hűtőben olvaszd ki, majd papírtörlővel nagyon alaposan itasd le. Ha a darabok nagyon eltérő vastagságúak, a nagyobbakat vágd ketté.`,`A nedves hal felhígítja a paradicsomos alapot, ezért ez az egyik legfontosabb előkészítő lépés.`],
    ['2. Sütő és zöldségek',`Melegítsd elő a sütőt 200 °C-ra alsó-felső sütésen (185 °C légkeverés). Készíts elő ${A('tomato')} paradicsomot, ${A('paprika')} paprikát és ${A('onion')} hagymát. A paradicsomot darabold, a paprikát kb. 2 cm-esre, a hagymát vékony cikkekre vágd.`,`Kb. 30 × 22 cm-es sütőtál ehhez a mennyiséghez jól használható.`],
    ['3. Mediterrán alap',`A sütőtálban keverd össze a ${A('tomato')} paradicsomot, a ${A('paprika')} paprikát és a ${A('onion')} hagymát ${A('oil')} olívaolajjal, ${A('oregano')} oregánóval, ${A('pepper')} fekete borssal és ${A('salt',.5)} sóval. Ha használod, itt add hozzá a ${A('paprikapowder')} édes vagy füstölt paprikát is.`,`Az olívabogyó és a kapribogyó is sós, ezért az elején inkább kevesebbet sózz.`],
    ['4. Elősütés hal nélkül',`Süsd a zöldségalapot fedetlenül 15–18 percig. A paradicsom essen össze, a hagyma puhuljon, a lé pedig kezdjen koncentrálódni.`,`A zöldségeknek több idő kell, mint a halnak; ezért nem egyszerre kezdjük a sütést.`],
    ['5. Fokhagyma, olíva, kóstolás',`Vedd ki a tálat. Add hozzá a ${A('garlic')} fokhagymát és a ${A('olive')} olívabogyót. Ha használod, most add hozzá a ${A('capers')} kapribogyót is. Keverd át, majd kóstold meg. Ha túl híg, süsd még 3–5 percig hal nélkül.`,`Ha a paradicsom túl savas, egy nagyon kis csipet cukor kerekítheti az ízt.`],
    ['6. Hal behelyezése',`A ${A('fish')} halfilét fektesd a zöldséges alap tetejére. Sózd meg a maradék ${A('salt',.5)} sóval, majd kanalazz a halra kevés paradicsomos szaftot, és facsarj rá ${A('lemon')} citromlevet.`,`Ne pácolj hosszan citromlében: a finom hús szerkezetét feleslegesen megváltoztatná.`],
    ['7. A hal sütése',`Süsd 200 °C-on, fedetlenül. Vékony filé: 8–10 perc; közepes: 10–12 perc; vastagabb: 12–15 perc.`,`A hal akkor jó, ha opálos-fehér, villával könnyen lemezekre válik, de még szaftos. Biztonságos célhőmérséklet: 63 °C.`],
    ['8. Befejezés',`Vedd ki a sütőből, és pihentesd 2–3 percig. Ha használod, szórd meg ${A('parsley')} friss petrezselyemmel vagy bazsalikommal, adj hozzá kevés reszelt citromhéjat, és szükség szerint néhány csepp friss citromlevet.`,`Ha lapos az íz, először savval korrigálj, és csak utána további sóval.`],
    ['9. Tálalás',`Tálald nagy adag salátával vagy készíts mellé ${A('bulgur')} száraz bulgurból köretet, ami körülbelül ${perBulgur} g/fő.`,`A bulgur jól felszívja a paradicsomos–olívás szaftot.`]
  ];
}

function renderIngredients(){
  let h='';
  groups.forEach((g,i)=>{
    h+=`<details class="card" ${i<2?'open':''}><summary><span>${g.t}</span><span>⌄</span></summary><div class="ilist">`;
    g.a.forEach(x=>h+=`<div class="row"><div>${x.name} ${x.optional?'<span class="pill">opcionális</span>':''}</div><div class="qty">${amount(x)}</div></div>`);
    h+='</div></details>';
  });
  $('#ings').innerHTML=h;
}
function sk(id){return 'fishShop:'+id}
function renderShop(){
  let h='';
  groups.forEach(g=>g.a.filter(x=>x.shop).forEach(x=>{
    const done=localStorage.getItem(sk(x.id))==='1';
    h+=`<label class="shop ${done?'done':''}"><input type="checkbox" data-id="${x.id}" ${done?'checked':''}><span class="box"></span><span class="nm">${x.name}${x.optional?' <em>(opcionális)</em>':''}</span><strong>${amount(x)}</strong></label>`;
  }));
  $('#shop').innerHTML=h;
  $$('#shop input').forEach(c=>c.onchange=()=>{localStorage.setItem(sk(c.dataset.id),c.checked?'1':'0');c.closest('.shop').classList.toggle('done',c.checked)});
}
function renderMethod(){
  $('#methodSteps').innerHTML=getSteps().map(s=>`<article class="card step"><h3>${s[0]}</h3><p>${s[1]}</p><div class="tip">${s[2]}</div></article>`).join('');
}
function renderAll(){
  $('#serv').textContent=servings; $('#topServ').textContent=servings+' adag';
  localStorage.setItem('fishServ',servings);
  renderIngredients(); renderShop(); renderMethod(); rc();
}

$('#minus').onclick=()=>{servings=Math.max(1,servings-1);renderAll()};
$('#plus').onclick=()=>{servings=Math.min(12,servings+1);renderAll()};
$('#clearShop').onclick=()=>{all().filter(x=>x.shop).forEach(x=>localStorage.removeItem(sk(x.id)));renderShop()};

$$('[data-tab]').forEach(b=>b.onclick=()=>{
  $$('[data-tab]').forEach(x=>x.classList.remove('on'));
  $$('.panel').forEach(x=>x.classList.remove('on'));
  b.classList.add('on'); $('#'+b.dataset.tab).classList.add('on');
});

function rc(){
  const steps=getSteps(), s=steps[ci];
  $('#count').textContent=(ci+1)+' / '+steps.length;
  $('#ctitle').textContent=s[0]; $('#ctext').textContent=s[1]; $('#ctip').textContent=s[2];
  $('#prog').style.width=((ci+1)/steps.length*100)+'%';
  $('#prev').disabled=ci===0; $('#next').textContent=ci===steps.length-1?'Kész ✓':'Következő';
  localStorage.setItem('fishStep',ci);
}
function openCook(){$('#cook').classList.add('on');document.body.style.overflow='hidden';rc()}
function closeCook(){$('#cook').classList.remove('on');document.body.style.overflow=''}
$('#cookOpen').onclick=$('#cookOpen2').onclick=openCook; $('#close').onclick=closeCook;
$('#prev').onclick=()=>{ci=Math.max(0,ci-1);rc()};
$('#next').onclick=()=>{if(ci<getSteps().length-1){ci++;rc()}else closeCook()};
$('#resetCook').onclick=()=>{ci=0;rc()};

let dp;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('#install').hidden=false});
$('#install').onclick=async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;$('#install').hidden=true};
$('#help').onclick=()=>alert('Androidon Chrome-ban: ⋮ menü → Alkalmazás telepítése vagy Hozzáadás a kezdőképernyőhöz.');
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
renderAll();