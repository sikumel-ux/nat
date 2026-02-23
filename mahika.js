import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- Firebase Configuration ---
const firebaseConfig = { 
    apiKey: "AIzaSyAmTAWHcHpolaIHegLceyMqExVgzufJzaU", 
    authDomain: "mahika-trans.firebaseapp.com", 
    projectId: "mahika-trans", 
    appId: "1:1087881066133:web:148d51c88f1de3466ecd9c" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Sound Effect Logic ---
const clickSound = document.getElementById('clickSound');
function playClick() {
    clickSound.currentTime = 0;
    clickSound.volume = 0.3;
    clickSound.play();
}

// --- Profile Drawer Logic ---
window.toggleProfile = function() {
    playClick();
    const panel = document.getElementById('company-profile');
    const isVisible = panel.classList.contains('visible');
    
    if (!isVisible) {
        panel.classList.add('visible');
        document.body.style.overflow = 'hidden';
    } else {
        panel.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
};

// --- Quick Search (Rute Populer) ---
window.quickSearch = function(city) {
    const input = document.getElementById('search-input');
    input.value = city;
    document.getElementById('btnSearch').click();
};

// --- Search Rute with Skeleton & WA Auto-Text ---
document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    const busList = document.getElementById('bus-list');
    const welcomeCard = document.getElementById('welcome-card');
    const resultContainer = document.getElementById('result-container');
    const resultCount = document.getElementById('result-count');

    if(!keyword) return;

    // 1. Persiapan UI
    playClick();
    welcomeCard.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    // 2. Munculkan Skeleton Loading (3 kartu dummy)
    busList.innerHTML = "";
    for(let i=0; i<3; i++) {
        busList.innerHTML += `
            <div class="glass-card p-6 rounded-[30px] border border-white/5">
                <div class="h-6 w-32 skeleton rounded-full mb-3"></div>
                <div class="h-3 w-48 skeleton rounded-full opacity-50"></div>
            </div>
        `;
    }

    try {
        const snap = await getDocs(collection(db, "direktori_rute"));
        let html = "";
        let count = 0;

        snap.forEach(doc => {
            const d = doc.data();
            if(d.tujuan?.toLowerCase().includes(keyword) || d.armada?.toLowerCase().includes(keyword)) {
                count++;
                
                // --- Logic WA Auto-Text ---
                const waText = encodeURIComponent(`Halo Mahika Trans, saya mau pesan tiket:
Bus: ${d.armada}
Tujuan: ${d.tujuan}
Jam: ${d.jam} WIB
Mohon info ketersediaan kursi.`);
                const waUrl = `https://wa.me/6281211407667?text=${waText}`;

                // --- Render Ticket Card ---
                html += `
                <div class="ticket-card p-6 flex justify-between items-center group hover:border-yellow-400/50 transition-all duration-500">
                    <div class="flex-1">
                        <h3 class="font-black text-lg uppercase tracking-tighter mb-1">${d.armada}</h3>
                        <div class="flex items-center gap-2">
                            <span class="text-[8px] bg-white/10 px-2 py-0.5 rounded text-yellow-400 font-bold uppercase tracking-widest">${d.tujuan}</span>
                            <span class="text-[8px] text-white/30 font-bold uppercase tracking-widest">Executive Class</span>
                        </div>
                    </div>
                    <div class="text-right flex flex-col items-end">
                        <p class="text-2xl font-black leading-none mb-1 text-yellow-400">${d.jam}</p>
                        <p class="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-3">WIB</p>
                        <a href="${waUrl}" class="bg-yellow-400 text-[#053a6f] text-[9px] font-black px-4 py-2 rounded-xl uppercase active:scale-90 transition-all">Pesan</a>
                    </div>
                </div>`;
            }
        });

        // 3. Tampilkan Hasil
        setTimeout(() => {
            resultCount.innerText = `${count} RUTE`;
            busList.innerHTML = html || `<p class="text-center py-20 opacity-30 text-xs font-bold tracking-widest">RUTE TIDAK DITEMUKAN</p>`;
        }, 800); // Delay dikit biar skeletonnya kelihatan kerja

    } catch (e) { 
        console.error(e); 
        busList.innerHTML = `<p class="text-center py-10 text-red-400 text-[10px]">Gagal memuat data. Periksa koneksi.</p>`;
    }
};

// --- Auto Rotators (Info & Testi) ---
function startRotators() {
    // Rotator Info Header
    let pIdx = 0;
    const pItems = document.querySelectorAll('.info-fade');
    setInterval(() => {
        if(pItems.length > 0) {
            pItems[pIdx].classList.remove('active');
            pIdx = (pIdx + 1) % pItems.length;
            pItems[pIdx].classList.add('active');
        }
    }, 4000);

    // Rotator Testimoni
    let tIdx = 0;
    const tItems = document.querySelectorAll('.testi-item');
    setInterval(() => {
        if(tItems.length > 0) {
            tItems[tIdx].classList.remove('active');
            tIdx = (tIdx + 1) % tItems.length;
            tItems[tIdx].classList.add('active');
        }
    }, 6000);
}

// --- Initialization ---
window.onload = () => {
    document.getElementById('search-input').focus();
    startRotators();
};
  
