function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case '../blocks/embed-google-maps/embed-google-maps.js': return import('./embed-google-maps-1d4cc66f.js');
    case '../blocks/embed-newsletter/embed-newsletter.js': return import('./embed-newsletter-bc2a2fe0.js');
    case '../blocks/embed-pretix/embed-pretix.js': return import('./embed-pretix-9742cfa0.js');
    case '../blocks/embed-youtube/embed-youtube.js': return import('./embed-youtube-db57ec81.js');
    case '../blocks/footer/footer.js': return import('./footer-0673cdc2.js');
    case '../blocks/fragment/fragment.js': return import('./fragment-a9e5de95.js');
    case '../blocks/header/header.js': return import('./header-1fa124b7.js');
    case '../blocks/image-gallery/image-gallery.js': return import('./image-gallery-70a45fa7.js');
    case '../blocks/schedule/schedule.js': return import('./schedule-856a1a17.js');
    case '../blocks/social-teaser/social-teaser.js': return import('./social-teaser-4ed993c7.js');
    case '../blocks/speaker-detail/speaker-detail.js': return import('./speaker-detail-b312bdb6.js');
    case '../blocks/speaker-gallery/speaker-gallery.js': return import('./speaker-gallery-c94161b4.js');
    case '../blocks/sponsor-teaser/sponsor-teaser.js': return import('./sponsor-teaser-4ed993c7.js');
    case '../blocks/stage-header/stage-header.js': return import('./stage-header-ede74ac8.js');
    case '../blocks/talk-archive/talk-archive.js': return import('./talk-archive-f864f363.js');
    case '../blocks/talk-detail-after-outline/talk-detail-after-outline.js': return import('./talk-detail-after-outline-45812c30.js');
    case '../blocks/talk-detail-before-outline/talk-detail-before-outline.js': return import('./talk-detail-before-outline-528e0aa7.js');
    case '../blocks/talk-detail-footer/talk-detail-footer.js': return import('./talk-detail-footer-daa283a5.js');
    case '../blocks/teaser-bar/teaser-bar.js': return import('./teaser-bar-12a0e192.js');
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case '../blocks/embed-google-maps/embed-google-maps.css': return import('./embed-google-maps-27abe146.js');
    case '../blocks/embed-newsletter/embed-newsletter.css': return import('./embed-newsletter-2c119a33.js');
    case '../blocks/embed-pretix/embed-pretix.css': return import('./embed-pretix-ca16d38d.js');
    case '../blocks/embed-youtube/embed-youtube.css': return import('./embed-youtube-f05619b6.js');
    case '../blocks/footer/footer.css': return import('./footer-f3c7cbf3.js');
    case '../blocks/fragment/fragment.css': return import('./fragment-4ed993c7.js');
    case '../blocks/header/header.css': return import('./header-9841f843.js');
    case '../blocks/image-gallery/image-gallery.css': return import('./image-gallery-93ca201e.js');
    case '../blocks/schedule/schedule.css': return import('./schedule-f5444d4c.js');
    case '../blocks/social-teaser/social-teaser.css': return import('./social-teaser-982c9ef3.js');
    case '../blocks/speaker-detail/speaker-detail.css': return import('./speaker-detail-150e7655.js');
    case '../blocks/speaker-gallery/speaker-gallery.css': return import('./speaker-gallery-fea1f282.js');
    case '../blocks/sponsor-teaser/sponsor-teaser.css': return import('./sponsor-teaser-739be192.js');
    case '../blocks/stage-header/stage-header.css': return import('./stage-header-c21ea814.js');
    case '../blocks/talk-archive/talk-archive.css': return import('./talk-archive-1e4a1224.js');
    case '../blocks/talk-detail-after-outline/talk-detail-after-outline.css': return import('./talk-detail-after-outline-e1742145.js');
    case '../blocks/talk-detail-before-outline/talk-detail-before-outline.css': return import('./talk-detail-before-outline-a7610a3c.js');
    case '../blocks/talk-detail-footer/talk-detail-footer.css': return import('./talk-detail-footer-4ed993c7.js');
    case '../blocks/teaser-bar/teaser-bar.css': return import('./teaser-bar-01f1d9e2.js');
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * log RUM if part of the sample.
 * @param {string} checkpoint identifies the checkpoint in funnel
 * @param {Object} data additional data for RUM sample
 */
