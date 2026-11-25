const tenants = [
    { id: 1, nama: "Teazzi", c1: 1, c2: 3, c3: 2, c4: 2, c5: 1, c6: 1, c7: 1, c8: 2, c9: 4.5, c10: 1, c11: 2 },
    { id: 2, nama: "Wingstop", c1: 2, c2: 3, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1, c8: 2, c9: 4.8, c10: 2, c11: 2 },
    { id: 3, nama: "Kebab Baba Rafi", c1: 1, c2: 2, c3: 1, c4: 1, c5: 1, c6: 1, c7: 2, c8: 2, c9: 4.5, c10: 1, c11: 2 },
    { id: 4, nama: "Feel Matcha", c1: 1, c2: 3, c3: 2, c4: 2, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 5, nama: "Kopi Kenangan", c1: 1, c2: 2, c3: 2, c4: 2, c5: 1, c6: 1, c7: 2, c8: 1, c9: 4.7, c10: 2, c11: 2 },
    { id: 6, nama: "RamenYA!", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 2, c8: 1, c9: 4.9, c10: 2, c11: 2 },
    { id: 7, nama: "Chatime", c1: 1, c2: 2, c3: 3, c4: 2, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.9, c10: 1, c11: 2 },
    { id: 8, nama: "Boost Juice", c1: 1, c2: 3, c3: 2, c4: 2, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.8, c10: 1, c11: 2 },
    { id: 9, nama: "Dcrepes", c1: 1, c2: 2, c3: 1, c4: 2, c5: 1, c6: 1, c7: 1, c8: 2, c9: 4.2, c10: 1, c11: 2 },
    { id: 10, nama: "Kimukatsu", c1: 2, c2: 4, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 11, nama: "Hai Sushi", c1: 2, c2: 3, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.7, c10: 2, c11: 2 },
    { id: 12, nama: "Kichenette", c1: 2, c2: 4, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 13, nama: "Imperial Dimsum", c1: 2, c2: 4, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.9, c10: 2, c11: 2 },
    { id: 14, nama: "Raacha Suki & BBQ", c1: 2, c2: 4, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.9, c10: 2, c11: 2 },
    { id: 15, nama: "Gyukaku", c1: 2, c2: 5, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.9, c10: 2, c11: 2 },
    { id: 16, nama: "Sushi Hiro", c1: 2, c2: 4, c3: 1, c4: 1, c5: 2, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 17, nama: "Yakiniku Like", c1: 2, c2: 5, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.8, c10: 2, c11: 3 },
    { id: 18, nama: "Starbucks", c1: 1, c2: 5, c3: 2, c4: 2, c5: 1, c6: 2, c7: 1, c8: 1, c9: 4.6, c10: 2, c11: 2 },
    { id: 19, nama: "Marugame", c1: 2, c2: 4, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.7, c10: 2, c11: 3 },
    { id: 20, nama: "Pepper Lunch", c1: 2, c2: 5, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.9, c10: 2, c11: 2 },
    { id: 21, nama: "JCO", c1: 1, c2: 2, c3: 1, c4: 2, c5: 1, c6: 1, c7: 1, c8: 2, c9: 4.4, c10: 2, c11: 4 },
    { id: 22, nama: "Toby's Estate", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.9, c10: 2, c11: 3 },
    { id: 23, nama: "Yoshinoya", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 2, c8: 1, c9: 4.0, c10: 2, c11: 3 },
    { id: 24, nama: "Haraku", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 3 },
    { id: 25, nama: "Sancha", c1: 1, c2: 3, c3: 2, c4: 2, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 26, nama: "Chikuro", c1: 1, c2: 3, c3: 1, c4: 1, c5: 1, c6: 2, c7: 1, c8: 1, c9: 4.3, c10: 1, c11: 4 },
    { id: 27, nama: "Solaria", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 3, c7: 3, c8: 2, c9: 3.9, c10: 2, c11: 4 },
    { id: 28, nama: "Haraku Ramen", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 29, nama: "Tomoro Cafe", c1: 1, c2: 2, c3: 2, c4: 2, c5: 1, c6: 2, c7: 1, c8: 2, c9: 4.0, c10: 2, c11: 2 },
    { id: 30, nama: "Sekar", c1: 2, c2: 4, c3: 3, c4: 1, c5: 1, c6: 2, c7: 2, c8: 2, c9: 2.7, c10: 2, c11: 4 },
    { id: 31, nama: "Beard Papa's", c1: 1, c2: 2, c3: 1, c4: 2, c5: 1, c6: 2, c7: 3, c8: 2, c9: 1.4, c10: 1, c11: 2 },
    { id: 32, nama: "Sour Sally", c1: 1, c2: 4, c3: 1, c4: 2, c5: 1, c6: 2, c7: 2, c8: 2, c9: 3.7, c10: 1, c11: 2 },
    { id: 33, nama: "Tianlala", c1: 1, c2: 2, c3: 2, c4: 2, c5: 1, c6: 2, c7: 1, c8: 2, c9: 3.0, c10: 1, c11: 2 },
    { id: 34, nama: "Mixue", c1: 1, c2: 2, c3: 2, c4: 2, c5: 1, c6: 2, c7: 2, c8: 2, c9: 4.0, c10: 1, c11: 2 },
    { id: 35, nama: "Truffle Belly", c1: 2, c2: 3, c3: 1, c4: 1, c5: 1, c6: 2, c7: 2, c8: 2, c9: 3.7, c10: 1, c11: 2 },
    { id: 36, nama: "Bakmi jakarta", c1: 2, c2: 2, c3: 1, c4: 1, c5: 1, c6: 2, c7: 2, c8: 2, c9: 4.0, c10: 1, c11: 2 },
    { id: 37, nama: "Roti O", c1: 1, c2: 2, c3: 3, c4: 2, c5: 1, c6: 1, c7: 2, c8: 2, c9: 2.2, c10: 1, c11: 1 },
    { id: 38, nama: "A&W", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.7, c10: 2, c11: 2 },
    { id: 39, nama: "Shihlin", c1: 1, c2: 3, c3: 1, c4: 1, c5: 1, c6: 2, c7: 2, c8: 2, c9: 3.2, c10: 1, c11: 2 },
    { id: 40, nama: "Ramenation", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 41, nama: "Top Noodle", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 5.0, c10: 2, c11: 2 },
    { id: 42, nama: "Limau", c1: 2, c2: 3, c3: 1, c4: 1, c5: 2, c6: 2, c7: 3, c8: 2, c9: 2.5, c10: 1, c11: 2 },
    { id: 43, nama: "Ooma Cafe", c1: 1, c2: 2, c3: 3, c4: 2, c5: 2, c6: 1, c7: 2, c8: 1, c9: 4.7, c10: 1, c11: 1 },
    { id: 44, nama: "Baskin Robbins", c1: 1, c2: 4, c3: 2, c4: 2, c5: 1, c6: 1, c7: 1, c8: 2, c9: 4.5, c10: 1, c11: 1 },
    { id: 45, nama: "Brasserie Bakery", c1: 1, c2: 2, c3: 3, c4: 2, c5: 1, c6: 1, c7: 1, c8: 2, c9: 4.5, c10: 2, c11: 1 },
    { id: 46, nama: "Gamchi", c1: 1, c2: 2, c3: 1, c4: 1, c5: 1, c6: 1, c7: 2, c8: 2, c9: 4.6, c10: 1, c11: 2 },
    { id: 47, nama: "The People's Cafe", c1: 2, c2: 3, c3: 3, c4: 1, c5: 1, c6: 1, c7: 1, c8: 1, c9: 4.8, c10: 2, c11: 2 }
];

