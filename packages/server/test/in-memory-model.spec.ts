import { model, Types } from 'mongoose';
import { InMemoryCollection, matches } from './in-memory-model';

describe('matches', () => {
  const id = new Types.ObjectId();

  describe('equality', () => {
    it('matches equal strings and numbers, and not different ones', () => {
      expect(matches({ a: 'x', n: 1 }, { a: 'x', n: 1 })).toBe(true);
      expect(matches({ a: 'x' }, { a: 'y' })).toBe(false);
    });

    it('treats null, undefined and a missing field as the same', () => {
      expect(matches({}, { a: undefined })).toBe(true);
      expect(matches({ a: null }, { a: undefined })).toBe(true);
      expect(matches({ a: undefined }, { a: null })).toBe(true);
      expect(matches({ a: 'x' }, { a: undefined })).toBe(false);
    });

    it('matches a value that is in an array field', () => {
      expect(matches({ clientIds: ['a', 'b'] }, { clientIds: 'b' })).toBe(true);
      expect(matches({ clientIds: ['a', 'b'] }, { clientIds: 'c' })).toBe(false);
    });

    it('matches by membership when the filter value is an array (an intentional divergence from Mongo)', () => {
      expect(matches({ roomId: 'r1' }, { roomId: [['r1', 'r2']] })).toBe(true);
      expect(matches({ roomId: 'r3' }, { roomId: [['r1', 'r2']] })).toBe(false);
    });
  });

  describe('object ids', () => {
    it('matches an ObjectId against an equal ObjectId, or against its string form, as Mongoose casts', () => {
      expect(matches({ _id: id }, { _id: new Types.ObjectId(id.toString()) })).toBe(true);
      expect(matches({ _id: id }, { _id: id.toString() })).toBe(true);
      expect(matches({ _id: id.toString() }, { _id: id })).toBe(true);
    });

    it('does not match a different ObjectId', () => {
      expect(matches({ _id: id }, { _id: new Types.ObjectId() })).toBe(false);
      expect(matches({ _id: id }, { _id: new Types.ObjectId().toString() })).toBe(false);
    });

    it('matches ObjectIds and their string forms in $in', () => {
      const other = new Types.ObjectId();
      expect(matches({ _id: id }, { _id: { $in: [other, new Types.ObjectId(id.toString())] } })).toBe(true);
      expect(matches({ _id: id }, { _id: { $in: [other.toString(), id.toString()] } })).toBe(true);
      expect(matches({ _id: id }, { _id: { $in: [other, other.toString()] } })).toBe(false);
    });

    it('matches an ObjectId held in an array field', () => {
      expect(matches({ owners: [id] }, { owners: id.toString() })).toBe(true);
    });

    it('does not make other strings equal to each other', () => {
      expect(matches({ a: id.toString() }, { a: 'something else' })).toBe(false);
    });
  });

  describe('dates', () => {
    it('matches equal dates by value, and different dates not', () => {
      expect(matches({ at: new Date('2026-01-01T00:00:00Z') }, { at: new Date('2026-01-01T00:00:00Z') })).toBe(true);
      expect(matches({ at: new Date('2026-01-01T00:00:00Z') }, { at: new Date('2026-01-02T00:00:00Z') })).toBe(false);
    });

    it('matches dates in $in by value', () => {
      expect(matches({ at: new Date('2026-01-01T00:00:00Z') }, { at: { $in: [new Date('2026-01-01T00:00:00Z')] } })).toBe(true);
    });
  });

  describe('$in', () => {
    it('matches a scalar field, and an array field that shares a member', () => {
      expect(matches({ a: 'x' }, { a: { $in: ['x', 'y'] } })).toBe(true);
      expect(matches({ a: ['p', 'x'] }, { a: { $in: ['x'] } })).toBe(true);
      expect(matches({ a: 'z' }, { a: { $in: ['x', 'y'] } })).toBe(false);
    });
  });
});

describe('InMemoryCollection lookups by _id', () => {
  const Thing = model<{ name: string }>('InMemoryModelSpecThing', new (require('mongoose').Schema)({ name: String }));
  let collection: InMemoryCollection;

  beforeEach(() => { collection = new InMemoryCollection(Thing); });
  afterEach(() => { collection.restore(); jest.restoreAllMocks(); });

  it('finds a document by the string form of its _id, as Mongoose does', async () => {
    const stored = collection.add({ name: 'first' });
    collection.add({ name: 'second' });
    const found = await Thing.findOne({ _id: String(stored['_id']) });
    expect(found?.name).toBe('first');
  });

  it('finds several documents by a list of ids', async () => {
    const a = collection.add({ name: 'a' });
    collection.add({ name: 'b' });
    const c = collection.add({ name: 'c' });
    const found = await Thing.find({ _id: { $in: [String(a['_id']), c['_id']] } });
    expect(found.map((d) => d.name)).toEqual(['a', 'c']);
  });
});
