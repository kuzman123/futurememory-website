import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

// ── Serif italic accent ──────────────────────────────────────────────────────
const S = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic" }}>
    {children}
  </span>
);

// ── Mono eyebrow label ───────────────────────────────────────────────────────
const ML = ({
  children,
  className = "",
  style: overrideStyle,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <span
    className={className}
    style={{
      fontFamily: "'Geist Mono', monospace",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase" as const,
      color: "#6B6B66",
      ...overrideStyle,
    }}
  >
    {children}
  </span>
);

// ── Wordmark ─────────────────────────────────────────────────────────────────
const Wordmark = ({ size = "nav" }: { size?: "nav" | "footer" }) => (
  <span style={{ lineHeight: 1 }}>
    <span
      style={{
        fontFamily: "'Geist', sans-serif",
        fontWeight: 500,
        fontSize: size === "footer" ? "18px" : "17px",
        color: "#FAFAF7",
        letterSpacing: "-0.02em",
      }}
    >
      Future{" "}
    </span>
    <span
      style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontStyle: "italic",
        fontSize: size === "footer" ? "21px" : "20px",
        color: "#FAFAF7",
      }}
    >
      Memory
    </span>
  </span>
);

// ── Cards data ───────────────────────────────────────────────────────────────
const CARDS = [
  {
    num: "01",
    title: "Drugi mozak",
    tagline: "Vaša lična baza znanja, indeksirana i pretraživa kroz razgovor.",
    modalTitle: "Drugi mozak — vaša lična baza znanja",
    description:
      "Lična baza znanja koju zajedno punimo vašim materijalom — beleške, PDF-ovi, transkripti razgovora, slike, foldere klijenata, stare projekte. Sve to ulazi u sistem koji LLM indeksira i čita pod vašim pravilima. Pristupate joj preko običnog chata na telefonu ili laptopu. Sistem citira izvor uz svaki odgovor.\n\nVaši podaci ostaju na vašem disku. Ne odlaze u nečiji cloud osim ako vi tako ne odlučite. Sistem je dizajniran da bude prenosiv — danas radi sa Claude-om, sutra sa novim modelom.",
    bullets: [
      "Strukturisanu bazu znanja sa konvencijama koje vi razumete",
      "Chat interfejs (telefon + laptop) koji pretražuje samo vašu bazu",
      "Pipeline za dodavanje novih dokumenata",
      "Pravila citiranja — svaki odgovor sa izvorom",
      "Obuku za održavanje sistema bez moje pomoći",
    ],
    technologies: ["Obsidian", "Claude Projects", "RAG", "Markdown", "Python", "Local-first"],
    img: "https://images.unsplash.com/photo-1722182877533-7378b60bf1e8?w=640&h=400&fit=crop",
  },
  {
    num: "02",
    title: "Web razvoj",
    tagline: "Sajtovi i aplikacije, sa kodom koji ostaje vaš i razumljiv.",
    modalTitle: "Web razvoj — kod koji razumete",
    description:
      "Sajtovi i web aplikacije izrađene sa Claude Code-om kao izvršiocem i mojim nadzorom kao arhitektom. Svaki red koda ostaje vaš — vaš repozitorijum, vaš hosting, vaša kontrola. Bez zaključavanja na platforme, bez mesečnih pretplata za osnovne funkcije.",
    bullets: [
      "Statični sajtovi i dinamične web aplikacije",
      "Prilagođene landing stranice bez predložaka",
      "API integracije i admin paneli",
      "Dokumentovan kod sa uputstvima za dalje održavanje",
      "Verzionisanje na Git-u od prvog dana",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Claude Code", "Tailwind", "Git"],
    img: "https://images.unsplash.com/photo-1585384107568-5bc588c7eefd?w=640&h=400&fit=crop",
  },
  {
    num: "03",
    title: "Brending i grafika",
    tagline: "Vizuelni sistemi i prepress, kontrolisani direktno iz razgovora.",
    modalTitle: "Brending i grafika — vizuelni sistemi",
    description:
      "Vizuelni identitet, logotipi, tipografski sistemi, prepress priprema za štampu — sve kroz pipeline koji LLM vodi direktno u Adobe alate. Rezultat: konzistentni vizuelni sistem koji se skalira bez ručnog ponavljanja.",
    bullets: [
      "Vizuelni identitet i brand priručnik",
      "Logotip i tipografski sistem",
      "Priprema fajlova za štampu (prepress)",
      "Batch obrada i automatizacija grafike",
      "Figma komponente i design sistem",
    ],
    technologies: ["Adobe Illustrator", "Figma", "Claude", "Photoshop", "InDesign"],
    img: "https://images.unsplash.com/photo-1773695223007-5cee85bca887?w=640&h=400&fit=crop",
  },
  {
    num: "04",
    title: "Generativna slika i animacija",
    tagline: "ComfyUI workflow-i pod prst, sa lokalnim modelima i kontrolom kvaliteta.",
    modalTitle: "Generativna slika i animacija — ComfyUI pipelines",
    description:
      "Generativni vizuali, konzistentni likovi, animacija i video — sve na lokalnom hardveru bez cloud troškova. Workflow-i u ComfyUI koji se pokreću jednim klikom, sa verifikacijom kvaliteta pre isporuke.",
    bullets: [
      "Konzistentni likovi i scene (LoRA fine-tuning)",
      "Img2img i Inpainting za retuširanje",
      "Animacija i video generacija",
      "Lokalno pokretanje bez API troškova",
      "Isporuka u PNG/WebP/MP4 formatu",
    ],
    technologies: ["ComfyUI", "Stable Diffusion", "FLUX", "LoRA", "AnimateDiff", "Local GPU"],
    img: "https://images.unsplash.com/photo-1715439491117-7c55fb05eda8?w=640&h=400&fit=crop",
  },
  {
    num: "05",
    title: "3D i Gaussian Splatting",
    tagline: "Fotorealistična 3D rekonstrukcija iz fotografija ili video snimaka.",
    modalTitle: "3D i Gaussian Splatting — fotorealistična rekonstrukcija",
    description:
      "Fotorealistična 3D rekonstrukcija objekata, prostora i lica iz serije fotografija ili video snimaka. Gaussian Splatting daje vizuele koji se ne mogu razlikovati od fotografije — za vizualizaciju prostora, produkte, portfolio.",
    bullets: [
      "3D rekonstrukcija iz fotografija (Photogrammetry)",
      "Gaussian Splatting (.ply) za web i prezentacije",
      "Isporuka u GLTF/FBX/OBJ formatima",
      "Optimizovani web viewer embed",
      "360° orbit renderovanje za portfolio",
    ],
    technologies: ["Gaussian Splatting", "Colmap", "Nerfstudio", "Blender", "Three.js"],
    img: "https://images.unsplash.com/photo-1640358342395-cf2cb079c412?w=640&h=400&fit=crop",
  },
  {
    num: "06",
    title: "Lokalna AI infrastruktura",
    tagline: "Privatni LLM-ovi na vašem hardveru. Vaši podaci ne idu u tuđi cloud.",
    modalTitle: "Lokalna AI infrastruktura — privatni LLM-ovi",
    description:
      "Postavljanje i konfiguracija lokalnih LLM sistema na vašem hardveru. Vaši podaci ne napuštaju vaše prostore. Radi bez interneta, bez pretplate, bez analize vaših razgovora od strane treće strane.",
    bullets: [
      "Instalacija i konfiguracija Ollama stack-a",
      "Selekcija i testiranje modela (Qwen, Mistral, Llama)",
      "Chat UI za lokalni pristup bez tehničkog znanja",
      "Integracija sa vašim postojećim alatima",
      "Dokumentacija i obuka za tim",
    ],
    technologies: ["Ollama", "Qwen", "Mistral", "Llama", "Open WebUI", "Linux"],
    img: "https://images.unsplash.com/photo-1700231086737-c61a432ce361?w=640&h=400&fit=crop",
  },
  {
    num: "07",
    title: "Glas i transkripcija",
    tagline: "Whisper STT pipeline od mikrofona do bilo koje aplikacije, jednim klikom.",
    modalTitle: "Glas i transkripcija — Whisper STT pipeline",
    description:
      "Automatska transkripcija govora u tekst sa Whisper modelima — lokalno, brzo, tačno za srpski jezik. Od mikrofona do formatiranog teksta u aplikaciji po vašem izboru, jednim klikom.",
    bullets: [
      "Lokalni Whisper STT pipeline (srpski jezik)",
      "Batch transkripcija audio i video fajlova",
      "Real-time transkript tokom sastanaka",
      "Automatski export u Obsidian / Notion / email",
      "Leksikon za terminologiju vaše branše",
    ],
    technologies: ["Whisper", "Python", "ffmpeg", "Obsidian", "Local-first"],
    img: "https://images.unsplash.com/photo-1633239953245-bbfdc040a731?w=640&h=400&fit=crop",
  },
  {
    num: "08",
    title: "Mentorstvo i obuka",
    tagline: "Naučite da koristite Claude Code i Codex profesionalno, bez gubljenja godina.",
    modalTitle: "Mentorstvo i obuka — Claude Code profesionalno",
    description:
      "Individualni mentorski program koji vas osposobljava da koristite Claude Code i Codex kao profesionalne alate, ne kao igračke. Fokus na verifikaciji, arhitekturi i disciplini — ne na brzim trikovima.",
    bullets: [
      "1:1 sesije prilagođene vašem profilu i ciljevima",
      "Praktični projekti iz vaše branše",
      "Disciplina: verifikacija, dokumentacija, Git",
      "Pipeline za vaš workflow (dizajn / dev / istraživanje)",
      "Ongoing support između sesija",
    ],
    technologies: ["Claude Code", "Codex", "Git", "Cursor", "Python", "Markdown"],
    img: "https://images.unsplash.com/photo-1609906634385-33e4233c6d61?w=640&h=400&fit=crop",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Razgovor",
    body: "Pišete šta vam treba — ili pričamo. Bez ograničenja forme. Cilj je da razumem šta zaista treba da uradimo, a ne šta zvuči dobro u brifu.",
  },
  {
    num: "02",
    title: "Dokument",
    body: "Ja pišem kratak dokument koji opisuje šta će sistem da radi, šta neće, koje su pretpostavke, i koliko košta. Vi potvrđujete ili menjamo dok ne legne.",
  },
  {
    num: "03",
    title: "Izgradnja",
    body: "Radim. Sa Claude Code-om i Codex-om kao izvršiocima, mojim nadzorom kao arhitektom i verifikatorom. Pravim međukorake koji se mogu testirati. Bez 'javljam se kad bude gotovo'.",
  },
  {
    num: "04",
    title: "Isporuka",
    body: "Predajem fajlove, kod, dokumentaciju. Pokazujem šta radi, šta ne, i koje su poznate granice. Sve ostaje vaše — vaš Git, vaš nalog, vaši podaci.",
  },
];

// ── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  card,
  onClick,
}: {
  card: (typeof CARDS)[0];
  onClick: () => void;
}) {
  return (
    <div
      className="service-card group cursor-pointer"
      onClick={onClick}
      style={{
        background: "#111114",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "192px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img
          src={card.img}
          alt={card.title}
          className="card-img w-full h-full"
          style={{ objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(5,5,7,0.8) 100%)",
          }}
        />
      </div>
      <div
        style={{
          padding: "20px 24px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          minHeight: "140px",
        }}
      >
        <div>
          <h3
            style={{
              color: "#FAFAF7",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              color: "#A8A89F",
              fontSize: "13px",
              lineHeight: 1.5,
              marginTop: "6px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {card.tagline}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              color: "#4A4A45",
              letterSpacing: "0.04em",
            }}
          >
            {card.num}
          </span>
          <span
            className="card-link"
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "12px",
              color: "#6B6B66",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
          >
            Detaljnije →
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Service Modal ─────────────────────────────────────────────────────────────
function ServiceModal({ card, onClose }: { card: (typeof CARDS)[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,7,0.8)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl overflow-y-auto"
        style={{
          background: "#18181D",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: "20px",
          maxHeight: "85vh",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center transition-colors"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#A8A89F",
            cursor: "pointer",
          }}
        >
          <X size={15} />
        </button>

        {/* Hero image */}
        <div style={{ height: "240px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <img
            src={card.img}
            alt={card.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "240px",
              background: "linear-gradient(to bottom, transparent 40%, rgba(24,24,29,0.9) 100%)",
            }}
          />
        </div>

        <div style={{ padding: "28px 32px 32px" }}>
          {/* Title */}
          <h2
            style={{
              color: "#FAFAF7",
              fontSize: "28px",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            {card.modalTitle}
          </h2>

          {/* Šta je ovo */}
          <div style={{ marginBottom: "24px" }}>
            <ML className="block mb-3">Šta je ovo</ML>
            {card.description.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  color: "#A8A89F",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  marginBottom: i < card.description.split("\n\n").length - 1 ? "12px" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

          {/* Šta dobijate */}
          <div style={{ marginBottom: "24px" }}>
            <ML className="block mb-3">Šta dobijate</ML>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {card.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#8B5CF6",
                      flexShrink: 0,
                      marginTop: "7px",
                    }}
                  />
                  <span style={{ color: "#A8A89F", fontSize: "14px", lineHeight: 1.5 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

          {/* Tehnologije */}
          <div style={{ marginBottom: "28px" }}>
            <ML className="block mb-3">Tehnologije</ML>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {card.technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "12px",
                    color: "#A8A89F",
                    padding: "4px 10px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#kontakt"
            onClick={onClose}
            className="btn-primary block text-center"
            style={{ textDecoration: "none" }}
          >
            Pošalji upit
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({
  scrolled,
  menuOpen,
  setMenuOpen,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const links = [
    { label: "Drugi mozak", href: "#drugi-mozak" },
    { label: "Šta radimo", href: "#radovi" },
    { label: "Kako radimo", href: "#proces" },
    { label: "Studio", href: "#studio" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
      style={{
        height: "64px",
        padding: "0 24px",
        background: scrolled ? "rgba(10,10,13,0.8)" : "rgba(10,10,13,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <a href="#" style={{ textDecoration: "none" }}>
        <Wordmark />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center" style={{ gap: "28px" }}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a href="#kontakt" className="hidden md:block btn-primary" style={{ textDecoration: "none", fontSize: "14px", padding: "8px 18px" }}>
        Zakaži razgovor
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", color: "#FAFAF7", cursor: "pointer", padding: "4px" }}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-16 left-0 right-0"
          style={{
            background: "#0A0A0D",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px 24px",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "#A8A89F",
                textDecoration: "none",
                fontSize: "16px",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="btn-primary block text-center"
            style={{ textDecoration: "none", marginTop: "16px" }}
          >
            Zakaži razgovor
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "64px" }}
    >
      {/* Aurora orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "clamp(500px, 55vw, 800px)",
          height: "clamp(500px, 55vw, 800px)",
          borderRadius: "50%",
          background: "conic-gradient(from 180deg, #8B5CF6, #22D3EE, #EC4899, #8B5CF6)",
          filter: "blur(120px)",
          opacity: 0.22,
          animation: "aurora-rotate 40s linear infinite",
          pointerEvents: "none",
        }}
      />

      <div
        className="relative w-full text-center"
        style={{ maxWidth: "880px", padding: "64px 24px", margin: "0 auto" }}
      >
        {/* Eyebrow badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 14px",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "999px",
              background: "rgba(17,17,20,0.6)",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#A8A89F",
            }}
          >
            Future Memory · Studio
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            margin: "0 0 20px",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(52px, 8vw, 96px)",
              color: "#FAFAF7",
            }}
          >
            Drugi mozak.
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(52px, 8vw, 96px)",
              backgroundImage: "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 50%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Na zahtev.
          </span>
        </h1>

        {/* Lede */}
        <p
          style={{
            color: "#A8A89F",
            fontSize: "clamp(16px, 2.2vw, 20px)",
            lineHeight: 1.55,
            maxWidth: "720px",
            margin: "0 auto 32px",
          }}
        >
          Vaša lična baza znanja, povezana sa najjačim LLM modelima na tržištu, postaje sagovornik
          koji razume vaš kontekst i kontroliše alate koje već koristite — od Photoshop-a do
          ComfyUI-a, od web razvoja do 3D rekonstrukcije.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
          <a href="#radovi" className="btn-primary" style={{ textDecoration: "none" }}>
            Pogledaj šta radimo
          </a>
          <a href="#drugi-mozak" className="btn-ghost" style={{ textDecoration: "none" }}>
            Šta je drugi mozak?
          </a>
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "12px",
            color: "#6B6B66",
            letterSpacing: "0.02em",
          }}
        >
          <span>futurememory.studio</span>
          <span>·</span>
          <span>Novi Sad / Beograd / Daljinski</span>
        </div>
      </div>
    </section>
  );
}

// ── Explainer ─────────────────────────────────────────────────────────────────
function ExplainerSection() {
  const paragraphs = [
    "Zamislite bazu podataka u koju vremenom unosite stvari koje vam trebaju. Beleške sa sastanaka. Naučne radove. Snimke razgovora. Fotografije tabli sa idejama. Foldere klijenata. Vaše stare projekte. Bilo šta što biste inače „zaboravili gde ste sačuvali“.",
    "Tu bazu zatim pohrani jedan od velikih modela — Claude ili ChatGPT/Codex — i indeksira je tako da joj može pristupiti preko chata. Ne čita sve odjednom. Pretražuje relevantno, citira izvor, i odgovara na osnovu vaših podataka. Sa minimalnom potrošnjom tokena.",
    "Rezultat: imate sagovornika koji zna ono što vi znate, ali sa savršenim sećanjem. Pita ga sa telefona dok ste u kafiću. Pita ga sa laptopa dok pišete izveštaj. Pita ga šta ste odlučili na sastanku od pre tri meseca, i on vam citira tačan paragraf iz transkripta.",
    <span key="4">
      Ovaj sistem nije Notion sa AI dugmetom. Nije ChatGPT sa fajlovima. To je{" "}
      <S>modularan i prenosiv</S> sistem koji vi posedujete — vaši podaci žive na vašem disku,
      vaš LLM ih čita pod vašim pravilima, i možete ga preneti sa jedne platforme na drugu kada
      se pejzaž promeni. (A promeniće se.)
    </span>,
    <span key="5">
      Drugi mozak nije zamena za vaš mozak. To je <S>spoljni indeks</S> — kao što je biblioteka
      spoljni indeks za civilizaciju. Vaše misli ostaju vaše. Ovaj sistem samo prestaje da vas
      tera da ih pamtite napamet.
    </span>,
  ];

  return (
    <section
      id="drugi-mozak"
      style={{ padding: "96px 0" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", padding: "0 24px" }}
      >
        <div className="flex flex-col lg:flex-row" style={{ gap: "64px" }}>
          {/* Left sticky column */}
          <div
            className="lg:sticky lg:self-start"
            style={{ flex: "0 0 30%", maxWidth: "380px", top: "96px" }}
          >
            <ML className="block mb-4">01 — Koncept</ML>
            <h2
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#FAFAF7",
                margin: "0 0 16px",
              }}
            >
              Drugi mozak nije aplikacija. To je{" "}
              <S>
                <span style={{ color: "#F59E0B" }}>arhitektura</span>
              </S>
              .
            </h2>
            <p style={{ color: "#A8A89F", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
              Verovatno ste čuli za "Second Brain". Evo šta tu zaista postoji — i šta nije
              marketing.
            </p>
          </div>

          {/* Right column */}
          <div style={{ flex: 1, maxWidth: "720px" }}>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  color: "#A8A89F",
                  fontSize: "clamp(15px, 1.8vw, 18px)",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                {p}
              </p>
            ))}

            {/* Caveat card */}
            <div
              style={{
                marginTop: "32px",
                background: "#111114",
                border: "1px solid rgba(255,255,255,0.08)",
                borderLeft: "2px solid #F59E0B",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <ML className="block mb-3" style={{ color: "#F59E0B" }}>Iskrenost</ML>
              <p style={{ color: "#A8A89F", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                LLM-ovi haluciniraju. To je činjenica, ne softverska greška. Sistem koji vam
                pravim je dizajniran tako da to zna i da radi <S>uprkos</S> tome — sa proverama,
                citiranjem izvora, i diskovima koji se zovu "ne dozvoli mi da pošaljem ovo bez
                verifikacije". Bez te discipline, drugi mozak postaje treći problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Service Cards ─────────────────────────────────────────────────────────────
function ServiceCardsSection({ setActiveModal }: { setActiveModal: (i: number) => void }) {
  return (
    <section id="radovi" style={{ padding: "96px 0" }}>
      <div className="mx-auto" style={{ maxWidth: "1280px", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 64px" }}>
          <ML className="block mb-4">02 — Radovi</ML>
          <h2
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#FAFAF7",
              margin: "0 0 16px",
            }}
          >
            Osam radnih tokova. <S>Jedan kontroler.</S>
          </h2>
          <p style={{ color: "#A8A89F", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.55, margin: 0 }}>
            Svaki od ovih tokova koristi LLM kao Kontroler koji vodi alate i pipeline-ove. Vi
            razgovarate sa kontrolerom. Kontroler radi posao. Kliknite na karticu za detaljnije
            objašnjenje.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
          }}
        >
          {CARDS.map((card, i) => (
            <ServiceCard key={i} card={card} onClick={() => setActiveModal(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────
function ProcessSection() {
  const offsets = [0, 32, 64, 96];

  return (
    <section id="proces" style={{ padding: "96px 0" }}>
      <div className="mx-auto" style={{ maxWidth: "1280px", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <ML className="block mb-4">03 — Proces</ML>
          <h2
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#FAFAF7",
              margin: "0 0 12px",
            }}
          >
            Kako <S>radimo</S>.
          </h2>
          <p style={{ color: "#A8A89F", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.55, margin: 0 }}>
            Bez "AI magije". Sa razgovorom, dokumentom, i isporukom koju možete da proverite.
          </p>
        </div>

        {/* Desktop staircase */}
        <div className="hidden lg:grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", alignItems: "start" }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} style={{ marginTop: `${offsets[i]}px` }}>
              <ProcessCard step={step} />
            </div>
          ))}
        </div>

        {/* Mobile stack */}
        <div className="lg:hidden flex flex-col" style={{ gap: "16px" }}>
          {PROCESS_STEPS.map((step, i) => (
            <ProcessCard key={i} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step }: { step: (typeof PROCESS_STEPS)[0] }) {
  return (
    <div
      style={{
        background: "#111114",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "28px",
      }}
    >
      <ML className="block mb-3">{step.num}</ML>
      <h3
        style={{
          color: "#FAFAF7",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          margin: "0 0 12px",
        }}
      >
        {step.title}
      </h3>
      <p style={{ color: "#A8A89F", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{step.body}</p>
    </div>
  );
}

// ── Studio ────────────────────────────────────────────────────────────────────
function StudioSection() {
  const techStack = [
    "RTX 3090 lokalni rig",
    "Linux + Windows hibrid",
    "Claude Code + Codex za izvršavanje",
    "Ollama (Qwen, Mistral, Llama) za lokalni LLM",
    "ComfyUI za generativnu sliku/video",
    "Adobe paket + Figma za grafiku",
    "Git za sve, bez izuzetka",
  ];

  return (
    <section id="studio" style={{ padding: "96px 0" }}>
      <div className="mx-auto" style={{ maxWidth: "1280px", padding: "0 24px" }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: "64px", alignItems: "flex-start" }}>
          {/* Left — prose */}
          <div style={{ flex: 1, maxWidth: "560px" }}>
            <ML className="block mb-4">04 — Studio</ML>
            <h2
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#FAFAF7",
                margin: "0 0 28px",
              }}
            >
              Ko stoji iza ovoga.
            </h2>

            <p style={{ color: "#A8A89F", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.7, marginBottom: "20px" }}>
              Future Memory je studio Nenada Kuzmanovića. Docent na Fakultetu tehničkih nauka u
              Novom Sadu. Poslednjih pet godina sam proveo radeći 15 sati dnevno na razumevanju,
              testiranju i puštanju u rad svega što je moglo da se preuzme sa GitHub-a i pokrene
              na RTX 3090.
            </p>

            <p style={{ color: "#A8A89F", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.7, marginBottom: "20px" }}>
              Paralelno sa tim radim na <S>AUTO ENGINE</S> projektu — sistemu za kriptografski
              upravljano AI-asistirano inženjerstvo. To je razlog zašto ovaj studio ima jaku
              poziciju oko poštenja, verifikacije, i razlike između "model je rekao" i "stvar je
              urađena".
            </p>

            <p style={{ color: "#A8A89F", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.7, margin: 0 }}>
              Ako tražite nekoga ko će vam reći da je AI rešenje svega — to nije ovaj studio. Ako
              tražite nekoga ko zna gde su granice i kako da ih koristi u vašu korist — onda da.
            </p>
          </div>

          {/* Right — credentials panel */}
          <div
            style={{
              flexShrink: 0,
              width: "100%",
              maxWidth: "380px",
              background: "#111114",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "28px",
            }}
          >
            <ML className="block mb-4">Tehnička osnova</ML>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
              {techStack.map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#8B5CF6",
                      flexShrink: 0,
                      marginTop: "7px",
                    }}
                  />
                  <span style={{ color: "#A8A89F", fontSize: "14px", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "20px",
              }}
            >
              <ML className="block mb-2">Lokacija</ML>
              <p style={{ color: "#A8A89F", fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                Novi Sad. Rad za klijente lokalno i daljinski.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="kontakt" style={{ padding: "96px 0" }}>
      <div
        className="mx-auto text-center"
        style={{ maxWidth: "640px", padding: "0 24px" }}
      >
        <ML className="block mb-4">05 — Kontakt</ML>
        <h2
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FAFAF7",
            margin: "0 0 16px",
          }}
        >
          Imate <S>pitanje</S>?
        </h2>
        <p
          style={{
            color: "#A8A89F",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            lineHeight: 1.55,
            marginBottom: "28px",
          }}
        >
          Pišite kratko šta vam treba. Odgovaram u roku od 2 radna dana.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <a
            href="mailto:hello@futurememory.studio"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            hello@futurememory.studio
          </a>
          <a
            href="#kontakt"
            className="btn-ghost"
            style={{ textDecoration: "none" }}
          >
            Zakaži 30 min razgovor
          </a>
        </div>

        <p
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "12px",
            color: "#6B6B66",
            lineHeight: 1.5,
          }}
        >
          Za hitne projekte: napišite "HITNO" u naslov. Inače uobičajen tempo.
        </p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function FooterSection() {
  const links = [
    { label: "Drugi mozak", href: "#drugi-mozak" },
    { label: "Šta radimo", href: "#radovi" },
    { label: "Kako radimo", href: "#proces" },
    { label: "Studio", href: "#studio" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <footer style={{ background: "#050507", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", padding: "64px 24px 32px" }}
      >
        <div className="flex flex-col md:flex-row justify-between" style={{ gap: "40px" }}>
          {/* Brand */}
          <div>
            <Wordmark size="footer" />
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "12px",
                color: "#6B6B66",
                marginTop: "8px",
              }}
            >
              futurememory.studio
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: "#A8A89F",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontFamily: "'Geist', sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FAFAF7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#A8A89F")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Meta */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "12px",
                color: "#6B6B66",
                marginBottom: "4px",
              }}
            >
              © 2026 Nenad Kuzmanović
            </div>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "12px",
                color: "#6B6B66",
              }}
            >
              Novi Sad, Srbija
            </div>
          </div>
        </div>
      </div>

      {/* Strip */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 24px",
          textAlign: "center",
          fontFamily: "'Geist Mono', monospace",
          fontSize: "12px",
          color: "#6B6B66",
        }}
      >
        Drugi mozak. Vaš sistem, vaša kontrola, vaš kod.
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  return (
    <>
      <style>{`
        .btn-primary {
          display: inline-block;
          background: #8B5CF6;
          color: #FAFAF7;
          border: none;
          border-radius: 999px;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          text-align: center;
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: #A78BFA;
          box-shadow: 0 0 28px rgba(139, 92, 246, 0.3);
        }
        .btn-primary:active { background: #6D28D9; }
        .btn-ghost {
          display: inline-block;
          background: transparent;
          color: #FAFAF7;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Geist', sans-serif;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          text-align: center;
          white-space: nowrap;
        }
        .btn-ghost:hover {
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.04);
        }
        .nav-link {
          color: #A8A89F;
          font-size: 14px;
          font-family: 'Geist', sans-serif;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #FAFAF7; }
        .service-card {
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .service-card:hover {
          border-color: rgba(255,255,255,0.24) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .card-img {
          transition: opacity 0.4s, transform 0.5s;
          will-change: transform, opacity;
        }
        .service-card:hover .card-img {
          opacity: 0.35;
          transform: scale(1.06);
        }
        .card-link {
          transition: color 0.2s;
        }
        .service-card:hover .card-link {
          color: #A78BFA !important;
        }
        ::-webkit-scrollbar { width: 0; }
        * { scrollbar-width: none; }
      `}</style>

      {/* Noise overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.04,
        }}
      />

      <div style={{ background: "#0A0A0D", minHeight: "100vh", color: "#FAFAF7" }}>
        <Nav scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <HeroSection />
          <ExplainerSection />
          <ServiceCardsSection setActiveModal={setActiveModal} />
          <ProcessSection />
          <StudioSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>

      {activeModal !== null && (
        <ServiceModal card={CARDS[activeModal]} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
