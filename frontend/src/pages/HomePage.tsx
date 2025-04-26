import useBCStore from "@/stores/useBCstore";
import AboutUsBlock from "components/template/blocks/AboutUsBlock";
import CatalogPreview from "components/template/blocks/CatalogPreview";
import HelloBlock from "components/template/blocks/HelloBlock";
import WhyUs from "components/template/blocks/WhyUs";
import ActionSlider from "components/template/regions/ActionSlider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function HomePage() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { setBC } = useBCStore();
  useEffect(() => {
    setBC([{ link: '/', name: 'Главная' }])
  })
  return (
    <div id="home" className="grid flex-1 lg:w-[1000px] gap-5">
      <div className="flex justify-between gap-5">
        <HelloBlock />
        <ActionSlider />
      </div>
      <div className="flex flex-col gap-5 bg-secondary rounded">
        <AboutUsBlock />
        <CatalogPreview />
      </div>
      <WhyUs />
    </div>
  );
}

export default HomePage;