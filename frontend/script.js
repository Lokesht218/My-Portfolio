// HERO ORBIT EFFECT

const hr = document.getElementById('hero-right');

if(hr){

  hr.addEventListener('mousemove', e => {

    const orbit = document.querySelector('.profile-orbit');

    if(!orbit) return;

    const rect = hr.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;

    orbit.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

  });

  hr.addEventListener('mouseleave', () => {

    const orbit = document.querySelector('.profile-orbit');

    if(orbit){
      orbit.style.transform =
      'rotateY(0deg) rotateX(0deg)';
    }

  });

}

// CURSOR

const cd = document.getElementById('cd');
const cr = document.getElementById('cr');
const ca = document.getElementById('ca');

let mx = 0;
let my = 0;

let rx = 0;
let ry = 0;

let ax = 0;
let ay = 0;

document.addEventListener('mousemove', e => {

  mx = e.clientX;
  my = e.clientY;

  cd.style.left = mx + 'px';
  cd.style.top = my + 'px';

});

(function animCursor(){

  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;

  ax += (mx - ax) * .07;
  ay += (my - ay) * .07;

  cr.style.left = rx + 'px';
  cr.style.top = ry + 'px';

  ca.style.left = ax + 'px';
  ca.style.top = ay + 'px';

  requestAnimationFrame(animCursor);

})();

document.querySelectorAll(
'a,button,.skill-pill,.proj-card,.contact-item,.btn-main,.btn-ghost,.chip'
).forEach(el => {

  el.addEventListener('mouseenter', () => {
    document.body.classList.add('ch');
  });

  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('ch');
  });

});

// PARTICLE BACKGROUND

const bgC = document.getElementById('bg-canvas');
const bgX = bgC.getContext('2d');

let W, H;

function resizeBG(){

  W = bgC.width = window.innerWidth;
  H = bgC.height = window.innerHeight;

}

resizeBG();

window.addEventListener('resize', resizeBG);

const dots = [];

for(let i = 0; i < 130; i++){

  dots.push({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 2 + .5,
    vx: (Math.random() - .5) * .5,
    vy: (Math.random() - .5) * .5
  });

}

function drawBG(){

  bgX.clearRect(0, 0, W, H);

  dots.forEach(dot => {

    dot.x += dot.vx;
    dot.y += dot.vy;

    if(dot.x < 0 || dot.x > W){
      dot.vx *= -1;
    }

    if(dot.y < 0 || dot.y > H){
      dot.vy *= -1;
    }

    bgX.beginPath();
    bgX.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    bgX.fillStyle = 'rgba(0,255,204,.7)';
    bgX.fill();

  });

  for(let i = 0; i < dots.length; i++){

    for(let j = i + 1; j < dots.length; j++){

      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if(dist < 100){

        bgX.beginPath();
        bgX.moveTo(dots[i].x, dots[i].y);
        bgX.lineTo(dots[j].x, dots[j].y);

        bgX.strokeStyle =
        `rgba(0,255,204,${0.08 * (1 - dist / 100)})`;

        bgX.lineWidth = .5;
        bgX.stroke();

      }

    }

  }

  requestAnimationFrame(drawBG);

}

drawBG();

// TYPING EFFECT

const roles = [
  'Java Full Stack Developer',
  'React.js Developer',
  'UI/UX Designer',
  'Mern Stack Developer',
  'Python Developer',
  'Frontend Developer',
  'Backend Developer',
  'Web Developer',
  'Node.js Developer'
];

let rIdx = 0;
let cIdx = 0;
let del = false;

const typedEl = document.getElementById('typed-role');

function typeRole(){

  const word = roles[rIdx];

  if(!del){

    typedEl.textContent = word.slice(0, ++cIdx);

    if(cIdx === word.length){

      del = true;

      setTimeout(typeRole, 1800);

      return;

    }

  }else{

    typedEl.textContent = word.slice(0, --cIdx);

    if(cIdx === 0){

      del = false;
      rIdx = (rIdx + 1) % roles.length;

    }

  }

  setTimeout(typeRole, del ? 45 : 75);

}

typeRole();

// COUNTER ANIMATION

function animateCounter(el){

  const target =
  parseFloat(el.dataset.targetFloat || el.dataset.target);

  let count = 0;

  function update(){

    count += target / 60;

    if(count < target){

      el.textContent = el.dataset.targetFloat
      ? count.toFixed(1)
      : Math.floor(count);

      requestAnimationFrame(update);

    }else{

      el.textContent = el.dataset.targetFloat
      ? target.toFixed(1)
      : target;

    }

  }

  update();

}

document.querySelectorAll(
'[data-target],[data-target-float]'
).forEach(animateCounter);

// REVEAL ANIMATION

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);

    }

  });

}, {
  threshold: .1
});

reveals.forEach(el => observer.observe(el));

// ACTIVE NAVBAR

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-a');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(sec => {

    if(window.scrollY >= sec.offsetTop - 120){
      current = sec.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href').slice(1) === current
    );

  });

});

// 3D PROJECT CARD TILT

document.querySelectorAll('.proj-card').forEach(card => {

  card.addEventListener('mousemove', e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = ((y / rect.height) - 0.5) * -20;

    card.style.transform =
    `perspective(700px)
    rotateY(${rotateY}deg)
    rotateX(${rotateX}deg)
    translateY(-10px)`;

  });

  card.addEventListener('mouseleave', () => {

    card.style.transform = '';

  });

});

// MAGNETIC BUTTONS

document.querySelectorAll('.magnetic').forEach(btn => {

  btn.addEventListener('mousemove', e => {

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform =
    `translate(${x * .2}px,${y * .2}px)`;

  });

  btn.addEventListener('mouseleave', () => {

    btn.style.transform = '';

  });

});

