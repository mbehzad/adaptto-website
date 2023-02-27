import { i as getQueryIndex, m as getYearFromPath, k as removeTitleSuffix, a as append } from './scripts-8e457eb3.js';
import { h as html } from './htmlTemplateTag-0d1de9cb.js';

/**
 * Converts talk to indexable string.
 * @typedef {import('./TalkArchiveItem').default} TalkArchiveItem
 * @param {TalkArchiveItem} talk
 */
function talkToText(talk) {
  return [
    talk.title ?? '',
    talk.description ?? '',
    talk.keywords.join(', '),
    talk.tags.join(', '),
    talk.speakers.join(', '),
  ].join('\n');
}

/**
 * Full text index for talk archive.
 * This implements a very simplistic approach by just checking for appearance of
 * search string in talk properties.
 */
class TalkArchiveFullTextIndex {
  /**
   * @type {object[]}
   */
  index;

  /**
   * @typedef {import('./TalkArchiveItem').default} TalkArchiveItem
   * @param {TalkArchiveItem[]} talks Talks
   */
  constructor(talks) {
    this.index = talks.map((talk) => ({ talk, text: talkToText(talk).toLocaleLowerCase() }));
  }

  /**
   * Execute full text search.
   * @typedef {import('./TalkArchiveItem').default} TalkArchiveItem
   * @param {string} text Search text
   * @returns {TalkArchiveItem[]} Search result
   */
  search(text) {
    const searchText = text.toLocaleLowerCase();
    return this.index
      .filter((item) => item.text.includes(searchText))
      .map((item) => item.talk);
  }
}

/**
 * Item of talk archive.
 * Subset of properties from QueryIndexItem, the array properties are already processed.
 */
class TalkArchiveItem {
  /** @type {string} */
  path;

  /** @type {string} */
  year;

  /** @type {string} */
  title;

  /** @type {string} */
  description;

  /** @type {string[]} */
  keywords = [];

  /** @type {string[]} */
  tags = [];

  /** @type {string[]} Talk: Speaker assignment (speaker names or speaker path-names) */
  speakers = [];
}

/**
 * Gets a sorted and distinct list of items. Empty items are removed.
 * @param {string[]} items Raw list
 * @returns {string[]} Compiled list
 */
function getDistinctSortedList(items) {
  const distinctItems = [...new Set(items)]
    .filter((item) => item !== undefined);
  return distinctItems.sort();
}

/**
 * Fetch and filter talks for talk archive.
 */
class TalkArchive {
  /**
   * @typedef {import('./TalkArchiveFilter').default} TalkArchiveFilter
   * @type {TalkArchiveFilter}
   */
  filter;

  /**
   * @type {TalkArchiveItem[]}
   */
  talks;

  /**
   * @type {TalkArchiveItem[]}
   */
  filteredTalks;

  /**
   * @typedef {import('./TalkArchiveFullTextIndex').default} TalkArchiveFullTextIndex
   * @type {TalkArchiveFullTextIndex}
   */
  index;

  /**
   * @typedef {import('./QueryIndex').default} QueryIndex
   * @param {QueryIndex} queryIndex Query index
   */
  constructor(queryIndex) {
    this.talks = queryIndex.getAllTalks()
      .map((item) => {
        const talk = new TalkArchiveItem();
        talk.path = item.path;
        talk.year = getYearFromPath(item.path)?.toString();
        talk.title = removeTitleSuffix(item.title);
        talk.description = item.description;
        talk.keywords = item.getKeywords();
        talk.tags = item.getTags();
        talk.speakers = item.getSpeakers();
        return talk;
      })
      .filter((talk) => talk.speakers.length > 0);
    this.filteredTalks = this.talks;
  }

  /**
   * @typedef {import('./TalkArchiveFilter').default} TalkArchiveFilter
   * @param {TalkArchiveFilter} filter
   */
  applyFilter(filter) {
    this.filter = filter;
    if (filter) {
      this.filteredTalks = this.talks.filter((talk) => filter.matches(talk));
    } else {
      this.filteredTalks = this.talks;
    }
    this.index = undefined;
  }

  /**
   * Get all talks matching the current filter criteria.
   * @returns {TalkArchiveItem[]} Talk items
   */
  getFilteredTalks() {
    return this.filteredTalks;
  }

  /**
   * Get all talks matching the current filter criteria and the given fill text expression.
   * @param {string} fullText Full text expression
   * @returns {TalkArchiveItem[]} Talk items
   */
  getFilteredTalksFullTextSearch(fullText) {
    if (!this.index) {
      this.index = new TalkArchiveFullTextIndex(this.filteredTalks);
    }
    return this.index.search(fullText);
  }

