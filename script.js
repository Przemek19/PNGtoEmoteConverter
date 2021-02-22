const imageUrl = document.getElementById('imageUrl');
const imageWidthInput = document.getElementById('width');
const imageHeightInput = document.getElementById('height');
const cutsInput = document.getElementById('cuts');

const convertX = document.getElementById('x');
const convertY = document.getElementById('y');

const resultBox = document.getElementById('result');

const canvas = document.getElementById('image');
const canvas2 = document.getElementById('pixeledImage');
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");

const drawImage = async (ctx, url, x, y, width, height) => {
  return new Promise(resolve => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      ctx.drawImage(image, x, y, width, height);
      resolve();
    }
  });
}

const clearCanvas = (canvas) => {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

const loadImage = () => {
  clearCanvas(canvas);
  canvas.width = imageWidthInput.value;
  canvas.height = imageHeightInput.value;
  canvas2.width = imageWidthInput.value;
  canvas2.height = imageHeightInput.value;
  drawImage(ctx, imageUrl.value, 0, 0, imageWidthInput.value, imageHeightInput.value);
}

const convertRGBToEmote = (r, g, b, a) => {
  if (a == 0) return '🦴';
  if (r > 150 && g > 150 && b > 150) { // White
    return '⬜';
  } else if (r < 100 && g > 128 && b < 128) { // Green
    return '🟩';
  } else if (r < 32 && g < 128 && b > 128) { // Blue
    return '🟦';
  } else if (r > 128 && g < 48 && b > 48) { // Red
    return '🟥';
  } else {
    return '⬛';
  }
}
const convert = async () => {
  canvas2.width = convertX.value;
  canvas2.height = convertY.value;
  await drawImage(ctx2, imageUrl.value, 0, 0, canvas2.width, canvas2.height);

  let emotesContent = '';

  for (let y = 0; y <= canvas2.height - 1; y++) {
    for (let x = 0; x <= canvas2.width - 1; x++) {
      let RGB = ctx2.getImageData(x, y, 1, 1).data;
      emotesContent += convertRGBToEmote(RGB[0], RGB[1], RGB[2], RGB[3]);
    }
    emotesContent += `${Number(cutsInput.value) && y % cutsInput.value == cutsInput.value - 1 ? '<br />' : ''}<br />`
  }
  resultBox.innerHTML = emotesContent;
}