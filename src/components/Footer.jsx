import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';


ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const { config } = this.context;

    return (
      <footer role="contentinfo" class="site-footer">
          <div class="container-fluid">
            <div class="footer-content">
              <div class="footer-upper">
                <div class="footer-buttons">
                  <a href={config.LMS_BASE_URL + "/about"}>What we do</a>
                  <a href={config.LMS_BASE_URL + "/contact"}>Contact</a>
                </div>
                <div>
                  <div class="footer-logos">
                  <a href="https://twitter.com/BacHaSoftware" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" color="black" />
                  </a>
                  <a href="https://www.linkedin.com/company/bac-ha-software/mycompany/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" color="black" />
                  </a>
                  </div>
                  <div class="footer-rights">
                    © BacHaSoftware | All rights reserved | Privacy | Terms
                  </div>
                </div>
              </div>
              <div class="footer-divider"></div>
              <div class="footer-lower">
                <div>
                <a
                    className="d-block"
                    href={config.LMS_BASE_URL}
                    aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
                  >
                    <img
                      className="footer-logo"
                      src={logo || config.LOGO_TRADEMARK_URL}
                      alt={intl.formatMessage(messages['footer.logo.altText'])}
                    />
                  </a>
                  <div class="footer-license">
                    Theme licensed under the AGPLv3 License. Copyright 2024 by BacHaSoftware
                  </div>
                </div>
                <div class="footer-text">
                  edX, Open edX and their respective logos are registered trademarks of edX Inc. Free online courses at edX.org
                </div>
              </div>
            </div>
          </div>
        </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
