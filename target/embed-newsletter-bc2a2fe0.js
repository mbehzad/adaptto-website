import { a as decorateWithConsent } from './usercentrics-48d28a6b.js';
import './htmlTemplateTag-0d1de9cb.js';

/**
 * Embed Hubspot newsletter signup form.
 * @param {Element} block
 */
function decorate(block) {
  decorateWithConsent('hubspot', block, (parent) => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.type = 'text/javascript';
    script.onload = () => {
      window.hbspt.forms.create({
        portalId: '3937475',
        formId: '4d3174fb-0e39-4596-b6a8-4b63caeae340',
      });
    };
    parent.append(script);
  });
}

export { decorate as default };
