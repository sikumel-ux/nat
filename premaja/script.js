// Database Rute & Harga (Disembunyikan dari HTML)
const busRoutes = [
    // EXECUTIVE CLASS
    { name: "Lampung", price: ["550.000", "600.000", "700.000", "600.000", "Normal"], type: "Executive" },
    { name: "Metro", price: ["550.000", "600.000", "700.000", "600.000", "Normal"], type: "Executive" },
    { name: "Pringsewu", price: ["550.000", "600.000", "700.000", "600.000", "Normal"], type: "Executive" },
    { name: "Bandar Jaya", price: ["550.000", "600.000", "700.000", "600.000", "Normal"], type: "Executive" },
    { name: "Unit 2", price: ["550.000", "600.000", "700.000", "600.000", "Normal"], type: "Executive" },
    { name: "Kotabumi", price: ["600.000", "650.000", "750.000", "650.000", "Normal"], type: "Executive" },
    { name: "Way Abung", price: ["600.000", "650.000", "750.000", "650.000", "Normal"], type: "Executive" },
    { name: "Gaya Baru", price: ["600.000", "650.000", "750.000", "650.000", "Normal"], type: "Executive" },
    { name: "Way Jepara", price: ["600.000", "650.000", "750.000", "650.000", "Normal"], type: "Executive" },
    { name: "Tulang Bawang", price: ["600.000", "650.000", "750.000", "700.000", "600.000"], type: "Executive" },
    { name: "Menggala", price: ["600.000", "650.000", "750.000", "700.000", "600.000"], type: "Executive" },
    { name: "Palembang", price: ["650.000", "700.000", "800.000", "750.000", "650.000"], type: "Executive" },
    { name: "Indralaya", price: ["650.000", "700.000", "800.000", "750.000", "650.000"], type: "Executive" },
    { name: "Prabumulih", price: ["700.000", "750.000", "850.000", "800.000", "700.000"], type: "Executive" },
    { name: "Jambi", price: ["750.000", "800.000", "900.000", "850.000", "800.000"], type: "Executive" },
    { name: "Lubuk Linggau", price: ["850.000", "900.000", "1.000.000", "950.000", "900.000"], type: "Executive" },
    { name: "Muara Bungo", price: ["900.000", "950.000", "1.050.000", "1.000.000", "950.000"], type: "Executive" },
    { name: "Sungai Rumbai", price: ["950.000", "1.000.000", "1.100.000", "1.050.000", "1.000.000"], type: "Executive" },
    
    // SUPER EXECUTIVE / SUITES COMBI
    { name: "Palembang (Super Exec)", price: ["850.000", "900.000", "1.000.000", "950.000", "900.000"], type: "Super Executive" },
    { name: "Jambi (Super Exec)", price: ["900.000", "950.000", "1.100.000", "1.050.000", "950.000"], type: "Super Executive" },
    { name: "Lubuk Linggau (Super Exec)", price: ["1.000.000", "1.050.000", "1.200.000", "1.150.000", "1.050.000"], type: "Super Executive" }
];

const inputRoute = document.getElementById('routeInput');
const sBox = document.getElementById('suggestionBox');
let activeRoute = null;

// Logic Pencarian (Autocomplete)
inputRoute.addEventListener('input', () => {
    const val = inputRoute.value.toLowerCase();
    sBox.innerHTML = '';
    if (!val) { sBox.style.display = 'none'; return; }

    const matches = busRoutes.filter(r => r.name.toLowerCase().includes(val));
    if (matches.length > 0) {
        sBox.style.display = 'block';
        matches.forEach(r => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerText = `${r.name} (${r.type})`;
            div.onclick = () => {
                inputRoute.value = r.name;
                activeRoute = r;
                sBox.style.display = 'none';
            };
            sBox.appendChild(div);
        });
    } else {
        sBox.style.display = 'none';
    }
});

// Logic Hitung Harga
document.getElementById('searchBtn').onclick = () => {
    if (!activeRoute) {
        alert("Silakan ketik dan pilih rute dari saran yang muncul!");
        return;
    }

    const dateVal = document.getElementById('selectDate').value;
    const finalPrice = activeRoute.price[dateVal];

    const resultArea = document.getElementById('resultArea');
    resultArea.classList.remove('hidden');

    document.getElementById('outPrice').innerText = finalPrice === "Normal" ? "Tarif Normal" : "Rp " + finalPrice;
    document.getElementById('outRouteName').innerText = "Rute: " + activeRoute.name;
    document.getElementById('resTags').innerHTML = `<span class="tag">${activeRoute.type}</span>`;
};

// Tutup suggestion box kalau klik luar
document.addEventListener('click', (e) => {
    if (e.target !== inputRoute) sBox.style.display = 'none';
});
  
