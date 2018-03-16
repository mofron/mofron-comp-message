/**
 * @file   mofron-comp-message/index.js
 * @author simpart
 */
let mf    = require('mofron');
let Frame = require('mofron-comp-frame');
let Text  = require('mofron-comp-text');
let efCenter = require('mofron-effect-center');

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
            
            this.addEffect(new efCenter(true, false));
            this.size(350, 60);
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
                    this.frame(new Frame());
                }
                return this.m_msg_frm;
            }
            /* setter */
            if (true !== mf.func.isInclude(frm, 'Frame')) {
                throw new Error('invalid parameter');
            }
            frm.style({
                'display'    : 'flex',
                'align-items': 'center'
            });
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
                    this.text('');
                }
                return this.m_msg_txt;
            }
            /* setter */
            if (undefined !== this.m_msg_txt) {
                /* update message text */
                if ('string' === typeof txt) {
                    this.m_msg_txt.text(txt);
                } else if (true === mf.func.isInclude(txt, 'Text')) {
                    this.updChild(this.m_msg_txt, txt);
                } else {
                    throw new Error('invalid parameter');
                }
            } else {
                let set_txt = txt;
                if ('string' === typeof set_txt) {
                    set_txt = new Text(txt);
                    set_txt.style({
                        'margin-left' : '10px'
                    });
                }
                if (true === mf.func.isInclude(set_txt, 'Text')) {
                    this.m_msg_txt = set_txt;
                } else {
                    throw new Error('invalid parameter');
                }
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
                return mf.func.getColor(
                           this.style('border-color')
                       );
            }
            /* setter */
            if (false === mf.func.isObject(clr, 'Color')) {
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
            return this.frame().height(val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.message = {};
module.exports = mofron.comp.Message;
