
export class SearchModel {

  fields: string[];
  limit: number;
  offset: number;
  filters: string[];
  orderBy: string[];

  constructor(obj: {
    fields: string[], limit?: number, offset?: number, filters?: string[], orderBy?: string[],
  }) {
    Object.assign(this, obj);
  }

  toString(): string {
    const s: string[] = [];
    if (this.fields && this.fields.length) {
      s.push(`fields=${this.fields.join(',')}`);
    }
    if (this.limit) {
      s.push(`limit=${this.limit}`);
    }
    if (this.offset) {
      s.push(`offset=${this.offset}`);
    }
    if (this.filters && this.filters.length) {
      
      this.filters = this.filters.filter(function(n){ return (n != undefined && n != '' && n.indexOf('%%') == -1) });
      s.push(`filter=${encodeURI(this.filters.join(','))}`);
    }
    if (this.orderBy && this.orderBy.length) {
      s.push(`order=${this.orderBy.join(',')}`);
    }
    return s.length ? `?${s.join('&')}` : '';
  }
}

