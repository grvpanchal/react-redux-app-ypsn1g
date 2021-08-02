import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => (
    <a
      href="#"
      className="btn btn-primary"
       onClick={onClick}
       disabled={active}
       role="button"
    >
      {children}
    </a>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link