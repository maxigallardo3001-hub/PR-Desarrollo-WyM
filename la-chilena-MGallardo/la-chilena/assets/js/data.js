const LS_KEYS = {
  session: 'lachilena_session',
  cart: 'lachilena_cart',
  orders: 'lachilena_orders',
  products: 'lachilena_products',
  clients: 'lachilena_clients',
  users: 'lachilena_users',
};

const DEFAULT_PRODUCTS = [
  {id:'p1', cat:'horno', name:'Empanada de pino', price:2500, desc:'Carne molida, cebolla, huevo duro, aceituna y pasas. La clásica chilena.', stock:true},
  {id:'p2', cat:'horno', name:'Empanada de queso', price:2200, desc:'Queso gauda derretido, horneada hasta dorar.', stock:true},
  {id:'p3', cat:'horno', name:'Empanada napolitana', price:2800, desc:'Jamón, queso, tomate y orégano.', stock:false},
  {id:'p4', cat:'frita', name:'Empanada de carne', price:3500, desc:'Rellena con carne molida, cebolla y ajo, frita al momento.', stock:true},
  {id:'p5', cat:'frita', name:'Empanada de camarón', price:3500, desc:'Camarón, queso, cebolla y pimentón.', stock:true},
  {id:'p6', cat:'frita', name:'Empanada de mariscos', price:3900, desc:'Mezcla de mariscos salteados con salsa verde.', stock:true},
  {id:'p7', cat:'bebida', name:'Mote con huesillo', price:1800, desc:'Bebida tradicional bien helada.', stock:true},
  {id:'p8', cat:'bebida', name:'Bebida 350ml', price:1200, desc:'A elección: Coca-Cola, Sprite o Fanta.', stock:true},
];

const DEFAULT_USERS = [
  {id:'u1', email:'admin@lachilena.cl',   pass:'admin123',   role:'administrador', name:'Paula Reyes'},
  {id:'u2', email:'cajero@lachilena.cl',  pass:'cajero123',  role:'cajero',        name:'Ítalo Muñoz'},
  {id:'u3', email:'despacho@lachilena.cl',pass:'despacho123',role:'despacho',      name:'Marcelo Soto'},
  {id:'u4', email:'dueno@lachilena.cl',   pass:'dueno123',   role:'dueno',         name:'Fernanda Ibáñez'},
];

const DEFAULT_CLIENTS = [
  {id:'c1', run:'18.765.432-1', name:'Constanza Rivas', email:'constanza@gmail.com', pass:'cliente123',
   address:'Av. Pajaritos 3450', comuna:'Maipú', provincia:'Santiago', region:'Metropolitana',
   birth:'1996-04-12', sex:'F', phone:'+56912345678'},
];

const DEFAULT_ORDERS = [
  {id:'ORD-2026-0831', clientId:'c1', date:'2026-08-31T20:47:00',
   items:[{id:'p1', name:'Empanada de pino', price:2500, qty:2}, {id:'p7', name:'Mote con huesillo', price:1800, qty:1}],
   pay:'servipag', status:'pendiente_pago'},
  {id:'ORD-2026-0819', clientId:'c1', date:'2026-08-19T16:20:00',
   items:[{id:'p4', name:'Empanada de carne', price:3500, qty:4}, {id:'p8', name:'Bebida 350ml', price:1200, qty:2}],
   pay:'deposito', status:'entregado'},
];

function loadOrSeed(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  localStorage.setItem(key, JSON.stringify(fallback));
  return JSON.parse(JSON.stringify(fallback));
}

function save(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
}

function cartKey(clientId){
  return clientId ? LS_KEYS.cart + '_' + clientId : LS_KEYS.cart;
}

function genOrderId(){
  const d = new Date();
  const y = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  const suffix = String(Date.now()).slice(-4);
  return `ORD-${y}-${mm}${dd}-${suffix}`;
}

const DB = {
  products: loadOrSeed(LS_KEYS.products, DEFAULT_PRODUCTS),
  users: loadOrSeed(LS_KEYS.users, DEFAULT_USERS),
  clients: loadOrSeed(LS_KEYS.clients, DEFAULT_CLIENTS),
  orders: loadOrSeed(LS_KEYS.orders, DEFAULT_ORDERS),
  saveProducts(){ save(LS_KEYS.products, this.products); },
  saveUsers(){ save(LS_KEYS.users, this.users); },
  saveClients(){ save(LS_KEYS.clients, this.clients); },
  saveOrders(){ save(LS_KEYS.orders, this.orders); },
};

const fmtCLP = n => '$' + Number(n||0).toLocaleString('es-CL');
const fmtDate = iso => new Date(iso).toLocaleString('es-CL', {day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'});

const STATUS_LABEL = {
  pendiente_pago:{label:'Pago pendiente', cls:'pending'},
  pagado:{label:'Pago confirmado', cls:'ready'},
  en_preparacion:{label:'En preparación', cls:'ready'},
  despachado:{label:'Despachado', cls:'ready'},
  entregado:{label:'Entregado', cls:'delivered'},
  anulado:{label:'Anulado', cls:'cancelled'},
};