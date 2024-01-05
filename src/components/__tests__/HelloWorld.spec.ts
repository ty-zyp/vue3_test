import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue' // src\components\HelloWorld.vue
// import HelloWorld from '@/src/components/HelloWorld.vue' // src\components\HelloWorld.vue

describe('HelloWorld', () => {
  it('renders properly', (ctx) => {
    // console.log(1,ctx.task.meta,ctx)
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
