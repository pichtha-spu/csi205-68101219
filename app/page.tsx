'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Noto_Sans_Thai } from 'next/font/google'

const font = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

/* ===== แก้ข้อมูลตรงนี้ ===== */
const creator = {
  name: 'พิชญ์ ทาทอง',
  nickname: 'พิชญ์',
  studentId: '68101219',
  role: 'Frontend Developer & UI/UX Designer',
  photo: '/Me.png', // วางรูปไว้ที่ public/Me.png
  intro:
    'ฝึกหัดกาารพัฒนาเว็บด้วย Next.js และ React ',
  about: [
    'การเรียนวิทยาการคอมพิวเตอร์สำหรับผม คือการฝึกทักษะการคิดอย่างเป็นระบบเพื่อนำมาใช้แก้ปัญหาจริงในชีวิตประจำวัน ความน่าสนใจของสายงานนี้ไม่ได้อยู่ที่เรื่องหวือหวา แต่อยู่ที่การได้เห็นระบบที่เราพัฒนาขึ้นมาสามารถใช้งานได้จริง ทำงานได้ถูกต้อง และช่วยลดขั้นตอนที่ยุ่งยากให้ผู้คนได้ เป้าหมายสำคัญของผมคือการพัฒนาตัวเองเพื่อเป็น Programmer มืออาชีพที่เก่งและต่อยอดได้จริง เรียนรู้เทคโนโลยีใหม่อยู่เสมอ เขียนโค้ดที่สะอาด ทำงานร่วมกับผู้อื่นได้ดี และส่งมอบซอฟต์แวร์ที่มีคุณภาพ ในฐานะ พิชญ์ ทาทอง ผมตั้งใจจะสร้างความเชี่ยวชาญจากพื้นฐานที่มั่นคง เพื่อเติบโตในสายงานนี้ได้อย่างมั่นคงและพึ่งพาได้ครับ',
    
  ],
  facts: [
    { label: 'สถาบัน', value: 'มหาวิทยาลัยศรีปทุม (SPU)' },
    { label: 'สถานะ', value: 'นักศึกษาชั้นปีที่ 2 คณะเทคโนโลยีสารสนเทศ สาขา วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์' },
    { label: 'สถานที่', value: 'กรุงเทพมหานคร' },
    { label: 'อีเมล', value: 'pich.tha@spumail.net' },
  ],
  skills: [
    { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'] },
    { group: 'Design', items: ['Figma', 'UI/UX Design'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'VS Code','Postman'] },
  ],
  timeline: [
    { year: '2026', title: 'เปิดตัวพอร์ตโฟลิโอ & โปรเจกต์หลัก', text: 'พัฒนาเว็บแอปพลิเคชันรวมผลงานการเรียนครบวงจร' },
    { year: '2025', title: 'ศึกษา Full-Stack & UI Design', text: 'ลุยทำโปรเจกต์จริงด้วย Next.js และออกแบบ Design System' },
    { year: '2024', title: 'จุดเริ่มต้นสายพัฒนาเว็บ', text: 'เรียนรู้พื้นฐาน HTML, CSS, JavaScript และหลงรักงานด้าน Frontend' },
  ],
  works: [
    { 
      title: 'Animation Showcase', 
      tag: 'CSS & React Animation',
      text: 'การทดลองทำแอนิเมชันและเอฟเฟกต์โต้ตอบด้วย CSS Keyframes และ React Motion', 
      href: '/animation' 
    },
    { 
      title: 'Interactive Calculator', 
      tag: 'Web Utility App',
      text: 'เครื่องคิดเลขประสิทธิภาพสูงพร้อมการจัดการ State ขั้นสูงผ่าน React Hooks', 
      href: '/calculator' 
    },
    { 
      title: 'Task Management Todo', 
      tag: 'Productivity Tool',
      text: 'แอปจัดการรายการสิ่งที่ต้องทำ เพิ่ม ลบ แก้ไขสถานะ และจัดเก็บข้อมูลอย่างมีระบบ', 
      href: '/todos' 
    },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/', icon: '🐙' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: '💼' },
    { label: 'Instagram', href: 'https://instagram.com/', icon: '📸' },
  ],
}
/* ========================= */

const allSkills = creator.skills.flatMap((g) => g.items)

export default function Home() {
  const [imgFailed, setImgFailed] = useState(false)
  const [activeSkillTab, setActiveSkillTab] = useState('ทั้งหมด')

  const skillGroups = ['ทั้งหมด', ...creator.skills.map((s) => s.group)]

  const filteredSkills =
    activeSkillTab === 'ทั้งหมด'
      ? creator.skills
      : creator.skills.filter((s) => s.group === activeSkillTab)

  return (
    <div className={`wrap ${font.className}`}>
      <style>{css}</style>

      <div className="bg-gradient-glow" aria-hidden="true" />

      {/* Header Navigation */}
      <header className="top-nav">
        <div className="brand-logo">
          <span className="dot" /> PICH.DEV
        </div>
        <div className="status-badge">
          <span className="status-dot" /> พร้อมรับงาน & ร่วมงาน
        </div>
      </header>

      <div className="container">
        {/* Main Hero Bento Section */}
        <section className="hero-bento">
          {/* Profile Card */}
          <div className="bento-card profile-card">
            <div className="photo-wrapper">
              {imgFailed ? (
                <div className="photo-fallback" role="img" aria-label="รูปโปรไฟล์">
                  {creator.nickname.slice(0, 1)}
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={creator.photo}
                  alt={`รูปของ ${creator.name}`}
                  onError={() => setImgFailed(true)}
                  className="profile-img"
                />
              )}
              <span className="badge-id">ID: {creator.studentId}</span>
            </div>

            <div className="profile-info">
              <span className="role-tag">{creator.role}</span>
              <h1>{creator.name}</h1>
              <p className="bio">{creator.intro}</p>

              <div className="social-links">
                {creator.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="social-btn">
                    <span>{l.icon}</span> {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Facts Card */}
          <div className="bento-card facts-card">
            <h3>ข้อมูลส่วนตัว</h3>
            <div className="facts-grid">
              {creator.facts.map((f) => (
                <div key={f.label} className="fact-item">
                  <span className="fact-label">{f.label}</span>
                  <span className="fact-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scrolling Skill Band */}
        <section className="ticker-section" aria-label="ทักษะทั้งหมด">
          <div className="ticker-track">
            {[...allSkills, ...allSkills, ...allSkills].map((skill, idx) => (
              <div key={idx} className="ticker-item">
                <span className="star">✦</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Works Section */}
        <section className="works-section">
          <div className="section-header">
            <h2>ผลงานในรายวิชา</h2>
            <p>Selected Works & Projects</p>
          </div>

          <div className="works-grid">
            {creator.works.map((w, i) => (
              <Link key={w.title} href={w.href} className="work-card">
                <div className="work-card-header">
                  <span className="work-num">0{i + 1}</span>
                  <span className="work-tag">{w.tag}</span>
                </div>
                <div className="work-card-body">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
                <div className="work-card-footer">
                  <span>เข้าชมผลงาน</span>
                  <span className="arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Interactive Info Section (Story, Skills Filter, Timeline) */}
        <section className="info-bento">
          {/* Story */}
          <article className="bento-card story-card">
            <h2>เรื่องราวและความตั้งใจ</h2>
            <div className="story-content">
              {creator.about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>

          {/* Interactive Skills */}
          <article className="bento-card skills-card">
            <h2>ทักษะและเครื่องมือ</h2>
            <div className="skill-tabs">
              {skillGroups.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeSkillTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveSkillTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="skills-display">
              {filteredSkills.map((g) => (
                <div key={g.group} className="skill-group-box">
                  <span className="group-name">{g.group}</span>
                  <div className="pill-container">
                    {g.items.map((item) => (
                      <span key={item} className="skill-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Timeline */}
          <article className="bento-card timeline-card">
            <h2>เส้นทางการเติบโต</h2>
            <div className="timeline-list">
              {creator.timeline.map((t) => (
                <div key={t.year} className="timeline-item">
                  <div className="timeline-badge">{t.year}</div>
                  <div className="timeline-details">
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 {creator.name} — Student Portfolio. Crafted with Next.js & React.</p>
        </footer>
      </div>
    </div>
  )
}

const css = `
  .wrap {
    --bg: #090d16;
    --card-bg: rgba(18, 24, 38, 0.7);
    --card-border: rgba(255, 255, 255, 0.08);
    --primary: #6366f1;
    --primary-glow: rgba(99, 102, 241, 0.25);
    --accent: #38bdf8;
    --yellow: #facc15;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    
    color: var(--text-main);
    background-color: var(--bg);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    line-height: 1.6;
  }

  .wrap *, .wrap *::before, .wrap *::after { box-sizing: border-box; }

  /* Ambient Glow Background */
  .bg-gradient-glow {
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 64px;
    position: relative;
    z-index: 1;
  }

  /* Top Navigation */
  .top-nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .brand-logo {
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .brand-logo .dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
  }
  .status-badge {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
    color: #4ade80;
    padding: 6px 14px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .status-dot {
    width: 6px;
    height: 6px;
    background: #4ade80;
    border-radius: 50%;
    box-shadow: 0 0 8px #4ade80;
  }

  /* Bento Base Styling */
  .bento-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(16px);
    border-radius: 24px;
    padding: 32px;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .bento-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
  }

  /* Hero Bento Layout */
  .hero-bento {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 20px;
    margin-top: 12px;
    margin-bottom: 32px;
  }

  /* Profile Card */
  .profile-card {
    display: flex;
    gap: 32px;
    align-items: center;
  }
  .photo-wrapper {
    position: relative;
    flex-shrink: 0;
  }
  .profile-img, .photo-fallback {
    width: 170px;
    height: 210px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .photo-fallback {
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    font-size: 64px;
    font-weight: 800;
    color: var(--primary);
  }
  .badge-id {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    border: 1px solid var(--primary);
    color: var(--text-main);
    font-size: 11px;
    font-weight: 700;
    padding: 2px 10px;
    border-radius: 99px;
    white-space: nowrap;
  }

  .profile-info { flex: 1; }
  .role-tag {
    display: inline-block;
    color: var(--accent);
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }
  .profile-card h1 {
    margin: 0 0 12px;
    font-size: 38px;
    font-weight: 800;
    line-height: 1.15;
    background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .bio {
    margin: 0 0 20px;
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.6;
  }
  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .social-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--text-main);
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .social-btn:hover {
    background: var(--primary);
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--primary-glow);
  }

  /* Facts Card */
  .facts-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .facts-card h3 {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-main);
  }
  .facts-grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .fact-item {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 14px;
  }
  .fact-item:last-child { border-bottom: none; padding-bottom: 0; }
  .fact-label { color: var(--text-muted); }
  .fact-value { font-weight: 600; color: var(--text-main); text-align: right; }

  /* Ticker Section */
  .ticker-section {
    background: linear-gradient(90deg, rgba(99,102,241,0.1), rgba(56,189,248,0.1));
    border: 1px solid var(--card-border);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 48px;
    padding: 14px 0;
  }
  .ticker-track {
    display: flex;
    width: max-content;
    animation: scroll 35s linear infinite;
  }
  .ticker-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 24px;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: 0.03em;
  }
  .ticker-item .star { color: var(--yellow); font-size: 12px; }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.33%); }
  }

  /* Works Section */
  .works-section { margin-bottom: 48px; }
  .section-header { margin-bottom: 24px; }
  .section-header h2 { margin: 0; font-size: 26px; font-weight: 800; }
  .section-header p { margin: 4px 0 0; color: var(--text-muted); font-size: 14px; }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .work-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 28px;
    text-decoration: none;
    color: var(--text-main);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .work-card:hover {
    transform: translateY(-6px);
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 16px 32px rgba(0,0,0,0.3), 0 0 20px var(--primary-glow);
  }
  .work-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .work-num {
    font-size: 14px;
    font-weight: 800;
    color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
    padding: 4px 10px;
    border-radius: 8px;
  }
  .work-tag { font-size: 12px; color: var(--text-muted); font-weight: 500; }
  .work-card-body h3 {
    margin: 0 0 10px;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.3;
  }
  .work-card-body p {
    margin: 0 0 24px;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.6;
  }
  .work-card-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: var(--accent);
  }
  .work-card-footer .arrow { transition: transform 0.2s ease; }
  .work-card:hover .work-card-footer .arrow { transform: translateX(6px); }

  /* Info Bento Grid (Story, Skills, Timeline) */
  .info-bento {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 20px;
  }
  .info-bento h2 {
    margin: 0 0 20px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding-bottom: 12px;
  }

  /* Story Card */
  .story-card { grid-column: span 1; }
  .story-content p {
    margin: 0 0 14px;
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.7;
  }
  .story-content p:last-child { margin-bottom: 0; }

  /* Skills Card */
  .skills-card { grid-column: span 1; }
  .skill-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .tab-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--text-muted);
    padding: 6px 14px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .tab-btn.active, .tab-btn:hover {
    background: var(--primary);
    color: #fff;
    border-color: var(--primary);
  }
  .skills-display { display: flex; flex-direction: column; gap: 16px; }
  .skill-group-box .group-name {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .pill-container { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 6px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
  }

  /* Timeline Card */
  .timeline-card { grid-column: 1 / -1; }
  .timeline-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 10px;
  }
  .timeline-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 16px;
  }
  .timeline-badge {
    display: inline-block;
    background: rgba(250, 204, 21, 0.1);
    color: var(--yellow);
    font-weight: 800;
    font-size: 14px;
    padding: 2px 10px;
    border-radius: 6px;
    margin-bottom: 12px;
  }
  .timeline-details h4 { margin: 0 0 6px; font-size: 16px; font-weight: 700; }
  .timeline-details p { margin: 0; font-size: 13px; color: var(--text-muted); }

  /* Footer */
  .footer {
    text-align: center;
    margin-top: 64px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.06);
    color: var(--text-muted);
    font-size: 13px;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-bento { grid-template-columns: 1fr; }
    .works-grid { grid-template-columns: repeat(2, 1fr); }
    .info-bento { grid-template-columns: 1fr; }
    .story-card, .skills-card { grid-column: span 1; }
    .timeline-list { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .top-nav { flex-direction: column; gap: 12px; align-items: flex-start; }
    .profile-card { flex-direction: column; text-align: center; }
    .social-links { justify-content: center; }
    .works-grid { grid-template-columns: 1fr; }
    .bento-card { padding: 24px; }
  }
`