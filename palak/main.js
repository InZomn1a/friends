// Floating JPG images logic
const pngCount = 27;
const pngs = [];
for(let i=1; i<=pngCount; i++) {
  pngs.push(i + ".jpg");
}
function getRandom(min,max) {
  return Math.random() * (max-min) + min;
}
let movingPNGs = [];
window.onload = function() {
  // Generate floating images
  const w = window.innerWidth;
  const h = window.innerHeight;
  pngs.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'bg-png';
    let x = getRandom(0, w - 90);
    let y = getRandom(0, h - 90);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.transform = `rotate(${getRandom(-25,25)}deg)`;
    document.body.appendChild(img);
    let dx = getRandom(-1.5,1.5) || 1;
    let dy = getRandom(-1.5,1.5) || 1;
    movingPNGs.push({el: img, x, y, dx, dy, size: 90});
  });
  animatePNGs();
};
function animatePNGs() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  movingPNGs.forEach(obj => {
    obj.x += obj.dx;
    obj.y += obj.dy;
    if(obj.x <= 0 || obj.x + obj.size >= w) obj.dx *= -1;
    if(obj.y <= 0 || obj.y + obj.size >= h) obj.dy *= -1;
    obj.el.style.left = obj.x + 'px';
    obj.el.style.top = obj.y + 'px';
  });
  requestAnimationFrame(animatePNGs);
}
// Music player logic and UI
const enterBtn = document.getElementById('enterBtn');
const introScreen = document.getElementById('introScreen');
const musicPlayer = document.getElementById('musicPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progressBar = document.getElementById('progressBar');
const audioPlayer = document.getElementById('audioPlayer');
const musicInfoBox = document.getElementById('musicInfoBox');

if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    setTimeout(() => {
      introScreen.style.display = 'none';
      musicPlayer.style.display = 'flex';
    }, 800);
  });
}

playBtn.addEventListener('click', () => {
  if(audioPlayer.paused) {
    audioPlayer.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
    musicPlayer.classList.add('playing', 'mini');
    document.body.classList.add('playing-bg');
    // Info box delay logic
    clearTimeout(infoBoxTimeout);
    musicInfoBox.classList.remove('visible');
    infoBoxTimeout = setTimeout(() => {
      musicInfoBox.classList.add('visible');
    }, 5000);
  } else {
    audioPlayer.pause();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    musicPlayer.classList.remove('playing', 'mini');
    document.body.classList.remove('playing-bg');
    // Info box
    clearTimeout(infoBoxTimeout);
    musicInfoBox.classList.remove('visible');
  }
});

audioPlayer.onpause = function() {
  clearTimeout(infoBoxTimeout);
  musicInfoBox.classList.remove('visible');
};
audioPlayer.onplay = function() {
  clearTimeout(infoBoxTimeout);
  infoBoxTimeout = setTimeout(() => {
    musicInfoBox.classList.add('visible');
  }, 5000);
};
// Progress bar
audioPlayer.ontimeupdate = function() {
  if(audioPlayer.duration > 0) {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = percent + '%';
  }
};
// Seek on progress bar click
document.querySelector('.progress-bar-container').onclick = function(e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
};
// Info box delay logic
let infoBoxTimeout;
document.querySelector('.info-animated-btn').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  const infoBox = document.getElementById('musicInfoBox');
  infoBox.classList.add('box-transitioning');
  // Do not hide the box or show the new image box
});
// Typewriter effect and YES/NO logic
const lines = [
  'YES i used AI but for me the message i want to give holds more value',
  'SOOOOOOO many memories with yall abhi mujhe nhi separate rehna kitna ajeeb lagta hai',
  'kya aap mujhse dosti karoge??????'
];
const typewriterLines = document.querySelector('.typewriter-lines');
const typewriterButtons = document.querySelector('.typewriter-buttons');
const originalMessage = document.querySelector('.original-message');

