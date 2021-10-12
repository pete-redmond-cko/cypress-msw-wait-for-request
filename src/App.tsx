import { PostsContainer } from './PostsContainer';
import { AddNewPostContainer } from './AddNewPostContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <section>
        <h1>Posts</h1>
        <PostsContainer />
      </section>
      <section>
        <h1>Add new post</h1>
        <AddNewPostContainer />
      </section>
    </div>
  );
}

export default App;
