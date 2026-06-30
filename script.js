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





    const factorySection = document.querySelector(".factory-addon");
const factoryParallaxItems = document.querySelectorAll("[data-factory-depth]");

let factoryMouseX = 0;
let factoryMouseY = 0;

if (factorySection) {
  factorySection.addEventListener("mousemove", (event) => {
    const rect = factorySection.getBoundingClientRect();

    factoryMouseX = (event.clientX - rect.left) / rect.width - 0.5;
    factoryMouseY = (event.clientY - rect.top) / rect.height - 0.5;

    factoryParallaxItems.forEach((item) => {
      const depth = Number(item.dataset.factoryDepth || 0.1);
      const moveX = factoryMouseX * depth * 180;
      const moveY = factoryMouseY * depth * 180;
      const rotate = factoryMouseX * depth * 40;

      item.style.transform = `
        translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))
        rotate(${rotate}deg)
      `;
    });
  });
}

const factoryRevealItems = document.querySelectorAll(
  ".factory-step, .factory-terminal, .skills-production-grid article"
);

const factoryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.animate(
      [
        { opacity: 0, transform: "translateY(36px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 700,
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "forwards"
      }
    );

    factoryObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.14
});

factoryRevealItems.forEach((item) => {
  item.style.opacity = "0";
  factoryObserver.observe(item);
});