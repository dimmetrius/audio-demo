import { useRef, useEffect } from 'react';
import { EventEmitter } from 'events';

type Props = {
  link: string;
  vttCues: Array<VTTCue>;
  eventEmitter: EventEmitter;
};

const Player = (props: Props) => {
  const { link, vttCues = [], eventEmitter: emitter } = props;
  const playerRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.onloadedmetadata = function () {
        console.log('onloadedmetadata');
      };

      const track = playerRef.current.addTextTrack('metadata');

      vttCues.forEach((c) => {
        track.addCue(c);
      });

      const onPlayStart = (start: number) => {
        if (start >= 0) playerRef.current.currentTime = start;
        playerRef.current.play();
      };
      emitter.addListener('playStart', onPlayStart);

      return () => {
        emitter.removeListener('playStart', onPlayStart);
      };
    }
  }, [link, vttCues, emitter]);

  return (
    <audio controls ref={playerRef} style={{ width: '100%', marginBottom: 30 }}>
      {link ? <source src={link} /> : null}
    </audio>
  );
};
export default Player;
