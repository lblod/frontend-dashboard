// Sets the locale before the app renders: a ?lang= override, a choice stored
// by the language menu, or the browser preference. A URL override is stored,
// so it also holds on the next visit.
export function initialize(appInstance) {
  const locale = appInstance.lookup('service:locale');
  const fromUrl = locale.fromUrl;
  locale.apply(locale.detect(), { remember: Boolean(fromUrl) });
}

export default { initialize };
