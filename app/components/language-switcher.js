import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

// The language names are endonyms: they stay in their own language, so a
// user can find their language whatever the current UI language is.
const LABELS = {
  'nl-be': 'Nederlands',
  'en-us': 'English',
};

export default class LanguageSwitcherComponent extends Component {
  @service locale;

  @tracked activeLocale;

  constructor(owner, args) {
    super(owner, args);
    this.activeLocale = this.locale.current;
  }

  get options() {
    return this.locale.supported.map((id) => ({
      id,
      label: LABELS[id] || id,
    }));
  }

  get currentLabel() {
    return (
      this.options.find((option) => option.id === this.activeLocale)?.label ||
      this.options[0]?.label
    );
  }

  @action
  select(locale) {
    this.activeLocale = this.locale.apply(locale, { remember: true });
  }
}
