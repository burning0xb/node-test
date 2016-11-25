import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import getRouteParams from 'react-router/lib/getRouteParams';
import { formatPattern } from 'react-router/lib/PatternUtils';


export default class Breadcrumbs extends Component {

  static propTypes = {
    className: PropTypes.string,
    routes: PropTypes.array.isRequired,
    params: PropTypes.object
  };

  getBreadcrumbs(routes, routerParams) {
    let path = '';
    let params = {};

    const breadcrumbs = routes.map(route => {
      params = { ...params, ...getRouteParams(route, routerParams) };
      const name = route.name || route.component && (
        route.component.displayName ||
        route.component.name
      );

      if (route.path) {
        if (route.path.indexOf('/') === 0) {
          path = route.path;
        } else {
          path += '/' + route.path;
        }
      }

      return {
        to: path,
        params,
        name
      };
    })
    .filter(obj => obj && (obj.name || obj.isActive));

    return breadcrumbs.map((obj, idx) => ({ ...obj, isActive: idx === breadcrumbs.length - 1 }));
  }

  render() {
    const { className, routes, params } = this.props;
    const breadcrumbs = this.getBreadcrumbs(routes, params);

    return (
      <ol className={className ? `breadcrumb ${className}` : 'breadcrumb'}>
        {breadcrumbs.map((breadcrumb, idx) =>
          <li className={breadcrumb.isActive && 'active'} key={`breadcrumb-${idx}`}>
            {breadcrumb.isActive ?
              breadcrumb.name || '...' :
              <Link to={formatPattern(breadcrumb.to, breadcrumb.params)}>
                {breadcrumb.name}
              </Link>
            }
          </li>
        )}
      </ol>
    );
  }
}
