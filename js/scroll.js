const intro = document.querySelector(".intro");
const outro = document.querySelector(".outro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
// END SECTION
const section = document.querySelector("section");
const end = section.querySelector("h1");

// SCROLLMAGIC
const controller = new ScrollMagic.Controller();

// Scenes
const scene1 = new ScrollMagic.Scene({
  duration: 8000,
  triggerElement: intro,
  triggerHook: 0,
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Video Animation
let accelAmount = 0.1;
let scrollpos = 0;
let delay = 0;

scene1.on("update", (e) => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelAmount;
  video.currentTime = delay;
}, 33.3);

//Text Animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });
let scene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0,
})
  .setTween(textAnim)
  .addTo(controller);

//End Animation
const endAnim = TweenMax.fromTo(end, 1, { opacity: 0 }, { opacity: 1 });
let scene3 = new ScrollMagic.Scene({
  duration: 1000,
  triggerElement: outro,
  triggerHook: 1,
})
  .setTween(endAnim)
  .addTo(controller);
