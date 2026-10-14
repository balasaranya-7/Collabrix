/**
 * Deterministic local SVG fallback generator for creators and portfolios.
 * Guarantees that even if any network request fails or an image is missing,
 * the UI will NEVER display a broken image icon or reuse the same image.
 */

export function getFallbackAvatar(name: string = 'AI Creator'): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AC';

  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hues = [
    { accent: '#B07878', sec: '#E6C2BF', bg: '#1A1515' },
    { accent: '#C48B71', sec: '#F3D5C5', bg: '#16131A' },
    { accent: '#D49B9B', sec: '#F9EBE5', bg: '#1F1517' },
    { accent: '#9E7287', sec: '#D8BACB', bg: '#14141A' },
    { accent: '#B87D7D', sec: '#ECD0CF', bg: '#1A1615' },
    { accent: '#BC8A8A', sec: '#F0DCDC', bg: '#171617' },
  ];
  const theme = hues[hash % hues.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <defs>
      <radialGradient id="g" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${theme.sec}" stop-opacity="0.3"/>
        <stop offset="70%" stop-color="${theme.bg}"/>
        <stop offset="100%" stop-color="#000000"/>
      </radialGradient>
    </defs>
    <rect width="200" height="200" fill="url(#g)"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-opacity="0.6"/>
    <circle cx="100" cy="100" r="70" fill="#141010" stroke="${theme.sec}" stroke-width="1.5" stroke-opacity="0.8"/>
    <text x="100" y="112" font-family="'Playfair Display', Georgia, serif" font-size="42" font-weight="bold" font-style="italic" fill="${theme.sec}" text-anchor="middle">
      ${initials}
    </text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getFallbackPortfolio(title: string = 'AI Creation', category: string = 'Generative Media'): string {
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hues = [
    { accent: '#B07878', sec: '#E6C2BF', bg: '#1A1515' },
    { accent: '#C48B71', sec: '#F3D5C5', bg: '#16131A' },
    { accent: '#D49B9B', sec: '#F9EBE5', bg: '#1F1517' },
    { accent: '#9E7287', sec: '#D8BACB', bg: '#14141A' },
    { accent: '#B87D7D', sec: '#ECD0CF', bg: '#1A1615' },
    { accent: '#BC8A8A', sec: '#F0DCDC', bg: '#171617' },
  ];
  const theme = hues[hash % hues.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <radialGradient id="gp" cx="40%" cy="40%" r="80%">
        <stop offset="0%" stop-color="${theme.sec}" stop-opacity="0.2"/>
        <stop offset="50%" stop-color="${theme.accent}" stop-opacity="0.3"/>
        <stop offset="80%" stop-color="${theme.bg}"/>
        <stop offset="100%" stop-color="#000000"/>
      </radialGradient>
    </defs>
    <rect width="800" height="500" fill="url(#gp)"/>
    <rect x="20" y="20" width="760" height="460" rx="12" fill="none" stroke="${theme.accent}" stroke-width="1.5" stroke-opacity="0.3"/>
    <circle cx="400" cy="220" r="90" fill="#0D0A0A" stroke="${theme.sec}" stroke-width="2"/>
    <text x="400" y="228" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="bold" font-style="italic" fill="${theme.sec}" text-anchor="middle">
      COLLABRIX
    </text>
    <rect x="250" y="360" width="300" height="40" rx="20" fill="#1A1515" stroke="${theme.accent}" stroke-width="1"/>
    <text x="400" y="385" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="${theme.sec}" text-anchor="middle" letter-spacing="1">
      ${category.toUpperCase()}
    </text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
