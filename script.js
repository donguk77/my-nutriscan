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

  // 5. 통계 페이지 진입 시 차트 초기화 (매번 재생성 — safeCreateChart가 내부에서 destroy 처리)
  if (id === 'stats') {
    setTimeout(initCharts, 100);
  }

  // 6. 대시보드 진입 시 미니 차트 초기화 (매번 재생성)
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
  const activeTab = document.querySelector('.smode.active');
  const mode = activeTab ? activeTab.getAttribute('data-mode') : 'food';

  // 1) 셔터 플래시
  const flash = document.createElement('div');
  Object.assign(flash.style, {
    position: 'fixed', inset: '0', background: 'white',
    zIndex: '9999', opacity: '1', transition: 'opacity 0.3s'
  });
  document.body.appendChild(flash);
  setTimeout(() => flash.style.opacity = '0', 80);
  
  // 2) 로딩 화면 전환 및 스텝 문구 설정
  setTimeout(() => { 
    flash.remove(); 
    
    // 모드별 로딩 텍스트 설정
    const lsteps = document.querySelectorAll('.lstep');
    if (mode === 'ocr') {
      lsteps[0].textContent = '✓ 이미지 내 텍스트 영역 감지 완료';
      lsteps[1].textContent = '✓ 영양성분표 OCR 텍스트 추출 (신뢰도 99.1%)';
      lsteps[2].textContent = '⟳ 영양소 데이터 구조 파싱 중...';
    } else if (mode === 'barcode') {
      lsteps[0].textContent = '✓ 바코드 영역 감지 완료';
      lsteps[1].textContent = '✓ 바코드 번호 판독 완료 (8801043015...)';
      lsteps[2].textContent = '⟳ 상품 데이터베이스 조회 중...';
    } else {
      lsteps[0].textContent = '✓ 이미지 엣지 감지 완료';
      lsteps[1].textContent = '✓ 음식 분류 모델 실행 (신뢰도 98.5%)';
      lsteps[2].textContent = '⟳ 영양 데이터베이스 매핑 중...';
    }
    
    showPage('loading'); 
  }, 380);

  // 3) 로딩 스텝 애니메이션
  setTimeout(() => {
    const lsteps = document.querySelectorAll('.lstep');
    if (mode === 'ocr') lsteps[2].textContent = '✓ 영양소 데이터 구조 파싱 완료';
    else if (mode === 'barcode') lsteps[2].textContent = '✓ 상품 데이터베이스 조회 완료';
    else lsteps[2].textContent = '✓ 영양 데이터베이스 매핑 완료';
  }, 1400);

  // 4) 결과 화면 이동
  setTimeout(() => {
    updateResultMockData(mode); // 결과 UI 업데이트
    showPage('result');
  }, 2600);
}

// 모드별 가상 데이터 주입 헬퍼
function updateResultMockData(mode) {
  const resultTitle = document.querySelector('.result-food-name');
  const resultImg = document.querySelector('.result-food-img');
  const resultKcal = document.querySelector('.result-kcal');
  const resultAiBadge = document.querySelector('.ai-badge');
  const aiComment = document.querySelector('.ai-comment-text');

  if (mode === 'ocr') {
    resultImg.style.background = "url('assets/ocr_sample.png') center/cover";
    resultTitle.textContent = "인식된 영양성분표";
    resultAiBadge.textContent = "OCR 스캔 · 신뢰도 99.1%";
    resultKcal.innerHTML = '120 <span class="kcal-unit">kcal</span>';
    aiComment.textContent = "💡 OCR 판독 결과입니다. 당류(8g)가 다소 높게 측정되었습니다.";
  } else if (mode === 'barcode') {
    resultImg.style.background = "url('assets/barcode_sample.png') center/cover";
    resultTitle.textContent = "포카칩 오리지널";
    resultAiBadge.textContent = "바코드 매칭 성공";
    resultKcal.innerHTML = '377 <span class="kcal-unit">kcal</span>';
    aiComment.textContent = "💡 바코드로 인식된 가공식품입니다. 나트륨과 포화지방에 유의하세요!";
  } else {
    resultImg.style.background = "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80') center/cover";
    resultTitle.textContent = "연어 샐러드 보울";
    resultAiBadge.textContent = "AI 인식 · 신뢰도 99.2%";
    resultKcal.innerHTML = '385 <span class="kcal-unit">kcal</span>';
    aiComment.textContent = "💡 단백질 비율이 매우 높은 식사입니다. 오늘 단백질 목표의 32%를 한 번에 채웠어요!";
  }
}

// ── 차트 인스턴스 안전 생성 헬퍼 (중복 생성 방지) ──
const _activeCharts = {};

function safeCreateChart(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  
  // 1) 내가 관리하는 인스턴스 삭제
  if (_activeCharts[canvasId]) {
    _activeCharts[canvasId].destroy();
    delete _activeCharts[canvasId];
  }
  
  // 2) Chart.js 자체 인스턴스 삭제 (혹시 남아있을 경우)
  const existing = Chart.getChart(canvas);
  if (existing) {
    existing.destroy();
  }
  
  const chart = new Chart(canvas.getContext('2d'), config);
  _activeCharts[canvasId] = chart;
  return chart;
}

