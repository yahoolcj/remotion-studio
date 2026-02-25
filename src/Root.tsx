import "./index.css";
import { Composition } from "remotion";
import { SemVerVideo, TOTAL_DURATION } from "./SemVer";
import {
  FnmGuideVideo,
  TOTAL_DURATION as FNM_TOTAL_DURATION,
} from "./FnmGuide";
import {
  CosmicEvolutionVideo,
  TOTAL_DURATION as COSMIC_TOTAL_DURATION,
} from "./CosmicEvolution";

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
        id="CosmicEvolution"
        component={CosmicEvolutionVideo}
        durationInFrames={COSMIC_TOTAL_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
