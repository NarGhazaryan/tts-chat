import { Metadata, InterleavedPhrase } from "@/types/ChatScreen.types";

const interleaveMetadata = (data: Metadata): InterleavedPhrase[] => {
  const { speakers, pause } = data;
  const maxPhrases = Math.max(
    ...speakers.map((speaker) => speaker.phrases.length)
  );

  const result: InterleavedPhrase[] = [];
  for (let i = 0; i < maxPhrases; i++) {
    for (const speaker of speakers) {
      if (speaker.phrases[i]) {
        result.push({
          speaker: speaker.name,
          text: speaker.phrases[i].words,
          time: speaker.phrases[i].time + pause,
        });
      }
    }
  }

  return result;
};

export default interleaveMetadata;
