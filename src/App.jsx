import React from 'react';
import logo from '@/assets/logo.svg';
import { Input } from 'antd';
import styles from './App.less';

function App() {
  return (
    <div className={styles.app}>
      <img src={logo} alt="logo" />
      <Input />
    </div>
  );
}

export default App;
