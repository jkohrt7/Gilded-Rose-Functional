/* eslint-disable */
// @ts-nocheck

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

//clamps to 0 through 50, inclusive
const clampQuality = (quality) => Math.max(0,Math.min(50,quality))

//item update 'mixins'
const brieUpdate = (item) => {
  const updatedSellIn = item.sellIn - 1;
  const updatedQuality = clampQuality((item.sellIn <= 0 ? item.quality + 2 : item.quality + 1));
  return {"sellIn":updatedSellIn, "quality":updatedQuality};
}

const ticketUpdate = (item) => {
  const updatedSellIn = item.sellIn -1;
  const updatedQuality = clampQuality(
    item.sellIn > 10 ? item.quality + 1 
    : item.sellIn > 5 ? item.quality + 2
    : item.sellIn > 0 ? item.quality + 3
    : 0 
  );
  return {"sellIn":updatedSellIn, "quality":updatedQuality};
}

const legendaryUpdate = (item) => {
  return item;
}

const defaultUpdate = (item) => {
  const updatedSellIn = item.sellIn - 1;
  const updatedQuality = clampQuality(item.sellIn < 0 ? item.quality -1 : item.quality - 2);
  return {"sellIn":updatedSellIn, "quality":updatedQuality};
}

const chooseUpdateMethod = (item) => {
  const updateType = {
    "Aged Brie": brieUpdate,
    "Backstage passes to a TAFKAL80ETC concert": ticketUpdate,
    "Sulfuras, Hand of Ragnaros": legendaryUpdate,
    "default": defaultUpdate
  }
  return (updateType[item.name] || updateType["default"]);
}

// produces updated lists of Items
export const updateQuality = (items) => {
  return items.map((item) => {
    const updateMethod = chooseUpdateMethod(item);
    return Object.assign(item, updateMethod(item))
  })
}