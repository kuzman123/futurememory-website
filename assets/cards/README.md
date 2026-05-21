# Card images

Drop 8 images here, named exactly:

- card-01.jpg — Drugi mozak (knowledge base, documents, brain visualization)
- card-02.jpg — Web razvoj (code editor, terminal, web layout)
- card-03.jpg — Brending i grafika (brand design, typography, color palette)
- card-04.jpg — Generativna slika i animacija (AI-generated art, ComfyUI workflow)
- card-05.jpg — 3D i Gaussian Splatting (3D scene, point cloud, spatial reconstruction)
- card-06.jpg — Lokalna AI infrastruktura (server hardware, RTX GPU, terminal)
- card-07.jpg — Glas i transkripcija (microphone, waveform, text output)
- card-08.jpg — Mentorstvo i obuka (learning, code, person working)

Recommended: 640×400px minimum, JPEG or WebP, dark-toned to match the brand.
The card image area is 320×228px displayed at various DPR ratios.

After dropping images: the CSS gradient placeholders in styles/effects.css will
be overridden automatically if you also add:
  style="background-image: url('/assets/cards/card-NN.jpg')"
to each `.card__image` div in index.html.
