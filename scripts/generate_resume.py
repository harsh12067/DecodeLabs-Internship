import os
import fitz  # PyMuPDF
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_resume():
    os.makedirs('./public', exist_ok=True)
    pdf_path = './public/resume.pdf'
    
    # 0.5 inch margins
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    story = []
    styles = getSampleStyleSheet()

    # Custom typography
    name_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        alignment=1,  # Center
        textColor=colors.HexColor('#0F172A')
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        alignment=1,  # Center
        textColor=colors.HexColor('#334155')
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=5,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#1E293B')
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor('#1E293B'),
        leftIndent=12,
        firstLineIndent=-8
    )

    def add_section_header(title):
        story.append(Spacer(1, 4))
        story.append(Paragraph(title.upper(), section_heading_style))
        story.append(HRFlowable(width='100%', thickness=0.75, color=colors.HexColor('#94A3B8'), spaceBefore=1, spaceAfter=4))

    # 1. Header
    story.append(Paragraph('HARSH TIWARI', name_style))
    story.append(Spacer(1, 2))
    contact_text = 'mt63767199@gmail.com &nbsp;|&nbsp; +91 63772 26860 &nbsp;|&nbsp; Jaipur, Rajasthan &nbsp;|&nbsp; <a href="https://www.linkedin.com/in/harsh-tiwari-127192329" color="#0284C7"><u>LinkedIn</u></a> &nbsp;|&nbsp; <a href="https://github.com/harsh12067" color="#0284C7"><u>GitHub</u></a>'
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))

    # 2. Summary
    add_section_header('Summary')
    summary_text = 'Second-year Electronics &amp; Communication Engineering student at Arya College of Engineering &amp; IT, Jaipur, with a focus on full-stack web development. Completed a 3-month AI/vibe-coding internship and built multiple personal projects spanning frontend, backend, and applied AI tooling. Strong foundation in DSA and actively building production-style projects to develop as a full-stack developer.'
    story.append(Paragraph(summary_text, body_style))

    # 3. Skills
    add_section_header('Skills')
    skills_data = [
        ('Languages:', 'Python, JavaScript, C, C++'),
        ('Web Development:', 'HTML, CSS, React.js, Node.js, Express.js, MongoDB (MERN Stack)'),
        ('Core CS:', 'Data Structures &amp; Algorithms, OOP, DBMS basics'),
        ('AI Tools:', 'Claude AI, Cursor, AI-assisted (\'vibe\') coding workflows'),
        ('Tools &amp; Platforms:', 'Git, GitHub, VS Code, Postman')
    ]
    for label, val in skills_data:
        story.append(Paragraph(f'<b>{label}</b> {val}', body_style))
        story.append(Spacer(1, 1))

    # 4. Experience
    add_section_header('Experience')
    exp_header_table = Table(
        [
            [
                Paragraph('<b>AI – Vibe Coding Intern – Vishvena Techno Solutions Pvt. Ltd.</b>', body_style),
                Paragraph('<font color="#475569"><i>Dec 2025 – Mar 2026</i></font>', ParagraphStyle('R1', parent=body_style, alignment=2))
            ],
            [
                Paragraph('<i>Artificial Intelligence Internship Program</i>', ParagraphStyle('Sub', parent=body_style, textColor=colors.HexColor('#475569'))),
                Paragraph('<font color="#475569"><i>Hyderabad, Telangana (Remote)</i></font>', ParagraphStyle('R2', parent=body_style, alignment=2))
            ]
        ],
        colWidths=[380, 160]
    )
    exp_header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(exp_header_table)
    story.append(Spacer(1, 2))
    story.append(Paragraph('&bull; &nbsp;Completed a 3-month internship applying AI concepts and AI-assisted (\'vibe coding\') development practices to real coding tasks', bullet_style))
    story.append(Paragraph('&bull; &nbsp;Used AI tools such as Claude and Cursor to accelerate development workflows, debug code, and prototype features faster', bullet_style))
    story.append(Paragraph('&bull; &nbsp;Consistently delivered assigned tasks on schedule, earning a certificate of completion for strong learning ability and dedication', bullet_style))

    # 5. Projects
    add_section_header('Projects')
    # SkillSwap
    story.append(Table([[Paragraph('<b>SkillsSwap</b>', body_style), Paragraph('<font color="#475569">2025</font>', ParagraphStyle('PDate', parent=body_style, alignment=2))]], colWidths=[440, 100], style=[('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(Paragraph('&bull; &nbsp;Built a peer-to-peer platform where students teach each other paid courses from other platforms for free, in exchange for teaching a skill of their own', bullet_style))
    story.append(Paragraph('&bull; &nbsp;Built end-to-end with the MERN stack, including user profiles, skill listings, and a matching system to connect learners with teachers', bullet_style))
    story.append(Spacer(1, 2))

    # Portfolio
    story.append(Table([[Paragraph('<b>Portfolio Website</b>', body_style), Paragraph('<font color="#475569">2025</font>', ParagraphStyle('PDate2', parent=body_style, alignment=2))]], colWidths=[440, 100], style=[('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(Paragraph('&bull; &nbsp;Built and deployed a personal portfolio website to showcase projects, skills, and resume using HTML, CSS, and JavaScript/React', bullet_style))
    story.append(Paragraph('&bull; &nbsp;Focused on clean, responsive UI and fast load times across desktop and mobile', bullet_style))
    story.append(Spacer(1, 2))

    # To-Do App
    story.append(Table([[Paragraph('<b>To-Do App with Local Storage</b>', body_style), Paragraph('<font color="#475569">2025</font>', ParagraphStyle('PDate3', parent=body_style, alignment=2))]], colWidths=[440, 100], style=[('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(Paragraph('&bull; &nbsp;Built a task-management app that persists data using browser local storage, with add/edit/delete and completion tracking', bullet_style))

    # 6. Certifications
    add_section_header('Certifications')
    certs = [
        ('<b>MERN Full Stack</b> &mdash; Unstop', '2025'),
        ('<b>Claude 101</b> &mdash; Anthropic Education', 'Jun 2026'),
        ('<b>C &amp; C++ Programming Language</b> &mdash; Itronix Solutions', 'Sep 2025'),
        ('<b>Learn to Build a To-Do App with Local Storage</b> &mdash; SkillEcted', 'Oct 2025'),
        ('<b>Navachar &mdash; CodeFest 2025 (Participation)</b> &mdash; E-Cell MIT Meerut', 'Sep 2025'),
    ]
    for c_title, c_date in certs:
        c_table = Table([[Paragraph(c_title, body_style), Paragraph(f'<font color="#475569">{c_date}</font>', ParagraphStyle('CDate', parent=body_style, alignment=2))]], colWidths=[440, 100])
        c_table.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
        story.append(c_table)

    # 7. Education
    add_section_header('Education')
    edu_table = Table(
        [
            [
                Paragraph('<b>B.Tech in Electronics &amp; Communication Engineering</b>', body_style),
                Paragraph('<font color="#475569">2024 &ndash; 2028 (Expected)</font>', ParagraphStyle('EDate', parent=body_style, alignment=2))
            ],
            [
                Paragraph('<i>Arya College of Engineering &amp; IT</i>', ParagraphStyle('ESub', parent=body_style, textColor=colors.HexColor('#475569'))),
                Paragraph('<font color="#475569"><i>Jaipur, Rajasthan</i></font>', ParagraphStyle('ELoc', parent=body_style, alignment=2))
            ]
        ],
        colWidths=[380, 160]
    )
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu_table)

    # Build PDF
    doc.build(story)
    print('Vector PDF generated cleanly!')

    # Convert to 300 DPI high-res JPG and PNG for web previews
    doc_pdf = fitz.open(pdf_path)
    page = doc_pdf[0]
    pix = page.get_pixmap(dpi=300)
    pix.save('./public/resume.png')
    pix.save('./public/resume.jpg')
    print('Vector PDF rendered to 300 DPI PNG and JPG!')

if __name__ == '__main__':
    generate_resume()
