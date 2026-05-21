document.addEventListener('DOMContentLoaded', () => {
  const scanButton = document.getElementById('scanButton');
  const snackbar = document.getElementById('snackbar');

  scanButton.addEventListener('click', () => {
    // 버튼 클릭 시 스낵바 표시
    snackbar.className = 'show';
    
    // 3초 후 스낵바 숨김 처리
    setTimeout(() => {
      snackbar.className = snackbar.className.replace('show', '');
    }, 3000);
  });
});
