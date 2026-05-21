document.addEventListener('DOMContentLoaded', () => {
  const scanStartBtn = document.getElementById('scanStartBtn');
  const navScanBtn = document.getElementById('navScanBtn');
  const closeScanBtn = document.getElementById('closeScanBtn');
  const shutterButton = document.getElementById('shutterButton');
  
  const scanSection = document.getElementById('scanSection');
  const loadingSection = document.getElementById('loadingSection');

  // 화면 전환 함수 (Fluid Motion)
  function showOverlay(section) {
    section.style.display = 'flex';
    setTimeout(() => {
      section.classList.add('active');
    }, 50);
  }

  function hideOverlay(section) {
    section.classList.remove('active');
    setTimeout(() => {
      section.style.display = 'none';
    }, 400); // CSS 트랜지션 시간과 동일하게
  }

  // 1. "AI 스캐너 열기" 또는 네비게이션 클릭 시 스캔 모달 열기
  scanStartBtn.addEventListener('click', () => {
    showOverlay(scanSection);
  });
  
  navScanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showOverlay(scanSection);
  });

  // 닫기 버튼
  closeScanBtn.addEventListener('click', () => {
    hideOverlay(scanSection);
  });

  // 2. 셔터 버튼 클릭 시 찰칵 모션 후 로딩 화면으로 이동
  shutterButton.addEventListener('click', () => {
    // 찰칵 애니메이션 (화면 번쩍임)
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.backgroundColor = 'white';
    flash.style.zIndex = '99999';
    flash.style.transition = 'opacity 0.2s';
    document.body.appendChild(flash);
    
    // 플래시 효과 페이드 아웃
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 200);
    }, 50);

    // 셔터 찰칵 직후(400ms 대기) 카메라 닫고 로딩 화면 열기
    setTimeout(() => {
      hideOverlay(scanSection);
      showOverlay(loadingSection);
    }, 400); 

    // 5초간 스캔 로딩 보여주고 복귀 (테스트용)
    setTimeout(() => {
      hideOverlay(loadingSection);
    }, 5500); 
  });
});
