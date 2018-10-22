class Page {
  constructor({ data, links, meta }, {campaignID, entityType}) {
    this.data = data.map(x => new entityType(x, campaignID));
    this.links = links;
    this.meta = meta;
  }
}

module.exports = {
  Page,
}
