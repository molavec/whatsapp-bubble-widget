/*jslint browser: true, esversion: 6 */

import CookieMgr from './cookie-manager.js';
import { debounce, addEvent } from './utility.js';
import { computePosition, arrow, shift, autoPlacement } from "@floating-ui/dom";
import sound from 'url:../assets/sound/whatsapp_web.mp3';

/**
 * tooltip Manager
 */
let tooltipMgr = {
  // url del sonido que se reproducirá cuando aparezca el tooltip
  // https://notificationsounds.com/soundfiles/63538fe6ef330c13a05a3ed7e599d5f7/file-sounds-917-communication-channel.mp3
  // la url fue acortada para disminuir la cantidad de caracteres
  SOUND_URL: sound,
  // máxima cantidad de veces que se puede reproducir el sonido de alerta
  MAX_SOUND_PLAY_COUNT: 2,
  // delay para el cierre del tooltip una vez que aparece
  CLOSE_DELAY: 8000,
  // instancia del tooltip
  notificationElement: null,
  tooltipArrowElement: null, 
  tooltipElement: null,
  referenceElement: null,

  // debounce
  closetooltipDb: null,
  mouseOutsideDocumentDb: null,
  canShow: true,
  sound: null,
  soundPlayCount: 0,

  /**
   * Oculta el tooltip
   */
  hidetooltip: function () {
    this.tooltipElement.classList.remove('animated');
    this.tooltipElement.classList.remove('bounce');
  },

  /**
   * Muestra el tooltip
   */
  showtooltip: function () {
    let cookieExp = 30;
    if (this.canShow) {
      CookieMgr.create('tooltipWhatsapp', 'true', cookieExp, false);
      this.notificationElement.style.display = 'block';
      this.tooltipElement.style.display = 'block';
      // compute tooltip position
      this.updateTooltip();
      this.closetooltipDb();
      if (++this.soundPlayCount <= this.MAX_SOUND_PLAY_COUNT && !CookieMgr.check('soundOff')) {
        try {
          if (!this.sound) {
            this.sound = new Audio(this.SOUND_URL);
          }
          this.sound.play();
        } catch (e) {
          console.error(e)
        }
      } else {
        CookieMgr.create('soundOff', true, 1);
      }

      this.tooltipElement.classList.add('animated');
      this.tooltipElement.classList.add('bounce');
      this.canShow = false;
    }
  },

  /**
   * @param {String} tooltipElementSelector
   * @param {String} tooltipElementSelector
   */
  exitIntentInit: function () {
    // muestra el tooltip si es que la cookie no nos lo impide
    if (!CookieMgr.check('tooltipWhatsapp')) {
      setTimeout(() => {
        this.canShow = true;
        this.showtooltip();
      }, 5000);
    } else {
      //activa inmediatamente el exit intent
      this.canShow = true;
    }

    // Track mouseout event on document
    addEvent(document, "mouseout", (ev) => {
      this.mouseOutsideDocumentDb(ev);
    });
  },

  updateTooltip: function ()  {
    computePosition(this.referenceElement, this.tooltipElement, {
      // Try changing this to a different side.
      placement: "left",
      middleware: [
        arrow({element: this.tooltipArrowElement}),
      ],
    }).then(({ x, y, placement }) => {
      console.log('x - y', x, y);
      console.log('placement', placement);
      Object.assign(this.tooltipElement.style, {
        top: `${y}px`,
        left: `${x}px`,
        display: 'block',
      });
    });
  },
   
  showTooltip: function() {
    this.tooltipElement.style.display = 'block';
    this.updateTooltip();
  },
   
  hideTooltip: function() {
    this.tooltipElement.style.display = '';
  },

  /**
   * @param {String} tooltipElementSelector
   * @param {String} tooltipElementSelector
   */
  init: function (container) {
    
    this.referenceElement = container.querySelector('.wpb-block__link');
    this.tooltipElement = container.querySelector('.wpb-tooltip');
    this.tooltipArrowElement = container.querySelector('.wpb-tooltip__arrow');
    this.notificationElement = container.querySelector('.wpb-block__notification');

    // oculta el tooltip después de CLOSE_DELAY
    this.closetooltipDb = debounce(() => {
      this.hidetooltip();
      this.canShow = true;
    }, this.CLOSE_DELAY);

    // muestra el tooltip si el mouse se acerca a salir del documento o sale
    this.mouseOutsideDocumentDb = debounce((e) => {
      // e = e ? e : window.event;

      // Get the current viewport width.
      let vpWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      // If the current mouse X position is between 50px of left and
      // vpWidth - 50 of the right edge of the viewport, return.
      // Nota: Evita continuar con los pasos siguientes
      if (e.clientX >= (50) && e.clientX <= (vpWidth - 50) && e.clientY >= 50) {
        return;
      }

      // Reliable, works on mouse exiting window and
      // user switching active program
      let from = e.relatedTarget || e.toElement;
      if (!from) {
        //this.canShow = true;
        this.showtooltip();
      }
    }, 100);

    this.exitIntentInit();
  }
};

export default tooltipMgr;
