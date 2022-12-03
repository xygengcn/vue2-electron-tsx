import Vue from 'vue';
export class VueComponent<T> extends Vue {
  public __props!: T & { [prop: string]: any };
}
