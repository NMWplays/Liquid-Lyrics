const OWN_SUBTREE_SELECTOR = '[id^="liquid-lyrics"]';

export function isOwnMutation(records: MutationRecord[]): boolean {
  for (let index = 0; index < records.length; index++) {
    const target = records[index].target;
    const element = target.nodeType === Node.ELEMENT_NODE ? (target as Element) : target.parentElement;
    if (!element?.closest(OWN_SUBTREE_SELECTOR)) return false;
  }
  return true;
}
