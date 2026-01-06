import JSConfetti from "js-confetti";

const confetti = (e, position) => {
  const jsConfetti = new JSConfetti();
  if (!position) jsConfetti.addConfetti();
  else
    jsConfetti.addConfettiAtPosition({
      confettiDispatchPosition: {
        x: e.clientX,
        y: e.clientY,
      },
    });

  setTimeout(() => {
    jsConfetti.clearCanvas();
  }, 3000);
};

export default confetti;