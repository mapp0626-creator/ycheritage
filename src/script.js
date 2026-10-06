const motion = document.querySelector('.motion-toggle');
motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.setAttribute('aria-label', paused ? '배경 움직임 재생' : '배경 움직임 일시 정지');
  motion.querySelector('span').textContent = paused ? '▷' : 'Ⅱ';
});
document.querySelector('#year').textContent = new Date().getFullYear();
