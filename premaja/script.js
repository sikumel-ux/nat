const db = [
    { n: "Lampung", p: ["550.000", "600.000", "700.000", "600.000", "Normal"], t: "Executive" },
    { n: "Metro", p: ["550.000", "600.000", "700.000", "600.000", "Normal"], t: "Executive" },
    { n: "Pringsewu", p: ["550.000", "600.000", "700.000", "600.000", "Normal"], t: "Executive" },
    { n: "Bandar Jaya", p: ["550.000", "600.000", "700.000", "600.000", "Normal"], t: "Executive" },
    { n: "Unit 2", p: ["550.000", "600.000", "700.000", "600.000", "Normal"], t: "Executive" },
    { n: "Kotabumi", p: ["600.000", "650.000", "750.000", "650.000", "Normal"], t: "Executive" },
    { n: "Way Abung", p: ["600.000", "650.000", "750.000", "650.000", "Normal"], t: "Executive" },
    { n: "Gaya Baru", p: ["600.000", "650.000", "750.000", "650.000", "Normal"], t: "Executive" },
    { n: "Palembang", p: ["650.000", "700.000", "800.000", "750.000", "650.000"], t: "Executive" },
    { n: "Jambi", p: ["750.000", "800.000", "900.000", "850.000", "800.000"], t: "Executive" },
    { n: "Lubuk Linggau", p: ["850.000", "900.000", "1.000.000", "950.000", "900.000"], t: "Executive" },
    { n: "Muara Bungo", p: ["900.000", "950.000", "1.050.000", "1.000.000", "950.000"], t: "Executive" },
    { n: "Sungai Rumbai", p: ["950.000", "1.000.000", "1.100.000", "1.050.000", "1.000.000"], t: "Executive" },
    // Super Exec
    { n: "Palembang (Super Exec)", p: ["850.000", "900.000", "1.000.000", "950.000", "900.000"], t: "Super Executive" },
    { n: "Jambi (Super Exec)", p: ["900.000", "950.000", "1.100.000", "1.050.000", "950.000"], t: "Super Executive" },
    { n: "Lubuk Linggau (Super Exec)", p: ["1.000.000", "1.050.000", "1.200.000", "1.150.000", "1.050.000"], t: "Super Executive" }
];

const input = document.getElementById('routeInput');
const sBox = document.getElementById('suggestionBox');
let selected = null;

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

document.getElementById('searchBtn').onclick = () => {
    if (!selected) { alert('Pilih rute dulu ya!'); return; }
    const dIdx = document.getElementById('selectDate').value;
    const dText = document.getElementById('selectDate').options[dIdx].text;
    const price = selected.p[dIdx];

    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('outPrice').innerText = price === "Normal" ? "Tarif Normal" : "Rp " + price;
    document.getElementById('outRouteName').innerText = `Rute: ${selected.n}`;
    document.getElementById('resTags').innerHTML = `<span class="tag">${selected.t}</span>`;

    // UPDATE LINK WA DENGAN NOMOR DAN PESAN
    const waNumber = "091234567890"; // Ganti nomor aslinya di sini
    const msg = `Halo Mahika Trans, saya ingin reservasi tiket ${selected.t} rute ${selected.n} untuk periode ${dText}. Apakah kursi masih tersedia?`;
    document.getElementById('waLink').href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
};

document.addEventListener('click', (e) => { if (e.target !== input) sBox.style.display = 'none'; });
