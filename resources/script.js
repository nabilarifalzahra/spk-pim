// --- Data Initial (Alternatif Tenant Kuliner Mall) ---
let tenants = [
    { id: 1, nama: "Marugame Udon", lokasi: "Lantai 2 - PIM", halalStatus: "Tersertifikasi", c1: 4, c2: 5, c3: 5, c4: 4, c5: 5 },
    { id: 2, nama: "Kopi Kenangan", lokasi: "Lantai GF - PIM", halalStatus: "Tersertifikasi", c1: 2, c2: 4, c3: 4, c4: 5, c5: 5 },
    { id: 3, nama: "Chatime", lokasi: "Lantai L1 - PIM", halalStatus: "Tersertifikasi", c1: 2, c2: 4, c3: 4, c4: 4, c5: 5 },
    { id: 4, nama: "Teazzi", lokasi: "Lantai 1 - PIM", halalStatus: "Tersertifikasi", c1: 3, c2: 4, c3: 5, c4: 3, c5: 5 },
    { id: 5, nama: "Feel Matcha", lokasi: "Lantai 2 - PIM", halalStatus: "Belum Sertifikasi", c1: 3, c2: 4, c3: 4, c4: 4, c5: 3 },
    { id: 6, nama: "Solaria", lokasi: "Lantai 3 - PIM", halalStatus: "Tersertifikasi", c1: 3, c2: 3, c3: 4, c4: 3, c5: 5 },
    { id: 7, nama: "Gokana Ramen", lokasi: "Lantai 2 - PIM", halalStatus: "Tersertifikasi", c1: 3, c2: 4, c3: 4, c4: 4, c5: 5 }
];

// Configuration Kriteria: C1 (Harga/Cost), C2-C5 (Benefit)
let currentMethod = 'SAW';
let weights = {
    c1: 0.25, // Harga (Cost)
    c2: 0.30, // Rasa (Benefit)
    c3: 0.20, // Kebersihan (Benefit)
    c4: 0.15, // Kecepatan (Benefit)
    c5: 0.10  // Halal (Benefit)
};

let spkChart = null;

// --- Initialize App ---
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initEventListeners();
    calculateSPK();
});

// --- Event Listeners ---
function initEventListeners() {
    // Weight Sliders
    ['harga', 'rasa', 'kebersihan', 'kecepatan', 'halal'].forEach((key, idx) => {
        const input = document.getElementById(`w-${key}`);
        const display = document.getElementById(`val-w-${key}`);
        input.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            display.textContent = val.toFixed(2);
            weights[`c${idx + 1}`] = val;
            calculateSPK();
        });
    });

    // Reset Weights Button
    document.getElementById('btn-reset-weights').addEventListener('click', () => {
        const defaults = { harga: 0.25, rasa: 0.30, kebersihan: 0.20, kecepatan: 0.15, halal: 0.10 };
        Object.keys(defaults).forEach((key, idx) => {
            document.getElementById(`w-${key}`).value = defaults[key];
            document.getElementById(`val-w-${key}`).textContent = defaults[key].toFixed(2);
            weights[`c${idx + 1}`] = defaults[key];
        });
        calculateSPK();
    });

    // Recalculate Button
    document.getElementById('btn-recalculate').addEventListener('click', calculateSPK);

    // Method Switches
    const btnSaw = document.getElementById('btn-method-saw');
    const btnTopsis = document.getElementById('btn-method-topsis');
    
    btnSaw.addEventListener('click', () => {
        currentMethod = 'SAW';
        btnSaw.className = "flex-1 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 shadow transition-all";
        btnTopsis.className = "flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-slate-200 transition-all";
        document.getElementById('method-indicator').textContent = "Metode: SAW";
        calculateSPK();
    });

    btnTopsis.addEventListener('click', () => {
        currentMethod = 'TOPSIS';
        btnTopsis.className = "flex-1 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 shadow transition-all";
        btnSaw.className = "flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-slate-200 transition-all";
        document.getElementById('method-indicator').textContent = "Metode: TOPSIS";
        calculateSPK();
    });

    // Filter Listeners
    document.getElementById('filter-search').addEventListener('input', calculateSPK);
    document.getElementById('filter-halal').addEventListener('change', calculateSPK);

    // Tab Navigation
    const tabRank = document.getElementById('tab-btn-rank');
    const tabChart = document.getElementById('tab-btn-chart');
    const tabMatrix = document.getElementById('tab-btn-matrix');

    const viewRank = document.getElementById('view-ranking');
    const viewChart = document.getElementById('view-chart');
    const viewMatrix = document.getElementById('view-matrix');

    tabRank.addEventListener('click', () => {
        setActiveTab(tabRank, [tabChart, tabMatrix]);
        showView(viewRank, [viewChart, viewMatrix]);
    });

    tabChart.addEventListener('click', () => {
        setActiveTab(tabChart, [tabRank, tabMatrix]);
        showView(viewChart, [viewRank, viewMatrix]);
        renderChart();
    });

    tabMatrix.addEventListener('click', () => {
        setActiveTab(tabMatrix, [tabRank, tabChart]);
        showView(viewMatrix, [viewRank, viewChart]);
    });

    // Modal Control
    const modal = document.getElementById('tenant-modal');
    document.getElementById('btn-open-modal').addEventListener('click', () => {
        document.getElementById('modal-title').textContent = "Tambah Tenant Makanan";
        document.getElementById('tenant-form').reset();
        document.getElementById('tenant-id').value = "";
        modal.classList.remove('hidden');
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('btn-cancel-modal').addEventListener('click', () => modal.classList.add('hidden'));

    // Tenant Form Submission
    document.getElementById('tenant-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('tenant-id').value;
        const newTenant = {
            id: id ? parseInt(id) : Date.now(),
            nama: document.getElementById('form-nama').value,
            lokasi: document.getElementById('form-lokasi').value,
            halalStatus: document.getElementById('form-halal').value,
            c1: parseInt(document.getElementById('form-c1').value),
            c2: parseInt(document.getElementById('form-c2').value),
            c3: parseInt(document.getElementById('form-c3').value),
            c4: parseInt(document.getElementById('form-c4').value),
            c5: parseInt(document.getElementById('form-c5').value),
        };

        if (id) {
            const index = tenants.findIndex(t => t.id == id);
            if (index !== -1) tenants[index] = newTenant;
        } else {
            tenants.push(newTenant);
        }

        modal.classList.add('hidden');
        calculateSPK();
    });
}