  /**
   * Get all tag filter options, sorted ascending.
   * @returns {string[]} Tag names
   */
  getTagFilterOptions() {
    return getDistinctSortedList(this.talks
      .flatMap((talk) => talk.tags));
  }

  /**
   * Get all year filter options, sorted descending.
   * @returns {string[]} Years
   */
  getYearFilterOptions() {
    return getDistinctSortedList(this.talks
      .map((talk) => talk.year))
      .reverse();
  }

  /**
   * Get all speaker filter options, sorted ascending.
   * @returns {string[]} Speaker names
   */
  getSpeakerFilterOptions() {
    return getDistinctSortedList(this.talks
      .flatMap((talk) => talk.speakers));
  }
}

/**
 * Get Query Index based on query-index.json.
 */
async function getTalkArchive() {
  const queryIndex = await getQueryIndex();
  return new TalkArchive(queryIndex);
}

const validFilterCategory = ['tags', 'years', 'speakers'];

/**
 * Builds list of filter options with URI encoding.
 * @param {string[]} items
 * @returns {string} Encoded comma-separated options
 */
function buildHashFilterOptions(items) {
  return items.map((item) => encodeURIComponent(item)).join(',');
}

/**
 * Filter criteria for talk archive.
 */
class TalkArchiveFilter {
  /**
   * Filter by tags.
   * @type {string[]}
   */
  tags;

  /**
   * Filter by years.
   * @type {string[]}
   */
  years;

  /**
   * Filter by speaker names.
   * @type {string[]}
   */
  speakers;

  /**
   * @typedef {import('./TalkArchiveItem').default} TalkArchiveItem
   * @param {TalkArchiveItem} talk Talk
   * @returns {boolean} true if talk matches
   */
  matches(talk) {
    if (this.tags) {
      if (!this.tags.find((tag) => talk.tags.includes(tag))) {
        return false;
      }
    }
    if (this.years) {
      if (!this.years.includes(talk.year)) {
        return false;
      }
    }
    if (this.speakers) {
      if (!this.speakers.find((speaker) => talk.speakers.includes(speaker))) {
        return false;
      }
    }
    return true;
  }

  /**
   * Builds a hash string reflecting the current filter options.
   * @returns {string} Hash string
   */
  buildHash() {
    const filters = [];
    if (this.tags) {
      filters.push(`tags=${buildHashFilterOptions(this.tags)}`);
    }
    if (this.years) {
      filters.push(`years=${buildHashFilterOptions(this.years)}`);
    }
    if (this.speakers) {
      filters.push(`speakers=${buildHashFilterOptions(this.speakers)}`);
    }
    return `#${filters.join('/')}`;
  }
}

/**
 * Build filter options from hash.
 * @param {string} hash Window location hash
 * @returns {TalkArchiveFilter} filter
 */
function getFilterFromHash(hash) {
  const filter = new TalkArchiveFilter();
  const filterStrings = hash.substring(1).split('/');
  filterStrings.forEach((filterString) => {
    const filterParts = filterString.split('=');
    if (filterParts.length === 2) {
      const filterName = filterParts[0];
      const filterOptions = filterParts[1].split(',').map((item) => decodeURIComponent(item));
      if (validFilterCategory.includes(filterName) && filterOptions.length > 0) {
        filter[filterName] = filterOptions;
      }
    }
  });
  return filter;
}

const filterCategories = [
  {
    category: 'tags',
    label: 'Tags',
    archiveMethod: 'getTagFilterOptions',
    collapsible: false,
  },
  {
    category: 'years',
    label: 'Year',
    archiveMethod: 'getYearFilterOptions',
    collapsible: true,
  },
  {
    category: 'speakers',
    label: 'Speaker',
    archiveMethod: 'getSpeakerFilterOptions',
    collapsible: true,
  },
];

/**
 * Renders talk archive filter options and result depending on current filter hash.
 * @typedef {import('../../scripts/services/TalkArchive').default} TalkArchive
 * @param {Element} block
 * @param {TalkArchive} talkArchive
 * @param {boolean} applyFilter Re-apply filters from hash.
 */
