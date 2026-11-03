export function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || typeof target !== 'object') {
    return false;
  }
  const view = (target as Node).ownerDocument?.defaultView;
  const isHtmlElement =
    target instanceof HTMLElement ||
    (!!view && typeof view.HTMLElement === 'function' && target instanceof view.HTMLElement) ||
    ((target as Node).nodeType === 1 && typeof (target as HTMLElement).tagName === 'string');
  if (!isHtmlElement) {
    return false;
  }
  const el = target as HTMLElement;
  const tagName = el.tagName.toUpperCase();
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || tagName === 'OPTION') {
    return true;
  }
  if (
    el.isContentEditable ||
    el.contentEditable === 'true' ||
    el.contentEditable === '' ||
    el.getAttribute?.('contenteditable') === 'true' ||
    el.getAttribute?.('contenteditable') === ''
  ) {
    return true;
  }
  return false;
}
