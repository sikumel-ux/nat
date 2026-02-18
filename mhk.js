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

// Toggle Profile
window.toggleProfile = function() {
    const panel = document.getElementById('company-profile');
    const isHidden = panel.classList.contains('translate-y-full');
    panel.classList.toggle('translate-y-full', !isHidden);
    panel.classList.toggle('translate-y-0', isHidden);
    document.body.style.overflow = isHidden ? 'hidden' : 'auto';
};

// Search System
document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    const busList = document.getElementById('bus-list');
    const resultContainer = document.getElementById('result-container');
    const welcomeCard = document.getElementById('welcome-card');

    if(!keyword) return;
    welcomeCard.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    busList.innerHTML = `<p class="text-center text-yellow-400 animate-pulse text-[10px] py-10 uppercase tracking-widest">Mencari Rute...</p>`;

    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";
        snap.forEach(doc => {
            const data = doc.data();
            if(data.tujuan?.toLowerCase().includes(keyword)) {
                html += `
                <div class="glass-card p-6 rounded-[30px] flex justify-between items-center border-l-4 border-yellow-400">
                    <div>
                        <h3 class="font-black text-white uppercase text-sm">${data.armada}</h3>
                        <p class="text-[9px] font-bold text-yellow-400 uppercase tracking-widest">${keyword}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-black text-white">${data.jam}</p>
                        <p class="text-[8px] font-bold text-yellow-400">WIB</p>
                    </div>
                </div>`;
            }
        });
        busList.innerHTML = html || `<p class="text-center py-10 opacity-30 text-[10px]">RUTE TIDAK DITEMUKAN</p>`;
    } catch (e) { console.error(e); }
};

// Info Loop
let currentInfo = 0;
const infoItems = document.querySelectorAll('.info-fade');
setInterval(() => {
    if(infoItems.length) {
        infoItems[currentInfo].classList.remove('active');
        currentInfo = (currentInfo + 1) % infoItems.length;
        infoItems[currentInfo].classList.add('active');
    }
}, 4000);
