import "./App.css"
import Sidebar from "./components/Sidebar"

function App() {

    const projects = ['Work 👜', 'Groceries 🛒', 'Reading List 📚', 'Personal 📝'];

    return(
        <div className="app">
            <Sidebar projects={projects} />
            <h1>My todoList-app</h1>
        </div>
    )
}

export default App;