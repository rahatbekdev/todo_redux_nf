
import { useDispatch } from 'react-redux';
import { confirm } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleConfirm = () => {
    dispatch(confirm());
    navigate('/todo');
  };

  return (
    <div>
      <h2>Подтверждение</h2>
      <button onClick={handleConfirm} >
        Подтвердить
      </button>
    </div>
  );
};

export default Confirm;
