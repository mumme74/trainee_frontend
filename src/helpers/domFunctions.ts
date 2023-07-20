/**
 * @brief gets the offsetLeft up to rootnode including
 *        possible non static elements in chain
 * @param element the element to search on
 * @returns the true offsetLeft
 */
export function getElementLeft(element: HTMLElement) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement;

  while (current !== null) {
    actualLeft += current.offsetLeft!;
    current = current.offsetParent as HTMLElement;
  }
  return actualLeft;
}

/**
 * @brief gets the offsetTop up to rootnode including
 *        possible non static elements in chain
 * @param element the element to search on
 * @returns the true offsettop
 */
export function getElementTop(element: HTMLElement) {
  let actualLeft = element.offsetTop;
  let current = element.offsetParent as HTMLElement;

  while (current !== null) {
    actualLeft += current.offsetTop!;
    current = current.offsetParent as HTMLElement;
  }
  return actualLeft;
}
