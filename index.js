/**
 * @file   mofron-comp-message/index.js
 * @author simpart
 */
let mf    = require('mofron');
let Frame = require('mofron-comp-frame');
let Text  = require('mofron-comp-text');
/**
 * @class Message
 * @brief text component for mofron
 */
mf.comp.Message = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('Message');
            this.prmOpt(po);
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
            this.addChild(this.frame());
            this.target(this.frame().target());
            
            this.text((null === prm) ? '' : prm);
            this.addChild(this.text());
            /* frame setting */
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            chd.style({
                margin : '10px'
            });
            super.addChild(chd, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    frame (frm) {
        try {
            if (undefined === frm) {
                /* getter */
                if (undefined === this.m_msg_frm) {
                    this.frame(new Frame({}));
                }
                return this.m_msg_frm;
            }
            /* setter */
            if (true !== mf.func.isInclude(frm, 'Frame')) {
                throw new Error('invalid parameter');
            }
            frm.size(null,null);
            this.m_msg_frm = frm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (txt) {
        try {
            if (undefined === txt) {
                /* getter */
                if (undefined === this.m_msg_txt) {
                    this.text(txt);
                }
                return this.m_msg_txt;
            }
            /* setter */
            if ('string' === typeof txt) {
                txt = new Text(txt);
            }
            if (true === mf.func.isInclude(txt, 'Text')) {
                if (true === this.target().isPushed()) {
                    this.updChild(this.m_msg_txt, txt);
                }
                txt.style({
                    margin : '10px'
                });
                this.m_msg_txt = txt;
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
            this.frame().color(clr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            if (40 < val ) {
                this.text().size(val-20);
            }
            return super.height(val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.message = {};
module.exports = mofron.comp.Message;
