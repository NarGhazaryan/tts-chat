export type Phrase = {
  words: string;
  time: number;
};

export type Speaker = {
  name: string;
  phrases: Phrase[];
};

export type Metadata = {
  pause: number;
  speakers: Speaker[];
};

export type InterleavedPhrase = {
  speaker: string;
  text: string;
  time: number;
};
