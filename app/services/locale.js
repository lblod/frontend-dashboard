import Service, { service } from '@ember/service';

// The locale to use when the browser has no preference we can serve.
const FALLBACK_LOCALE = 'en-us';
// A manual choice from the language menu. It wins over the browser.
const STORAGE_KEY = 'frontend-dashboard:locale';
// Used when the intl service cannot list its locales yet.
const KNOWN_LOCALES = ['en-us', 'nl-be'];

export default class LocaleService extends Service {
  @service intl;

  // The locales the app has translations for. ember-intl normalizes them to
  // lower case, so nl-BE is nl-be here.
  get supported() {
    const locales = this.intl.locales;
    return Array.isArray(locales) && locales.length ? locales : KNOWN_LOCALES;
  }

  get current() {
    return this.intl.primaryLocale;
  }

  // The locale to use at boot: the URL override, the stored menu choice, the
  // browser preference, then the fallback.
  detect() {
    return this.fromUrl || this.stored || this.browserLocale() || this.fallback;
  }

  // The ?lang= override, when it names a locale we have.
  get fromUrl() {
    if (typeof window === 'undefined') return null;
    const value = new URL(window.location.href).searchParams.get('lang');
    return this.match(value);
  }

  // The choice the user made in the language menu.
  get stored() {
    if (typeof window === 'undefined') return null;
    try {
      return this.match(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  get fallback() {
    return this.supported.includes(FALLBACK_LOCALE)
      ? FALLBACK_LOCALE
      : this.supported[0];
  }

  // Applies a locale. English follows the chosen locale, so a key that is
  // missing in Dutch still reads in English. A choice from the URL or the
  // menu is remembered; a locale detected from the browser is not, so a
  // later browser change still counts.
  apply(locale, { remember = false } = {}) {
    const chosen = this.match(locale) || this.fallback;
    this.intl.setLocale(this.withFallback(chosen));
    if (remember) this.remember(chosen);
    return chosen;
  }

  // The chosen locale first, English after it. One locale is enough when it
  // is English or when the app has no English.
  withFallback(locale) {
    return locale === this.fallback ? [locale] : [locale, this.fallback];
  }

  // The first supported locale that matches a browser preference. nl and
  // nl-NL match nl-be; en-GB matches en-us.
  browserLocale() {
    if (typeof navigator === 'undefined') return null;
    const preferred = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    for (const language of preferred) {
      const match = this.match(language);
      if (match) return match;
    }
    return null;
  }

  // A supported locale for a language tag, or null. An exact match wins;
  // otherwise the primary language decides.
  match(locale) {
    const normalized = this.normalize(locale);
    if (!normalized) return null;
    if (this.supported.includes(normalized)) return normalized;
    const primary = normalized.split('-')[0];
    return (
      this.supported.find((item) => item.split('-')[0] === primary) || null
    );
  }

  normalize(locale) {
    return typeof locale === 'string'
      ? locale.replace(/_/g, '-').toLowerCase()
      : null;
  }

  remember(locale) {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // storage is not available; the choice lasts this page only
    }
  }
}
