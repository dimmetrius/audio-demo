import EventEmitter from 'events';
import React, { useState, useEffect, useRef, FC } from 'react';

type Props = {
  vttCue: VTTCue;
  eventEmitter: EventEmitter;
};

const Word: FC<Props> = (props) => {
  const { vttCue, eventEmitter } = props;
  const wordRef = useRef<HTMLSpanElement>(null!);
  const [active, setActive] = useState(false);

  const onEnter = () => {
    setActive(true);
  };
  const onExit = () => {
    setActive(false);
  };

  useEffect(() => {
    vttCue.addEventListener('enter', onEnter);
    vttCue.addEventListener('exit', onExit);
    return () => {
      vttCue.removeEventListener('enter', onEnter);
      vttCue.removeEventListener('exit', onExit);
    };
  }, [vttCue, eventEmitter]);

  const _text = vttCue.text || '';
  const texts = _text.trim().split(' ');

  return (
    <>
      {texts.map((text, npp) => {
        const lastSymbol = text.slice(-1);
        const isAlphaNumeric = lastSymbol.match(/^[0-9a-z]+$/);

        const activBackgroundColor = '#0500FF1E';
        const BackgroundColor = '#FFFFFF';
        const color = '#2F374D';

        const style = {
          backgroundColor: active ? activBackgroundColor : BackgroundColor,
          color: color,
        };

        return (
          <span
            ref={wordRef}
            className={isAlphaNumeric ? 'wordPad' : 'punctuationPad'}
            onClick={() => {
              eventEmitter.emit('playStart', vttCue.startTime);
            }}
            style={style}
            key={`${vttCue.id}-${npp}`}>
            <>{text}</>
          </span>
        );
      })}
    </>
  );
};

const VttWord = React.memo(
  Word,
  (prevProps, nextProps) => prevProps.eventEmitter === nextProps.eventEmitter,
);

export default VttWord;
