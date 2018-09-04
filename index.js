/**
 * @file   mofron-comp-message/index.js
 * @author simpart
 */
const mf      = require('mofron');
const Frame   = require('mofron-comp-frame');
const Text    = require('mofron-comp-text');
const VrtPos  = require('mofron-effect-vrtpos');
const HrzPos  = require('mofron-effect-hrzpos');
const SyncHei = require('mofron-effect-synchei');

/**
 * @class Message
 * @brief text component for mofron
 */
mf.comp.Message = class extends mf.Component {
    
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
    
    frame (frm) {
        try {
            if (undefined === frm) {
                /* getter */
                if (undefined === this.m_msgfrm) {
                    this.frame(new Frame({}));
                }
                return this.m_msgfrm;
            }
            /* setter */
            if (true !== mf.func.isInclude(frm, 'Frame')) {
                throw new Error('invalid parameter');
            }
            frm.style({ 'display' : 'flex' });
            this.m_msgfrm = frm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_msgtxt) {
                    this.m_msgtxt = new Text({
                        sizeValue : new mf.Param('margin-left', '0.2rem'),
                        effect    : [
                            new HrzPos('center'),
                            new VrtPos('center'),
                            new SyncHei(this, '-0.3rem')
                        ]
                    });
                }
                return this.m_msgtxt;
            }
            /* setter */
            if ('string' === typeof prm) {
                this.m_msgtxt.text(prm);
            } else if (true === mf.func.isInclude(prm, 'Text')) {
                this.updChild(this.m_msgtxt, prm);
            } else {
                throw new Error('invalid parameter');
            }
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
    mainColor (clr) {
        try {
            if (undefined === clr) {
                /* getter */
                return mf.func.getColor(this.style('border-color'));
            }
            /* setter */
            if (false === mf.func.isObject(clr, 'Color')) {
                throw new Error('invalid parameter');
            }
            /* set border color */
            this.style({ 'border-color' : clr.getStyle() });
            
            /* set frame color */
            let val = clr.rgba();
            clr.rgba(
                (val[0] > 105) ? 255 : val[0] + 150,
                (val[1] > 105) ? 255 : val[1] + 150,
                (val[2] > 105) ? 255 : val[2] + 150,
                val[3]
            );
            this.frame().mainColor(clr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    baseColor (clr) {
        try { return this.frame().mainColor(clr); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
module.exports = mf.comp.Message;
/* end of file */