const criteriaKeys = ['c2', 'c5', 'c6', 'c7', 'c8', 'c9', 'c11'];

let weights = {
    c2: 0.20,
    c5: 0.15,
    c6: 0.15,
    c7: 0.10,
    c8: 0.10,
    c9: 0.20,
    c11: 0.10
};

let userCriteriaTypes = {
    c2: 'cost',
    c5: 'cost',
    c6: 'cost',
    c7: 'cost',
    c8: 'cost',
    c9: 'benefit',
    c11: 'cost'
};

const labelsMap = {
    c1: { 1: "Snack", 2: "Makanan Berat" },
    c2: { 1: "< Rp15k", 2: "Rp15k - Rp30k", 3: "Rp30k - Rp60k", 4: "Rp60k - Rp100k", 5: "> Rp100k" },
    c3: { 1: "Makanan", 2: "Minuman", 3: "Makanan & Minuman" },
    c4: { 1: "Savoury (Gurih)", 2: "Sweet (Manis)" },
    c5: { 1: "Halal", 2: "Belum Halal" },
    c6: { 1: "Bersih", 2: "Lumayan", 3: "Tidak" },
    c7: { 1: "Bagus", 2: "Lumayan", 3: "Tidak" },
    c8: { 1: "Bagus", 2: "Lumayan", 3: "Tidak" },
    c10: { 1: "Tenant", 2: "Restoran" },
    c11: { 1: "< 5 mnt", 2: "5 - 15 mnt", 3: "16 - 30 mnt", 4: "31 - 45 mnt", 5: "> 45 mnt" }
};

