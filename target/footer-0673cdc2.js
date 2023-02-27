import { g as getSiteRootPathAlsoForSpeakerPath, b as getFetchCacheOptions, a as append, d as decorateAnchors, c as addArchiveLinks } from './scripts-8e457eb3.js';

/**
 * @param {Element} footerNav
 */
function decorateFooterNav(footerNav) {
  footerNav.classList.add('section-footernav');

  // add archive links to last footernav item
  addArchiveLinks(footerNav);
}

/**
 * Replace text in text nodes.
 * @param {Element} element
 * @param {RegExp} pattern
 * @param {string} replacement
 */
function replaceInText(element, pattern, replacement) {
  Array.from(element.childNodes).forEach((node) => {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        replaceInText(node, pattern, replacement);
        break;
      case Node.TEXT_NODE:
        node.textContent = node.textContent.replace(pattern, replacement);
        break;
    }
  });
}

/**
 * @param {Element} footerText
 */
function decorateFooterText(footerText) {
  footerText.classList.add('section-footertext');

  // replace placeholder for current year
  replaceInText(footerText, /\$currentYear\$/g, new Date().getFullYear());
}

/**
 * Loads and decorates footer and footer navigation.
 * @param {Element} block The footer block element
 */
async function decorate(block) {
  block.textContent = '';

  // detect site root
  // for speaker pages, this year may be derived from hash, or from latest speaker's talk
  const siteRoot = await getSiteRootPathAlsoForSpeakerPath(
    window.location.pathname,
    window.location.hash,
  );

  // fetch footer content
  const resp = await fetch(`${siteRoot}footer.plain.html`, getFetchCacheOptions());
  if (resp.ok) {
    const html = await resp.text();
    const container = append(block, 'div');
    container.innerHTML = html;
    decorateAnchors(container);

    // first section: footer navigation
    const footerNav = container.children[0];
    if (footerNav) {
      decorateFooterNav(footerNav);
    }

    // second section: footer text
    const footerText = container.children[1];
    if (footerText) {
      decorateFooterText(footerText);
    }
  }
}

export { decorate as default };
