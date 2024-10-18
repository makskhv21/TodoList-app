import "./App.css"
import Sidebar from "./components/Sidebar"
import MainContent from './components/MainContent';

function App() {

    const projects = ['Work 👜', 'Groceries 🛒', 'Reading List 📚', 'Personal 📝'];
    const tasks = [
        { id: 1, text: 'work 1', completed: false },
        { id: 2, text: 'work 2', completed: false },
        { id: 3, text: 'work 3', completed: false },
    ];

    return(
        <div className="app">
            <Sidebar projects={projects} />
            <MainContent tasks={tasks} />
        </div>
    )
}

export default App;