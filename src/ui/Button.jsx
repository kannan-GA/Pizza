import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const className =
    'inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-all hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm ';

  const styles = {
    base: className + ' px-4 py-2.5 text-xs md:px-5 md:py-3',
    primary: className + 'px-5 py-3 md:px-6 md:py-4 ',
    round: className + 'px-2 py-1 md:px-3 md:py-2 text-xs',
    secondary:
      'inline-block rounded-full bg-transparent   font-semibold uppercase tracking-wide text-stone-800 transition-all hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-stone-300 focus:bg-stone-300 hover:text-stone-800 px-5 py-3 text-sm md:px-6 md:py-4',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
