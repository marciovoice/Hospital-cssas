import os
import math
import subprocess
import shutil

FRAMES_DIR = "/tmp/video_frames"
os.makedirs(FRAMES_DIR, exist_ok=True)

TOTAL_FRAMES = 180  # 6 seconds at 30 fps
FPS = 30
WIDTH = 1280
HEIGHT = 720

# Ayurvedic nodes
NODES = [
    {"label": "TRIDOSHA", "sub": "Tri-Doshas", "base_x": 0.5, "base_y": 0.16, "color": "#f6d365"},
    {"label": "VATA", "sub": "Air & Space", "base_x": 0.22, "base_y": 0.30, "color": "#ffd269"},
    {"label": "PITTA", "sub": "Fire & Energy", "base_x": 0.36, "base_y": 0.44, "color": "#ff9a3c"},
    {"label": "KAPHA", "sub": "Earth & Water", "base_x": 0.78, "base_y": 0.65, "color": "#b8e994"},
    {"label": "PRAKRITI", "sub": "Inborn Nature", "base_x": 0.48, "base_y": 0.70, "color": "#f9ca24"},
    {"label": "AGNI", "sub": "Metabolic Fire", "base_x": 0.68, "base_y": 0.28, "color": "#e056fd"},
    {"label": "AHARA", "sub": "Sacred Diet", "base_x": 0.18, "base_y": 0.60, "color": "#f6e58d"},
    {"label": "RASAYANA", "sub": "Longevity", "base_x": 0.38, "base_y": 0.84, "color": "#686de0"},
]

