///////////////////////////////////////////////////// js for page///////////////////////////////////////////////////////////


const skillSection = document.getElementById('skill-section');
const progressBars = document.querySelectorAll('.progress-bar1');

function showProgress(){
  progressBars.forEach(progressBar =>{
    const value = progressBar.dataset.progress;
    progressBar.style.opacity = 1;
    progressBar.style.width = `${value}%`;
  });
}
function hideProgress(){
  progressBars.forEach(p =>{
 p.style.opacity = 0;
 p.style.width = 0;
  });
}


window.addEventListener('scroll',()=>{
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;
  if(sectionPos < screenPos)
  {
   showProgress();
  }else{
    hideProgress();
  }
});




///////////////////counter///////////////////
let section_counter = document.querySelector('#section_counter');
let counters = document.querySelectorAll('.counter-item .counter');

// Scroll Animation

let CounterObserver = new IntersectionObserver(
  (entries, observer) => {
    let [entry] = entries;
    if (!entry.isIntersecting) return;

    let speed = 200;
    counters.forEach((counter, index) => {
      function UpdateCounter() {
        const targetNumber = +counter.dataset.target;
        const initialNumber = +counter.innerText;
        const incPerCount = targetNumber / speed;
        if (initialNumber < targetNumber) {
          counter.innerText = Math.ceil(initialNumber + incPerCount);
          setTimeout(UpdateCounter, 40);
        }
        else {
          counter.innerText = targetNumber;
        }
      }
      UpdateCounter();

      if (counter.parentElement.style.animation) {
        counter.parentElement.style.animation = '';
      } else {
        counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${
          index / counters.length + 0.5
        }s`;
      }
    });
    observer.unobserve(section_counter);
  },
  {
    root: null,
    threshold: window.innerWidth > 768 ? 0.4 : 0.3,
  }
);

CounterObserver.observe(section_counter);

