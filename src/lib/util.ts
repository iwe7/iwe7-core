export function throwContentAlreadyAttachedError() {
    throw Error('Attempting to attach content after content is already attached');
}
