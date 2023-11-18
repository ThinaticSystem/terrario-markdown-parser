export class AssertionError extends Error {
    constructor(reason?: string) {
        const message = (reason == null)
            ? 'Assertion failed'
            : `Assertion failed: ${reason}`;
        super(message);
    }
}
