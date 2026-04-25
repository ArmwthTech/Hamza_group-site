import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateLead } from "@/lib/lead-validation";
import type { LeadPayload } from "@/types";

type DeliveryStatus = "sent" | "skipped" | "failed";

type DeliveryResult = {
  supabase: DeliveryStatus;
  sheets: DeliveryStatus;
  telegram: DeliveryStatus;
};

function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function formatTelegramMessage(lead: LeadPayload) {
  return [
    "Новая заявка HAMZA GROUP",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Telegram: ${lead.telegram_username || "не указан"}`,
    `Авто: ${lead.desired_car || "не указано"}`,
    `Бюджет: ${lead.budget || "не указан"}`,
    `Страна: ${lead.country_preference || "не указана"}`,
    `Источник: ${lead.source}`
  ].join("\n");
}

async function saveToSupabase(lead: LeadPayload): Promise<DeliveryStatus> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return "skipped";

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    phone: lead.phone,
    telegram_username: lead.telegram_username || null,
    desired_car: lead.desired_car || null,
    budget: lead.budget || null,
    country_preference: lead.country_preference || "Не знаю",
    source: lead.source || "landing"
  });

  return error ? "failed" : "sent";
}

async function sendToGoogleSheets(lead: LeadPayload): Promise<DeliveryStatus> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return "skipped";

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      created_at: new Date().toISOString(),
      name: lead.name,
      phone: lead.phone,
      telegram_username: lead.telegram_username,
      desired_car: lead.desired_car,
      budget: lead.budget,
      country_preference: lead.country_preference,
      source: lead.source
    })
  });

  return response.ok ? "sent" : "failed";
}

async function sendTelegramNotification(lead: LeadPayload): Promise<DeliveryStatus> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return "skipped";

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramMessage(lead),
      disable_web_page_preview: true
    })
  });

  return response.ok ? "sent" : "failed";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Некорректные данные формы." }, { status: 400 });
  }

  const validation = validateLead(payload);

  if (!validation.ok) {
    return NextResponse.json({ ok: false, message: validation.message }, { status: 400 });
  }

  const delivery: DeliveryResult = {
    supabase: "skipped",
    sheets: "skipped",
    telegram: "skipped"
  };

  const [supabaseStatus, sheetsStatus, telegramStatus] = await Promise.allSettled([
    saveToSupabase(validation.data),
    sendToGoogleSheets(validation.data),
    sendTelegramNotification(validation.data)
  ]);

  delivery.supabase = supabaseStatus.status === "fulfilled" ? supabaseStatus.value : "failed";
  delivery.sheets = sheetsStatus.status === "fulfilled" ? sheetsStatus.value : "failed";
  delivery.telegram = telegramStatus.status === "fulfilled" ? telegramStatus.value : "failed";

  const hasFailure = Object.values(delivery).includes("failed");

  if (hasFailure) {
    return NextResponse.json(
      {
        ok: false,
        message: "Заявка принята, но часть интеграций не сработала. Напишите HAMZA GROUP в Telegram.",
        delivery
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Заявка отправлена. Менеджер свяжется и предложит варианты.",
    delivery
  });
}
