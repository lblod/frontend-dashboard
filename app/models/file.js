import Model, { attr, belongsTo } from '@ember-data/model';

export default class FileModel extends Model {
  @attr uri;
  @attr name;
  @attr format;
  @attr size;
  @attr extension;
  @attr('date') created;
  @belongsTo('remote-data-object', { async: true, inverse: 'file' })
  remoteDataObject;
  @belongsTo('data-container', { async: true, inverse: 'files' }) dataContainer;

  get humanReadableSize() {
    //ripped from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    const bytes = this.size;
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  get downloadLink() {
    return `/files/${this.id}/download?name=${this.name}`;
  }
}
