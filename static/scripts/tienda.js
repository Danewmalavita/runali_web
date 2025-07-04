let pagina = 1;
let cargando = false;
let categoriaActual = "todo";
const productosContainer = document.getElementById("productos");
const botonesCategorias = document.querySelectorAll(".categoria-btn");

// Productos simulados para demostración
const productosMock = [
  { nombre: "Crema Facial Hidratante", descripcion: "Hidratación profunda con ingredientes naturales.", precio: 18.5, imagen: "crema-facial.jpg", categoria: "facial" },
  { nombre: "Aceite Corporal Relajante", descripcion: "Aceite esencial con lavanda y romero.", precio: 22.0, imagen: "aceite-corporal.jpg", categoria: "corporal" },
  { nombre: "Champú Sólido Revitalizante", descripcion: "Ideal para todo tipo de cabello.", precio: 9.95, imagen: "champu-solido.jpg", categoria: "cabello" },
  { nombre: "Pack Regalo Bienestar", descripcion: "Un kit completo para mimarte.", precio: 35.0, imagen: "kit-bienestar.jpg", categoria: "kits" },
  { nombre: "Tónico Facial Fresco", descripcion: "Refresca y tonifica la piel.", precio: 14.0, imagen: null, categoria: "facial" },
  { nombre: "Manteca Corporal Karité", descripcion: "Nutrición intensa para piel seca.", precio: 19.9, imagen: "", categoria: "corporal" },
  { nombre: "Sérum Capilar Fortificante", descripcion: "Fortalece y repara el cabello.", precio: 17.5, imagen: "serum-capilar.jpg", categoria: "cabello" },
  { nombre: "Pegatina adhesiva de gnomos", descripcion: "Si te ha gustado la imagen, te la puedes llevar como una pegatina.", precio: 2.0, imagen: "gnomimage.jpg", categoria: "Merchandising" }
];

// Simular carga de productos filtrados y paginados
async function cargarProductos() {
  if (cargando) return;
  cargando = true;

  const inicio = (pagina - 1) * 5;
  const filtrados = categoriaActual === "todo"
    ? productosMock
    : productosMock.filter(p => p.categoria === categoriaActual);

  const paginaActual = filtrados.slice(inicio, inicio + 5);
  pagina++;

  paginaActual.forEach(producto => renderProducto(producto));
  cargando = false;
}

// Renderizar un producto
function renderProducto(producto) {
  const div = document.createElement("div");
  div.className = "producto";
  const imagen = producto.imagen && producto.imagen.trim() !== "" ? producto.imagen : "gnomimage.png";
  div.innerHTML = `
    <img src="img/productos/${imagen}" alt="${producto.nombre}" onerror="this.onerror=null;this.src='../img/productos/gnomimage.png'" />
    <div class="info">
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <span class="precio">${producto.precio.toFixed(2)} €</span>
      <button>Añadir al carrito</button>
    </div>
  `;
  productosContainer.appendChild(div);
}

// Scroll infinito
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    cargarProductos();
  }
});

// Categorías
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesCategorias.forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    categoriaActual = boton.dataset.cat;
    pagina = 1;
    productosContainer.innerHTML = "";
    cargarProductos();
  });
});

// Carga inicial
cargarProductos();
