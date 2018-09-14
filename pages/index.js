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
        let todos = this.state.todos.concat({ title, done: false })
        this.setState(todos)
      },
      update: () => {},
      delete: () => {},
    },
  }

  render() {
    // prettier-ignore
    let {
      actions,
      state: { todos, tags },
    } = this

    // prettier-ignore
    let rows = todos.map(({ title, done }) => (
      <li>
        {title}
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

        <input
          type="text"
          id="new-todo-input"
          placeholder="What needs to be done?"
          onKeyDown={actions.todos.create}
        />

        <section>
          <ul className="todo-list">{rows}</ul>
        </section>
      </div>
    )
  }
}

let ScopedStyles = () => (
  <style jsx>{`
    #app {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    #new-todo-input {
      font-size: 20px;
      margin: 0;
      padding: 8px 24px;
      color: inherit;
      background-color: transparent;
      text-align: center;
      border: none;
      border-bottom: 2px solid #777;
      border-radius: 0;
      min-width: auto;
      width: 60%;
    }

    section {
      padding: 32px;
    }

    ul.todo-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    h1 {
      font-weight: 300;
    }
  `}</style>
)

let GlobalStyles = () => (
  <style jsx global>{`
    html {
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 200;
      font-family: sans-serif;
      line-height: 1.15;
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
      text-transform: none;
      -webkit-appearance: button;
    }
  `}</style>
)
