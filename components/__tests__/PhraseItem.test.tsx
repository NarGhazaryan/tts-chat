import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PhraseItem from "../PhraseItem";

describe("<PhraseItem />", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <PhraseItem
        item={{ speaker: "John", text: "Hello World", time: 1000 }}
        isHighlighted={false}
        onPress={jest.fn()}
      />
    );

    expect(getByText("John")).toBeTruthy();
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("applies highlight styles when highlighted", () => {
    const { getByText } = render(
      <PhraseItem
        item={{ speaker: "Jane", text: "Test Phrase", time: 2000 }}
        isHighlighted={true}
        onPress={jest.fn()}
      />
    );

    const highlightedText = getByText("Test Phrase");
    expect(highlightedText.props.style).toContainEqual({
      backgroundColor: "#d6e4ff",
    });
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <PhraseItem
        item={{ speaker: "John", text: "Click Me", time: 1500 }}
        isHighlighted={false}
        onPress={onPressMock}
      />
    );

    fireEvent.press(getByText("Click Me"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
