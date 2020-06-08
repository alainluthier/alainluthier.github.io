//get all images with data-src attribute
let imagesToLoad = document.querySelectorAll('img[data-src]');


const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};
//first check to see if Intersection Observer is supported
if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    //loop through each img an check status and load if necessary
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
      //just load all images if not supported
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }