'use client';

import { motion } from 'framer-motion';
import { UploadCloud, Rocket, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Registration() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <section id="register" style={{
            padding: '100px 24px',
            background: '#030101',
            position: 'relative',
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '16px'
                    }}>
                        Enter the Tank
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
                        Fill out the details, upload your pitch deck, and get ready to revolutionize your industry.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                >
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Flex container for basic info */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                            <div style={{ flex: '1 1 200px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Startup Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Acme Corp"
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '15px',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <div style={{ flex: '1 1 200px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Size</label>
                                <select 
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '15px',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="1">1 Member</option>
                                    <option value="2">2 Members</option>
                                    <option value="3">3 Members</option>
                                    <option value="4">4 Members</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Industry / Track</label>
                            <select 
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="fintech">Fintech & Web3</option>
                                <option value="healthtech">Healthtech & Bio</option>
                                <option value="edtech">EdTech & Learning</option>
                                <option value="sustainability">Sustainability & Clean Energy</option>
                                <option value="ai">AI / Enterprise SaaS</option>
                                <option value="other">Other / Open Innovation</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>One-line Pitch</label>
                            <input 
                                type="text" 
                                placeholder="We build X for Y using Z"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>What specific problem are you addressing with your idea?</label>
                            <textarea
                                rows={3}
                                placeholder="Describe the core problem..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How feasible is your idea in terms of implementation?</label>
                            <textarea
                                rows={3}
                                placeholder="Technical and operational feasibility..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How is your project/idea better than the market?</label>
                            <textarea
                                rows={3}
                                placeholder="Your unique value proposition..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>What plans do you have that make your idea better than the competition?</label>
                            <textarea
                                rows={3}
                                placeholder="Competitive strategy..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How will you scale your business/project?</label>
                            <textarea
                                rows={3}
                                placeholder="Growth potential and strategy..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Is there anything else that can help enhance your pitch? (Optional)</label>
                            <textarea
                                rows={2}
                                placeholder="Additional links, metrics, or context..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ marginTop: '8px' }}>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Upload Pitch Deck (PDF)</label>
                            
                            <div 
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                style={{
                                    border: `2px dashed ${dragActive ? '#FF6A00' : 'rgba(255,255,255,0.2)'}`,
                                    borderRadius: '16px',
                                    padding: '40px 24px',
                                    textAlign: 'center',
                                    background: dragActive ? 'rgba(255,106,0,0.05)' : 'rgba(255,255,255,0.02)',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                onClick={() => document.getElementById('file-upload')?.click()}
                            >
                                <input 
                                    id="file-upload"
                                    type="file" 
                                    accept=".pdf"
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                
                                {file ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                        <CheckCircle2 size={32} color="#10B981" />
                                        <div style={{ color: 'white', fontWeight: 500 }}>{file.name}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Click or drag to replace</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                        <UploadCloud size={32} color={dragActive ? '#FF6A00' : 'rgba(255,255,255,0.4)'} />
                                        <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                                            <span style={{ color: '#FF6A00' }}>Click to upload</span> or drag and drop
                                        </div>
                                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>PDF only (Max 10MB)</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            style={{
                                width: '100%',
                                background: 'linear-gradient(135deg, #FF0000, #FF6A00)',
                                color: 'white',
                                border: 'none',
                                padding: '16px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: 700,
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '16px',
                                boxShadow: '0 10px 30px rgba(255, 0, 0, 0.2)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <Rocket size={20} /> Submit Application
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
