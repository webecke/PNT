interface EditFormProps {
  name: string;
  value: string | undefined;
  fullWidth?: boolean;
  setValue: (value: string) => void;
  setEditing: (editing: boolean) => void;
}

const EditForm = ({
  name,
  value,
  fullWidth,
  setValue,
  setEditing,
}: EditFormProps) => {
  return (
    <form>
      <div className="mb-3">
        <label
          htmlFor={`${name}Input`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {name}
        </label>
        <input
          id={`${name}Input`}
          type="text"
          className={`p-2 rounded border border-gray-200 ${
            fullWidth ? "w-full" : "w-auto"
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setEditing(false);
          }}
          autoFocus
        />
      </div>
    </form>
  );
};

export default EditForm;
