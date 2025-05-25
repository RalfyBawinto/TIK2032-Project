CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  url VARCHAR(255) NOT NULL
);


INSERT INTO articles (title, image, content, url) VALUES
('E-sport', 'e-sport.jpg', 'E-sport adalah kompetisi permainan video yang berkembang pesat dan menjadi industri besar dengan basis penggemar global.', 'https://blog.maukuliah.id/pengertian-e-sport/'),
('Blockchain', 'blockchain.jpg', 'Blockchain adalah teknologi revolusioner yang digunakan dalam cryptocurrency dan berbagai aplikasi lainnya.', 'https://bif.telkomuniversity.ac.id/apa-itu-blockchain-mengungkap-teknologi-revolusioner-di-era-digital/'),
('Cyber Security', 'cyber-security.jpeg', 'Cyber security melindungi sistem, jaringan, dan data dari berbagai ancaman digital.', 'https://www.dicoding.com/blog/cyber-security-pengertian-jenis-dan-ancamannya/'),
('Kecerdasan Buatan (AI)', 'ai.png', 'AI semakin banyak digunakan dalam berbagai aspek kehidupan, mulai dari asisten virtual hingga kendaraan otonom.', 'https://portalpublikasi.id/2023/05/13/perkembangan-teknologi-kecerdasan-buatan-artificial-intelligence-atau-ai/'),
('Universitas Sam Ratulangi', 'unsrat.jpg', 'Universitas Sam Ratulangi (Unsrat) adalah salah satu perguruan tinggi terbaik di Indonesia Timur.', 'https://www.unsrat.ac.id/profil-unversitas/')
('Talaud', 'assets/img/articles/talaud.jpg', 'Kabupaten Kepulauan Talaud adalah salah satu kabupaten di provinsi Sulawesi Utara, Indonesia, dengan ibu kota Melonguane.', 'https://id.wikipedia.org/wiki/Kabupaten_Kepulauan_Talaud');

