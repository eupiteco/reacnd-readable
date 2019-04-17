import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Categories extends React.Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    categoryIds: PropTypes.arrayOf(PropTypes.string).isRequired
  };
  render() {
    const { categories, categoryIds } = this.props;
    return (
      <ul className="categories">
        {categoryIds.map(id => {
          const c = categories[id];
          return (
            <li key={c.path}>
              <Link to={`/c/${c.path}`} className="category-link">
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categoryIds: Object.keys(categories),
  categories
});
export default connect(mapStateToProps)(Categories);
