import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    type Element = VNode

    type ElementClass = Vue

    interface ElementAttributesProperty {
      __props: any;
    }

    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
