export default function Button({ bgColor='#f5f5ee', textColor='white', onClick, children }) {
  const colorclass = `rounded-full px-6 py-3 bg-[${bgColor}] text-${textColor} cursor-pointer hover:-translate-y-[1px] transition duration-150 ease-in-out active:-translate-y-0 active:opacity-75`;

  return (
    <button onClick={onClick} className={colorclass}>
      {children}
    </button>
  );
}
