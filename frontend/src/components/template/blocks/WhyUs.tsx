import { Card, CardContent } from "components/ui/card";

const WhyUs = () => {
  const items = [
    {
      title: "Качественные бренды",
      img: "/img/f4f0c41dca99f4fad0ce4b19ccaa26b6.png",
    },
    {
      title: "Профессиональные советы",
      img: "/img/image.png",
    },
    {
      title: "Удобная доставка",
      img: "/img/image_copy.png",
    },
    {
      title: "Широкий ассортимент",
      img: "/img/image_copy_2.png",
    },
  ];
  return (
    <div className="flex flex-col gap-5 my-10">
      <div className="font-bold text-center">Почему выбирают нас</div>
      <div className="flex gap-4 justify-center">
        {items.map((item, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center gap-2 justify-between w-[15rem] h-full">
              {/* <img src={item.img} alt="" className="w-15 rounded-full" /> */}
              <div
                className="w-full aspect-video rounded-lg"
                style={{ background: `center/cover url(${item.img})` }}
              ></div>
              <div className="font-bold">{item.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
