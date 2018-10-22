/**
 * @file   mofron-comp-message/index.js
 * @brief  message component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const Frame   = require('mofron-comp-frame');
const Text    = require('mofron-comp-text');
const Horiz   = require('mofron-layout-horizon');
const VrtPos  = require('mofron-effect-vrtpos');
const SyncHei = require('mofron-effect-synchei');

mf.comp.Message = class extends mf.Component {
    /**
     * initialize message component
     *
     * @param p1 (object) component option
     * @param p1 (string) message
     */
    constructor (po) {
        try {
            super();
            this.name('Message');
            this.prmMap('text');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @note private method
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.addChild(this.frame());
            this.target(this.frame().target());
            this.addChild(this.text());
            this.size('3.5rem', '0.5rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * frame component setter/getter
     *
     * @param (Frame) frame component
     * @return (Frame) frame component
     */
    frame (prm) {
        try {
            let ret = this.innerComp('frame', prm, Frame);
            if (undefined !== prm) {
                prm.execOption({ layout : new Horiz() });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * message text setter/getter
     *
     * @param (string) message text
     * @param (Text) message text component
     * @return (Text) message text component
     */
    text (prm) {
        try {
            if ('string' === typeof prm) {
                this.text().execOption({
                    text : prm
                });
                return;
            }
            
            let ret = this.innerComp('text', prm, Text);
            if (undefined !== prm) {
                prm.execOption({
                    sizeValue : [ 'margin-left', '0.2rem' ],
                    effect    : [
                        new VrtPos('center'),
                        new SyncHei(this, '-0.3rem')
                    ]
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * text color setter/getter
     * 
     * @param (string) text color (css value)
     * @param (Array) text color ([red(0-255), green(0-255), blue(0-255)])
     * @return (string) text color
     */
    mainColor (prm) {
        try { return this.text().color(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * frame background color setter/getter
     *
     * @param (string) frame background color (css value)
     * @param (Array) frame background color ([red(0-255), green(0-255), blue(0-255)])
     * @return (string) frame background color
     */
    baseColor (clr) {
        try { return this.frame().mainColor(clr); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * frame border color setter/getter
     *
     * @param (string) frame border color (css value)
     * @param (Array) frame border color ([red(0-255), green(0-255), blue(0-255)])
     * @return (string) frame border color
     */
    accentColor (prm) {
        try { return this.frame().border().color(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Message;
/* end of file */