function sampleRUM(checkpoint, data = {}) {
  sampleRUM.defer = sampleRUM.defer || [];
  const defer = (fnname) => {
    sampleRUM[fnname] = sampleRUM[fnname]
      || ((...args) => sampleRUM.defer.push({ fnname, args }));
  };
  sampleRUM.drain = sampleRUM.drain
    || ((dfnname, fn) => {
      sampleRUM[dfnname] = fn;
      sampleRUM.defer
        .filter(({ fnname }) => dfnname === fnname)
        .forEach(({ fnname, args }) => sampleRUM[fnname](...args));
    });
  sampleRUM.on = (chkpnt, fn) => { sampleRUM.cases[chkpnt] = fn; };
  defer('observe');
  defer('cwv');
  try {
    window.hlx = window.hlx || {};
    if (!window.hlx.rum) {
      const usp = new URLSearchParams(window.location.search);
      const weight = (usp.get('rum') === 'on') ? 1 : 100; // with parameter, weight is 1. Defaults to 100.
      // eslint-disable-next-line no-bitwise
      const hashCode = (s) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
      const id = `${hashCode(window.location.href)}-${new Date().getTime()}-${Math.random().toString(16).substr(2, 14)}`;
      const random = Math.random();
      const isSelected = (random * weight < 1);
      // eslint-disable-next-line object-curly-newline
      window.hlx.rum = { weight, id, random, isSelected, sampleRUM };
    }
    const { weight, id } = window.hlx.rum;
    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const sendPing = (pdata = data) => {
        // eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
        const body = JSON.stringify({ weight, id, referer: window.location.href, generation: window.hlx.RUM_GENERATION, checkpoint, ...data });
        const url = `https://rum.hlx.page/.rum/${weight}`;
        // eslint-disable-next-line no-unused-expressions
        navigator.sendBeacon(url, body);
        // eslint-disable-next-line no-console
        console.debug(`ping:${checkpoint}`, pdata);
      };
      sampleRUM.cases = sampleRUM.cases || {
        cwv: () => sampleRUM.cwv(data) || true,
        lazy: () => {
          // use classic script to avoid CORS issues
          const script = document.createElement('script');
          script.src = 'https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js';
          document.head.appendChild(script);
          return true;
        },
      };
      sendPing(data);
      if (sampleRUM.cases[checkpoint]) { sampleRUM.cases[checkpoint](); }
    }
  } catch (error) {
    // something went wrong
  }
}

/**
 * Retrieves the content of metadata tags.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value(s)
 */
function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || '';
}

/**
 * Sanitizes a name for use as class name.
 * @param {string} name The unsanitized name
 * @returns {string} The class name
 */
function toClassName(name) {
  return typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : '';
}

/*
 * Sanitizes a name for use as a js property name.
 * @param {string} name The unsanitized name
 * @returns {string} The camelCased name
 */
function toCamelCase(name) {
  return toClassName(name).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} element
 */
function decorateIcons(element = document) {
  element.querySelectorAll('span.icon').forEach(async (span) => {
    if (span.classList.length < 2 || !span.classList[1].startsWith('icon-')) {
      return;
    }
    const icon = span.classList[1].substring(5);
    // eslint-disable-next-line no-use-before-define
    const resp = await fetch(`${window.hlx.codeBasePath}/icons/${icon}.svg`);
    if (resp.ok) {
      const iconHTML = await resp.text();
      if (iconHTML.match(/<style/i)) {
        const img = document.createElement('img');
        img.src = `data:image/svg+xml,${encodeURIComponent(iconHTML)}`;
        span.appendChild(img);
      } else {
        span.innerHTML = iconHTML;
      }
    }
  });
}

/**
 * Decorates a block.
 * @param {Element} block The block element
 */
function decorateBlock(block) {
  const shortBlockName = block.classList[0];
  if (shortBlockName) {
    block.classList.add('block');
    block.setAttribute('data-block-name', shortBlockName);
    block.setAttribute('data-block-status', 'initialized');
    const blockWrapper = block.parentElement;
    blockWrapper.classList.add(`${shortBlockName}-wrapper`);
    const section = block.closest('.section');
    if (section) section.classList.add(`${shortBlockName}-container`);
  }
}

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
function readBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope>div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const col = cols[1];
        const name = toClassName(cols[0].textContent);
        let value = '';
        if (col.querySelector('a')) {
          const as = [...col.querySelectorAll('a')];
          if (as.length === 1) {
            value = as[0].href;
          } else {
            value = as.map((a) => a.href);
          }
        } else if (col.querySelector('img')) {
          const imgs = [...col.querySelectorAll('img')];
          if (imgs.length === 1) {
            value = imgs[0].src;
          } else {
            value = imgs.map((img) => img.src);
          }
        } else if (col.querySelector('p')) {
          const ps = [...col.querySelectorAll('p')];
          if (ps.length === 1) {
            value = ps[0].textContent;
          } else {
            value = ps.map((p) => p.textContent);
          }
        } else value = row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Decorates all sections in a container element.
 * @param {Element} $main The container element
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.setAttribute('data-section-status', 'initialized');

    /* process section metadata */
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          const styles = meta.style.split(',').map((style) => toClassName(style.trim()));
          styles.forEach((style) => section.classList.add(style));
        } else {
          section.dataset[toCamelCase(key)] = meta[key];
        }
      });
      sectionMeta.parentNode.remove();
    }
  });
}

/**
 * Updates all section status in a container element.
 * @param {Element} main The container element
 */
