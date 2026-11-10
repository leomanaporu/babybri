/* ================================================================
   Javacano - Romantic 5th Monthsary Web Experience Script
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------
  // 1. Anniversary Date Counter Configuration
  // --------------------------------------------------------------
  // Set your relationship start date here (Year, MonthIndex 0-11, Day, Hour, Min)
  // Default is set to 5 months prior to today so it displays ~150-153 days!
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 5);

  const startDate = defaultStartDate;

  function updateAnniversaryTimer() {
    const now = new Date();
    const diff = Math.max(0, now - startDate);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const daysEl = document.getElementById('daysCount');
    const hoursEl = document.getElementById('hoursCount');
    const minsEl = document.getElementById('minsCount');
    const secsEl = document.getElementById('secsCount');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateAnniversaryTimer, 1000);
  updateAnniversaryTimer();

  // --------------------------------------------------------------
  // 2. Floating Romantic Hearts Canvas Background
  // --------------------------------------------------------------
  const canvas = document.getElementById('heartsCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  if (canvas && ctx) {
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const hearts = [];
    const colors = ['#fda4af', '#f43f5e', '#fb7185', '#ffe4e6', '#ffffff'];

    function createHeart() {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 20,
        size: Math.random() * 14 + 8,
        speedY: Math.random() * 0.9 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.03 + 0.01
      };
    }

    for (let i = 0; i < 28; i++) {
      const h = createHeart();
      h.y = Math.random() * height;
      hearts.push(h);
    }

    function drawHeart(x, y, size, color, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
      // bottom right curve
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function animateHearts() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y -= h.speedY;
        h.wobble += h.wobbleSpeed;
        h.x += Math.sin(h.wobble) * 0.5;

        drawHeart(h.x, h.y, h.size, h.color, h.opacity);

        if (h.y < -30) {
          hearts[i] = createHeart();
        }
      }
      requestAnimationFrame(animateHearts);
    }
    animateHearts();
  }

  // --------------------------------------------------------------
  // 3. Romantic Music Player Engine (MP3 + Ambient Chords Fallback)
  // --------------------------------------------------------------
  const musicPlayer = document.getElementById('musicPlayer');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const bgMusic = document.getElementById('bgMusic');
  const musicStatus = document.getElementById('musicStatus');

  let isPlaying = false;
  let synthAudioCtx = null;
  let synthInterval = null;

  // Web Audio API romantic melody fallback styled after Dionela's "Monday Afternoon" (G - Cmaj7 progression at ~70 BPM)
  function playRomanticSynth() {
    if (!synthAudioCtx) {
      synthAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (synthAudioCtx.state === 'suspended') {
      synthAudioCtx.resume();
    }

    // "Monday Afternoon" acoustic chord tones (G major, B, D, F#, Cmaj7 arpeggios)
    const chords = [
      [196.00, 246.94, 293.66, 392.00], // G
      [196.00, 246.94, 293.66, 369.99], // Gmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [261.63, 329.63, 392.00, 523.25]  // Cadd9 / C
    ];
    let chordIdx = 0;
    let noteIdx = 0;

    synthInterval = setInterval(() => {
      if (!isPlaying) return;
      try {
        const chord = chords[chordIdx % chords.length];
        const freq = chord[noteIdx % chord.length];

        const osc = synthAudioCtx.createOscillator();
        const gain = synthAudioCtx.createGain();
        osc.type = 'triangle'; // warm acoustic feel
        osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

        gain.gain.setValueAtTime(0.045, synthAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + 1.4);

        osc.connect(gain);
        gain.connect(synthAudioCtx.destination);
        osc.start();
        osc.stop(synthAudioCtx.currentTime + 1.4);

        noteIdx++;
        if (noteIdx >= chord.length) {
          noteIdx = 0;
          chordIdx++;
        }
      } catch (_) {}
    }, 450);
  }

  function stopRomanticSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function toggleMusic() {
    if (!isPlaying) {
      if (!bgMusic.src || !bgMusic.src.includes('Monday%20Afternoon.mp3') && !bgMusic.src.includes('Monday Afternoon.mp3')) {
        bgMusic.src = 'assets/music/Monday Afternoon.mp3';
      }
      bgMusic.load();
      bgMusic.play()
        .then(() => {
          setPlayState(true, 'Playing: Monday Afternoon ❤️');
        })
        .catch(() => {
          // Fallback to ambient acoustic chords
          playRomanticSynth();
          setPlayState(true, 'Monday Afternoon (Melody) 🎶');
        });
    } else {
      bgMusic.pause();
      stopRomanticSynth();
      setPlayState(false, 'Music Paused');
    }
  }

  function setPlayState(playing, statusText) {
    isPlaying = playing;
    if (playing) {
      musicPlayer.classList.add('playing');
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      if (musicStatus) musicStatus.textContent = statusText;
    } else {
      musicPlayer.classList.remove('playing');
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      if (musicStatus) musicStatus.textContent = statusText;
    }
  }

  function autoStartMusic() {
    if (!bgMusic || isPlaying) return;

    bgMusic.volume = 0.7;
    bgMusic.autoplay = true;
    bgMusic.load();

    const playPromise = bgMusic.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          setPlayState(true, 'Playing: Monday Afternoon ❤️');
        })
        .catch(() => {
          playRomanticSynth();
          setPlayState(true, 'Monday Afternoon (Melody) 🎶');
        });
    } else {
      setPlayState(true, 'Playing: Monday Afternoon ❤️');
    }
  }

  if (playBtn) playBtn.addEventListener('click', toggleMusic);
  window.addEventListener('load', () => {
    setTimeout(autoStartMusic, 500);
  });

  // --------------------------------------------------------------
  // 4. Interactive Wax Seal & Love Letter
  // --------------------------------------------------------------
  const waxSeal = document.getElementById('waxSeal');
  const letterPaper = document.getElementById('letterPaper');
  const envelopeCard = document.getElementById('envelopeCard');

  if (waxSeal && letterPaper && envelopeCard) {
    const openLetter = () => {
      const isOpen = envelopeCard.classList.contains('is-open');
      envelopeCard.classList.toggle('is-open', !isOpen);
      letterPaper.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 25,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#fda4af', '#fecdd3']
          });
        }
      }
    };

    waxSeal.addEventListener('click', openLetter);
  }

  // --------------------------------------------------------------
  // 5. Photo Gallery Lightbox & Dynamic Image Uploader
  // --------------------------------------------------------------
  const polaroidGrid = document.getElementById('polaroidGrid');
  const photoInput = document.getElementById('photoInput');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.getElementById('closeLightbox');

  // Open Lightbox
  if (polaroidGrid) {
    polaroidGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.polaroid-card');
      if (!card) return;
      const img = card.querySelector('img');
      const caption = card.querySelector('.polaroid-caption');
      if (img && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : 'Our Memory 💕';
        lightboxModal.classList.add('active');
      }
    });
  }

  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // Handle User Photo Uploads (instant client-side preview)
  if (photoInput && polaroidGrid) {
    photoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const rotation = (Math.random() * 6 - 3).toFixed(1);
          const newCard = document.createElement('div');
          newCard.className = 'polaroid-card';
          newCard.style.setProperty('--rotation', `${rotation}deg`);
          newCard.innerHTML = `
            <div class="pin">📌</div>
            <div class="photo-frame">
              <img src="${event.target.result}" alt="New memory" class="gallery-img">
            </div>
            <div class="polaroid-caption">Forever with you #${polaroidGrid.children.length + 1} 💖</div>
          `;
          polaroidGrid.prepend(newCard);
        };
        reader.readAsDataURL(file);
      });

      if (typeof confetti === 'function') {
        confetti({ particleCount: 30, spread: 70, origin: { y: 0.7 } });
      }
    });
  }

  // --------------------------------------------------------------
  // 6. Video Clip Uploader
  // --------------------------------------------------------------
  const videoInput = document.getElementById('videoInput');
  const coupleVideo = document.getElementById('coupleVideo');
  const videoNotice = document.getElementById('videoNotice');
  const videoSection = document.getElementById('videoSection');

  if (coupleVideo) {
    coupleVideo.muted = false;
    coupleVideo.autoplay = true;
    coupleVideo.playsInline = true;
    coupleVideo.setAttribute('playsinline', 'true');

    const tryAutoPlayVideo = () => {
      if (!coupleVideo || coupleVideo.paused) {
        const playPromise = coupleVideo.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch(() => {
            coupleVideo.muted = true;
            coupleVideo.play().catch(() => {});
          });
        }
      }
    };

    if (videoSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryAutoPlayVideo();
          }
        });
      }, { threshold: 0.45 });
      observer.observe(videoSection);
    }

    coupleVideo.addEventListener('playing', () => {
      if (videoNotice) videoNotice.style.display = 'none';
    });
  }

  if (videoInput && coupleVideo) {
    videoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        coupleVideo.src = fileURL;
        coupleVideo.play();
        if (videoNotice) videoNotice.style.display = 'none';
      }
    });
  }

  // --------------------------------------------------------------
  // 7. Interactive Flip Cards (Touch & Click Support)
  // --------------------------------------------------------------
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // --------------------------------------------------------------
  // 8. Grand Finale: Celebration Confetti & Secret Message
  // --------------------------------------------------------------
  const celebrateBtn = document.getElementById('celebrateBtn');
  const secretMessage = document.getElementById('secretMessage');

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      if (secretMessage) secretMessage.classList.add('show');

      // Heart and Firework Confetti Explosion
      if (typeof confetti === 'function') {
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio, opts) {
          confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
          }));
        }

        fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f43f5e', '#be123c', '#ffffff'] });
        fire(0.2, { spread: 60, colors: ['#fda4af', '#fb7185', '#ffe4e6'] });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffd700', '#ff69b4'] });
        fire(0.1, { spread: 120, startVelocity: 45 });
      }

      // Also trigger music if not playing
      if (!isPlaying) toggleMusic();
    });
  }

});
