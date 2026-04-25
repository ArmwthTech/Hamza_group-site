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

## Заявки: Google Sheets и Telegram

Форма отправляет заявку в `/api/leads`. Серверный route:

- сохраняет лид в Supabase, если заполнены `NEXT_PUBLIC_SUPABASE_URL` и `SUPABASE_SERVICE_ROLE_KEY` или `NEXT_PUBLIC_SUPABASE_ANON_KEY`;
- отправляет строку в Google Sheets через `GOOGLE_SHEETS_WEBHOOK_URL`;
- отправляет уведомление в Telegram через `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

Простой вариант для Google Sheets — Google Apps Script Web App:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.created_at,
    data.name,
    data.phone,
    data.telegram_username,
    data.desired_car,
    data.budget,
    data.country_preference,
    data.source
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Опубликовать скрипт как Web App и вставить URL в `GOOGLE_SHEETS_WEBHOOK_URL`.