let spkChart = null;
let currentRankedResults = [];

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initEventListeners();
    updateTotalWeightDisplay();
    calculateSPK();
});

function getTotalWeight() {
    const sum = criteriaKeys.reduce((acc, k) => acc + weights[k], 0);
    return Math.round(sum * 100) / 100;
}

function updateTotalWeightDisplay() {
    const total = getTotalWeight();
    const remaining = Math.max(0, Math.round((1.0 - total) * 100) / 100);
    const badge = document.getElementById('total-weight-badge');
    const info = document.getElementById('weight-remaining-info');

    badge.textContent = `W = ${total.toFixed(2)} / 1.00`;
    info.textContent = `Sisa kuota bobot: ${remaining.toFixed(2)} (Maksimal 1.00)`;

    if (total === 1.0) {
        badge.classList.add('text-emerald-400');
        badge.classList.remove('text-amber-400');
    } else {
        badge.classList.add('text-amber-400');
        badge.classList.remove('text-emerald-400');
    }
}

function initEventListeners() {
    criteriaKeys.forEach(key => {
        const input = document.getElementById(`w-${key}`);
        const display = document.getElementById(`val-w-${key}`);
        const typeSelect = document.getElementById(`type-${key}`);

        input.addEventListener('input', (e) => {
            let requestedVal = Math.round(parseFloat(e.target.value) * 100) / 100;
            const otherSum = criteriaKeys
                .filter(k => k !== key)
                .reduce((acc, k) => acc + weights[k], 0);
            const maxAllowed = Math.max(0, Math.round((1.0 - otherSum) * 100) / 100);

            if (requestedVal > maxAllowed) {
                requestedVal = maxAllowed;
                e.target.value = requestedVal.toFixed(2);
            }

            weights[key] = requestedVal;
            display.textContent = requestedVal.toFixed(2);
            updateTotalWeightDisplay();
            calculateSPK();
        });

        typeSelect.addEventListener('change', (e) => {
            userCriteriaTypes[key] = e.target.value;
            calculateSPK();
        });
    });

    document.getElementById('btn-reset-weights').addEventListener('click', () => {
        const defaults = { c2: 0.20, c5: 0.15, c6: 0.15, c7: 0.10, c8: 0.10, c9: 0.20, c11: 0.10 };
        const defaultTypes = { c2: 'cost', c5: 'cost', c6: 'cost', c7: 'cost', c8: 'cost', c9: 'benefit', c11: 'cost' };

        criteriaKeys.forEach(key => {
            weights[key] = defaults[key];
            userCriteriaTypes[key] = defaultTypes[key];
            document.getElementById(`w-${key}`).value = defaults[key].toFixed(2);
            document.getElementById(`val-w-${key}`).textContent = defaults[key].toFixed(2);
            document.getElementById(`type-${key}`).value = defaultTypes[key];
        });

        updateTotalWeightDisplay();
        calculateSPK();
    });

    document.getElementById('btn-recalculate').addEventListener('click', () => {
        criteriaKeys.forEach(key => {
            weights[key] = 0.00;
            document.getElementById(`w-${key}`).value = "0.00";
            document.getElementById(`val-w-${key}`).textContent = "0.00";
        });

        updateTotalWeightDisplay();
        calculateSPK();
    });

    const btnSaveHistory = document.getElementById('btn-save-history');
    if (btnSaveHistory) {
        btnSaveHistory.addEventListener('click', saveCurrentHistory);
    }

    document.getElementById('filter-search').addEventListener('input', calculateSPK);
    ['filter-c1', 'filter-c3', 'filter-c4', 'filter-c5', 'filter-c10'].forEach(id => {
        document.getElementById(id).addEventListener('change', calculateSPK);
    });

    const tabRank = document.getElementById('tab-btn-rank');
    const tabChart = document.getElementById('tab-btn-chart');
    const tabMatrix = document.getElementById('tab-btn-matrix');
    const tabHistory = document.getElementById('tab-btn-history');

    const viewRank = document.getElementById('view-ranking');
    const viewChart = document.getElementById('view-chart');
    const viewMatrix = document.getElementById('view-matrix');
    const viewHistory = document.getElementById('view-history');

    tabRank.addEventListener('click', () => {
        setActiveTab(tabRank, [tabChart, tabMatrix, tabHistory]);
        showView(viewRank, [viewChart, viewMatrix, viewHistory]);
    });

    tabChart.addEventListener('click', () => {
        setActiveTab(tabChart, [tabRank, tabMatrix, tabHistory]);
        showView(viewChart, [viewRank, viewMatrix, viewHistory]);
        renderChart();
    });

    tabMatrix.addEventListener('click', () => {
        setActiveTab(tabMatrix, [tabRank, tabChart, tabHistory]);
        showView(viewMatrix, [viewRank, viewChart, viewHistory]);
    });

    if (tabHistory && viewHistory) {
        tabHistory.addEventListener('click', () => {
            setActiveTab(tabHistory, [tabRank, tabChart, tabMatrix]);
            showView(viewHistory, [viewRank, viewChart, viewMatrix]);
            loadHistoryFromDB();
        });
    }
}

