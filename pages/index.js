import { Component } from 'react'
import Head from 'next/head'

let schema = () => ({
  todos: [
    {
      title: 'fake-todo-title-string',
      done: 'fake-todo-done-boolean',
      tags: [],
    },
    {
      title: 'fake-todo-title-string2',
      done: 'fake-todo-done-boolean',
      tags: [],
    },
  ],
  tags: [
    {
      name: 'fake-tag-name-string',
      color: 'fake-tag-hex-color',
    },
  ],
})

export default class extends Component {
  state = schema()

  actions = {
    tags: {
      create: () => {},
      update: () => {},
      delete: () => {},
    },
    todos: {
      create: event => {
        let title = event.currentTarget.value
        if (title.length < 3) {
          return
        }
        if (event.key === 'Enter') {
          this.setState({
            todos: this.state.todos.concat({ title, done: false }),
          })
        }
      },
      update: event => {
        console.log('double clicked')
      },
      delete: event => {
        console.log('todos.delete() action')
      },
    },
  }

  render() {
    // prettier-ignore
    let {
      actions,
      state: { todos, tags },
    } = this

    // TODO: tags
    let rows = todos.map(({ title, done, tags }) => (
      <li onDoubleClick={actions.todos.update}>
        <div className="read-todo">
          <label>{title}</label>
          <button className="delete-todo" onClick={actions.todos.delete}>
            X
          </button>
        </div>
        <input className="update-todo" value={title} />
      </li>
    ))

    return (
      <div id="app">
        <GlobalStyles />
        <ScopedStyles />

        <Head>
          <title>Todo Tags App</title>
        </Head>

        <h1>Todo Tags App</h1>

        <section className="container">
          <input
            type="text"
            id="new-todo-input"
            placeholder="What needs to be done?"
            onKeyDown={actions.todos.create}
          />

          <section>
            <ul className="todo-list">{rows}</ul>
          </section>
        </section>
      </div>
    )
  }
}

const hexGray = '777'

let ScopedStyles = () => (
  <style jsx>{`
    #app {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    #new-todo-input {
      font: inherit;
      font-size: 22px;
      color: inherit;
      margin: 0;
      padding: 16px 48px;
      background-color: transparent;
      border: none;
      border-bottom: 2px solid #${hexGray};
      border-radius: 0;
      -webkit-font-smoothing: antialiased;
      width: 100%;
    }
    #new-todo-input:focus {
      outline: none;
    }

    .container {
      min-width: 256px;
      max-width: 768px;
      width: 90%;
    }

    section {
      padding: 32px;
    }

    .todo-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .todo-list li {
      position: relative;
      border-bottom: 1px solid #${hexGray};
      padding: 16px 24px;
    }

    .todo-list li .update-todo {
      display: none;
    }

    .todo-list li .delete-todo {
      border: none;
      color: red;

      position: absolute;
      right: 24px;
      margin-top: 4px;
      opacity: 0.4;
    }
    .todo-list li .delete-todo:hover {
      opacity: 1;
      cursor: pointer;
    }

    h1 {
      padding-top: 32px;
      font-weight: 300;
    }
  `}</style>
)

let GlobalStyles = () => (
  <style jsx global>{`
    html {
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      letter-spacing: 0.6px;

      background-color: #101010;
      color: #eee;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    html,
    body {
      height: 100vh;
      width: 100vw;
      padding: 0;
      margin: 0;
    }

    body {
      line-height: 1.4em;
      -webkit-font-smoothing: antialiased;
      font-size: 20px;
      font-weight: 400;
      font-family: sans-serif;
    }

    h1 {
      font-size: 2em;
      margin: 0.67em 0;
    }

    button,
    input {
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
    }

    button {
      padding: 0;
      margin: 0;
      text-transform: none;
      background: transparent;
      color: inherit;
      -webkit-font-smoothing: antialiased;
      -webkit-appearance: button;
    }

    :focus {
      outline: none;
    }
  `}</style>
)
