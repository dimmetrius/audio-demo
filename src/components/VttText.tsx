import { useRef } from 'react';
import VttWord from './VttWord';
import EventEmitter from 'events';

type Props = {
  vttCues: Array<VTTCue>;
  eventEmitter: EventEmitter;
};
const VttText = (props: Props) => {
  const { vttCues, eventEmitter } = props;
  const textRef = useRef<HTMLDivElement>(null!);

  return (
    <div>
      <div
        ref={textRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {vttCues.map((vttCue, i) => (
          <VttWord
            key={`${vttCue.id}`}
            vttCue={vttCue}
            eventEmitter={eventEmitter}
          />
        ))}
      </div>
    </div>
  );
};

export default VttText;
