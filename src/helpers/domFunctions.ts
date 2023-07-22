/**
 * @brief gets the offsetLeft up to rootnode including
 *        possible non static elements in chain
 * @param element the element to search on
 * @returns the true offsetLeft
 */
export function getElementLeft(element: HTMLElement) {
  let current = element, actualLeft = 0;

  do {
    actualLeft += current.offsetLeft!;
    current = current.offsetParent as HTMLElement;
  } while (current !== null);

  return actualLeft;
}

/**
 * @brief gets the offsetTop up to rootnode including
 *        possible non static elements in chain
 * @param element the element to search on
 * @returns the true offsettop
 */
export function getElementTop(element: HTMLElement) {
  let current = element, actualTop = 0;

  do {
    actualTop += current.offsetTop!;
    current = current.offsetParent as HTMLElement;
  } while (current !== null);

  return actualTop;
}
