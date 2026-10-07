const video = document.querySelector('video.hero-photo');
const button = document.querySelector('.motion-toggle');
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

function updateButton() {
  const paused = video.paused;

  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute(
    'aria-label',
    paused ? '배경 영상 재생' : '배경 영상 일시 정지'
  );
  button.querySelector('span').textContent = paused ? '▷' : 'Ⅱ';
}

async function playVideo() {
  try {
    await video.play();
  } catch {
    // 자동 재생이 차단되면 사용자가 재생 버튼으로 시작합니다.
  }
  updateButton();
}

button.addEventListener('click', () => {
  if (video.paused) {
    playVideo();
  } else {
    video.pause();
  }
});

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

if (reducedMotion.matches) {
  video.autoplay = false;
  video.pause();
  updateButton();
} else {
  playVideo();
}

reducedMotion.addEventListener('change', event => {
  if (event.matches) video.pause();
});

document.querySelector('#year').textContent = new Date().getFullYear();