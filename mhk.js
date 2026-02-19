import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyAmTAWHcHpolaIHegLceyMqExVgzufJzaU", 
    authDomain: "mahika-trans.firebaseapp.com", 
    projectId: "mahika-trans", 
    appId: "1:1087881066133:web:148d51c88f1de3466ecd9c" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.toggleProfile = function() {
    const panel = document.getElementById('company-profile');
    const isHidden = panel.classList.contains('translate-y-full');
    panel.classList.toggle('translate-y-full', !isHidden);
    panel.classList.toggle('translate-y-0', isHidden);
    document.body.style.overflow = isHidden ? 'hidden' : 'auto';
};

document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    const busList = document.getElementById('bus-list');
    if(!keyword) return;

    document.getElementById('welcome-card').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    busList.innerHTML = `<p class="text-center text-yellow-400 animate-pulse py-10 text-[10px] uppercase">Mencari Rute...</p>`;

    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";
        snap.forEach(doc => {
            const d = doc.data();
            if(d.tujuan?.toLowerCase().includes(keyword)) {
                html += `<div class="glass-card p-6 rounded-[30px] flex justify-between items-center border-l-4 border-yellow-400">
                    <div><h3 class="font-black text-sm uppercase">${d.armada}</h3><p class="text-[9px] text-yellow-400 uppercase">${keyword}</p></div>
                    <div class="text-right"><p class="text-xl font-black">${d.jam}</p><p class="text-[8px] font-bold text-yellow-400">WIB</p></div>
                </div>`;
            }
        });
        busList.innerHTML = html || `<p class="text-center py-10 opacity-30 text-[10px]">RUTE TIDAK DITEMUKAN</p>`;
    } catch (e) { console.error(e); }
};

// Interval Logics
setInterval(() => {
    const items = document.querySelectorAll('.testi-item');
    let activeIdx = Array.from(items).findIndex(i => i.classList.contains('active'));
    items[activeIdx].classList.remove('active');
    items[(activeIdx + 1) % items.length].classList.add('active');
}, 5000);

setInterval(() => {
    const promos = document.querySelectorAll('.info-fade');
    let activeIdx = Array.from(promos).findIndex(p => p.classList.contains('active'));
    promos[activeIdx].classList.remove('active');
    promos[(activeIdx + 1) % promos.length].classList.add('active');
}, 4000);
