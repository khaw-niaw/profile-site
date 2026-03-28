// ================================================
// introduction.js — 人脈紹介サービスページ専用スクリプト
// ================================================

// ── Plan Card Hover Highlight ──
(function () {
  const grid = document.querySelector('.plan-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.plan-card');
  const defaultCard = grid.querySelector('.plan-card.recommended');

  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      // スタンダード（デフォルト）にホバーしたらリセット
      if (card === defaultCard) {
        cards.forEach(function (c) {
          c.classList.remove('active');
          c.classList.remove('dimmed');
        });
        return;
      }
      // 全カードをdimmedに
      cards.forEach(function (c) {
        c.classList.remove('active');
        c.classList.add('dimmed');
      });
      // ホバー中のカードだけをactiveに
      card.classList.remove('dimmed');
      card.classList.add('active');
    });
  });

  grid.addEventListener('mouseleave', function () {
    // マウスがグリッドから離れたらデフォルト状態に戻す
    cards.forEach(function (c) {
      c.classList.remove('active');
      c.classList.remove('dimmed');
    });
  });
})();
