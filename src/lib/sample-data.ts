import type { Car } from "@/types";

export const telegramUrl = "https://t.me/hamza_group77";
export const hamzaTelegramUrl = "https://t.me/hamza_group77";
export const youtubeUrl = "https://youtube.com/@hamza_group77?si=5p1YCJOfyG_MkdWG";
export const maxUrl = "https://max.ru/join/zJHbjfKO1napfiTO8G4eN7KWHofAqZbHPKoK-yfLvtk";
export const vkUrl = "https://vk.ru/hamzagroup77";

export const seedCars: Car[] = [
  {
    id: "bmw-5-series-g60-korea",
    title: "BMW 5 Series G60",
    country: "Корея",
    year: 2024,
    price_from: 7907562,
    image_url: "/images/cars/bmw-5-series-g60-ai.png",
    description: "Актуальный бизнес-седан из Сеула: 530i xDrive M Sport, 4WD, бензин 2.0, автомат.",
    mileage: "13 334 км",
    engine: "2.0 4WD AT",
    status: "published"
  },
  {
    id: "bmw-3-series-g20-korea",
    title: "BMW 3 Series G20",
    country: "Корея",
    year: 2022,
    price_from: 5164452,
    image_url: "/images/cars/bmw-3-series-g20-ai.png",
    description: "Проходной седан 320i M Sport из Южной Кореи: 1 владелец, небольшой пробег, понятная комплектация.",
    mileage: "17 389 км",
    engine: "2.0 2WD AT",
    status: "published"
  },
  {
    id: "byd-qin-plus-china",
    title: "BYD Qin Plus",
    country: "Китай",
    year: 2025,
    price_from: 3100089,
    image_url: "/images/cars/byd-qin-plus-ai.png",
    description: "Гибрид PHEV из Китая с экономичной связкой DM-i, хорошим запасом хода и богатым оснащением.",
    mileage: "27 000 км",
    engine: "1.5 PHEV",
    status: "published"
  },
  {
    id: "volkswagen-lamando-l-china",
    title: "Volkswagen Lamando L",
    country: "Китай",
    year: 2023,
    price_from: 2977628,
    image_url: "/images/cars/volkswagen-lamando-l-ai.png",
    description: "Стильный лифтбек из Китая с бензиновым 1.4, DCT и ярким дизайном для ежедневной эксплуатации.",
    mileage: "15 000 км",
    engine: "1.4 DCT",
    status: "published"
  },
  {
    id: "nio-es8-china",
    title: "Nio ES8",
    country: "Китай",
    year: 2021,
    price_from: 6674879,
    image_url: "/images/cars/nio-es8-ai.png",
    description: "Электрический 6-местный SUV из Шанхая: AWD, батарея 70 кВт·ч, премиальный салон.",
    mileage: "81 000 км",
    engine: "Electric AWD",
    status: "published"
  },
  {
    id: "bmw-5-series-china",
    title: "BMW 5 Series 540i",
    country: "Китай",
    year: 2022,
    price_from: 9281641,
    image_url: "/images/cars/bmw-5-series-china-ai.png",
    description: "Китайская версия 540i с бензиновым 3.0, задним приводом и пакетом M Sport.",
    mileage: "50 000 км",
    engine: "3.0 RWD AT",
    status: "published"
  }
];

export const cases = [
  {
    title: "Camry 2022",
    country: "Китай",
    status: "Доставлена под ключ",
    text: "Подобрали автомобиль, проверили состояние, организовали выкуп, доставку и выдачу клиенту."
  },
  {
    title: "Kia K5",
    country: "Корея",
    status: "Проверена и выкуплена",
    text: "Согласовали несколько вариантов, провели проверку перед оплатой и зафиксировали этапы сделки."
  },
  {
    title: "Geely Monjaro",
    country: "Китай",
    status: "Растаможена и выдана",
    text: "Провели логистику, таможенное оформление и передали автомобиль в готовом к эксплуатации виде."
  }
];
