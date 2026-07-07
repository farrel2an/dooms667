const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// 1. Setel ikon di awal berdasarkan status dari skrip anti-flash di HTML
if (body.classList.contains('dark-mode')) {
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
}

// 2. Fungsi untuk mengganti class dan ikon
function switchTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (moonIcon && sunIcon) {
        moonIcon.style.display = isDark ? 'none' : 'block';
        sunIcon.style.display = isDark ? 'block' : 'none';
    }
}

// 3. Eksekusi Animasi Transisi Lingkaran
themeToggle.addEventListener('click', (e) => {
    // Fallback untuk browser lama
    if (!document.startViewTransition) {
        switchTheme();
        return;
    }

    // Ambil titik kursor
    const x = e.clientX;
    const y = e.clientY;

    // Hitung jari-jari (radius) agar lingkaran menutupi seluruh layar
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    // Mulai pergantian tema
    const transition = document.startViewTransition(() => {
        switchTheme();
    });

    // Jalankan animasi saat siap
    transition.ready.then(() => {
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`
                ],
            },
            {
                duration: 500, // Kecepatan animasi
                easing: 'ease-in-out',
                // KUNCINYA DI SINI: Kita selalu menganimasikan tampilan yang BARU
                pseudoElement: '::view-transition-new(root)',
            }
        );
    });
});