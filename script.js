const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('nav');
const form = document.getElementById('whatsappForm');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const interesse = document.getElementById('interesse').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const texto = `Olá, Paula. Meu nome é ${nome}.\n\nTenho interesse em: ${interesse}.\nMeu WhatsApp é: ${telefone || 'não informado'}.\n\nMensagem: ${mensagem || 'Gostaria de receber mais informações.'}`;
  const url = `https://wa.me/5521999791330?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
});
