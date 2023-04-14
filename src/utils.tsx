const getSec = (tm: any) => {
  if (!tm) return 0;
  if (typeof tm === 'string') {
    return parseFloat(tm.replace('s', ''));
  }
  return parseFloat((tm.seconds || 0) + '.' + tm.nanos);
};

export const parseCues = (item: any) => {
  const arr: Array<VTTCue> = [];
  const tran = item || {};
  const results = tran.results || [];
  results.forEach((result: any) => {
    const alternatives = result.alternatives[0] || [];
    const words = alternatives.words || [];
    words
      .filter((w: any) => w)
      .forEach((word: any) => {
        const startSec = getSec(word.startTime);
        const endSec = getSec(word.endTime);
        const vttCue = new VTTCue(startSec, endSec, word.word);

        vttCue.id = [word.word, startSec, endSec].join('-');
        arr.push(vttCue);
      });
  });
  return arr;
};
