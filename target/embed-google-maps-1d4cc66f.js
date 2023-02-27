import { h as html } from './htmlTemplateTag-0d1de9cb.js';
import { a as decorateWithConsent } from './usercentrics-48d28a6b.js';

/**
 * Embed Google Maps.
 * @param {Element} block
 */
function decorate(block) {
  const mapsUrl = block.querySelector('a')?.href;
  if (mapsUrl) {
    decorateWithConsent('googleMaps', block, (parent) => {
      parent.innerHTML = html`<iframe src="${mapsUrl}"
        allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">`;
    });
  }
}

export { decorate as default };
