import { useSelector } from 'react-redux';

function User() {
  const useName = useSelector((state) => state.user.userName);

  return <div className="hidden text-sm font-semibold md:block">{useName}</div>;
}

export default User;