def generate_svg(frame_idx):
    progress = frame_idx / (TOTAL_FRAMES - 1)
    
    # Motion curve:
    # 0.00 - 0.15: Book closed, subtle shimmer & embers
    # 0.15 - 0.45: Book unlatches, opens wide, pages fan out into 3D space
    # 0.45 - 0.65: Full floating constellation of Ayurvedic knowledge (pages & nodes)
    # 0.65 - 0.88: Pages fold back in, golden streams converge
    # 0.88 - 1.00: Book snaps closed, final resting stillness
    
    if progress < 0.15:
        open_factor = 0.0
        glow_factor = progress / 0.15
    elif progress < 0.45:
        t = (progress - 0.15) / 0.30
        open_factor = math.sin(t * math.pi / 2)
        glow_factor = 1.0
    elif progress < 0.65:
        open_factor = 1.0
        glow_factor = 1.0
    elif progress < 0.88:
        t = (progress - 0.65) / 0.23
        open_factor = 1.0 - math.sin(t * math.pi / 2)
        glow_factor = 1.0 - t * 0.3
    else:
        open_factor = 0.0
        glow_factor = 0.7 - ((progress - 0.88) / 0.12) * 0.4

    # Background stars/embers
    embers_svg = []
    for i in range(40):
        seed = (i * 97 + frame_idx * 1.5) % 1000 / 1000.0
        ex = (math.sin(i * 12.3 + frame_idx * 0.03) * 0.45 + 0.5) * WIDTH
        ey = ((i * 37 + frame_idx * 1.2) % HEIGHT)
        er = 1.0 + (i % 3) * 0.8
        eop = (math.sin(frame_idx * 0.1 + i) * 0.3 + 0.5) * 0.8
        embers_svg.append(f'<circle cx="{ex:.1f}" cy="{ey:.1f}" r="{er:.1f}" fill="#ffd700" opacity="{eop:.2f}" filter="url(#emberGlow)"/>')

    # Connecting lines & nodes
    nodes_svg = []
    lines_svg = []
    center_x = WIDTH * 0.5
    center_y = HEIGHT * 0.5

    if open_factor > 0.05:
        for i, node in enumerate(NODES):
            # Target expanded coordinates
            tx = node["base_x"] * WIDTH
            ty = node["base_y"] * HEIGHT
            # Interpolated from center book
            nx = center_x + (tx - center_x) * open_factor
            ny = center_y + (ty - center_y) * open_factor
            
            node_alpha = min(1.0, max(0.0, (open_factor - 0.1) / 0.7))
            
            # Line from book spine/center to node
            lines_svg.append(
                f'<line x1="{center_x:.1f}" y1="{center_y:.1f}" x2="{nx:.1f}" y2="{ny:.1f}" '
                f'stroke="#d4af37" stroke-width="1.2" stroke-dasharray="3,3" opacity="{node_alpha * 0.6:.2f}" />'
            )
            
            # Node badge/card
            badge_w = 110
            badge_h = 28
            bx = nx - badge_w / 2
            by = ny - badge_h / 2
            
            pulse = math.sin(frame_idx * 0.15 + i * 1.2) * 2
            
            nodes_svg.append(f'''
            <g opacity="{node_alpha:.2f}">
                <rect x="{bx:.1f}" y="{by:.1f}" width="{badge_w}" height="{badge_h}" rx="6" 
                      fill="#1a120b" stroke="#e6ca65" stroke-width="1.2" opacity="0.9" filter="url(#cardShadow)"/>
                <circle cx="{nx - 42:.1f}" cy="{ny:.1f}" r="{4 + pulse * 0.3:.1f}" fill="#ffd700" filter="url(#nodeGlow)"/>
                <text x="{nx - 28:.1f}" y="{ny + 4:.1f}" font-family="Cinzel, Georgia, serif" font-size="12" font-weight="bold" fill="#ffffff" letter-spacing="1.5">{node["label"]}</text>
            </g>
            ''')

    # Book Rendering:
    # If open_factor == 0: Closed book centered
    # If open_factor > 0: Left cover swings left, Right cover / pages unfold in 3D
    book_w = 260
    book_h = 360
    
    # Left cover position
    left_angle = open_factor * 75  # degrees
    left_x_offset = -open_factor * 130
    
    # Right cover / pages fan
    right_x_offset = open_factor * 130

    # Book Cover Art
    book_svg = []
    
    if open_factor < 0.95:
        # Front cover (visible when closed or opening)
        cover_opacity = 1.0 - open_factor * 0.7
        bx = center_x - book_w / 2 + left_x_offset
        by = center_y - book_h / 2
        
        # Ornate leather gradient
        book_svg.append(f'''
        <g transform="translate({bx:.1f}, {by:.1f}) rotate({-open_factor * 12:.1f} 0 {book_h/2})" opacity="{cover_opacity:.2f}">
            <!-- Leather base -->
            <rect x="0" y="0" width="{book_w}" height="{book_h}" rx="12" fill="url(#leatherGrad)" stroke="#5a3d1c" stroke-width="3" filter="url(#bookShadow)"/>
            <!-- Ornate Golden Borders -->
            <rect x="14" y="14" width="{book_w - 28}" height="{book_h - 28}" rx="8" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" opacity="0.9"/>
            <rect x="22" y="22" width="{book_w - 44}" height="{book_h - 44}" rx="6" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="4,2" opacity="0.7"/>
            
            <!-- Corner ornaments -->
            <path d="M 18 36 L 18 18 L 36 18" fill="none" stroke="#ffd700" stroke-width="3"/>
            <path d="M {book_w - 18} 36 L {book_w - 18} 18 L {book_w - 36} 18" fill="none" stroke="#ffd700" stroke-width="3"/>
            <path d="M 18 {book_h - 36} L 18 {book_h - 18} L 36 {book_h - 18}" fill="none" stroke="#ffd700" stroke-width="3"/>
            <path d="M {book_w - 18} {book_h - 36} L {book_w - 18} {book_h - 18} L {book_w - 36} {book_h - 18}" fill="none" stroke="#ffd700" stroke-width="3"/>

            <!-- Central Mandala / Emblem -->
            <circle cx="{book_w/2}" cy="{book_h/2 - 25}" r="54" fill="#3a2512" stroke="url(#goldGrad)" stroke-width="2"/>
            <circle cx="{book_w/2}" cy="{book_h/2 - 25}" r="46" fill="none" stroke="#ffd700" stroke-width="1" stroke-dasharray="6,3" opacity="0.8"/>
            <polygon points="{book_w/2},{book_h/2-65} {book_w/2+35},{book_h/2-25} {book_w/2},{book_h/2+15} {book_w/2-35},{book_h/2-25}" fill="none" stroke="#ffd700" stroke-width="1.5" opacity="0.8"/>
            <polygon points="{book_w/2},{book_h/2-15} {book_w/2+35},{book_h/2-25} {book_w/2},{book_h/2-35} {book_w/2-35},{book_h/2-25}" fill="none" stroke="#e6ca65" stroke-width="1.5" opacity="0.8"/>

            <!-- Sanskrit Title -->
            <text x="{book_w/2}" y="{book_h/2 - 40}" font-family="Noto Serif Devanagari, Georgia, serif" font-size="12" fill="#e8c374" text-anchor="middle" letter-spacing="2">मूलग्रन्थः</text>
            <text x="{book_w/2}" y="{book_h/2 - 12}" font-family="Noto Serif Devanagari, Georgia, serif" font-size="28" font-weight="bold" fill="#fff2b2" text-anchor="middle" filter="url(#goldTextGlow)">चरक</text>
            <text x="{book_w/2}" y="{book_h/2 + 24}" font-family="Noto Serif Devanagari, Georgia, serif" font-size="28" font-weight="bold" fill="#fff2b2" text-anchor="middle" filter="url(#goldTextGlow)">संहिता</text>
            
            <text x="{book_w/2}" y="{book_h/2 + 65}" font-family="Noto Serif Devanagari, Georgia, serif" font-size="11" fill="#dfb76c" text-anchor="middle">महर्षि चरक प्रणीत</text>
            <text x="{book_w/2}" y="{book_h/2 + 105}" font-family="Cinzel, Georgia, serif" font-size="10" fill="#cca659" text-anchor="middle" letter-spacing="3">CHARAKA SAMHITA</text>

            <!-- Book Clasp / Lock -->
            <rect x="{book_w - 6}" y="{book_h/2 - 20}" width="22" height="40" rx="4" fill="url(#goldGrad)" stroke="#6a4718" stroke-width="1.5" filter="url(#claspShadow)"/>
            <circle cx="{book_w + 5}" cy="{book_h/2}" r="5" fill="#301f0d" stroke="#ffe082" stroke-width="1"/>
        </g>
        ''')

    # Unfolded Sanskrit Manuscript Pages (Visible when opened)
    pages_svg = []
    if open_factor > 0.05:
        # Render layered floating parchment sheets
        for page_idx in range(5):
            poff = (page_idx - 2) * 18 * open_factor
            prot = (page_idx - 2) * 6 * open_factor
            pw = 230
            ph = 320
            px = center_x - pw/2 + poff * 1.5
            py = center_y - ph/2 - (page_idx % 2) * 15 * open_factor
            popac = min(1.0, open_factor * 1.2) * (0.7 + (page_idx == 2) * 0.3)
            
            pages_svg.append(f'''
            <g transform="translate({px:.1f}, {py:.1f}) rotate({prot:.1f} {pw/2} {ph/2})" opacity="{popac:.2f}">
                <rect x="0" y="0" width="{pw}" height="{ph}" rx="6" fill="url(#parchmentGrad)" stroke="#c4a060" stroke-width="1" filter="url(#pageShadow)"/>
                <!-- Page border line -->
                <rect x="12" y="12" width="{pw-24}" height="{ph-24}" fill="none" stroke="#cbb282" stroke-width="0.8" opacity="0.6"/>
                
                <!-- Sanskrit Script lines -->
                <line x1="24" y1="36" x2="{pw-24}" y2="36" stroke="#5a3d1c" stroke-width="2.5" opacity="0.75"/>
                <line x1="24" y1="52" x2="{pw-24}" y2="52" stroke="#6b4c27" stroke-width="1.8" opacity="0.65"/>
                <line x1="24" y1="66" x2="{pw-40}" y2="66" stroke="#6b4c27" stroke-width="1.8" opacity="0.65"/>
                
                <!-- Central Ayurvedic Diagram Illustration -->
                <circle cx="{pw/2}" cy="140" r="38" fill="none" stroke="#966d3b" stroke-width="1.2" stroke-dasharray="4,2"/>
                <circle cx="{pw/2}" cy="140" r="28" fill="none" stroke="#7a5528" stroke-width="1"/>
                <path d="M {pw/2} 110 L {pw/2} 170 M {pw/2-30} 140 L {pw/2+30} 140" stroke="#966d3b" stroke-width="0.8"/>
                <text x="{pw/2}" y="144" font-family="Noto Serif Devanagari, serif" font-size="12" font-weight="bold" fill="#4a2e10" text-anchor="middle">आयुर्वेद</text>
                
                <!-- Lower scripture verses -->
                <line x1="24" y1="205" x2="{pw-24}" y2="205" stroke="#6b4c27" stroke-width="1.5" opacity="0.6"/>
                <line x1="24" y1="220" x2="{pw-24}" y2="220" stroke="#6b4c27" stroke-width="1.5" opacity="0.6"/>
                <line x1="24" y1="235" x2="{pw-30}" y2="235" stroke="#6b4c27" stroke-width="1.5" opacity="0.6"/>
                <line x1="24" y1="250" x2="{pw-24}" y2="250" stroke="#6b4c27" stroke-width="1.5" opacity="0.6"/>
                <line x1="24" y1="265" x2="{pw-50}" y2="265" stroke="#6b4c27" stroke-width="1.5" opacity="0.6"/>

                <text x="{pw/2}" y="295" font-family="Cinzel, Georgia, serif" font-size="8" fill="#84633b" text-anchor="middle" letter-spacing="2">॥ सूत्रस्थानम् ॥</text>
            </g>
            ''')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" width="{WIDTH}" height="{HEIGHT}">
    <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="#1f140b"/>
            <stop offset="50%" stop-color="#0e0a07"/>
            <stop offset="100%" stop-color="#050302"/>
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f5c767" stop-opacity="{0.35 * glow_factor:.2f}"/>
            <stop offset="50%" stop-color="#c88b2c" stop-opacity="{0.15 * glow_factor:.2f}"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3d2714"/>
            <stop offset="35%" stop-color="#4a301a"/>
            <stop offset="70%" stop-color="#2c1a0c"/>
            <stop offset="100%" stop-color="#190e06"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffeaa7"/>
            <stop offset="30%" stop-color="#fdcb6e"/>
            <stop offset="70%" stop-color="#d4af37"/>
            <stop offset="100%" stop-color="#8b6508"/>
        </linearGradient>
        <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f7ebd2"/>
            <stop offset="50%" stop-color="#ebd5af"/>
            <stop offset="100%" stop-color="#dac094"/>
        </linearGradient>
        <filter id="emberGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="goldTextGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
            <feOffset in="blur" dx="0" dy="1" result="offset"/>
            <feFlood flood-color="#ffd700" flood-opacity="0.6" result="color"/>
            <feComposite in="color" in2="offset" operator="in" result="glow"/>
            <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="bookShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="15" stdDeviation="25" flood-color="#000000" flood-opacity="0.8"/>
        </filter>
        <filter id="pageShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <filter id="claspShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.7"/>
        </filter>
    </defs>

    <!-- Deep Ambient Background -->
    <rect width="{WIDTH}" height="{HEIGHT}" fill="url(#bgGrad)"/>
    <rect width="{WIDTH}" height="{HEIGHT}" fill="url(#centerGlow)"/>

    <!-- Floating Embers -->
    {''.join(embers_svg)}

    <!-- Constellation connecting lines -->
    {''.join(lines_svg)}

    <!-- Pages (when open) -->
    {''.join(pages_svg)}

    <!-- Book (Cover) -->
    {''.join(book_svg)}

    <!-- Knowledge Concept Nodes -->
    {''.join(nodes_svg)}
