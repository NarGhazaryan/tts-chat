const mockSoundInstance = {
  loadAsync: jest.fn().mockResolvedValue(null),
  playAsync: jest.fn().mockResolvedValue(null),
  pauseAsync: jest.fn().mockResolvedValue(null),
  setPositionAsync: jest.fn().mockResolvedValue(null),
  setProgressUpdateIntervalAsync: jest.fn().mockResolvedValue(null),
  unloadAsync: jest.fn().mockResolvedValue(null),
  setOnPlaybackStatusUpdate: jest.fn(),
  getStatusAsync: jest.fn().mockResolvedValue({
    isLoaded: true,
    positionMillis: 0,
    durationMillis: 10000,
    didJustFinish: false,
  }),
};

const mockExpoAv = {
  Audio: {
    Sound: {
      createAsync: jest.fn().mockResolvedValue({ sound: mockSoundInstance }),
    },
    setAudioModeAsync: jest.fn().mockResolvedValue(null),
  },
};

module.exports = mockExpoAv;
