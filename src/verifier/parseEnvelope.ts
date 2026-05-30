import type { DemoAdapEnvelope } from "./types";

/**
 * Result returned by parseEnvelope.
 *
 * The parser does only one thing:
 * it tries to safely parse a pasted or uploaded A-DAP demo envelope.
 *
 * It does not validate the schema.
 * It does not verify hashes.
 * It does not verify signatures.
 * It does not verify timestamps.
 * It does not decide result level.
 */
export type ParseEnvelopeResult =
  | {
      ok: true;
      envelope: DemoAdapEnvelope;
      raw: string;
      error: null;
    }
  | {
      ok: false;
      envelope: null;
      raw: string;
      error: string;
    };

/**
 * Maximum envelope size accepted by the MVP parser.
 *
 * This is intentionally conservative for the first MVP.
 * The app should not freeze or crash because a user pasted a huge file.
 */
export const MAX_ENVELOPE_SIZE_BYTES = 500_000;

/**
 * Parse a raw A-DAP envelope string into a JSON object.
 *
 * Safe behavior:
 * - rejects empty input
 * - rejects oversized input
 * - rejects invalid JSON
 * - rejects JSON arrays
 * - rejects primitive JSON values
 * - returns a typed DemoAdapEnvelope object only when JSON object parsing succeeds
 *
 * Important:
 * Successful parsing does not mean the envelope is valid.
 * Schema validation must happen in validateSchema.ts.
 */
export function parseEnvelope(rawInput: string): ParseEnvelopeResult {
  const raw = normalizeRawInput(rawInput);

  if (!raw) {
    return {
      ok: false,
      envelope: null,
      raw,
      error: "No envelope was provided."
    };
  }

  const sizeInBytes = getUtf8ByteLength(raw);

  if (sizeInBytes > MAX_ENVELOPE_SIZE_BYTES) {
    return {
      ok: false,
      envelope: null,
      raw,
      error: `Envelope is too large for the MVP parser. Maximum size is ${MAX_ENVELOPE_SIZE_BYTES} bytes.`
    };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      envelope: null,
      raw,
      error: "The envelope could not be parsed as valid JSON."
    };
  }

  if (!isPlainObject(parsed)) {
    return {
      ok: false,
      envelope: null,
      raw,
      error: "The parsed envelope must be a JSON object."
    };
  }

  return {
    ok: true,
    envelope: parsed as DemoAdapEnvelope,
    raw,
    error: null
  };
}

/**
 * Parse an uploaded JSON file.
 *
 * This function is browser-friendly and can be used by a React file input.
 *
 * It reads the file as text, then delegates to parseEnvelope().
 */
export async function parseEnvelopeFile(file: File): Promise<ParseEnvelopeResult> {
  if (!file) {
    return {
      ok: false,
      envelope: null,
      raw: "",
      error: "No file was provided."
    };
  }

  if (!isLikelyJsonFile(file)) {
    return {
      ok: false,
      envelope: null,
      raw: "",
      error: "Unsupported file type. Please upload a JSON envelope."
    };
  }

  if (file.size > MAX_ENVELOPE_SIZE_BYTES) {
    return {
      ok: false,
      envelope: null,
      raw: "",
      error: `File is too large for the MVP parser. Maximum size is ${MAX_ENVELOPE_SIZE_BYTES} bytes.`
    };
  }

  try {
    const raw = await file.text();
    return parseEnvelope(raw);
  } catch {
    return {
      ok: false,
      envelope: null,
      raw: "",
      error: "The file could not be read as text."
    };
  }
}

/**
 * Normalize pasted input.
 *
 * This only trims surrounding whitespace.
 * It does not alter JSON structure.
 */
export function normalizeRawInput(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  return input.trim();
}

/**
 * Estimate UTF-8 byte length safely in browser and non-browser environments.
 */
export function getUtf8ByteLength(value: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(value).length;
  }

  return encodeURIComponent(value).replace(/%[A-F\d]{2}/gi, "x").length;
}

/**
 * Very small file-type guard for the MVP.
 *
 * GitHub/browser uploads may not always provide a MIME type,
 * so the extension check is included.
 */
export function isLikelyJsonFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return name.endsWith(".json") || type === "application/json";
}

/**
 * Check whether a parsed value is a plain JSON object.
 *
 * Arrays, null, strings, numbers, and booleans are rejected.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}
