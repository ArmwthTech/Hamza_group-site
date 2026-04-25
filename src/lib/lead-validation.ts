import type { LeadPayload } from "@/types";

export type LeadValidationResult =
  | { ok: true; data: LeadPayload; phoneDigits: string }
  | { ok: false; message: string };

export function sanitizeName(value: string) {
  return value
    .replace(/[^\p{L}\s-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 60);
}

export function normalizePhoneDigits(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits && !digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
}

export function formatRussianPhone(value: string) {
  const digits = normalizePhoneDigits(value);
  if (!digits) return "";

  const local = digits.startsWith("7") ? digits.slice(1) : digits;
  const parts = [
    local.slice(0, 3),
    local.slice(3, 6),
    local.slice(6, 8),
    local.slice(8, 10)
  ].filter(Boolean);

  if (!parts.length) return "+7";
  if (parts.length === 1) return `+7 ${parts[0]}`;
  if (parts.length === 2) return `+7 ${parts[0]} ${parts[1]}`;
  if (parts.length === 3) return `+7 ${parts[0]} ${parts[1]}-${parts[2]}`;

  return `+7 ${parts[0]} ${parts[1]}-${parts[2]}-${parts[3]}`;
}

export function sanitizeTelegramUsername(value: string) {
  const cleaned = value.replace(/[^A-Za-z0-9_@]/g, "").slice(0, 33);
  if (!cleaned) return "";
  return cleaned.startsWith("@") ? cleaned : `@${cleaned.replace(/^@+/, "")}`;
}

export function validateLead(payload: LeadPayload): LeadValidationResult {
  const name = sanitizeName(payload.name).trim();
  const phoneDigits = normalizePhoneDigits(payload.phone);
  const telegramUsername = sanitizeTelegramUsername(payload.telegram_username).trim();

  if (!/^(?=.{2,60}$)\p{L}+(?:[ -]\p{L}+)*$/u.test(name)) {
    return { ok: false, message: "Укажите имя буквами, без цифр и символов." };
  }

  if (!/^7\d{10}$/.test(phoneDigits)) {
    return { ok: false, message: "Укажите телефон в формате +7 900 000-00-00." };
  }

  if (telegramUsername && !/^@[A-Za-z0-9_]{5,32}$/.test(telegramUsername)) {
    return { ok: false, message: "Укажите Telegram username от 5 до 32 символов: @username." };
  }

  return {
    ok: true,
    phoneDigits,
    data: {
      ...payload,
      name,
      phone: formatRussianPhone(phoneDigits),
      telegram_username: telegramUsername,
      country_preference: payload.country_preference || "Не знаю"
    }
  };
}
