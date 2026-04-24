import "./index.css";
import { Composition } from "remotion";
import { ShopifyProductList, TOTAL_DURATION } from "./ShopifyProductList";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShopifyProductList"
        component={ShopifyProductList}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
