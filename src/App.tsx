import { EventEmitter } from 'events';
import Player from './components/Player';
import { parseCues } from './utils';

import { transcription } from './transcription';
import VttText from './components/VttText';

function App() {
  const eventEmitter = new EventEmitter();
  const vttCues = parseCues(transcription);
  return (
    <div className="App">
      <Player link="/sound.mp3" vttCues={vttCues} eventEmitter={eventEmitter} />
      <VttText vttCues={vttCues} eventEmitter={eventEmitter} />
    </div>
  );
}

export default App;
