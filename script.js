document.addEventListener('DOMContentLoaded', function() {
  // Create Matrix background
  createMatrixBackground();
  
  // Initialize any other scripts you might have
  // initCarousel();
});

function createMatrixBackground() {
  const matrixBg = document.createElement('div');
  matrixBg.className = 'matrix-bg';
  document.body.appendChild(matrixBg);
  
  // Create columns of falling characters
  const numColumns = Math.floor(window.innerWidth / 20);
  
  for (let i = 0; i < numColumns; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${i * 20}px`;
    
    // Random speed for each column
    const speed = Math.random() * 3 + 1;
    column.style.animationDuration = `${speed}s`;
    
    // Random delay for each column
    const delay = Math.random() * 2;
    column.style.animationDelay = `${delay}s`;
    
    // Fill with random characters
    const columnHeight = Math.floor(window.innerHeight / 20);
    for (let j = 0; j < columnHeight; j++) {
      const char = document.createElement('div');
      char.textContent = getRandomMatrixCharacter();
      column.appendChild(char);
      
      // Randomly change characters over time
      setInterval(() => {
        if (Math.random() > 0.98) {
          char.textContent = getRandomMatrixCharacter();
        }
      }, 1000);
    }
    
    matrixBg.appendChild(column);
  }
}

function getRandomMatrixCharacter() {
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

// Adjust matrix background on window resize
window.addEventListener('resize', function() {
  const matrixBg = document.querySelector('.matrix-bg');
  if (matrixBg) {
    matrixBg.innerHTML = '';
    createMatrixBackground();
  }
});
