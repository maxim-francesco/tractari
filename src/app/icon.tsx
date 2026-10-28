import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
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
          background: '#FF6B00',
          color: '#FFFFFF',
          fontSize: 340,
          fontWeight: 900,
          borderRadius: 96,
        }}
      >
        T
      </div>
    ),
    size,
  )
}
