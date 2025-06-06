import AboutUsBlock from "components/template/blocks/AboutUsBlock";
import CatalogPreview from "components/template/blocks/CatalogPreview";
import HelloBlock from "components/template/blocks/HelloBlock";
import FAQ from "components/template/blocks/Home/FAQ";
import WhyUs from "components/template/blocks/WhyUs";
import ActionSlider from "components/template/regions/ActionSlider";
import useBCStore from "hooks/stores/useBCstore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const { setBC } = useBCStore();
  useEffect(() => {
    setBC([{ link: "/", name: "Главная" }]);
  }, []);
  return (
    <div id="home" className="grid flex-1 contentContainer gap-5">
      <div className="flex justify-between gap-5 items-center">
        <HelloBlock />
        <ActionSlider />
      </div>
      <div className="flex flex-col gap-5 bg-secondary rounded">
        <div className="px-10">
          <AboutUsBlock />
        </div>
        <CatalogPreview />
      </div>
      <WhyUs />
      <div className="flex flex-col gap-5 bg-secondary rounded">
        <FAQ />
      </div>
    </div>
  );
}

export default HomePage;
