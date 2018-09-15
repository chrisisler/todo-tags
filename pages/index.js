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
        let { todos } = this.state
        if (validTitle(title, todos)) {
          if (event.key === 'Enter') {
            this.setState({
              todos: todos.concat({ title, done: false }),
            })
            event.currentTarget.value = ''
          }
        }
      },
      doubleClicked: event => {
        if (this.doubleClickedRef !== void 0) {
          this.doubleClickedRef.classList.remove('updating')
        }
        let todoElement = event.currentTarget
        this.doubleClickedRef = todoElement
        todoElement.classList.add('updating')
      },
      update: (event, index) => {
        let updatedTitle = event.currentTarget.value
        let { todos } = this.state
        if (validTitle(updatedTitle, todos)) {
          if (event.key === 'Enter' || event.type === 'blur') {
            let updatedTodos = todos.slice()
            updatedTodos[index].title = updatedTitle
            this.setState({ todos: updatedTodos })
            this.doubleClickedRef.classList.remove('updating')
          }
        } else {
          if (event.type === 'blur') {
            this.doubleClickedRef.classList.remove('updating')
          }
        }
      },
      delete: title => {
        // Assumes titles are unique!
        this.setState({
          todos: this.state.todos.filter(todo => todo.title !== title),
        })
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
    let rows = todos.map(({ title, done, tags }, index) => (
      <li onDoubleClick={actions.todos.doubleClicked}>
        <div className="read-todo">
          <label>{title}</label>
          <button
            className="delete-todo"
            onClick={_ => actions.todos.delete(title)}
          >
            X
          </button>
        </div>
        <input
          className="update-todo"
          defaultValue={title}
          onKeyDown={event => actions.todos.update(event, index)}
          onBlur={event => actions.todos.update(event, index)}
        />
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
      user-select: none;
    }

    .todo-list li {
      position: relative;
      border-bottom: 1px solid #${hexGray};
      padding: 16px 24px;
    }

    .todo-list li.updating .update-todo {
      display: block;
      background: transparent;
      color: inherit;
      width: 100%;
      border: 1px solid #${hexGray};
      padding: 8px 16px;
      margin-top: 8px;
    }

    .todo-list li .update-todo {
      display: none;
    }

    .todo-list li .delete-todo {
      border: none;
      position: absolute;
      right: 24px;
      margin-top: 4px;
      opacity: 0.2;
      color: orange;
    }
    .todo-list li .delete-todo:hover {
      opacity: 1;
      cursor: pointer;
      color: red;
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
      color: #c6e2ff;
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

function validTitle(string, todos) {
  return string.length >= 1 && !todos.some(todo => todo.title === string)
}
