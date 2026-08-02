const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});}

document.querySelectorAll(".reveal").forEach(el=>{new IntersectionObserver(([entry],obs)=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.disconnect();}},{threshold:.12}).observe(el);});

function trackEvent(name,params={}){
  if(typeof window.gtag==="function") window.gtag("event",name,params);
}

document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"]').forEach(link=>{
  link.addEventListener("click",()=>trackEvent("whatsapp_click",{link_url:link.href,page_location:location.href}));
});

document.querySelectorAll('a[target="_blank"]').forEach(link=>{
  link.addEventListener("click",()=>trackEvent("outbound_click",{link_url:link.href,link_text:(link.textContent||"").trim(),page_location:location.href}));
});

document.querySelectorAll(".whatsapp-form").forEach(form=>{
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const data=new FormData(form);
    const assunto=data.get("assunto")||form.dataset.interest||"Contato pelo site";
    const lines=[
      "Olá, Paula. Vim pelo seu site.",
      "",
      `Meu nome: ${data.get("nome")||""}`,
      `Meu WhatsApp: ${data.get("telefone")||""}`,
      data.get("email")?`Meu e-mail: ${data.get("email")}`:"",
      `Assunto: ${assunto}`,
      "",
      `Mensagem: ${data.get("mensagem")||""}`
    ].filter(Boolean);
    trackEvent("generate_lead",{lead_source:"formulario_whatsapp",assunto,page_location:location.href});
    window.open(`https://wa.me/5521999791330?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener,noreferrer");
  });
});
