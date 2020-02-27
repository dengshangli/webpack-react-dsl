import React from 'react';
import './add-content.less';
export function foo() {
  document.write('add-content.js', React.version);
  document.write('hello world!');

  var a = function a() {
    alert('haha');
  };

  a();
}
export function bar() {
  document.write("bar!");
}