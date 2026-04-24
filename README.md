# HAMZA GROUP — Auto Import

MVP сайта для компании HAMZA GROUP: премиальный лендинг, каталог автомобилей из Китая и Кореи и Supabase-ready админка для управления каталогом.

## Что внутри

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase-ready слой для каталога и заявок
- Главная страница в dark automotive стиле
- Каталог авто `/catalog`
- Админка каталога `/admin`
- SQL-схема и seed-данные в `supabase/`

## Запуск

```bash
npm install
npm run dev
```

Локально сайт открывается на `http://localhost:3000` или на свободном порту, который выберет Next.js.

## Supabase

1. Создать проект Supabase.
2. Выполнить SQL из `supabase/schema.sql`.
3. При необходимости добавить стартовые авто из `supabase/seed.sql`.
4. Заполнить `.env.local` по примеру `.env.example`.
