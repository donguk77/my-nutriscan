// NutriScan SPA Router & Logic

let chartsInitialized = false;

// 전역 화면 전환 함수
function navigateTo(viewId) {
  // 1. 모든 뷰 숨김
  const views = document.querySelectorAll('.page-view');
  views.forEach(view => {
    view.classList.remove('active');
  });

  // 2. 타겟 뷰 표시
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // 3. 네비게이션(GNB) 업데이트
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const activeNavItem = document.querySelector(`.nav-item[data-target="${viewId}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }

  // 4. GNB 노출 여부 관리 (온보딩/로그인/스캐너/로딩 에서는 숨김)
  const gnb = document.getElementById('globalNav');
  if (viewId === 'view-onboarding' || viewId === 'view-auth' || viewId === 'view-scanner' || viewId === 'view-loading') {
    gnb.style.display = 'none';
  } else {
    gnb.style.display = 'block';
  }
  
  // 5. 통계 뷰 진입 시 차트 렌더링
  if (viewId === 'view-stats' && !chartsInitialized) {
    initCharts();
    chartsInitialized = true;
  }
  
  // 맨 위로 스크롤
  window.scrollTo(0, 0);
}

// 이벤트 리스너 바인딩 (GNB 탭 이동용)
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      if (target) navigateTo(target);
    });
  });
});

// 로그인 / 로그아웃 모의 동작
function login() {
  navigateTo('view-dashboard');
}

function logout() {
  navigateTo('view-onboarding');
}

// AI 스캐너 셔터 트리거
function triggerScan() {
  // 플래시 효과
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.inset = '0';
  flash.style.backgroundColor = 'white';
  flash.style.zIndex = '9999';
  flash.style.transition = 'opacity 0.2s';
  document.body.appendChild(flash);
  
  setTimeout(() => flash.style.opacity = '0', 50);
  setTimeout(() => flash.remove(), 250);

  // 로딩 화면 이동
  setTimeout(() => {
    navigateTo('view-loading');
    
    // 가짜 로딩 스텝 연출
    const steps = document.querySelectorAll('.loading-steps .step');
    setTimeout(() => {
      if(steps[2]) steps[2].textContent = "✓ 영양 데이터베이스 매핑 완료";
    }, 1500);

    // 2.5초 후 결과 화면 이동
    setTimeout(() => {
      navigateTo('view-result');
      // 로딩 스텝 초기화
      if(steps[2]) steps[2].textContent = "↻ 영양 데이터베이스 매핑 중...";
    }, 2500);
  }, 400);
}

// Chart.js 통계 차트 렌더링 (가상 데이터)
function initCharts() {
  // 1. 주간 칼로리 바 차트
  const barCtx = document.getElementById('weeklyBarChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
          label: '섭취 칼로리 (kcal)',
          data: [1850, 1920, 1880, 2350, 2050, 1980, 1420], // 목요일 초과, 일요일 진행중 데이터
          backgroundColor: [
            '#4299E1', '#4299E1', '#4299E1', '#F56565', '#4299E1', '#4299E1', '#EDF2F7'
          ],
          borderRadius: 4
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
            max: 3000,
            grid: { color: '#EDF2F7' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. 3대 영양소 도넛 차트
  const pieCtx = document.getElementById('macroDoughnutChart');
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['탄수화물', '단백질', '지방'],
        datasets: [{
          data: [50, 30, 20],
          backgroundColor: ['#4299E1', '#48BB78', '#ED8936'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}
