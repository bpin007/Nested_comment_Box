import { useState } from "react";
import "./App.css";
import NestedComments from "./components/nested_comment";
import commentsData from "./data/comment.json";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Nested comment system</h1>
      <NestedComments
        commentsData={commentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        // onUpvote={() => {}}
        // onDownVote={() => {}}
      />
    </>
  );
}

export default App;
