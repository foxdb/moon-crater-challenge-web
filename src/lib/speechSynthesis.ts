const LANG = 'fr-FR';

let synth: any;

const setSpeech = (): Promise<[SpeechSynthesisVoice]> => {
  return new Promise(function (resolve, reject) {
    synth = window.speechSynthesis;
    let id: any;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
};

export const say = async (text: string) => {
  const voices = await setSpeech();

  const voice = voices.find((voice) => voice.lang === LANG);

  if (!voice) {
    throw new Error('speech synthesis: could not find required lang ' + LANG);
  }
  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice;
  utterThis.pitch = 1;
  utterThis.rate = 0.8;

  synth.speak(utterThis);
};
