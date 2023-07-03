/*jslint browser: true, esversion: 6 */

import tooltipMgr from './tooltip.js';

import defaultImage from '../assets/img/whatsapp.png';


/**
 * ===========================================================================
 *        Definiciones
 * ===========================================================================
 */
export default function initializeWidget(info, container) {
  exitIntentUrl = getWhatsappUrl(info);

  let linkElement = container.querySelector('.wpb-block__link a');
  if (linkElement) {
    linkElement.setAttribute("href", exitIntentUrl);
  }

  let imageElement = container.querySelector('.wpb-block__link .wpb-block__image');
  if (imageElement) {
    imageElement.setAttribute("src", info.imageSrc || defaultImage);
    if (info.backgroundColor) {
      imageElement.style.backgroundColor = info.backgroundColor;
    }
  }

  let tooltipElement = container.querySelector('.wpb-block .wpb-tooltip');
  if (tooltipElement) {
    const text = document.createTextNode(info.tooltipMessage);
    tooltipElement.appendChild(text);
    if (info.backgroundColor) {
      tooltipElement.style.backgroundColor = info.backgroundColor;
    }
  }

  if (info.soundURL) {
    tooltipMgr.SOUND_URL = info.soundURL;
  }

  // inicializa el tooltip
  tooltipMgr.init(container);
}

/**
 *
 * @param String text
 */
function replaceEncode(text) {
  return text.replace(" ", "%20");
}

/**
 *
 * @param {Object} info
 */
function getWhatsappUrl(info) {
  // Whatsapp link
  // https://api.whatsapp.com/send?phone={{TELEFONO}}&amp;text={{TEXTO_URL_ENCODED}}
  let whatsappUrl = 'https://api.whatsapp.com/send?phone={{TELEFONO}}&text={{TEXTO_URL_ENCODED}}';

  if (info.phone) {
    whatsappUrl = whatsappUrl.replace('{{TELEFONO}}', info.phone);
  }

  if (info.message) {
    whatsappUrl = whatsappUrl.replace('{{TEXTO_URL_ENCODED}}', replaceEncode(info.message));
  }
  return whatsappUrl;
}