import { Model } from 'mongoose';

type Doc = Record<string, unknown>;
type Filter = Record<string, unknown>;

const isOperatorObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof Date) && Object.keys(v).some((k) => k.startsWith('$'));

/** A small subset of Mongo's query matching: equality, array membership, `$in`, and missing/undefined */
export function matches(doc: Doc, filter: Filter = {}): boolean {
  return Object.entries(filter).every(([key, wanted]) => {
    const actual = doc[key];
    if (isOperatorObject(wanted)) {
      const candidates = wanted['$in'] as unknown[] | undefined;
      return candidates ? (Array.isArray(actual) ? actual.some((a) => candidates.includes(a)) : candidates.includes(actual)) : false;
    }
    if (wanted === undefined || wanted === null) return actual === undefined || actual === null;
    if (Array.isArray(wanted)) return wanted.flat().includes(actual);
    if (Array.isArray(actual)) return actual.includes(wanted);
    return actual === wanted;
  });
}

/**
 * Backs a real Mongoose model with an array, so a service can be tested against its real schema without a
 * database: find / findOne / updateMany / deleteMany on the model, save / deleteOne on its documents.
 * `docs` holds plain objects; queries return fresh documents, so changes only stick when they are saved.
 */
export class InMemoryCollection {
  public docs: Doc[] = [];
  private spies: jest.SpyInstance[] = [];

  constructor(private readonly Model: Model<any>) {
    const self = this;
    const hydrate = (d: Doc) => new Model(d);

    this.spies.push(
      jest.spyOn(Model, 'findOne').mockImplementation(((filter: Filter, _projection?: unknown, options?: { sort?: Record<string, 1 | -1> }) => {
        let found = self.docs.filter((d) => matches(d, filter));
        if (options?.sort) found = self.sorted(found, options.sort);
        return Promise.resolve(found[0] ? hydrate(found[0]) : null);
      }) as never),
      jest.spyOn(Model, 'find').mockImplementation(((filter: Filter) => {
        let found = self.docs.filter((d) => matches(d, filter));
        const query = {
          sort(spec: Record<string, 1 | -1> | [string, 1 | -1][]) { found = self.sorted(found, spec); return query; },
          select() { return query; },
          then: (resolve: (v: unknown) => unknown, reject?: (e: unknown) => unknown) => Promise.resolve(found.map(hydrate)).then(resolve, reject),
        };
        return query;
      }) as never),
      jest.spyOn(Model, 'updateMany').mockImplementation(((filter: Filter, update: Record<string, unknown>) => {
        const hits = self.docs.filter((d) => matches(d, filter));
        for (const doc of hits) {
          const { $pull, ...fields } = update as { $pull?: Record<string, unknown> };
          Object.assign(doc, fields);
          for (const [k, v] of Object.entries($pull ?? {})) {
            doc[k] = (doc[k] as unknown[]).filter((x) => x !== v);
          }
        }
        return Promise.resolve({ matchedCount: hits.length, modifiedCount: hits.length });
      }) as never),
      jest.spyOn(Model, 'deleteMany').mockImplementation(((filter: Filter) => {
        const before = self.docs.length;
        self.docs = self.docs.filter((d) => !matches(d, filter));
        return Promise.resolve({ deletedCount: before - self.docs.length });
      }) as never),
      jest.spyOn(Model.prototype, 'save').mockImplementation(function (this: { toObject(): Doc }) {
        const plain = this.toObject();
        const at = self.docs.findIndex((d) => String(d['_id']) === String(plain['_id']));
        if (at >= 0) self.docs[at] = plain; else self.docs.push(plain);
        return Promise.resolve(this);
      }),
      jest.spyOn(Model.prototype, 'deleteOne').mockImplementation(function (this: { toObject(): Doc }) {
        const id = String(this.toObject()['_id']);
        self.docs = self.docs.filter((d) => String(d['_id']) !== id);
        return Promise.resolve({ deletedCount: 1 }) as never;
      }),
    );
  }

  /** Adds a document and returns it as stored */
  add(data: Doc): Doc {
    const plain = new this.Model(data).toObject() as Doc;
    this.docs.push(plain);
    return plain;
  }

  restore(): void {
    this.spies.forEach((s) => s.mockRestore());
  }

  private sorted(docs: Doc[], spec: Record<string, 1 | -1> | [string, 1 | -1][]): Doc[] {
    const pairs = Array.isArray(spec) ? spec : Object.entries(spec);
    return [...docs].sort((a, b) => {
      for (const [key, dir] of pairs) {
        const x = a[key] as number | Date | boolean | undefined;
        const y = b[key] as number | Date | boolean | undefined;
        if (x === y) continue;
        return ((x ?? 0) > (y ?? 0) ? 1 : -1) * dir;
      }
      return 0;
    });
  }
}