function setActiveTab(active, inactives) {
    active.className = "tab-btn active px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5";
    inactives.forEach(t => {
        if (t) t.className = "tab-btn px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5";
    });
}

function showView(activeView, inactiveViews) {
    activeView.classList.remove('hidden');
    inactiveViews.forEach(v => {
        if (v) v.classList.add('hidden');
    });
}

function getFilteredTenants() {
    const searchValue = document.getElementById('filter-search').value.toLowerCase();
    const fC1 = document.getElementById('filter-c1').value;
    const fC3 = document.getElementById('filter-c3').value;
    const fC4 = document.getElementById('filter-c4').value;
    const fC5 = document.getElementById('filter-c5').value;
    const fC10 = document.getElementById('filter-c10').value;

    return tenants.filter(t => {
        const matchSearch = t.nama.toLowerCase().includes(searchValue);
        const matchC1 = fC1 === 'all' ? true : t.c1 === parseInt(fC1);
        const matchC3 = fC3 === 'all' ? true : t.c3 === parseInt(fC3);
        const matchC4 = fC4 === 'all' ? true : t.c4 === parseInt(fC4);
        const matchC5 = fC5 === 'all' ? true : t.c5 === parseInt(fC5);
        const matchC10 = fC10 === 'all' ? true : t.c10 === parseInt(fC10);
        return matchSearch && matchC1 && matchC3 && matchC4 && matchC5 && matchC10;
    });
}

function calculateSPK() {
    const filtered = getFilteredTenants();
    document.getElementById('count-badge').textContent = `${filtered.length} Alternatif • λ = 0.5`;

    if (filtered.length === 0) {
        currentRankedResults = [];
        renderEmptyState();
        return;
    }

    const isZeroWeight = getTotalWeight() === 0;
    const results = calculateCoCoSo(filtered);

    if (!isZeroWeight) {
        results.sort((a, b) => b.score - a.score);
        renderTopRecommendation(results[0]);
    } else {
        renderNoRecommendationState();
    }

    currentRankedResults = results;
    renderRankingList(results, isZeroWeight);
    renderMatrixTable(results);
    if (!document.getElementById('view-chart').classList.contains('hidden')) {
        renderChart(results);
    }
}

