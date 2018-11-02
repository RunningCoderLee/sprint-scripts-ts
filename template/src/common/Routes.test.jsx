import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Routes from './Routes'
import ReactHome from '-/pages/react'
import Antd from '-/pages/antd'
import PageNotFound from '-/pages/pageNotFound'

 const renderRoutes = path => mount(
  <MemoryRouter initialEntries={[path]}>
    {/* <Provider store={configureStore()}> */}
    <Routes />
    {/* </Provider> */}
  </MemoryRouter>,
)
 describe('Test <App />', () => {
  it('valid path should not redirect to 404 page', () => {
    const wrapper = renderRoutes('/react')
     expect(wrapper.find(ReactHome)).toHaveLength(1)
    expect(wrapper.find(PageNotFound)).toHaveLength(0)
  })
   it('invalid path should redirect to 404 page', () => {
    const wrapper = renderRoutes('/random')
    expect(wrapper.find(ReactHome)).toHaveLength(0)
    expect(wrapper.find(PageNotFound)).toHaveLength(1)
  })
  it('"/antd path" should render antd page', () => {
    const wrapper = renderRoutes('/antd')
    expect(wrapper.find(Antd)).toHaveLength(1)
    expect(wrapper.find(ReactHome)).toHaveLength(0)
    expect(wrapper.find(PageNotFound)).toHaveLength(0)
  })
})