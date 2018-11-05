import React from 'react'
import { Button } from 'antd'
import logo from '-/assets/antd.svg'

import styles from './antd.module.less'

const Antd = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>
        Edit
        {' '}
        <code>src/pages/antd/index.tsx</code>
        {' '}
        and save to reload.
      </p>
      <a
        className={styles.link}
        href="https://ant.design/index-cn"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn AntD
      </a>
      <Button type="primary">点我</Button>
    </header>
  </div>
)
export default Antd
