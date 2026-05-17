const CONFIG = {
    whatsapp_general: "4491472336",
    facebook: "https://www.facebook.com/banorte",
    instagram: "https://www.instagram.com/Banorte_mx",
    maps: "https://maps.app.goo.gl/zUWjsh32UmcpadRG6", 
    web: "https://www.banorte.com/",
    youtubePrincipal: "https://www.youtube.com/shorts/Gb6SYhwZd4U",
    textos: {
        cat1: { 
            t: "MI LOGRO", 
            c: "Adquiere tu casa nueva o usada y accede a beneficios únicos: baja de tasa anual y dinero extra disponible durante tu crédito." 
        },
        servicios: {
            "1.jpg": { t: "Créditos Hipotecarios y Automotrices", c: "Con BANORTE Mejora tu crédito sin pago de comisiones ni avalúo / Renueva tu propiedad con las mejoras que sueñas / Busca nuestros diferentes financiamientos hipotecarios." },
            "2.jpg": { t: "Financiamiento a PYMES", c: "Con BANORTE Crédito PYME en línea / Mujer PYME / Financia el capital de trabajo de tu negocio a corto o mediano plazo / Liquidez para compra de mercancía. / Busca todas nuestras opciones de apoyo." },
            "3.jpg": { t: "Nomina Banorte", c: "Con Nomina BANORTE Acceso a créditos / Tarjeta de Nómina / Respaldo Banorte / Salud / Crédito de Nómina / Adelanto de Nómina y más." },
            "4.jpg": { t: "Tarjetas Preferentes", c: "Solicitala ahora en BANORTE: La Tarjeta de Crédito que tiene todo lo que necesitas / Platinum (Preferente) / Infinite (Preferente) / United (Preferente) / United Universe (Preferente) / Marriott Bonvoy Inspire (Preferente)." },
            "5.jpg": { t: "Tarjetas de Crédito y Débito", c: "Con BANORTE Hay una tarjeta para cada decisión de tu vida / Clásica / Oro / Mujer Banorte / One Up / POR Ti / Banorte Conmigo / Básica / Platinum (Preferente)." },
            "6.jpg": { t: "Financiamiento Empresarial", c: "Con BANORTE Administración y Liquidez / Banca Transaccional / Manejo de Excedentes / Fondos de Inversión / Pagos / Servicios de Valor Agregado / Tesorería Inteligente / Mercado de Dinero." }
        },
        exclusividad: [
            { t: "Con tus Tarjetas Banorte Visa no hay reto imposible", l: "https://www.youtube.com/watch?v=dCao3BlFDTg" },
            { t: "Ya está aquí la nueva app de Tu Tarjeta Favorita", l: "https://www.youtube.com/watch?v=N5Slt6q00mY" },
            { t: "Evolución digital y toma de decisiones en el entorno económico actual", l: "https://www.youtube.com/watch?v=IP3tzkmWlM0" },
            { t: "Pagaré Banorte, haz rendir tu dinero a tu manera", l: "https://www.youtube.com/watch?v=Ud3agZUhttps://www.youtube.com/watch?v=uNt8F1fvsKY" }
        ]
    }
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;

function openYouTubeVideo() { playClick(); window.open(CONFIG.youtubePrincipal, '_blank'); }

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) openLightbox(imgElement.src, [imgElement.src], true);
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    
    if(cat === 'ejecutivos') renderEjecutivos();
    else if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = (cat === 'cat1') ? "MI LOGRO" : (cat === 'cat2') ? "SERVICIOS" : "EXCLUSIVIDAD";
    grid.appendChild(titleHeader);

    if(cat === 'cat3') {
        const stack = document.createElement('div');
        stack.className = 'social-vertical-stack';
        CONFIG.textos.exclusividad.forEach(vid => {
            const btn = document.createElement('button');
            btn.className = 'btn-premium-framed shine-effect';
            btn.innerHTML = `<span><i class="fab fa-youtube"></i> ${vid.t}</span>`;
            btn.onclick = () => window.open(vid.l, '_blank');
            stack.appendChild(btn);
        });
        grid.appendChild(stack);
        return;
    }

    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';

    for(let i = 1; i <= 6; i++) {
        const src = `assets/gallery/${cat}/${i}.jpg`;
        const div = document.createElement('div');
        div.className = `polaroid-item ${(i % 2 === 0) ? 'pos-right' : 'pos-left'}`;
        div.innerHTML = `<img src="${src}">`;
        div.onclick = () => {
            if(cat === 'cat2') {
                const info = CONFIG.textos.servicios[`${i}.jpg`];
                openTextZoomManual(info.t, info.c);
            } else {
                openLightbox(src, [`assets/gallery/${cat}/1.jpg`,`assets/gallery/${cat}/2.jpg`,`assets/gallery/${cat}/3.jpg`,`assets/gallery/${cat}/4.jpg`,`assets/gallery/${cat}/5.jpg`,`assets/gallery/${cat}/6.jpg`], false);
            }
        };
        rowGrid.appendChild(div);
    }
    grid.appendChild(rowGrid);

    if(cat === 'cat1') {
        const btn = document.createElement('button');
        btn.className = 'btn-premium-framed shine-effect'; 
        btn.innerHTML = `<span><i class="fas fa-plus-circle"></i> BENEFICIOS DE MI CRÉDITO</span>`;
        btn.onclick = () => openTextZoomManual(CONFIG.textos.cat1.t, CONFIG.textos.cat1.c);
        grid.appendChild(btn);
    }
}

