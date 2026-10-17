import { ImageResponse } from 'next/og';
import { university } from '@/config';
export const alt = 'Campus Events';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage(): ImageResponse {
  const title = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 72,
    fontWeight: 700,
  } as const;
  const canvas = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: university.primaryColor,
    color: 'white',
    padding: 80,
  } as const;
  return new ImageResponse(
    <div style={canvas}>
      <div style={{ fontSize: 28, marginBottom: 28 }}>{university.name}</div>
      <div style={title}>
        <span>Your campus.</span>
        <span>Your kind of events.</span>
      </div>
      <div style={{ fontSize: 24, marginTop: 36 }}>Find your people. Make it your campus.</div>
    </div>,
    size,
  );
}
