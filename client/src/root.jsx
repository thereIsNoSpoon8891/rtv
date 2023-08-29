import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App'
import "./app.css"
import { UserContextProvider } from './context/UserProvider'
import { IssueContextProvider } from './context/IssueProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
    <IssueContextProvider>
            <UserContextProvider>
                    <App />
            </UserContextProvider>
    </IssueContextProvider>
)
