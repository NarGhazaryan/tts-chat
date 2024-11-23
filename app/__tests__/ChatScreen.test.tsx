import React from "react";
import { metadata } from "@/constants/Metadata";
import interleaveMetadata from "@/utils/InterleaveMetadata";
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import ChatScreen from "../index";
import styles from "@/styles/ChatScreen.styles";

let renderedChatScreen = render(<ChatScreen />);

beforeEach(async () => {
  renderedChatScreen = render(<ChatScreen />);
  const { queryByTestId } = renderedChatScreen;

  await waitForElementToBeRemoved(() => queryByTestId("loading-screen"), {
    timeout: 5000,
  });

  expect(queryByTestId("loading-screen")).toBeNull();
});

describe("Audio Playback Controls", () => {
  it("plays the audio on play button press", async () => {
    const { getByTestId } = renderedChatScreen;
    const playButton = getByTestId("button-central-handler");

    fireEvent.press(playButton);

    await waitFor(() => {
      expect(getByTestId("button-pause")).toBeTruthy();
    });
  }, 3000);

  it("pauses the audio on pause button press", async () => {
    const { getByTestId } = renderedChatScreen;
    const playButton = getByTestId("button-play");

    fireEvent.press(playButton);
    await waitFor(() => expect(getByTestId("button-pause")).toBeTruthy());

    const pauseButton = getByTestId("button-pause");
    fireEvent.press(pauseButton);

    await waitFor(() => expect(getByTestId("button-play")).toBeTruthy());
  });
});

describe("ChatScreen Rendering", () => {
  it("renders the header", () => {
    const { getByText } = renderedChatScreen;
    expect(getByText("Chat TTS")).toBeTruthy();
  });

  it("renders the FlatList of phrases", () => {
    const { getByTestId } = renderedChatScreen;
    expect(getByTestId("flatlist-phrases")).toBeTruthy();
  });

  it("renders playback controls", () => {
    const { getByTestId } = renderedChatScreen;
    expect(getByTestId("button-rewind")).toBeTruthy();
    expect(getByTestId("button-play")).toBeTruthy();
    expect(getByTestId("button-forward")).toBeTruthy();
  });

  it("renders progress text", () => {
    const { getByText, getByTestId } = renderedChatScreen;
    expect(getByText(/s \/ \d+ s/)).toBeTruthy();
  });
});

describe("Phrase Navigation", () => {
  const interleavedPhrases = interleaveMetadata(metadata);

  it("highlights the current phrase", async () => {
    const { getByText } = renderedChatScreen;
    const phraseItem = getByText(interleavedPhrases[0].text);

    expect(phraseItem.props.style).toContainEqual(styles.highlight);
  });

  it("jumps to a specific phrase on press", async () => {
    const { getAllByText, getByText, getAllByTestId } = renderedChatScreen;
    const phrases = getAllByTestId("phrase");

    fireEvent.press(phrases[2]);
    await waitFor(() => {
      const highlightedPhrase = getByText(interleavedPhrases[2].text);
      expect(highlightedPhrase.props.style).toContainEqual(styles.highlight);
    });
  });

  it("forwards to the next phrase and rewind to the previous one", async () => {
    const { getByTestId, getByText } = renderedChatScreen;
    const forwardButton = getByTestId("button-forward");

    fireEvent.press(forwardButton);
    await waitFor(() => {
      const highlightedPhrase = getByText(interleavedPhrases[1].text);
      expect(highlightedPhrase.props.style).toContainEqual(styles.highlight);
    });

    const rewindButton = getByTestId("button-rewind");

    fireEvent.press(rewindButton);
    await waitFor(() => {
      const highlightedPhrase = getByText(interleavedPhrases[0].text);
      expect(highlightedPhrase.props.style).toContainEqual(styles.highlight);
    });
  });
});

describe("Snapshot Testing", () => {
  it("matches the snapshot", () => {
    const { toJSON } = renderedChatScreen;
    expect(toJSON()).toMatchSnapshot();
  });
});
