import { createHighlighter, type Highlighter } from "shiki";

/**
 * Build-time syntax highlighting. The highlighter runs only on the server (and
 * during the static export build), so no Shiki code is shipped to the browser —
 * the demo site ends up with plain pre-rendered HTML.
 */
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "html", "css"],
    });
  }
  return highlighterPromise;
}

export async function highlightToHtml(code: string, lang: string) {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    // Dark is the default inline color (the site is dark-first); the `.light`
    // override in globals.css swaps to the light theme via CSS variables.
    defaultColor: "dark",
  });
}