function calculateCoCoSo(data) {
    const lambda = 0.5;
    const totalRawWeight = getTotalWeight();

    if (totalRawWeight === 0) {
        return data.map(item => ({
            ...item,
            S_i: 0,
            P_i: 0,
            k_ia: 0,
            k_ib: 0,
            k_ic: 0,
            score: 0
        }));
    }

    const activeWeights = {};
    criteriaKeys.forEach(c => {
        activeWeights[c] = totalRawWeight === 1 ? weights[c] : (weights[c] / totalRawWeight);
    });

    const minMax = {};
    criteriaKeys.forEach(c => {
        const vals = data.map(d => d[c]);
        minMax[c] = { min: Math.min(...vals), max: Math.max(...vals) };
    });

    const calculatedData = data.map(item => {
        let S_i = 0;
        let P_i = 0;

        criteriaKeys.forEach(c => {
            const w = activeWeights[c];
            if (w <= 0) return; 
            const val = item[c];
            const { min, max } = minMax[c];

            let r_ij = 1;
            if (max !== min) {
                if (userCriteriaTypes[c] === 'benefit') {
                    r_ij = (val - min) / (max - min);
                } else {
                    r_ij = (max - val) / (max - min);
                }
            }

            S_i += w * r_ij;
            P_i += Math.pow(r_ij, w);
        });

        return { ...item, S_i, P_i };
    });

    const sumS_P = calculatedData.reduce((acc, d) => acc + d.S_i + d.P_i, 0);
    const minS = Math.min(...calculatedData.map(d => d.S_i));
    const maxS = Math.max(...calculatedData.map(d => d.S_i));
    const minP = Math.min(...calculatedData.map(d => d.P_i));
    const maxP = Math.max(...calculatedData.map(d => d.P_i));

    return calculatedData.map(item => {
        const k_ia = sumS_P > 0 ? (item.P_i + item.S_i) / sumS_P : 0;
        const k_ib = (minS > 0 ? item.S_i / minS : 0) + (minP > 0 ? item.P_i / minP : 0);
        const denomIc = (lambda * maxS) + ((1 - lambda) * maxP);
        const k_ic = denomIc > 0 ? ((lambda * item.S_i) + ((1 - lambda) * item.P_i)) / denomIc : 0;

        const score = Math.cbrt(k_ia * k_ib * k_ic) + ((k_ia + k_ib + k_ic) / 3);

        return { ...item, k_ia, k_ib, k_ic, score };
    });
}

function renderTopRecommendation(topItem) {
    if (!topItem) return;
    document.getElementById('rec-title').textContent = topItem.nama;
    document.getElementById('rec-subtitle').textContent = `${labelsMap.c10[topItem.c10]} • ${labelsMap.c1[topItem.c1]} (${labelsMap.c3[topItem.c3]}) • Rasa ${labelsMap.c4[topItem.c4]}`;
    document.getElementById('rec-score').textContent = topItem.score.toFixed(4);

    const tagsContainer = document.getElementById('rec-tags');
    tagsContainer.innerHTML = `
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-accent"></i> ${labelsMap.c5[topItem.c5]}
        </span>
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg">
            Harga: ${labelsMap.c2[topItem.c2]}
        </span>
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg">
            Rating: ${topItem.c9 > 0 ? topItem.c9.toFixed(1) : 'N/A'}
        </span>
        <span class="text-xs score-box border text-main px-2.5 py-1 rounded-lg">
            S_i: ${topItem.S_i.toFixed(4)} | P_i: ${topItem.P_i.toFixed(4)}
        </span>
    `;
    lucide.createIcons();
}

function renderNoRecommendationState() {
    document.getElementById('rec-title').textContent = "Belum Ada Rekomendasi";
    document.getElementById('rec-subtitle').textContent = "Atur bobot kriteria (> 0.00) terlebih dahulu untuk menentukan rekomendasi terbaik";
    document.getElementById('rec-score').textContent = "0.0000";
    document.getElementById('rec-tags').innerHTML = "";
}

