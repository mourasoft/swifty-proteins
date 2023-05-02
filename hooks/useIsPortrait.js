import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

function useIsPortrait() {
  const isPortrait = () => {
    const dim = Dimensions.get("screen");
    return dim.height >= dim.width;
  };

  const [orientation, setOrientation] = useState(
    isPortrait() ? "portrait" : "landscape"
  );

  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setOrientation(isPortrait() ? "portrait" : "landscape");
    });
  }, []);

  return orientation;
}

export default useIsPortrait;
