import path from "path";
import initStoryshots, {
  Stories2SnapsConverter,
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";

initStoryshots({
  configPath: path.join(__dirname, "../../config/storybook"),
  // create a *.snap.js for each *.stories.js
  test: multiSnapshotWithOptions(),
  // change location of __snapshots__ folder
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: "../__snapshots__",
    snapshotExtension: ".snap.js",
  }),
});
