export function drawBlurredImage(
    canvas: HTMLCanvasElement,
    imgSrc: string,
    blurStrength: number,
    onReady?: () => void
) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get canvas context");
        return;
    }

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = `blur(${blurStrength}px)`;
        ctx.drawImage(img, 0, 0);
        ctx.filter = "none";

        if (onReady) onReady();
    };
}