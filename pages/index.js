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
  <div>
    <GlobalStyles />

    <Head>
      <title>Todo Tags App</title>
    </Head>

    <h1>Todo Tags</h1>
  </div>
)

let GlobalStyles = () => (
  <style jsx global>{`
    html,
    body {
      background: #101010;
      color: #eee;
      font-family: sans-serif;
    }
  `}</style>
)
