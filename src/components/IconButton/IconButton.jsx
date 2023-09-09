import PropTypes from 'prop-types';

export default function IconButton({ children, onClick, ...allyProps }) {
  return (
    <button type="button" onClick={onClick} {...allyProps}>
      {children}
    </button>
  );
}

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
