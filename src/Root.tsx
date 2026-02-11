import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { SemVerVideo, TOTAL_DURATION } from "./SemVer";

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
