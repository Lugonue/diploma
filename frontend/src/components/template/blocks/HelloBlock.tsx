import { Button } from "components/ui/button";
import React from "react";
import { useNavigate } from "react-router";

type Props = {};

const HelloBlock = (props: Props) => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col items-start p-2 max-w-[400px] gap-3">
      <h1 className="font-bold">
        Ортопедические товары <br /> для комфортной жизни
      </h1>
      <p className="text-sm">
        Стельки, бандажи, корректоры осанки, ортопедические подушки – всё, что
        нужно для здоровья и удобства. Доставка по всей России.
      </p>
      <Button onClick={() => navigator("/catalog")}>Смотреть каталог</Button>
    </div>
  );
};

export default HelloBlock;
