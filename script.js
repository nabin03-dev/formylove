let highestZ = 1;

class Paper {
  holding = false;
  x = 0;
  y = 0;
  prevX = 0;
  prevY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {

    const start = (clientX, clientY) => {
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.prevX = clientX;
      this.prevY = clientY;
    };

    const move = (clientX, clientY) => {
      if (!this.holding) return;

      const dx = clientX - this.prevX;
      const dy = clientY - this.prevY;

      this.x += dx;
      this.y += dy;

      this.prevX = clientX;
      this.prevY = clientY;

      paper.style.transform =
        `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    };

    const end = () => {
      this.holding = false;
    };

    // Works on mobile and desktop
    paper.addEventListener("pointerdown", e => start(e.clientX, e.clientY));
    paper.addEventListener("pointermove", e => move(e.clientX, e.clientY));
    paper.addEventListener("pointerup", end);
    paper.addEventListener("pointercancel", end);

    // Fallback for DevTools / old mouse-only browsers
    paper.addEventListener("mousedown", e => {
      start(e.clientX, e.clientY);
      const onMove = ev => move(ev.clientX, ev.clientY);
      const onUp = () => {
        end();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    });
  }
}

document.querySelectorAll(".paper").forEach(paper => new Paper().init(paper));
