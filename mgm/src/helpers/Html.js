import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
    isMobile: PropTypes.bool
  };

  render() {
    const {assets, component, store, isMobile} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    return (
      <html lang="en-us">
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
          <meta name="description" content="Bootstrap Admin App + jquery"/>
          <meta name="keywords" content="app, responsive, jquery, bootstrap, dashboard, admin"/>
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />


          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { /* Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style}}/> : null*/ }
          <link rel="stylesheet" href="/assets/fontawesome/css/font-awesome.css" />

           <link rel="stylesheet" href="/assets/css/antd.css" />
            <link rel="stylesheet" href="/assets/css/datePickerr.css" />
          <link rel="stylesheet" href="/assets/css/common.css" />
          <link rel="stylesheet" href="/assets/css/2-bz.css" />
          <link rel="stylesheet" href="/assets/css/4.css" />
          <link rel="stylesheet" href="/assets/css/3.css" />
          <link rel="stylesheet" href="/assets/css/5.css" />
          <link rel="stylesheet" href="/assets/css/1.css" />
          <link rel="stylesheet" href="/assets/css/bj2.css" />
          <link rel="stylesheet" href="/assets/css/perfect-scrollbar.min.css"/>

          <link rel="stylesheet" href="/assets/froala/css/themes/dark.min.css"/>
          <link rel="stylesheet" href="/assets/froala/css/themes/gray.min.css"/>
          <link rel="stylesheet" href="/assets/froala/css/themes/red.min.css"/>
          <link rel="stylesheet" href="/assets/froala/css/themes/royal.min.css"/>
          <link rel="stylesheet" href="/assets/froala/css/froala_editor.min.css"/>
          <link rel="stylesheet" href="/assets/froala/css/froala_page.min.css"/>

          <script src="/assets/froala/js/libs/jquery-1.11.1.min.js"></script>
          <script src="/assets/froala/js/froala_editor.min.js"></script>
          <script src="/assets/froala/js/froala_editor_ie8.min.js"></script>
          <script src="/assets/froala/js/plugins/tables.min.js"></script>
          <script src="/assets/froala/js/plugins/lists.min.js"></script>
          <script src="/assets/froala/js/plugins/colors.min.js"></script>
          <script src="/assets/froala/js/plugins/media_manager.min.js"></script>
          <script src="/assets/froala/js/plugins/font_family.min.js"></script>
          <script src="/assets/froala/js/plugins/font_size.min.js"></script>
          <script src="/assets/froala/js/plugins/block_styles.min.js"></script>
          <script src="/assets/froala/js/plugins/video.min.js"></script>
          <script src="/assets/froala/js/langs/zh_cn.js"></script>
          <script src="/assets/js/jquery-migrate-1.2.1.min.js"></script>
          <script src="/assets/js/jquery.date_input.pack.js"></script>
          <script type="text/javascript" src="http://tool.keleyi.com/ip/visitoriphost/"></script>


          <title>移动支付平台</title>

        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        <span id="keleyivisitorip" style={{ display: 'none' }}></span>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script dangerouslySetInnerHTML={{__html: `window.isMobile=${isMobile};`}} charSet="UTF-8"/>
          <script src="/assets/js/ztree/jquery.ztree.core.js" />
          <script src="/assets/js/ztree/jquery.ztree.excheck.js" />
          <script src="/assets/js/perfect-scrollbar.jquery.min.js"></script>
          <script src={assets.javascript.vendor} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
