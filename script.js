    const root = document.documentElement;
    const stage = document.getElementById('stage');
    const cursor = document.getElementById('cursor');

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    function setPointer(clientX, clientY) {
      const rect = stage.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      targetX = Math.max(-1, Math.min(1, (x - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, (y - 0.5) * 2));
      cursorX = clientX;
      cursorY = clientY;
    }

    window.addEventListener('mousemove', (event) => {
      setPointer(event.clientX, event.clientY);
      cursor.style.opacity = '0.84';
    });

    window.addEventListener('touchmove', (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      setPointer(touch.clientX, touch.clientY);
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      cursor.style.opacity = '0';
    });

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      root.style.setProperty('--mx', currentX.toFixed(4));
      root.style.setProperty('--my', currentY.toFixed(4));

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    }

    animate();