export default function TextInput({ limit, placeholder }) {
  return (
    <div className="flex justify-between border border-black p-3">
      <input type="text" placeholder={placeholder} maxLength={limit} className="focus:outline-none focus:ring-0 w-full" />
      <span>{limit}</span>
    </div>
  );
}
