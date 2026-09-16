import html2canvas from 'html2canvas';

/**
 * Export a DOM element as a PNG image.
 */
export async function exportElementAsPng(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    backgroundColor: '#11100C',
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**
 * Generate a safe filename from mission codename.
 */
export function generateFilename(codename: string): string {
  const safe = codename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${safe}-mission.png`;
}
