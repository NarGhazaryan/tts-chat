# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Overview

Chat TTS is a cross-platform application that lets users experience text-to-speech (TTS) functionality seamlessly. Whether on mobile, web, or desktop, the app provides a smooth interface to play, pause, and navigate through phrases using intuitive controls. It's built with Expo, ensuring compatibility across Android, iOS, and the web.

## Live Demo

[Chat TTS Web App](https://chat-tts-7f081.web.app/)

## Features

- **Text-to-Speech Playback**: Effortlessly convert text into audio with built-in playback controls (play, pause, rewind, forward).
- **Phrase Highlighting**: Follow along with visual highlights as the text is read aloud.
- **Cross-Platform Compatibility**: Runs seamlessly on Android, iOS, and the web using React Native and Expo.
- **File-Based Routing**: Organized structure for navigation, powered by Expo Router.
- **Optimized for Web**: Fully responsive with media query support and accessible controls.
- **Real-Time Updates**: Deploy faster with Expo's over-the-air updates.

## Get started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a:

- Development build
- Android emulator
- iOS simulator
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

3. View the app on the web:

   ```bash
   npx expo start --web
   ```

Open the provided URL in your browser to view the web version of the app.

## Deployment

This app is deployed on Firebase Hosting.
You can access the live web app here: [Chat TTS Web App](https://chat-tts-7f081.web.app/)

### Deployment Instructions

To deploy the app, do:

- Build the web version:

  ```bash
  npx expo export --platform web
  ```

## Development Notes

### File Structure

The project uses a modular file structure inside the `app` directory, ensuring maintainability and scalability.

### Styling

All components are styled with React Native's `StyleSheet` and optimized for responsive behavior using `react-native-web` utilities and media queries.

### Testing

Automated tests are written using `@testing-library/react-native` for React Native components.

## Learn more

To learn more about developing your project with Expo, check out the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals or dive into advanced topics with guides.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial to create a project that runs on Android, iOS, and the web.

## Community and Support

- [Expo on GitHub](https://github.com/expo/expo): View the open-source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
