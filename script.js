document.addEventListener('DOMContentLoaded', () => {
  const scanButton = document.getElementById('scanButton');
  const shutterButton = document.getElementById('shutterButton');
  
  const dashboardSection = document.getElementById('dashboardSection');
  const scanSection = document.getElementById('scanSection');
  const loadingSection = document.getElementById('loadingSection');

  // 화면 전환 함수 (Fluid Motion)
  function switchSection(from, to) {
    from.classList.remove('active');
    setTimeout(() => {
      to.classList.add('active');
    }, 50); // 약간의 딜레이로 트랜지션 트리거
  }

  // 1. "스캔 시작하기" 클릭 시 -> 카메라 뷰파인더(scan) 화면으로 이동
  scanButton.addEventListener('click', () => {
    switchSection(dashboardSection, scanSection);
  });

  // 2. 카메라 화면에서 셔터 버튼 클릭 시 -> 찰칵 모션 후 로딩(loading) 화면으로 이동
  shutterButton.addEventListener('click', () => {
    // 찰칵 애니메이션 (화면 번쩍임)
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.zIndex = '9999';
    flash.style.transition = 'opacity 0.2s';
    document.body.appendChild(flash);
    
    // 플래시 효과 페이드 아웃
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 200);
    }, 50);

    // 셔터 찰칵 직후(400ms 대기) 로딩 화면 전환
    setTimeout(() => {
      switchSection(scanSection, loadingSection);
    }, 400); 

    // (추가 연출) 로딩 화면 후 다시 처음으로 돌아가는 테스트 플로우 
    // 실제 운영 시에는 이 부분에서 Result Render State로 넘어감
    setTimeout(() => {
      switchSection(loadingSection, dashboardSection);
    }, 5000); // 5초간 스캔 로딩 보여주고 복귀
  });
});
