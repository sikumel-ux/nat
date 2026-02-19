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
    const p = document.getElementById('company-profile');
    p.classList.toggle('translate-y-full');
};

document.getElementById('btnSearch').onclick = async function() {
    const key = document.getElementById('search-input').value.trim().toLowerCase();
    const list = document.getElementById('bus-list');
    if(!key) return;

    list.innerHTML = `<p class="text-center text-gray-400 py-10 text-xs">Mencari rute...</p>`;

    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";
        snap.forEach(doc => {
            const d = doc.data();
            if(d.tujuan?.toLowerCase().includes(key)) {
                html += `
                <div class="bus-item animate-in">
                    <div class="flex flex-col">
                        <span class="text-[10px] font-bold opacity-80 uppercase tracking-tighter">
                            ${d.armada} • TUJUAN ${d.tujuan}
                        </span>
                        <span class="text-sm font-bold">${d.jam} WIB</span>
                    </div>
                    <i class="fa-solid fa-chevron-right opacity-30 text-xs"></i>
                </div>`;
            }
        });
        list.innerHTML = html || `<p class="text-center py-10 text-gray-400 text-xs">Rute tidak ditemukan.</p>`;
    } catch (e) { console.error(e); }
};