function renderRankingList(results, isZeroWeight = false) {
    const container = document.getElementById('view-ranking');
    container.innerHTML = "";

    results.forEach((item, index) => {
        const isTop = !isZeroWeight && index === 0;
        const rankBadgeClass = isTop ? "rank-badge-top" : "rank-badge-normal";

        const card = document.createElement('div');
        card.className = `ranking-card ${isTop ? 'top-rank' : ''} rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`;

        card.innerHTML = `
            <div class="flex items-center gap-3.5">
                <div class="w-9 h-9 ${rankBadgeClass} rounded-xl flex items-center justify-center font-mono text-sm shrink-0">
                    #${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-white text-base flex flex-wrap items-center gap-2">
                        ${item.nama}
                        ${isTop ? '<span class="badge-brand text-[10px] px-2 py-0.5 rounded-full uppercase">Rekomendasi #1</span>' : ''}
                    </h4>
                    <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-sub mt-1">
                        <span>${labelsMap.c10[item.c10]} • ${labelsMap.c1[item.c1]}</span>
                        <span>•</span>
                        <span>Harga: ${labelsMap.c2[item.c2]}</span>
                        <span>•</span>
                        <span>Rating: ${item.c9 > 0 ? item.c9.toFixed(1) : '-'}</span>
                        <span>•</span>
                        <span>${labelsMap.c5[item.c5]}</span>
                    </div>
                </div>
            </div>
            
            <div class="flex items-center w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-t-card">
                <span class="text-[10px] uppercase tracking-wider text-sub sm:hidden">Skor CoCoSo (k_i)</span>
                <div class="text-right">
                    <span class="text-[10px] uppercase tracking-wider text-sub hidden sm:block">Skor CoCoSo (k_i)</span>
                    <span class="text-lg font-bold font-mono text-accent">${item.score.toFixed(4)}</span>
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

    results.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/40 transition-colors";
        tr.innerHTML = `
            <td class="p-2.5 font-semibold text-white whitespace-nowrap">#${idx + 1} ${item.nama}</td>
            <td class="p-2.5 text-center font-mono text-sub">${item.c1}</td>
            <td class="p-2.5 text-center font-mono text-red-300">${item.c2}</td>
            <td class="p-2.5 text-center font-mono text-sub">${item.c3}</td>
            <td class="p-2.5 text-center font-mono text-sub">${item.c4}</td>
            <td class="p-2.5 text-center font-mono text-purple-300">${item.c5}</td>
            <td class="p-2.5 text-center font-mono text-blue-300">${item.c6}</td>
            <td class="p-2.5 text-center font-mono text-emerald-300">${item.c7}</td>
            <td class="p-2.5 text-center font-mono text-cyan-300">${item.c8}</td>
            <td class="p-2.5 text-center font-mono text-amber-300">${item.c9.toFixed(1)}</td>
            <td class="p-2.5 text-center font-mono text-sub">${item.c10}</td>
            <td class="p-2.5 text-center font-mono text-orange-300">${item.c11}</td>
            <td class="p-2.5 text-center font-mono text-emerald-400">${item.S_i.toFixed(4)}</td>
            <td class="p-2.5 text-center font-mono text-cyan-400">${item.P_i.toFixed(4)}</td>
            <td class="p-2.5 text-center font-mono text-pink-300">${item.k_ia.toFixed(4)}</td>
            <td class="p-2.5 text-center font-mono text-purple-300">${item.k_ib.toFixed(4)}</td>
            <td class="p-2.5 text-center font-mono text-indigo-300">${item.k_ic.toFixed(4)}</td>
            <td class="p-2.5 text-center font-mono font-bold text-amber-400">${item.score.toFixed(4)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderChart(results) {
    const isZeroWeight = getTotalWeight() === 0;
    if (!results) {
        const filtered = getFilteredTenants();
        results = calculateCoCoSo(filtered);
        if (!isZeroWeight) {
            results.sort((a, b) => b.score - a.score);
        }
    }

    const topResults = results.slice(0, 15);
    const ctx = document.getElementById('spkChart').getContext('2d');
    if (spkChart) spkChart.destroy();

    spkChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topResults.map(r => r.nama),
            datasets: [{
                label: 'Skor Akhir CoCoSo (k_i)',
                data: topResults.map(r => r.score),
                backgroundColor: topResults.map((_, i) => (!isZeroWeight && i === 0) ? '#ec4899' : '#c084fc'),
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
                    grid: { color: '#2e2340' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', maxRotation: 45, minRotation: 25 }
                }
            }
        }
    });
}

function renderEmptyState() {
    document.getElementById('view-ranking').innerHTML = `
        <div class="text-center py-12 text-sub">
            <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
            <p>Tidak ada tempat makan/minuman yang cocok dengan filter.</p>
        </div>
    `;
    document.getElementById('matrix-tbody').innerHTML = "";
    document.getElementById('rec-title').textContent = "Tidak Ada Data";
    document.getElementById('rec-subtitle').textContent = "Ubah kata kunci pencarian atau filter kriteria atribut";
    document.getElementById('rec-score').textContent = "0.0000";
    document.getElementById('rec-tags').innerHTML = "";
    lucide.createIcons();
}

// ==========================================
// FITUR DATABASE RIWAYAT (MYSQL LARAGON)
// ==========================================

async function saveCurrentHistory() {
    if (getTotalWeight() === 0 || currentRankedResults.length === 0) {
        alert("Atur bobot kriteria (> 0.00) terlebih dahulu sebelum menyimpan riwayat.");
        return;
    }

    const top1 = currentRankedResults[0];
    const top3Text = currentRankedResults
        .slice(0, 3)
        .map((item, idx) => `#${idx + 1} ${item.nama} (${item.score.toFixed(4)})`)
        .join(" • ");

    const payload = {
        weights: weights,
        types: userCriteriaTypes,
        rekomendasi_1: top1.nama,
        skor_ki: top1.score.toFixed(4),
        top_3_ringkasan: top3Text
    };

    try {
        const res = await fetch('api_riwayat.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.status === 'success') {
            alert("Hasil perhitungan berhasil disimpan ke database riwayat!");
            if (!document.getElementById('view-history').classList.contains('hidden')) {
                loadHistoryFromDB();
            }
        } else {
            alert("Gagal menyimpan: " + (data.message || "Error server"));
        }
    } catch (err) {
        alert("Tidak dapat terhubung ke api_riwayat.php. Pastikan Apache & MySQL Laragon aktif.");
    }
}

async function loadHistoryFromDB() {
    const container = document.getElementById('view-history');
    if (!container) return;
    container.innerHTML = `<div class="text-center py-10 text-sub text-xs">Memuat riwayat...</div>`;

    try {
        const res = await fetch('api_riwayat.php');
        const json = await res.json();

        if (json.status !== 'success' || !json.data || json.data.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-sub">
                    <i data-lucide="folder-open" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
                    <p class="text-xs">Belum ada riwayat perhitungan yang tersimpan di database.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        container.innerHTML = "";
        json.data.forEach(row => {
            const parsedWeights = JSON.parse(row.bobot_json);
            const parsedTypes = JSON.parse(row.tipe_json);

            const bobotTags = Object.entries(parsedWeights)
                .filter(([_, val]) => val > 0)
                .map(([k, val]) => `${k.toUpperCase()}:${val.toFixed(2)}(${parsedTypes[k] === 'benefit' ? 'B' : 'C'})`)
                .join(" | ");

            const card = document.createElement('div');
            card.className = "ranking-card rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3";
            card.innerHTML = `
                <div class="space-y-1">
                    <div class="flex items-center gap-2 text-[11px] text-sub font-mono">
                        <i data-lucide="clock" class="w-3.5 h-3.5 text-accent"></i> ${row.waktu_simpan}
                    </div>
                    <h4 class="font-bold text-white text-sm">
                        Teratas: <span class="text-accent">${row.rekomendasi_1}</span>
                        <span class="font-mono text-xs text-sub ml-1">(k_i = ${parseFloat(row.skor_ki).toFixed(4)})</span>
                    </h4>
                    <p class="text-xs text-sub">${row.top_3_ringkasan}</p>
                    <p class="text-[11px] font-mono text-purple-300 bg-black/30 px-2 py-1 rounded inline-block">${bobotTags}</p>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button class="btn-apply-history btn-dark px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1">
                        <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-accent"></i> Terapkan Bobot
                    </button>
                    <button class="btn-delete-history px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/30">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            `;

            card.querySelector('.btn-apply-history').addEventListener('click', () => {
                criteriaKeys.forEach(key => {
                    weights[key] = parsedWeights[key] ?? 0;
                    userCriteriaTypes[key] = parsedTypes[key] ?? 'cost';
                    document.getElementById(`w-${key}`).value = weights[key].toFixed(2);
                    document.getElementById(`val-w-${key}`).textContent = weights[key].toFixed(2);
                    document.getElementById(`type-${key}`).value = userCriteriaTypes[key];
                });
                updateTotalWeightDisplay();
                calculateSPK();
                document.getElementById('tab-btn-rank').click();
            });

            card.querySelector('.btn-delete-history').addEventListener('click', async () => {
                await fetch(`api_riwayat.php?id=${row.id}`, { method: 'DELETE' });
                loadHistoryFromDB();
            });

            container.appendChild(card);
        });
        lucide.createIcons();
    } catch (err) {
        container.innerHTML = `<div class="text-center py-10 text-red-400 text-xs">Gagal memuat riwayat. Pastikan Laragon aktif dan buka via http://localhost/spk-kuliner</div>`;
    }
}