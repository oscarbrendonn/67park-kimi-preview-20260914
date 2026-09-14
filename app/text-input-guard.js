// Text entry owns keys and pointer gestures, without switching camera modes.
export function isTextEntry(target = globalThis.document?.activeElement) {
 return !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
  target.tagName === 'SELECT' || target.isContentEditable === true ||
  !!target.closest?.('[contenteditable="true"],[contenteditable=""]'));
}
export function ignoreGameKey(event) {
 return !!event.defaultPrevented || isTextEntry(event.target) || isTextEntry();
}
export function stopChatKey(event) { event.stopPropagation(); }
export function focusChatInput(input) { input?.focus({preventScroll:true}); }
