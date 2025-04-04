function fadeSwap(currentId, nextId, duration = 300) {
  const current = document.getElementById(currentId);
  const next = document.getElementById(nextId);

  if (!current || !next) return;

  // Oculta la actual con fade-out
  current.style.transition = `opacity ${duration}ms ease`;
  current.style.opacity = 0;

  setTimeout(() => {
    current.style.display = 'none';
    next.style.display = 'block';
    next.style.opacity = 0;

    // Aparece la nueva con fade-in
    next.style.transition = `opacity ${duration}ms ease`;
    setTimeout(() => {
      next.style.opacity = 1;
    }, 10);
  }, duration);
}


function showOverlay() {
  document.getElementById('overlay').classList.add('active');
}

function hideOverlay() {
  document.getElementById('overlay').classList.remove('active');
}
