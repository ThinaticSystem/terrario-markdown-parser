import * as T from 'terrario';
import { space } from '../common';

/**
 * Weeker than
 * - Pre
 */
export class H2 {
    static #keyword = '##';

    static parser =
        T.seq([
            T.lineBegin,
            space.many(), // many({max: 3})にすることでPreとの競合を防げるが優先度の管理が散らかるのでパーサーの呼び出し元に移譲する
            T.token(this.#keyword),
            space,
            T.any.many({ notMatch: T.lineEnd }).span(),
            T.lineEnd,
            T.lf.option(),
        ], 4).map(text => new H2(text.trim()));

    private constructor(public text: string) { }

    toString(): string {
        return `<h2>${this.text}</h2>`;
    }
}
