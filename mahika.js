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

// Toggle Profile Drawer
window.toggleProfile = function() {
    const panel = document.getElementById('company-profile');
    panel.classList.toggle('visible');
    const isVisible = panel.classList.contains('visible');
    document.body.style.overflow = isVisible ? 'hidden' : 'auto';
};

// Quick Search Function
window.quickSearch = (city) => {
    document.getElementById('search-input').value = city;
    document.getElementById('btnSearch').click();
};

// Search Logic
document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    const busList = document.getElementById('bus-list');
    const resultCont = document.getElementById('result-container');

    if(!keyword) return;

    resultCont.classList.remove('hidden');
    busList.innerHTML = `<div class="p-8 skeleton rounded-[40px] h-32 w-full"></div>`;

    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";

        snap.forEach(doc => {
            const d = doc.data();
            if(d.tujuan?.toLowerCase().includes(keyword) || d.armada?.toLowerCase().includes(keyword)) {
                
                const waText = encodeURIComponent(`Halo Mahika Trans, saya booking:\nArmada: ${d.armada}\nTujuan: ${d.tujuan}\nJam: ${d.jam}`);
                
                html += `
                <div class="ticket-node">
                    <div class="ticket-main">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-xl font-bold tracking-tighter">${d.armada}</h3>
                                <p class="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">${d.tujuan}</p>
                            </div>
                            <div class="text-right">
                                <span class="text-2xl font-bold">${d.jam}</span>
                                <p class="text-[8px] opacity-40 font-bold">WIB</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t border-white/5">
                            <span class="text-[9px] text-white/20 font-bold uppercase tracking-widest">Executive Class</span>
                            <a href="https://wa.me/6281211407667?text=${waText}" class="bg-white text-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest active:scale-90 transition-all">BOOKING</a>
                        </div>
                    </div>
                </div>`;
            }
        });

        setTimeout(() => {
            busList.innerHTML = html || `<div class="text-center py-20 text-white/20 text-xs font-bold uppercase tracking-widest">Tidak ada jadwal ditemukan</div>`;
        }, 600);

    } catch (e) { console.error(e); }
};
