import Model, { attr, belongsTo } from '@ember-data/model';

export default class FileModel extends Model {
  @attr('string') uri;
  @attr('string') filename;
  @attr('string') format;
  @attr('number') size;
  @attr('string') extension;
  @attr('datetime') created;
  @belongsTo('remote-data-object') remoteDataObject;
  @belongsTo('data-container') dataContainer;

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
