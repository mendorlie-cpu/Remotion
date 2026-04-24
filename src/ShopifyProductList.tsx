import { Series } from "remotion";
import { PRODUCTS } from "./data/products";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { ProductSlide } from "./scenes/ProductSlide";

export const INTRO_DURATION = 90;
export const PRODUCT_DURATION = 120;
export const OUTRO_DURATION = 90;

export const TOTAL_DURATION =
  INTRO_DURATION + PRODUCTS.length * PRODUCT_DURATION + OUTRO_DURATION;

export const ShopifyProductList: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={INTRO_DURATION}>
        <Intro />
      </Series.Sequence>
      {PRODUCTS.map((product, index) => (
        <Series.Sequence key={product.id} durationInFrames={PRODUCT_DURATION}>
          <ProductSlide
            product={product}
            index={index}
            total={PRODUCTS.length}
          />
        </Series.Sequence>
      ))}
      <Series.Sequence durationInFrames={OUTRO_DURATION}>
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
