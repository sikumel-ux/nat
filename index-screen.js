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
};

// Fungsi Cari
document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    const busList = document.getElementById('bus-list');
    
    if(!keyword) return;

    busList.innerHTML = `<p class="text-center text-white/50 py-10 text-[10px]">MENCARI DATA...</p>`;

    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";
        
        snap.forEach(doc => {
            const d = doc.data();
            if(d.tujuan?.toLowerCase().includes(keyword)) {
                // Tampilan Persis Gambar: NAMA • TUJUAN | JAM
                html += `
                <div class="bus-item animate-in fade-in duration-500">
                    <div class="flex flex-col">
                        <h3 class="text-[10px] font-bold uppercase tracking-wider text-white/90">
                            ${d.armada} • TUJUAN ${d.tujuan}
                        </h3>
                        <p class="text-sm font-semibold text-white/60 mt-1">${d.jam} WIB</p>
                    </div>
                    <i class="fa-solid fa-chevron-right text-white/30"></i>
                </div>`;
            }
        });

        busList.innerHTML = html || `<p class="text-center py-10 text-white/20 text-xs">RUTE TIDAK DITEMUKAN</p>`;
    } catch (e) {
        console.error(e);
        busList.innerHTML = `<p class="text-center py-10 text-red-400 text-xs">Gagal memuat data.</p>`;
    }
};
  
