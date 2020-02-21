/**
 * @file mofron-comp-message/index.js
 * @brief message component for mofron
 *        it is a component for informing the user of the result and notification contents.
 * @feature display time can configure by "timer" parameter.
 *          display position is easy to configure by "fixpos" parameter.
 *          when the display position is set by "fixpos", the display position is fixed even if you scroll.
 * @attention default visible is false. it needs to be displayed by the javascript "visible" function
 * @lisence MIT
 */
const mf     = require("mofron");
const TxtFrame = require("mofron-comp-txtframe");
const Text   = require("mofron-comp-text");
const Close  = require("mofron-comp-close");
const Vrtpos = require("mofron-effect-vrtpos");
const Hrzpos = require("mofron-effect-hrzpos");
const ConfArg = mofron.class.ConfArg;
const comutl = mofron.util.common;


module.exports = class extends TxtFrame {
    /**
     * initialize message component
     * 
     * @param (mixed) string: message text
     *                mofron-comp-text: message text component
     *                key-value: component config
     * @short text
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("Message");
            this.shortForm("text");
            /* init config */
	    this.confmng().add("timer", { type: "number", init: 0 });
	    this.confmng().add("closePos", { type: "string", init: "right", select: ["left", "right"] });
	    this.confmng().add("xFixpos", { type: "string", select: ["left","center","right"] });
	    this.confmng().add("yFixpos", { type: "string", select: ["top","center","bottom"] });
	    this.confmng().add("xoffset", { type: "size" });
	    this.confmng().add("yoffset", { type: "size" });
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
	    }
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
	    this.text("");
            this.child(this.closeComp());
            
            /* effect */
            this.effect([
                new Hrzpos({ suspend:true, tag: "Message" }),
                new Vrtpos({ suspend:true, tag: "Message" })
            ]);
            
            /* style */
            this.center(false,true);
            this.style({
	        "display"  : "flex",
		"position" : "relative"
            });
            this.size("3.5rem", "0.5rem");
            this.visible(false);
            
            /* set timer function */
	    let timer = (s1,s2,s3) => {
                try {
                    if (("none" !== s2[0].display) && (0 !== s3.timer())) {
                        let disable = () => {
                            try {
                                s3.visible(false);
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        }
                        setTimeout(disable, s3.timer());
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
	    };
	    this.childDom().style().listener("display",timer,this);


	    let ycent = (y1,y2,y3) => {
                if ("none" !== y2[0].display) {
		    y3.centerConf();
		    y3.text().style({ "top": null, "transform": null });
		}
	    }
	    this.childDom().style().listener("display",ycent,this);
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
	    /* set text position */
	    if ("left" === this.closePos()) {
	        let mgn = comutl.sizesum(this.closeComp().width(), this.closeComp().width());
                this.text().style({ "margin-left" : mgn }, { passive: true });
	    } else {
	        this.text().style({ "margin-left" : "0.1rem" }, { passive: true });
            }
	    /* set position offset */
	    let offset = this.offset();
	    this.effect({ name: "HrzPos", tag: "Message" }).offset(offset[0]);
	    this.effect({ name: "VrtPos", tag: "Message" }).offset(offset[1]);
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
     * @return (array) positions [(horizonal), (vertical)]
     * @type parameter
     */
    fixpos (xpos, ypos) {
        try {
            if (undefined === xpos) {
                return [this.xFixpos(), this.yFixpos()];
            }
            this.xFixpos(xpos);
            this.yFixpos(ypos);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * horizonal fixed position setter/getter
     * 
     * @param (string) horizonal fixed position ["left"/"center"/"right"]
     *                 undefined: call as getter
     * @param (string(size)) offset size (not required)
     * @return (mixed) string: horizonal fixed position
     *                 null: not set
     * @type parameter
     */
    xFixpos (prm, off) {
        try {
	    let ret = this.confmng("xFixpos", prm);
            if (undefined !== prm) {
                this.style({ "position" : "fixed" });
                let hrzpos = this.effect({ name: "HrzPos", tag: "Message" });
		hrzpos.config({ suspend: false, type: prm });
		this.confmng("xoffset",off);
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
     *                 undefined: call as getter
     * @param (string(size)) offset size (not required)
     * @return (mixed) string: vertical fixed position
     *                 null: not set
     * @type parameter
     */
    yFixpos (prm, off) {
        try {
            let ret = this.confmng("yFixpos", prm);
            if (undefined !== prm) {
                this.style({ "position" : "fixed" });
                let vrtpos = this.effect({ name: "VrtPos", tag: "Message" });
                vrtpos.config({ suspend: false, type: prm });
		this.confmng("yoffset",off);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset size of fixed position setter/getter
     * 
     * @param (string(size)) horizonal offset size
     *                       undefined: call as getter
     * @param (string(size)) vertical offset size
     * @return (array) offsets [(horizonal),(vertical)]
     * @type parameter
     */
    offset (xoff, yoff) {
        try {
            if (undefined === xoff) {
                /* getter */
		return [
		    (null === this.confmng("xoffset")) ? undefined : this.confmng("xoffset"),
		    (null === this.confmng("yoffset")) ? undefined : this.confmng("yoffset")
		];
	    }
	    /* setter */
            this.confmng("xoffset", xoff);
	    this.confmng("yoffset", yoff);
	} catch (e) {
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
            if (true === comutl.isinc(prm,"Close")) {
                prm.config({
		    style: { "position" : "absolute" },
		    effect: [
		        new Hrzpos({ tag: "Message", type: this.closePos(), offset: "0.1rem" }),
                    ],
                    closeTgt: this
                });
            }
            return this.innerComp("closeComp", prm, Close);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position for close component setter/getter
     * 
     * @param (string) close position ('left', 'right')
     *                 undefined: call as getter
     * @return (string) close position ('left', 'right')
     * @type parameter
     */
    closePos (prm) {
        try {
	    let ret = this.confmng("closePos", prm);
	    if (undefined !== prm) {
                this.closeComp().effect({ name: "HrzPos", tag: "Message" }).type(prm);
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * display timer
     * 
     * @param (number) display message timer [ms]
     *                 undefined: call as getter
     * @return (number) display message timer
     * @type parameter
     */
    timer (prm) {
        try {
	    return this.confmng("timer", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
