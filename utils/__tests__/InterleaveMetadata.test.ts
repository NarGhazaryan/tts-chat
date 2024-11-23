import interleaveMetadata from "@/utils/InterleaveMetadata";
import { Metadata, InterleavedPhrase } from "@/types/ChatScreen.types";

describe("interleaveMetadata", () => {
  it("correctly interleaves phrases from multiple speakers", () => {
    const data: Metadata = {
      pause: 100,
      speakers: [
        {
          name: "Speaker 1",
          phrases: [
            { words: "Hello", time: 0 },
            { words: "How are you?", time: 2000 },
          ],
        },
        {
          name: "Speaker 2",
          phrases: [
            { words: "Hi", time: 1000 },
            { words: "I'm fine", time: 3000 },
          ],
        },
      ],
    };

    const expected: InterleavedPhrase[] = [
      { speaker: "Speaker 1", text: "Hello", time: 100 },
      { speaker: "Speaker 2", text: "Hi", time: 1100 },
      { speaker: "Speaker 1", text: "How are you?", time: 2100 },
      { speaker: "Speaker 2", text: "I'm fine", time: 3100 },
    ];

    const result = interleaveMetadata(data);
    expect(result).toEqual(expected);
  });

  it("handles speakers with uneven phrases", () => {
    const data: Metadata = {
      pause: 50,
      speakers: [
        {
          name: "Speaker 1",
          phrases: [{ words: "Only one phrase", time: 500 }],
        },
        {
          name: "Speaker 2",
          phrases: [
            { words: "First phrase", time: 0 },
            { words: "Second phrase", time: 1000 },
          ],
        },
      ],
    };

    const expected: InterleavedPhrase[] = [
      { speaker: "Speaker 1", text: "Only one phrase", time: 550 },
      { speaker: "Speaker 2", text: "First phrase", time: 50 },
      { speaker: "Speaker 2", text: "Second phrase", time: 1050 },
    ];

    const result = interleaveMetadata(data);
    expect(result).toEqual(expected);
  });

  it("returns an empty array if no speakers are provided", () => {
    const data: Metadata = {
      pause: 200,
      speakers: [],
    };

    const result = interleaveMetadata(data);
    expect(result).toEqual([]);
  });

  it("returns an empty array if speakers have no phrases", () => {
    const data: Metadata = {
      pause: 100,
      speakers: [
        { name: "Speaker 1", phrases: [] },
        { name: "Speaker 2", phrases: [] },
      ],
    };

    const result = interleaveMetadata(data);
    expect(result).toEqual([]);
  });

  it("handles an empty metadata object", () => {
    const data: Metadata = {
      pause: 0,
      speakers: [],
    };

    const result = interleaveMetadata(data);
    expect(result).toEqual([]);
  });
});
