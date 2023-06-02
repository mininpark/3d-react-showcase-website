import { useSnapshot } from 'valtio';
import PropTypes from 'prop-types';
import state from '../../store';

const CustomButton = (props) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#fff',
      };
    }
  };
  return (
    <button
      className="custom__btn"
      style={generateStyle(props.type)}
      onClick={props.handleClick}
    >
      {props.title}
    </button>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['filled', '']),
  handleClick: PropTypes.func,
};
