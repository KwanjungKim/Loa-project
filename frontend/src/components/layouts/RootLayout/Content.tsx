import React from "react";

// recoil
import { useSetRecoilState } from "recoil";
import paletteModeState, {
  paletteModeActions,
} from "../../../atoms/paletteMode";

type Props = {};

const Content = (props: Props) => {
  const setPaletteMode = useSetRecoilState(paletteModeState);
  const handleClickChangeTheme = () => {
    setPaletteMode(paletteModeActions.toggle);
  };
  return (
    <div>
      {
        // left nav
      }
      <nav>left nav</nav>
      {
        // main content
      }
      <section>main content</section>
      {
        // bottom nav
      }
      <nav>bottom nav</nav>
    </div>
  );
};

export default Content;