function updateSectionsStatus(main) {
  const sections = [...main.querySelectorAll(':scope > div.section')];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const status = section.getAttribute('data-section-status');
    if (status !== 'loaded') {
      const loadingBlock = section.querySelector('.block[data-block-status="initialized"], .block[data-block-status="loading"]');
      if (loadingBlock) {
        section.setAttribute('data-section-status', 'loading');
        break;
      } else {
        section.setAttribute('data-section-status', 'loaded');
      }
    }
  }
}

/**
 * Decorates all blocks in a container element.
 * @param {Element} main The container element
 */
function decorateBlocks(main) {
  main
    .querySelectorAll('div.section > div > div')
    .forEach(decorateBlock);
}

/**
 * Builds a block DOM Element from a two dimensional array
 * @param {string} blockName name of the block
 * @param {any} content two dimensional array or string or object of content
 */
function buildBlock(blockName, content) {
  const table = Array.isArray(content) ? content : [[content]];
  const blockEl = document.createElement('div');
  // build image block nested div structure
  blockEl.classList.add(blockName);
  table.forEach((row) => {
    const rowEl = document.createElement('div');
    row.forEach((col) => {
      const colEl = document.createElement('div');
      const vals = col.elems ? col.elems : [col];
      vals.forEach((val) => {
        if (val) {
          if (typeof val === 'string') {
            colEl.innerHTML += val;
          } else {
            colEl.appendChild(val);
          }
        }
      });
      rowEl.appendChild(colEl);
    });
    blockEl.appendChild(rowEl);
  });
  return (blockEl);
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} block The block element
 */
async function loadBlock(block) {
  const status = block.getAttribute('data-block-status');
  if (status !== 'loading' && status !== 'loaded') {
    block.setAttribute('data-block-status', 'loading');
    const blockName = block.getAttribute('data-block-name');
    try {
      const cssLoaded = __variableDynamicImportRuntime0__(`../blocks/${blockName}/${blockName}.css`, { assert: { type: 'css' }}).then(({ default: sheet }) => {
        // if import assertion is run natively in a browser supporting it,
        // the imported module will be StyleSheet.
        // if run via bundler, it will automatically create the style tag and return `undefined`
        if (sheet instanceof CSSStyleSheet) { document.adoptedStyleSheets = [sheet]; }
      });
      const decorationComplete = new Promise((resolve) => {
        (async () => {
          try {
            const mod = await __variableDynamicImportRuntime1__(`../blocks/${blockName}/${blockName}.js`);
            if (mod.default) {
              await mod.default(block);
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`failed to load module for ${blockName}`, error);
          }
          resolve();
        })();
      });
      await Promise.all([cssLoaded, decorationComplete]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`failed to load block ${blockName}`, error);
    }
    block.setAttribute('data-block-status', 'loaded');
  }
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} main The container element
 */
async function loadBlocks(main) {
  updateSectionsStatus(main);
  const blocks = [...main.querySelectorAll('div.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(blocks[i]);
    updateSectionsStatus(main);
  }
}

/**
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 */
function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }]) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}

/**
 * Set template (page structure) and theme (page styles).
 */
function decorateTemplateAndTheme() {
  const addClasses = (elem, classes) => {
    classes.split(',').forEach((v) => {
      elem.classList.add(toClassName(v.trim()));
    });
  };
  const template = getMetadata('template');
  if (template) addClasses(document.body, template);
  const theme = getMetadata('theme');
  if (theme) addClasses(document.body, theme);
}

/**
 * load LCP block and/or wait for LCP in default content.
 */
async function waitForLCP(lcpBlocks) {
  const block = document.querySelector('.block');
  const hasLCPBlock = (block && lcpBlocks.includes(block.getAttribute('data-block-name')));
  if (hasLCPBlock) await loadBlock(block);

  document.querySelector('body').classList.add('appear');
  const lcpCandidate = document.querySelector('main img');
  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', resolve);
      lcpCandidate.addEventListener('error', resolve);
    } else {
      resolve();
    }
  });
}

/**
 * loads a block named 'header' into header
 */
function loadHeader(header) {
  const headerBlock = buildBlock('header', '');
  header.append(headerBlock);
  decorateBlock(headerBlock);
  return loadBlock(headerBlock);
}

/**
 * loads a block named 'footer' into footer
 */
function loadFooter(footer) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}

/**
 * setup block utils
 */
