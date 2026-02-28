/**
 * lib/facebook/api.ts
 * bienzoli Marketing Engine — Facebook Graph API client
 *
 * Supports:
 *   - Text-only posts
 *   - Photo posts (local file path → multipart upload)
 *   - Reading basic page engagement metrics
 *
 * Env vars required:
 *   FACEBOOK_PAGE_ID
 *   FACEBOOK_PAGE_ACCESS_TOKEN
 */

import fs from 'fs'
import path from 'path'
import FormData from 'form-data'

const GRAPH_VERSION = 'v19.0'
const BASE_URL = `https://graph.facebook.com/${GRAPH_VERSION}`

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FacebookPostResult {
  id: string
  post_id?: string
}

export interface FacebookPhotoResult {
  id: string
  post_id: string
}

export interface FacebookEngagement {
  postId: string
  likes: number
  comments: number
  shares: number
  reach: number
  impressions: number
}

// ─── Client ───────────────────────────────────────────────────────────────────

export class FacebookPageClient {
  private pageId: string
  private accessToken: string

  constructor(pageId?: string, accessToken?: string) {
    this.pageId = pageId ?? process.env.FACEBOOK_PAGE_ID ?? ''
    this.accessToken = accessToken ?? process.env.FACEBOOK_PAGE_ACCESS_TOKEN ?? ''

    if (!this.pageId || !this.accessToken) {
      throw new Error(
        'FacebookPageClient: FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN must be set'
      )
    }
  }

  // ── Post text-only update ──────────────────────────────────────────────────

  async postText(message: string): Promise<FacebookPostResult> {
    const url = `${BASE_URL}/${this.pageId}/feed`
    const body = new URLSearchParams({
      message,
      access_token: this.accessToken,
    })

    const res = await fetch(url, {
      method: 'POST',
      body,
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Facebook postText failed: ${res.status} ${err}`)
    }

    return res.json() as Promise<FacebookPostResult>
  }

  // ── Post photo with caption ────────────────────────────────────────────────

  async postPhoto(
    imagePath: string,
    caption: string
  ): Promise<FacebookPhotoResult> {
    const url = `${BASE_URL}/${this.pageId}/photos`
    const form = new FormData()

    form.append('caption', caption)
    form.append('access_token', this.accessToken)
    form.append(
      'source',
      fs.createReadStream(path.resolve(imagePath)),
      {
        filename: path.basename(imagePath),
        contentType: 'image/png',
      }
    )

    const res = await fetch(url, {
      method: 'POST',
      // @ts-expect-error form-data headers compatible with fetch
      headers: form.getHeaders(),
      body: form as unknown as BodyInit,
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Facebook postPhoto failed: ${res.status} ${err}`)
    }

    return res.json() as Promise<FacebookPhotoResult>
  }

  // ── Fetch engagement metrics for a post ───────────────────────────────────

  async getPostEngagement(postId: string): Promise<FacebookEngagement> {
    const fields = 'likes.summary(true),comments.summary(true),shares,insights.metric(post_impressions,post_reach)'
    const url = `${BASE_URL}/${postId}?fields=${encodeURIComponent(fields)}&access_token=${this.accessToken}`

    const res = await fetch(url)

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Facebook getPostEngagement failed: ${res.status} ${err}`)
    }

    const data = await res.json() as Record<string, unknown>

    const insights = (data.insights as { data?: Array<{ name: string; values: Array<{ value: number }> }> })?.data ?? []
    const reachEntry = insights.find(i => i.name === 'post_reach')
    const impressionsEntry = insights.find(i => i.name === 'post_impressions')

    return {
      postId,
      likes: ((data.likes as { summary?: { total_count?: number } })?.summary?.total_count) ?? 0,
      comments: ((data.comments as { summary?: { total_count?: number } })?.summary?.total_count) ?? 0,
      shares: (data.shares as { count?: number })?.count ?? 0,
      reach: reachEntry?.values?.[0]?.value ?? 0,
      impressions: impressionsEntry?.values?.[0]?.value ?? 0,
    }
  }

  // ── Fetch recent posts from the page ──────────────────────────────────────

  async getRecentPosts(limit = 10): Promise<Array<{ id: string; message: string; created_time: string }>> {
    const url = `${BASE_URL}/${this.pageId}/posts?fields=id,message,created_time&limit=${limit}&access_token=${this.accessToken}`

    const res = await fetch(url)

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Facebook getRecentPosts failed: ${res.status} ${err}`)
    }

    const data = await res.json() as { data: Array<{ id: string; message: string; created_time: string }> }
    return data.data
  }
}
