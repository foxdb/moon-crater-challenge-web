// constants

const MOON_IMG_WIDTH_PX = 849;
const MOON_IMG_HEIGHT_PX = 849;
const TOLERANCE_PX = 50;

interface Crater {
  name: string;
  hPx: number;
  wPx: number;
}
const craters: Crater[] = [
  { name: 'Tycho', wPx: 369, hPx: 783 },
  { name: 'Copernic', wPx: 281, hPx: 355 },
  { name: 'Kepler', wPx: 168, hPx: 362 },
  { name: 'Ptolemaus', wPx: 411, hPx: 493 },
  { name: 'Alphonsus', wPx: 404, hPx: 522 },
  { name: 'Arzachel', wPx: 409, hPx: 558 },
  { name: 'Theophilius', wPx: 609, hPx: 510 },
  { name: 'Posidonius', wPx: 603, hPx: 200 },
  { name: 'Archimede', wPx: 400, hPx: 213 },
  { name: 'Erathosthene', wPx: 342, hPx: 319 },
  { name: 'Aristarchus', wPx: 139, hPx: 254 },
  { name: 'Gassendi', wPx: 166, hPx: 553 },
  { name: 'Plinius', wPx: 588, hPx: 310 },
  { name: 'Schmidt', wPx: 563, hPx: 418 },
  { name: 'Fracastorius', wPx: 642, hPx: 578 },
  { name: 'Aristote', wPx: 506, hPx: 98 },
];

const getRandomAnswer = (): Crater => {
  return craters[Math.floor(Math.random() * craters.length)];
};

// validate that the clicked answer is in the picture
const isAnswerValid = (answerXPx: number, answerYPx: number): boolean => {
  return (
    answerXPx <= MOON_IMG_WIDTH_PX &&
    answerXPx >= 0 &&
    answerYPx <= MOON_IMG_HEIGHT_PX &&
    answerYPx >= 0
  );
};

const _isAnswerCorrect =
  (tolerance: number) =>
  (guessH: number, guessW: number, answerH: number, answerW: number) => {
    const tol = Math.ceil(tolerance / 2);
    if (
      answerH - tol < guessH &&
      guessH < answerH + tol &&
      answerW - tol < guessW &&
      guessW < answerW + tol
    ) {
      return true;
    } else {
      return false;
    }
  };

const isAnswerCorrect = _isAnswerCorrect(TOLERANCE_PX);

export { isAnswerCorrect, getRandomAnswer, TOLERANCE_PX };
