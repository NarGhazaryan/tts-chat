import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { InterleavedPhrase } from "@/types/ChatScreen.types";
import styles from "@/styles/ChatScreen.styles";

const PhraseItem = React.memo(
  ({
    item,
    isHighlighted,
    onPress,
  }: {
    item: InterleavedPhrase;
    isHighlighted: boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.phraseContainer,
          item.speaker === "John" ? styles.leftAlign : styles.rightAlign,
        ]}
      >
        <Text style={styles.speaker}>{item.speaker}</Text>
        <Text
          style={[styles.phrase, isHighlighted ? styles.highlight : null]}
          testID="phrase"
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default PhraseItem;
