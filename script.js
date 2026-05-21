// ============================================
// NutriScan SPA Router v3.0 - Bulletproof
// ============================================

const PAGES_WITH_GNB   = ['dashboard','diary','search','stats','result','settings'];
const PAGES_WITHOUT_GNB = ['onboarding','auth','scanner','loading'];
let chartsReady = false;

// ── 핵심 라우터 ──
function showPage(id) {
  // 1. 모든 페이지 숨기기
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // 2. 대상 페이지 표시
  const target = document.getElementById('page-' + id);
  if (!target) { console.error('Page not found:', id); return; }
  target.classList.add('active');

  // 3. GNB 표시/숨김
  const gnb = document.getElementById('gnb');
  if (PAGES_WITHOUT_GNB.includes(id)) {
    gnb.style.display = 'none';
  } else {
    gnb.style.display = 'block';
    // GNB 활성 탭 업데이트
    document.querySelectorAll('.nav-link').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-page') === id);
    });
  }

  // 4. 통계 페이지 진입 시 차트 초기화
  if (id === 'stats' && !chartsReady) {
    setTimeout(initCharts, 100); // DOM 렌더 후 실행
    chartsReady = true;
  }

  // 5. 대시보드 진입 시 미니 차트 초기화
  if (id === 'dashboard') {
    setTimeout(initMiniChart, 100);
  }

  // 맨 위로
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 초기 진입 ──
document.addEventListener('DOMContentLoaded', () => {
  showPage('onboarding');
});

// ── AI 스캔 플로우 ──
function triggerScan() {
  // 셔터 플래시
  const flash = document.createElement('div');
  Object.assign(flash.style, {
    position: 'fixed', inset: '0', background: 'white',
    zIndex: '9999', opacity: '1', transition: 'opacity 0.3s'
  });
  document.body.appendChild(flash);
  setTimeout(() => flash.style.opacity = '0', 80);
  setTimeout(() => { flash.remove(); showPage('loading'); }, 380);

  // 로딩 스텝 애니메이션
  setTimeout(() => {
    const step = document.getElementById('stepMapping');
    if (step) step.textContent = '✓ 영양 데이터베이스 매핑 완료';
  }, 1400);

  // 결과 화면으로 이동
  setTimeout(() => {
    showPage('result');
    // 스텝 텍스트 초기화 (다음 스캔을 위해)
    const step = document.getElementById('stepMapping');
    if (step) step.textContent = '⟳ 영양 데이터베이스 매핑 중...';
  }, 2600);
}

// ── 대시보드 미니 라인 차트 ──
function initMiniChart() {
  const canvas = document.getElementById('miniWeekChart');
  if (!canvas || canvas._chartInstance) return;

  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['월', '화', '수', '목', '금', '토', '일(오늘)'],
      datasets: [{
        label: 'kcal',
        data: [1850, 1920, 2050, 2350, 1980, 1860, 1120],
        backgroundColor: ctx => {
          const v = [1850,1920,2050,2350,1980,1860,1120][ctx.dataIndex];
          return v > 2000 ? '#FCA5A5' : ctx.dataIndex === 6 ? '#BAD8FD' : '#4299E1';
        },
        borderRadius: 6, borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: t => t.raw + ' kcal' } } },
      scales: {
        y: { beginAtZero: false, min: 1000, max: 2600, grid: { color: '#F0F2F5' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
  canvas._chartInstance = chart;
}

// ── 통계 차트 ──
function initCharts() {

  // 1) 주간 칼로리 바 차트
  const barCanvas = document.getElementById('weeklyBar');
  if (barCanvas && !barCanvas._chartInstance) {
    barCanvas._chartInstance = new Chart(barCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            label: '섭취 칼로리',
            data: [1850, 1920, 2050, 2350, 1980, 1860, 1120],
            backgroundColor: d => d.raw > 2000 ? '#FCA5A5' : '#4299E1',
            borderRadius: 6, borderSkipped: false,
          },
          {
            label: '목표',
            data: [2000,2000,2000,2000,2000,2000,2000],
            type: 'line',
            borderColor: '#0070F3',
            borderDash: [6, 3],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false, min: 1000, max: 2600, grid: { color: '#F0F2F5' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 2) 3대 영양소 도넛 차트
  const pieCanvas = document.getElementById('macroPie');
  if (pieCanvas && !pieCanvas._chartInstance) {
    pieCanvas._chartInstance = new Chart(pieCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['탄수화물 50%', '단백질 30%', '지방 20%'],
        datasets: [{
          data: [50, 30, 20],
          backgroundColor: ['#4299E1', '#48BB78', '#ED8936'],
          borderWidth: 0, hoverOffset: 8,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 16 } } }
      }
    });
  }

  // 3) 체중 변화 라인 차트
  const lineCanvas = document.getElementById('weightLine');
  if (lineCanvas && !lineCanvas._chartInstance) {
    lineCanvas._chartInstance = new Chart(lineCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['5/1', '5/5', '5/8', '5/12', '5/15', '5/18', '5/21'],
        datasets: [
          {
            label: '내 체중',
            data: [78.0, 77.5, 77.0, 76.4, 76.0, 75.5, 75.2],
            borderColor: '#0070F3',
            backgroundColor: 'rgba(0,112,243,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#0070F3',
            pointRadius: 5,
          },
          {
            label: '목표',
            data: [78,78,77,77,76,76,75],
            borderColor: '#48BB78',
            borderDash: [5, 4],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 16 } } },
        scales: {
          y: { min: 73, max: 79.5, grid: { color: '#F0F2F5' }, ticks: { callback: v => v + 'kg' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}
