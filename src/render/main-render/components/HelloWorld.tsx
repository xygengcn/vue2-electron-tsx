import { VueComponent } from '@/render/common/vue-component';
import { Component, Prop } from 'vue-property-decorator';

interface HelloWorldProps {
  msg: string;
}

@Component({
  name: 'HelloWorld'
})
export default class HelloWorld extends VueComponent<HelloWorldProps> {
  @Prop() private readonly msg!: string;

  public render() {
    return <div class="hello-world">
      <h1>{this.msg}</h1>
    </div>;
  }
}
