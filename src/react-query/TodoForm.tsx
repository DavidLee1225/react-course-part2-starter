import { useRef } from "react";
import useAddTodos from "./hooks/useAddTodos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addToDO = useAddTodos(() => {
    if (ref.current) ref.current.value = "";
  });

  return (
    <>
      {addToDO.error && (
        <div className="alert alert-danger">{addToDO.error.message}</div>
      )}

      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value)
            addToDO.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addToDO.isPending}>
            {addToDO.isPending ? "Loading..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
