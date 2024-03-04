import type { APIRoute } from "astro"
import type { BodygramResponse, BodygramRequestData } from "@types"
import { randomUUID } from "node:crypto"

const BODYGRAM_API_KEY = import.meta.env.BODYGRAM_API_KEY || ""
const BODYGRAM_ORGANIZATION_ID = import.meta.env.BODYGRAM_ORGANIZATION_ID
const BODYGRAM_URL = `https://platform.bodygram.com/api/orgs/${BODYGRAM_ORGANIZATION_ID}/scans`

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  const response = await fetch(`${BODYGRAM_URL}/${id}`, {
    headers: {
      Authorization: BODYGRAM_API_KEY
    }
  })
  const bodygramResponse = await response.json() as BodygramResponse
  return new Response(JSON.stringify(bodygramResponse), { status: 200 })
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { age, weight, height, gender, frontPhoto, rightPhoto } = body as BodygramRequestData
  
  const data = {
    customScanId: randomUUID(),
    photoScan: {
      age,
      weight,
      height,
      gender,
      frontPhoto,
      rightPhoto
    }
  }

  const response = await fetch(BODYGRAM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: BODYGRAM_API_KEY
    },
    body: JSON.stringify(data)
  })
  const bodygramResponse = await response.json() as BodygramResponse
  return new Response(JSON.stringify(bodygramResponse), { status: 200 })
}
