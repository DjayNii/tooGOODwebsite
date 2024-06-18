function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function navBarAnimation() {
  gsap.to(".navPart1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: 1,
    },
  });

  gsap.to(".navPart2 .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: 1,
    },
  });
}

function vedioContainer() {
  var vediocon = document.querySelector(".vedioContainer");
  var playbutton = document.querySelector(".playButton");

  vediocon.addEventListener("mouseenter", function () {
    gsap.to(playbutton, {
      scale: 1,
      opacity: 1,
    });
  });

  vediocon.addEventListener("mouseleave", function () {
    gsap.to(playbutton, {
      scale: 0,
      opacity: 0,
    });
  });

  vediocon.addEventListener("mousemove", function (dets) {
    gsap.to(playbutton, {
      left: dets.x - 30,
      top: dets.y - 70,
    });
  });
}

function loadingAnimation() {
  gsap.from(".page1 h1", {
    y: 130,
    opacity: 0,
    stagger: 0.2,
    delay: 0.3,
    duration: 1.2,
  });

  gsap.from(".page1 .vedioContainer", {
    y: 130,
    opacity: 0,
    stagger: 0.2,
    delay: 1.2,
    duration: 1,
  });
}

function CursourAniamtion() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to(".curosr", {
      top: dets.y,
      left: dets.x,
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", () => {
      gsap.to(".curosr", {
        transform: "translate(-50%, -50%)",
        scale: 1,
      });
    });
    elem.addEventListener("mouseleave", () => {
      gsap.to(".curosr", {
        transform: "translate(-50%, -50%)",
        scale: 0,
      });
    });
  });
}

// var shopButtons = document.querySelector(".page2 #elem .details");

// shopButtons.addEventListener("mouseenter", () => {
//   gsap.to(".page2 .elem1 .details", {
//     height: "35vh",
//   });
// });
// shopButtons.addEventListener("mouseleave", () => {
//   gsap.to(".page2 .elem1 .details", {
//     height: "7vh",
//   });
// });

locomotiveAnimation();

navBarAnimation();

vedioContainer();

loadingAnimation();

CursourAniamtion();
