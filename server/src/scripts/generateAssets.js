import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../../../client/public');
const creatorsDir = path.join(publicDir, 'assets/creators');
const portfoliosDir = path.join(publicDir, 'assets/portfolios');

if (!fs.existsSync(creatorsDir)) {
  fs.mkdirSync(creatorsDir, { recursive: true });
}
if (!fs.existsSync(portfoliosDir)) {
  fs.mkdirSync(portfoliosDir, { recursive: true });
}

// 35 Creator definitions with distinct personalities, color accents, and styles
export const creatorDefinitions = [
  {
    id: 1,
    name: 'Priya Sharma',
    handle: 'priya_ai_cinema',
    initials: 'PS',
    specialization: 'AI Filmmaking',
    accent: '#B07878',
    secondary: '#E6C2BF',
    bg: '#1A1515',
    iconType: 'camera',
    location: 'Bengaluru, India',
    startingPrice: 35000,
    tools: ['Runway Gen-3 Alpha', 'Flux.1 Schnell', 'ComfyUI', 'Topaz Video AI'],
    skills: ['Temporal Consistency Control', 'Custom LoRA Training', 'Camera Motion Physics'],
    bio: 'Specializing in hyper-realistic AI filmmaking, commercial narrative ads, and cinematic camera choreography with temporal consistency.',
    portfolioThemes: [
      { title: 'Celestial Noir — Luxury Watch AI Commercial', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Luxury Timepiece' },
      { title: 'Monsoon Whispers — Poetic Narrative Short', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Narrative Film' },
      { title: 'Botanical Elixir — Organic Skincare Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Organic Beauty' }
    ]
  },
  {
    id: 2,
    name: 'Aarav Mehta',
    handle: 'aarav_motion_lab',
    initials: 'AM',
    specialization: 'AI Animation',
    accent: '#C48B71',
    secondary: '#F3D5C5',
    bg: '#16131A',
    iconType: 'motion',
    location: 'Mumbai, India',
    startingPrice: 30000,
    tools: ['ComfyUI', 'Kling AI 1.5', 'ControlNet', 'AnimateDiff'],
    skills: ['ControlNet Motion Transfer', 'Multi-Layer Compositing', 'Audio-Reactive Beats'],
    bio: 'Generative animator and visual director merging ComfyUI node logic with kinetic 3D pipelines.',
    portfolioThemes: [
      { title: 'Neo-Tokyo Cyber Ronin Animation', cat: 'AI Animation', ratio: '16:9', tag: 'Stylized 3D' },
      { title: 'Sonic Prism — Audio-Reactive Key Visual', cat: 'AI Motion Graphics', ratio: '16:9', tag: 'Kinetic Sound' },
      { title: 'Chrono Bloom — Botanical Kinetic Reel', cat: 'Generative Video', ratio: '9:16', tag: 'Organic Motion' }
    ]
  },
  {
    id: 3,
    name: 'Elena Rostova',
    handle: 'elena_haute_ai',
    initials: 'ER',
    specialization: 'AI Fashion Visuals',
    accent: '#D49B9B',
    secondary: '#F9EBE5',
    bg: '#1F1517',
    iconType: 'fashion',
    location: 'Paris, France',
    startingPrice: 45000,
    tools: ['Flux.1 Dev', 'Midjourney v6.1', 'Magnific AI', 'Photoshop GenFill'],
    skills: ['Haute Couture Fabric Physics', 'Virtual Fashion Models', 'Macro Texture Synthesis'],
    bio: 'Editorial fashion photographer turned generative artist crafting digital haute couture lookbooks and virtual runway shows.',
    portfolioThemes: [
      { title: 'Elysian Velvet — Fall Winter Haute Couture', cat: 'AI Fashion Visuals', ratio: '4:5', tag: 'Editorial Fashion' },
      { title: 'Solaris Lumina — High Jewelry Campaign', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Diamond Macro' },
      { title: 'Aura Metamorphosis — Digital Muse Reel', cat: 'Generative Video', ratio: '9:16', tag: 'Virtual Model' }
    ]
  },
  {
    id: 4,
    name: 'Marcus Vance',
    handle: 'marcus_vfx_pro',
    initials: 'MV',
    specialization: 'AI Visual Effects',
    accent: '#9E7287',
    secondary: '#D8BACB',
    bg: '#14141A',
    iconType: 'vfx',
    location: 'London, UK',
    startingPrice: 50000,
    tools: ['Nuke AI', 'Runway Gen-3', 'EbSynth', 'ComfyUI Depth'],
    skills: ['Fluid Simulation Replacement', 'Neural Matte Extraction', 'Temporal Inpainting'],
    bio: 'Senior VFX director applying deep generative models for film post-production, neural plate cleans, and sci-fi atmosphere creation.',
    portfolioThemes: [
      { title: 'Obsidian Citadel — Dark Fantasy Keyframe', cat: 'AI Concept Art', ratio: '16:9', tag: 'Dark Fantasy' },
      { title: 'Project Nebula — Quantum Warp Sequence', cat: 'AI Visual Effects', ratio: '16:9', tag: 'Space VFX' },
      { title: 'Solar Biosphere — Terraformed Habitat', cat: 'AI Concept Art', ratio: '16:9', tag: 'Sci-Fi World' }
    ]
  },
  {
    id: 5,
    name: 'Diya Patel',
    handle: 'diya_product_studio',
    initials: 'DP',
    specialization: 'AI Product Advertising',
    accent: '#B87D7D',
    secondary: '#ECD0CF',
    bg: '#1A1615',
    iconType: 'product',
    location: 'Ahmedabad, India',
    startingPrice: 28000,
    tools: ['Flux.1', 'ControlNet', 'Luma Dream Machine', 'Topaz 4K'],
    skills: ['Packaging Geometry Locking', 'Liquid Dynamic Renders', 'Studio Lighting Calibration'],
    bio: 'Commercial product visualization specialist creating photorealistic beverage, cosmetic, and tech gadget launch commercials.',
    portfolioThemes: [
      { title: 'Origins of Espresso — Artisanal Coffee Film', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Artisanal Beverage' },
      { title: 'Hydro Pure — Electrolyte Spark Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Liquid Splash' },
      { title: 'Velocity Apex — Carbon Fiber Sneaker', cat: 'AI Product Advertising', ratio: '4:5', tag: 'Footwear CGI' }
    ]
  },
  {
    id: 6,
    name: 'Kai Takahashi',
    handle: 'kai_anime_lab',
    initials: 'KT',
    specialization: 'AI Character Design',
    accent: '#A3687E',
    secondary: '#DFBBC9',
    bg: '#181216',
    iconType: 'character',
    location: 'Tokyo, Japan',
    startingPrice: 32000,
    tools: ['Niji v6', 'ComfyUI LoRA', 'ControlNet Tile', 'AnimateDiff'],
    skills: ['Shinkai Style Backgrounds', 'Character Orthographics', 'Facial Expression Control'],
    bio: 'Anime concept artist crafting consistent IP characters, game key art, and lush cinematic background paintings.',
    portfolioThemes: [
      { title: 'Azure Solitude — Shinkai Style Panorama', cat: 'AI Concept Art', ratio: '16:9', tag: 'Anime Vista' },
      { title: 'Cyber Kitsune — Character Concept Sheet', cat: 'AI Character Design', ratio: '4:5', tag: 'IP Design' },
      { title: 'Echoes of the Shrine — Ambient AI Short', cat: 'AI Animation', ratio: '16:9', tag: 'Lofi Aesthetic' }
    ]
  },
  {
    id: 7,
    name: 'Sofia Chen',
    handle: 'sofia_spatial_ai',
    initials: 'SC',
    specialization: 'AI Architectural Visualization',
    accent: '#BC8A8A',
    secondary: '#F0DCDC',
    bg: '#171617',
    iconType: 'arch',
    location: 'Singapore',
    startingPrice: 40000,
    tools: ['Flux.1 Pro', 'Midjourney v6.1', 'ControlNet Canny', 'Magnific AI'],
    skills: ['Biophilic Interior Rendering', 'Lighting Study Simulation', 'Material Texture Fidelity'],
    bio: 'Architectural designer merging luxury physical space design with generative concept renderings for boutique real estate.',
    portfolioThemes: [
      { title: 'Villa Solarium — Biophilic Luxury Residence', cat: 'AI Architectural Visualization', ratio: '16:9', tag: 'Luxury Villa' },
      { title: 'The Bamboo Canopy — Eco-Resort Concept', cat: 'AI Architectural Visualization', ratio: '16:9', tag: 'Eco Architecture' },
      { title: 'Minimalist Sanctuary — Brutalist Glass House', cat: 'AI Architectural Visualization', ratio: '4:5', tag: 'Modern Interior' }
    ]
  },
  {
    id: 8,
    name: 'Mateo Morales',
    handle: 'mateo_sound_vision',
    initials: 'MM',
    specialization: 'AI Music Videos',
    accent: '#C2836E',
    secondary: '#E8C7BD',
    bg: '#1C1514',
    iconType: 'music',
    location: 'Barcelona, Spain',
    startingPrice: 38000,
    tools: ['Deforum SD', 'Runway Gen-3', 'Wav2Lip', 'Kling AI'],
    skills: ['BPM Beat Syncing', 'Psychedelic Camera Morphing', 'Audio-Visual Reactive LoRA'],
    bio: 'Music video director producing trippy audio-reactive visual journeys, live tour concert visuals, and album cover ecosystems.',
    portfolioThemes: [
      { title: 'Prismatic Hallucinations — Electronic EP Teaser', cat: 'AI Music Videos', ratio: '16:9', tag: 'Audio Reactive' },
      { title: 'Midnight Reverie — Lo-Fi Hip Hop Loop', cat: 'Generative Video', ratio: '9:16', tag: 'Lofi Animation' },
      { title: 'Subatomic Reverberation — Psytrance Stage Visual', cat: 'AI Music Videos', ratio: '16:9', tag: 'Concert Visual' }
    ]
  },
  {
    id: 9,
    name: 'Anya Volkova',
    handle: 'anya_digital_id',
    initials: 'AV',
    specialization: 'AI Brand Identity',
    accent: '#A87989',
    secondary: '#E5C9D3',
    bg: '#181418',
    iconType: 'brand',
    location: 'Berlin, Germany',
    startingPrice: 35000,
    tools: ['Flux.1', 'Midjourney v6.1', 'Vectorize AI', 'Illustrator'],
    skills: ['Synthetic Brand Worlds', 'Editorial Packaging Concepting', 'Virtual Influencer Persona'],
    bio: 'Creative brand strategist building comprehensive visual universes, dynamic brand assets, and virtual brand ambassadors.',
    portfolioThemes: [
      { title: 'Nova — Virtual AI FinTech Ambassador', cat: 'AI Character Design', ratio: '4:5', tag: 'Virtual Persona' },
      { title: 'Valkyrie of the Wastes — Brand Mascot', cat: 'AI Concept Art', ratio: '16:9', tag: 'Brand Universe' },
      { title: 'Pixel Glitch — Cyberpunk Streetwear Identity', cat: 'AI Brand Identity', ratio: '1:1', tag: 'Packaging Design' }
    ]
  },
  {
    id: 10,
    name: 'Rohan Kapoor',
    handle: 'rohan_cultural_tales',
    initials: 'RK',
    specialization: 'AI Storytelling',
    accent: '#B57C7C',
    secondary: '#EACCCC',
    bg: '#191515',
    iconType: 'story',
    location: 'Delhi, India',
    startingPrice: 30000,
    tools: ['Runway Gen-3', 'ElevenLabs', 'Flux.1', 'Suno AI'],
    skills: ['Historical Costume Fidelity', 'Emotional Narrative Pacing', 'AI Voice Acting Integration'],
    bio: 'Cultural documentarian bringing mythologies and historical sagas to life with emotional generative cinematography.',
    portfolioThemes: [
      { title: 'Silk Route Chronicles — Historical AI Doc', cat: 'AI Storytelling', ratio: '16:9', tag: 'Historical Saga' },
      { title: 'The Artisans of Varanasi — Heritage Reel', cat: 'AI Storytelling', ratio: '9:16', tag: 'Cultural Doc' },
      { title: 'Origins of Spice — Cinematic Teaser', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Heritage Ad' }
    ]
  },
  {
    id: 11,
    name: 'Chloe Dubois',
    handle: 'chloe_noir_cinema',
    initials: 'CD',
    specialization: 'Generative Video',
    accent: '#AD7171',
    secondary: '#E5BDBD',
    bg: '#171212',
    iconType: 'film',
    location: 'Montreal, Canada',
    startingPrice: 42000,
    tools: ['Luma Dream Machine', 'Runway Gen-3', 'Flux.1 Dev', 'DaVinci Resolve'],
    skills: ['Slow-Burn Lighting Pacing', 'Moody Shadow Mastery', 'Micro Texture Preservation'],
    bio: 'Cinematographer delivering moody, slow-motion commercial spots and atmospheric mood reels for luxury fragrance and spirits.',
    portfolioThemes: [
      { title: 'Verdant Botanical Gin — Launch Film', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Luxury Spirits' },
      { title: 'Aethelhorne Horology — Minimalist Watch Ad', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Minimal Timepiece' },
      { title: "L'Ombre Parfum — Atmospheric Fragrance Reel", cat: 'Generative Video', ratio: '9:16', tag: 'Velvet Perfume' }
    ]
  },
  {
    id: 12,
    name: 'Devon Reed',
    handle: 'devon_game_ai',
    initials: 'DR',
    specialization: 'AI Game Art',
    accent: '#9F7C8F',
    secondary: '#DFC6D4',
    bg: '#161317',
    iconType: 'game',
    location: 'Austin, USA',
    startingPrice: 36000,
    tools: ['Midjourney v6.1', 'ComfyUI 3D', 'Meshy AI', 'Unreal Engine 5'],
    skills: ['PBR Texture Generation', 'Game Asset Sheet Synthesis', 'Isometric World Design'],
    bio: 'Video game concept artist producing environment keyframes, item sprites, and stylized modular props.',
    portfolioThemes: [
      { title: 'Aetheria Chronicles — Fantasy RPG Environment', cat: 'AI Game Art', ratio: '16:9', tag: 'Game Environment' },
      { title: 'Cybernetic Relic Arsenal — Weapon Sheet', cat: 'AI Game Art', ratio: '1:1', tag: 'Weapon Assets' },
      { title: 'Forgotten Dungeon — Unreal Engine AI Skybox', cat: 'AI Concept Art', ratio: '16:9', tag: 'Skybox Panorama' }
    ]
  },
  {
    id: 13,
    name: 'Ananya Sen',
    handle: 'ananya_cinema_art',
    initials: 'AS',
    specialization: 'AI Filmmaking',
    accent: '#B87878',
    secondary: '#E8C2BF',
    bg: '#1A1414',
    iconType: 'camera',
    location: 'Kolkata, India',
    startingPrice: 34000,
    tools: ['Runway Gen-3', 'ComfyUI', 'Kling AI 1.5', 'ElevenLabs'],
    skills: ['Visual Poetry', 'Color Scripting', 'Indian Aesthetic Direction'],
    bio: 'Filmmaker crafting visual poetry and character-driven indie commercial ads with subtle emotional depth.',
    portfolioThemes: [
      { title: 'The Terrace Rain — Nostalgic AI Drama', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Cinematic Drama' },
      { title: 'Saffron Dusk — Artisanal Chai Campaign', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Heritage Beverage' },
      { title: 'Clay & River — Sculptor Portrait Film', cat: 'AI Storytelling', ratio: '16:9', tag: 'Artisan Documentary' }
    ]
  },
  {
    id: 14,
    name: 'Matteo Rossi',
    handle: 'matteo_rossi_film',
    initials: 'MR',
    specialization: 'Generative Video',
    accent: '#BA7A6F',
    secondary: '#ECC1B8',
    bg: '#191413',
    iconType: 'film',
    location: 'Milan, Italy',
    startingPrice: 42000,
    tools: ['Flux.1 Pro', 'Runway Gen-3 Alpha', 'Topaz AI', 'Adobe Premiere Pro'],
    skills: ['Italian Automotive Lighting', 'High-Speed Camera Simulation', 'Reflection Physics'],
    bio: 'Automotive and luxury lifestyle visualizer producing sleek sports car teasers and dynamic high-speed generative video.',
    portfolioThemes: [
      { title: 'Gran Turismo Elettrico — Hypercar Reveal', cat: 'Generative Video', ratio: '16:9', tag: 'Automotive CGI' },
      { title: 'Lake Como Dusk — Wooden Speedboat Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Luxury Lifestyle' },
      { title: 'Carbon Aerodynamics — Track Test Commercial', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Motorsport Film' }
    ]
  },
  {
    id: 15,
    name: 'Sunita Nair',
    handle: 'sunita_heritage_ai',
    initials: 'SN',
    specialization: 'AI Storytelling',
    accent: '#AF7474',
    secondary: '#E3BABA',
    bg: '#181313',
    iconType: 'story',
    location: 'Kochi, India',
    startingPrice: 29000,
    tools: ['Midjourney v6.1', 'Flux.1 Dev', 'ElevenLabs', 'Magnific AI'],
    skills: ['Botanical Illustrations', 'Folklore Adaptation', 'Warm Earthy Color Palettes'],
    bio: 'Folklore researcher and AI visual creator translating indigenous fables into lush generative storyboards and children book art.',
    portfolioThemes: [
      { title: 'Tales of the Silent Valley — Wildlife Fable', cat: 'AI Storytelling', ratio: '16:9', tag: 'Wildlife Story' },
      { title: 'The Spice Merchant Daughter — Animated Book', cat: 'AI Character Design', ratio: '4:5', tag: 'Character Art' },
      { title: 'Monsoon Lotus — Slow Ambient Reel', cat: 'Generative Video', ratio: '9:16', tag: 'Botanical Video' }
    ]
  },
  {
    id: 16,
    name: 'Carlos Mendez',
    handle: 'carlos_surreal_ai',
    initials: 'CM',
    specialization: 'AI Concept Art',
    accent: '#A66D82',
    secondary: '#E2BACB',
    bg: '#181216',
    iconType: 'concept',
    location: 'Mexico City, Mexico',
    startingPrice: 33000,
    tools: ['Midjourney v6.1', 'ComfyUI', 'Kling AI', 'Photoshop'],
    skills: ['Magical Realism', 'Vibrant Surreal Palette', 'Botanical Geometry'],
    bio: 'Pioneering magical realist AI art with kaleidoscopic botanicals, floating architecture, and dreamlike metaphors.',
    portfolioThemes: [
      { title: 'Floating Sanctuary of Oaxaca — Surreal Vista', cat: 'AI Concept Art', ratio: '16:9', tag: 'Magical Realism' },
      { title: 'Agave Luminescence — Tequila Spirits Visual', cat: 'AI Product Advertising', ratio: '4:5', tag: 'Artisanal Concept' },
      { title: 'The Dreaming Jaguar — Shamanic Short Reel', cat: 'AI Animation', ratio: '9:16', tag: 'Surreal Reel' }
    ]
  },
  {
    id: 17,
    name: 'Eun-ji Park',
    handle: 'eunji_kpop_visuals',
    initials: 'EP',
    specialization: 'AI Music Videos',
    accent: '#B8728A',
    secondary: '#E8BDCD',
    bg: '#1A1317',
    iconType: 'music',
    location: 'Seoul, South Korea',
    startingPrice: 44000,
    tools: ['ComfyUI AnimateDiff', 'Kling AI 1.5', 'Flux.1', 'Topaz AI'],
    skills: ['K-Pop Aesthetic Choreography', 'Hyper-Pop Color Grading', 'Motion LoRA Fusion'],
    bio: 'Creative director for idol music videos, holographic stage visuals, and dynamic high-energy social teasers.',
    portfolioThemes: [
      { title: 'Supernova Neon — K-Pop Title Sequence', cat: 'AI Music Videos', ratio: '16:9', tag: 'K-Pop Visual' },
      { title: 'Cherry Blossom Glitch — Vertical Dance Teaser', cat: 'AI Music Videos', ratio: '9:16', tag: 'Vertical Choreography' },
      { title: 'Cyber Hanbok — Futuristic Fashion Concept', cat: 'AI Fashion Visuals', ratio: '4:5', tag: 'Cyber Hanbok' }
    ]
  },
  {
    id: 18,
    name: 'Oliver Wright',
    handle: 'oliver_drone_ai',
    initials: 'OW',
    specialization: 'AI Filmmaking',
    accent: '#B07567',
    secondary: '#E4BCB1',
    bg: '#191412',
    iconType: 'camera',
    location: 'Melbourne, Australia',
    startingPrice: 36000,
    tools: ['Runway Gen-3', 'Luma Dream Machine', 'Flux.1', 'Davinci Resolve'],
    skills: ['Simulated FPV Drone Physics', 'Oceanic Fluid Realism', 'Aerial Golden Hour Lighting'],
    bio: 'Specialist in generative aerial cinematography, synthetic drone flyovers, and vast natural landscapes for tourism campaigns.',
    portfolioThemes: [
      { title: 'Great Barrier Reef Awakening — Aerial AI Film', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Aerial Ocean' },
      { title: 'Outback Solitude — 4K Red Sand Vista', cat: 'AI Concept Art', ratio: '16:9', tag: 'Desert Vista' },
      { title: 'Coastline Swell — Slow Motion Surf Reel', cat: 'Generative Video', ratio: '9:16', tag: 'Coastal Drone' }
    ]
  },
  {
    id: 19,
    name: 'Nisha Pillai',
    handle: 'nisha_motion_craft',
    initials: 'NP',
    specialization: 'AI Animation',
    accent: '#B27676',
    secondary: '#E5C0C0',
    bg: '#191313',
    iconType: 'motion',
    location: 'Chennai, India',
    startingPrice: 31000,
    tools: ['ComfyUI', 'ControlNet', 'AnimateDiff', 'After Effects'],
    skills: ['Traditional Kolam Geometry', 'Fluid Ink Simulation', 'Looping Micro-Animations'],
    bio: 'Motion designer integrating traditional Indian geometric motifs with generative fluid dynamics for app onboarding and tech brands.',
    portfolioThemes: [
      { title: 'Mandala In Motion — Generative Title Sequence', cat: 'AI Animation', ratio: '16:9', tag: 'Geometric Motion' },
      { title: 'Liquid Gold Tea — Beverage Brand Kinetic Ad', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Beverage Animation' },
      { title: 'Temple Bells — Audio Reactive Ambient Loop', cat: 'AI Music Videos', ratio: '1:1', tag: 'Looping Art' }
    ]
  },
  {
    id: 20,
    name: 'Dmitri Ivanov',
    handle: 'dmitri_dark_cinema',
    initials: 'DI',
    specialization: 'AI Visual Effects',
    accent: '#9B7485',
    secondary: '#D6BDC8',
    bg: '#161316',
    iconType: 'vfx',
    location: 'Prague, Czechia',
    startingPrice: 48000,
    tools: ['ComfyUI LoRA', 'Runway Gen-3', 'Flux.1 Dev', 'Nuke AI'],
    skills: ['Gothic Atmosphere Synthesis', 'Fog & Volumetric Lighting', 'Sci-Fi Weaponry Effects'],
    bio: 'Dark fantasy visualizer crafting cinematic moody trailers, volumetric fog simulations, and dystopian world scenes.',
    portfolioThemes: [
      { title: 'Gothic Cathedrals of Europa — Cinematic Teaser', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Dark Gothic' },
      { title: 'Quantum Disruption — Sci-Fi Weaponry VFX', cat: 'AI Visual Effects', ratio: '16:9', tag: 'Energy VFX' },
      { title: 'Alchemist Laboratory — Macro Potion Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Alchemical Macro' }
    ]
  },
  {
    id: 21,
    name: 'Maya Lin',
    handle: 'maya_spatial_ai',
    initials: 'ML',
    specialization: 'AI Architectural Visualization',
    accent: '#BA8080',
    secondary: '#ECC8C8',
    bg: '#1A1414',
    iconType: 'arch',
    location: 'San Francisco, USA',
    startingPrice: 46000,
    tools: ['Flux.1 Pro', 'Midjourney v6.1', 'ControlNet Depth', 'Magnific AI'],
    skills: ['Parametric Architecture', 'Timber Construction CGI', 'Sunset Lighting Scenarios'],
    bio: 'Silicon Valley spatial designer delivering zero-emission architectural renders and sustainable futuristic campuses.',
    portfolioThemes: [
      { title: 'Timber Tower Ecosystem — Eco Highrise Concept', cat: 'AI Architectural Visualization', ratio: '16:9', tag: 'Parametric Timber' },
      { title: 'Glass Pavilion in Redwoods — Retreat Residence', cat: 'AI Architectural Visualization', ratio: '16:9', tag: 'Forest Retreat' },
      { title: 'Minimalist Penthouse Terrace — City Sunset', cat: 'AI Architectural Visualization', ratio: '4:5', tag: 'Sunset Interior' }
    ]
  },
  {
    id: 22,
    name: 'Kabir Singhania',
    handle: 'kabir_automotive_ai',
    initials: 'KS',
    specialization: 'AI Product Advertising',
    accent: '#B5786C',
    secondary: '#E8BEB5',
    bg: '#191412',
    iconType: 'product',
    location: 'Delhi, India',
    startingPrice: 37000,
    tools: ['Flux.1', 'Runway Gen-3', 'Kling AI 1.5', 'Photoshop'],
    skills: ['Metallic Car Paint Shaders', 'Night City Rain Reflections', 'Camera Tracking Rigging'],
    bio: 'Automotive and consumer electronics commercial specialist engineering photorealistic ads with custom studio reflections.',
    portfolioThemes: [
      { title: 'Monsoon Apex — Electric SUV Launch Video', cat: 'AI Product Advertising', ratio: '16:9', tag: 'EV Launch Ad' },
      { title: 'Titanium Acoustic Soundbar — Gadget Teaser', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Tech Audio Gadget' },
      { title: 'Ceramic Dial Smartwatch — Macro Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Smartwatch Macro' }
    ]
  },
  {
    id: 23,
    name: 'Zara Al-Mansoor',
    handle: 'zara_luxury_couture',
    initials: 'ZA',
    specialization: 'AI Fashion Visuals',
    accent: '#BD808D',
    secondary: '#EFC7D1',
    bg: '#1A1316',
    iconType: 'fashion',
    location: 'Dubai, UAE',
    startingPrice: 48000,
    tools: ['Flux.1 Dev', 'Midjourney v6.1', 'Magnific AI', 'Topaz Video AI'],
    skills: ['Silk & Chiffon Aerodynamics', 'Desert Sunset Backlighting', 'Gold Embroidery Shaders'],
    bio: 'Middle Eastern haute couture and luxury fragrance visionary creating grand desert runway concepts and royal jewelry campaigns.',
    portfolioThemes: [
      { title: 'Desert Silk Mirage — Royal Abaya Collection', cat: 'AI Fashion Visuals', ratio: '4:5', tag: 'Desert Couture' },
      { title: 'Oud Noir — Rare Amber Perfume Commercial', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Luxury Oud' },
      { title: 'Golden Hour Dune Runway — Virtual Fashion Show', cat: 'Generative Video', ratio: '9:16', tag: 'Dune Runway' }
    ]
  },
  {
    id: 24,
    name: 'Lucas Lindqvist',
    handle: 'lucas_nordic_minimal',
    initials: 'LL',
    specialization: 'AI Brand Identity',
    accent: '#A57B89',
    secondary: '#DBC5CE',
    bg: '#161416',
    iconType: 'brand',
    location: 'Stockholm, Sweden',
    startingPrice: 39000,
    tools: ['Flux.1 Pro', 'Midjourney v6.1', 'Figma', 'Illustrator'],
    skills: ['Scandinavian Minimalism', 'Paper Texture Emulation', 'Refined Monochromatic Palettes'],
    bio: 'Nordic minimalist designer crafting bespoke brand identities, sustainable packaging concepts, and editorial publications.',
    portfolioThemes: [
      { title: 'Nordic Botanical Apothecary — Identity Suite', cat: 'AI Brand Identity', ratio: '1:1', tag: 'Packaging System' },
      { title: 'Fjord Pure — Glacial Water Bottle Identity', cat: 'AI Product Advertising', ratio: '4:5', tag: 'Bottle Design' },
      { title: 'Artisan Ceramics Studio — Minimalist Brand Film', cat: 'AI Storytelling', ratio: '16:9', tag: 'Nordic Studio' }
    ]
  },
  {
    id: 25,
    name: 'Amara Okafor',
    handle: 'amara_afro_futurism',
    initials: 'AO',
    specialization: 'AI Concept Art',
    accent: '#BD796F',
    secondary: '#EBBFB8',
    bg: '#1A1412',
    iconType: 'concept',
    location: 'Lagos, Nigeria',
    startingPrice: 35000,
    tools: ['Flux.1 Dev', 'Runway Gen-3', 'ComfyUI', 'Kling AI'],
    skills: ['Afrofuturistic Worldbuilding', 'Solarpunk Infrastructure', 'Bioluminescent Patterns'],
    bio: 'Afrofuturist concept artist envisioning lush sustainable solar-powered African metropolises and mythic sci-fi heroes.',
    portfolioThemes: [
      { title: 'Lagos 2099 — Solarpunk Floating Metropolis', cat: 'AI Concept Art', ratio: '16:9', tag: 'Solarpunk City' },
      { title: 'Orisha Warriors — Cyber-Mythic Character Sheet', cat: 'AI Character Design', ratio: '4:5', tag: 'Afrofuturist IP' },
      { title: 'Ancestral Frequency — Afrobeats Visualizer', cat: 'AI Music Videos', ratio: '16:9', tag: 'Music Visualizer' }
    ]
  },
  {
    id: 26,
    name: 'Liam Gallagher',
    handle: 'liam_docu_cinema',
    initials: 'LG',
    specialization: 'AI Filmmaking',
    accent: '#B07878',
    secondary: '#E6C2BF',
    bg: '#191414',
    iconType: 'camera',
    location: 'Dublin, Ireland',
    startingPrice: 33000,
    tools: ['Runway Gen-3', 'Flux.1', 'ElevenLabs', 'Topaz 4K'],
    skills: ['16mm Film Emulation', 'Subtle Grain Balancing', 'Naturalistic Lighting Control'],
    bio: 'Cinematographer emulating vintage 16mm celluloid aesthetic for indie brand retrospectives and documentary shorts.',
    portfolioThemes: [
      { title: 'The Coastal Lighthouse Keeper — 16mm AI Short', cat: 'AI Filmmaking', ratio: '16:9', tag: 'Celluloid Film' },
      { title: 'Highland Tweed Weavers — Heritage Brand Film', cat: 'AI Storytelling', ratio: '16:9', tag: 'Craft Heritage' },
      { title: 'Atlantic Gale — Sea Salt Soap Vertical Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Ocean Craft' }
    ]
  },
  {
    id: 27,
    name: 'Hana Tanaka',
    handle: 'hana_kawaii_3d',
    initials: 'HT',
    specialization: 'AI Animation',
    accent: '#BD7A8D',
    secondary: '#F0C2CF',
    bg: '#1A1317',
    iconType: 'motion',
    location: 'Kyoto, Japan',
    startingPrice: 31000,
    tools: ['ComfyUI', 'AnimateDiff', 'Niji v6', 'After Effects'],
    skills: ['Claymation Texture Synthesis', 'Playful 3D Physics', 'Whimsical Sound Sync'],
    bio: '3D generative animator creating tactile claymation-style character mascots and whimsical product explainers.',
    portfolioThemes: [
      { title: 'Matcha Spirit Bakery — Claymation Short', cat: 'AI Animation', ratio: '16:9', tag: 'Claymation 3D' },
      { title: 'Pocket Mochis — Mobile Game Character Reveal', cat: 'AI Game Art', ratio: '1:1', tag: 'Kawaii Mascot' },
      { title: 'Morning Dew Bento — Kinetic Cooking Reel', cat: 'Generative Video', ratio: '9:16', tag: 'Kinetic Food' }
    ]
  },
  {
    id: 28,
    name: 'Felipe Santos',
    handle: 'felipe_sound_pulse',
    initials: 'FS',
    specialization: 'AI Music Videos',
    accent: '#BA7C70',
    secondary: '#ECC1B8',
    bg: '#191412',
    iconType: 'music',
    location: 'Rio de Janeiro, Brazil',
    startingPrice: 37000,
    tools: ['Deforum SD', 'Runway Gen-3', 'ComfyUI', 'Kling AI'],
    skills: ['Samba Beat Waveform Morphing', 'Carnival Light Trailing', 'Tropical Fluid Dynamics'],
    bio: 'Audio-visual live creator producing high-energy rhythmic music videos with tropical color flares and undulating generative fractals.',
    portfolioThemes: [
      { title: 'Favela Electrico — Tropical Bass Music Video', cat: 'AI Music Videos', ratio: '16:9', tag: 'Bass Music Video' },
      { title: 'Amazonian Bioluminescence — Stage Backdrop', cat: 'Generative Video', ratio: '16:9', tag: 'Live Stage Visual' },
      { title: 'Solar Rhythm — Festival Promo Reel', cat: 'AI Music Videos', ratio: '9:16', tag: 'Festival Teaser' }
    ]
  },
  {
    id: 29,
    name: 'Natasha Romanova',
    handle: 'natasha_cyber_vfx',
    initials: 'NR',
    specialization: 'AI Visual Effects',
    accent: '#A07688',
    secondary: '#D9C1CD',
    bg: '#161316',
    iconType: 'vfx',
    location: 'Warsaw, Poland',
    startingPrice: 47000,
    tools: ['EbSynth', 'Nuke AI', 'Runway Gen-3 Alpha', 'ComfyUI Depth'],
    skills: ['Neural Face Swapping & Consistency', 'Holographic User Interface VFX', 'Dystopian Rain VFX'],
    bio: 'Sci-fi post-production specialist crafting futuristic HUD overlays, robotic prosthetics, and cyberpunk plate alterations.',
    portfolioThemes: [
      { title: 'Cyborg Rehabilitation Unit — Sci-Fi Teaser', cat: 'AI Visual Effects', ratio: '16:9', tag: 'Cybernetic VFX' },
      { title: 'Neural Cortex Link — Hologram Interface UI', cat: 'AI Visual Effects', ratio: '16:9', tag: 'Futuristic HUD' },
      { title: 'Night Market Neon — Dystopian Street Scene', cat: 'AI Concept Art', ratio: '9:16', tag: 'Neon Alley' }
    ]
  },
  {
    id: 30,
    name: 'Tariq Mansoor',
    handle: 'tariq_heritage_craft',
    initials: 'TM',
    specialization: 'AI Storytelling',
    accent: '#B87B75',
    secondary: '#ECC3BD',
    bg: '#191413',
    iconType: 'story',
    location: 'Cairo, Egypt',
    startingPrice: 32000,
    tools: ['Flux.1 Pro', 'Runway Gen-3', 'ElevenLabs', 'Topaz AI'],
    skills: ['Ancient Calligraphy Integration', 'Gold Leaf Micro Reflections', 'Historic Architecture CGI'],
    bio: 'Cultural heritage filmmaker reconstructing forgotten ancient civilizations and majestic architectural wonders through generative docudramas.',
    portfolioThemes: [
      { title: 'Alexandria Library Reborn — Cinematic Doc', cat: 'AI Storytelling', ratio: '16:9', tag: 'Historic Rebirth' },
      { title: 'Golden Pharaoh — High Jewelry Documentary', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Antique Gold' },
      { title: 'Nile Papyrus Tales — Animated Calligraphy Reel', cat: 'AI Animation', ratio: '9:16', tag: 'Ancient Paper' }
    ]
  },
  {
    id: 31,
    name: 'Isabella Rossi',
    handle: 'isabella_couture_cinema',
    initials: 'IR',
    specialization: 'AI Fashion Visuals',
    accent: '#BC7E88',
    secondary: '#EEC5CD',
    bg: '#191315',
    iconType: 'fashion',
    location: 'Florence, Italy',
    startingPrice: 43000,
    tools: ['Flux.1 Dev', 'Midjourney v6.1', 'Magnific AI', 'Runway Gen-3'],
    skills: ['Italian Velvet Textures', 'Renaissance Chiaroscuro', 'Runway Model Consistency'],
    bio: 'Editorial director blending Renaissance art lighting with modern digital couture for luxury Italian fashion houses.',
    portfolioThemes: [
      { title: 'Medici Velvet — Autumn Winter Campaign', cat: 'AI Fashion Visuals', ratio: '4:5', tag: 'Velvet Couture' },
      { title: 'Florentine Gold — Artisan Leather Bag Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Leather Craft' },
      { title: 'Tuscan Sun Muse — Cinematic Fashion Short', cat: 'Generative Video', ratio: '16:9', tag: 'Italian Cinema' }
    ]
  },
  {
    id: 32,
    name: 'Kenji Sato',
    handle: 'kenji_game_worlds',
    initials: 'KS',
    specialization: 'AI Game Art',
    accent: '#9C7A8E',
    secondary: '#DAC4D2',
    bg: '#161317',
    iconType: 'game',
    location: 'Osaka, Japan',
    startingPrice: 38000,
    tools: ['Midjourney v6.1', 'Meshy AI', 'Unreal Engine 5', 'ComfyUI'],
    skills: ['Mecha Hardware Drafting', 'Sci-Fi Cockpit Design', 'Isometric Dungeon Assets'],
    bio: 'Mecha designer and worldbuilder delivering hyper-detailed sci-fi concept art, blueprint schematics, and 3D textured assets.',
    portfolioThemes: [
      { title: 'Titan Mecha Chassis 07 — Technical Blueprint', cat: 'AI Game Art', ratio: '16:9', tag: 'Mecha Blueprint' },
      { title: 'Orbital Hangar Bay — Unreal Engine Concept', cat: 'AI Game Art', ratio: '16:9', tag: 'Space Hangar' },
      { title: 'Pilot Helmet HUD — Tactical Keyframe', cat: 'AI Concept Art', ratio: '1:1', tag: 'Cockpit View' }
    ]
  },
  {
    id: 33,
    name: 'Astrid Lind',
    handle: 'astrid_botanical_ai',
    initials: 'AL',
    specialization: 'AI Product Advertising',
    accent: '#B07878',
    secondary: '#E6C2BF',
    bg: '#181414',
    iconType: 'product',
    location: 'Copenhagen, Denmark',
    startingPrice: 36000,
    tools: ['Flux.1 Schnell', 'Luma Dream Machine', 'ComfyUI', 'Topaz AI'],
    skills: ['Hygge Aesthetic Composition', 'Frosted Glass Refraction', 'Micro Floral Petals'],
    bio: 'Nordic wellness and skincare visualizer capturing crisp morning light, dewy botanical extracts, and frosted amber glass bottles.',
    portfolioThemes: [
      { title: 'Nordic Cloudberry Elixir — Skincare Ad', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Cloudberry Serum' },
      { title: 'Glacial Mineral Mist — Dewdrop Vertical Reel', cat: 'AI Product Advertising', ratio: '9:16', tag: 'Hydration Reel' },
      { title: 'Smoked Pine Candle — Cozy Interior Still', cat: 'AI Concept Art', ratio: '4:5', tag: 'Hygge Living' }
    ]
  },
  {
    id: 34,
    name: 'Vikram Chawla',
    handle: 'vikram_synth_cinema',
    initials: 'VC',
    specialization: 'Generative Video',
    accent: '#B4796D',
    secondary: '#E7BFB5',
    bg: '#191412',
    iconType: 'film',
    location: 'Bengaluru, India',
    startingPrice: 35000,
    tools: ['Runway Gen-3 Alpha', 'Kling AI 1.5', 'Flux.1 Dev', 'DaVinci Resolve'],
    skills: ['Cyberpunk Traffic Trails', 'Hyperlapse AI Interpolation', 'Volumetric Neon Haze'],
    bio: 'Hyperlapse director blending drone telemetry with generative motion synthesis for tech summit keynotes and urban lifestyle brands.',
    portfolioThemes: [
      { title: 'Bengaluru Cyber Nexus — Smart City Film', cat: 'Generative Video', ratio: '16:9', tag: 'Future City' },
      { title: 'Silicon Corridor Dusk — Hyperlapse Reel', cat: 'Generative Video', ratio: '9:16', tag: 'Neon Hyperlapse' },
      { title: 'Quantum Server Architecture — Tech Ad', cat: 'AI Product Advertising', ratio: '16:9', tag: 'Datacenter CGI' }
    ]
  },
  {
    id: 35,
    name: 'Zoe Thorne',
    handle: 'zoe_surreal_dreams',
    initials: 'ZT',
    specialization: 'AI Concept Art',
    accent: '#A87486',
    secondary: '#DFC0CC',
    bg: '#171316',
    iconType: 'concept',
    location: 'London, UK',
    startingPrice: 34000,
    tools: ['Midjourney v6.1', 'Flux.1 Pro', 'Magnific AI', 'Photoshop'],
    skills: ['Floating Surreal Landscapes', 'Iridescent Crystal Shaders', 'Ethereal Portraiture'],
    bio: 'Surrealist digital artist exploring dreams, cosmic botany, and floating monoliths for high-end luxury editorial print and metaverse exhibitions.',
    portfolioThemes: [
      { title: 'Monolith of the Astral Sea — Keyframe Painting', cat: 'AI Concept Art', ratio: '16:9', tag: 'Cosmic Monolith' },
      { title: 'Crystalline Garden of Saturn — Gallery Piece', cat: 'AI Concept Art', ratio: '4:5', tag: 'Crystal Botany' },
      { title: 'The Celestial Muse — Ethereal Video Loop', cat: 'AI Animation', ratio: '9:16', tag: 'Celestial Muse' }
    ]
  }
];

// Helper to generate bespoke luxury SVG Avatar
function generateAvatarSvg(creator) {
  const { name, initials, specialization, accent, secondary, bg } = creator;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${secondary}" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${secondary}"/>
      <stop offset="50%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#1A1515"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="400" height="400" fill="url(#bgGrad)"/>

  <!-- Ambient Glow Ring -->
  <circle cx="200" cy="200" r="170" fill="none" stroke="url(#ringGrad)" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="200" cy="200" r="150" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 8" stroke-opacity="0.6"/>

  <!-- Halo Circle -->
  <circle cx="200" cy="180" r="95" fill="#141010" stroke="url(#ringGrad)" stroke-width="3" filter="url(#softGlow)"/>

  <!-- Stylized Monogram / Silhouette -->
  <text x="200" y="205" font-family="'Playfair Display', Georgia, serif" font-size="82" font-weight="bold" font-style="italic" fill="${secondary}" text-anchor="middle" letter-spacing="2">
    ${initials}
  </text>

  <!-- Specialization Badge Pill -->
  <g transform="translate(200, 315)">
    <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#1A1515" stroke="${accent}" stroke-width="1.5"/>
    <text x="0" y="5" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="600" fill="${secondary}" text-anchor="middle" letter-spacing="1">
      ${specialization.toUpperCase()}
    </text>
  </g>

  <!-- Verified AI Pro Seal -->
  <g transform="translate(200, 360)">
    <text x="0" y="0" font-family="'Inter', sans-serif" font-size="11" fill="#A39292" text-anchor="middle" letter-spacing="0.5">
      ${name} • AI Creator
    </text>
  </g>
</svg>`;
}

// Helper to generate bespoke luxury SVG Portfolio thumbnail
function generatePortfolioSvg(creator, portfolio, index) {
  const { accent, secondary, bg } = creator;
  const isVertical = portfolio.ratio === '9:16';
  const isSquare = portfolio.ratio === '1:1' || portfolio.ratio === '4:5';
  
  const width = isVertical ? 675 : isSquare ? 800 : 1200;
  const height = isVertical ? 1200 : isSquare ? 1000 : 675;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <radialGradient id="meshGrad${creator.id}_${index}" cx="40%" cy="35%" r="85%">
      <stop offset="0%" stop-color="${secondary}" stop-opacity="0.25"/>
      <stop offset="45%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="75%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${secondary}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Main Luxury Background -->
  <rect width="${width}" height="${height}" fill="url(#meshGrad${creator.id}_${index})"/>

  <!-- Aesthetic Grid & Geometry Accents -->
  <g stroke="${accent}" stroke-opacity="0.15" stroke-width="1">
    <line x1="40" y1="0" x2="40" y2="${height}"/>
    <line x1="${width - 40}" y1="0" x2="${width - 40}" y2="${height}"/>
    <line x1="0" y1="40" x2="${width}" y2="40"/>
    <line x1="0" y1="${height - 40}" x2="${width}" y2="${height - 40}"/>
  </g>

  <!-- Central Visual Motif: Circular Aperture / Frame -->
  <g transform="translate(${width / 2}, ${height * 0.42})">
    <circle r="${Math.min(width, height) * 0.26}" fill="#0A0808" stroke="url(#borderGrad)" stroke-width="2.5"/>
    <circle r="${Math.min(width, height) * 0.22}" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="4 8" stroke-opacity="0.4"/>
    <circle r="${Math.min(width, height) * 0.16}" fill="${bg}" fill-opacity="0.7"/>
    
    <!-- Monogram and Artwork Code -->
    <text y="-8" font-family="'Playfair Display', serif" font-size="${Math.min(width, height) * 0.08}" font-weight="bold" font-style="italic" fill="${secondary}" text-anchor="middle">
      COLLABRIX
    </text>
    <text y="24" font-family="'Inter', sans-serif" font-size="${Math.min(width, height) * 0.024}" font-weight="bold" fill="${accent}" text-anchor="middle" letter-spacing="3">
      ${portfolio.tag.toUpperCase()}
    </text>
  </g>

  <!-- Top Badges -->
  <g transform="translate(60, 75)">
    <rect width="180" height="32" rx="16" fill="#1A1515" stroke="${accent}" stroke-width="1.2"/>
    <text x="90" y="21" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="${secondary}" text-anchor="middle" letter-spacing="1">
      ${portfolio.cat.toUpperCase()}
    </text>
  </g>

  <g transform="translate(${width - 240}, 75)">
    <rect width="180" height="32" rx="16" fill="#1A1515" stroke="${accent}" stroke-width="1.2"/>
    <text x="90" y="21" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#E6C2BF" text-anchor="middle">
      4K UHD • ${portfolio.ratio}
    </text>
  </g>

  <!-- Bottom Editorial Details Card -->
  <g transform="translate(60, ${height - 130})">
    <rect width="${width - 120}" height="80" rx="16" fill="#141010" fill-opacity="0.9" stroke="#2E2424" stroke-width="1.5"/>
    <text x="30" y="34" font-family="'Playfair Display', Georgia, serif" font-size="${Math.min(width * 0.032, 26)}" font-weight="bold" fill="#F9EBE5">
      ${portfolio.title.length > 52 ? portfolio.title.slice(0, 52) + '...' : portfolio.title}
    </text>
    <text x="30" y="60" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="${secondary}">
      By ${creator.name} • ${creator.tools[0]} &amp; ${creator.tools[1] || 'ComfyUI'}
    </text>
    <text x="${width - 150}" y="48" font-family="'Inter', sans-serif" font-size="12" font-weight="bold" fill="${accent}" text-anchor="end">
      Commercial Ready ✓
    </text>
  </g>
</svg>`;
}

// Generate all files
console.log('Generating distinct local SVG assets for 35 creators...');
let createdAvatars = 0;
let createdPortfolios = 0;

creatorDefinitions.forEach((c) => {
  // Avatar
  const avatarPath = path.join(creatorsDir, `creator-${c.id}.svg`);
  fs.writeFileSync(avatarPath, generateAvatarSvg(c), 'utf8');
  createdAvatars++;

  // Portfolios
  c.portfolioThemes.forEach((p, pIdx) => {
    const portfolioPath = path.join(portfoliosDir, `creator-${c.id}-portfolio-${pIdx + 1}.svg`);
    fs.writeFileSync(portfolioPath, generatePortfolioSvg(c, p, pIdx + 1), 'utf8');
    createdPortfolios++;
  });
});

console.log(`Successfully generated ${createdAvatars} distinct creator avatars!`);
console.log(`Successfully generated ${createdPortfolios} distinct portfolio preview assets!`);
