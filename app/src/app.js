import {div, textarea, h} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {
  let post = '';
  const vtree$ = sources.DOM.select('textarea').events('input')
      .map(ev => {
        switch (ev.inputType) {
          case "insertLineBreak":
            post += '\n';
            break;
          case "deleteContentBackward":
            post = post.slice(0,-1);
            break;
          default:
            post += ev.data;
        }

        document.getElementById('editor').innerHTML = post.replace(/#(.*)\n/g, '<h1>$1</h1>')
                                                          .replace(/(.*)\n/g, '$1<br>')

        return;
      })
      .startWith(post)
      .map(content =>
        div([textarea({attrs: { style: 'width: 400px; height: 200px;' }}), div({ attrs: { id: 'editor' } })])
      )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