// ── 대시보드 미니 바 차트 ──
function initMiniChart() {
  const data = [1850, 1920, 2050, 2350, 1980, 1860, 1120];
  safeCreateChart('miniWeekChart', {
    type: 'bar',
    data: {
      labels: ['월', '화', '수', '목', '금', '토', '일(오늘)'],
      datasets: [{
        label: 'kcal',
        data,
        backgroundColor: data.map((v, i) =>
          v > 2000 ? '#FCA5A5' : i === 6 ? '#BAD8FD' : '#4299E1'
        ),
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
}

// ── 통계 차트 ──
function initCharts() {
  // 1) 주간 칼로리 바 차트
  const weeklyData = [1850, 1920, 2050, 2350, 1980, 1860, 1120];
  safeCreateChart('weeklyBar', {
    type: 'bar',
    data: {
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      datasets: [
        {
          label: '섭취 칼로리',
          data: weeklyData,
          backgroundColor: weeklyData.map(v => v > 2000 ? '#FCA5A5' : '#4299E1'),
          borderRadius: 6, borderSkipped: false,
        },
        {
          label: '목표선',
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

  // 2) 3대 영양소 도넛 차트
  safeCreateChart('macroPie', {
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

  // 3) 체중 변화 라인 차트
  safeCreateChart('weightLine', {
    type: 'line',
    data: {
      labels: ['5/1', '5/5', '5/8', '5/12', '5/15', '5/18', '5/21'],
      datasets: [
        {
          label: '내 체중',
          data: [78.0, 77.5, 77.0, 76.4, 76.0, 75.5, 75.2],
          borderColor: '#0070F3',
          backgroundColor: 'rgba(0,112,243,0.08)',
          fill: true, tension: 0.4,
          pointBackgroundColor: '#0070F3', pointRadius: 5,
        },
        {
          label: '목표',
          data: [78,78,77,77,76,76,75],
          borderColor: '#48BB78',
          borderDash: [5, 4], borderWidth: 2,
          pointRadius: 0, fill: false,
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

// ── UI 상호작용 및 버튼 연결 (전역 이벤트 위임) ──
document.addEventListener('click', e => {
  // 1. 다이어리 식단 삭제 버튼
  if (e.target.closest('.del-btn')) {
    const tr = e.target.closest('tr');
    if (tr) {
      tr.style.transition = 'opacity 0.2s';
      tr.style.opacity = '0';
      setTimeout(() => tr.remove(), 200);
    }
  }

  // 2. 다이어리 날짜 변경 버튼
  const dateBtn = e.target.closest('.date-nav .icon-btn');
  if (dateBtn) {
    const label = document.querySelector('.date-label');
    if (label) {
      if (dateBtn.textContent.includes('‹')) label.textContent = '어제';
      else if (dateBtn.textContent.includes('›')) label.textContent = '내일';
    }
  }

  // 3. 탭 버튼 전환 (음식 검색, 통계 기간, 스캐너 모드)
  const searchTab = e.target.closest('.search-tab');
  if (searchTab) {
    document.querySelectorAll('.search-tab').forEach(b => b.classList.remove('active'));
    searchTab.classList.add('active');
  }
  
  const periodTab = e.target.closest('.period-tab');
  if (periodTab) {
    document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
    periodTab.classList.add('active');
  }

  const smodeTab = e.target.closest('.smode');
  if (smodeTab) {
    document.querySelectorAll('.smode').forEach(b => b.classList.remove('active'));
    smodeTab.classList.add('active');
    
    // 모드에 따라 뷰파인더 배경 이미지 및 안내 텍스트 변경
    const mode = smodeTab.getAttribute('data-mode');
    const vfBg = document.querySelector('.vf-bg');
    const vfHint = document.querySelector('.vf-hint');
    if (mode === 'ocr') {
      vfBg.style.background = "url('assets/ocr_sample.png') center/cover";
      vfHint.textContent = "영양성분표가 잘 보이게 찍어주세요";
    } else if (mode === 'barcode') {
      vfBg.style.background = "url('assets/barcode_sample.png') center/cover";
      vfHint.textContent = "바코드를 네모 안에 맞춰주세요";
    } else {
      vfBg.style.background = "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80') center/cover";
      vfHint.textContent = "음식을 이 안에 맞춰주세요";
    }
  }

  // 4. 스캐너 플래시 토글
  const flashBtn = e.target.closest('.scanner-flash');
  if (flashBtn) {
    flashBtn.style.color = flashBtn.style.color === 'yellow' ? '#fff' : 'yellow';
  }

  // 5. 스캔 결과 페이지 수량 증감 버튼 (+ / -)
  const qtyBtn = e.target.closest('.qty-ctrl button');
  if (qtyBtn) {
    const span = qtyBtn.parentElement.querySelector('span');
    if (span) {
      const match = span.textContent.match(/([\d.]+)인분/);
      let qty = match ? parseFloat(match[1]) : 1;
      
      if (qtyBtn.textContent === '+') qty += 0.5;
      if (qtyBtn.textContent === '-' && qty > 0.5) qty -= 0.5;
      
      span.textContent = `${qty}인분 (${Math.round(qty * 320)}g)`;
    }
  }
});
