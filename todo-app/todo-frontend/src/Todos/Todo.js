const Todo = ({ todo, onClickDelete, onClickComplete }) => {
  const doneInfo = (
    <>
      <span data-testid="status">This todo is done</span>
      <span>
        <button data-testid="deleteButton" onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span data-testid="status">
        This todo is not done
      </span>
      <span>
        <button data-testid="deleteButton" onClick={onClickDelete(todo)}> Delete </button>
        <button data-testid="completeButton" onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span data-testid="todoText">
              {todo.text} 
            </span>
            {todo.done ? doneInfo : notDoneInfo}
          </div>
  )
}

export default Todo