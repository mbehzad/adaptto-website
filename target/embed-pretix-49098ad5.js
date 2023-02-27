import { r as readBlockConfig, a as append } from './scripts.js';
import { h as html } from './htmlTemplateTag-0d1de9cb.js';
import { a as decorateWithConsent } from './usercentrics-48d28a6b.js';

/**
 * Embed Pretix Ticket Shop.
 * @param {Element} block
 */
function decorate(block) {
  const config = readBlockConfig(block);
  const shopUrl = config['shop-url'];
  const shopCssUrl = config['shop-css-url'];
  const scriptUrl = config['script-url'];

  if (shopUrl && shopCssUrl && scriptUrl) {
    block.innerHTML = '';

    const p = append(block, 'p');
    p.innerHTML = html`Direct link to <a href="${shopUrl}" target="_blank">adaptTo() Ticket Shop</a>.`;

    const div = append(block, 'div');

    decorateWithConsent('pretix', div, (parent) => {
      // add pretix script to HTML head
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.onload = () => {
        parent.innerHTML = html`
          <link rel="stylesheet" type="text/css" href="${shopCssUrl}">
          <pretix-widget event="${shopUrl}"></pretix-widget>
        `;
      };
      document.head.append(script);
    });
  }
}

export { decorate as default };
