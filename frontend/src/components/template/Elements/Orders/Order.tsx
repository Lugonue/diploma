import userApi, { Order } from "@/api/endpoints/userApi";
import { cn } from "@/lib/utils";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { format } from "date-fns";
import { OrderStatus } from "hooks/stores/useOrderStore";
import { useEffect, useState } from "react";

export const getStatusClasses = (status: OrderStatus) => {
  switch (status) {
    case "Новый":
      return "text-primary font-semibold";
    case "В обработке":
      return "text-yellow-400";
    case "Отправлен":
      return "text-violet-400";
    case "Завершен":
      return "text-green-400";
    case "Отменен":
      return "text-red-400";
    default:
      return "";
  }
};

const OrderItem = (props: Order) => {
  return (
    <div className="border-t p-2 flex justify-between items-center">
      <span className="text-sm">{`Заказ от ${format(new Date(props.createdAt), "dd.MM.yyyy")}`}</span>
      <span
        className={cn(getStatusClasses(props.status))}
      >{`${props.status}`}</span>
      <div className="flex">
        <Popover>
          <PopoverTrigger>
            <Button variant={"outline-2"}>Подробности</Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <OrderExtended {...props} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const OrderExtended = (props: Order) => {
  const [order, setOrder] = useState(props);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await userApi.getOrder(props.id);
      setOrder(data);
    };
    fetch();
  }, []);
  return (
    <div className="w-[30rem] flex flex-col gap-5">
      <p className="font-bold">{`Заказ от ${format(new Date(props.createdAt), "dd.MM.yyyy")}`}</p>
      <div className="flex gap-5">
        <p className="font-bold">Статус:</p>
        <p className={cn(getStatusClasses(props.status))}>{order.status}</p>
      </div>
      <div className="flex gap-5">
        <p className="font-bold">Адрес доставки:</p>
        <p>{order.address?.street}</p>
      </div>
      <div className="flex gap-5">
        <p className="font-bold">Телефон:</p>
        <p>{order.phone?.number}</p>
      </div>
      <div className="grid">
        <p className="font-bold">Список заказанных товаров:</p>
        <ul className="list-disc">
          {order.items.map((p) => (
            <li
              className="ml-5 text-sm"
              key={p.id}
            >{`${p.product.name} - ${p.quantity}шт`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderItem;
