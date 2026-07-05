// 1. Gate Animation Trigger
window.addEventListener('load', () => {
  // Short delay so users see the closed gate before it opens
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
});

// 2. Scratch to Reveal Logic
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  
  // Fill canvas with a solid color and texture text
  ctx.fillStyle = '#87A96B'; // Sage green cover
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = '20px Poppins';
  ctx.fillStyle = '#2C4C3B';
  ctx.textAlign = 'center';
  ctx.fillText('Scratch Here', canvas.width/2, canvas.height/2);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isDrawing = false;

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  // Handle both mouse and touch events
  const clientX = evt.clientX || (evt.touches ? evt.touches[0].clientX : 0);
  const clientY = evt.clientY || (evt.touches ? evt.touches[0].clientY : 0);
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function scratch(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getMousePos(canvas, e);
  
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
  ctx.fill();
}

// Mouse Events
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);

// Touch Events for Mobile
canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
canvas.addEventListener('touchmove', (e) => scratch(e), { passive: false });
canvas.addEventListener('touchend', () => isDrawing = false);
