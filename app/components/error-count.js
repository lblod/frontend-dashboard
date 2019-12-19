import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  errors: null,
  total: 0,
  totals: computed("errors.[]", function(){
    if(this.errors && this.errors.length > 0) {
      const array = this.errors.toArray()
      let totals = {}
      array.forEach((i) => {
        if(!totals[i.logLevel.get('label')]) {
          totals[i.logLevel.get('label')] = 0
        }
        totals[i.logLevel.get('label')] +=1
      })
      const arrayTotals = []
      for(let key in totals) {
        const object = { label: key, count: totals[key] }
        arrayTotals.push(object)
      }
      return arrayTotals
    }
  })
});
