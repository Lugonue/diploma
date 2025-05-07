import { Order } from "hooks/stores/useOrderStore";

const mockOrders: Order[] = [
  {
    id: 1,
    user: "Иван Иванов",
    address: ["г. Москва, ул. Ленина, д. 10, кв. 25"],
    phone: ["+7 (123) 456-7890"],
    items: [
      {
        id: 101,
        order: "ORD-2023-001",
        product: { id: 1001, name: "Смартфон", price: 29990 },
        quantity: 1,
      },
    ],
    status: "Новый",
    createdAt: "2023-05-10T10:30:00Z",
  },
  {
    id: 2,
    user: "Петр Петров",
    address: ["г. Санкт-Петербург, Невский пр., д. 15"],
    phone: ["+7 (987) 654-3210"],
    items: [
      {
        id: 102,
        order: "ORD-2023-002",
        product: { id: 1002, name: "Ноутбук", price: 74990 },
        quantity: 1,
      },
      {
        id: 103,
        order: "ORD-2023-002",
        product: { id: 1003, name: "Чехол для ноутбука", price: 1990 },
        quantity: 1,
      },
    ],
    status: "В обработке",
    createdAt: "2023-05-11T14:15:00Z",
  },
  {
    id: 3,
    user: "Анна Сидорова",
    address: ["г. Екатеринбург, ул. Мамина-Сибиряка, д. 42"],
    phone: ["+7 (555) 123-4567"],
    items: [
      {
        id: 104,
        order: "ORD-2023-003",
        product: { id: 1004, name: "Наушники", price: 5990 },
        quantity: 2,
      },
    ],
    status: "Отправлен",
    createdAt: "2023-05-12T09:45:00Z",
  },
  {
    id: 4,
    user: "Сергей Кузнецов",
    address: ["г. Новосибирск, ул. Кирова, д. 5"],
    phone: ["+7 (777) 888-9999"],
    items: [
      {
        id: 105,
        order: "ORD-2023-004",
        product: { id: 1005, name: "Фитнес-браслет", price: 3490 },
        quantity: 1,
      },
    ],
    status: "Завершен",
    createdAt: "2023-05-08T16:20:00Z",
  },
  {
    id: 5,
    user: "Ольга Васнецова",
    address: ["г. Казань, ул. Баумана, д. 30"],
    phone: ["+7 (333) 222-1111"],
    items: [
      {
        id: 106,
        order: "ORD-2023-005",
        product: { id: 1006, name: "Электронная книга", price: 8990 },
        quantity: 1,
      },
    ],
    status: "Отменен",
    createdAt: "2023-05-13T11:10:00Z",
  },
  {
    id: 6,
    user: "Дмитрий Соколов",
    address: ["г. Владивосток, ул. Светланская, д. 22"],
    phone: ["+7 (444) 555-6666"],
    items: [
      {
        id: 107,
        order: "ORD-2023-006",
        product: { id: 1007, name: "Внешний аккумулятор", price: 2490 },
        quantity: 3,
      },
    ],
    status: "Новый",
    createdAt: "2023-05-14T13:25:00Z",
  },
  {
    id: 7,
    user: "Елена Морозова",
    address: ["г. Сочи, ул. Навагинская, д. 7"],
    phone: ["+7 (666) 777-8888"],
    items: [
      {
        id: 108,
        order: "ORD-2023-007",
        product: { id: 1008, name: "Умные часы", price: 15990 },
        quantity: 1,
      },
    ],
    status: "В обработке",
    createdAt: "2023-05-15T10:00:00Z",
  },
  {
    id: 8,
    user: "Алексей Комаров",
    address: ["г. Калининград, Ленинский пр., д. 50"],
    phone: ["+7 (888) 999-0000"],
    items: [
      {
        id: 109,
        order: "ORD-2023-008",
        product: { id: 1009, name: "Беспроводная колонка", price: 4990 },
        quantity: 2,
      },
    ],
    status: "Отправлен",
    createdAt: "2023-05-16T15:45:00Z",
  },
  {
    id: 9,
    user: "Мария Лебедева",
    address: ["г. Нижний Новгород, ул. Большая Покровская, д. 35"],
    phone: ["+7 (222) 333-4444"],
    items: [
      {
        id: 110,
        order: "ORD-2023-009",
        product: { id: 1010, name: "Игровая мышь", price: 3490 },
        quantity: 1,
      },
    ],
    status: "Завершен",
    createdAt: "2023-05-17T12:30:00Z",
  },
  {
    id: 10,
    user: "Артем Федоров",
    address: ["г. Ростов-на-Дону, ул. Б. Садовая, д. 100"],
    phone: ["+7 (111) 222-3333"],
    items: [
      {
        id: 111,
        order: "ORD-2023-010",
        product: { id: 1011, name: "Клавиатура", price: 2990 },
        quantity: 1,
      },
    ],
    status: "Новый",
    createdAt: "2023-05-18T08:15:00Z",
  },
];

export default mockOrders;
