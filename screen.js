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

window.openSearch = () => document.getElementById('search-modal').classList.remove('hidden');
window.closeSearch = () => document.getElementById('search-modal').classList.add('hidden');

document.getElementById('btnSearch').onclick = async function() {
    const key = document.getElementById('search-input').value.trim().toLowerCase();
    const list = document.getElementById('bus-list');
    if(!key) return;
    list.innerHTML = `<p class="text-white/30 text-center py-10">Mencari...</p>`;
    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";
        snap.forEach(doc => {
            const d = doc.data();
            if(d.tujuan?.toLowerCase().includes(key)) {
                html += `<div class="bus-item"><h3>${d.armada} • ${d.tujuan}</h3><p>${d.jam} WIB</p></div>`;
            }
        });
        list.innerHTML = html || `<p class="text-white/30 text-center py-10">Kosong.</p>`;
    } catch (e) { console.error(e); }
};
