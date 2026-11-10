// --- Data Initial Tenant Kuliner Mall ---
let tenants = [
    { id: 1, nama: "Marugame Udon", lokasi: "Lantai 2 - PIM", halalStatus: "Tersertifikasi", c1: 4, c2: 5, c3: 5, c4: 4, c5: 5 },
    { id: 2, nama: "Kopi Kenangan", lokasi: "Lantai GF - PIM", halalStatus: "Tersertifikasi", c1: 2, c2: 4, c3: 4, c4: 5, c5: 5 },
    { id: 3, nama: "Chatime", lokasi: "Lantai L1 - PIM", halalStatus: "Tersertifikasi", c1: 2, c2: 4, c3: 4, c4: 4, c5: 5 },
    { id: 4, nama: "Teazzi", lokasi: "Lantai 1 - PIM", halalStatus: "Tersertifikasi", c1: 3, c2: 4, c3: 5, c4: 3, c5: 5 },
    { id: 5, nama: "Feel Matcha", lokasi: "Lantai 2 - PIM", halalStatus: "Belum Sertifikasi", c1: 3, c2: 4, c3: 4, c4: 4, c5: 3 },
    { id: 6, nama: "Solaria", lokasi: "Lantai 3 - PIM", halalStatus: "Tersertifikasi", c1: 3, c2: 3, c3: 4, c4: 3, c5: 5 },
    { id: 7, nama: "Gokana Ramen", lokasi: "Lantai 2 - PIM", halalStatus: "Tersertifikasi", c1: 3, c2: 4, c3: 4, c4: 4, c5: 5 }
];