function setActiveTab(active, inactives) {
    active.className = "px-4 py-2 text-xs font-bold rounded-xl bg-slate-700 text-amber-400 border border-slate-600 flex items-center gap-1.5";
    inactives.forEach(t => {
        t.className = "px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:bg-slate-700/50 flex items-center gap-1.5";
    });
}

function showView(activeView, inactiveViews) {
    activeView.classList.remove('hidden');
    inactiveViews.forEach(v => v.classList.add('hidden'));
}

// --- ENGINE SPK (SAW & TOPSIS) ---
function calculateSPK() {
    // 1. Filter Tenants
    const searchValue = document.getElementById('filter-search').value.toLowerCase();
    const halalFilter = document.getElementById('filter-halal').value;

    let filtered = tenants.filter(t => {
        const matchSearch = t.nama.toLowerCase().includes(searchValue) || t.lokasi.toLowerCase().includes(searchValue);
        const matchHalal = halalFilter === 'certified' ? t.halalStatus === 'Tersertifikasi' : true;
        return matchSearch && matchHalal;
    });

    if (filtered.length === 0) {
        renderEmptyState();
        return;
    }

    let results = [];

    if (currentMethod === 'SAW') {
        results = calculateSAW(filtered);
    } else {
        results = calculateTOPSIS(filtered);
    }

    // Sort Descending by Score
    results.sort((a, b) => b.score - a.score);

    // Render Views
    renderTopRecommendation(results[0]);
    renderRankingList(results);
    renderMatrixTable(filtered);
    if (!document.getElementById('view-chart').classList.contains('hidden')) {
        renderChart(results);
    }
}

// --- Algoritma Simple Additive Weighting (SAW) ---
function calculateSAW(data) {
    // Cari nilai Min untuk C1 (Cost) dan Max untuk C2-C5 (Benefit)
    const minC1 = Math.min(...data.map(d => d.c1));
    const maxC2 = Math.max(...data.map(d => d.c2));
    const maxC3 = Math.max(...data.map(d => d.c3));
    const maxC4 = Math.max(...data.map(d => d.c4));
    const maxC5 = Math.max(...data.map(d => d.c5));

    return data.map(item => {
        // Normalisasi Matriks (R)
        const r1 = minC1 / item.c1; // Cost
        const r2 = item.c2 / maxC2; // Benefit
        const r3 = item.c3 / maxC3;
        const r4 = item.c4 / maxC4;
        const r5 = item.c5 / maxC5;

        // Total Bobot Terbobot (V)
        const score = (r1 * weights.c1) + (r2 * weights.c2) + (r3 * weights.c3) + (r4 * weights.c4) + (r5 * weights.c5);

        return { ...item, score, normalized: { r1, r2, r3, r4, r5 } };
    });
}

