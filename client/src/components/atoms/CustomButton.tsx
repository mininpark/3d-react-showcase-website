import { useSnapshot } from 'valtio';
import PropTypes from 'prop-types';
import state from '../../store';
import { getContrastingColor } from '../../config/helpers';

const CustomButton = (props: any) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: any) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
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
  type: PropTypes.oneOf(['filled', 'outline']),
  handleClick: PropTypes.func,
};
