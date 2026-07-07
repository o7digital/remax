import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "public/user-guide");
mkdirSync(outDir, { recursive: true });

const A4 = { w: 595.28, h: 841.89 };
const margin = 42;

const chapters = [
  {
    number: "01",
    title: "Panel de control",
    description: "Consulta de un vistazo el inventario, las propiedades activas, el equipo y la actividad reciente.",
    image: resolve(outDir, "properties.jpg"),
    steps: [
      "Utiliza el menú izquierdo para abrir cada módulo.",
      "Revisa los indicadores superiores antes de entrar al detalle.",
      "Haz clic en una propiedad, cliente o contacto para consultar su ficha.",
      "Usa los filtros y la búsqueda para reducir los resultados."
    ]
  },
  {
    number: "02",
    title: "Pipeline comercial",
    description: "Gestiona las operaciones inmobiliarias en Kanban, lista o forecast.",
    image: resolve(outDir, "pipeline.jpg"),
    steps: [
      "Selecciona el workflow en el desplegable superior derecho.",
      "Alterna entre Kanban, Lista y Forecast según la tarea.",
      "Filtra por owner, estado o IA Pulse.",
      "En Kanban, arrastra una operación a otra columna para cambiar su etapa.",
      "Abre una tarjeta para editar cliente, monto, owner, fecha y etapa."
    ]
  },
  {
    number: "03",
    title: "Workflows y etapas",
    description: "Crea procesos comerciales adaptados al negocio y configura sus probabilidades.",
    image: resolve(outDir, "workflow-editor.jpg"),
    steps: [
      "Pulsa Gestionar workflow para editar el proceso seleccionado.",
      "Cambia el nombre del workflow o añade una nueva etapa.",
      "Define cada etapa como Abierto, Ganado o Perdido.",
      "Asigna una probabilidad entre 0 % y 100 %.",
      "Arrastra las etapas para reordenarlas y pulsa Guardar."
    ]
  },
  {
    number: "04",
    title: "Forecast mensual",
    description: "Planifica los cierres por mes y visualiza los importes previstos.",
    image: resolve(outDir, "forecast.jpg"),
    steps: [
      "Selecciona Forecast en la cabecera del pipeline.",
      "Elige el año que deseas analizar.",
      "Revisa el número de operaciones y los importes de cada mes.",
      "Arrastra una tarjeta a otro mes para modificar su fecha prevista de cierre.",
      "Abre la tarjeta para consultar o editar el detalle."
    ]
  }
];

function jpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { h: buffer.readUInt16BE(offset + 5), w: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error("Could not read JPEG size");
}

function clean(text) {
  return String(text)
    .normalize("NFC")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-");
}

