export default function SharkathonFooter() {
    return (
        <footer style={{
            background: 'linear-gradient(180deg, #110505 0%, #030101 100%)',
            borderTop: '1px solid rgba(255, 0, 0, 0.1)',
            padding: '60px 24px 32px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
                    <div>
                        <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', marginBottom: '16px' }}>
                            Sharkathon 2026
                        </h3>
                        <p style={{ lineHeight: 1.6, marginBottom: '20px' }}>
                            India’s most exciting student startup pitching competition. Pitch. Innovate. Dominate.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p>+91 70589 34779</p>
                            <p>+91 93215 19165</p>
                            <p>abitrgit.it@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px' }}>Location</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p>ABIT – Association of Budding Information Technocrats</p>
                            <p>RGIT Mumbai</p>
                            <p>Andheri West, Mumbai, MH, India</p>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px' }}>Follow Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <a href="https://instagram.com/abit.rgit" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram: @abit.rgit</a>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <p>© {new Date().getFullYear()} ABIT RGIT. All rights reserved.</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Special thanks to Sumeet Parmar!</p>
                </div>
            </div>
        </footer>
    );
}
