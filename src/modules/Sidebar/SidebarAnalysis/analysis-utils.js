export function groupByCategory(res, feat) {
  return res.map(d => ({
    ...d,
    items: d.category === feat.properties.mainCategory ? d.items.concat(feat.properties) : d.items
  }));
}

export function sortByItemsLength(a, b) {
  if (a.items.length < b.items.length) {
    return 1;
  }

  if (a.items.length > b.items.length) {
    return -1;
  }

  return 0;
}
