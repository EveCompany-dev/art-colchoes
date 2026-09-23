// Gera versões web (webp) das fotos enviadas pelo cliente e o logo com fundo transparente.
import sharp from "sharp";
import path from "node:path";

const src = path.resolve("..");
const out = path.resolve("public/img");

const photos = [
  ["IMG_1945 - Brusque Colchões.jpg", "showroom-dense"],
  ["IMG_6149 - Brusque Colchões.jpg", "showroom-cure"],
  ["IMG_6794 - Brusque Colchões.jpg", "fachada"],
  ["IMG_7267 - Brusque Colchões.jpg", "fachada-vertical"],
];

for (const [file, name] of photos) {
  for (const w of [960, 1920]) {
    await sharp(path.join(src, file)).rotate().resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
}

// Logo: recorta a área do texto e converte preto -> alfa (versões preta e branca)
const logoSrc = path.join(src, "art.pdf - Brusque Colchões.jpg");
const crop = { left: 360, top: 620, width: 1280, height: 400 };
const meta = await sharp(logoSrc).metadata();
console.log("logo size", meta.width, meta.height);
const { data, info } = await sharp(logoSrc).extract(crop).greyscale().raw().toBuffer({ resolveWithObject: true });
for (const [name, rgb] of [["logo-dark", [11, 22, 48]], ["logo-light", [255, 255, 255]]]) {
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    rgba[i * 4] = rgb[0]; rgba[i * 4 + 1] = rgb[1]; rgba[i * 4 + 2] = rgb[2];
    rgba[i * 4 + 3] = 255 - data[i];
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim().resize({ width: 800 }).png().toFile(path.join(out, `${name}.png`));
}
console.log("ok");
