import Head from 'next/head'

// create
// update
// delete

let actions = {
  tags: {
    create() {},
    update() {},
    delete() {},
  },
  todos: {
    create() {},
    update() {},
    delete() {},
  },
}

export default () => (
  <main>
    <GlobalStyles />
    <ScopedStyles />

    <Head>
      <title>Todo Tags App</title>
    </Head>

    <h1>Todo Tags App</h1>

    <input id="todo-input" placeholder="What needs to be done?" />
  </main>
)

let ScopedStyles = () => (
  <style jsx>{`
    #todo-input {
      font-size: inherit;
      width: 100vw;
    }
  `}</style>
)

let GlobalStyles = () => (
  <style jsx global>{`
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    html {
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 200;
      background: #101010;
      font-family: sans-serif;
      color: #eee;
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
    }

    body {
      margin: 0;
      padding: 0.2rem;
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
