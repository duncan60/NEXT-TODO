import Link from 'next/link';

const TodoItem = (props) => {
  return (
    <li className={ props.status }>
      <div className="view">
        <input 
          className="toggle"
          type="checkbox"
          checked={ props.status === 'completed' }
          onChange= { () => {
            props.onComplete(props.id);
          }}
        />
        <label>
          <Link as={`/todos/${props.id}`} href={`/todo?id=${props.id}`}>
            <a>{ props.text }</a>
          </Link>
        </label>
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