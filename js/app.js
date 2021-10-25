import '../sass/style.scss';

class Sky {
   constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = window.innerWidth;
      this.height = window.innerHeight;
   }

   initCanvas() {
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.width, this.height);
   }

   generateStars(count) {
      const stars = [];

      for (let i = 0; i < count; i++) {
         const radius = Math.random() * 3 + 2;

         stars.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            radius: radius,
            color: '#fff',
         })
      }

      this.stars = stars;
   }

   drawStars() {
      this.stars.forEach(star => {
         this.drawStar(star);
      })
   }

   draw() {
      this.drawStars();
      window.requestAnimationFrame(() => this.draw());
   }

   drawStar(star) {
      this.ctx.save();

      this.ctx.fillStyle = star.color;

      this.ctx.beginPath();

      this.ctx.translate(star.x, star.y);
      this.ctx.moveTo(0, 0 - star.radius);

      for (let i = 0; i < 5; i++) {
         this.ctx.rotate((Math.PI / 180) * 36);
         this.ctx.lineTo(0, 0 - star.radius * 0.55);
         this.ctx.rotate((Math.PI / 180) * 36);
         this.ctx.lineTo(0, 0 - star.radius);
      }

      this.ctx.fill();
      this.ctx.restore();
   }

   run() {
      this.initCanvas();
      this.generateStars(160);
      this.draw();
   }
}

const sky = new Sky(document.querySelector('.canvas'));

sky.run();