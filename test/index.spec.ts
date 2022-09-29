/* eslint-disable */
// @ts-nocheck

import { updateQuality } from '../src/gilded-rose';
import { createItem, getItem } from './fixture';
import { doTimes, updateItems } from './utility';

describe('updateQuality', function() {

  describe('Standard item', () => {
    it('returns a quality of 0 or greater, never negative', () => {
      const items = [createItem('elixir', { sellIn: 2, quality: 2 })];
      const updatedItems = doTimes(3, () => updateItems(updateQuality, items));
      const elixir = getItem('elixir', updatedItems);

      expect(elixir.quality).toEqual(0);
    });

    it('does not exceed a maximum quality of 50.', () => {
      const items = [createItem('aged brie', { sellIn: 10, quality: 49 })];
      const updatedItems = doTimes(2, () => updateItems(updateQuality, items));
      const agedBrie = getItem('aged brie', updatedItems);

      expect(agedBrie.quality).toEqual(50);
    });
  });

  describe('Aged Brie', () => {
    it('increases quality until its "Sell in" date', () => {
      const items = [createItem('aged brie', { sellIn: 2, quality: 0 })];
      const updatedItems = doTimes(2, () => updateItems(updateQuality, items));
      const agedBrie = getItem('aged brie', updatedItems);

      expect(agedBrie.quality).toEqual(2);
    });

    it('increases quality twice as fast after its "Sell in" date', () => {
      const items = [createItem('aged brie', { sellIn: 2, quality: 0 })];
      const updatedItems = doTimes(3, () => updateItems(updateQuality, items));
      const agedBrie = getItem('aged brie', updatedItems);

      expect(agedBrie.quality).toEqual(4);
    });
  });

  describe('Sulfurus', () => {
    it('does not decrease in quality', () => {
      const items = [createItem('sulfuras', { sellIn: 0, quality: 80 })];
      const updatedItems = doTimes(2, () => updateItems(updateQuality, items));
      const sulfurus = getItem('sulfuras', updatedItems);

      expect(sulfurus.quality).toEqual(80);
    });

    it('does not have a "Sell in" date', () => {
      const items = [createItem('sulfuras', { sellIn: 0, quality: 80 })];
      const updatedItems = doTimes(2, () => updateItems(updateQuality, items));
      const sulfurus = getItem('sulfuras', updatedItems);

      expect(sulfurus.sellIn).toEqual(0);
    });
  });

  describe('Backstage passes', () => {
    it('increases quality by 1 with 11 or more days left', () => {
      const items = [createItem('backstage passes', { sellIn: 12, quality: 10 })];
      const updatedItems = doTimes(1, () => updateItems(updateQuality, items));
      const backstagePasses = getItem('backstage passes', updatedItems);
      
      expect(backstagePasses.quality).toEqual(11);
    });

    it('increases quality by 2 with 10 or less days left', () => {
      const items = [createItem('backstage passes', { sellIn: 10, quality: 10 })];
      const updatedItems = doTimes(1, () => updateItems(updateQuality, items));
      const backstagePasses = getItem('backstage passes', updatedItems);
      
      expect(backstagePasses.quality).toEqual(12);
    });

    it('increases quality by 3 with 5 or less days left', () => {
      const items = [createItem('backstage passes', { sellIn: 5, quality: 10 })];
      const updatedItems = doTimes(1, () => updateItems(updateQuality, items));
      const backstagePasses = getItem('backstage passes', updatedItems);
      
      expect(backstagePasses.quality).toEqual(13);
    });

   it('decreases quality to 0 after the day of the concert', () => {
      const items = [createItem('backstage passes', { sellIn: 0, quality: 10 })];
      const updatedItems = doTimes(1, () => updateItems(updateQuality, items));
      const backstagePasses = getItem('backstage passes', updatedItems);
      
      expect(backstagePasses.quality).toEqual(0);
    });
  });

  describe('Conjured item', () => {
    it.todo('decrease quality twice as fast', () => {
      const items = [createItem('conjured', { sellIn: 10, quality: 20 })];
      const updatedItems = doTimes(2, () => updateItems(updateQuality, items));
      const conjured = getItem('conjured', updatedItems);

      expect(conjured.quality).toEqual(16);
    });
  });
});