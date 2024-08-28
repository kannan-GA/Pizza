import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="rounded-full bg-yellow-200 px-4 py-2 text-sm tracking-normal transition-all duration-700 placeholder:text-stone-800 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-2 sm:focus:w-80"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
