import Flickity from 'flickity';

export default {
  position: 3,
  id: 'equipe',
  title: 'Équipe et culture',
  path: '/equipe-et-culture/',
  onEnterCompleted,
  onLeaveCompleted,
};

let portraitSlide = null;
let portraitCarousel = null;


function onEnterCompleted() {
  // Create portrait modal
  portraitSlide = createPortraitModal();

  // Bind portraits
  [...document.querySelectorAll('#equipe .portrait')].forEach(item => item.addEventListener('click', portraitSlide.open));
}

function onLeaveCompleted() {
  document.body.classList.remove('body--hasOverlay');
}


const createPortraitModal = () => {
  const element = document.querySelector('.portrait__slides-container');
  const container = document.querySelector('#equipe');

  // Bind close on overlay and close button
  document.querySelector('.portrait__slides__close').addEventListener('click', close);
  document.querySelector('.portrait__slides__overlay').addEventListener('click', close);

  // Bind prev next arrows
  [...document.querySelectorAll('.portrait__slick-item__prev')].forEach(item => item.addEventListener('click', () => portraitCarousel.previous(true)));
  [...document.querySelectorAll('.portrait__slick-item__next')].forEach(item => item.addEventListener('click', () => portraitCarousel.next(true)));

  /**
  * Open Modal
  */
  function open(e) {
    const nodeList = Array.prototype.slice.call(document.querySelector('.portraits__container .row').children);
    const index = nodeList.indexOf(e.target);

    // Display element and update position
    element.style.display = 'block';
    element.style.top = `${container.scrollTop}px`;
    document.body.classList.add('body--hasOverlay');

    // Init carousel
    portraitCarousel = new Flickity('.portrait__slick', {
      accessibility: true,
      resize: true,
      pageDots: false,
      dragThreshold: 30,
      prevNextButtons: false,
    });

    portraitCarousel.select(index, true, true);
  }


  /**
  * Close Modal
  */
  function close() {
    element.style.display = 'none';
    document.body.classList.remove('body--hasOverlay');

    portraitCarousel.destroy();
  }

  return {
    open,
    close,
  };
};