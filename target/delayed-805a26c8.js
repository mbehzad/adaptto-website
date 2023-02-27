import { s as sampleRUM } from './scripts-8e457eb3.js';
import { d as decorateConsentManagement } from './usercentrics-48d28a6b.js';
import './htmlTemplateTag-0d1de9cb.js';

// eslint-disable-next-line import/no-cycle

// enable UserCentrics consent management
decorateConsentManagement(document.head);

// Core Web Vitals RUM collection
sampleRUM('cwv');
