import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#14181C',
          color: '#C9A56E',
          fontSize: 19,
          fontFamily: 'Georgia, serif',
        }}
      >
        JL
      </div>
    ),
    size,
  )
}
