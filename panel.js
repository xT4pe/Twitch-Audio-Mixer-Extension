let context, micGain, gameGain;

document.getElementById('startBtn').addEventListener('click', async () => {
  const micVol = document.getElementById('micVolume');
  const gameVol = document.getElementById('gameVolume');

  context = new (window.AudioContext || window.webkitAudioContext)();

  const micAudio = await fetch('https://cdn.pixabay.com/audio/2022/03/15/audio_48c8b2b9a1.mp3').then(r => r.arrayBuffer());
  const gameAudio = await fetch('https://cdn.pixabay.com/audio/2021/08/08/audio_dbc1b7d9cf.mp3').then(r => r.arrayBuffer());

  const micBuffer = await context.decodeAudioData(micAudio);
  const gameBuffer = await context.decodeAudioData(gameAudio);

  const micSource = context.createBufferSource();
  micSource.buffer = micBuffer;
  micSource.loop = true;

  const gameSource = context.createBufferSource();
  gameSource.buffer = gameBuffer;
  gameSource.loop = true;

  micGain = context.createGain();
  gameGain = context.createGain();

  micSource.connect(micGain).connect(context.destination);
  gameSource.connect(gameGain).connect(context.destination);

  micGain.gain.value = micVol.value;
  gameGain.gain.value = gameVol.value;

  micVol.addEventListener('input', () => {
    micGain.gain.value = micVol.value;
  });

  gameVol.addEventListener('input', () => {
    gameGain.gain.value = gameVol.value;
  });

  micSource.start();
  gameSource.start();
});
