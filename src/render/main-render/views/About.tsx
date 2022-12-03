import { Component } from 'vue-property-decorator';
import { VueComponent } from '@/render/common/vue-component';

interface AboutProps {}

@Component
export default class About extends VueComponent<AboutProps> {
  public render() {
    return (
      <div class="about">
        <h1>这是about页面</h1> 
      </div>
    );
  }
}