function displayFilteredTalks(block, talkArchive, applyFilter) {
  if (applyFilter) {
    talkArchive.applyFilter(getFilterFromHash(window.location.hash));
  }

  // full text
  const fullText = block.querySelector('.search input').value.trim();

  // result table
  const tbody = block.querySelector('.result table tbody');
  tbody.innerHTML = '';
  const talks = fullText !== ''
    ? talkArchive.getFilteredTalksFullTextSearch(fullText)
    : talkArchive.getFilteredTalks();

  if (talks.length > 0) {
    talks.forEach((talk) => {
      tbody.insertAdjacentHTML('beforeend', html`<tr>
        <td>${getYearFromPath(talk.path)}</td>
        <td><a href="${talk.path}">${talk.title}</a></td>
        <td>${talk.speakers.join(', ')}</td>
      </tr>`);
    });
  } else {
    tbody.insertAdjacentHTML('beforeend', html`<tr class="no-result">
      <td colspan="3">No matching talk found.</td>
    </tr>`);
  }
}

/**
 * Add filter category options.
 * @param {Element} parent Parent element
 * @param {string} categoryLabel Category label
 * @param {string[]} items All items
 * @param {string[]} selectedItems Selected items
 * @param {boolean} collapsible Options list is collapsible
 * @returns {Element} Filter category element
 */
function addFilterCategory(parent, categoryLabel, items, selectedItems, collapsible) {
  const div = append(parent, 'div', 'filter-category');
  const span = append(div, 'span', 'category');
  span.textContent = categoryLabel;
  const ul = append(div, 'ul');

  items.forEach((item) => {
    const li = append(ul, 'li');
    const label = append(li, 'label');
    const input = append(label, 'input');
    input.type = 'checkbox';
    input.value = item;
    if (selectedItems && selectedItems.includes(item)) {
      input.checked = true;
    }
    label.append(item);
  });

  if (collapsible && items.length > 5) {
    ul.classList.add('collapsible');
    if (!selectedItems || selectedItems.length === 0) {
      // collapse by default, unless there is any item selected from this filter option
      ul.classList.add('collapsed');
    }

    ul.insertAdjacentHTML('beforeend', html`
      <li class="collapse-toggle more"><a href="">more...</a></li>
      <li class="collapse-toggle less"><a href="">less...</a></li>`);
  }

  return div;
}

/**
 * Add filter categories.
 * @typedef {import('../../scripts/services/TalkArchive').default} TalkArchive
 * @param {Element} block
 * @param {TalkArchive} talkArchive
 */
function addFilterCategories(block, talkArchive) {
  const filterDiv = block.querySelector('.filter');

  filterCategories.forEach((filterCategory) => {
    const categoryDiv = addFilterCategory(
      filterDiv,
      filterCategory.label,
      talkArchive[filterCategory.archiveMethod](),
      talkArchive.filter[filterCategory.category],
      filterCategory.collapsible,
    );

    // enable filter state changes
    categoryDiv.querySelectorAll('input[type=checkbox]').forEach((input) => {
      input.addEventListener('change', () => {
        let currentlySelectedItems = Array.from(categoryDiv.querySelectorAll('input[type=checkbox]'))
          .filter((item) => item.checked)
          .map((item) => item.value);
        if (currentlySelectedItems.length === 0) {
          currentlySelectedItems = undefined;
        }
        const filter = getFilterFromHash(window.location.hash);
        filter[filterCategory.category] = currentlySelectedItems;
        window.history.replaceState(null, null, filter.buildHash());
        displayFilteredTalks(block, talkArchive, true);
      });
    });
  });

  // enable toggles for collapsible filter lists
  filterDiv.querySelectorAll('ul.collapsible').forEach((ul) => {
    ul.querySelectorAll(' li.collapse-toggle a').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        ul.classList.toggle('collapsed');
      });
    });
  });
}

/**
 * Talk archive.
 * @param {Element} block
 */
async function decorate(block) {
  const talkArchive = await getTalkArchive();

  // prepare archive markup
  block.innerHTML = html`
      <div class="search">
        <input type="search" placeholder="Search">
      </div>
      <div class="filter">
      </div>
      <div class="result">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Talk</th>
              <th>Speaker</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>`;

  // fire full text search when entering text (with 0.5sec delay)
  let typingTimer;
  block.querySelector('.search input').addEventListener('input', () => {
    clearInterval(typingTimer);
    typingTimer = setTimeout(() => displayFilteredTalks(block, talkArchive, false), 500);
  });

  // react to stage changes via hash
  window.addEventListener('hashchange', () => displayFilteredTalks(block, talkArchive, true));
  displayFilteredTalks(block, talkArchive, true);

  // filter
  addFilterCategories(block, talkArchive);
}

export { decorate as default };
