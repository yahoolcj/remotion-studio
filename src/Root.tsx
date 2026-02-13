import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { SemVerVideo, TOTAL_DURATION } from "./SemVer";
import {
  FnmGuideVideo,
  TOTAL_DURATION as FNM_TOTAL_DURATION,
} from "./FnmGuide";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SemVer"
        component={SemVerVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="FnmGuide"
        component={FnmGuideVideo}
        durationInFrames={FNM_TOTAL_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
