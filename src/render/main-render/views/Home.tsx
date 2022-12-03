import HelloWorld from '@/render/main-render/components/HelloWorld';
import { VueComponent } from '@/render/common/vue-component';
import { Component } from 'vue-property-decorator';

interface HomeProps {
  msg: string;
}

@Component
export default class Home extends VueComponent<HomeProps> {
  private msg = '这是Eletron+vue2+Typescript+less 实现';

  public render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={require('../assets/logo.png')} />
        <HelloWorld msg={this.msg} />
      </div>
    );
  }
}