function typeLine(line, el, cb) {
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < line.length) {
      el.textContent += line[i++];
      setTimeout(type, 32);
    } else if (cb) {
      cb();
    }
  }
  type();
}
function startTypewriter() {
  typewriterLines.innerHTML = '';
  let idx = 0;
  function nextLine() {
    if (idx < lines.length) {
      const lineEl = document.createElement('div');
      lineEl.style.marginBottom = '6px';
      lineEl.style.color = '#fff';
      typewriterLines.appendChild(lineEl);
      typeLine(lines[idx], lineEl, () => {
        idx++;
        nextLine();
      });
    } else {
      showTypewriterButtons();
    }
  }
  nextLine();
}
function showTypewriterButtons() {
  typewriterButtons.style.display = 'flex';
  typewriterButtons.innerHTML = '';
  const yesBtn = document.createElement('button');
  yesBtn.className = 'typewriter-btn yes';
  yesBtn.textContent = 'YES';
  const noBtn = document.createElement('button');
  noBtn.className = 'typewriter-btn no';
  noBtn.textContent = 'NO';
  typewriterButtons.appendChild(yesBtn);
  typewriterButtons.appendChild(noBtn);
  // NO button random move logic (only after first click)
  let noBtnMoved = false;
  noBtn.addEventListener('click', function moveNoBtn(e) {
    if (!noBtnMoved) {
      noBtnMoved = true;
      noBtn.style.position = 'absolute';
      noBtn.style.left = '50%';
      noBtn.style.top = '0';
      noBtn.style.transform = 'translateX(-50%)';
    } else {
      const btnArea = typewriterButtons.getBoundingClientRect();
      const btnW = noBtn.offsetWidth;
      const btnH = noBtn.offsetHeight;
      const maxX = btnArea.width - btnW;
      const maxY = btnArea.height - btnH;
      const randX = Math.random() * maxX;
      const randY = Math.random() * maxY;
      noBtn.style.left = randX + 'px';
      noBtn.style.top = randY + 'px';
      noBtn.style.transform = 'none';
    }
  });
  yesBtn.addEventListener('click', function() {
    document.querySelector('.white-overlay').classList.add('active');
  });
}
// Only show typewriter after black box transition
const ribbonBtn = document.querySelector('.info-animated-btn');
if (ribbonBtn) {
  ribbonBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const infoBox = document.getElementById('musicInfoBox');
    infoBox.classList.add('box-transitioning');
    setTimeout(() => {
      // Hide old content
      const imageWrapper = infoBox.querySelector('.info-image-wrapper');
      if (imageWrapper) imageWrapper.style.display = 'none';
      if (originalMessage) {
        originalMessage.style.transition = 'opacity 0.5s';
        originalMessage.style.opacity = '0';
        setTimeout(() => {
          originalMessage.style.display = 'none';
          typewriterLines.style.display = 'flex';
          typewriterButtons.style.display = 'none';
          startTypewriter();
        }, 500);
      }
    }, 1400);
  });
}
// YES button handler for typewriter
function setupTypewriterYesHandler() {
  document.body.addEventListener('click', function handler(e) {
    if (e.target.classList.contains('typewriter-btn') && e.target.classList.contains('yes')) {
      document.querySelector('.white-overlay').classList.add('active');
      setTimeout(() => {
        document.getElementById('musicPlayer').style.display = 'none';
        document.getElementById('musicInfoBox').style.display = 'none';
        showCollage();
      }, 1400);
      document.body.removeEventListener('click', handler);
    }
  });
}
setupTypewriterYesHandler();
// Your original JSON layout
const originalLayout = [
  {"type": "image", "src": "collage/p7.jpg", "left": "18px", "top": "16px", "width": "169px", "height": "300px"},
  {"type": "image", "src": "collage/p4.jpg", "left": "454px", "top": "9px", "width": "400px", "height": "300px"},
  {"type": "image", "src": "collage/p3.jpg", "left": "1119px", "top": "39px", "width": "400px", "height": "300px"},
  {"type": "image", "src": "collage/p1.jpg", "left": "206px", "top": "173px", "width": "225px", "height": "300px"},
  {"type": "image", "src": "collage/p2.jpg", "left": "971px", "top": "745px", "width": "400px", "height": "300px"},
  {"type": "image", "src": "collage/p5.jpg", "left": "1119px", "top": "423px", "width": "400px", "height": "300px"},
  {"type": "image", "src": "collage/p6.jpg", "left": "33px", "top": "506px", "width": "225px", "height": "300px"},
  {"type": "video", "src": "collage/v4.mp4", "left": "528px", "top": "840px", "width": "170px", "height": "300px"},
  {"type": "video", "src": "collage/v7.mp4", "left": "871px", "top": "258px", "width": "235px", "height": "300px"},
  {"type": "video", "src": "collage/v3.mp4", "left": "320px", "top": "529px", "width": "400px", "height": "225px"},
  {"type": "video", "src": "collage/v6.mp4", "left": "36px", "top": "1096px", "width": "169px", "height": "300px"},
  {"type": "video", "src": "collage/v2.mp4", "left": "31px", "top": "842px", "width": "400px", "height": "225px"},
  {"type": "video", "src": "collage/v8.mp4", "left": "755px", "top": "590px", "width": "169px", "height": "300px"},
  {"type": "video", "src": "collage/v1.mp4", "left": "869px", "top": "1075px", "width": "169px", "height": "300px"},
  {"type": "video", "src": "collage/v5.mp4", "left": "337px", "top": "1177px", "width": "400px", "height": "225px"}
];

