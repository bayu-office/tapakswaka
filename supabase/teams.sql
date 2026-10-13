-- ============================================================
-- Tapakswaka — "THE CLOWNS" team seed
-- Run this in the Supabase SQL editor once.
-- Adds `nickname` + `description` columns and seeds the 4 crew.
-- company_id is intentionally omitted (single-company project).
-- ============================================================

-- 1) Add the new columns (safe to re-run).
ALTER TABLE public_teams
  ADD COLUMN IF NOT EXISTS nickname text;

ALTER TABLE public_teams
  ADD COLUMN IF NOT EXISTS description text;

-- 2) Seed / update the four crew members.
--    Replace the picsum.photos URLs with your real photos later.
INSERT INTO public_teams (name, nickname, role, description, image_url, display_order, is_active)
VALUES
  (
    'M. Arif Agus Sugiono',
    'The Timekeeper',
    'Tour Leader (Operations)',
    'Kalau di itinerary tertulis kumpul jam 5:00, jam 4:45 dia udah mondar-mandir di lobi bawa aura sersan militer. Bareng dia, kelewatan sunrise itu secara matematis mustahil. Superpower anehnya? Dia bisa bikin peserta yang paling mager mendadak rajin bangun pagi tanpa sadar. Niat mau tidur siang di mobil? Good luck—siap-siap aja dibangunin paksa cuma buat ngelihat batu yang katanya estetik.',
    'https://picsum.photos/seed/arif/600/750',
    1,
    true
  ),
  (
    'M. Ilyas Habiburrochman',
    'The Human Spreadsheet',
    'Tour Leader (Finance)',
    'Kalkulator berjalan Tapakswaka. Dia ini orang yang bakal ngirim "pengingat ramah" pas kamu pura-pura lupa transfer invoice. Meski aura debt collector-nya nggak kenal ampun soal budgeting, dia punya satu kelemahan fatal: sogok aja pakai kopi hitam yang enak, mode galaknya langsung luntur berubah jadi senyum paling lebar sepanjang perjalanan.',
    'https://picsum.photos/seed/ilyas/600/750',
    2,
    true
  ),
  (
    'Bayu Agus Nurrudin',
    'The Rogue Director',
    'Documentation (Video)',
    'Ngejagain kamera sama drone udah kayak ngerawat anak pertama. Nggak usah repot latihan pose estetik, karena dia justru lebih semangat nangkep momen pas kamu lagi ngakak lepas atau ngos-ngosan kehabisan napas di tanjakan. Ajaibnya? Sekucel dan secapek apa pun muka kamu di lapangan, hasil editannya bakal tetep keluar sekelas film cinematic jutaan dolar.',
    'https://picsum.photos/seed/bayu/600/750',
    3,
    true
  ),
  (
    'Ilham Yusuf Fihriansyah',
    'The Stealth Shooter',
    'Documentation (Photo)',
    'Kamu nggak bakal pernah denger dia teriak "Satu, dua, tiga, senyum!" karena dia murni beroperasi di jalur ghost mode. Sniper spesialis candid ini tau-tau udah dapet aja momen paling natural dan jujur pas kamu lagi nggak sadar kamera. Hasilnya? Foto-foto estetik level tinggi tanpa perlu repot mati-matian nahan gaya kaku.',
    'https://picsum.photos/seed/ilham/600/750',
    4,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  name         = EXCLUDED.name,
  nickname     = EXCLUDED.nickname,
  role         = EXCLUDED.role,
  description  = EXCLUDED.description,
  image_url    = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order,
  is_active    = EXCLUDED.is_active;
