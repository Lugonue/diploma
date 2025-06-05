type Props = {};

const AboutUsBlock = (props: Props) => {
  return (
    <div className="flex w-full items-center justify-between p-10">
      <img width={200} src="/img/logo.webp" alt="" className="rounded" />

      <div className="flex flex-col w-[400px]">
        <h1 className="font-bold">О нас</h1>
        <p className="text-sm">
          «OrthoCare» – магазин ортопедических товаров с миссией улучшать
          качество жизни. Мы подбираем решения для здоровья спины, суставов и
          комфортного сна, используя только проверенные технологии и материалы.
          Ваше здоровье – наша опора!.
        </p>
      </div>
    </div>
  );
};

export default AboutUsBlock;
