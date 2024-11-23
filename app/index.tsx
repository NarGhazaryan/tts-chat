import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";

import PhraseItem from "@/components/PhraseItem";
import interleaveMetadata from "@/utils/InterleaveMetadata";

import { metadata } from "@/constants/Metadata";
import { AudioConfig } from "@/constants/AudioConfig";
import styles from "@/styles/ChatScreen.styles";

const ChatScreen = () => {
  const interleavedPhrases = useMemo(
    () => interleaveMetadata(metadata),
    [metadata]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const sound = useRef<Audio.Sound | null>(null);

  const { cumulativeTimes, totalDuration } = useMemo(() => {
    let total = 0;
    const times = interleavedPhrases.map((phrase) => {
      const time = total;
      total += phrase.time;
      return time;
    });
    return { cumulativeTimes: times, totalDuration: total };
  }, [interleavedPhrases]);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("@/assets/audio/example_audio.mp3")
        );
        sound.current = newSound;

        await sound.current.setProgressUpdateIntervalAsync(
          AudioConfig.progressUpdateInterval
        );
      } catch (error) {
        console.error("Error loading audio");
      } finally {
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      sound.current?.unloadAsync();
    };
  }, []);

  const playAudio = async () => {
    if (sound.current) {
      await sound.current.playAsync();
      setIsPlaying(true);

      sound.current.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.positionMillis) {
          setProgress(status.positionMillis);
          updateCurrentPhrase(status.positionMillis);

          if (status.didJustFinish) {
            setIsFinished(true);
            setIsPlaying(false);
          }
        }
      });
    }
  };

  const pauseAudio = async () => {
    if (sound.current) {
      await sound.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const repeatPlayback = async () => {
    if (sound.current) {
      await sound.current.setPositionAsync(0);
      setCurrentPhrase(0);
      setIsFinished(false);
      setIsPlaying(true);
      await sound.current.playAsync();
    }
  };

  const rewind = async () => {
    if (sound.current && !isFinished) {
      const currentTime = (
        (await sound.current.getStatusAsync()) as AVPlaybackStatusSuccess
      ).positionMillis;

      if (
        currentTime <=
        cumulativeTimes[currentPhrase] + AudioConfig.rewindPhraseOffset
      ) {
        if (currentPhrase > 0) {
          const previousPhraseTime = cumulativeTimes[currentPhrase - 1];
          await sound.current.setPositionAsync(previousPhraseTime);
          setProgress(previousPhraseTime);
          setCurrentPhrase(currentPhrase - 1);
        } else {
          await sound.current.setPositionAsync(0);
          setProgress(0);
          setCurrentPhrase(0);
        }
      } else {
        const currentPhraseTime = cumulativeTimes[currentPhrase];
        await sound.current.setPositionAsync(currentPhraseTime);
        setProgress(currentPhraseTime);
      }
    }
  };

  const forward = async () => {
    if (sound.current && !isFinished) {
      if (currentPhrase < interleavedPhrases.length - 1) {
        const nextPhraseTime = cumulativeTimes[currentPhrase + 1];
        await sound.current.setPositionAsync(nextPhraseTime);
        setProgress(nextPhraseTime);
        setCurrentPhrase(currentPhrase + 1);
      }
    }
  };

  const jumpToPhrase = async (index: number) => {
    if (sound.current) {
      const targetTime = cumulativeTimes[index];
      await sound.current.setPositionAsync(targetTime);
      setProgress(targetTime);
      setCurrentPhrase(index);
      setIsFinished(false);

      if (isPlaying) {
        await sound.current.playAsync();
      }
    }
  };

  const updateCurrentPhrase = (currentTime: number) => {
    const index = cumulativeTimes.findIndex(
      (time, idx) =>
        currentTime >= time &&
        currentTime < (cumulativeTimes[idx + 1] || totalDuration)
    );

    if (index !== currentPhrase) {
      setCurrentPhrase(index);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator
          testID="loading-screen"
          color="#007BFF"
          size="large"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.center,
        styles.container,
      ]}
    >
      <View
        style={[
          styles.container,
          ...(Platform.OS === "web" ? [styles.webWrapper] : []),
        ]}
      >
        <Text style={styles.header}>Chat TTS</Text>
        <FlatList
          data={interleavedPhrases}
          testID="flatlist-phrases"
          renderItem={({ item, index }) => (
            <PhraseItem
              item={item}
              isHighlighted={currentPhrase === index}
              onPress={() => jumpToPhrase(index)}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.phraseList}
        />
        <View style={styles.footer}>
          <Text style={styles.progress} testID="progress">
            {(progress / 1000).toFixed(0)} s /{" "}
            {(totalDuration / 1000).toFixed(0)} s
          </Text>
          <View style={styles.controls}>
            <TouchableOpacity onPress={rewind} testID="button-rewind">
              <Text style={styles.controlButton}>⏮</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                isPlaying ? pauseAudio : isFinished ? repeatPlayback : playAudio
              }
              testID="button-central-handler"
            >
              {isPlaying ? (
                <Text testID="button-pause" style={styles.controlButton}>
                  ⏸
                </Text>
              ) : isFinished ? (
                <Text testID="button-repeat" style={styles.controlButton}>
                  ↺
                </Text>
              ) : (
                <Text testID="button-play" style={styles.controlButton}>
                  ▶️
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={forward} testID="button-forward">
              <Text style={styles.controlButton}>⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
