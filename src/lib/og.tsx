import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { ALL_SKILLS } from '@/data/skills'
import { siteConfig } from '@/site.config'

export const ogSize = { width: 1200, height: 630 }

const INK = '#000000'
const PAPER = '#EEF5DF'
const LIME = '#8AE500'

const fontsDir = join(process.cwd(), 'src/assets/fonts')

/** Shared neobrutal share card used by every `opengraph-image.tsx`. */
export async function renderOgCard({ label, heading, subheading }: {
  label: string
  heading: string
  subheading: string
}) {
  const [display, body] = await Promise.all([
    readFile(join(fontsDir, 'ArchivoBlack-Regular.ttf')),
    readFile(join(fontsDir, 'Montserrat-SemiBold.ttf')),
  ])

  const chips = siteConfig.heroStack
    .slice(0, 4)
    .map((key) => ALL_SKILLS.find((s) => s.iconKey === key)?.name ?? key)
  const host = siteConfig.url.replace(/^https?:\/\//, '')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: PAPER,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)',
          backgroundSize: '32px 32px',
          fontFamily: 'Montserrat',
          color: INK,
        }}
      >
        {/* Hard shadow */}
        <div
          style={{
            position: 'absolute',
            left: 56,
            top: 84,
            width: 1060,
            height: 470,
            background: INK,
          }}
        />
        {/* Card */}
        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 68,
            width: 1060,
            height: 470,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px 56px',
            background: LIME,
            border: `5px solid ${INK}`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                padding: '6px 16px',
                background: '#FFFFFF',
                border: `4px solid ${INK}`,
                fontSize: 24,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              {label}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                fontFamily: 'Archivo Black',
                fontSize: heading.length > 18 ? 72 : 92,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {heading}
            </div>
            <div style={{ display: 'flex', marginTop: 20, fontSize: 34, maxWidth: 900 }}>
              {subheading}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    background: PAPER,
                    border: `3px solid ${INK}`,
                    fontSize: 22,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', fontFamily: 'Archivo Black', fontSize: 26 }}>{host}</div>
          </div>
        </div>

        {/* Stickers */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 36,
            width: 86,
            height: 86,
            background: '#FACC00',
            border: `5px solid ${INK}`,
            boxShadow: `-8px 8px 0 0 ${INK}`,
            transform: 'rotate(14deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 30,
            bottom: 40,
            width: 64,
            height: 64,
            background: '#7A83FF',
            border: `5px solid ${INK}`,
            boxShadow: `-6px 6px 0 0 ${INK}`,
            transform: 'rotate(-12deg)',
          }}
        />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Archivo Black', data: display, weight: 400, style: 'normal' },
        { name: 'Montserrat', data: body, weight: 600, style: 'normal' },
      ],
    },
  )
}
