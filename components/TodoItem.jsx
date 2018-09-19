const TodoItem = (props) => {
  return (
    <li className={ props.status }>
      <div className="view">
        <input 
          className="toggle"
          type="checkbox"
          onClick= { () => {
            props.onComplete(props.id);
          }}
        />
        <label>{ props.text }</label>
        <button
          className="destroy"
          onClick={ () => {
            props.onClear(props.id);
          } }
        />
      </div>
    </li>
  );
};

export default TodoItem