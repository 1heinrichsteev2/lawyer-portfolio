import { ImageResponse } from 'next/og';
import { advocate } from '@/data/advocate';

export const alt = `${advocate.name} — ${advocate.designation}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0A0A0A', color: '#EDE7DA', padding: 80, flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', width: 120, height: 170, borderRadius: '60px 60px 8px 8px', border: '2px solid #C8A45D' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 72, letterSpacing: -1 }}>{advocate.name}</div>
          <div style={{ display: 'flex', fontSize: 30, color: '#9C978C', marginTop: 16 }}>{`${advocate.designation}, criminal law and litigation`}</div>
        </div>
      </div>
    ),
    size
  );
}
