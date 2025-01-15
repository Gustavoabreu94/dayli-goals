import { createBrowserRouter } from 'react-router-dom'
import { Application } from './pages/application'
import { SignInWithGithubCallback } from './pages/sign-in-with-github-callback'
import { SignInWithGithub } from './pages/sing-in-with-github'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInWithGithub />,
  },
  {
    path: '/app',
    element: <Application />,
  },
  {
    path: '/auth/github/callback',
    element: <SignInWithGithubCallback />,
  },
])
