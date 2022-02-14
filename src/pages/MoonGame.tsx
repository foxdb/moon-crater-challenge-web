import React from 'react';
import moon from '../moon.png';
import ReactCursorPosition from '@imizaac/react-cursor-position';
import PositionTracker from '../components/PositionTracker';
import { getRandomAnswer } from '../game';
const debounce = require('debounce');

export default function MoonGame() {
  const [cursorWPx, setCursorWPx] = React.useState<number>(0);
  const [cursorHPx, setCursorHPx] = React.useState<number>(0);
  const [guessWPx, setGuessWPx] = React.useState<number>(0);
  const [guessHPx, setGuessHPx] = React.useState<number>(0);
  const [answerWPx, setAnswerWPx] = React.useState<number>(0);
  const [answerHPx, setAnswerHPx] = React.useState<number>(0);
  const [craterName, setCraterName] = React.useState<string>('');

  const [showGuessRectangle, setShowGuessRectangle] =
    React.useState<boolean>(false);
  const [showAnswerRectangle, setShowAnswerRectangle] =
    React.useState<boolean>(false);

  const onReset = () => {
    const newCrater = getRandomAnswer();
    setShowAnswerRectangle(false);
    setShowGuessRectangle(false);
    setGuessHPx(0);
    setGuessWPx(0);
    setCursorHPx(0);
    setCursorWPx(0);
    setAnswerHPx(newCrater.hPx);
    setAnswerWPx(newCrater.wPx);
    setCraterName(newCrater.name);
  };

  // onReset();

  React.useEffect(() => {
    onReset();
  }, []);

  const onSubmitTracking = () => {
    console.log('onSubmitTracking');

    setGuessHPx(cursorHPx);
    setGuessWPx(cursorWPx);

    setShowAnswerRectangle(true);
    setShowGuessRectangle(true);
  };

  // const getSquareCoordinatesInPercents = () => {

  // }

  const setCursorPosition = debounce(
    ({
      width,
      x,
      y,
      image,
    }: {
      width: number;
      x: number;
      y: number;
      image: any;
    }) => {
      // if (!this.state.question) {
      //   return
      // }

      // console.log(`setCursorPosition X: ${x}, Y: ${y}`);

      // const pixelToSubmit = Math.floor(
      //   Math.round((x / width) * image.naturalWidth * 100) / 100
      // );

      // if (!isAnswerValid(pixelToSubmit)) {
      //   return;
      // }

      setCursorWPx(x);
      setCursorHPx(y);
    },
    50
  );

  return (
    <>
      <div style={{ color: 'red' }}>
        <span>x: {cursorWPx}</span>
        <span>y: {cursorHPx}</span>
        <span>
          <button type="button" onClick={onReset}>
            reset
          </button>
        </span>
        <p>show me: {craterName}</p>
      </div>
      <div
        style={{
          // textAlign: 'center',
          position: 'relative',
          // marginBottom: 20,
          marginTop: 10,
          marginLeft: 50,
          // display: 'inline-block',
          // width: '90%',
          backgroundColor: 'blue',
        }}
      >
        {showGuessRectangle && (
          <div
            style={{
              height: 30,
              width: 30,
              // backgroundColor: 'salmon',
              border: '2px solid red',
              position: 'absolute',
              zIndex: 98,
              top: `${Math.max(guessHPx - 15, 0)}px`,
              left: `${Math.max(guessWPx - 15, 0)}px`,
            }}
          ></div>
        )}
        {showAnswerRectangle && (
          <div
            style={{
              height: 30,
              width: 30,
              // backgroundColor: 'salmon',
              border: '2px solid yellow',
              position: 'absolute',
              zIndex: 99,
              top: `${Math.max(answerHPx - 15, 0)}px`,
              left: `${Math.max(answerWPx - 15, 0)}px`,
            }}
          ></div>
        )}
        <div style={{ position: 'absolute' }}>
          <ReactCursorPosition>
            <PositionTracker
              submit={onSubmitTracking}
              src={moon}
              disable={false}
              setCursorPosition={setCursorPosition}
            />
          </ReactCursorPosition>
        </div>
      </div>
    </>
  );
}