// --- Algoritma TOPSIS ---
function calculateTOPSIS(data) {
    // 1. Pembagi Normalisasi Vektor
    const divC1 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.c1, 2), 0));
    const divC2 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.c2, 2), 0));
    const divC3 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.c3, 2), 0));
    const divC4 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.c4, 2), 0));
    const divC5 = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.c5, 2), 0));

    // 2. Matriks Terbobot (Y)
    const weightedData = data.map(item => ({
        ...item,
        y1: (item.c1 / divC1) * weights.c1,
        y2: (item.c2 / divC2) * weights.c2,
        y3: (item.c3 / divC3) * weights.c3,
        y4: (item.c4 / divC4) * weights.c4,
        y5: (item.c5 / divC5) * weights.c5,
    }));

    // 3. Solusi Ideal Positif (A+) dan Solusi Ideal Negatif (A-)
    // C1 is Cost -> A+ is Min, A- is Max
    const aPlus = {
        y1: Math.min(...weightedData.map(d => d.y1)),
        y2: Math.max(...weightedData.map(d => d.y2)),
        y3: Math.max(...weightedData.map(d => d.y3)),
        y4: Math.max(...weightedData.map(d => d.y4)),
        y5: Math.max(...weightedData.map(d => d.y5)),
    };

    const aMinus = {
        y1: Math.max(...weightedData.map(d => d.y1)),
        y2: Math.min(...weightedData.map(d => d.y2)),
        y3: Math.min(...weightedData.map(d => d.y3)),
        y4: Math.min(...weightedData.map(d => d.y4)),
        y5: Math.min(...weightedData.map(d => d.y5)),
    };

    // 4. Jarak Ideal (D+ dan D-) & Preferensi (V)
    return weightedData.map(item => {
        const dPlus = Math.sqrt(
            Math.pow(item.y1 - aPlus.y1, 2) +
            Math.pow(item.y2 - aPlus.y2, 2) +
            Math.pow(item.y3 - aPlus.y3, 2) +
            Math.pow(item.y4 - aPlus.y4, 2) +
            Math.pow(item.y5 - aPlus.y5, 2)
        );

        const dMinus = Math.sqrt(
            Math.pow(item.y1 - aMinus.y1, 2) +
            Math.pow(item.y2 - aMinus.y2, 2) +
            Math.pow(item.y3 - aMinus.y3, 2) +
            Math.pow(item.y4 - aMinus.y4, 2) +
            Math.pow(item.y5 - aMinus.y5, 2)
        );

        const score = dMinus / (dPlus + dMinus);

        return { ...item, score };
    });
}

// --- UI Renderers ---
function renderTopRecommendation(topItem) {
    if (!topItem) return;
    document.getElementById('rec-title').textContent = topItem.nama;
    document.getElementById('rec-subtitle').textContent = `Lokasi: ${topItem.lokasi}`;
    document.getElementById('rec-score').textContent = topItem.score.toFixed(4);

    const tagsContainer = document.getElementById('rec-tags');
    tagsContainer.innerHTML = `
        <span class="text-xs bg-slate-900/80 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> ${topItem.halalStatus}
        </span>
        <span class="text-xs bg-slate-900/80 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg">
            Skor Rasa: ${topItem.c2}/5
        </span>
        <span class="text-xs bg-slate-900/80 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg">
            Tingkat Harga: ${topItem.c1}/5
        </span>
    `;
    lucide.createIcons();
}

