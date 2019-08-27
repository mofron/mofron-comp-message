/**
 * @file mofron-comp-message/index.js
 * @brief message component for mofron
 *        it is a component for informing the user of the result and notification contents.
 * @feature display time can configure by "timer" parameter.
 *          display position is easy to configure by "fixpos" parameter.
 *          when the display position is set by "fixpos", the display position is fixed even if you scroll.
 * @attention default visible is false. it needs to be displayed by the javascript "visible" function
 * @author simpart
 */
const mf     = require("mofron");
const Frame  = require("mofron-comp-txtframe");
const Text   = require("mofron-comp-text");
const Close  = require("mofron-comp-close");
const Vrtpos = require("mofron-effect-vrtpos");
const Hrzpos = require("mofron-effect-hrzpos");

mf.comp.Message = class extends Frame {
    /**
     * initialize message component
     * 
     * @param (mixed) string: message text
     *                mofron-comp-text: message text component
     *                object: component option
     * @pmap text
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name("Message");
            this.prmMap("text");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            /* dom */
            super.initDomConts();
            this.child([this.closeComp()]);
            
            /* effect */
            this.effect([
                new Hrzpos({ suspend:true }),
                new Vrtpos({ suspend:true })
            ]);
            
            /* style */
            this.x_center(false);
            this.style({
	        "display"  : "flex",
		"position" : "relative"
            });
            this.size("3.5rem", "0.5rem");
            this.visible(false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set text position
     * 
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
	    let txt = this.text();
	    if (0 !== txt.length) {
                for (let idx in txt) {
                    txt[idx].style(
		        { "margin-left" : "0.3rem" },
                        { loose: true }
		    );
		}
	    }
	} catch (e) {
 	    console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * fixed position config
     * 
     * @param (string) horizonal position ["left"/"center"/"right"]
     * @param (string) vertical position ["top"/"center"/"bottom"]
     * @type parameter
     */
    fixpos (xpos, ypos) {
        try {
            if (undefined === xpos) {
                return [this.member("x_fixpos"), this.member("y_fixpos")];
            }
            this.x_fixpos(xpos);
            this.y_fixpos(ypos);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * horizonal fixed position
     * 
     * @param (string) horizonal fixed position ["left"/"center"/"right"]
     * @return (string) horizonal fixed position
     * @type parameter
     */
    x_fixpos (prm) {
        try {
            let ret = this.member("x_fixpos", ["left","center","right"], prm);
            if (undefined !== prm) {
                this.style({"position" : "fixed"});
                this.effect(
                    new Hrzpos(prm, ("center" !== prm) ? this.offset() : undefined)
                );
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * vertical fixed position
     * 
     * @param (string) vertical fixed position ["top"/"center"/"bottom"]
     * @return (string) vertical fixed position
     * @type parameter
     */
    y_fixpos (prm) {
        try {
            let ret = this.member("y_fixpos", ["top","center","bottom"], prm); 
            if (undefined !== prm) {
                this.style({"position" : "fixed"});
                this.effect(
                    new Vrtpos(prm, ("center" !== prm) ? this.offset() : undefined)
                );
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position offset
     * 
     * @param (string (size)) position offset, default is "0.5rem"
     * @return (string (size)) position offset
     * @type parameter
     */
    offset (prm) {
        try {
            if (undefined !== prm) {
                prm = mf.func.getSize(prm).toString();
            }
            return this.member("offset", "string", prm, "0.5rem");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * close component visible
     * 
     * @param (boolean) true: visible close component (default)
     *                  false: invisible close component 
     * @return (boolean) close visible status
     * @type parameter
     */
    closeVisible (prm) {
        try { return this.innerComp("close").visible(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * close component
     *
     * @param (component) replacement close component
     * @return (component) close component
     * @type parameter
     */
    closeComp (prm) {
        try {
            if (true === mf.func.isComp(prm)) {
                prm.option({
                    size: "0.23rem",
                    style: [
		        {
		            "position" : "absolute",
			    "right"    : "0.2rem"
		        },
			{locked:true}
		    ],
		    effect: new Vrtpos('center'),
		    width: prm.size()
                });
		prm.style({ "text-align" : "center" });
            }
            return this.innerComp("closeComp", prm, Close);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
    
    /**
     * display timer
     * 
     * @param (number) display message timer
     * @return (number) display message timer
     * @type parameter
     */
    timer (prm) {
        try { return this.member("timer", "number", prm, 0); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set visible timer when visible is true
     * 
     * @type private
     */
    visible (flg, cb) {
        try {
            let msg = this;
            if (true === flg) {
	        if (false === this.adom().isPushed()) {
		    this.style({"display" : null});
		    return;
		}
                let msg_cb = () => {
                    try {
                        if ((true === flg) && (0 !== msg.timer())) {
                            setTimeout(() => { msg.visible(false); }, msg.timer()*1000);
                        }
                        if ("function" === typeof cb) {
                            cb();
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                super.visible(flg, msg_cb);
                return;
            }
            return super.visible(flg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Message;
/* end of file */