</svg>'''
    return svg_content

print("Rendering SVG frames...")
for f in range(TOTAL_FRAMES):
    svg = generate_svg(f)
    frame_path = os.path.join(FRAMES_DIR, f"frame_{f:04d}.svg")
    with open(frame_path, "w") as fp:
        fp.write(svg)

print(f"Generated {TOTAL_FRAMES} SVG frames. Converting to ultra-smooth MP4 with ffmpeg...")

# Encode to intra-frame MP4 (-g 1 allows instant scrub seeking at 60fps)
output_mp4 = "./public/hero-video.mp4"
output_mp4_alt = "./public/charak-samhita.mp4"

# Also render poster frame (first frame and middle frame)
cmd_poster = [
    "ffmpeg", "-y", "-i", os.path.join(FRAMES_DIR, "frame_0000.svg"),
    "-vf", "scale=1280:720", "./public/poster.jpg"
]
subprocess.run(cmd_poster, check=True)

cmd_video = [
    "ffmpeg", "-y",
    "-framerate", str(FPS),
    "-i", os.path.join(FRAMES_DIR, "frame_%04d.svg"),
    "-c:v", "libx264",
    "-g", "1",  # Keyframe every single frame for ultra-fast instant scrubbing
    "-keyint_min", "1",
    "-pix_fmt", "yuv420p",
    "-profile:v", "high",
    "-level", "4.2",
    "-crf", "18",
    "-movflags", "+faststart",
    output_mp4
]

subprocess.run(cmd_video, check=True)
shutil.copy(output_mp4, output_mp4_alt)

print("Video generation completed successfully!")
