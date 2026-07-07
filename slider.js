// Cari semua kotak karya yang memiliki slider
const allFeaturedArtworks = document.querySelectorAll('.featured-artwork');

allFeaturedArtworks.forEach(artwork => {
    const track = artwork.querySelector('.slider-track');
    const slides = artwork.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Cari tombol prev dan next khusus di dalam karya ini saja
    const prevBtn = artwork.querySelector('.prev-btn');
    const nextBtn = artwork.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalDuration = 3000; // 3 detik

    // Jika tidak ada slider-track (misal karyanya cuma 1 foto), hentikan proses untuk karya ini
    if (!track || totalSlides === 0) return;

    function moveSlide(direction) {
        currentSlide += direction;

        // Looping
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        const translateX = -(currentSlide * 100);
        track.style.transform = `translateX(${translateX}%)`;

        resetInterval();
    }

    function startInterval() {
        slideInterval = setInterval(() => {
            moveSlide(1);
        }, intervalDuration);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Pasang fungsi klik ke tombol panah
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            moveSlide(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveSlide(1);
        });
    }

    // Mulai auto-slide untuk karya ini
    startInterval();
});