import PropTypes from 'prop-types';

const aux = props => props.children;

aux.propTypes = {
  children: PropTypes.element
};

export default aux;
