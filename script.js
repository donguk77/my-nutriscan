// NutriScan - Light Mode Benchmark Web App

function openModal(mealType) {
  const modal = document.getElementById('addFoodModal');
  const title = document.getElementById('modalTitle');
  
  title.textContent = `${mealType} - 음식 검색 및 추가`;
  modal.classList.add('active');
  
  // 모달 안쪽 클릭 시 닫히지 않도록 이벤트 버블링 방지
  const modalContent = modal.querySelector('.modal-content');
  modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // 모달 바깥 영역 클릭 시 닫기
  modal.addEventListener('click', closeModalOutside);
}

function closeModal() {
  const modal = document.getElementById('addFoodModal');
  modal.classList.remove('active');
  modal.removeEventListener('click', closeModalOutside);
}

function closeModalOutside(e) {
  if (e.target.id === 'addFoodModal') {
    closeModal();
  }
}

// 렌더링 후 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // AI 스캐너 (카메라 열기) 임시 이벤트
  const aiScanBtn = document.querySelector('.btn-outline');
  if(aiScanBtn) {
    aiScanBtn.addEventListener('click', () => {
      alert('AI 스캐너 데모는 연동 준비 중입니다.');
    });
  }
});