function renderRankingList(results) {
    const container = document.getElementById('view-ranking');
    container.innerHTML = "";

    results.forEach((item, index) => {
        const isTop = index === 0;
        const rankBadgeClass = isTop 
            ? "bg-amber-500 text-slate-950 font-black" 
            : "bg-slate-700 text-slate-300 font-bold";

        const card = document.createElement('div');
        card.className = `ranking-card bg-slate-900/60 border ${isTop ? 'border-amber-500/50' : 'border-slate-700/60'} rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`;

        card.innerHTML = `
            <div class="flex items-center gap-3.5">
                <div class="w-9 h-9 ${rankBadgeClass} rounded-xl flex items-center justify-center font-mono text-sm shrink-0">
                    #${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-white text-base flex items-center gap-2">
                        ${item.nama}
                        ${isTop ? '<span class="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase">Terbaik</span>' : ''}
                    </h4>
                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                        <span><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${item.lokasi}</span>
                        <span>•</span>
                        <span>Saji: ${item.c4}/5</span>
                        <span>•</span>
                        <span>Kebersihan: ${item.c3}/5</span>
                    </div>
                </div>
            </div>
            
            <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div class="text-right">
                    <span class="text-[10px] uppercase tracking-wider text-slate-400 block">Skor Akhir</span>
                    <span class="text-lg font-bold font-mono text-amber-400">${item.score.toFixed(4)}</span>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="editTenant(${item.id})" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                    </button>
                    <button onclick="deleteTenant(${item.id})" class="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

function renderMatrixTable(data) {
    const tbody = document.getElementById('matrix-tbody');
    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/40 transition-colors";
        tr.innerHTML = `
            <td class="p-3 font-semibold text-white">${item.nama} <span class="text-[10px] text-slate-400 font-normal block">${item.lokasi}</span></td>
            <td class="p-3 text-center font-mono">${item.c1}</td>
            <td class="p-3 text-center font-mono text-emerald-400">${item.c2}</td>
            <td class="p-3 text-center font-mono text-blue-400">${item.c3}</td>
            <td class="p-3 text-center font-mono text-yellow-400">${item.c4}</td>
            <td class="p-3 text-center font-mono text-purple-400">${item.c5}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderChart(results) {
    if (!results) {
        const searchValue = document.getElementById('filter-search').value.toLowerCase();
        const halalFilter = document.getElementById('filter-halal').value;
        let filtered = tenants.filter(t => {
            const matchSearch = t.nama.toLowerCase().includes(searchValue) || t.lokasi.toLowerCase().includes(searchValue);
            const matchHalal = halalFilter === 'certified' ? t.halalStatus === 'Tersertifikasi' : true;
            return matchSearch && matchHalal;
        });
        results = currentMethod === 'SAW' ? calculateSAW(filtered) : calculateTOPSIS(filtered);
        results.sort((a, b) => b.score - a.score);
    }

    const ctx = document.getElementById('spkChart').getContext('2d');
    
    if (spkChart) spkChart.destroy();

    spkChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.map(r => r.nama),
            datasets: [{
                label: `Skor Akhir (${currentMethod})`,
                data: results.map(r => r.score),
                backgroundColor: results.map((_, i) => i === 0 ? '#f59e0b' : '#3b82f6'),
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#334155' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
}

function renderEmptyState() {
    document.getElementById('view-ranking').innerHTML = `
        <div class="text-center py-12 text-slate-500">
            <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
            <p>Tidak ada tenant makanan yang cocok dengan filter.</p>
        </div>
    `;
    document.getElementById('rec-title').textContent = "Tidak Ada Data";
    document.getElementById('rec-subtitle').textContent = "Ubah kata kunci pencarian atau filter";
    document.getElementById('rec-score').textContent = "0.0000";
    document.getElementById('rec-tags').innerHTML = "";
    lucide.createIcons();
}

// --- Action Helpers ---
window.editTenant = function(id) {
    const item = tenants.find(t => t.id === id);
    if (!item) return;

    document.getElementById('modal-title').textContent = "Edit Tenant Makanan";
    document.getElementById('tenant-id').value = item.id;
    document.getElementById('form-nama').value = item.nama;
    document.getElementById('form-lokasi').value = item.lokasi;
    document.getElementById('form-halal').value = item.halalStatus;
    document.getElementById('form-c1').value = item.c1;
    document.getElementById('form-c2').value = item.c2;
    document.getElementById('form-c3').value = item.c3;
    document.getElementById('form-c4').value = item.c4;
    document.getElementById('form-c5').value = item.c5;

    document.getElementById('tenant-modal').classList.remove('hidden');
};

window.deleteTenant = function(id) {
    if (confirm("Apakah Anda yakin ingin menghapus tenant ini dari daftar?")) {
        tenants = tenants.filter(t => t.id !== id);
        calculateSPK();
    }
};