function showCollage() {
  const container = document.querySelector('.collage-container');
  container.innerHTML = '';
  document.querySelector('.collage-save-btn').style.display = 'none';
  container.classList.add('has-bg');
  setTimeout(() => {
    container.classList.add('bg-visible');
  }, 50);
  const layout = originalLayout;
  let boxes = [];
  let videoElements = [];
  layout.forEach(item => {
    const box = document.createElement('div');
    box.className = 'collage-box ' + item.type + ' incoming';
    box.style.left = item.left;
    box.style.top = item.top;
    box.style.width = item.width;
    box.style.height = item.height;
    const boxLeft = parseInt(box.style.left);
    const boxWidth = parseInt(box.style.width);
    const boxCenter = boxLeft + boxWidth / 2;
    const screenCenter = window.innerWidth / 2;
    if (boxCenter < screenCenter) {
      box.style.setProperty('--slide-x', '-80px');
    } else {
      box.style.setProperty('--slide-x', '80px');
    }
    if (item.type === 'image') {
      box.style.backgroundImage = `url('${item.src}')`;
      box.style.backgroundSize = 'contain';
      box.style.backgroundRepeat = 'no-repeat';
      box.style.backgroundPosition = 'center';
    } else if (item.type === 'video') {
      let src = item.src.replace(/^file:\/\/\/[A-Za-z]:.*?collage\//, 'collage/');
      const vid = document.createElement('video');
      vid.src = src;
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.style.width = '100%';
      vid.style.height = '100%';
      vid.style.objectFit = 'contain';
      videoElements.push({vid, boxIndex: boxes.length});
      box.appendChild(vid);
    }
    container.appendChild(box);
    boxes.push(box);
  });
  // Staggered fade-in/slide-in, smoother, only 2 videos autoplay at a time
  let videoAutoplayQueue = [...videoElements];
  let videoAutoplayIndex = 0;
  function autoplayNextVideos() {
    for (let i = 0; i < 2 && videoAutoplayIndex < videoAutoplayQueue.length; i++, videoAutoplayIndex++) {
      try { videoAutoplayQueue[videoAutoplayIndex].vid.play(); } catch(e) {}
    }
  }
  boxes.forEach((box, i) => {
    setTimeout(() => {
      box.classList.remove('incoming');
      box.classList.add('visible');
      // Autoplay up to 2 videos at a time
      const videoObj = videoElements.find(v => v.boxIndex === i);
      if (videoObj) {
        autoplayNextVideos();
      }
    }, 200 + i * 400);
  });
  setTimeout(() => {
    container.classList.add('moving-up');
    let maxBottom = 0;
    boxes.forEach(box => {
      const top = parseInt(box.style.top);
      const height = parseInt(box.style.height);
      if (top + height > maxBottom) maxBottom = top + height;
    });
    const moveUp = Math.max(0, maxBottom - window.innerHeight + 32);
    boxes.forEach(box => {
      box.style.transition = 'transform 6s cubic-bezier(.4,0,.2,1), opacity 1.2s';
    });
    setTimeout(() => {
      boxes.forEach(box => {
        box.style.transform = `translateY(-${moveUp}px)`;
      });
    }, 400);
    setTimeout(() => {
      container.classList.add('fading-out');
      container.classList.remove('bg-visible');
      setTimeout(() => {
        container.classList.remove('has-bg');
        showTypewriterMessage();
      }, 1200);
    }, 200 + boxes.length * 400 + 6000 + 400);
  }, 200 + boxes.length * 400 + 400);
}

function showTypewriterMessage() {
  const box = document.getElementById('typewriterMessageBox');
  const textEl = box.querySelector('.typewriter-message-text');
  const message = "You two are my very precious friends.";
  box.style.display = 'flex';
  textEl.textContent = '';
  let i = 0;
  function type() {
    if (i < message.length) {
      textEl.textContent += message[i++];
      setTimeout(type, 48);
    }
  }
  type();
}
// Flower animation JS trigger
window.flowerAnimationOnload = function() {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 1000);
}; 