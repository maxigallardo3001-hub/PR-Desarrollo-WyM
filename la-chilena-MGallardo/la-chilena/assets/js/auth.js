const ROLE_HOME = {
  cliente: 'index.html',
  administrador: 'admin-productos.html',
  cajero: 'ventas.html',
  despacho: 'despacho.html',
  dueno: 'reportes.html',
};

const ROLE_LABEL = {
  cliente: 'Cliente',
  administrador: 'Administrador',
  cajero: 'Cajero virtual',
  despacho: 'Encargado de despacho',
  dueno: 'Dueño',
};

function getSession(){
  try { return JSON.parse(localStorage.getItem(LS_KEYS.session) || 'null'); }
  catch(e) { return null; }
}

function setSession(s){ localStorage.setItem(LS_KEYS.session, JSON.stringify(s)); }
function clearSession(){ localStorage.removeItem(LS_KEYS.session); }

function login(email, pass){
  const client = DB.clients.find(c => c.email.toLowerCase() === email.toLowerCase() && c.pass === pass);
  if(client){
    const session = {role: 'cliente', id: client.id, name: client.name, email: client.email};
    setSession(session);
    return session;
  }
  const user = DB.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass);
  if(user){
    const session = {role: user.role, id: user.id, name: user.name, email: user.email};
    setSession(session);
    return session;
  }
  return null;
}

function requireRole(allowedRoles){
  const session = getSession();
  const here = location.pathname.split('/').pop();
  if(!session || !allowedRoles.includes(session.role)){
    location.href = 'login.html?next=' + encodeURIComponent(here);
    return null;
  }
  return session;
}

function logout(){
  clearSession();
  location.href = 'login.html';
}

function iniciales(nombre){
  return (nombre||'?').split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
}

function renderHeader(activeView){
  const mount = document.getElementById('app-header');
  if(!mount) return;
  const session = getSession();
  const cartCount = session && session.role === 'cliente' ? cartItemCount() : 0;

  let navLinks = '';
  let tabLinks = '';
  let accountHtml = '';

  if(!session){
    navLinks = `
      <a href="index.html" class="${activeView === 'menu' ? 'active' : ''}">Menú</a>
      <a href="ayuda.html" class="${activeView === 'ayuda' ? 'active' : ''}">Ayuda</a>
      <a href="login.html" class="${activeView === 'login' ? 'active' : ''}">Iniciar sesión</a>`;
    accountHtml = `<a href="login.html" class="btn btn-primary btn-sm">Iniciar sesión</a>`;
  } else if(session.role === 'cliente'){
    navLinks = `
      <a href="index.html" class="${activeView === 'menu' ? 'active' : ''}">Menú</a>
      <a href="carrito.html" class="${activeView === 'cart' ? 'active' : ''}">Carrito${cartCount ? `<span class="cart-dot">${cartCount}</span>` : ''}</a>
      <a href="mis-pedidos.html" class="${activeView === 'orders' ? 'active' : ''}">Mis pedidos</a>
      <a href="ayuda.html" class="${activeView === 'ayuda' ? 'active' : ''}">Ayuda</a>`;
    tabLinks = navLinks;
    accountHtml = `
      <div class="account-box">
        <div class="avatar">${iniciales(session.name)}</div>
        <span>${session.name}</span>
        <span class="logout-link" onclick="logout()">Salir</span>
      </div>`;
  } else {
    const items = {
      administrador: [
        ['admin-productos.html', 'productos', 'Productos'],
        ['admin-clientes.html', 'clientes', 'Clientes'],
        ['admin-usuarios.html', 'usuarios', 'Usuarios'],
        ['reportes.html', 'reportes', 'Reportes'],
        ['ayuda.html', 'ayuda', 'Ayuda']
      ],
      cajero: [['ventas.html', 'ventas', 'Caja'], ['ayuda.html', 'ayuda', 'Ayuda']],
      despacho: [['despacho.html', 'despacho', 'Despachos'], ['ayuda.html', 'ayuda', 'Ayuda']],
      dueno: [['reportes.html', 'reportes', 'Reportes'], ['admin-productos.html', 'productos', 'Productos'], ['ayuda.html', 'ayuda', 'Ayuda']],
    }[session.role] || [];
    navLinks = items.map(([href, key, label]) => `<a href="${href}" class="${activeView === key ? 'active' : ''}">${label}</a>`).join('');
    tabLinks = navLinks; 
    accountHtml = `
      <div class="account-box">
        <div class="avatar">${iniciales(session.name)}</div>
        <span>${session.name}</span>
        <span class="role-pill">${ROLE_LABEL[session.role]}</span>
        <span class="logout-link" onclick="logout()">Salir</span>
      </div>`;
  }

  mount.outerHTML = `
    <header class="topbar" id="app-header">
      <a href="${session ? ROLE_HOME[session.role] : 'index.html'}" class="brand">
        <span class="logo-script">La chilena</span>
        <small>Empanadas artesanales</small>
      </a>
      <nav class="desktop-nav">${navLinks}</nav>
      ${accountHtml}
    </header>`;

  const tabMount = document.getElementById('app-tabbar');
  if(tabMount && tabLinks){
    tabMount.outerHTML = `<nav class="tabbar" id="app-tabbar">${tabLinks}</nav>`;
    document.body.classList.add('has-tabbar');
  } else if(tabMount){
    tabMount.remove();
  }
}

let toastTimer;
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2200);
}

function cartItemCount(){
  const session = getSession();
  if(!session || session.role !== 'cliente') return 0;
  const cart = loadOrSeed(cartKey(session.id), {});
  return Object.values(cart).reduce((a,b)=>a+b,0);
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const errorBox = document.getElementById('error-box');
        const errorMessage = document.getElementById('error-message');
        
        if (!loginForm.checkValidity()) {
            errorBox.style.display = 'block';
            errorMessage.textContent = "Ingrese un correo válido y su contraseña.";
            return;
        }

        const emailInput = document.getElementById('email');
        const passInput = document.getElementById('pass');
        const session = login(emailInput.value.trim(), passInput.value);
        
        if(session) {
            errorBox.style.display = 'none';
            const params = new URLSearchParams(window.location.search);
            const next = params.get('next');
            window.location.href = next || ROLE_HOME[session.role] || 'index.html'; 
        } else {
            errorBox.style.display = 'block';
            errorMessage.textContent = "Credenciales incorrectas. Verifique sus datos.";
        }
    });
}