/*jslint browser: true, esversion: 6 */ 

import StyleSheet from 'bundle-text:./css/widget.css';
import htmlBubbleTemplate from 'bundle-text:./template/widget.pug';
import initializeWidget from './js/widget.js';

const CONTAINER_WIDGET_ID = 'whatsapp-bubble-widget';

(function() {
  // busca el primer script, por lo general esta en el header
  let scriptTagArray = document.getElementsByTagName('script')[0];
  let style = document.createElement('style');
  style.innerHTML = StyleSheet;

  // TODO: Añadir el style antes del cierre del header
  // Se adiciona el tag "style" al header
  scriptTagArray.parentNode.appendChild(style);
  
  // load html in container
  const widgetContainer = document.getElementById(CONTAINER_WIDGET_ID);
  let widgetInfo = {};

  if (widgetContainer) {
    // Add template inside container
    widgetContainer.innerHTML = htmlBubbleTemplate;

    // create property info object
    widgetInfo = {
      phone: widgetContainer.getAttribute('phone') || null,
      message: widgetContainer.getAttribute('message'),
      tooltipMessage: widgetContainer.getAttribute('tooltip-message'),
      backgroundColor: widgetContainer.getAttribute('background-color'),
      imageSrc: widgetContainer.getAttribute('image-url'),
      soundURL: widgetContainer.getAttribute('sound-url'),
    };
    
  }

  // init when DOM is ready
  if (document.readyState === "complete"
     || document.readyState === "loaded"
     || document.readyState === "interactive") {
     // document has at least been parsed
     initializeWidget(widgetInfo, widgetContainer);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      initializeWidget(widgetInfo, widgetContainer);
    });
  }
}());
