"use client"

import React from "react"

type KV = { key: string; value: any }
const DB_NAME = "km_offline_v1"
const KV_STORE = "kv"
const CACHE_STORE = "cache"
const QUEUE_STORE = "queue"

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(KV_STORE)) db.createObjectStore(KV_STORE, { keyPath: "key" })
      if (!db.objectStoreNames.contains(CACHE_STORE)) db.createObjectStore(CACHE_STORE, { keyPath: "key" })
      if (!db.objectStoreNames.contains(QUEUE_STORE)) db.createObjectStore(QUEUE_STORE, { autoIncrement: true })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

// Generic KV helpers
export async function kvSet<T = any>(key: string, value: T): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(KV_STORE, "readwrite")
    tx.objectStore(KV_STORE).put({ key, value } as KV)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function kvGet<T = any>(key: string): Promise<T | undefined> {
  const db = await openDB()
  return new Promise<T | undefined>((resolve, reject) => {
    const tx = db.transaction(KV_STORE, "readonly")
    const req = tx.objectStore(KV_STORE).get(key)
    req.onsuccess = () => resolve(req.result?.value)
    req.onerror = () => reject(req.error)
  })
}

// Cache helpers for GET responses
async function cacheSet(key: string, value: any): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(CACHE_STORE, "readwrite")
    tx.objectStore(CACHE_STORE).put({ key, value, ts: Date.now() })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
async function cacheGet(key: string): Promise<any | undefined> {
  const db = await openDB()
  return new Promise<any | undefined>((resolve, reject) => {
    const tx = db.transaction(CACHE_STORE, "readonly")
    const req = tx.objectStore(CACHE_STORE).get(key)
    req.onsuccess = () => resolve(req.result?.value)
    req.onerror = () => reject(req.error)
  })
}

// Write queue for offline POST/PUT/DELETE
type QueuedReq = { url: string; init?: RequestInit }
async function queueWrite(req: QueuedReq): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(QUEUE_STORE, "readwrite")
    tx.objectStore(QUEUE_STORE).add(req)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
export async function processWriteQueue(): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(QUEUE_STORE, "readwrite")
    const store = tx.objectStore(QUEUE_STORE)
    const getAllReq = store.getAll()
    getAllReq.onsuccess = async () => {
      const items = (getAllReq.result as QueuedReq[]) || []
      for (const item of items) {
        try {
          await fetch(item.url, item.init)
        } catch {
          // keep it in queue if still failing
        }
      }
      const clearReq = store.clear()
      clearReq.onsuccess = () => resolve()
      clearReq.onerror = () => reject(clearReq.error)
    }
    getAllReq.onerror = () => reject(getAllReq.error)
  })
}

// Fetch wrapper
export async function fetchWithCache(url: string, init?: RequestInit): Promise<Response> {
  const isGet = !init || !init.method || init.method.toUpperCase() === "GET"
  const online = typeof navigator !== "undefined" ? navigator.onLine : true

  if (isGet) {
    if (online) {
      try {
        const res = await fetch(url, init)
        // clone and cache JSON/text responses
        const clone = res.clone()
        const ct = clone.headers.get("content-type") || ""
        if (res.ok && (ct.includes("application/json") || ct.includes("text/"))) {
          try {
            const data = ct.includes("application/json") ? await clone.json() : await clone.text()
            await cacheSet(url, data)
          } catch {}
        }
        return res
      } catch {
        // fall back to cache when fetch fails online
        const cached = await cacheGet(url)
        if (cached !== undefined) {
          return new Response(JSON.stringify(cached), { status: 200, headers: { "content-type": "application/json" } })
        }
        throw new Error("Network error and no cache")
      }
    } else {
      const cached = await cacheGet(url)
      if (cached !== undefined) {
        return new Response(JSON.stringify(cached), { status: 200, headers: { "content-type": "application/json" } })
      }
      return new Response("Offline", { status: 503 })
    }
  } else {
    // write operation: queue if offline
    if (!online) {
      await queueWrite({ url, init })
      return new Response("Queued offline", { status: 202 })
    }
    try {
      return await fetch(url, init)
    } catch {
      await queueWrite({ url, init })
      return new Response("Queued due to error", { status: 202 })
    }
  }
}

// Hook: offline status
export function useOfflineStatus(): boolean {
  const [offline, setOffline] = React.useState<boolean>(() =>
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  )
  React.useEffect(() => {
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener("online", on)
    window.addEventListener("offline", off)
    return () => {
      window.removeEventListener("online", on)
      window.removeEventListener("offline", off)
    }
  }, [])
  return offline
}
