import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/store.js'
import { persistor } from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { Protector } from './components/index.js'
import Post from './pages/Post.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"login",
        element:(
          <Protector authentication={false}>
            <Login/>
          </Protector>
        )
      },
      {
        path:"signup",
        element:(
          <Protector authentication={false}>
            <Signup/>
          </Protector>
        )
      },
      {
        path:"post",
        element:(
          <Protector authentication>
            <Post/>
          </Protector>
        )
      },
      {
        path:"post/:slug",
        element:(
          <Protector authentication>
            <Post/>
          </Protector>
        )
      },
      {
        path:"all-post",
        element:(
          <Protector authentication>
            <AllPost/>
          </Protector>
        )
      },
      {
        path:"create",
        element:(
          <Protector authentication>
            <AddPost/>
          </Protector>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <Protector>
            <EditPost/>
          </Protector>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router}/>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
