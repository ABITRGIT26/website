'use client';

import { motion } from 'framer-motion';
import { Rocket, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Registration() {
    const [teamSize, setTeamSize] = useState(1);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        startupName: '',
        teamSize: '1',
        industry: 'fintech',
        pitch: '',
        problem: '',
        feasibility: '',
        competitorAdvantage: '',
        competitionStrategy: '',
        scalingPlan: '',
        additionalInfo: '',
        pitchLink: '',
        collegeName: '',
        engYear: 'FE',
        teamLead: '',
        member2: '',
        member3: '',
        member4: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'teamSize') {
            setTeamSize(parseInt(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <section id="register" style={{ padding: '100px 24px', background: '#030101', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '60px 40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px'
                    }}
                >
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={40} color="#10B981" />
                    </div>
                    <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-space-grotesk)' }}>Application Submitted!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.6 }}>
                        Thank you for entering the tank. Our team will review your application and get back to you soon.
                    </p>
                    <button 
                        onClick={() => { setStatus('idle'); setFormData({ ...formData, startupName: '', pitch: '', pitchLink: '' }); }}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            marginTop: '12px'
                        }}
                    >
                        Submit another response
                    </button>
                </motion.div>
            </section>
        );
    }

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
                        Fill out the details, provide your pitch deck link, and get ready to revolutionize your industry.
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
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        position: 'relative',
                        opacity: status === 'loading' ? 0.7 : 1,
                        pointerEvents: status === 'loading' ? 'none' : 'auto'
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Flex container for basic info */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                            <div style={{ flex: '1 1 200px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Startup Name</label>
                                <input 
                                    name="startupName"
                                    value={formData.startupName}
                                    onChange={handleChange}
                                    required
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
                                    name="teamSize"
                                    value={formData.teamSize}
                                    onChange={handleChange}
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

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Lead Name</label>
                                <input 
                                    name="teamLead"
                                    value={formData.teamLead}
                                    onChange={handleChange}
                                    required
                                    type="text" 
                                    placeholder="Member 1 (Lead)"
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
                            {teamSize >= 2 && (
                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Member 2 Name</label>
                                    <input 
                                        name="member2"
                                        value={formData.member2}
                                        onChange={handleChange}
                                        required
                                        type="text" 
                                        placeholder="Member 2"
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
                            )}
                            {teamSize >= 3 && (
                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Member 3 Name</label>
                                    <input 
                                        name="member3"
                                        value={formData.member3}
                                        onChange={handleChange}
                                        required
                                        type="text" 
                                        placeholder="Member 3"
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
                            )}
                            {teamSize >= 4 && (
                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Member 4 Name</label>
                                    <input 
                                        name="member4"
                                        value={formData.member4}
                                        onChange={handleChange}
                                        required
                                        type="text" 
                                        placeholder="Member 4"
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
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Industry / Track</label>
                            <select 
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
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

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                            <div style={{ flex: '1 1 200px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>College Name</label>
                                <input 
                                    name="collegeName"
                                    value={formData.collegeName}
                                    onChange={handleChange}
                                    required
                                    type="text" 
                                    placeholder="e.g. ABIT"
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
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Engineering Year</label>
                                <select 
                                    name="engYear"
                                    value={formData.engYear}
                                    onChange={handleChange}
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
                                    <option value="FE">First Year (FE)</option>
                                    <option value="SE">Second Year (SE)</option>
                                    <option value="TE">Third Year (TE)</option>
                                    <option value="BE">Fourth Year (BE)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>One-line Pitch</label>
                            <input 
                                name="pitch"
                                value={formData.pitch}
                                onChange={handleChange}
                                required
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
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Describe the core problem..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How feasible is your idea in terms of implementation?</label>
                            <textarea
                                name="feasibility"
                                value={formData.feasibility}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Technical and operational feasibility..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How is your project/idea better than the market?</label>
                            <textarea
                                name="competitorAdvantage"
                                value={formData.competitorAdvantage}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Your unique value proposition..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>What plans do you have that make your idea better than the competition?</label>
                            <textarea
                                name="competitionStrategy"
                                value={formData.competitionStrategy}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Competitive strategy..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How will you scale your business/project?</label>
                            <textarea
                                name="scalingPlan"
                                value={formData.scalingPlan}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Growth potential and strategy..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Is there anything else that can help enhance your pitch? (Optional)</label>
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Additional links, metrics, or context..."
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Pitch Deck or Pitch Video (Google Drive Link)</label>
                            <input 
                                name="pitchLink"
                                value={formData.pitchLink}
                                onChange={handleChange}
                                required
                                type="url" 
                                placeholder="https://drive.google.com/share/..."
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
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '8px' }}>
                                Ensure the link sharing is set to "Anyone with the link can view".
                            </p>
                        </div>

                        {status === 'error' && (
                            <div style={{ color: '#EF4444', fontSize: '14px', textAlign: 'center' }}>
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
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
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '16px',
                                boxShadow: '0 10px 30px rgba(255, 0, 0, 0.2)',
                                transition: 'all 0.2s ease',
                                opacity: status === 'loading' ? 0.8 : 1
                            }}
                            onMouseOver={(e) => !status.includes('loading') && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseOut={(e) => !status.includes('loading') && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            {status === 'loading' ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <Rocket size={20} />
                            )}
                            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </motion.div>
            </div>
            {status === 'loading' && (
                <style jsx>{`
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            )}
        </section>
    );
}
