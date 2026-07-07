const images = [
    'img/pp-1.jpeg',
    'img/pp-2.jpg',
    'img/pp-3.jpeg',
    'img/pp-4.jpeg',
];

let currentIndex = 0;
const canvas = document.getElementById('pixel-avatar');
const ctx = canvas.getContext('2d');


canvas.width = 210;
canvas.height = 260;

ctx.imageSmoothingEnabled = false;

function drawPixelated() {
    const img = new Image();
    img.src = images[currentIndex];
    
    img.onload = () => {
        const scaleFactor = 0.10; 
        const scaledWidth = canvas.width * scaleFactor;
        const scaledHeight = canvas.height * scaleFactor;
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
        ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, canvas.width, canvas.height);
    };
}

function autoRotateImages() {
    currentIndex = (currentIndex + 1) % images.length;
    drawPixelated();
}
drawPixelated();
setInterval(autoRotateImages, 500);