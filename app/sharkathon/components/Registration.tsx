'use client';

import { motion } from 'framer-motion';
import { Rocket, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Registration() {
    const [currentStep, setCurrentStep] = useState(1);
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
        email: '',
        phone: '',
        teamLead: '',
        member2: '',
        member3: '',
        member4: '',
        referral: '',
        teamId: '',
    });

    useEffect(() => {
        const generateTeamId = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < 4; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return `SHARK-ABIT-${result}`;
        };

        setFormData(prev => ({
            ...prev,
            teamId: generateTeamId()
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'teamSize') {
            setTeamSize(parseInt(value));
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 5, prev + 1));
    const prevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));

    const totalSteps = 5;
    const steps = [
        { id: 1, title: 'Basic Info' },
        { id: 2, title: 'Team Details' },
        { id: 3, title: 'Project Pitch' },
        { id: 4, title: 'Market & Strategy' },
        { id: 5, title: 'Final Submission' }
    ];

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

    const isRegistrationClosed = true;

    if (isRegistrationClosed) {
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
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rocket size={40} color="#FF0000" />
                    </div>
                    <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-space-grotesk)' }}>Registration Closed</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.6 }}>
                        The tank is now closed for new entries. <br/>
                        Shortlist will be announced on 24th March Morning. <br/>
                        You will receive all further updates via email.
                    </p>
                    <a 
                        href="https://chat.whatsapp.com/Dsx2JxurwFvLQrPZA1tQFt?mode=hqctshi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            background: '#25D366',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            marginTop: '12px',
                            fontFamily: 'var(--font-inter, Inter, sans-serif)',
                            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                        }}
                    >
                        Join the official WhatsApp group for updates
                    </a>
                </motion.div>
            </section>
        );
    }

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
                        <CheckCircle2 size={40} color="#10B981" />
                    </div>
                    <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-space-grotesk)' }}>Application Submitted!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.6 }}>
                        Thank you for entering the tank. Our team will review your application and get back to you soon.
                    </p>
                    <a 
                        href="https://chat.whatsapp.com/Dsx2JxurwFvLQrPZA1tQFt?mode=hqctshi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            background: '#25D366',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            marginTop: '12px',
                            fontFamily: 'var(--font-inter, Inter, sans-serif)',
                            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                        }}
                    >
                        Join the official WhatsApp group for updates
                    </a>
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '40px',
                        position: 'relative',
                        padding: '0 10px'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '0',
                            right: '0',
                            height: '2px',
                            background: 'rgba(255,255,255,0.05)',
                            zIndex: 1
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '0',
                            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                            height: '2px',
                            background: 'linear-gradient(90deg, #FF0000, #FF6A00)',
                            zIndex: 1,
                            transition: 'all 0.3s ease'
                        }} />

                        {steps.map((step) => (
                            <div key={step.id} style={{
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: currentStep >= step.id ? 'linear-gradient(135deg, #FF0000, #FF6A00)' : '#1A1A1A',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    color: 'white',
                                    transition: 'all 0.3s ease',
                                    boxShadow: currentStep === step.id ? '0 0 15px rgba(255, 0, 0, 0.3)' : 'none'
                                }}>
                                    {currentStep > step.id ? '✓' : step.id}
                                </div>
                                <span style={{
                                    fontSize: '10px',
                                    color: currentStep >= step.id ? 'white' : 'rgba(255,255,255,0.3)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    display: 'none', // Hidden on mobile, shown on tablet+
                                }} className="step-label">
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="responsive-grid">
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Startup Name</label>
                                        <input
                                            name="startupName"
                                            value={formData.startupName}
                                            onChange={handleChange}
                                            required
                                            type="text"
                                            placeholder="Acme Corp"
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Industry / Track</label>
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            style={inputStyle}
                                        >
                                            <option value="fintech">Fintech & Web3</option>
                                            <option value="healthtech">Healthtech & Bio</option>
                                            <option value="edtech">EdTech & Learning</option>
                                            <option value="sustainability">Sustainability & Clean Energy</option>
                                            <option value="ai">AI / Enterprise SaaS</option>
                                            <option value="other">Other / Open Innovation</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="responsive-grid">
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            type="email"
                                            placeholder="you@example.com"
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Size</label>
                                    <select
                                        name="teamSize"
                                        value={formData.teamSize}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    >
                                        <option value="1">1 Member</option>
                                        <option value="2">2 Members</option>
                                        <option value="3">3 Members</option>
                                        <option value="4">4 Members</option>
                                    </select>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Team Details */}
                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="responsive-grid">
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>College Name</label>
                                        <input
                                            name="collegeName"
                                            value={formData.collegeName}
                                            onChange={handleChange}
                                            required
                                            type="text"
                                            placeholder="e.g. ABIT"
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Engineering Year</label>
                                        <select
                                            name="engYear"
                                            value={formData.engYear}
                                            onChange={handleChange}
                                            style={inputStyle}
                                        >
                                            <option value="FE">First Year (FE)</option>
                                            <option value="SE">Second Year (SE)</option>
                                            <option value="TE">Third Year (TE)</option>
                                            <option value="BE">Fourth Year (BE)</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="responsive-grid">
                                    <div>
                                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Team Lead Name</label>
                                        <input
                                            name="teamLead"
                                            value={formData.teamLead}
                                            onChange={handleChange}
                                            required
                                            type="text"
                                            placeholder="Member 1 (Lead)"
                                            style={inputStyle}
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
                                                style={inputStyle}
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
                                                style={inputStyle}
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
                                                style={inputStyle}
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Project Pitch */}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>One-line Pitch</label>
                                    <input
                                        name="pitch"
                                        value={formData.pitch}
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        placeholder="We build X for Y using Z"
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>What specific problem are you addressing?</label>
                                    <textarea
                                        name="problem"
                                        value={formData.problem}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        placeholder="Describe the core problem..."
                                        style={textareaStyle}
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
                                        style={textareaStyle}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Market & Strategy */}
                        {currentStep === 4 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How is your project/idea better than the market?</label>
                                    <textarea
                                        name="competitorAdvantage"
                                        value={formData.competitorAdvantage}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        placeholder="Your unique value proposition..."
                                        style={textareaStyle}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Strategy against competition?</label>
                                    <textarea
                                        name="competitionStrategy"
                                        value={formData.competitionStrategy}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        placeholder="Competitive strategy..."
                                        style={textareaStyle}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Scaling plan?</label>
                                    <textarea
                                        name="scalingPlan"
                                        value={formData.scalingPlan}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        placeholder="Growth potential and strategy..."
                                        style={textareaStyle}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Final Submission */}
                        {currentStep === 5 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px dashed rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    textAlign: 'center'
                                }}>
                                    <span style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Your Unique Team ID</span>
                                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#FF4D00', letterSpacing: '2px' }}>{formData.teamId}</span>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>Please save this ID for future reference.</p>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Pitch Deck / Video (Google Drive Link)</label>
                                    <input
                                        name="pitchLink"
                                        value={formData.pitchLink}
                                        onChange={handleChange}
                                        required
                                        type="url"
                                        placeholder="https://drive.google.com/share/..."
                                        style={inputStyle}
                                    />
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '8px' }}>
                                        Ensure sharing is set to "Anyone with link".
                                    </p>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>How did you hear about us?</label>
                                    <select
                                        name="referral"
                                        value={formData.referral}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    >
                                        <option value="">Select an option</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="whatsapp">WhatsApp / Community</option>
                                        <option value="StartupNews.fyi">StartupNews.fyi</option>
                                        <option value="friends">Friends / Referral</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Additional Info (Optional)</label>
                                    <textarea
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Anything else you'd like to share..."
                                        style={textareaStyle}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div style={{ color: '#EF4444', fontSize: '14px', textAlign: 'center' }}>
                                        Something went wrong. Please try again.
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            marginTop: '24px',
                            flexDirection: 'row' // Explicitly row, layout handled by responsive CSS
                        }} className="navigation-buttons">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    style={{
                                        flex: 1,
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                                    onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                                >
                                    Previous
                                </button>
                            )}

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    style={{
                                        flex: 2,
                                        background: 'linear-gradient(135deg, #FF0000, #FF6A00)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 20px rgba(255, 0, 0, 0.2)',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    style={{
                                        flex: 2,
                                        background: 'linear-gradient(135deg, #FF0000, #FF6A00)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        boxShadow: '0 10px 30px rgba(255, 0, 0, 0.2)',
                                        transition: 'all 0.2s ease',
                                        opacity: status === 'loading' ? 0.8 : 1
                                    }}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <Rocket size={20} />
                                    )}
                                    {status === 'loading' ? 'Submitting...' : 'Submit Entry'}
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>

            <style jsx global>{`
                select option {
                    background-color: #1A1A1A;
                    color: white;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @media (min-width: 640px) {
                    .step-label {
                        display: block !important;
                    }
                }
                @media (max-width: 480px) {
                    .responsive-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .navigation-buttons {
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </section>
    );
}

// Sub-component styles for cleaner JSX
const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box' as const,
};

const textareaStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
};
