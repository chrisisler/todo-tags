import { Component } from 'react'
import Head from 'next/head'

let schema = () => ({
  tags: [
    {
      name: 'fake-tag-name-string',
      color: 'fake-tag-hex-color',
    },
  ],
  todos: [
    {
      title: 'fake-todo-title-string',
      done: 'fake-todo-done-boolean',
      tags: [],
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
      },
      update: () => {},
      delete: () => {},
    },
  }

  render() {
    let { actions, state } = this

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
          id="todo-input"
          placeholder="What needs to be done?"
          onKeyDown={actions.todos.create}
        />
      </div>
    )
  }
}

let ScopedStyles = () => (
  <style jsx>{`
    #app {
      padding: 0 16px;
    }

    #todo-input {
      margin: 0;
      padding: 8px 24px;
      color: inherit;
      background-color: transparent;
      border: none;
      border-bottom: 2px solid black;
      border-radius: 3px;

      width: 100%;
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

      // background-color: #101010;
      // color: #eee;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    body {
      margin: 0;
      padding: 0.2rem;
    }

    html,
    body {
      height: 100vh;
      width: 100vw;
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
