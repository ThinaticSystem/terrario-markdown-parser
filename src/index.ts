import * as T from 'terrario';
import { AssertionError } from './_assert';
import { H1 } from './elements/h1';
import { H2 } from './elements/h2';

const todo = T.seq([
    T.lineBegin,
    T.any.many({ notMatch: T.lineEnd }).span(),
    T.lineEnd,
    T.lf.option(),
], 1).map(text => ({
    todo: null,
    toString() { return text },
}));
const isTodo = (obj: any): obj is typeof todo => 'todo' in obj;

export const mdParser = T.alt([
    H1.parser,
    H2.parser,
    todo,
]).many().map((elements) => ({
    capturedElements: elements.filter(element => !isTodo(element)),
    _leftover: elements.filter(element => isTodo(element)),
}));

// Parsing

const testSource = `sdf
# honi であるの
## まじまじなの。
### ほに`;

performance.mark('parseStart')
const parsed = mdParser.parse(testSource);
performance.mark('parseFinish')
const benchmark = performance.measure('parsing', 'parseStart', 'parseFinish');

if (!parsed.success) {
    throw new AssertionError();
}

// Logging

console.log(`Source Text (input):
${testSource}

💯Collected Element List:
${parsed.value.capturedElements
        .map(elm => `- ${elm}`)
        .join('\n')
    }

🥴Un-Processed Element List (TODO):
${parsed.value._leftover
    .map(elm => `- ${elm}`)
    .join('\n')}

Parsing Time:
${benchmark.duration} ms`);
