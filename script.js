// NutriScan SPA Router & Logic

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

  // 4. GNB 노출 여부 관리 (온보딩/로그인/스캐너 에서는 숨김)
  const gnb = document.getElementById('globalNav');
  if (viewId === 'view-onboarding' || viewId === 'view-auth' || viewId === 'view-scanner' || viewId === 'view-loading') {
    gnb.style.display = 'none';
  } else {
    gnb.style.display = 'block';
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
  
  // 최초 진입 시 온보딩 화면 표출 (이미 HTML에 active 있음)
});

// 기능별 헬퍼 함수들
function login() {
  alert('로그인 되었습니다.');
  navigateTo('view-dashboard');
}

function logout() {
  alert('로그아웃 되었습니다.');
  navigateTo('view-onboarding');
}

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
    
    // 3초 후 결과 화면 이동 (타이머 에뮬레이션)
    setTimeout(() => {
      navigateTo('view-result');
    }, 3000);
  }, 400);
}
