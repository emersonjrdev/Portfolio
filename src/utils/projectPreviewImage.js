/**
 * URL de imagem gerada a partir da demo (equivalente a um print da página inicial).
 * Serviço público; na primeira carga pode aparecer um placeholder até a captura ficar pronta.
 */
export function projectPreviewImageUrl(demoUrl, width = 1200) {
  const u = typeof demoUrl === "string" ? demoUrl.trim() : "";
  if (!u || u === "#") return null;
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(u)}?w=${width}`;
}

export function resolveProjectCardImage(project) {
  const fromDemo = projectPreviewImageUrl(project?.links?.demo);
  if (fromDemo) return fromDemo;
  const legacy = typeof project?.image === "string" ? project.image.trim() : "";
  return legacy || null;
}
