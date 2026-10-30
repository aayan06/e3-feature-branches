const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A grumpy face with heavy eyebrows and a big curly mustache",
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

// one hair = one short line
function hairLine(x1: number, y1: number, x2: number, y2: number) {
  const hair = document.createElementNS("http://www.w3.org/2000/svg", "line");
  hair.setAttribute("x1", x1.toString());
  hair.setAttribute("y1", y1.toString());
  hair.setAttribute("x2", x2.toString());
  hair.setAttribute("y2", y2.toString());
  hair.setAttribute("stroke", "#302c29");
  hair.setAttribute("stroke-width", "1.6");
  hair.setAttribute("stroke-linecap", "round");
  face.append(hair);
}

// small random nudge so hairs aren't perfectly lined up
function wiggle(amount: number) {
  return (Math.random() - 0.5) * amount;
}

// brows, right side is just the left one flipped
for (let i = 0; i < 32; i++) {
  const along = i / 31;
  const bx = 56 + along * 32;
  const by = 61 + along * 9 + wiggle(2);
  const tipX = bx + 3 + wiggle(2);
  const tipY = by - (5 + Math.random() * 3);
  hairLine(bx, by, tipX, tipY);
  hairLine(200 - bx, by, 200 - tipX, tipY);
}

// mustache, hairs lean out more the farther they are from the middle
for (let i = 0; i < 48; i++) {
  const mx = 71 + (i / 47) * 58;
  const fromMid = mx - 100;
  const my = 121 - 0.012 * fromMid * fromMid + wiggle(1.5);
  const lean = fromMid * 0.08;
  hairLine(mx, my, mx + lean + wiggle(2), my + 8 + Math.random() * 3);
}

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
