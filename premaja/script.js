// Database Rute & Harga - Dipisah satu per satu dari gambar
const db = [
    // EXECUTIVE
    { n: "Lampung", p: ["550.000", "600.000", "700.000", "600.000", "NORMAL"], t: "Executive" },
    { n: "Metro", p: ["550.000", "600.000", "700.000", "600.000", "NORMAL"], t: "Executive" },
    { n: "Pringsewu", p: ["550.000", "600.000", "700.000", "600.000", "NORMAL"], t: "Executive" },
    { n: "Bandar Jaya", p: ["550.000", "600.000", "700.000", "600.000", "NORMAL"], t: "Executive" },
    { n: "Unit 2", p: ["550.000", "600.000", "700.000", "600.000", "NORMAL"], t: "Executive" },
    { n: "Kotabumi", p: ["600.000", "650.000", "750.000", "650.000", "NORMAL"], t: "Executive" },
    { n: "Way Abung", p: ["600.000", "650.000", "750.000", "650.000", "NORMAL"], t: "Executive" },
    { n: "Gaya Baru", p: ["600.000", "650.000", "750.000", "650.000", "NORMAL"], t: "Executive" },
    { n: "Rumbia", p: ["600.000", "650.000", "750.000", "650.000", "NORMAL"], t: "Executive" },
    { n: "Tulang Bawang", p: ["600.000", "650.000", "750.000", "700.000", "600.000"], t: "Executive" },
    { n: "Menggala", p: ["600.000", "650.000", "750.000", "700.000", "600.000"], t: "Executive" },
    { n: "Baturaja", p: ["650.000", "700.000", "750.000", "700.000", "600.000"], t: "Executive" },
    { n: "Palembang", p: ["650.000", "700.000", "800.000", "750.000", "650.000"], t: "Executive" },
    { n: "Prabumulih", p: ["700.000", "750.000", "850.000", "800.000", "700.000"], t: "Executive" },
    { n: "Jambi", p: ["750.000", "800.000", "900.000", "850.000", "800.000"], t: "Executive" },
    { n: "Muara Bulian", p: ["800.000", "850.000", "950.000", "900.000", "850.000"], t: "Executive" },
    { n: "Lubuk Linggau", p: ["850.000", "900.000", "1.000.000", "950.000", "900.000"], t: "Executive" },
    { n: "Muara Bungo", p: ["900.000", "950.000", "1.050.000", "1.000.000", "950.000"], t: "Executive" },
    { n: "Sungai Rumbai", p: ["950.000", "1.000.000", "1.100.000", "1.050.000", "1.000.000"], t: "Executive" },

    // SUPER EXECUTIVE
    { n: "Palembang (Super Exec)", p: ["850.000", "900.000", "1.000.000", "950.000", "900.000"], t: "Super Executive" },
    { n: "Jambi (Super Exec)", p: ["900.000", "950.000", "1.100.000", "1.050.000", "950.000"], t: "Super Executive" },
    { n: "Lubuk Linggau (Super Exec)", p: ["1.000.000", "1.050.000", "1.200.000", "1.150.000", "1.050.000"], t: "Super Executive" },
    { n: "Muara Bungo (Super Exec)", p: ["1.050.000", "1.100.000", "1.250.000", "1.200.000", "1.100.000"], t: "Super Executive" }
];

const input = document.getElementById('routeInput');
const sBox = document.getElementById('suggestionBox');
let selected = null;

// Suggestion Logic
input.addEventListener('input', () => {
    const v = input.value.toLowerCase();
    sBox.innerHTML = '';
    if (!v) { sBox.style.display = 'none'; return; }
    const matches = db.filter(r => r.n.toLowerCase().includes(v));
    if (matches.length > 0) {
        sBox.style.display = 'block';
        matches.forEach(r => {
            const d = document.createElement('div');
            d.className = 'suggestion-item';
            d.innerText = `${r.n} (${r.t})`;
            d.onclick = () => { input.value = r.n; selected = r; sBox.style.display = 'none'; };
            sBox.appendChild(d);
        });
    } else { sBox.style.display = 'none'; }
});

// Search Logic
document.getElementById('searchBtn').onclick = () => {
    if (!selected) { alert('Pilih rute dari saran yang muncul!'); return; }
    
    const dIdx = document.getElementById('selectDate').value;
    const dText = document.getElementById('selectDate').options[dIdx].text;
    const price = selected.p[dIdx];

    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('outPrice').innerText = price === "NORMAL" ? "Tarif Normal" : "Rp " + price;
    document.getElementById('outRouteName').innerText = `Tujuan: ${selected.n}`;
    document.getElementById('resTags').innerHTML = `<span class="tag">${selected.t}</span>`;

    // Update WA Link
    const msg = `Halo Mahika, saya cek tarif ${selected.t} rute ${selected.n} untuk tanggal ${dText}. Harganya Rp ${price}, apakah kursi masih tersedia?`;
    document.getElementById('waLink').href = `https://wa.me/091234567890?text=${encodeURIComponent(msg)}`;
};

document.addEventListener('click', (e) => { if (e.target !== input) sBox.style.display = 'none'; });
                        
