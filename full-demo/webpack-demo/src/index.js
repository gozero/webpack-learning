import _ from 'lodash'
import printMe from './print.js'
import { cube } from './math.js'
import './styles.css'
import './test.scss'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}


function component() {
  var element = document.createElement('pre')
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')

  return element
}

document.body.appendChild(component())
var a = document.createElement('a')
var textNode = document.createTextNode('我是a标签')
a.appendChild(textNode)
document.body.appendChild(a)
