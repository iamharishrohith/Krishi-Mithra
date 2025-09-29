import { kvGet, kvSet } from "@/utils/offline"

type Feedback = { key: string; reasons: Record<string, number> }

const KEY = "adaptive_feedback"

export async function recordAdviceFeedback(key: string, reason: string): Promise<void> {
  const list = (await kvGet<Feedback[]>(KEY)) || []
  const existing = list.find((x) => x.key === key)
  if (existing) {
    existing.reasons[reason] = (existing.reasons[reason] || 0) + 1
  } else {
    list.push({ key, reasons: { [reason]: 1 } })
  }
  await kvSet(KEY, list)
}

export function isAdviceSuppressed(key: string): boolean {
  // naive rule: if any feedback exists for a key, suppress repeating it
  // could be expanded to time-based suppression or threshold-based
  let suppressed = false
  // We purposely avoid awaiting here for simplicity in initial render; call site can gate UI based on effect
  kvGet<Feedback[]>(KEY).then((list) => {
    suppressed = !!list?.find((x) => x.key === key)
  })
  return suppressed
}
