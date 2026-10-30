// glasses.svg - "Eyeglasses Glasses" by SVG Repo
// https://www.svgrepo.com/svg/296926/eyeglasses-glasses - CC0 license (public domain)
// @deno-types="./asset-url.d.ts"
import glassesUrl from "./assets/glasses.svg?no-inline";
// bowtie.svg - "Bow Tie" by SVG Repo
// https://www.svgrepo.com/svg/296885/bow-tie - CC0 license (public domain)
// @deno-types="./asset-url.d.ts"
import bowtieUrl from "./assets/bowtie.svg?no-inline";

const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A fancy old-timey face with glasses, rosy cheeks, and a bow tie",
);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

// pink cheeks so he looks a little cheerful under the glasses
for (const cheekX of [58, 142]) {
  const cheek = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  cheek.setAttribute("cx", cheekX.toString());
  cheek.setAttribute("cy", "114");
  cheek.setAttribute("r", "9");
  cheek.setAttribute("fill", "#e8977a");
  cheek.setAttribute("opacity", "0.5");
  face.append(cheek);
}

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

// glasses go after the eyes so they sit on top, centered on the eyes
const glasses = document.createElementNS("http://www.w3.org/2000/svg", "image");
glasses.setAttribute("href", glassesUrl);
glasses.setAttribute("x", "45");
glasses.setAttribute("y", "37");
glasses.setAttribute("width", "110");
glasses.setAttribute("height", "90");
face.append(glasses);

// bow tie at the bottom of the chin
const bowtie = document.createElementNS("http://www.w3.org/2000/svg", "image");
bowtie.setAttribute("href", bowtieUrl);
bowtie.setAttribute("x", "75");
bowtie.setAttribute("y", "158");
bowtie.setAttribute("width", "50");
bowtie.setAttribute("height", "50");
face.append(bowtie);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
