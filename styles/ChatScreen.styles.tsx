import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  webWrapper: {
    flex: 1,
    maxHeight: "95%",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 10,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  phraseList: {
    padding: 10,
  },
  phraseContainer: {
    marginVertical: 5,
  },
  leftAlign: {
    alignItems: "flex-start",
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  speaker: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  phrase: {
    fontSize: 16,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
  },
  highlight: {
    backgroundColor: "#d6e4ff",
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  progress: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  controlButton: {
    fontSize: 24,
  },
});

export default styles;
