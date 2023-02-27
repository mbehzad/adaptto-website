import { a as append, w as getParentPath, x as getSchedulePath } from './scripts-8e457eb3.js';

/**
 * Talk Detail footer with back to schedule link.
 * @param {Element} block
 */
async function decorate(block) {
  const p = append(block, 'p');

  const parentPath = getParentPath(document.location.pathname);
  const schedulePath = getSchedulePath(document.location.pathname);

  const backLink = append(p, 'a');
  backLink.href = parentPath;
  if (parentPath === schedulePath) {
    backLink.textContent = 'Back to schedule';
  } else {
    backLink.textContent = 'Back to parent';
  }
}

export { decorate as default };
