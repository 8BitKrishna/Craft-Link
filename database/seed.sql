-- KarigarSetu Seed Data for Supabase PostgreSQL (SIH 2026)

INSERT INTO public.products (
    id, artisan_id, artisan_name, title, description, short_description,
    category, craft_type, material, colors, region, state, price,
    tags, buyer_segments, craft_story, image_url, status, ai_generated, views
) VALUES
(
    'prod-blue-pottery-01',
    'artisan-ramesh-01',
    'Ramesh Kumawat (Jaipur, Rajasthan)',
    'Jaipur Handcrafted Blue Pottery Floral Peacock Vase',
    'A magnificent 10-inch decorative vase hand-painted in traditional cobalt blue and turquoise hues, crafted using Jaipur''s iconic blue pottery technique. Made with crushed quartz, Fuller''s earth, and glass frit rather than conventional clay, this piece is fired at low temperatures to produce an eye-catching glazed finish adorned with delicate peacock and floral arabesque motifs.',
    'Authentic 10-inch glazed quartz vase with hand-painted peacock motifs from Jaipur, Rajasthan.',
    'Home Decor',
    'Blue Pottery',
    'Quartz, Glass Frit & Natural Glaze',
    '["Cobalt Blue", "Turquoise", "White", "Golden Yellow"]'::jsonb,
    'Jaipur, Shekhawati',
    'Rajasthan',
    1850.00,
    '["handmade", "blue pottery", "rajasthan craft", "home decor", "traditional vase"]'::jsonb,
    '["Home Decor Buyers", "Interior Designers", "Gift Shoppers", "Boutique Retailers"]'::jsonb,
    'Ramesh Kumawat is a 4th-generation master craftsman from Kot Jewar village near Jaipur. Practicing the centuries-old Persian-origin art revived by Maharaja Sawai Ram Singh II, Ramesh still mixes natural copper oxides and quartz by hand.',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'published',
    true,
    142
),
(
    'prod-pashmina-02',
    'artisan-ghulam-02',
    'Ghulam Hassan Mir (Srinagar, Kashmir)',
    'Kashmiri Handwoven Pashmina Sozni Needlework Shawl',
    'Spun from pure Grade-A Changthangi Himalayan cashmere wool, this featherlight Pashmina wrap is painstakingly hand-embroidered with micro-needle Sozni floral vines. Taking over 180 hours of patient artisan craftsmanship, it offers unmatched warmth and heirloom royal elegance.',
    'Pure Grade-A cashmere handwoven Pashmina shawl with intricate Sozni needle embroidery.',
    'Apparel & Accessories',
    'Pashmina Weaving & Sozni',
    'Changthangi Cashmere Wool & Silk Floss',
    '["Warm Ivory", "Crimson Red", "Ochre Gold"]'::jsonb,
    'Kashmir Valley',
    'Jammu & Kashmir',
    12500.00,
    '["pashmina", "cashmere", "kashmir shawl", "sozni embroidery", "luxury textile"]'::jsonb,
    '["Luxury Fashion Boutiques", "Winter Apparel Collectors", "High-End Gift Buyers"]'::jsonb,
    'Ghulam Hassan works from a sunlit atelier on the banks of Jhelum in Downtown Srinagar, preserving centuries of spinning on traditional Yender wheels.',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    'published',
    true,
    285
);
