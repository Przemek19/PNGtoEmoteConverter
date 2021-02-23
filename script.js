const imageUrl = document.getElementById('imageUrl');
const imageWidthInput = document.getElementById('width');
const imageHeightInput = document.getElementById('height');
const cutsInput = document.getElementById('cuts');
const prefix = document.getElementById('prefix');

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
  drawImage(ctx, imageUrl.value, 0, 0, canvas.width, canvas.height);
}

const colors = [
  { // Red
    rgb: [200, 0, 0],
    emote: '🟥'
  },
  { // Green
    rgb: [0, 200, 0],
    emote: '🟩'
  },
  { // Blue
    rgb: [0, 0, 200],
    emote: '🅿'
  },
  { // Yellow
    rgb: [222, 222, 0],
    emote: '🟨'
  },
  { // Purple
    rgb: [172, 0, 255],
    emote: '🟪'
  },
  { // Pink
    rgb: [200, 0, 200],
    emote: '💗'
  },
  { // Cyan
    rgb: [0, 200, 255],
    emote: '🟦'
  },
  { // Orange
    rgb: [255, 128, 0],
    emote: '🟧'
  },
  { // Brown
    rgb: [128, 0, 0],
    emote: '🟫'
  },
  { // White
    rgb: [255, 255, 255],
    emote: '⬜'
  },
  { // Gray
    rgb: [200, 200, 200],
    emote: '🔲'
  },
  { // Black
    rgb: [0, 0, 0],
    emote: '⬛'
  },
]

const convertRGBToEmote = (r, g, b, a) => {
  if (a == 0) return '🦯';
  let currentEmote = ['❔', 765]; // [Emote, Color difference]
  for (let i in colors) {
    let c = colors[i];
    let difference = Math.abs(r - c.rgb[0]) + Math.abs(g - c.rgb[1]) + Math.abs(b - c.rgb[2])
    if (difference < currentEmote[1]) {
      currentEmote = [c.emote, difference];
    }
  }
  return currentEmote[0];
}

// const convertRGBToEmote = (r, g, b, a) => {
//   if (a == 0) return '🦯';
//   if (r > 150 && g > 150 && b > 150) { // White
//     return '⬜';
//   } else if (r < 100 && g > 128 && b < 128) { // Green
//     return '🟩';
//   } else if (r < 64 && g < 192 && b > 128) { // Blue
//     return '🟦';
//   } else if (r > 128 && g < 48 && b < 64) { // Red
//     return '🟥';
//   } else if (r > 192 && g < 100 && b < 150) { // Pink
//     return '💗';
//   } else if (r > 200 && g < 164 && g > 64 && b < 90) { // Orange
//     return '🟧';
//   } else if (r > 100 && g > 128 && b < 100) { // Yellow
//     return '🟨';
//   } else if (r > 160 && g > 100 && b > 64 && r < 255 && g < 230 && b < 140) { // Skin color
//     return '😀';
//   } else {
//     return '⬛';
//   }
// }

const convert = async () => {
  canvas2.width = convertX.value;
  canvas2.height = convertY.value;
  await drawImage(ctx2, imageUrl.value, 0, 0, canvas2.width, canvas2.height);

  let emotesContent = '';

  for (let y = 0; y <= canvas2.height - 1; y++) {
    for (let x = 0; x <= canvas2.width - 1; x++) {
      let RGB = ctx2.getImageData(x, y, 1, 1).data;
      emotesContent += `${prefix.value ? prefix.value : ''}${convertRGBToEmote(RGB[0], RGB[1], RGB[2], RGB[3])}`;
    }
    emotesContent += `${Number(cutsInput.value) && y % cutsInput.value == cutsInput.value - 1 ? '<br />' : ''}<br />`
  }
  resultBox.style['font-size'] = `${512 / ((canvas2.width + canvas2.height) / 2)}px`;
  resultBox.innerHTML = emotesContent;
}
/*
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜⬛⬛⬛⬜⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛⬜
⬜⬛⬜⬛⬜⬛⬜⬜⬜⬛⬜⬛⬜⬛⬜⬛⬜
⬜⬛⬛⬛⬜⬛⬛⬛⬜⬛⬜⬛⬜⬛⬜⬛⬜
⬜⬛⬜⬜⬜⬛⬜⬜⬜⬛⬜⬛⬜⬛⬜⬛⬜
⬜⬛⬜⬜⬜⬛⬛⬛⬜⬜⬛⬜⬜⬛⬛⬛⬜
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
*/