type Selector = string;
type Context = Element | Document;

class $ {
  private readonly elems: Element[];

  constructor(selector: Selector, context: Context = document) {
    this.elems = Array.from(context.querySelectorAll(selector));
  }

  find(selector: Selector) {
    return new $(selector, this.elems[0]);
  }

  addClass(...classes: string[]) {
    for (const item of this.elems) {
      item.classList.add(...classes);
    }

    return this;
  }

  removeClass(...classes: string[]) {
    for (const item of this.elems) {
      item.classList.remove(...classes);
    }

    return this;
  }

  css(prop: Exclude<keyof CSSStyleDeclaration, 'parentRule' | 'length'>, val: string) {
    for (const item of this.elems) {
      const element = item as HTMLElement;
      // @ts-expect-error
      element.style[prop] = val;
    }

    return this;
  }

  attr(attr: string, val = '') {
    for (const item of this.elems) {
      item.setAttribute(attr, val);
    }

    return this;
  }

  hasAttr(attr: string) {
    for (const item of this.elems) {
      return item.hasAttribute(attr);
    }
  }

  removeAttr(attr: string) {
    for (const item of this.elems) {
      item.removeAttribute(attr);
    }
  }

  on(eventName: keyof HTMLElementEventMap, callback: (event: Event) => void) {
    for (const item of this.elems) {
      const element = item as HTMLElement;
      element.addEventListener(eventName, callback);
    }
  }
}

const menu = new $('#menu');
const elements = menu
  .find('li.item')
  .addClass('foo', 'bar')
  .removeClass('bar')
  .css('backgroundColor', 'rebeccapurple')
  .css('color', '#fff');

const hiddenParagraph = new $('#hidden');
new $('#button').on('click', () => {
  const isHidden = hiddenParagraph.hasAttr('hidden');
  hiddenParagraph.attr(isHidden ? 'visible' : 'hidden');
  hiddenParagraph.removeAttr(!isHidden ? 'visible' : 'hidden');
});

console.log(elements);