function renderEjecutivos() {
    const container = document.getElementById('lista-ejecutivos');
    container.innerHTML = '';
    for(let i = 1; i <= 4; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-premium-framed shine-effect';
        btn.innerHTML = `<span><i class="fab fa-whatsapp"></i> EJECUTIVO ${i}</span>`;
        btn.onclick = () => window.open(`https://wa.me/${CONFIG.whatsapp_general}?text=Hola, quiero informes sobre un crédito.`, '_blank');
        container.appendChild(btn);
    }
}

function openTextZoomManual(titulo, contenido) {
    playClick();
    document.getElementById('text-zoom-title').innerText = titulo;
    document.getElementById('text-zoom-content').innerText = contenido;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-image').src = src;
    hideControls ? lb.classList.add('hide-nav-arrows') : lb.classList.remove('hide-nav-arrows');
    lb.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const spot = document.getElementById('spot-intro');
    const icon = document.getElementById('audio-icon');
    spot.muted = isMuted;
    icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function playClick() {
    const snd = document.getElementById('sndFxClick');
    if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = [
        { id: 'link-web-direct', url: CONFIG.web, icon: 'fas fa-globe', label: 'SITIO WEB' },
        { id: 'link-fb-direct', url: CONFIG.facebook, icon: 'fab fa-facebook', label: 'FACEBOOK' },
        { id: 'link-maps-direct', url: CONFIG.maps, icon: 'fas fa-location-dot', label: 'CÓMO LLEGAR' },
        { id: 'link-ig-direct', url: CONFIG.instagram, icon: 'fab fa-instagram', label: 'INSTAGRAM' }
    ];

    contactLinks.forEach(item => {
        const el = document.getElementById(item.id);
        if(el) {
            el.className = 'btn-premium-framed shine-effect';
            el.href = item.url;
            el.innerHTML = `<span><i class="${item.icon}"></i> ${item.label}</span>`;
        }
    });

    window.addEventListener('click', () => {
        const spot = document.getElementById('spot-intro');
        if(spot && !isMuted) spot.play().catch(()=>{});
    }, {once: true});
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'Mi Logro HSBC', url: window.location.href }); }
    catch { alert("Enlace de mi SMART-ID copiado."); }
}