function setup() {
  window.hlx = window.hlx || {};
  window.hlx.codeBasePath = '';
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';

  const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]');
  if (scriptEl) {
    try {
      [window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split('/scripts/scripts.js');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

/**
 * auto init
 */
function init() {
  setup();
  sampleRUM('top');

  window.addEventListener('load', () => sampleRUM('load'));

  window.addEventListener('unhandledrejection', (event) => {
    sampleRUM('error', { source: event.reason.sourceURL, target: event.reason.line });
  });

  window.addEventListener('error', (event) => {
    sampleRUM('error', { source: event.filename, target: event.lineno });
  });
}

init();

const adaptToSiteUrlRegex = /^https?:\/\/([^/.]+--adaptto-website--adaptto.hlx.(page|live)|adapt.to|localhost:\d+)(\/.+)$/;
const adaptToSiteUrlPathnameGroup = 3;
const downloadUrlRegex = /^.+\.(pdf|zip)$/;

/**
 * Encapsulates a link URL to inspect it parts.
 */
class Link {
  /**
   * @param {string} url URL (with or without host name).
   */
  constructor(url) {
    this.url = url;
    this.adaptToSiteUrlMatch = this.url.match(adaptToSiteUrlRegex);
  }

  /**
   * @returns {boolean} true if URL points to adaptTo() site.
   */
  isAdaptToSiteUrl() {
    return this.adaptToSiteUrlMatch != null;
  }

  /**
   * @returns {string} Local path to adaptTo() site without host name.
   */
  getAdaptToSiteUrlPath() {
    return this.adaptToSiteUrlMatch[adaptToSiteUrlPathnameGroup];
  }

  /**
   * @returns {boolean} true if URL points to a download file.
   */
  isDownload() {
    return this.url.match(downloadUrlRegex) != null;
  }
}

/**
 * Decorates anchor and Link URL:
 * - Rewrites Link url using rewriteUrl
 * - Sets target='_blank' for external links
 * - Applies download attribute for download links
 * @param {Element} a Anchor to decorate
 * @returns {Element} Anchor element
 */
function decorateAnchor(a) {
  const url = a.href;
  if (url) {
    const link = new Link(url);
    if (link.isAdaptToSiteUrl()) {
      a.href = link.getAdaptToSiteUrlPath();
      if (link.isDownload()) {
        a.setAttribute('download', '');
      }
    } else {
      a.target = '_blank';
    }
  }
  return a;
}

/**
 * Decorates all anchors in given container.
 * @param {Element} container The container element
 */
function decorateAnchors(container) {
  container.querySelectorAll('a').forEach((a) => decorateAnchor(a));
}

/**
 * Creates a new document element.
 * @param {Document} document
 * @param {string} tagName
 * @param {string[]} classNames
 * @returns {Element} Created element
 */
function create(document, tagName, ...classNames) {
  const el = document.createElement(tagName);
  if (classNames && classNames.length > 0) {
    el.classList.add(...classNames);
  }
  return el;
}

/**
 * Creates a new document element and appends it to given parent.
 * @param {Element} parentElement
 * @param {string} tagName
 * @param {string[]} classNames
 * @returns {Element} Created element
 */
function append(parentElement, tagName, ...classNames) {
  const el = create(parentElement.ownerDocument, tagName, ...classNames);
  parentElement.append(el);
  return el;
}

/**
 * Creates a new document element and prepends it to given parent.
 * @param {Element} parentElement
 * @param {string} tagName
 * @param {string[]} classNames
 * @returns {Element} Created element
 */
function prepend(parentElement, tagName, ...classNames) {
  const el = create(parentElement.ownerDocument, tagName, ...classNames);
  parentElement.prepend(el);
  return el;
}

/**
 * Detects the navigation type of the current page in browser.
 * If the current page was reloaded (e.g. by user), force a cache reload of items
 * fetched via Fetch API as well (e.g. footer, header, Query Index).
 * @returns Options for Fetch API.
 */
// eslint-disable-next-line import/prefer-default-export
function getFetchCacheOptions() {
  const navigationType = window.performance.getEntriesByType('navigation')[0]?.type;
  if (navigationType === 'reload') {
    return { cache: 'reload' };
  }
  return {};
}

const urlPathRegex = /^(https?:\/\/[^/]+)?\/.*$/;
const yearPathRegex = /^\/(\d\d\d\d)\/(.+)?$/;

/**
 * Checks if the given value is a path.
 * @param {string} value path or URL or other string
 * @returns {boolean} true if given value is a path.
 */
function isPath(value) {
  if (value) {
    const urlPathMatch = value.match(urlPathRegex);
    if (urlPathMatch) {
      return urlPathMatch[1] === undefined;
    }
  }
  return false;
}

/**
 * Checks if the given value is a URL.
 * @param {string} value path or URL or other string
 * @returns {boolean} true if given value is a URL
 */
function isUrl(value) {
  if (value) {
    const urlPathMatch = value.match(urlPathRegex);
    if (urlPathMatch) {
      return urlPathMatch[1] !== undefined;
    }
  }
  return false;
}

/**
 * Checks if the given value is a path, or a full URL.
 * @param {string} value path or URL or other string
 * @returns {boolean} true if given value is path or URL
 */
function isUrlOrPath(value) {
  if (value) {
    return value.match(urlPathRegex) != null;
  }
  return false;
}

/**
 * Get pathname from given url or path.
 * @param {string} value path or URL
 * @returns {string} Path name or undefined if given string is not a path or URL.
 */
function getPathName(value) {
  if (isUrl(value)) {
    return new URL(value).pathname;
  }
  if (isPath(value)) {
    return value;
  }
  return undefined;
}

/**
 * Gets the document name (last part of path).
 * @param {string} value Path or URL
 * @returns {string} Document name or undefined if given string is not a path or URL.
 */
function getDocumentName(value) {
  const pathName = getPathName(value);
  if (pathName) {
    const lastSlash = pathName.lastIndexOf('/');
    const documentName = pathName.substring(lastSlash + 1);
    if (documentName !== '') {
      return documentName;
    }
  }
  return undefined;
}

/**
 * Gets year from given path.
 * @param {string} pathName Path name.
 * @returns {number} Year or undefined
 */
function getYearFromPath(pathName) {
  const yearPathMatch = pathName.match(yearPathRegex);
  if (yearPathMatch) {
    return parseInt(yearPathMatch[1], 10);
  }
  return undefined;
}

const titleSuffixPattern = /^(.+)\s-\s+adaptTo\(\)\s+\d+\s*$/;

/**
 * Splits a comma-separated value to array (trimming the values).
 * @param {string} value Comma-separated value
 * @returns {string[]} Value array
 */
function parseCSVArray(value) {
  if (value) {
    return value.split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }
  return [];
}

/**
 * Parses Splits a comma-separated value to array (trimming the values).
 * Falls back to parseCSVArray if string is not valid JSON.
 * @param {string} value JSON array as string
 * @returns {string[]} Value array
 */
function parseJsonArray(value) {
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // fallback
      return parseCSVArray(value);
    }
  }
  return [];
}

/**
 * Removes " - adaptTo() XXXX" suffix from title, if present.
 * @param {string} title Title
 * @returns {string} title Title without suffix
 */
function removeTitleSuffix(title) {
  if (title) {
    const matchSuffixPattern = title.match(titleSuffixPattern);
    if (matchSuffixPattern) {
      return matchSuffixPattern[1].trim();
    }
  }
  return title;
}

/**
 * Describes data returned by query index and adds helper methods.
 */
class QueryIndexItem {
  /** @type {string} */
  path;

  /** @type {string} */
  title;

  /** @type {string} */
  description;

  /** @type {string} */
  keywords;

  /** @type {string} */
  robots;

  /** @type {string} */
  image;

  /** @type {string} */
  tags;

  /** @type {string} Speaker: Affiliation/Company */
  affiliation;

  /** @type {string} Speaker: Twitter name e.g. "@twitteruser" */
  twitter;

  /** @type {string} Speaker: This speaker is an alias to given speaker path-name */
  ['speaker-alias'];

  /** @type {string} Speaker: This speaker metadata is valid upt to the given year */
  uptoyear;

  /** @type {string} Talk: Speaker assignment (speaker names or speaker path-names) */
  speakers;

  /**
   * @returns {string[]} Robot values as array
   */
  getKeywords() {
    return parseCSVArray(this.keywords);
  }

  /**
   * @returns {string[]} Robot values as array
   */
  getRobots() {
    return parseCSVArray(this.robots);
  }

  /**
   * @returns {string[]} Tag values as array
   */
  getTags() {
    return parseJsonArray(this.tags);
  }

  /**
   * @returns {string[]} Speaker names as array
   */
  getSpeakers() {
    return parseCSVArray(this.speakers);
  }
}

const siteRootRegex$1 = /^\/\d\d\d\d\/$/;
const speakerPathRegex$1 = /^\/speakers\/.*$/;
const talkPageRegex = /^\/\d\d\d\d\/schedule\/.+$/;
const defaultMetaImage = '/default-meta-image.png?width=1200&format=pjpg&optimize=medium';
let queryIndexInstance;

/**
 * Gets a distinct sorted list of speaker names from all talks in given year.
 * @param {QueryIndexItem[]} items
 * @param {RegExp} filter
 */
function getFilteredDistinctSortedTalkSpeakers(items, pathFilter) {
  const speakerSet = new Set();
  items.filter((item) => item.path.match(pathFilter))
    .forEach((item) => {
      item.getSpeakers().forEach((speaker) => speakerSet.add(speaker));
    });
  return Array.from(speakerSet).sort();
}

/**
 * Gets the speaker item variant matching to the given year, if multiple ones
 * are matching for the same speaker name.
 * Background: Speaker details and affiliation may change over years. This method
 * always picks the best match for the requested year.
 * @param {QueryIndexItem[]} speakerItems Matching speaker items
 * @param {string} siteRootPath Site root path
 * @return {QueryIndexItem} Best-matching speaker item
 */
function getMatchingSpeakerVariant(speakerItems, siteRootPath) {
  if (speakerItems.length === 0) {
    return undefined;
  }
  if (speakerItems.length === 1) {
    return speakerItems[0];
  }

  const year = parseInt(siteRootPath.substring(1, siteRootPath.length - 1), 10);
  // sort by uptoyear, with entry without uptoyear coming last
  speakerItems.sort((a, b) => {
    if (!a.uptoyear) {
      return 1;
    }
    if (!b.uptoyear) {
      return -1;
    }
    return a.uptoyear - b.uptoyear;
  });
  return speakerItems.find((item) => !item.uptoyear || item.uptoyear >= year);
}

/**
 * Helper for getting information about published pages and metadata.
 */
class QueryIndex {
  /** @type {QueryIndexItem[]} */
  items;

  /**
   * @param {QueryIndexItem[]} items data array from query-index.json
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * Get query index item by path.
   * @param {string} path Item path
   * @returns {QueryIndexItem} Item or undefined
   */
  getItem(path) {
    return this.items.find((item) => item.path === path);
  }

  /**
   * Get all web site root pages (for each yearly edition), newest first.
   * @returns {QueryIndexItem[]} Query index items pointing to web site roots.
   */
  getAllSiteRoots() {
    return this.items
      .filter((item) => item.path && item.path.match(siteRootRegex$1))
      .sort((item1, item2) => item1.path && item2.path && item2.path.localeCompare(item1.path));
  }

  /**
   * Get query index item for speaker for given year.
   * @param {string} pathOrName Speaker name or speaker document name or speaker path
   * @param {string} siteRootPath Site root path of current year
   * @returns {QueryIndexItem} Item or undefined
   */
  getSpeaker(pathOrName, siteRootPath) {
    if (isUrlOrPath(pathOrName)) {
      const path = getPathName(pathOrName);
      if (path.match(speakerPathRegex$1)) {
        return this.getItem(path);
      }
    }
    const matchingSpeakers = this.items
      .filter((item) => item.path.match(speakerPathRegex$1))
      // check real speaker name or page document name
      .filter((item) => (item.title === pathOrName) || (getDocumentName(item.path) === pathOrName));
    return getMatchingSpeakerVariant(matchingSpeakers, siteRootPath);
  }

  /**
   * Get a distinct sorted list of all speakers of main talks in given year.
   * @param {string} siteRootPath Site root path
   * @returns {string[]} Speaker names
   */
  getTalkSpeakerNames(siteRootPath) {
    const pathFilter = new RegExp(`^${siteRootPath}schedule/[^/]+$`);
    return getFilteredDistinctSortedTalkSpeakers(this.items, pathFilter);
  }

  /**
   * Get a distinct sorted list of all speakers of lightning talks in given year.
   * Speakers that also are in the list of main talk speakers are not included.
   * @param {string} siteRootPath Site root path
   * @returns {string[]} Speaker names
   */
  getLightningTalkSpeakerNames(siteRootPath) {
    // lightning talks are always stored at sub pages one level deeper than the main talks
    const pathFilter = new RegExp(`^${siteRootPath}schedule/[^/]+/[^/]+$`);
    const lightningTalkSpeakerNames = getFilteredDistinctSortedTalkSpeakers(this.items, pathFilter);

    // subtract main talk speaker names
    const talkSpeakerNames = this.getTalkSpeakerNames(siteRootPath);
    return lightningTalkSpeakerNames.filter((speaker) => !talkSpeakerNames.includes(speaker));
  }

  /**
   * Get all talk items, sorted descending by year, ascending by title.
   */
  getAllTalks() {
    return this.items
      .filter((item) => item.path.match(talkPageRegex))
      .sort((talk1, talk2) => {
        const year1 = talk1.path.substring(0, 6);
        const year2 = talk2.path.substring(0, 6);
        if (year1 === year2) {
          return talk1.path.localeCompare(talk2.path);
        }
        return year2.localeCompare(year1);
      });
  }

  /**
   * Get all talks for given speaker, ordered descending by year, ascending by title.
   * @param {QueryIndexItem} speakerItem Speaker item
   * @returns {QueryIndexItem[]} Talk items
   */
  getTalksForSpeaker(speakerItem) {
    const speakerDocumentName = getDocumentName(speakerItem.path);
    return this.getAllTalks()
      .filter((item) => {
        if (item.speakers) {
          const speakers = item.getSpeakers();
          return speakers.includes(speakerItem.title)
              || speakers.includes(speakerDocumentName);
        }
        return false;
      });
  }
}

/**
 * Get Query Index based on query-index.json.
 * The response is cached, multiple requests to this method return ths same instance.
 */
async function getQueryIndex() {
  if (!queryIndexInstance) {
    let data;
    const resp = await fetch('/query-index.json', getFetchCacheOptions());
    if (resp.ok) {
      const json = await resp.json();
      data = json.data;
    }
    data = data || [];
    const items = data.map((item) => {
      const queryIndexItem = Object.assign(new QueryIndexItem(), item);
      // remove default-meta-image.png references
      if (queryIndexItem.image === defaultMetaImage) {
        queryIndexItem.image = undefined;
      }
      return queryIndexItem;
    });
    queryIndexInstance = new QueryIndex(items);
  }
  return queryIndexInstance;
}

const siteRootRegex = /^(\/\d\d\d\d\/)(.+)?$/;
const speakerPathRegex = /^\/speakers\/[^/]+$/;
const yearHashRegex = /^#(\d\d\d\d)$/;

/**
 * Detects the root of the current site (first hierarchy level below docroot).
 * Examples:
 *   / -> /
 *   /2021/ -> /2021/
 *   /2021/mypage -> /2021/
 * @param {string} pathName Path name
 * @returns {string} Site root path
 */
function getSiteRootPath(pathName) {
  const siteRootMatch = pathName.match(siteRootRegex);
  if (siteRootMatch) {
    return siteRootMatch[1];
  }
  return '/';
}

/**
 * Detects the root of the current site (first hierarchy level below docroot).
 * This method also works for speaker pages which are outside the yearly site context.
 * It uses hash and speaker talks to detect the matching year.
 * @param {string} pathName Path name
 * @param {string} hash Hash (optional, only required for speaker pages)
 * @returns Site root path
 */
async function getSiteRootPathAlsoForSpeakerPath(pathName, hash) {
  if (pathName.match(speakerPathRegex)) {
    const yearHashMatch = hash?.match(yearHashRegex);
    let year;
    if (yearHashMatch) {
      [, year] = yearHashMatch;
    } else {
      const queryIndex = await getQueryIndex();
      const speakerItem = queryIndex.getItem(pathName);
      if (speakerItem) {
        const speakerTalks = queryIndex.getTalksForSpeaker(speakerItem);
        const latestTalk = speakerTalks[0];
        if (latestTalk) {
          year = getYearFromPath(latestTalk.path);
        }
      }
    }
    if (year) {
      return `/${year}/`;
    }
  }
  // fallback to normal site root detection
  return getSiteRootPath(pathName);
}

/**
 * Gets parent path. Topmost parent path is the site root.
 * @param {string} pathName Path name
 * @returns {string} Parent path or undefined if the path is already site root or invalid.
 */
function getParentPath(pathName) {
  const siteRoot = getSiteRootPath(pathName);
  if (pathName !== siteRoot && siteRoot !== '/') {
    const lastSlash = pathName.lastIndexOf('/');
    if (lastSlash === siteRoot.length - 1) {
      return siteRoot;
    }
    return pathName.substring(0, lastSlash);
  }
  return undefined;
}

/**
 * Build page path in current site.
 * @param {string} pathName Path name
 * @param {string} path relative path inside site (without leading slash)
 * @returns {string} Path
 */
function getRelativePath(pathName, path) {
  const siteRoot = getSiteRootPath(pathName);
  return `${siteRoot}${path}`;
}

/**
 * Build path to schedule page in current site.
 * @param {string} pathName Path name
 * @returns {string} Path
 */
function getSchedulePath(pathName) {
  return getRelativePath(pathName, 'schedule');
}

/**
 * Build path to archive page in current site.
 * @param {string} pathName Path name
 * @returns {string} Path
 */
function getArchivePath(pathName) {
  return getRelativePath(pathName, 'archive');
}

/**
 * Build path to speaker overview page in current site.
 * @param {string} pathName Path name
 * @returns {string} Path
 */
function getSpeakerOverviewPath(pathName) {
  return getRelativePath(pathName, 'conference/speaker');
}

/**
 * Get path to speaker detail page (in context of given year).
 * @typedef {import('../services/QueryIndexItem').default} QueryIndexItem
 * @param {QueryIndexItem} speakerItem Speaker item
 * @param {string} pathName Path name
 */
function getSpeakerDetailPath(speakerItem, pathName) {
  const year = getYearFromPath(pathName);
  return `${speakerItem.path}#${year}`;
}

/**
 * Checks if given path is a speaker detail page.
 * @param {string} pathName Path name
 * @returns true if path points to a speaker detail page
 */
function isSpeakerDetailPath(pathName) {
  return pathName.match(speakerPathRegex) != null;
}

/**
 * Adds archive links pointing to other yearly edition websites.
 * The links are added to the ul of the last li item.
 * @param {Element} nav Navigation element
 */
async function addArchiveLinks(nav) {
  const navItems = nav.querySelectorAll(':scope > ul > li');
  const lastNavItem = navItems[navItems.length - 1];
  if (lastNavItem) {
    let ul = lastNavItem.querySelector(':scope > ul');
    if (!ul) {
      ul = append(lastNavItem, 'ul');
    }
    const queryIndex = await getQueryIndex();
    queryIndex.getAllSiteRoots().forEach((siteRoot) => {
      const listItem = append(ul, 'li');
      const link = append(listItem, 'a');
      link.href = siteRoot.path;
      link.textContent = siteRoot.title;
    });
  }
}

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

/**
 * Extracts the stage header block and prepends a new section for it.
 * @param {Element} main
 */
function extractStageHeader(main) {
  // insert stage-header section in any case for grid layout - even if there is no content for it
  const section = document.createElement('div');
  section.classList.add('stage-header-section');
  main.prepend(section);

  // move stage header to new section
  const stageHeader = main.querySelector('.stage-header');
  if (stageHeader) {
    section.appendChild(stageHeader);
  }
}

/**
 * Auto-builds speaker detail block in speaker page.
 * @param {Element} main The container element
 */
function decorateSpeakerPage(main) {
  if (isSpeakerDetailPath(window.location.pathname)) {
    const section = main.querySelector(':scope > div');
    if (section) {
      section.prepend(buildBlock('speaker-detail', { elems: Array.from(section.children) }));
    }
  }
}

/**
 * Inserts new section with talk detail components.
 * @param {Element} main The container element
 */
function decorateTalkDetailPage(main) {
  if (getMetadata('theme') === 'talk-detail') {
    const firstSection = main.querySelector(':scope > div');
    if (firstSection) {
      // add block after headline before outline
      const h1 = firstSection.querySelector(':scope > h1');
      const talkDetailBeforeOutline = document.createElement('div');
      talkDetailBeforeOutline.classList.add('talk-detail-before-outline');
      if (h1.nextSibling) {
        firstSection.insertBefore(talkDetailBeforeOutline, h1.nextSibling);
      } else {
        firstSection.append(talkDetailBeforeOutline);
      }
      // add block after outline
      const talkDetailAfterOutline = document.createElement('div');
      talkDetailAfterOutline.classList.add('talk-detail-after-outline');
      firstSection.append(talkDetailAfterOutline);
    }
    // add new section with footer block
    const footerSection = document.createElement('div');
    main.append(footerSection);
    const talkDetailFooter = document.createElement('div');
    talkDetailFooter.classList.add('talk-detail-footer');
    footerSection.append(talkDetailFooter);
  }
}

/**
 * Builds a fragment block
 * @param {string} fragmentRef Local path to fragment (without site root)
 * @returns Fragment block element
 */
function buildFragmentBlock(fragmentRef) {
  const siteRootPath = getSiteRootPath(window.location.pathname);
  const fragmentPath = `${siteRootPath}${fragmentRef}`;
  const fragmentLink = document.createElement('a');
  fragmentLink.setAttribute('href', fragmentPath);
  fragmentLink.innerText = fragmentPath;
  return buildBlock('fragment', fragmentLink);
}

/**
 * Appends a new section with the aside bar fragment,
 * if it is not disabled for this page via metadata.
 * @param {Element} main The container element
 */
function appendAsideBar(main) {
  if (getMetadata('include-aside-bar') === 'false') {
    return;
  }
  const fragment = buildFragmentBlock('fragments/aside-bar');
  const section = document.createElement('div');
  section.classList.add('aside-bar-section');
  section.appendChild(fragment);
  main.append(section);
}

/**
 * Appends a new section with the teaser bar fragment,
 * if it is not disabled for this page via metadata.
 * @param {Element} main The container element
 */
function appendTeaserBar(main) {
  if (getMetadata('include-teaser-bar') === 'false') {
    return;
  }
  const fragment = buildFragmentBlock('fragments/teaser-bar');
  const section = document.createElement('div');
  section.classList.add('teaser-bar-section');
  section.appendChild(fragment);
  main.append(section);
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    decorateSpeakerPage(main);
    decorateTalkDetailPage(main);
    extractStageHeader(main);
    appendAsideBar(main);
    appendTeaserBar(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 * @param {boolean} insideFragment Decorate main block inside a fragment
 */
// eslint-disable-next-line import/prefer-default-export
function decorateMain(main, insideFragment) {
  decorateIcons(main);
  decorateAnchors(main);
  if (!insideFragment) {
    buildAutoBlocks(main);
  }
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Add static elements to header.
 * @param {Element} header Header element
 */
function addStaticHeaderElements(header) {
  const container = append(header, 'div', 'header-container');
  const logoLink = append(container, 'a', 'logo');
  logoLink.id = 'top';
  append(logoLink, 'div');
  append(header, 'div', 'nav-background');
}

/**
 * Applies template and theme as defined in document's metadata. Additionally,
 * if no template is set, a default template is derived based on "include-aside-bar" status.
 * Supported templates are:
 * - content-3col (default)
 * - content-4col (default with include-aside-bar=false)
 * - content-2col
 */
function decorateTemplateAndThemeWithAutoDetection() {
  decorateTemplateAndTheme();
  let template = getMetadata('template');
  if (!template) {
    if (getMetadata('include-aside-bar') === 'false') {
      template = 'content-4col';
    } else {
      template = 'content-3col';
    }
    document.body.classList.add(template);
  }
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  const header = doc.querySelector('header');
  if (header) {
    addStaticHeaderElements(header);
  }
  decorateTemplateAndThemeWithAutoDetection();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header .header-container'));
  loadFooter(doc.querySelector('footer'));

  import('./lazy-styles-4ed993c7.js').then(({ default: sheet }) => {
    if (sheet instanceof CSSStyleSheet) { document.adoptedStyleSheets = [sheet]; }
  });
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed-805a26c8.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

export { append as a, getFetchCacheOptions as b, addArchiveLinks as c, decorateAnchors as d, decorateMain, createOptimizedPicture as e, getSiteRootPath as f, getSiteRootPathAlsoForSpeakerPath as g, getMetadata as h, getQueryIndex as i, getSpeakerOverviewPath as j, removeTitleSuffix as k, loadBlocks as l, getYearFromPath as m, parseCSVArray as n, getSpeakerDetailPath as o, prepend as p, getArchivePath as q, readBlockConfig as r, sampleRUM as s, decorateBlock as t, isUrlOrPath as u, getPathName as v, getParentPath as w, getSchedulePath as x };
