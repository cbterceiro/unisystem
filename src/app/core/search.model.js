"use strict";
exports.__esModule = true;
var SearchModel = (function () {
    function SearchModel(obj) {
        Object.assign(this, obj);
    }
    SearchModel.prototype.toString = function () {
        var s = [];
        if (this.fields && this.fields.length) {
            s.push("fields=" + this.fields.join(','));
        }
        if (this.limit) {
            s.push("limit=" + this.limit);
        }
        if (this.offset) {
            s.push("offset=" + this.offset);
        }
        if (this.filters && this.filters.length) {
            this.filters = this.filters.filter(function (n) { return (n != undefined && n != '' && n.indexOf('%%') == -1); });
            s.push("filter=" + encodeURI(this.filters.join(',')));
        }
        if (this.orderBy && this.orderBy.length) {
            s.push("order=" + this.orderBy.join(','));
        }
        return s.length ? "?" + s.join('&') : '';
    };
    return SearchModel;
}());
exports.SearchModel = SearchModel;
