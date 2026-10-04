import { ImageResponse } from 'next/og';

export const alt = 'Cedar Ridge Ward sacrament meeting planner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: 'center',
                    background: '#f5f1e8',
                    color: '#26312d',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'space-between',
                    padding: '72px',
                    width: '100%',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', width: '62%' }}>
                    <div
                        style={{
                            color: '#b44d32',
                            fontSize: 22,
                            fontWeight: 700,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                        }}
                    >
                        Cedar Ridge Ward
                    </div>
                    <div
                        style={{
                            fontFamily: 'Georgia',
                            fontSize: 72,
                            lineHeight: 1.05,
                            marginTop: 34,
                        }}
                    >
                        Sacrament Meeting Planner
                    </div>
                    <div
                        style={{
                            color: '#68746e',
                            fontSize: 28,
                            marginTop: 26,
                        }}
                    >
                        A clear weekly record, all in one place.
                    </div>
                </div>
                <div
                    style={{
                        background: '#fffdf8',
                        border: '2px solid #d8d0c2',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 390,
                        justifyContent: 'space-between',
                        padding: 30,
                        width: 300,
                    }}
                >
                    <div style={{ color: '#b44d32', fontSize: 18, fontWeight: 700 }}>
                        SUNDAY WORSHIP
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <div style={{ background: '#d8d0c2', height: 2, width: '100%' }} />
                        <div style={{ background: '#dfe7df', height: 18, width: '82%' }} />
                        <div style={{ background: '#dfe7df', height: 18, width: '62%' }} />
                        <div style={{ background: '#d8d0c2', height: 2, marginTop: 8, width: '100%' }} />
                        <div style={{ color: '#68746e', fontSize: 18 }}>PEOPLE · HYMNS · PRAYERS</div>
                    </div>
                    <div style={{ color: '#26312d', fontFamily: 'Georgia', fontSize: 34 }}>
                        Weekly agenda
                    </div>
                </div>
            </div>
        ),
        size,
    );
}