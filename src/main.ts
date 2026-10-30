const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// builds the whole sneaky face and hands it back
function buildFace(): SVGSVGElement {
  const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  face.setAttribute("viewBox", "0 0 200 200");
  face.setAttribute("role", "img");
  face.setAttribute(
    "aria-label",
    "A sneaky face that fades from orange to purple with a crooked smirk",
  );

  // gradient for the head, orange at the top fading to purple at the bottom.
  // it doesn't show up until something uses url(#head-fade)
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const headFade = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  headFade.setAttribute("id", "head-fade");
  headFade.setAttribute("x1", "0%");
  headFade.setAttribute("y1", "0%");
  headFade.setAttribute("x2", "0%");
  headFade.setAttribute("y2", "100%");

  const topColor = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop",
  );
  topColor.setAttribute("offset", "0%");
  topColor.setAttribute("stop-color", "#f7b267");
  headFade.append(topColor);

  const bottomColor = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop",
  );
  bottomColor.setAttribute("offset", "100%");
  bottomColor.setAttribute("stop-color", "#b18bd6");
  headFade.append(bottomColor);

  defs.append(headFade);
  face.append(defs);

  const head = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse",
  );
  head.setAttribute("cx", "100");
  head.setAttribute("cy", "100");
  head.setAttribute("rx", "78");
  head.setAttribute("ry", "86");
  head.setAttribute("fill", "url(#head-fade)");
  head.setAttribute("stroke", "#302c29");
  head.setAttribute("stroke-width", "4");
  face.append(head);

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

  // crooked smirk instead of the flat mouth. starts low on the left,
  // gets pulled down toward (108, 150), then ends up high on the right
  const smirk = document.createElementNS("http://www.w3.org/2000/svg", "path");
  smirk.setAttribute("d", "M 76 138 Q 108 150 128 124");
  smirk.setAttribute("fill", "none");
  smirk.setAttribute("stroke", "#302c29");
  smirk.setAttribute("stroke-width", "4");
  smirk.setAttribute("stroke-linecap", "round");
  face.append(smirk);

  return face;
}

// put the face on the page
const face = buildFace();
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
