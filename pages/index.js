/** @flow */
/** @prettier */

import { Component } from 'react'
import Head from 'next/head'

export default class App extends Component {
  state = schema()
  actions = {
    todos: {
      create: event => {
        let title = event.currentTarget.value
        let { todos } = this.state
        if (title.length >= 1 && !todos.some(todo => todo.title === title)) {
          if (event.key === 'Enter') {
            let todo = { title, done: false, tags: [] }
            this.setState({ todos: todos.concat(todo) })
            event.currentTarget.value = ''
          }
        }
      },
      doubleClicked: event => {
        if (this.doubleClickedRef !== void 0) {
          this.doubleClickedRef.classList.remove('updating')
        }
        this.doubleClickedRef = event.currentTarget.parentNode
        this.doubleClickedRef.classList.add('updating')
        // document.querySelector('.list li.updating input.update-todo').focus()
      },
      update: (event, index) => {
        let nextTitle = event.currentTarget.value
        let { todos } = this.state
        if (nextTitle.length > 1 && !todos.some(todo => todo.title === nextTitle)) {
          if (event.key === 'Enter' || event.type === 'blur') {
            let nextTodos = todos.slice()
            nextTodos[index].title = nextTitle
            this.setState({ todos: nextTodos })
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
        let todos = this.state.todos.filter(todo => todo.title !== title)
        this.setState({ todos })
      },
      tags: {
        add: (event, todoIndex) => {
          this.doubleClickedRef.classList.remove('updating')
          let tagName = event.currentTarget.value
          if (tagName === '') {
            return
          }
          let newTag = { name: tagName }
          let nextTodos = this.state.todos.slice()
          nextTodos[todoIndex].tags.push(newTag)
          this.setState({ todos: nextTodos })
        },
        remove: (todoIndex, tagIndex) => {
          // There's a way to do this with better runtime analysis.
          let nextTodos = this.state.todos.slice()
          nextTodos[todoIndex].tags.splice(tagIndex, 1)
          this.setState({ todos: nextTodos })
        }
      }
    },
    tags: {
      create: event => {
        let name = event.currentTarget.value
        let { tags } = this.state
        if (name.length >= 1 && !tags.some(tag => tag.name === name)) {
          if (event.key === 'Enter') {
            let tag = { name }
            this.setState({ tags: tags.concat(tag) })
            event.currentTarget.value = ''
          }
        }
      },
      delete: tagName => {
        let tags = this.state.tags.filter(tag => tag.name !== tagName)
        this.setState({ tags })
      }
    }
  }

  async componentWillMount() {
    try {
      let r = await fetch('http://localhost:3020')
      console.log('r is:', r)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // prettier-ignore
    let {
      actions,
      state: { todos, tags },
    } = this

    let renderedTodos = todos.map((todo, todoIndex) => {
      let renderedTags =
        todo.tags.length > 0 &&
        todo.tags.map((tag, tagIndex) => {
          return (
            <li key={tag.name}>
              <div>
                <label>{tag.name}</label>
                <button
                  className="remove-tag"
                  onClick={_ => actions.todos.tags.remove(todoIndex, tagIndex)}
                >
                  X
                </button>
              </div>
            </li>
          )
        })

      return (
        <li key={todo.title}>
          <div onDoubleClick={actions.todos.doubleClicked}>
            <label>{todo.title}</label>
            <button className="delete" onClick={_ => actions.todos.delete(todo.title)}>
              X
            </button>
          </div>
          {!!renderedTags && <ul className="tags">{renderedTags}</ul>}
          <input
            className="update-todo"
            defaultValue={todo.title}
            onKeyDown={event => actions.todos.update(event, todoIndex)}
            onBlur={event => actions.todos.update(event, todoIndex)}
          />
          {tags.length > 0 && (
            <select
              className="add-tag"
              onChange={event => actions.todos.tags.add(event, todoIndex)}
            >
              <option value="">Add tag...</option>
              {tags.map(tag => (
                <option key={tag.name}>{tag.name}</option>
              ))}
            </select>
          )}
        </li>
      )
    })

    return (
      <div id="flex-center">
        <GlobalStyles />
        <ScopedStyles />

        <Head>
          <title>Todo Tags App</title>
        </Head>

        <h1>Todo Tags App</h1>

        <main className="container">
          <input
            type="text"
            className="create-state-input"
            placeholder="What needs to be done?"
            onKeyDown={actions.todos.create}
          />

          <section>
            <ul className="list">{renderedTodos}</ul>
          </section>

          <section>
            <input
              type="text"
              className="create-state-input"
              placeholder="Create a new tag"
              onKeyDown={actions.tags.create}
            />

            <section>
              <ul className="list">
                {tags.map(tag => (
                  <li key={tag.name}>
                    <label>{tag.name}</label>
                    <button className="delete" onClick={_ => actions.tags.delete(tag.name)}>
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </main>
      </div>
    )
  }
}

const hexGray = '777'

let ScopedStyles = () => (
  <style jsx>{`
    #flex-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .create-state-input {
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

    main.container {
      min-width: 256px;
      max-width: 768px;
      width: 80%;
    }

    section {
      padding: 32px;
    }

    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      user-select: none;
    }

    .list li {
      position: relative;
      border-bottom: 1px solid #${hexGray};
      padding: 16px 24px;
    }

    .list li .tags {
      padding: 0;
      list-style: none;
      font-size: 14px;
      display: flex;
    }

    .list li .tags li {
      border: 1px solid #333;
      width: fit-content;
      padding: 0 28px 0 16px;
      margin: 16px 8px 0 8px;
    }

    .list li .tags li .remove-tag {
      margin-top: 7px;
      border: none;
      position: absolute;
      color: orange;
      opacity: 0.2;
      right: 8px;
    }
    .list li .tags li .remove-tag:hover {
      opacity: 1;
      cursor: pointer;
      color: red;
      font-weight: bolder;
    }

    .list li.updating {
      display: block;
    }

    .list li.updating .update-todo {
      display: block;
      background: transparent;
      color: inherit;
      width: 100%;
      border: 1px solid #${hexGray};
      padding: 8px 16px;
      margin-top: 8px;
      font-size: smaller;
    }
    .list li .update-todo {
      display: none;
    }

    .list li.updating .add-tag {
      width: 100%;
      margin: 16px auto;
      display: block;
    }
    .list li .add-tag {
      display: none;
    }

    .list li .delete {
      border: none;
      position: absolute;
      right: 24px;
      margin-top: 4px;
      opacity: 0.2;
      color: orange;
    }
    .list li .delete:hover {
      opacity: 1;
      cursor: pointer;
      color: red;
      font-weight: bolder;
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

function schema() {
  return {
    todos: [
      {
        title: 'fake-todo-title-string',
        done: false,
        tags: []
      },
      {
        title: 'fake-todo-title-string2',
        done: false,
        tags: [
          {
            name: 'major problem'
          },
          {
            name: 'good first problem'
          }
        ]
      }
    ],
    tags: [
      {
        name: 'major problem'
      },
      {
        name: 'good first problem'
      }
    ]
  }
}
