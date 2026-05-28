import fs from 'node:fs';
import path from 'node:path';

const docsDir = path.resolve('docs');
fs.mkdirSync(docsDir, { recursive: true });

function writeSimplePdf(fileName, title, lines) {
  const objects = [];
  const add = value => {
    objects.push(value);
    return objects.length;
  };

  const safe = text => text.replace(/[()\\]/g, match => `\\${match}`);
  const content = [
    'BT',
    '/F1 18 Tf',
    '50 770 Td',
    `(${safe(title)}) Tj`,
    '/F1 11 Tf',
    '0 -28 Td',
    ...lines.flatMap(line => [`(${safe(line)}) Tj`, '0 -16 Td']),
    'ET'
  ].join('\n');

  const catalog = add('<< /Type /Catalog /Pages 2 0 R >>');
  const pages = add('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  const page = add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>');
  const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const stream = add(`<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`);

  const header = '%PDF-1.4\n';
  let body = header;
  const offsets = [0];
  [catalog, pages, page, font, stream].forEach((_, index) => {
    offsets.push(Buffer.byteLength(body));
    body += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  });
  const xrefStart = Buffer.byteLength(body);
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach(offset => {
    body += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  fs.writeFileSync(path.join(docsDir, fileName), body, 'binary');
}

writeSimplePdf('SimpleShop_Automation_Planner.pdf', 'SimpleShop Automation Planner', [
  'Project: Playwright JavaScript automation for SimpleShop.',
  'Execution: same browser tab per run with Chromium, Firefox, and WebKit projects.',
  'Coverage: authentication, product, cart, persistence, profile, shipping, support, API, payment.',
  'Evidence: Playwright HTML report, Allure report, and failed screenshots under screenshots/failed.',
  'Data: reusable test data is stored in data/testData.json.'
]);

writeSimplePdf('SimpleShop_Test_Case_Summary.pdf', 'SimpleShop Test Case Summary', [
  'Each listed module contains fifteen automated validation cases.',
  'The internal API cases call window.shopApi from the application.',
  'The playwright-report/index.html file is the final Playwright HTML report.',
  'Run command: npm run test:report.',
  'Generated PDFs intentionally follow a simple capstone-planner style.'
]);

console.log(`PDF documents generated in ${docsDir}`);
