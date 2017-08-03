/**
 * @file   mofron-comp-message/index.js
 * @author simpart
 */
require('mofron-comp-text');

/**
 * @class Message
 * @brief text component for mofron
 */
mofron.comp.Message = class extends mofron.comp.Frame {
    
    constructor (prm_opt) {
        try {
            super();
            this.name('Message');
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize vdom
     * 
     * @param prm : (string) text contents
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            let thm  = this.theme();
            let text = thm.component('mofron-comp-text');
            this.addChild(
                new text((null === prm) ? '' : prm)
            );
            /* frame setting */
            this.size(null,null);
            this.text().style({
                margin : '10px'
            });
            this.radius(15);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp) {
        try {
            chd.style({
                margin : '10px'
            });
            super.addChild(chd, disp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (txt) {
        try {
             let text = this.child()[0];
            if (undefined === txt) {
                /* getter */
                return text;
            }
            /* setter */
            if ('string' !== typeof text) {
                throw new Error('invalid parameter');
            }
            text.text(txt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * text color setter / getter
     * 
     * @param clr : (mofron.Color) color object
     * @return (string) color
     * @note do not specify parameters, if use as getter
     */
    color (clr) {
        try {
            if (undefined === clr) {
                /* getter */
                return mofron.func.getColor(
                           this.style('border-color')
                       );
            }
            /* setter */
            if (false === mofron.func.isObject(clr, 'Color')) {
                throw new Error('invalid parameter');
            }
            /* set border color */
            this.style({
                'border-color' : clr.getStyle() 
            });
            /* set frame color */
            let val = clr.rgba();
            clr.rgba(
                (val[0] > 85) ? 255 : val[0] + 170,
                (val[1] > 85) ? 255 : val[1] + 170,
                (val[2] > 85) ? 255 : val[2] + 170,
                val[3]
            );
            super.color(clr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.message = {};
module.exports = mofron.comp.Message;
