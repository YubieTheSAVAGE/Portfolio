import { ImageResponse } from 'next/og'
import { siteConfig } from '@/site.config'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  const initials = siteConfig.name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#8AE500',
          border: '6px solid #000',
          fontSize: 30,
          fontWeight: 800,
          color: '#000',
        }}
      >
        {initials}
      </div>
    ),
    size,
  )
}