function esc(text) {
  return clean(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text, maxChars) {
  const words = clean(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

class Pdf {
  objects = [];
  pages = [];
  images = [];

  addObject(body) {
    this.objects.push(body);
    return this.objects.length;
  }

  addImage(path) {
    const data = readFileSync(path);
    const size = jpegSize(data);
    const id = this.addObject({
      binary: true,
      header: `<< /Type /XObject /Subtype /Image /Width ${size.w} /Height ${size.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${data.length} >>`,
      data
    });
    const name = `Im${this.images.length + 1}`;
    this.images.push({ id, name, ...size });
    return this.images.at(-1);
  }

  addPage(commands, resources = "") {
    const stream = Buffer.from(commands.join("\n"), "latin1");
    const contentId = this.addObject({
      binary: true,
      header: `<< /Length ${stream.length} >>`,
      data: stream
    });
    this.pages.push({ contentId, resources });
  }

  render() {
    const fontRegular = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const fontBold = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const pageIds = this.pages.map((page) => {
      const resources = `<< /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> ${page.resources} >>`;
      return this.addObject(`<< /Type /Page /Parent PAGES 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] /Resources ${resources} /Contents ${page.contentId} 0 R >>`);
    });
    const pagesId = this.addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
    const catalogId = this.addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

    const chunks = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary")];
    const offsets = [0];
    this.objects.forEach((body, index) => {
      offsets.push(Buffer.concat(chunks).length);
      const objectNumber = index + 1;
      let chunk;
      const textBody = typeof body === "string" ? body.replace("PAGES 0 R", `${pagesId} 0 R`) : null;
      if (body?.binary) {
        chunk = Buffer.concat([
          Buffer.from(`${objectNumber} 0 obj\n${body.header}\nstream\n`, "latin1"),
          body.data,
          Buffer.from("\nendstream\nendobj\n", "latin1")
        ]);
      } else {
        chunk = Buffer.from(`${objectNumber} 0 obj\n${textBody}\nendobj\n`, "latin1");
      }
      chunks.push(chunk);
    });
    const xref = Buffer.concat(chunks).length;
    const xrefLines = ["xref", `0 ${this.objects.length + 1}`, "0000000000 65535 f "];
    for (let i = 1; i < offsets.length; i += 1) {
      xrefLines.push(`${String(offsets[i]).padStart(10, "0")} 00000 n `);
    }
    chunks.push(Buffer.from(`${xrefLines.join("\n")}\ntrailer\n<< /Size ${this.objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`, "latin1"));
    return Buffer.concat(chunks);
  }
}

function text(cmds, value, x, y, size = 12, bold = false, color = "172033") {
  const [r, g, b] = color.match(/../g).map((v) => parseInt(v, 16) / 255);
  cmds.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
  cmds.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${esc(value)}) Tj ET`);
}

function multiline(cmds, value, x, y, size, maxChars, leading, bold = false, color = "172033") {
  let cursor = y;
  for (const line of wrap(value, maxChars)) {
    text(cmds, line, x, cursor, size, bold, color);
    cursor -= leading;
  }
  return cursor;
}

const pdf = new Pdf();
const imageRefs = chapters.map((chapter) => pdf.addImage(chapter.image));

{
  const c = [];
  c.push("0.055 0.114 0.200 rg 0 0 595.28 841.89 re f");
  c.push("0.090 0.250 0.470 rg 0 0 595.28 330 re f");
  text(c, "REMAX", margin, 760, 36, true, "ffffff");
  text(c, "Activa", margin + 2, 730, 25, true, "4ea0ff");
  text(c, "GUIA DE USUARIO", margin, 650, 12, true, "9fc4f4");
  multiline(c, "Todo lo necesario para trabajar en REMAX Activa", margin, 600, 38, 24, 42, true, "ffffff");
  multiline(c, "Manual practico en espanol para operar el panel, el pipeline comercial, workflows y forecast mensual.", margin, 460, 15, 62, 20, false, "dce8fb");
  text(c, "Plataforma operativa inmobiliaria", margin, 120, 13, true, "ffffff");
  text(c, "Version Julio 2026", margin, 96, 11, false, "b8c9df");
  pdf.addPage(c);
}

{
  const c = [];
  text(c, "Inicio rapido", margin, 780, 11, true, "315f9e");
  text(c, "Contenido de la guia", margin, 742, 30, true);
  multiline(c, "Esta guia resume los flujos principales para que el equipo trabaje con seguridad y rapidez dentro de REMAX Activa.", margin, 708, 13, 75, 18, false, "58708f");
  let y = 640;
  for (const chapter of chapters) {
    c.push("0.965 0.984 1 rg 42 " + (y - 66) + " 511 78 re f");
    c.push("0.820 0.890 0.970 RG 42 " + (y - 66) + " 511 78 re S");
    text(c, chapter.number, 62, y - 8, 18, true, "1d4f91");
    text(c, chapter.title, 108, y, 20, true);
    multiline(c, chapter.description, 108, y - 25, 11, 58, 15, false, "58708f");
    y -= 104;
  }
  pdf.addPage(c);
}

chapters.forEach((chapter, index) => {
  const c = [];
  const img = imageRefs[index];
  text(c, chapter.number, margin, 786, 18, true, "1d4f91");
  text(c, chapter.title, 86, 786, 28, true);
  multiline(c, chapter.description, 86, 758, 12, 68, 16, false, "58708f");

  const box = { x: margin, y: 392, w: A4.w - margin * 2, h: 320 };
  const scale = Math.min(box.w / img.w, box.h / img.h);
  const iw = img.w * scale;
  const ih = img.h * scale;
  const ix = box.x + (box.w - iw) / 2;
  const iy = box.y + (box.h - ih) / 2;
  c.push("0.930 0.965 1 rg 42 382 511 340 re f");
  c.push("0.780 0.850 0.940 RG 42 382 511 340 re S");
  c.push(`q ${iw.toFixed(2)} 0 0 ${ih.toFixed(2)} ${ix.toFixed(2)} ${iy.toFixed(2)} cm /${img.name} Do Q`);
  text(c, "Captura de pantalla de la plataforma REMAX Activa.", margin, 366, 10, false, "6f83a0");

  text(c, "Pasos recomendados", margin, 324, 16, true);
  let y = 296;
  chapter.steps.forEach((step, stepIndex) => {
    y = multiline(c, `${stepIndex + 1}. ${step}`, margin + 10, y, 12, 78, 16, false, "24364d");
    y -= 2;
  });
  text(c, "REMAX Activa - Guia de usuario", margin, 36, 9, false, "8a99ad");
  const resources = `/XObject << /${img.name} ${img.id} 0 R >>`;
  pdf.addPage(c, resources);
});

const pdfPath = resolve(outDir, "guia-usuario-remax-activa.pdf");
writeFileSync(pdfPath, pdf.render());
console.log(`Generated ${pdfPath}`);