// Configuration Kriteria: C1 (Cost), C2-C5 (Benefit)
let weights = {
    c1: 0.25, // Harga
    c2: 0.30, // Rasa
    c3: 0.20, // Kebersihan
    c4: 0.15, // Kecepatan
    c5: 0.10  // Halal
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

    // Modal Controls
    const modal = document.getElementById('tenant-modal');
    document.getElementById('btn-open-modal').addEventListener('click', () => {
        document.getElementById('modal-title').textContent = "Tambah Tenant Makanan";
        document.getElementById('tenant-form').reset();
        document.getElementById('tenant-id').value = "";
        modal.classList.remove('hidden');
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('btn-cancel-modal').addEventListener('click', () => modal.classList.add('hidden'));

    // Form Submission
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
    active.className = "tab-btn active px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5";
    inactives.forEach(t => {
        t.className = "tab-btn px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5";
    });
}

function showView(activeView, inactiveViews) {
    activeView.classList.remove('hidden');
    inactiveViews.forEach(v => v.classList.add('hidden'));
}

// --- ENGINE SPK (Murni Metode CoCoSo) ---
function calculateSPK() {
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

    const results = calculateCoCoSo(filtered);

    // Sort Descending by CoCoSo Score (k_i)
    results.sort((a, b) => b.score - a.score);

    // Render All Views
    renderTopRecommendation(results[0]);
    renderRankingList(results);
    renderMatrixTable(results);
    if (!document.getElementById('view-chart').classList.contains('hidden')) {
        renderChart(results);
    }
}

// --- Algoritma CoCoSo (Combined Compromise Solution) ---
function calculateCoCoSo(data) {
    const lambda = 0.5;
    const criteriaKeys = ['c1', 'c2', 'c3', 'c4', 'c5'];
    const types = { c1: 'cost', c2: 'benefit', c3: 'benefit', c4: 'benefit', c5: 'benefit' };

    // 1. Min & Max per kriteria
    const minMax = {};
    criteriaKeys.forEach(c => {
        const vals = data.map(d => d[c]);
        minMax[c] = { min: Math.min(...vals), max: Math.max(...vals) };
    });

    // 2. Normalisasi Min-Max & Perhitungan S_i (Additive) & P_i (Power)
    const calculatedData = data.map(item => {
        let S_i = 0;
        let P_i = 0;

        criteriaKeys.forEach(c => {
            const w = weights[c];
            const val = item[c];
            const { min, max } = minMax[c];

            // Formula Normalisasi Min-Max
            let r_ij = (max === min) 
                ? 1 
                : (types[c] === 'benefit' ? (val - min) / (max - min) : (max - val) / (max - min));

            S_i += w * r_ij;
            P_i += Math.pow(r_ij === 0 ? 0.0001 : r_ij, w);
        });

        return { ...item, S_i, P_i };
    });

    // 3. Min/Max & Sum untuk S_i dan P_i
    const sumS_P = calculatedData.reduce((acc, d) => acc + d.S_i + d.P_i, 0);
    const minS = Math.min(...calculatedData.map(d => d.S_i));
    const maxS = Math.max(...calculatedData.map(d => d.S_i));
    const minP = Math.min(...calculatedData.map(d => d.P_i));
    const maxP = Math.max(...calculatedData.map(d => d.P_i));

    // 4. Hitung Kompromi (k_ia, k_ib, k_ic) & Skor Akhir CoCoSo (k_i)
    return calculatedData.map(item => {
        const k_ia = (item.P_i + item.S_i) / (sumS_P || 1);
        const k_ib = (item.S_i / (minS || 1)) + (item.P_i / (minP || 1));
        const k_ic = (lambda * item.S_i + (1 - lambda) * item.P_i) / 
                     ((lambda * maxS + (1 - lambda) * maxP) || 1);

        // Formula Skor Akhir CoCoSo (k_i)
        const score = Math.cbrt(k_ia * k_ib * k_ic) + (1 / 3) * (k_ia + k_ib + k_ic);

        return { ...item, score, k_ia, k_ib, k_ic };
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
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-accent"></i> ${topItem.halalStatus}
        </span>
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg">
            S_i: ${topItem.S_i.toFixed(3)}
        </span>
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg">
            P_i: ${topItem.P_i.toFixed(3)}
        </span>
    `;
    lucide.createIcons();
}

function renderRankingList(results) {
    const container = document.getElementById('view-ranking');
    container.innerHTML = "";

    results.forEach((item, index) => {
        const isTop = index === 0;
        const rankBadgeClass = isTop ? "rank-badge-top" : "rank-badge-normal";

        const card = document.createElement('div');
        card.className = `ranking-card ${isTop ? 'top-rank' : ''} rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`;

        card.innerHTML = `
            <div class="flex items-center gap-3.5">
                <div class="w-9 h-9 ${rankBadgeClass} rounded-xl flex items-center justify-center font-mono text-sm shrink-0">
                    #${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-white text-base flex items-center gap-2">
                        ${item.nama}
                        ${isTop ? '<span class="badge-brand text-[10px] px-2 py-0.5 rounded-full uppercase">Rekomendasi CoCoSo</span>' : ''}
                    </h4>
                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sub mt-1">
                        <span><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${item.lokasi}</span>
                        <span>•</span>
                        <span>Rasa: ${item.c2}/5</span>
                        <span>•</span>
                        <span>Halal: ${item.halalStatus}</span>
                    </div>
                </div>
            </div>
            
            <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-t-card">
                <div class="text-right">
                    <span class="text-[10px] uppercase tracking-wider text-sub block">Skor CoCoSo (k_i)</span>
                    <span class="text-lg font-bold font-mono text-accent">${item.score.toFixed(4)}</span>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="editTenant(${item.id})" class="p-2 text-sub hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                    </button>
                    <button onclick="deleteTenant(${item.id})" class="p-2 text-sub hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

function renderMatrixTable(results) {
    const tbody = document.getElementById('matrix-tbody');
    tbody.innerHTML = "";

    results.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/40 transition-colors";
        tr.innerHTML = `
            <td class="p-3 font-semibold text-white">${item.nama} <span class="text-[10px] text-sub font-normal block">${item.lokasi}</span></td>
            <td class="p-3 text-center font-mono">${item.c1}</td>
            <td class="p-3 text-center font-mono text-emerald-400">${item.c2}</td>
            <td class="p-3 text-center font-mono text-blue-400">${item.c3}</td>
            <td class="p-3 text-center font-mono text-yellow-400">${item.c4}</td>
            <td class="p-3 text-center font-mono text-purple-400">${item.c5}</td>
            <td class="p-3 text-center font-mono text-emerald-400">${item.S_i ? item.S_i.toFixed(3) : '-'}</td>
            <td class="p-3 text-center font-mono text-cyan-400">${item.P_i ? item.P_i.toFixed(3) : '-'}</td>
            <td class="p-3 text-center font-mono font-bold text-amber-400">${item.score.toFixed(4)}</td>
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
        results = calculateCoCoSo(filtered);
        results.sort((a, b) => b.score - a.score);
    }

    const ctx = document.getElementById('spkChart').getContext('2d');
    
    if (spkChart) spkChart.destroy();

    spkChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.map(r => r.nama),
            datasets: [{
                label: 'Skor Akhir CoCoSo (k_i)',
                data: results.map(r => r.score),
                backgroundColor: results.map((_, i) => i === 0 ? '#10b981' : '#06b6d4'),
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
                    grid: { color: '#1e2942' },
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
        <div class="text-center py-12 text-sub">
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