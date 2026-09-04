import { ImageResponse } from 'next/og'

export const alt =
  'Jason Lee — Concierge Business Advisor and host of The Living Question'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#14181C',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#C9A56E' }}>
          Concierge Business Advisor · Host of The Living Question
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, color: '#F2EFEA', lineHeight: 1.05 }}>Jason Lee</div>
          <div
            style={{
              display: 'flex',
              marginTop: 26,
              fontSize: 29,
              color: 'rgba(242,239,234,0.62)',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Conversations for the moments when logic isn&rsquo;t enough.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(242,239,234,0.62)',
            borderTop: '1px solid rgba(242,239,234,0.16)',
            paddingTop: 26,
          }}
        >
          <span>leejason.net</span>
          <span style={{ color: '#C9A56E' }}>CBA Lifestyle</span>
        </div>
      </div>
    ),
    size,
  )
}
