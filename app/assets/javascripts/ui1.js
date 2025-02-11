 /*!
 * jQuery UI @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */(function(a, b) {
    function d(b) {
        return !a(b).parents().andSelf().filter(function() {
            return a.css(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode, g = f.name, h;
            if (!b.href || !g || f.nodeName.toLowerCase() !== "map")
                return !1;
            h = a("img[usemap=#" + g + "]")[0];
            return !!h && d(h)
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
    }
    a.ui = a.ui || {};
    a.ui.version || (a.extend(a.ui, {version: "@VERSION",keyCode: {BACKSPACE: 8,COMMA: 188,DELETE: 46,DOWN: 40,END: 35,ENTER: 13,ESCAPE: 27,HOME: 36,LEFT: 37,NUMPAD_ADD: 107,NUMPAD_DECIMAL: 110,NUMPAD_DIVIDE: 111,NUMPAD_ENTER: 108,NUMPAD_MULTIPLY: 106,NUMPAD_SUBTRACT: 109,PAGE_DOWN: 34,PAGE_UP: 33,PERIOD: 190,RIGHT: 39,SPACE: 32,TAB: 9,UP: 38}}), a.fn.extend({_focus: a.fn.focus,focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d = this;
                setTimeout(function() {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },scrollParent: function() {
            var b;
            a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },zIndex: function(c) {
            if (c !== b)
                return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]), e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0)
                            return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault()
            })
        },enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }}), a.each(["Width", "Height"], function(c, d) {
        function h(b, c, d, f) {
            a.each(e, function() {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            });
            return c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], f = d.toLowerCase(), g = {innerWidth: a.fn.innerWidth,innerHeight: a.fn.innerHeight,outerWidth: a.fn.outerWidth,outerHeight: a.fn.outerHeight};
        a.fn["inner" + d] = function(c) {
            if (c === b)
                return g["inner" + d].call(this);
            return this.each(function() {
                a(this).css(f, h(this, c) + "px")
            })
        }, a.fn["outer" + d] = function(b, c) {
            if (typeof b != "number")
                return g["outer" + d].call(this, b);
            return this.each(function() {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {data: function(b, c, d) {
            return !!a.data(b, d[3])
        },focusable: function(b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },tabbable: function(b) {
            var d = a.attr(b, "tabindex"), e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }}), a(function() {
        var b = document.body, c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {minHeight: "100px",height: "auto",padding: 0,borderWidth: 0}), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), a.extend(a.ui, {plugin: {add: function(b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d)
                    e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
            },call: function(a, b, c) {
                var d = a.plugins[b];
                if (!!d && !!a.element[0].parentNode && a.element[0].parentNode.nodeType !== 11)
                    for (var e = 0; e < d.length; e++)
                        a.options[d[e][0]] && d[e][1].apply(a.element, c)
            }},contains: a.contains,hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden")
                return !1;
            var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1;
            if (b[d] > 0)
                return !0;
            b[d] = 1, e = b[d] > 0, b[d] = 0;
            return e
        },isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }}))
})(jQuery), function(a, b) {
    var c = Array.prototype.slice, d = a.cleanData;
    a.cleanData = function(b) {
        for (var c = 0, e; (e = b[c]) != null; c++)
            try {
                a(e).triggerHandler("remove")
            } catch (f) {
            }
        d(b)
    }, a.widget = function(b, c, d) {
        var e, f, g, h, i = b.split(".")[0];
        b = b.split(".")[1], e = i + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e] = function(b) {
            return !!a.data(b, e)
        }, a[i] = a[i] || {}, f = a[i][b], g = a[i][b] = function(a, b) {
            if (!this._createWidget)
                return new g(a, b);
            arguments.length && this._createWidget(a, b)
        }, a.extend(g, f, {version: d.version,_proto: a.extend({}, d),_childConstructors: []}), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, e) {
            a.isFunction(e) && (d[b] = function() {
                var a = function() {
                    return c.prototype[b].apply(this, arguments)
                }, d = function(a) {
                    return c.prototype[b].apply(this, a)
                };
                return function() {
                    var b = this._super, c = this._superApply, f;
                    this._super = a, this._superApply = d, f = e.apply(this, arguments), this._super = b, this._superApply = c;
                    return f
                }
            }())
        }), g.prototype = a.widget.extend(h, {widgetEventPrefix: b}, d, {constructor: g,namespace: i,widgetName: b,widgetBaseClass: e,widgetFullName: e}), f ? (a.each(f._childConstructors, function(b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g)
    }, a.widget.extend = function(d) {
        var e = c.call(arguments, 1), f = 0, g = e.length, h, i;
        for (; f < g; f++)
            for (h in e[f])
                i = e[f][h], e[f].hasOwnProperty(h) && i !== b && (d[h] = a.isPlainObject(i) ? a.widget.extend({}, d[h], i) : i);
        return d
    }, a.widget.bridge = function(d, e) {
        var f = e.prototype.widgetFullName;
        a.fn[d] = function(g) {
            var h = typeof g == "string", i = c.call(arguments, 1), j = this;
            g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, h ? this.each(function() {
                var c = a.data(this, f);
                if (!c)
                    return a.error("cannot call methods on " + d + " prior to initialization; " + "attempted to call method '" + g + "'");
                if (!a.isFunction(c[g]) || g.charAt(0) === "_")
                    return a.error("no such method '" + g + "' for " + d + " widget instance");
                var e = c[g].apply(c, i);
                if (e !== c && e !== b) {
                    j = e && e.jquery ? j.pushStack(e.get()) : e;
                    return !1
                }
            }) : this.each(function() {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : new e(g, this)
            });
            return j
        }
    }, a.Widget = function(a, b) {
    }, a.Widget._childConstructors = [], a.Widget.prototype = {widgetName: "widget",widgetEventPrefix: "",defaultElement: "<div>",options: {disabled: !1,create: null},_createWidget: function(b, c) {
            c = a(c || this.defaultElement || this)[0], this.element = a(c), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), c !== this && (a.data(c, this.widgetName, this), a.data(c, this.widgetFullName, this), this._bind({remove: "destroy"}), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },_getCreateOptions: a.noop,_getCreateEventData: a.noop,_create: a.noop,_init: a.noop,destroy: function() {
            this._destroy(), this.element.unbind("." + this.widgetName).removeData(this.widgetName).removeData(this.widgetFullName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind("." + this.widgetName), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },_destroy: a.noop,widget: function() {
            return this.element
        },option: function(c, d) {
            var e = c, f, g, h;
            if (arguments.length === 0)
                return a.widget.extend({}, this.options);
            if (typeof c == "string") {
                e = {}, f = c.split("."), c = f.shift();
                if (f.length) {
                    g = e[c] = a.widget.extend({}, this.options[c]);
                    for (h = 0; h < f.length - 1; h++)
                        g[f[h]] = g[f[h]] || {}, g = g[f[h]];
                    c = f.pop();
                    if (d === b)
                        return g[c] === b ? null : g[c];
                    g[c] = d
                } else {
                    if (d === b)
                        return this.options[c] === b ? null : this.options[c];
                    e[c] = d
                }
            }
            this._setOptions(e);
            return this
        },_setOptions: function(a) {
            var b;
            for (b in a)
                this._setOption(b, a[b]);
            return this
        },_setOption: function(a, b) {
            this.options[a] = b, a === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"));
            return this
        },enable: function() {
            return this._setOption("disabled", !1)
        },disable: function() {
            return this._setOption("disabled", !0)
        },_bind: function(b, c) {
            c ? (b = a(b), this.bindings = this.bindings.add(b)) : (c = b, b = this.element);
            var d = this;
            a.each(c, function(c, e) {
                function f() {
                    if (d.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled"))
                        return (typeof e == "string" ? d[e] : e).apply(d, arguments)
                }
                typeof e != "string" && (f.guid = e.guid = e.guid || f.guid || jQuery.guid++);
                var g = c.match(/^(\w+)\s*(.*)$/), h = g[1] + "." + d.widgetName, i = g[2];
                i ? d.widget().delegate(i, h, f) : b.bind(h, f)
            })
        },_delay: function(a, b) {
            function c() {
                return (typeof a == "string" ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },_hoverable: function(b) {
            this.hoverable = this.hoverable.add(b), this._bind(b, {mouseenter: function(b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },mouseleave: function(b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }})
        },_focusable: function(b) {
            this.focusable = this.focusable.add(b), this._bind(b, {focusin: function(b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },focusout: function(b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }})
        },_trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f)
                for (e in f)
                    e in c || (c[e] = f[e]);
            this.element.trigger(c, d);
            return !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }}, a.each({show: "fadeIn",hide: "fadeOut"}, function(b, c) {
        a.Widget.prototype["_" + b] = function(d, e, f) {
            typeof e == "string" && (e = {effect: e});
            var g, h = e ? e === !0 || typeof e == "number" ? c : e.effect || c : b;
            e = e || {}, typeof e == "number" && (e = {duration: e}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && (a.effects.effect[h] || a.uiBackCompat !== !1 && a.effects[h]) ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    }), a.uiBackCompat !== !1 && (a.Widget.prototype._getCreateOptions = function() {
        return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
    })
}(jQuery), function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }), a.widget("ui.mouse", {version: "@VERSION",options: {cancel: ":input,option",distance: 1,delay: 0},_mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) {
                    a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation();
                    return !1
                }
            }), this.started = !1
        },_mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },_mouseDown: function(b) {
            if (!c) {
                this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
                var d = this, e = b.which == 1, f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
                if (!e || f || !this._mouseCapture(b))
                    return !0;
                this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                    this._mouseStarted = this._mouseStart(b) !== !1;
                    if (!this._mouseStarted) {
                        b.preventDefault();
                        return !0
                    }
                }
                !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                    return d._mouseMove(a)
                }, this._mouseUpDelegate = function(a) {
                    return d._mouseUp(a)
                }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0;
                return !0
            }
        },_mouseMove: function(b) {
            if (a.browser.msie && !(document.documentMode >= 9) && !b.button)
                return this._mouseUp(b);
            if (this._mouseStarted) {
                this._mouseDrag(b);
                return b.preventDefault()
            }
            this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b));
            return !this._mouseStarted
        },_mouseUp: function(b) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b));
            return !1
        },_mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },_mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },_mouseStart: function(a) {
        },_mouseDrag: function(a) {
        },_mouseStop: function(a) {
        },_mouseCapture: function(a) {
            return !0
        }})
}(jQuery), function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {version: "@VERSION",widgetEventPrefix: "drag",options: {addClasses: !0,appendTo: "parent",axis: !1,connectToSortable: !1,containment: !1,cursor: "auto",cursorAt: !1,grid: !1,handle: !1,helper: "original",iframeFix: !1,opacity: !1,refreshPositions: !1,revert: !1,revertDuration: 500,scope: "default",scroll: !0,scrollSensitivity: 20,scrollSpeed: 20,snap: !1,snapMode: "both",snapTolerance: 20,stack: !1,zIndex: !1},_create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },destroy: function() {
            if (!!this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy();
                return this
            }
        },_mouseCapture: function(b) {
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle"))
                return !1;
            this.handle = this._getHandle(b);
            if (!this.handle)
                return !1;
            a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width: this.offsetWidth + "px",height: this.offsetHeight + "px",position: "absolute",opacity: "0.001",zIndex: 1e3}).css(a(this).offset()).appendTo("body")
            });
            return !0
        },_mouseStart: function(b) {
            var c = this.options;
            this.helper = this._createHelper(b), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top,left: this.offset.left - this.margins.left}, a.extend(this.offset, {click: {left: b.pageX - this.offset.left,top: b.pageY - this.offset.top},parent: this._getParentOffset(),relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment();
            if (this._trigger("start", b) === !1) {
                this._clear();
                return !1
            }
            this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b);
            return !0
        },_mouseDrag: function(b, c) {
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) {
                    this._mouseUp({});
                    return !1
                }
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y")
                this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x")
                this.helper[0].style.top = this.position.top + "px";
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b);
            return !1
        },_mouseStop: function(b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper === "original")
                return !1;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var d = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    d._trigger("stop", b) !== !1 && d._clear()
                })
            } else
                this._trigger("stop", b) !== !1 && this._clear();
            return !1
        },_mouseUp: function(b) {
            this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b);
            return a.ui.mouse.prototype._mouseUp.call(this, b)
        },cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },_getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == b.target && (c = !0)
            });
            return c
        },_createHelper: function(b) {
            var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute");
            return d
        },_adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0],top: +b[1] || 0}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },_getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)
                b = {top: 0,left: 0};
            return {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        },_getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return {top: 0,left: 0}
        },_cacheMargins: function() {
            this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0,top: parseInt(this.element.css("marginTop"), 10) || 0,right: parseInt(this.element.css("marginRight"), 10) || 0,bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
        },_cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(),height: this.helper.outerHeight()}
        },_setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window")
                this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                var c = a(b.containment), d = c[0];
                if (!d)
                    return;
                var e = c.offset(), f = a(d).css("overflow") != "hidden";
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
            } else
                b.containment.constructor == Array && (this.containment = b.containment)
        },_convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
            return {top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)}
        },_generatePosition: function(b) {
            var c = this.options, d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName), f = b.pageX, g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else
                        h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
                }
            }
            return {top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())}
        },_clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },_trigger: function(b, c, d) {
            d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute"));
            return a.Widget.prototype._trigger.call(this, b, c, d)
        },plugins: {},_uiHash: function(a) {
            return {helper: this.helper,position: this.position,originalPosition: this.originalPosition,offset: this.positionAbs}
        }}), a.ui.plugin.add("draggable", "connectToSortable", {start: function(b, c) {
            var d = a(this).data("draggable"), e = d.options, f = a.extend({}, c, {item: d.element});
            d.sortables = [], a(e.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({instance: c,shouldRevert: c.options.revert}), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },stop: function(b, c) {
            var d = a(this).data("draggable"), e = a.extend({}, c, {item: d.element});
            a.each(d.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({top: "auto",left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },drag: function(b, c) {
            var d = a(this).data("draggable"), e = this, f = function(b) {
                var c = this.offset.click.top, d = this.offset.click.left, e = this.positionAbs.top, f = this.positionAbs.left, g = b.height, h = b.width, i = b.top, j = b.left;
                return a.ui.isOver(e + c, f + d, i, j, g, h)
            };
            a.each(d.sortables, function(f) {
                this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0]
                }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }}), a.ui.plugin.add("draggable", "cursor", {start: function(b, c) {
            var d = a("body"), e = a(this).data("draggable").options;
            d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor)
        }}), a.ui.plugin.add("draggable", "opacity", {start: function(b, c) {
            var d = a(c.helper), e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }}), a.ui.plugin.add("draggable", "scroll", {start: function(b, c) {
            var d = a(this).data("draggable");
            d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
        },drag: function(b, c) {
            var d = a(this).data("draggable"), e = d.options, f = !1;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x")
                    d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                if (!e.axis || e.axis != "y")
                    d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
            } else {
                if (!e.axis || e.axis != "x")
                    b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                if (!e.axis || e.axis != "y")
                    b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
            }
            f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
        }}), a.ui.plugin.add("draggable", "snap", {start: function(b, c) {
            var d = a(this).data("draggable"), e = d.options;
            d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
                var b = a(this), c = b.offset();
                this != d.element[0] && d.snapElements.push({item: this,width: b.outerWidth(),height: b.outerHeight(),top: c.top,left: c.left})
            })
        },drag: function(b, c) {
            var d = a(this).data("draggable"), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height;
            for (var k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left, m = l + d.snapElements[k].width, n = d.snapElements[k].top, o = n + d.snapElements[k].height;
                if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                    d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {snapItem: d.snapElements[k].item})), d.snapElements[k].snapping = !1;
                    continue
                }
                if (e.snapMode != "inner") {
                    var p = Math.abs(n - j) <= f, q = Math.abs(o - i) <= f, r = Math.abs(l - h) <= f, s = Math.abs(m - g) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {top: n - d.helperProportions.height,left: 0}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {top: o,left: 0}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {top: 0,left: l - d.helperProportions.width}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {top: 0,left: m}).left - d.margins.left)
                }
                var t = p || q || r || s;
                if (e.snapMode != "outer") {
                    var p = Math.abs(n - i) <= f, q = Math.abs(o - j) <= f, r = Math.abs(l - g) <= f, s = Math.abs(m - h) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {top: n,left: 0}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {top: o - d.helperProportions.height,left: 0}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {top: 0,left: l}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {top: 0,left: m - d.helperProportions.width}).left - d.margins.left)
                }
                !d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {snapItem: d.snapElements[k].item})), d.snapElements[k].snapping = p || q || r || s || t
            }
        }}), a.ui.plugin.add("draggable", "stack", {start: function(b, c) {
            var d = a(this).data("draggable").options, e = a.makeArray(a(d.stack)).sort(function(b, c) {
                return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
            });
            if (!!e.length) {
                var f = parseInt(e[0].style.zIndex) || 0;
                a(e).each(function(a) {
                    this.style.zIndex = f + a
                }), this[0].style.zIndex = f + e.length
            }
        }}), a.ui.plugin.add("draggable", "zIndex", {start: function(b, c) {
            var d = a(c.helper), e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }})
}(jQuery), function(a, b) {
    a.widget("ui.droppable", {version: "@VERSION",widgetEventPrefix: "drop",options: {accept: "*",activeClass: !1,addClasses: !0,greedy: !1,hoverClass: !1,scope: "default",tolerance: "intersect"},_create: function() {
            var b = this.options, c = b.accept;
            this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }, this.proportions = {width: this.element[0].offsetWidth,height: this.element[0].offsetHeight}, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
        },destroy: function() {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++)
                b[c] == this && b.splice(c, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },_setOption: function(b, c) {
            b == "accept" && (this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }), a.Widget.prototype._setOption.apply(this, arguments)
        },_activate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
        },_deactivate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
        },_over: function(b) {
            var c = a.ui.ddmanager.current;
            !!c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.
            call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
        },_out: function(b) {
            var c = a.ui.ddmanager.current;
            !!c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
        },_drop: function(b, c) {
            var d = c || a.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0])
                return !1;
            var e = !1;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var b = a.data(this, "droppable");
                if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {offset: b.element.offset()}), b.options.tolerance)) {
                    e = !0;
                    return !1
                }
            });
            if (e)
                return !1;
            if (this.accept.call(this.element[0], d.currentItem || d.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d));
                return this.element
            }
            return !1
        },ui: function(a) {
            return {draggable: a.currentItem || a.element,helper: a.helper,position: a.position,offset: a.positionAbs}
        }}), a.ui.intersect = function(b, c, d) {
        if (!c.offset)
            return !1;
        var e = (b.positionAbs || b.position.absolute).left, f = e + b.helperProportions.width, g = (b.positionAbs || b.position.absolute).top, h = g + b.helperProportions.height, i = c.offset.left, j = i + c.proportions.width, k = c.offset.top, l = k + c.proportions.height;
        switch (d) {
            case "fit":
                return i <= e && f <= j && k <= g && h <= l;
            case "intersect":
                return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
            case "pointer":
                var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
                return o;
            case "touch":
                return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
            default:
                return !1
        }
    }, a.ui.ddmanager = {current: null,droppables: {"default": []},prepareOffsets: function(b, c) {
            var d = a.ui.ddmanager.droppables[b.options.scope] || [], e = c ? c.type : null, f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var g = 0; g < d.length; g++) {
                if (d[g].options.disabled || b && !d[g].accept.call(d[g].element[0], b.currentItem || b.element))
                    continue;
                for (var h = 0; h < f.length; h++)
                    if (f[h] == d[g].element[0]) {
                        d[g].proportions.height = 0;
                        continue droppablesLoop
                    }
                d[g].visible = d[g].element.css("display") != "none";
                if (!d[g].visible)
                    continue;
                e == "mousedown" && d[g]._activate.call(d[g], c), d[g].offset = d[g].element.offset(), d[g].proportions = {width: d[g].element[0].offsetWidth,height: d[g].element[0].offsetHeight}
            }
        },drop: function(b, c) {
            var d = !1;
            a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                !this.options || (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c)))
            });
            return d
        },dragStart: function(b, c) {
            b.element.parentsUntil("body").bind("scroll.droppable", function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            })
        },drag: function(b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var d = a.ui.intersect(b, this, this.options.tolerance), e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
                    if (!e)
                        return;
                    var f;
                    if (this.options.greedy) {
                        var g = this.element.parents(":data(droppable):eq(0)");
                        g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
                    }
                    f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
                }
            })
        },dragStop: function(b, c) {
            b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        }}
}(jQuery), function(a, b) {
    a.widget("ui.resizable", a.ui.mouse, {version: "@VERSION",widgetEventPrefix: "resize",options: {alsoResize: !1,animate: !1,animateDuration: "slow",animateEasing: "swing",aspectRatio: !1,autoHide: !1,containment: !1,ghost: !1,grid: !1,handles: "e,s,se",helper: !1,maxHeight: null,maxWidth: null,minHeight: 10,minWidth: 10,zIndex: 1e3},_create: function() {
            var b = this, c = this.options;
            this.element.addClass("ui-resizable"), a.extend(this, {_aspectRatio: !!c.aspectRatio,aspectRatio: c.aspectRatio,originalElement: this.element,_proportionallyResizeElements: [],_helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position: this.element.css("position"),width: this.element.outerWidth(),height: this.element.outerHeight(),top: this.element.css("top"),left: this.element.css("left")})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({marginLeft: this.originalElement.css("marginLeft"),marginTop: this.originalElement.css("marginTop"),marginRight: this.originalElement.css("marginRight"),marginBottom: this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft: 0,marginTop: 0,marginRight: 0,marginBottom: 0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position: "static",zoom: 1,display: "block"})), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {n: ".ui-resizable-n",e: ".ui-resizable-e",s: ".ui-resizable-s",w: ".ui-resizable-w",se: ".ui-resizable-se",sw: ".ui-resizable-sw",ne: ".ui-resizable-ne",nw: ".ui-resizable-nw"} : "e,s,se");
            if (this.handles.constructor == String) {
                this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var d = this.handles.split(",");
                this.handles = {};
                for (var e = 0; e < d.length; e++) {
                    var f = a.trim(d[e]), g = "ui-resizable-" + f, h = a('<div class="ui-resizable-handle ' + g + '"></div>');
                    /sw|se|ne|nw/.test(f) && h.css({zIndex: ++c.zIndex}), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
                }
            }
            this._renderAxis = function(b) {
                b = b || this.element;
                for (var c in this.handles) {
                    this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var d = a(this.handles[c], this.element), e = 0;
                        e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
                        var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
                        b.css(f, e), this._proportionallyResize()
                    }
                    if (!a(this.handles[c]).length)
                        continue
                }
            }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                if (!b.resizing) {
                    if (this.className)
                        var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis = a && a[1] ? a[1] : "se"
                }
            }), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function() {
                c.disabled || (a(this).removeClass("ui-resizable-autohide"), b._handles.show())
            }, function() {
                c.disabled || b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
            })), this._mouseInit()
        },destroy: function() {
            this._mouseDestroy();
            var b = function(b) {
                a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                b(this.element);
                var c = this.element;
                c.after(this.originalElement.css({position: c.css("position"),width: c.outerWidth(),height: c.outerHeight(),top: c.css("top"),left: c.css("left")})).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement);
            return this
        },_mouseCapture: function(b) {
            var c = !1;
            for (var d in this.handles)
                a(this.handles[d])[0] == b.target && (c = !0);
            return !this.options.disabled && c
        },_mouseStart: function(b) {
            var d = this.options, e = this.element.position(), f = this.element;
            this.resizing = !0, this.documentScroll = {top: a(document).scrollTop(),left: a(document).scrollLeft()}, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({position: "absolute",top: e.top,left: e.left}), this._renderProxy();
            var g = c(this.helper.css("left")), h = c(this.helper.css("top"));
            d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left: g,top: h}, this.size = this._helper ? {width: f.outerWidth(),height: f.outerHeight()} : {width: f.width(),height: f.height()}, this.originalSize = this._helper ? {width: f.outerWidth(),height: f.outerHeight()} : {width: f.width(),height: f.height()}, this.originalPosition = {left: g,top: h}, this.sizeDiff = {width: f.outerWidth() - f.width(),height: f.outerHeight() - f.height()}, this.originalMousePosition = {left: b.pageX,top: b.pageY}, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var i = a(".ui-resizable-" + this.axis).css("cursor");
            a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b);
            return !0
        },_mouseDrag: function(a) {
            var b = this.helper, c = this.options, d = {}, e = this, f = this.originalMousePosition, g = this.axis, h = a.pageX - f.left || 0, i = a.pageY - f.top || 0, j = this._change[g];
            if (!j)
                return !1;
            var k = j.apply(this, [a, h, i]);
            this._updateVirtualBoundaries(a.shiftKey);
            if (this._aspectRatio || a.shiftKey)
                k = this._updateRatio(k, a);
            k = this._respectSize(k, a), this._propagate("resize", a), b.css({top: this.position.top + "px",left: this.position.left + "px",width: this.size.width + "px",height: this.size.height + "px"}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(k), this._trigger("resize", a, this.ui());
            return !1
        },_mouseStop: function(b) {
            this.resizing = !1;
            var c = this.options, d = this;
            if (this._helper) {
                var e = this._proportionallyResizeElements, f = e.length && /textarea/i.test(e[0].nodeName), g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height, h = f ? 0 : d.sizeDiff.width, i = {width: d.helper.width() - h,height: d.helper.height() - g}, j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null, k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
                c.animate || this.element.css(a.extend(i, {top: k,left: j})), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
            }
            a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove();
            return !1
        },_updateVirtualBoundaries: function(a) {
            var b = this.options, c, e, f, g, h;
            h = {minWidth: d(b.minWidth) ? b.minWidth : 0,maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,minHeight: d(b.minHeight) ? b.minHeight : 0,maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity};
            if (this._aspectRatio || a)
                c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
            this._vBoundaries = h
        },_updateCache: function(a) {
            var b = this.options;
            this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
        },_updateRatio: function(a, b) {
            var c = this.options, e = this.position, f = this.size, g = this.axis;
            d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width));
            return a
        },_respectSize: function(a, b) {
            var c = this.helper, e = this._vBoundaries, f = this._aspectRatio || b.shiftKey, g = this.axis, h = d(a.width) && e.maxWidth && e.maxWidth < a.width, i = d(a.height) && e.maxHeight && e.maxHeight < a.height, j = d(a.width) && e.minWidth && e.minWidth > a.width, k = d(a.height) && e.minHeight && e.minHeight > a.height;
            j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
            var l = this.originalPosition.left + this.originalSize.width, m = this.position.top + this.size.height, n = /sw|nw|w/.test(g), o = /nw|ne|n/.test(g);
            j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
            var p = !a.width && !a.height;
            p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null);
            return a
        },_proportionallyResize: function() {
            var b = this.options;
            if (!!this._proportionallyResizeElements.length) {
                var c = this.helper || this.element;
                for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
                    var e = this._proportionallyResizeElements[d];
                    if (!this.borderDif) {
                        var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
                        this.borderDif = a.map(f, function(a, b) {
                            var c = parseInt(a, 10) || 0, d = parseInt(g[b], 10) || 0;
                            return c + d
                        })
                    }
                    if (a.browser.msie && (!!a(c).is(":hidden") || !!a(c).parents(":hidden").length))
                        continue;
                    e.css({height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,width: c.width() - this.borderDif[1] - this.borderDif[3] || 0})
                }
            }
        },_renderProxy: function() {
            var b = this.element, c = this.options;
            this.elementOffset = b.offset();
            if (this._helper) {
                this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
                var d = a.browser.msie && a.browser.version < 7, e = d ? 1 : 0, f = d ? 2 : -1;
                this.helper.addClass(this._helper).css({width: this.element.outerWidth() + f,height: this.element.outerHeight() + f,position: "absolute",left: this.elementOffset.left - e + "px",top: this.elementOffset.top - e + "px",zIndex: ++c.zIndex}), this.helper.appendTo("body").disableSelection()
            } else
                this.helper = this.element
        },_change: {e: function(a, b, c) {
                return {width: this.originalSize.width + b}
            },w: function(a, b, c) {
                var d = this.options, e = this.originalSize, f = this.originalPosition;
                return {left: f.left + b,width: e.width - b}
            },n: function(a, b, c) {
                var d = this.options, e = this.originalSize, f = this.originalPosition;
                return {top: f.top + c,height: e.height - c}
            },s: function(a, b, c) {
                return {height: this.originalSize.height + c}
            },se: function(b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
            },sw: function(b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
            },ne: function(b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
            },nw: function(b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
            }},_propagate: function(b, c) {
            a.ui.plugin.call(this, b, [c, this.ui()]), b != "resize" && this._trigger(b, c, this.ui())
        },plugins: {},ui: function() {
            return {originalElement: this.originalElement,element: this.element,helper: this.helper,position: this.position,size: this.size,originalSize: this.originalSize,originalPosition: this.originalPosition}
        }}), a.ui.plugin.add("resizable", "alsoResize", {start: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = function(b) {
                a(b).each(function() {
                    var b = a(this);
                    b.data("resizable-alsoresize", {width: parseInt(b.width(), 10),height: parseInt(b.height(), 10),left: parseInt(b.css("left"), 10),top: parseInt(b.css("top"), 10)})
                })
            };
            typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function(a) {
                f(a)
            }) : f(e.alsoResize)
        },resize: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = d.originalSize, g = d.originalPosition, h = {height: d.size.height - f.height || 0,width: d.size.width - f.width || 0,top: d.position.top - g.top || 0,left: d.position.left - g.left || 0}, i = function(b, d) {
                a(b).each(function() {
                    var b = a(this), e = a(this).data("resizable-alsoresize"), f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    a.each(g, function(a, b) {
                        var c = (e[b] || 0) + (h[b] || 0);
                        c && c >= 0 && (f[b] = c || null)
                    }), b.css(f)
                })
            };
            typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a, b) {
                i(a, b)
            }) : i(e.alsoResize)
        },stop: function(b, c) {
            a(this).removeData("resizable-alsoresize")
        }}), a.ui.plugin.add("resizable", "animate", {stop: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = d._proportionallyResizeElements, g = f.length && /textarea/i.test(f[0].nodeName), h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height, i = g ? 0 : d.sizeDiff.width, j = {width: d.size.width - i,height: d.size.height - h}, k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null, l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
            d.element.animate(a.extend(j, l && k ? {top: l,left: k} : {}), {duration: e.animateDuration,easing: e.animateEasing,step: function() {
                    var c = {width: parseInt(d.element.css("width"), 10),height: parseInt(d.element.css("height"), 10),top: parseInt(d.element.css("top"), 10),left: parseInt(d.element.css("left"), 10)};
                    f && f.length && a(f[0]).css({width: c.width,height: c.height}), d._updateCache(c), d._propagate("resize", b)
                }})
        }}), a.ui.plugin.add("resizable", "containment", {start: function(b, d) {
            var e = a(this).data("resizable"), f = e.options, g = e.element, h = f.containment, i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
            if (!!i) {
                e.containerElement = a(i);
                if (/document/.test(h) || h == document)
                    e.containerOffset = {left: 0,top: 0}, e.containerPosition = {left: 0,top: 0}, e.parentData = {element: a(document),left: 0,top: 0,width: a(document).width(),height: a(document).height() || document.body.parentNode.scrollHeight};
                else {
                    var j = a(i), k = [];
                    a(["Top", "Right", "Left", "Bottom"]).each(function(a, b) {
                        k[a] = c(j.css("padding" + b))
                    }), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {height: j.innerHeight() - k[3],width: j.innerWidth() - k[1]};
                    var l = e.containerOffset, m = e.containerSize.height, n = e.containerSize.width, o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n, p = a.ui.hasScroll(i) ? i.scrollHeight : m;
                    e.parentData = {element: i,left: l.left,top: l.top,width: o,height: p}
                }
            }
        },resize: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = d.containerSize, g = d.containerOffset, h = d.size, i = d.position, j = d._aspectRatio || b.shiftKey, k = {top: 0,left: 0}, l = d.containerElement;
            l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
            var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width), n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height), o = d.containerElement.get(0) == d.element.parent().get(0), p = /relative|absolute/.test(d.containerElement.css("position"));
            o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
        },stop: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = d.position, g = d.containerOffset, h = d.containerPosition, i = d.containerElement, j = a(d.helper), k = j.offset(), l = j.outerWidth() - d.sizeDiff.width, m = j.outerHeight() - d.sizeDiff.height;
            d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({left: k.left - h.left - g.left,width: l,height: m}), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({left: k.left - h.left - g.left,width: l,height: m})
        }}), a.ui.plugin.add("resizable", "ghost", {start: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = d.size;
            d.ghost = d.originalElement.clone(), d.ghost.css({opacity: .25,display: "block",position: "relative",height: f.height,width: f.width,margin: 0,left: 0,top: 0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper)
        },resize: function(b, c) {
            var d = a(this).data("resizable"), e = d.options;
            d.ghost && d.ghost.css({position: "relative",height: d.size.height,width: d.size.width})
        },stop: function(b, c) {
            var d = a(this).data("resizable"), e = d.options;
            d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
        }}), a.ui.plugin.add("resizable", "grid", {resize: function(b, c) {
            var d = a(this).data("resizable"), e = d.options, f = d.size, g = d.originalSize, h = d.originalPosition, i = d.axis, j = e._aspectRatio || b.shiftKey;
            e.grid = typeof e.grid == "number" ? [e.grid, e.grid] : e.grid;
            var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1), l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
            /^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
        }});
    var c = function(a) {
        return parseInt(a, 10) || 0
    }, d = function(a) {
        return !isNaN(parseInt(a, 10))
    }
}(jQuery), function(a, b) {
    a.widget("ui.selectable", a.ui.mouse, {version: "@VERSION",options: {appendTo: "body",autoRefresh: !0,distance: 0,filter: "*",tolerance: "touch"},_create: function() {
            var b = this;
            this.element.addClass("ui-selectable"), this.dragged = !1;
            var c;
            this.refresh = function() {
                c = a(b.options.filter, b.element[0]), c.addClass("ui-selectee"), c.each(function() {
                    var b = a(this), c = b.offset();
                    a.data(this, "selectable-item", {element: this,$element: b,left: c.left,top: c.top,right: c.left + b.outerWidth(),bottom: c.top + b.outerHeight(),startselected: !1,selected: b.hasClass("ui-selected"),selecting: b.hasClass("ui-selecting"),unselecting: b.hasClass("ui-unselecting")})
                })
            }, this.refresh(), this.selectees = c.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
        },destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy();
            return this
        },_mouseStart: function(b) {
            var c = this;
            this.opos = [b.pageX, b.pageY];
            if (!this.options.disabled) {
                var d = this.options;
                this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({left: b.clientX,top: b.clientY,width: 0,height: 0}), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var d = a.data(this, "selectable-item");
                    d.startselected = !0, !b.metaKey && !b.ctrlKey && (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {unselecting: d.element}))
                }), a(b.target).parents().andSelf().each(function() {
                    var d = a.data(this, "selectable-item");
                    if (d) {
                        var e = !b.metaKey && !b.ctrlKey || !d.$element.hasClass("ui-selected");
                        d.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting"), d.unselecting = !e, d.selecting = e, d.selected = e, e ? c._trigger("selecting", b, {selecting: d.element}) : c._trigger("unselecting", b, {unselecting: d.element});
                        return !1
                    }
                })
            }
        },_mouseDrag: function(b) {
            var c = this;
            this.dragged = !0;
            if (!this.options.disabled) {
                var d = this.options, e = this.opos[0], f = this.opos[1], g = b.pageX, h = b.pageY;
                if (e > g) {
                    var i = g;
                    g = e, e = i
                }
                if (f > h) {
                    var i = h;
                    h = f, f = i
                }
                this.helper.css({left: e,top: f,width: g - e,height: h - f}), this.selectees.each(function() {
                    var i = a.data(this, "selectable-item");
                    if (!!i && i.element != c.element[0]) {
                        var j = !1;
                        d.tolerance == "touch" ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : d.tolerance == "fit" && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, c._trigger("selecting", b, {selecting: i.element}))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), c._trigger("unselecting", b, {unselecting: i.element}))), i.selected && !b.metaKey && !b.ctrlKey && !i.startselected && (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, c._trigger("unselecting", b, {unselecting: i.element})))
                    }
                });
                return !1
            }
        },_mouseStop: function(b) {
            var c = this;
            this.dragged = !1;
            var d = this.options;
            a(".ui-unselecting", this.element[0]).each(function() {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {unselected: d.element})
            }), a(".ui-selecting", this.element[0]).each(function() {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {selected: d.element})
            }), this._trigger("stop", b), this.helper.remove();
            return !1
        }})
}(jQuery), function(a, b) {
    a.widget("ui.sortable", a.ui.mouse, {version: "@VERSION",widgetEventPrefix: "sort",ready: !1,options: {appendTo: "parent",axis: !1,connectWith: !1,containment: !1,cursor: "auto",cursorAt: !1,dropOnEmpty: !0,forcePlaceholderSize: !1,forceHelperSize: !1,grid: !1,handle: !1,helper: "original",items: "> *",opacity: !1,placeholder: !1,revert: !1,scroll: !0,scrollSensitivity: 20,scrollSpeed: 20,scope: "default",tolerance: "intersect",zIndex: 1e3},_create: function() {
            var a = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },_destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--)
                this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },_setOption: function(b, c) {
            b === "disabled" ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
        },_mouseCapture: function(b, c) {
            var d = this;
            if (this.reverting)
                return !1;
            if (this.options.disabled || this.options.type == "static")
                return !1;
            this._refreshItems(b);
            var e = null, f = this, g = a(b.target).parents().each(function() {
                if (a.data(this, d.widgetName + "-item") == f) {
                    e = a(this);
                    return !1
                }
            });
            a.data(b.target, d.widgetName + "-item") == f && (e = a(b.target));
            if (!e)
                return !1;
            if (this.options.handle && !c) {
                var h = !1;
                a(this.options.handle, e).find("*").andSelf().each(function() {
                    this == b.target && (h = !0)
                });
                if (!h)
                    return !1
            }
            this.currentItem = e, this._removeCurrentsFromItems();
            return !0
        },_mouseStart: function(b, c, d) {
            var e = this.options, f = this;
            this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top: this.offset.top - this.margins.top,left: this.offset.left - this.margins.left}, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), a.extend(this.offset, {click: {left: b.pageX - this.offset.left,top: b.pageY - this.offset.top},parent: this._getParentOffset(),relative: this._getRelativeOffset()}), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {prev: this.currentItem.prev()[0],parent: this.currentItem.parent()[0]}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
            if (!d)
                for (var g = this.containers.length - 1; g >= 0; g--)
                    this.containers[g]._trigger("activate", b, f._uiHash(this));
            a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b);
            return !0
        },_mouseDrag: function(b) {
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
            if (this.options.scroll) {
                var c = this.options, d = !1;
                this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y")
                this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x")
                this.helper[0].style.top = this.position.top + "px";
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e], g = f.item[0], h = this._intersectsWithPointer(f);
                if (!h)
                    continue;
                if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != g && !a.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.contains(this.element[0], g) : !0)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(f))
                        this._rearrange(b, f);
                    else
                        break;
                    this._trigger("change", b, this._uiHash());
                    break
                }
            }
            this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs;
            return !1
        },_mouseStop: function(b, c) {
            if (!!b) {
                a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
                if (this.options.revert) {
                    var d = this, e = d.placeholder.offset();
                    d.reverting = !0, a(this.helper).animate({left: e.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function() {
                        d._clear(b)
                    })
                } else
                    this._clear(b, c);
                return !1
            }
        },cancel: function() {
            var b = this;
            if (this.dragging) {
                this._mouseUp({target: null}), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var c = this.containers.length - 1; c >= 0; c--)
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger("out", null, b._uiHash(this)), this.containers[c].containerCache.over = 0)
            }
            this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {helper: null,dragging: !1,reverting: !1,_noFinalSort: null}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem));
            return this
        },serialize: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected), d = [];
            b = b || {}, a(c).each(function() {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
            }), !d.length && b.key && d.push(b.key + "=");
            return d.join("&")
        },toArray: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected), d = [];
            b = b || {}, c.each(function() {
                d.push(a(b.item || this).attr(b.attribute || "id") || "")
            });
            return d
        },_intersectsWith: function(a) {
            var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = d + j > h && d + j < i && b + k > f && b + k < g;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
        },_intersectsWithPointer: function(b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
            if (!e)
                return !1;
            return this.floating ? g && g == "right" || f == "down" ? 2 : 1 : f && (f == "down" ? 2 : 1)
        },_intersectsWithSides: function(b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            return this.floating && f ? f == "right" && d || f == "left" && !d : e && (e == "down" && c || e == "up" && !c)
        },_getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down" : "up")
        },_getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right" : "left")
        },refresh: function(a) {
            this._refreshItems(a), this.refreshPositions();
            return this
        },_connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },_getItemsAsjQuery: function(b) {
            var c = this, d = [], e = [], f = this._connectWith();
            if (f && b)
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = a(f[g]);
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = a.data(h[i], this.widgetName);
                        j && j != this && !j.options.disabled && e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
                    }
                }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options: this.options,item: this.currentItem}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var g = e.length - 1; g >= 0; g--)
                e[g][0].each(function() {
                    d.push(this)
                });
            return a(d)
        },_removeCurrentsFromItems: function() {
            var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
            for (var b = 0; b < this.items.length; b++)
                for (var c = 0; c < a.length; c++)
                    a[c] == this.items[b].item[0] && this.items.splice(b, 1)
        },_refreshItems: function(b) {
            this.items = [], this.containers = [this];
            var c = this.items, d = this, e = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]], f = this._connectWith();
            if (f && this.ready)
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = a(f[g]);
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = a.data(h[i], this.widgetName);
                        j && j != this && !j.options.disabled && (e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, {item: this.currentItem}) : a(j.options.items, j.element), j]), this.containers.push(j))
                    }
                }
            for (var g = e.length - 1; g >= 0; g--) {
                var k = e[g][1], l = e[g][0];
                for (var i = 0, m = l.length; i < m; i++) {
                    var n = a(l[i]);
                    n.data(this.widgetName + "-item", k), c.push({item: n,instance: k,width: 0,height: 0,left: 0,top: 0})
                }
            }
        },refreshPositions: function(b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var c = this.items.length - 1; c >= 0; c--) {
                var d = this.items[c];
                if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0])
                    continue;
                var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
                b || (d.width = e.outerWidth(), d.height = e.outerHeight());
                var f = e.offset();
                d.left = f.left, d.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    var f = this.containers[c].element.offset();
                    this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
                }
            return this
        },_createPlaceholder: function(b) {
            var c = b || this, d = c.options;
            if (!d.placeholder || d.placeholder.constructor == String) {
                var e = d.placeholder;
                d.placeholder = {element: function() {
                        var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper").html("&nbsp;")[0];
                        e || (b.style.visibility = "hidden");
                        return b
                    },update: function(a, b) {
                        if (!e || !!d.forcePlaceholderSize)
                            b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
                    }}
            }
            c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder)
        },_contactContainers: function(b) {
            var c = null, d = null;
            for (var e = this.containers.length - 1; e >= 0; e--) {
                if (a.contains(this.currentItem[0], this.containers[e].element[0]))
                    continue;
                if (this._intersectsWith(this.containers[e].containerCache)) {
                    if (c && a.contains(this.containers[e].element[0], c.element[0]))
                        continue;
                    c = this.containers[e], d = e
                } else
                    this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            if (!!c)
                if (this.containers.length === 1)
                    this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
                else if (this.currentContainer != this.containers[d]) {
                    var f = 1e4, g = null, h = this.positionAbs[this.containers[d].floating ? "left" : "top"];
                    for (var i = this.items.length - 1; i >= 0; i--) {
                        if (!a.contains(this.containers[d].element[0], this.items[i].item[0]))
                            continue;
                        var j = this.items[i][this.containers[d].floating ? "left" : "top"];
                        Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i])
                    }
                    if (!g && !this.options.dropOnEmpty)
                        return;
                    this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1
                }
        },_createHelper: function(b) {
            var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {width: this.currentItem[0].style.width,height: this.currentItem[0].style.height,position: this.currentItem.css("position"),top: this.currentItem.css("top"),left: this.currentItem.css("left")}), (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height());
            return d
        },_adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0],top: +b[1] || 0}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },_getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)
                b = {top: 0,left: 0};
            return {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        },_getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return {top: 0,left: 0}
        },_cacheMargins: function() {
            this.margins = {left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,top: parseInt(this.currentItem.css("marginTop"), 10) || 0}
        },_cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(),height: this.helper.outerHeight()}
        },_setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window")
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment)) {
                var c = a(b.containment)[0], d = a(b.containment).offset(), e = a(c).css("overflow") != "hidden";
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },_convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
            return {top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)}
        },_generatePosition: function(b) {
            var c = this.options, d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName);
            this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
            var f = b.pageX, g = b.pageY;
            if (this.originalPosition) {
                this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
                if (c.grid) {
                    var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
                    g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
                    var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
                    f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i
                }
            }
            return {top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())}
        },_rearrange: function(a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var e = this, f = this.counter;
            window.setTimeout(function() {
                f == e.counter && e.refreshPositions(!d)
            }, 0)
        },_clear: function(b, c) {
            this.reverting = !1;
            var d = [], e = this;
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var f in this._storedCSS)
                    if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static")
                        this._storedCSS[f] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else
                this.currentItem.show();
            this.fromOutside && !c && d.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function(a) {
                this._trigger("update", a, this._uiHash())
            });
            if (!a.contains(this.element[0], this.currentItem[0])) {
                c || d.push(function(a) {
                    this._trigger("remove", a, this._uiHash())
                });
                for (var f = this.containers.length - 1; f >= 0; f--)
                    a.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function(a) {
                        return function(b) {
                            a._trigger("receive", b, this._uiHash(this))
                        }
                    }.call(this, this.containers[f])), d.push(function(a) {
                        return function(b) {
                            a._trigger("update", b, this._uiHash(this))
                        }
                    }.call(this, this.containers[f])))
            }
            for (var f = this.containers.length - 1; f >= 0; f--)
                c || d.push(function(a) {
                    return function(b) {
                        a._trigger("deactivate", b, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function(a) {
                    return function(b) {
                        a._trigger("out", b, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
            this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!c) {
                    this._trigger("beforeStop", b, this._uiHash());
                    for (var f = 0; f < d.length; f++)
                        d[f].call(this, b);
                    this._trigger("stop", b, this._uiHash())
                }
                return !1
            }
            c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
            if (!c) {
                for (var f = 0; f < d.length; f++)
                    d[f].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            this.fromOutside = !1;
            return !0
        },_trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },_uiHash: function(b) {
            var c = b || this;
            return {helper: c.helper,placeholder: c.placeholder || a([]),position: c.position,originalPosition: c.originalPosition,offset: c.positionAbs,item: c.currentItem,sender: b ? b.element : null}
        }})
}(jQuery), jQuery.effects || function(a, b) {
    function m(b) {
        if (!b || typeof b == "number" || a.fx.speeds[b])
            return !0;
        if (typeof b == "string" && !a.effects.effect[b]) {
            if (c && a.effects[b])
                return !1;
            return !0
        }
        return !1
    }
    function l(c, d, e, f) {
        if (a.isPlainObject(c))
            return c;
        c = {effect: c}, d === b && (d = {}), a.isFunction(d) && (f = d, e = null, d = {});
        if (a.type(d) === "number" || a.fx.speeds[d])
            f = e, e = d, d = {};
        a.isFunction(e) && (f = e, e = null), d && a.extend(c, d), e = e || d.duration, c.duration = a.fx.off ? 0 : typeof e == "number" ? e : e in a.fx.speeds ? a.fx.speeds[e] : a.fx.speeds._default, c.complete = f || d.complete;
        return c
    }
    function k(b, c) {
        var d = {}, e, f;
        for (e in c)
            f = c[e], b[e] != f && !h[e] && (a.fx.step[e] || !isNaN(parseFloat(f))) && (d[e] = f);
        return d
    }
    function j() {
        var b = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle, c = {}, d, e, f;
        if (b && b.length && b[0] && b[b[0]]) {
            f = b.length;
            while (f--)
                d = b[f], typeof b[d] == "string" && (c[a.camelCase(d)] = b[d])
        } else
            for (d in b)
                typeof b[d] == "string" && (c[d] = b[d]);
        return c
    }
    function e(b, c) {
        var e;
        do {
            e = a.css(b, c);
            if (e != "" && e !== "transparent" || a.nodeName(b, "body"))
                break;
            c = "backgroundColor"
        } while (b = b.parentNode);
        return d(e)
    }
    function d(b) {
        var c;
        if (b && b.constructor === Array && b.length === 3)
            return b;
        if (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))
            return [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)];
        if (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))
            return [parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55];
        if (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))
            return [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)];
        if (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))
            return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
        if (c = /rgba\(0, 0, 0, 0\)/.exec(b))
            return f.transparent;
        return f[a.trim(b).toLowerCase()]
    }
    var c = a.uiBackCompat !== !1;
    a.effects = {effect: {}}, a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(b, c) {
        a.fx.step[c] = function(a) {
            a.colorInit || (a.start = e(a.elem, c), a.end = d(a.end), a.colorInit = !0), a.elem.style[c] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
        }
    });
    var f = {aqua: [0, 255, 255],azure: [240, 255, 255],beige: [245, 245, 220],black: [0, 0, 0],blue: [0, 0, 255],brown: [165, 42, 42],cyan: [0, 255, 255],darkblue: [0, 0, 139],darkcyan: [0, 139, 139],darkgrey: [169, 169, 169],darkgreen: [0, 100, 0],darkkhaki: [189, 183, 107],darkmagenta: [139, 0, 139],darkolivegreen: [85, 107, 47],darkorange: [255, 140, 0],darkorchid: [153, 50, 204],darkred: [139, 0, 0],darksalmon: [233, 150, 122],darkviolet: [148, 0, 211],fuchsia: [255, 0, 255],gold: [255, 215, 0],green: [0, 128, 0],indigo: [75, 0, 130],khaki: [240, 230, 140],lightblue: [173, 216, 230],lightcyan: [224, 255, 255],lightgreen: [144, 238, 144],lightgrey: [211, 211, 211],lightpink: [255, 182, 193],lightyellow: [255, 255, 224],lime: [0, 255, 0],magenta: [255, 0, 255],maroon: [128, 0, 0],navy: [0, 0, 128],olive: [128, 128, 0],orange: [255, 165, 0],pink: [255, 192, 203],purple: [128, 0, 128],violet: [128, 0, 128],red: [255, 0, 0],silver: [192, 192, 192],white: [255, 255, 255],yellow: [255, 255, 0],transparent: [255, 255, 255]}, g = ["add", "remove", "toggle"], h = {border: 1,borderBottom: 1,borderColor: 1,borderLeft: 1,borderRight: 1,borderTop: 1,borderWidth: 1,margin: 1,padding: 1}, i = "ui-effects-";
    a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, c) {
        a.fx.step[c] = function(a) {
            if (a.end !== "none" && !a.setAttr || a.pos === 1 && !a.setAttr)
                jQuery.style(a.elem, c, a.end), a.setAttr = !0
        }
    }), a.effects.animateClass = function(b, c, d, e) {
        var f = a.speed(c, d, e);
        return this.queue(function() {
            var c = a(this), d = c.attr("class") || "", e, h = f.children ? c.find("*").andSelf() : c;
            h = h.map(function() {
                var b = a(this);
                return {el: b,start: j.call(this)}
            }), e = function() {
                a.each(g, function(a, d) {
                    b[d] && c[d + "Class"](b[d])
                })
            }, e(), h = h.map(function() {
                this.end = j.call(this.el[0]), this.diff = k(this.start, this.end);
                return this
            }), c.attr("class", d), h = h.map(function() {
                var b = this, c = a.Deferred();
                this.el.animate(this.diff, {duration: f.duration,easing: f.easing,queue: !1,complete: function() {
                        c.resolve(b)
                    }});
                return c.promise()
            }), a.when.apply(a, h.get()).done(function() {
                e(), a.each(arguments, function() {
                    var b = this.el;
                    a.each(this.diff, function(a) {
                        b.css(a, "")
                    })
                }), f.complete.call(c[0])
            })
        })
    }, a.fn.extend({_addClass: a.fn.addClass,addClass: function(b, c, d, e) {
            return c ? a.effects.animateClass.apply(this, [{add: b}, c, d, e]) : this._addClass(b)
        },_removeClass: a.fn.removeClass,removeClass: function(b, c, d, e) {
            return c ? a.effects.animateClass.apply(this, [{remove: b}, c, d, e]) : this._removeClass(b)
        },_toggleClass: a.fn.toggleClass,toggleClass: function(c, d, e, f, g) {
            return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {add: c} : {remove: c}, e, f, g]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [{toggle: c}, d, e, f])
        },switchClass: function(b, c, d, e, f) {
            return a.effects.animateClass.apply(this, [{add: c,remove: b}, d, e, f])
        }}), a.extend(a.effects, {version: "@VERSION",save: function(a, b) {
            for (var c = 0; c < b.length; c++)
                b[c] !== null && a.data(i + b[c], a[0].style[b[c]])
        },restore: function(a, b) {
            for (var c = 0; c < b.length; c++)
                b[c] !== null && a.css(b[c], a.data(i + b[c]))
        },setMode: function(a, b) {
            b === "toggle" && (b = a.is(":hidden") ? "show" : "hide");
            return b
        },getBaseline: function(a, b) {
            var c, d;
            switch (a[0]) {
                case "top":
                    c = 0;
                    break;
                case "middle":
                    c = .5;
                    break;
                case "bottom":
                    c = 1;
                    break;
                default:
                    c = a[0] / b.height
            }
            switch (a[1]) {
                case "left":
                    d = 0;
                    break;
                case "center":
                    d = .5;
                    break;
                case "right":
                    d = 1;
                    break;
                default:
                    d = a[1] / b.width
            }
            return {x: d,y: c}
        },createWrapper: function(b) {
            if (b.parent().is(".ui-effects-wrapper"))
                return b.parent();
            var c = {width: b.outerWidth(!0),height: b.outerHeight(!0),"float": b.css("float")}, d = a("<div></div>").addClass("ui-effects-wrapper").css({fontSize: "100%",background: "transparent",border: "none",margin: 0,padding: 0}), e = {width: b.width(),height: b.height()}, f = document.activeElement;
            b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), b.css("position") === "static" ? (d.css({position: "relative"}), b.css({position: "relative"})) : (a.extend(c, {position: b.css("position"),zIndex: b.css("z-index")}), a.each(["top", "left", "bottom", "right"], function(a, d) {
                c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
            }), b.css({position: "relative",top: 0,left: 0,right: "auto",bottom: "auto"})), b.css(e);
            return d.css(c).show()
        },removeWrapper: function(b) {
            var c = document.activeElement;
            b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus());
            return b
        },setTransition: function(b, c, d, e) {
            e = e || {}, a.each(c, function(a, c) {
                var f = b.cssUnit(c);
                f[0] > 0 && (e[c] = f[0] * d + f[1])
            });
            return e
        }}), a.fn.extend({effect: function(b, d, e, f) {
            function m(b) {
                function f() {
                    a.isFunction(d) && d.call(c[0]), a.isFunction(b) && b()
                }
                var c = a(this), d = g.complete, e = g.mode;
                (c.is(":hidden") ? e === "hide" : e === "show") ? f() : j.call(c[0], g, f)
            }
            var g = l.apply(this, arguments), h = g.mode, i = g.queue, j = a.effects.effect[g.effect], k = !j && c && a.effects[g.effect];
            if (a.fx.off || !j && !k)
                return h ? this[h](g.duration, g.complete) : this.each(function() {
                    g.complete && g.complete.call(this)
                });
            return j ? i === !1 ? this.each(m) : this.queue(i || "fx", m) : k.call(this, {options: g,duration: g.duration,callback: g.complete,mode: g.mode})
        },_show: a.fn.show,show: function(a) {
            if (m(a))
                return this._show.apply(this, arguments);
            var b = l.apply(this, arguments);
            b.mode = "show";
            return this.effect.call(this, b)
        },_hide: a.fn.hide,hide: function(a) {
            if (m(a))
                return this._hide.apply(this, arguments);
            var b = l.apply(this, arguments);
            b.mode = "hide";
            return this.effect.call(this, b)
        },__toggle: a.fn.toggle,toggle: function(b) {
            if (m(b) || typeof b == "boolean" || a.isFunction(b))
                return this.__toggle.apply(this, arguments);
            var c = l.apply(this, arguments);
            c.mode = "toggle";
            return this.effect.call(this, c)
        },cssUnit: function(b) {
            var c = this.css(b), d = [];
            a.each(["em", "px", "%", "pt"], function(a, b) {
                c.indexOf(b) > 0 && (d = [parseFloat(c), b])
            });
            return d
        }});
    var n = {};
    a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, b) {
        n[b] = function(b) {
            return Math.pow(b, a + 2)
        }
    }), a.extend(n, {Sine: function(a) {
            return 1 - Math.cos(a * Math.PI / 2)
        },Circ: function(a) {
            return 1 - Math.sqrt(1 - a * a)
        },Elastic: function(a) {
            return a === 0 || a === 1 ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin(((a - 1) * 80 - 7.5) * Math.PI / 15)
        },Back: function(a) {
            return a * a * (3 * a - 2)
        },Bounce: function(a) {
            var b, c = 4;
            while (a < ((b = Math.pow(2, --c)) - 1) / 11)
                ;
            return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((b * 3 - 2) / 22 - a, 2)
        }}), a.each(n, function(b, c) {
        a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
            return 1 - c(1 - a)
        }, a.easing["easeInOut" + b] = function(a) {
            return a < .5 ? c(a * 2) / 2 : c(a * -2 + 2) / -2 + 1
        }
    })
}(jQuery), function(a, b) {
    var c = /up|down|vertical/, d = /up|left|vertical|horizontal/;
    a.effects.effect.blind = function(b, e) {
        var f = a(this), g = ["position", "top", "bottom", "left", "right", "height", "width"], h = a.effects.setMode(f, b.mode || "hide"), i = b.direction || "up", j = c.test(i), k = j ? "height" : "width", l = j ? "top" : "left", m = d.test(i), n = {}, o = h === "show", p, q, r;
        f.parent().is(".ui-effects-wrapper") ? a.effects.save(f.parent(), g) : a.effects.save(f, g), f.show(), p = a.effects.createWrapper(f).css({overflow: "hidden"}), q = p[k](), r = parseFloat(p.css(l)), n[k] = o ? q : 0, m || (f.css(j ? "bottom" : "right", 0).css(j ? "top" : "left", "auto").css({position: "absolute"}), n[l] = o ? r : q + r), o && (p.css(k, 0), m || p.css(l, r + q)), p.animate(n, {duration: b.duration,easing: b.easing,queue: !1,complete: function() {
                h === "hide" && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), e()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.bounce = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "height", "width"], f = a.effects.setMode(d, b.mode || "effect"), g = f === "hide", h = f === "show", i = b.direction || "up", j = b.distance, k = b.times || 5, l = k * 2 + (h || g ? 1 : 0), m = b.duration / l, n = b.easing, o = i === "up" || i === "down" ? "top" : "left", p = i === "up" || i === "left", q, r, s, t = d.queue(), u = t.length;
        (h || g) && e.push("opacity"), a.effects.save(d, e), d.show(), a.effects.createWrapper(d), j || (j = d[o === "top" ? "outerHeight" : "outerWidth"]() / 3), h && (s = {opacity: 1}, s[o] = 0, d.css("opacity", 0).css(o, p ? -j * 2 : j * 2).animate(s, m, n)), g && (j = j / Math.pow(2, k - 1)), s = {}, s[o] = 0;
        for (q = 0; q < k; q++)
            r = {}, r[o] = (p ? "-=" : "+=") + j, d.animate(r, m, n).animate(s, m, n), j = g ? j * 2 : j / 2;
        g && (r = {opacity: 0}, r[o] = (p ? "-=" : "+=") + j, d.animate(r, m, n)), d.queue(function() {
            g && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
        }), u > 1 && t.splice.apply(t, [1, 0].concat(t.splice(u, l + 1))), d.dequeue()
    }
}(jQuery), function(a, b) {
    a.effects.effect.clip = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "height", "width"], f = a.effects.setMode(d, b.mode || "hide"), g = f === "show", h = b.direction || "vertical", i = h === "vertical", j = i ? "height" : "width", k = i ? "top" : "left", l = {}, m, n, o;
        a.effects.save(d, e), d.show(), m = a.effects.createWrapper(d).css({overflow: "hidden"}), n = d[0].tagName === "IMG" ? m : d, o = n[j](), g && (n.css(j, 0), n.css(k, o / 2)), l[j] = g ? o : 0, l[k] = g ? 0 : o / 2, n.animate(l, {queue: !1,duration: b.duration,easing: b.easing,complete: function() {
                g || d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.drop = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], f = a.effects.setMode(d, b.mode || "hide"), g = f === "show", h = b.direction || "left", i = h === "up" || h === "down" ? "top" : "left", j = h === "up" || h === "left" ? "pos" : "neg", k = {opacity: g ? 1 : 0}, l;
        a.effects.save(d, e), d.show(), a.effects.createWrapper(d), l = b.distance || d[i == "top" ? "outerHeight" : "outerWidth"]({margin: !0}) / 2, g && d.css("opacity", 0).css(i, j == "pos" ? -l : l), k[i] = (g ? j === "pos" ? "+=" : "-=" : j === "pos" ? "-=" : "+=") + l, d.animate(k, {queue: !1,duration: b.duration,easing: b.easing,complete: function() {
                f == "hide" && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.explode = function(b, c) {
        function t() {
            f.css({visibility: "visible"}), a(l).remove(), h || f.hide(), c()
        }
        function s() {
            l.push(this), l.length == d * e && t()
        }
        var d = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3, e = d, f = a(this), g = a.effects.setMode(f, b.mode || "hide"), h = g === "show", i = f.show().css("visibility", "hidden").offset(), j = Math.ceil(f.outerWidth() / e), k = Math.ceil(f.outerHeight() / d), l = [], m, n, o, p, q, r;
        for (m = 0; m < d; m++) {
            p = i.top + m * k, r = m - (d - 1) / 2;
            for (n = 0; n < e; n++)
                o = i.left + n * j, q = n - (e - 1) / 2, f.clone().appendTo("body").wrap("<div></div>").css({position: "absolute",visibility: "visible",left: -n * j,top: -m * k}).parent().addClass("ui-effects-explode").css({position: "absolute",overflow: "hidden",width: j,height: k,left: o + (h ? q * j : 0),top: p + (h ? r * k : 0),opacity: h ? 0 : 1}).animate({left: o + (h ? 0 : q * j),top: p + (h ? 0 : r * k),opacity: h ? 1 : 0}, b.duration || 500, b.easing, s)
        }
    }
}(jQuery), function(a, b) {
    a.effects.effect.fade = function(b, c) {
        var d = a(this), e = a.effects.setMode(d, b.mode || "toggle"), f = e === "hide";
        d.show(), d.animate({opacity: f ? 0 : 1}, {queue: !1,duration: b.duration,easing: b.easing,complete: function() {
                f && d.hide(), c()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.fold = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "height", "width"], f = a.effects.setMode(d, b.mode || "hide"), g = f === "show", h = f === "hide", i = b.size || 15, j = /([0-9]+)%/.exec(i), k = !!b.horizFirst, l = g != k, m = l ? ["width", "height"] : ["height", "width"], n = b.duration / 2, o, p, q = {}, r = {};
        a.effects.save(d, e), d.show(), o = a.effects.createWrapper(d).css({overflow: "hidden"}), p = l ? [o.width(), o.height()] : [o.height(), o.width()], j && (i = parseInt(j[1], 10) / 100 * p[h ? 0 : 1]), g && o.css(k ? {height: 0,width: i} : {height: i,width: 0}), q[m[0]] = g ? p[0] : i, r[m[1]] = g ? p[1] : 0, o.animate(q, n, b.easing).animate(r, n, b.easing, function() {
            h && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
        })
    }
}(jQuery), function(a, b) {
    a.effects.effect.highlight = function(b, c) {
        var d = a(this), e = ["backgroundImage", "backgroundColor", "opacity"], f = a.effects.setMode(d, b.mode || "show"), g = {backgroundColor: d.css("backgroundColor")};
        f === "hide" && (g.opacity = 0), a.effects.save(d, e), d.show().css({backgroundImage: "none",backgroundColor: b.color || "#ffff99"}).animate(g, {queue: !1,duration: b.duration,easing: b.easing,complete: function() {
                f === "hide" && d.hide(), a.effects.restore(d, e), c()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.pulsate = function(b, c) {
        var d = a(this), e = a.effects.setMode(d, b.mode || "show"), f = e === "show", g = e === "hide", h = f || e === "hide", i = (b.times || 5) * 2 + (h ? 1 : 0), j = b.duration / i, k = 0, l = d.queue(), m = l.length, n;
        if (f || !d.is(":visible"))
            d.css("opacity", 0).show(), k = 1;
        for (n = 1; n < i; n++)
            d.animate({opacity: k}, j, b.easing), k = 1 - k;
        d.animate({opacity: k}, j, b.easing), d.queue(function() {
            g && d.hide(), c()
        }), m > 1 && l.splice.apply(l, [1, 0].concat(l.splice(m, i + 1))), d.dequeue()
    }
}(jQuery), function(a, b) {
    a.effects.effect.puff = function(b, c) {
        var d = a(this), e = a.effects.setMode(d, b.mode || "hide"), f = e === "hide", g = parseInt(b.percent, 10) || 150, h = g / 100, i = {height: d.height(),width: d.width()};
        a.extend(b, {effect: "scale",queue: !1,fade: !0,mode: e,complete: c,percent: f ? g : 100,from: f ? i : {height: i.height * h,width: i.width * h}}), d.effect(b)
    }, a.effects.effect.scale = function(b, c) {
        var d = a(this), e = a.extend(!0, {}, b), f = a.effects.setMode(d, b.mode || "effect"), g = parseInt(b.percent, 10) || (parseInt(b.percent, 10) == 0 ? 0 : f == "hide" ? 0 : 100), h = b.direction || "both", i = b.origin, j = {height: d.height(),width: d.width(),outerHeight: d.outerHeight(),outerWidth: d.outerWidth()}, k = {y: h != "horizontal" ? g / 100 : 1,x: h != "vertical" ? g / 100 : 1};
        e.effect = "size", e.queue = !1, e.complete = c, f != "effect" && (e.origin = i || ["middle", "center"], e.restore = !0), e.from = b.from || (f == "show" ? {height: 0,width: 0} : j), e.to = {height: j.height * k.y,width: j.width * k.x,outerHeight: j.outerHeight * k.y,outerWidth: j.outerWidth * k.x}, e.fade && (f == "show" && (e.from.opacity = 0, e.to.opacity = 1), f == "hide" && (e.from.opacity = 1, e.to.opacity = 0)), d.effect(e)
    }, a.effects.effect.size = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], f = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], g = ["width", "height", "overflow"], h = ["fontSize"], i = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], j = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], k = a.effects.setMode(d, b.mode || "effect"), l = b.restore || k !== "effect", m = b.scale || "both", n = b.origin || ["middle", "center"], o, p, q, r = d.css("position");
        k === "show" && d.show(), o = {height: d.height(),width: d.width(),outerHeight: d.outerHeight(),outerWidth: d.outerWidth()}, d.from = b.from || o, d.to = b.to || o, q = {from: {y: d.from.height / o.height,x: d.from.width / o.width},to: {y: d.to.height / o.height,x: d.to.width / o.width}};
        if (m == "box" || m == "both")
            q.from.y !== q.to.y && (e = e.concat(i), d.from = a.effects.setTransition(d, i, q.from.y, d.from), d.to = a.effects.setTransition(d, i, q.to.y, d.to)), q.from.x !== q.to.x && (e = e.concat(j), d.from = a.effects.setTransition(d, j, q.from.x, d.from), d.to = a.effects.setTransition(d, j, q.to.x, d.to));
        (m == "content" || m == "both") && q.from.y !== q.to.y && (e = e.concat(h), d.from = a.effects.setTransition(d, h, q.from.
        y, d.from), d.to = a.effects.setTransition(d, h, q.to.y, d.to)), a.effects.save(d, l ? e : f), d.show(), a.effects.createWrapper(d), d.css("overflow", "hidden").css(d.from), n && (p = a.effects.getBaseline(n, o), d.from.top = (o.outerHeight - d.outerHeight()) * p.y, d.from.left = (o.outerWidth - d.outerWidth()) * p.x, d.to.top = (o.outerHeight - d.to.outerHeight) * p.y, d.to.left = (o.outerWidth - d.to.outerWidth) * p.x), d.css(d.from);
        if (m == "content" || m == "both")
            i = i.concat(["marginTop", "marginBottom"]).concat(h), j = j.concat(["marginLeft", "marginRight"]), g = e.concat(i).concat(j), d.find("*[width]").each(function() {
                var c = a(this), d = {height: c.height(),width: c.width()};
                l && a.effects.save(c, g), c.from = {height: d.height * q.from.y,width: d.width * q.from.x}, c.to = {height: d.height * q.to.y,width: d.width * q.to.x}, q.from.y != q.to.y && (c.from = a.effects.setTransition(c, i, q.from.y, c.from), c.to = a.effects.setTransition(c, i, q.to.y, c.to)), q.from.x != q.to.x && (c.from = a.effects.setTransition(c, j, q.from.x, c.from), c.to = a.effects.setTransition(c, j, q.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function() {
                    l && a.effects.restore(c, g)
                })
            });
        d.animate(d.to, {queue: !1,duration: b.duration,easing: b.easing,complete: function() {
                d.to.opacity === 0 && d.css("opacity", d.from.opacity), k == "hide" && d.hide(), a.effects.restore(d, l ? e : f), l || (r === "static" ? d.css({position: "relative",top: d.to.top,left: d.to.left}) : a.each(["top", "left"], function(a, b) {
                    d.css(b, function(c, e) {
                        var f = parseInt(e, 10), g = a ? d.to.left : d.to.top, h = a ? d.to.outerWidth - d.from.outerWidth : d.to.outerHeight - d.from.outerHeight, i = n[a] === b, j = n[a] === "middle" || n[a] === "center";
                        if (e === "auto")
                            return g + "px";
                        return f + g + "px"
                    })
                })), a.effects.removeWrapper(d), c()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.shake = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "height", "width"], f = a.effects.setMode(d, b.mode || "effect"), g = b.direction || "left", h = b.distance || 20, i = b.times || 3, j = i * 2 + 1, k = b.duration, l = g == "up" || g == "down" ? "top" : "left", m = g == "up" || g == "left", n = {}, o = {}, p = {}, q, r = d.queue(), s = r.length;
        a.effects.save(d, e), d.show(), a.effects.createWrapper(d), n[l] = (m ? "-=" : "+=") + h, o[l] = (m ? "+=" : "-=") + h * 2, p[l] = (m ? "-=" : "+=") + h * 2, d.animate(n, k, b.easing);
        for (q = 1; q < i; q++)
            d.animate(o, k, b.easing).animate(p, k, b.easing);
        d.animate(o, k, b.easing).animate(n, k / 2, b.easing).queue(function() {
            f === "hide" && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
        }), s > 1 && r.splice.apply(r, [1, 0].concat(r.splice(s, j + 1))), d.dequeue()
    }
}(jQuery), function(a, b) {
    a.effects.effect.slide = function(b, c) {
        var d = a(this), e = ["position", "top", "bottom", "left", "right", "width", "height"], f = a.effects.setMode(d, b.mode || "show"), g = f === "show", h = b.direction || "left", i = h == "up" || h == "down" ? "top" : "left", j = h == "up" || h == "left", k, l = {}, m;
        a.effects.save(d, e), d.show(), k = b.distance || d[i === "top" ? "outerHeight" : "outerWidth"]({margin: !0}), a.effects.createWrapper(d).css({overflow: "hidden"}), g && d.css(i, j ? isNaN(k) ? "-" + k : -k : k), l[i] = (g ? j ? "+=" : "-=" : j ? "-=" : "+=") + k, d.animate(l, {queue: !1,duration: b.duration,easing: b.easing,complete: function() {
                f === "hide" && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
            }})
    }
}(jQuery), function(a, b) {
    a.effects.effect.transfer = function(b, c) {
        var d = a(this), e = a(b.to), f = e.css("position") === "fixed", g = a("body"), h = f ? g.scrollTop() : 0, i = f ? g.scrollLeft() : 0, j = e.offset(), k = {top: j.top - h,left: j.left - i,height: e.innerHeight(),width: e.innerWidth()}, l = d.offset(), m = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.className).css({top: l.top - h,left: l.left - i,height: d.innerHeight(),width: d.innerWidth(),position: f ? "fixed" : "absolute"}).animate(k, b.duration, b.easing, function() {
            m.remove(), c()
        })
    }
}(jQuery), function(a, b) {
    a.widget("ui.accordion", {version: "@VERSION",options: {active: 0,animate: {},collapsible: !1,event: "click",header: "> li > :first-child,> :not(li):even",heightStyle: "auto",icons: {activeHeader: "ui-icon-triangle-1-s",header: "ui-icon-triangle-1-e"},activate: null,beforeActivate: null},_create: function() {
            var b = this.options;
            this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset"), this.headers = this.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this._hoverable(this.headers), this._focusable(this.headers), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), !b.collapsible && b.active === !1 && (b.active = 0), b.active < 0 && (b.active += this.headers.length), this.active = this._findActive(b.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"), this.active.next().addClass("ui-accordion-content-active"), this._createIcons(), this.originalHeight = this.element[0].style.height, this.refresh(), this.element.attr("role", "tablist"), this.headers.attr("role", "tab").bind("keydown.accordion", a.proxy(this, "_keydown")).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({"aria-expanded": "false","aria-selected": "false",tabIndex: -1}).next().hide(), this.active.length ? this.active.attr({"aria-expanded": "true","aria-selected": "true",tabIndex: 0}) : this.headers.eq(0).attr("tabIndex", 0), this._setupEvents(b.event)
        },_getCreateEventData: function() {
            return {header: this.active,content: this.active.length ? this.active.next() : a()}
        },_createIcons: function() {
            var b = this.options.icons;
            b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },_destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },_destroy: function() {
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-header-active ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this._destroyIcons();
            var a = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            this.options.heightStyle !== "content" && (this.element.css("height", this.originalHeight), a.css("height", ""))
        },_setOption: function(a, b) {
            a === "active" ? this._activate(b) : (a === "event" && (this.options.event && this.headers.unbind(this.options.event + ".accordion", this._eventHandler), this._setupEvents(b)), this._super(a, b), a === "collapsible" && !b && this.options.active === !1 && this._activate(0), a === "icons" && (this._destroyIcons(), b && this._createIcons()), a === "disabled" && this.headers.add(this.headers.next()).toggleClass("ui-accordion-disabled ui-state-disabled", !!b))
        },_keydown: function(b) {
            if (!(this.options.disabled || b.altKey || b.ctrlKey)) {
                var c = a.ui.keyCode, d = this.headers.length, e = this.headers.index(b.target), f = !1;
                switch (b.keyCode) {
                    case c.RIGHT:
                    case c.DOWN:
                        f = this.headers[(e + 1) % d];
                        break;
                    case c.LEFT:
                    case c.UP:
                        f = this.headers[(e - 1 + d) % d];
                        break;
                    case c.SPACE:
                    case c.ENTER:
                        this._eventHandler(b)
                }
                f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
            }
        },refresh: function() {
            var b = this.options.heightStyle, c = this.element.parent(), d, e;
            this.element.css("height", this.originalHeight), b === "fill" ? (a.support.minHeight || (e = c.css("overflow"), c.css("overflow", "hidden")), d = c.height(), this.element.siblings(":visible").each(function() {
                var b = a(this), c = b.css("position");
                c !== "absolute" && c !== "fixed" && (d -= b.outerHeight(!0))
            }), e && c.css("overflow", e), this.headers.each(function() {
                d -= a(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                a(this).height(Math.max(0, d - a(this).innerHeight() + a(this).height()))
            }).css("overflow", "auto")) : b === "auto" && (d = 0, this.headers.next().each(function() {
                d = Math.max(d, a(this).height("").height())
            }).height(d)), b !== "content" && this.element.height(this.element.height())
        },_activate: function(b) {
            var c = this._findActive(b)[0];
            c !== this.active[0] && (c = c || this.active[0], this._eventHandler({target: c,currentTarget: c,preventDefault: a.noop}))
        },_findActive: function(b) {
            return typeof b == "number" ? this.headers.eq(b) : a()
        },_setupEvents: function(b) {
            b && this.headers.bind(b.split(" ").join(".accordion ") + ".accordion", a.proxy(this, "_eventHandler"))
        },_eventHandler: function(b) {
            var c = this.options, d = this.active, e = a(b.currentTarget), f = e[0] === d[0], g = f && c.collapsible, h = g ? a() : e.next(), i = d.next(), j = {oldHeader: d,oldContent: i,newHeader: g ? a() : e,newContent: h};
            b.preventDefault();
            c.disabled || f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = g ? !1 : this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active ui-corner-top").addClass("ui-corner-all"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
        },_toggle: function(a) {
            var b = a.newContent, c = this.prevShow.length ? this.prevShow : a.oldContent;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = b, this.prevHide = c, this.options.animate ? this._animate(b, c, a) : (c.hide(), b.show(), this._toggleComplete(a)), c.prev().attr({"aria-expanded": "false","aria-selected": "false",tabIndex: -1}).blur(), b.prev().attr({"aria-expanded": "true","aria-selected": "true",tabIndex: 0}).focus()
        },_animate: function(a, b, f) {
            var g, h, i, j = this, k = a.length && (!b.length || a.index() < b.index()), l = this.options.animate || {}, m = k && l.down || l, n = function() {
                a.removeData("ui-accordion-height"), j._toggleComplete(f)
            };
            typeof m == "number" && (i = m), typeof m == "string" && (h = m), h = h || m.easing || l.easing, i = i || m.duration || l.duration;
            if (!b.size())
                return a.animate(d, i, h, n);
            if (!a.size())
                return b.animate(c, i, h, n);
            g = a.show().outerHeight(), b.animate(c, i, h), a.hide().data("ui-accordion-height", {total: g,toHide: b}).animate(this.options.heightStyle === "content" ? d : e, i, h, n)
        },_toggleComplete: function(a) {
            var b = a.newContent, c = a.oldContent;
            c.removeClass("ui-accordion-content-active"), c.length && (c.parent()[0].className = c.parent()[0].className), this._trigger("activate", null, a)
        }}), a.fx.step.accordionHeight = function(b) {
        var c = a(b.elem), d = c.data("ui-accordion-height");
        c.height(d.total - c.outerHeight() - d.toHide.outerHeight() + c.height())
    };
    var c = {}, d = {}, e = {};
    c.height = c.paddingTop = c.paddingBottom = c.borderTopWidth = c.borderBottomWidth = "hide", d.height = d.paddingTop = d.paddingBottom = d.borderTopWidth = d.borderBottomWidth = "show", a.extend(e, d, {accordionHeight: "show"}), a.uiBackCompat !== !1 && (function(a, b) {
        a.extend(b.options, {navigation: !1,navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }});
        var c = b._create;
        b._create = function() {
            if (this.options.navigation) {
                var b = this, d = this.element.find(this.options.header), e = d.next(), f = d.add(e).find("a").filter(this.options.navigationFilter)[0];
                f && d.add(e).each(function(c) {
                    if (a.contains(this, f)) {
                        b.options.active = Math.floor(c / 2);
                        return !1
                    }
                })
            }
            c.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype), function(a, b) {
        a.extend(b.options, {heightStyle: null,autoHeight: !0,clearStyle: !1,fillSpace: !1});
        var c = b._create, d = b._setOption;
        a.extend(b, {_create: function() {
                this.options.heightStyle = this.options.heightStyle || this._mergeHeightStyle(), c.call(this)
            },_setOption: function(a, b) {
                if (a === "autoHeight" || a === "clearStyle" || a === "fillSpace")
                    this.options.heightStyle = this._mergeHeightStyle();
                d.apply(this, arguments)
            },_mergeHeightStyle: function() {
                var a = this.options;
                if (a.fillSpace)
                    return "fill";
                if (a.clearStyle)
                    return "content";
                if (a.autoHeight)
                    return "auto"
            }})
    }(jQuery, jQuery.ui.accordion.prototype), function(a, b) {
        a.extend(b.options.icons, {activeHeader: null,headerSelected: "ui-icon-triangle-1-s"});
        var c = b._createIcons;
        b._createIcons = function() {
            this.options.icons && (this.options.icons.activeHeader = this.options.icons.activeHeader || this.options.icons.headerSelected), c.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype), function(a, b) {
        b.activate = b._activate;
        var c = b._findActive;
        b._findActive = function(a) {
            a === -1 && (a = !1), a && typeof a != "number" && (a = this.headers.index(this.headers.filter(a)), a === -1 && (a = !1));
            return c.call(this, a)
        }
    }(jQuery, jQuery.ui.accordion.prototype), jQuery.ui.accordion.prototype.resize = jQuery.ui.accordion.prototype.refresh, function(a, b) {
        a.extend(b.options, {change: null,changestart: null});
        var c = b._trigger;
        b._trigger = function(a, b, d) {
            var e = c.apply(this, arguments);
            if (!e)
                return !1;
            a === "beforeActivate" ? e = c.call(this, "changestart", b, d) : a === "activate" && (e = c.call(this, "change", b, d));
            return e
        }
    }(jQuery, jQuery.ui.accordion.prototype), function(a, b) {
        a.extend(b.options, {animate: null,animated: "slide"});
        var c = b._create;
        b._create = function() {
            var a = this.options;
            a.animate === null && (a.animated ? a.animated === "slide" ? a.animate = 300 : a.animated === "bounceslide" ? a.animate = {duration: 200,down: {easing: "easeOutBounce",duration: 1e3}} : a.animate = a.animated : a.animate = !1), c.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype))
}(jQuery), function(a, b) {
    var c = 0;
    a.widget("ui.autocomplete", {version: "@VERSION",defaultElement: "<input>",options: {appendTo: "body",autoFocus: !1,delay: 300,minLength: 1,position: {my: "left top",at: "left bottom",collision: "none"},source: null,change: null,close: null,focus: null,open: null,response: null,search: null,select: null},pending: 0,_create: function() {
            var b = this, c, d, e;
            this.isMultiLine = this.element.is("textarea,[contenteditable]"), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({role: "textbox","aria-autocomplete": "list","aria-haspopup": "true"}).bind("keydown.autocomplete", function(f) {
                if (b.options.disabled || b.element.prop("readOnly"))
                    c = !0, e = !0, d = !0;
                else {
                    c = !1, e = !1, d = !1;
                    var g = a.ui.keyCode;
                    switch (f.keyCode) {
                        case g.PAGE_UP:
                            c = !0, b._move("previousPage", f);
                            break;
                        case g.PAGE_DOWN:
                            c = !0, b._move("nextPage", f);
                            break;
                        case g.UP:
                            c = !0, b._keyEvent("previous", f);
                            break;
                        case g.DOWN:
                            c = !0, b._keyEvent("next", f);
                            break;
                        case g.ENTER:
                        case g.NUMPAD_ENTER:
                            b.menu.active && (c = !0, f.preventDefault());
                        case g.TAB:
                            if (!b.menu.active)
                                return;
                            b.menu.select(f);
                            break;
                        case g.ESCAPE:
                            b.menu.element.is(":visible") && (b._value(b.term), b.close(f));
                            break;
                        default:
                            d = !0, b._searchTimeout(f)
                    }
                }
            }).bind("keypress.autocomplete", function(e) {
                if (c)
                    c = !1, e.preventDefault();
                else {
                    if (d)
                        return;
                    var f = a.ui.keyCode;
                    switch (e.keyCode) {
                        case f.PAGE_UP:
                            b._move("previousPage", e);
                            break;
                        case f.PAGE_DOWN:
                            b._move("nextPage", e);
                            break;
                        case f.UP:
                            b._keyEvent("previous", e);
                            break;
                        case f.DOWN:
                            b._keyEvent("next", e)
                    }
                }
            }).bind("input.autocomplete", function(a) {
                e ? (e = !1, a.preventDefault()) : b._searchTimeout(a)
            }).bind("focus.autocomplete", function() {
                b.options.disabled || (b.selectedItem = null, b.previous = b._value())
            }).bind("blur.autocomplete", function(a) {
                if (!b.options.disabled) {
                    if (b.cancelBlur) {
                        delete b.cancelBlur;
                        return
                    }
                    clearTimeout(b.searching), b.close(a), b._change(a)
                }
            }), this._initSource(), this.response = function() {
                return b._response.apply(b, arguments)
            }, this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).mousedown(function(c) {
                c.preventDefault(), b.cancelBlur = !0, setTimeout(function() {
                    delete b.cancelBlur
                }, 1);
                var d = b.menu.element[0];
                a(c.target).closest(".ui-menu-item").length || setTimeout(function() {
                    b.document.one("mousedown", function(c) {
                        c.target !== b.element[0] && c.target !== d && !a.contains(d, c.target) && b.close()
                    })
                }, 1)
            }).menu({input: a(),focus: function(a, c) {
                    var d = c.item.data("ui-autocomplete-item") || c.item.data("item.autocomplete");
                    !1 !== b._trigger("focus", a, {item: d}) && /^key/.test(a.originalEvent.type) && b._value(d.value)
                },select: function(a, c) {
                    var d = c.item.data("ui-autocomplete-item") || c.item.data("item.autocomplete");
                    previous = b.previous, b.element[0] !== b.document[0].activeElement && (b.element.focus(), b.previous = previous, setTimeout(function() {
                        b.previous = previous, b.selectedItem = d
                    }, 1)), !1 !== b._trigger("select", a, {item: d}) && b._value(d.value), b.term = b._value(), b.close(a), b.selectedItem = d
                }}).zIndex(this.element.zIndex() + 1).hide().data("menu"), a.fn.bgiframe && this.menu.element.bgiframe(), this._bind(this.window, {beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }})
        },_destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove()
        },_setOption: function(a, b) {
            this._super(a, b), a === "source" && this._initSource(), a === "appendTo" && this.menu.element.appendTo(this.document.find(b || "body")[0]), a === "disabled" && b && this.xhr && this.xhr.abort()
        },_initSource: function() {
            var b = this, d, e;
            a.isArray(this.options.source) ? (d = this.options.source, this.source = function(b, c) {
                c(a.ui.autocomplete.filter(d, b.term))
            }) : typeof this.options.source == "string" ? (e = this.options.source, this.source = function(d, f) {
                b.xhr && b.xhr.abort(), b.xhr = a.ajax({url: e,data: d,dataType: "json",context: {autocompleteRequest: ++c},success: function(a, b) {
                        this.autocompleteRequest === c && f(a)
                    },error: function() {
                        this.autocompleteRequest === c && f([])
                    }})
            }) : this.source = this.options.source
        },_searchTimeout: function(a) {
            var b = this;
            clearTimeout(b.searching), b.searching = setTimeout(function() {
                b.term !== b._value() && (b.selectedItem = null, b.search(null, a))
            }, b.options.delay)
        },search: function(a, b) {
            a = a != null ? a : this._value(), this.term = this._value();
            if (a.length < this.options.minLength)
                return this.close(b);
            if (this._trigger("search", b) !== !1)
                return this._search(a)
        },_search: function(a) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: a}, this.response)
        },_response: function(a) {
            a && (a = this._normalize(a)), this._trigger("response", null, {content: a}), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close(), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
        },close: function(a) {
            this.cancelSearch = !0, this._close(a)
        },_close: function(a) {
            clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this._trigger("close", a))
        },_change: function(a) {
            this.previous !== this._value() && this._trigger("change", a, {item: this.selectedItem})
        },_normalize: function(b) {
            if (b.length && b[0].label && b[0].value)
                return b;
            return a.map(b, function(b) {
                if (typeof b == "string")
                    return {label: b,value: b};
                return a.extend({label: b.label || b.value,value: b.value || b.label}, b)
            })
        },_suggest: function(b) {
            var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(c, b), this.menu.blur(), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next(new a.Event("mouseover"))
        },_resizeMenu: function() {
            var a = this.menu.element;
            a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
        },_renderMenu: function(b, c) {
            var d = this;
            a.each(c, function(a, c) {
                d._renderItemData(b, c)
            })
        },_renderItemData: function(a, b) {
            return this._renderItem(a, b).data("ui-autocomplete-item", b)
        },_renderItem: function(b, c) {
            return a("<li></li>").append(a("<a></a>").text(c.label)).appendTo(b)
        },_move: function(a, b) {
            if (!this.menu.element.is(":visible"))
                this.search(null, b);
            else {
                if (this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a)) {
                    this._value(this.term), this.menu.blur();
                    return
                }
                this.menu[a](b)
            }
        },widget: function() {
            return this.menu.element
        },_value: function(a) {
            return this.valueMethod.apply(this.element, arguments)
        },_keyEvent: function(a, b) {
            if (!this.isMultiLine || this.menu.element.is(":visible"))
                this._move(a, b), b.preventDefault()
        }}), a.extend(a.ui.autocomplete, {escapeRegex: function(a) {
            return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },filter: function(b, c) {
            var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
            return a.grep(b, function(a) {
                return d.test(a.label || a.value || a)
            })
        }})
}(jQuery), function(a, b) {
    var c, d, e, f, g = "ui-button ui-widget ui-state-default ui-corner-all", h = "ui-state-hover ui-state-active ", i = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", j = function() {
        var b = a(this).find(":ui-button");
        setTimeout(function() {
            b.button("refresh")
        }, 1)
    }, k = function(b) {
        var c = b.name, d = b.form, e = a([]);
        c && (d ? e = a(d).find("[name='" + c + "']") : e = a("[name='" + c + "']", b.ownerDocument).filter(function() {
            return !this.form
        }));
        return e
    };
    a.widget("ui.button", {version: "@VERSION",defaultElement: "<button>",options: {disabled: null,text: !0,label: null,icons: {primary: null,secondary: null}},_create: function() {
            this.element.closest("form").unbind("reset.button").bind("reset.button", j), typeof this.options.disabled != "boolean" ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var b = this, h = this.options, i = this.type === "checkbox" || this.type === "radio", l = "ui-state-hover" + (i ? "" : " ui-state-active"), m = "ui-state-focus";
            h.label === null && (h.label = this.buttonElement.html()), this.buttonElement.addClass(g).attr("role", "button").bind("mouseenter.button", function() {
                h.disabled || (a(this).addClass("ui-state-hover"), this === c && a(this).addClass("ui-state-active"))
            }).bind("mouseleave.button", function() {
                h.disabled || a(this).removeClass(l)
            }).bind("click.button", function(a) {
                h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
            }), this.element.bind("focus.button", function() {
                b.buttonElement.addClass(m)
            }).bind("blur.button", function() {
                b.buttonElement.removeClass(m)
            }), i && (this.element.bind("change.button", function() {
                f || b.refresh()
            }), this.buttonElement.bind("mousedown.button", function(a) {
                h.disabled || (f = !1, d = a.pageX, e = a.pageY)
            }).bind("mouseup.button", function(a) {
                !h.disabled && (d !== a.pageX || e !== a.pageY) && (f = !0)
            })), this.type === "checkbox" ? this.buttonElement.bind("click.button", function() {
                if (h.disabled || f)
                    return !1;
                a(this).toggleClass("ui-state-active"), b.buttonElement.attr("aria-pressed", b.element[0].checked)
            }) : this.type === "radio" ? this.buttonElement.bind("click.button", function() {
                if (h.disabled || f)
                    return !1;
                a(this).addClass("ui-state-active"), b.buttonElement.attr("aria-pressed", "true");
                var c = b.element[0];
                k(c).not(c).map(function() {
                    return a(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown.button", function() {
                if (h.disabled)
                    return !1;
                a(this).addClass("ui-state-active"), c = this, b.document.one("mouseup", function() {
                    c = null
                })
            }).bind("mouseup.button", function() {
                if (h.disabled)
                    return !1;
                a(this).removeClass("ui-state-active")
            }).bind("keydown.button", function(b) {
                if (h.disabled)
                    return !1;
                (b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active")
            }).bind("keyup.button", function() {
                a(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
                b.keyCode === a.ui.keyCode.SPACE && a(this).click()
            })), this._setOption("disabled", h.disabled), this._resetButton()
        },_determineButtonType: function() {
            this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var a = this.element.parents().last(), b = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible");
                var c = this.element.is(":checked");
                c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", c)
            } else
                this.buttonElement = this.element
        },widget: function() {
            return this.buttonElement
        },_destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(g + " " + h + " " + i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },_setOption: function(a, b) {
            this._super(a, b);
            a === "disabled" ? b ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1) : this._resetButton()
        },refresh: function() {
            var b = this.element.is(":disabled");
            b !== this.options.disabled && this._setOption("disabled", b), this.type === "radio" ? k(this.element[0]).each(function() {
                a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },_resetButton: function() {
            if (this.type === "input")
                this.options.label && this.element.val(this.options.label);
            else {
                var b = this.buttonElement.removeClass(i), c = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(), d = this.options.icons, e = d.primary && d.secondary, f = [];
                d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", c))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
            }
        }}), a.ui.button.version = "@VERSION", a.widget("ui.buttonset", {options: {items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create: function() {
            this.element.addClass("ui-buttonset")
        },_init: function() {
            this.refresh()
        },_setOption: function(a, b) {
            a === "disabled" && this.buttons.button("option", a, b), this._super(a, b)
        },refresh: function() {
            var b = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
        },_destroy: function() {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }})
}(jQuery), function($, undefined) {
    function isArray(a) {
        return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
    }
    function extendRemove(a, b) {
        $.extend(a, b);
        for (var c in b)
            if (b[c] == null || b[c] == undefined)
                a[c] = b[c];
        return a
    }
    function bindHover(a) {
        var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return a.delegate(b, "mouseout", function() {
            $(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") != -1 && $(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") != -1 && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(b, "mouseover", function() {
            $.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") != -1 && $(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") != -1 && $(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {closeText: "Done",prevText: "Prev",nextText: "Next",currentText: "Today",monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],weekHeader: "Wk",dateFormat: "mm/dd/yy",firstDay: 0,isRTL: !1,showMonthAfterYear: !1,yearSuffix: ""}, this._defaults = {showOn: "focus",showAnim: "fadeIn",showOptions: {},defaultDate: null,appendText: "",buttonText: "...",buttonImage: "",buttonImageOnly: !1,hideIfNoPrevNext: !1,navigationAsDateFormat: !1,gotoCurrent: !1,changeMonth: !1,changeYear: !1,yearRange: "c-10:c+10",showOtherMonths: !1,selectOtherMonths: !1,showWeek: !1,calculateWeek: this.iso8601Week,shortYearCutoff: "+10",minDate: null,maxDate: null,duration: "fast",beforeShowDay: null,beforeShow: null,onSelect: null,onChangeMonthYear: null,onClose: null,numberOfMonths: 1,showCurrentAtPos: 0,stepMonths: 1,stepBigMonths: 12,altField: "",altFormat: "",constrainInput: !0,showButtonPanel: !1,autoSize: !1,disabled: !1}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    $.extend($.ui, {datepicker: {version: "@VERSION"}});
    var PROP_NAME = "datepicker", dpuuid = (new Date).getTime(), instActive;
    $.extend(Datepicker.prototype, {markerClassName: "hasDatepicker",maxRows: 4,log: function() {
            this.debug && console.log.apply("", arguments)
        },_widgetDatepicker: function() {
            return this.dpDiv
        },setDefaults: function(a) {
            extendRemove(this._defaults, a || {});
            return this
        },_attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(), inline = nodeName == "div" || nodeName == "span";
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },_newInst: function(a, b) {
            var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {id: c,input: a,selectedDay: 0,selectedMonth: 0,selectedYear: 0,drawMonth: 0,drawYear: 0,inline: b,dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv}
        },_connectDatepicker: function(a, b) {
            var c = $(a);
            b.append = $([]), b.trigger = $([]);
            c.hasClass(this.markerClassName) || (this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function(a, c) {
                return this._get(b, c)
            }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a))
        },_attachments: function(a, b) {
            var c = this._get(b, "appendText"), d = this._get(b, "isRTL");
            b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
            var e = this._get(b, "showOn");
            (e == "focus" || e == "both") && a.focus(this._showDatepicker);
            if (e == "button" || e == "both") {
                var f = this._get(b, "buttonText"), g = this._get(b, "buttonImage");
                b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({src: g,alt: f,title: f}) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({src: g,alt: f,title: f}))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function() {
                    $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]);
                    return !1
                })
            }
        },_autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b = new Date(2009, 11, 20), c = this._get(a, "dateFormat");
                if (c.match(/[DM]/)) {
                    var d = function(a) {
                        var b = 0, c = 0;
                        for (var d = 0; d < a.length; d++)
                            a[d].length > b && (b = a[d].length, c = d);
                        return c
                    };
                    b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort"
                    )) + 20 - b.getDay())
                }
                a.input.attr("size", this._formatDate(a, b).length)
            }
        },_inlineDatepicker: function(a, b) {
            var c = $(a);
            c.hasClass(this.markerClassName) || (c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function(a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function(a, c) {
                return this._get(b, c)
            }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block"))
        },_dialogDatepicker: function(a, b, c, d, e) {
            var f = this._dialogInst;
            if (!f) {
                this.uuid += 1;
                var g = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
            }
            extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null;
            if (!this._pos) {
                var h = document.documentElement.clientWidth, i = document.documentElement.clientHeight, j = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
            }
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f);
            return this
        },_destroyDatepicker: function(a) {
            var b = $(a), c = $.data(a, PROP_NAME);
            if (!!b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                $.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty()
            }
        },_enableDatepicker: function(a) {
            var b = $(a), c = $.data(a, PROP_NAME);
            if (!!b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if (d == "input")
                    a.disabled = !1, c.trigger.filter("button").each(function() {
                        this.disabled = !1
                    }).end().filter("img").css({opacity: "1.0",cursor: ""});
                else if (d == "div" || d == "span") {
                    var e = b.children("." + this._inlineClass);
                    e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)
                }
                this._disabledInputs = $.map(this._disabledInputs, function(b) {
                    return b == a ? null : b
                })
            }
        },_disableDatepicker: function(a) {
            var b = $(a), c = $.data(a, PROP_NAME);
            if (!!b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if (d == "input")
                    a.disabled = !0, c.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({opacity: "0.5",cursor: "default"});
                else if (d == "div" || d == "span") {
                    var e = b.children("." + this._inlineClass);
                    e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)
                }
                this._disabledInputs = $.map(this._disabledInputs, function(b) {
                    return b == a ? null : b
                }), this._disabledInputs[this._disabledInputs.length] = a
            }
        },_isDisabledDatepicker: function(a) {
            if (!a)
                return !1;
            for (var b = 0; b < this._disabledInputs.length; b++)
                if (this._disabledInputs[b] == a)
                    return !0;
            return !1
        },_getInst: function(a) {
            try {
                return $.data(a, PROP_NAME)
            } catch (b) {
                throw "Missing instance data for this datepicker"
            }
        },_optionDatepicker: function(a, b, c) {
            var d = this._getInst(a);
            if (arguments.length == 2 && typeof b == "string")
                return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null;
            var e = b || {};
            typeof b == "string" && (e = {}, e[b] = c);
            if (d) {
                this._curInst == d && this._hideDatepicker();
                var f = this._getDateDatepicker(a, !0), g = this._getMinMaxDate(d, "min"), h = this._getMinMaxDate(d, "max");
                extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
            }
        },_changeDatepicker: function(a, b, c) {
            this._optionDatepicker(a, b, c)
        },_refreshDatepicker: function(a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b)
        },_setDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
        },_getDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && !c.inline && this._setDateFromField(c, b);
            return c ? this._getDate(c) : null
        },_doKeyDown: function(a) {
            var b = $.datepicker._getInst(a.target), c = !0, d = b.dpDiv.is(".ui-datepicker-rtl");
            b._keyEvent = !0;
            if ($.datepicker._datepickerShowing)
                switch (a.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), c = !1;
                        break;
                    case 13:
                        var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
                        e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
                        var f = $.datepicker._get(b, "onSelect");
                        if (f) {
                            var g = $.datepicker._formatDate(b);
                            f.apply(b.input ? b.input[0] : null, [g, b])
                        } else
                            $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 35:
                        (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
                        break;
                    case 36:
                        (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
                        break;
                    case 37:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 38:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
                        break;
                    case 39:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 40:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
                        break;
                    default:
                        c = !1
                }
            else
                a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
            c && (a.preventDefault(), a.stopPropagation())
        },_doKeyPress: function(a) {
            var b = $.datepicker._getInst(a.target);
            if ($.datepicker._get(b, "constrainInput")) {
                var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")), d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
                return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1
            }
        },_doKeyUp: function(a) {
            var b = $.datepicker._getInst(a.target);
            if (b.input.val() != b.lastVal)
                try {
                    var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
                    c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
                } catch (d) {
                    $.datepicker.log(d)
                }
            return !0
        },_showDatepicker: function(a) {
            a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
            if (!$.datepicker._isDisabledDatepicker(a) && $.datepicker._lastInput != a) {
                var b = $.datepicker._getInst(a);
                $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var c = $.datepicker._get(b, "beforeShow"), d = c ? c.apply(a, [a, b]) : {};
                if (d === !1)
                    return;
                extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
                var e = !1;
                $(a).parents().each(function() {
                    e |= $(this).css("position") == "fixed";
                    return !e
                }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                var f = {left: $.datepicker._pos[0],top: $.datepicker._pos[1]};
                $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({position: "absolute",display: "block",top: "-1000px"}), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute",display: "none",left: f.left + "px",top: f.top + "px"});
                if (!b.inline) {
                    var g = $.datepicker._get(b, "showAnim"), h = $.datepicker._get(b, "duration"), i = function() {
                        var a = b.dpDiv.find("iframe.ui-datepicker-cover");
                        if (!!a.length) {
                            var c = $.datepicker._getBorders(b.dpDiv);
                            a.css({left: -c[0],top: -c[1],width: b.dpDiv.outerWidth(),height: b.dpDiv.outerHeight()})
                        }
                    };
                    b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && ($.effects.effect[g] || $.effects[g]) ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
                }
            }
        },_updateDatepicker: function(a) {
            this.maxRows = 4;
            var b = $.datepicker._getBorders(a.dpDiv);
            instActive = a, a.dpDiv.empty().append(this._generateHTML(a));
            var c = a.dpDiv.find("iframe.ui-datepicker-cover");
            !c.length || c.css({left: -b[0],top: -b[1],width: a.dpDiv.outerWidth(),height: a.dpDiv.outerHeight()}), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var d = this._getNumberOfMonths(a), e = d[1], f = 17;
            a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", f * e + "em"), a.dpDiv[(d[0] != 1 || d[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
            if (a.yearshtml) {
                var g = a.yearshtml;
                setTimeout(function() {
                    g === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), g = a.yearshtml = null
                }, 0)
            }
        },_getBorders: function(a) {
            var b = function(a) {
                return {thin: 1,medium: 2,thick: 3}[a] || a
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },_checkOffset: function(a, b, c) {
            var d = a.dpDiv.outerWidth(), e = a.dpDiv.outerHeight(), f = a.input ? a.input.outerWidth() : 0, g = a.input ? a.input.outerHeight() : 0, h = document.documentElement.clientWidth + $(document).scrollLeft(), i = document.documentElement.clientHeight + $(document).scrollTop();
            b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0);
            return b
        },_findPos: function(a) {
            var b = this._getInst(a), c = this._get(b, "isRTL");
            while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a)))
                a = a[c ? "previousSibling" : "nextSibling"];
            var d = $(a).offset();
            return [d.left, d.top]
        },_hideDatepicker: function(a) {
            var b = this._curInst;
            if (!(!b || a && b != $.data(a, PROP_NAME)) && this._datepickerShowing) {
                var c = this._get(b, "showAnim"), d = this._get(b, "duration"), e = this, f = function() {
                    $.datepicker._tidyDialog(b), e._curInst = null
                };
                $.effects && ($.effects.effect[c] || $.effects[c]) ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, f) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, f), c || f(), this._datepickerShowing = !1;
                var g = this._get(b, "onClose");
                g && g.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({position: "absolute",left: "0",top: "-100px"}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
            }
        },_tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },_checkExternalClick: function(a) {
            if (!!$.datepicker._curInst) {
                var b = $(a.target), c = $.datepicker._getInst(b[0]);
                (b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
            }
        },_adjustDate: function(a, b, c) {
            var d = $(a), e = this._getInst(d[0]);
            this._isDisabledDatepicker(d[0]) || (this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e))
        },_gotoToday: function(a) {
            var b = $(a), c = this._getInst(b[0]);
            if (this._get(c, "gotoCurrent") && c.currentDay)
                c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
            else {
                var d = new Date;
                c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
            }
            this._notifyChange(c), this._adjustDate(b)
        },_selectMonthYear: function(a, b, c) {
            var d = $(a), e = this._getInst(d[0]);
            e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
        },_selectDay: function(a, b, c, d) {
            var e = $(a);
            if (!$(d).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(e[0])) {
                var f = this._getInst(e[0]);
                f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
            }
        },_clearDate: function(a) {
            var b = $(a), c = this._getInst(b[0]);
            this._selectDate(b, "")
        },_selectDate: function(a, b) {
            var c = $(a), d = this._getInst(c[0]);
            b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
            var e = this._get(d, "onSelect");
            e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null)
        },_updateAlternate: function(a) {
            var b = this._get(a, "altField");
            if (b) {
                var c = this._get(a, "altFormat") || this._get(a, "dateFormat"), d = this._getDate(a), e = this.formatDate(c, d, this._getFormatConfig(a));
                $(b).each(function() {
                    $(this).val(e)
                })
            }
        },noWeekends: function(a) {
            var b = a.getDay();
            return [b > 0 && b < 6, ""]
        },iso8601Week: function(a) {
            var b = new Date(a.getTime());
            b.setDate(b.getDate() + 4 - (b.getDay() || 7));
            var c = b.getTime();
            b.setMonth(0), b.setDate(1);
            return Math.floor(Math.round((c - b) / 864e5) / 7) + 1
        },parseDate: function(a, b, c) {
            if (a == null || b == null)
                throw "Invalid arguments";
            b = typeof b == "object" ? b.toString() : b + "";
            if (b == "")
                return null;
            var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
            var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function(b) {
                var c = s + 1 < a.length && a.charAt(s + 1) == b;
                c && s++;
                return c
            }, o = function(a) {
                var c = n(a), d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2, e = new RegExp("^\\d{1," + d + "}"), f = b.substring(r).match(e);
                if (!f)
                    throw "Missing number at position " + r;
                r += f[0].length;
                return parseInt(f[0], 10)
            }, p = function(a, c, d) {
                var e = $.map(n(a) ? d : c, function(a, b) {
                    return [[b, a]]
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length)
                }), f = -1;
                $.each(e, function(a, c) {
                    var d = c[1];
                    if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) {
                        f = c[0], r += d.length;
                        return !1
                    }
                });
                if (f != -1)
                    return f + 1;
                throw "Unknown name at position " + r
            }, q = function() {
                if (b.charAt(r) != a.charAt(s))
                    throw "Unexpected literal at position " + r;
                r++
            }, r = 0;
            for (var s = 0; s < a.length; s++)
                if (m)
                    a.charAt(s) == "'" && !n("'") ? m = !1 : q();
                else
                    switch (a.charAt(s)) {
                        case "d":
                            k = o("d");
                            break;
                        case "D":
                            p("D", e, f);
                            break;
                        case "o":
                            l = o("o");
                            break;
                        case "m":
                            j = o("m");
                            break;
                        case "M":
                            j = p("M", g, h);
                            break;
                        case "y":
                            i = o("y");
                            break;
                        case "@":
                            var t = new Date(o("@"));
                            i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                            break;
                        case "!":
                            var t = new Date((o("!") - this._ticksTo1970) / 1e4);
                            i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                            break;
                        case "'":
                            n("'") ? q() : m = !0;
                            break;
                        default:
                            q()
                    }
            if (r < b.length) {
                var u = b.substr(r);
                if (!/^\s+/.test(u))
                    throw "Extra/unparsed characters found in date: " + u
            }
            i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
            if (l > -1) {
                j = 1, k = l;
                for (; ; ) {
                    var v = this._getDaysInMonth(i, j - 1);
                    if (k <= v)
                        break;
                    j++, k -= v
                }
            }
            var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
            if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k)
                throw "Invalid date";
            return t
        },ATOM: "yy-mm-dd",COOKIE: "D, dd M yy",ISO_8601: "yy-mm-dd",RFC_822: "D, d M y",RFC_850: "DD, dd-M-y",RFC_1036: "D, d M y",RFC_1123: "D, d M yy",RFC_2822: "D, d M yy",RSS: "D, d M y",TICKS: "!",TIMESTAMP: "@",W3C: "yy-mm-dd",_ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,formatDate: function(a, b, c) {
            if (!b)
                return "";
            var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, e = (c ? c.dayNames : null) || this._defaults.dayNames, f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, h = function(b) {
                var c = m + 1 < a.length && a.charAt(m + 1) == b;
                c && m++;
                return c
            }, i = function(a, b, c) {
                var d = "" + b;
                if (h(a))
                    while (d.length < c)
                        d = "0" + d;
                return d
            }, j = function(a, b, c, d) {
                return h(a) ? d[b] : c[b]
            }, k = "", l = !1;
            if (b)
                for (var m = 0; m < a.length; m++)
                    if (l)
                        a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m);
                    else
                        switch (a.charAt(m)) {
                            case "d":
                                k += i("d", b.getDate(), 2);
                                break;
                            case "D":
                                k += j("D", b.getDay(), d, e);
                                break;
                            case "o":
                                k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                k += i("m", b.getMonth() + 1, 2);
                                break;
                            case "M":
                                k += j("M", b.getMonth(), f, g);
                                break;
                            case "y":
                                k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                                break;
                            case "@":
                                k += b.getTime();
                                break;
                            case "!":
                                k += b.getTime() * 1e4 + this._ticksTo1970;
                                break;
                            case "'":
                                h("'") ? k += "'" : l = !0;
                                break;
                            default:
                                k += a.charAt(m)
                        }
            return k
        },_possibleChars: function(a) {
            var b = "", c = !1, d = function(b) {
                var c = e + 1 < a.length && a.charAt(e + 1) == b;
                c && e++;
                return c
            };
            for (var e = 0; e < a.length; e++)
                if (c)
                    a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e);
                else
                    switch (a.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            b += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            d("'") ? b += "'" : c = !0;
                            break;
                        default:
                            b += a.charAt(e)
                    }
            return b
        },_get: function(a, b) {
            return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
        },_setDateFromField: function(a, b) {
            if (a.input.val() != a.lastVal) {
                var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e, f;
                e = f = this._getDefaultDate(a);
                var g = this._getFormatConfig(a);
                try {
                    e = this.parseDate(c, d, g) || f
                } catch (h) {
                    this.log(h), d = b ? "" : d
                }
                a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a)
            }
        },_getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },_determineDate: function(a, b, c) {
            var d = function(a) {
                var b = new Date;
                b.setDate(b.getDate() + a);
                return b
            }, e = function(b) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
                } catch (c) {
                }
                var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b);
                while (i) {
                    switch (i[2] || "d") {
                        case "d":
                        case "D":
                            g += parseInt(i[1], 10);
                            break;
                        case "w":
                        case "W":
                            g += parseInt(i[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
                            break;
                        case "y":
                        case "Y":
                            e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
                    }
                    i = h.exec(b)
                }
                return new Date(e, f, g)
            }, f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
            f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0));
            return this._daylightSavingAdjust(f)
        },_daylightSavingAdjust: function(a) {
            if (!a)
                return null;
            a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
            return a
        },_setDate: function(a, b, c) {
            var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
        },_getDate: function(a) {
            var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return b
        },_generateHTML: function(a) {
            var b = new Date;
            b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
            var c = this._get(a, "isRTL"), d = this._get(a, "showButtonPanel"), e = this._get(a, "hideIfNoPrevNext"), f = this._get(a, "navigationAsDateFormat"), g = this._getNumberOfMonths(a), h = this._get(a, "showCurrentAtPos"), i = this._get(a, "stepMonths"), j = g[0] != 1 || g[1] != 1, k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), l = this._getMinMaxDate(a, "min"), m = this._getMinMaxDate(a, "max"), n = a.drawMonth - h, o = a.drawYear;
            n < 0 && (n += 12, o--);
            if (m) {
                var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
                p = l && p < l ? l : p;
                while (this._daylightSavingAdjust(new Date(o, n, 1)) > p)
                    n--, n < 0 && (n = 11, o--)
            }
            a.drawMonth = n, a.drawYear = o;
            var q = this._get(a, "prevText");
            q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
            var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', -" + i + ", 'M');\"" + ' title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>", s = this._get(a, "nextText");
            s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
            var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', +" + i + ", 'M');\"" + ' title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>", u = this._get(a, "currentText"), v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
            u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
            var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>", x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + a.id + "');\"" + ">" + u + "</button>" : "") + (c ? "" : w) + "</div>" : "", y = parseInt(this._get(a, "firstDay"), 10);
            y = isNaN(y) ? 0 : y;
            var z = this._get(a, "showWeek"), A = this._get(a, "dayNames"), B = this._get(a, "dayNamesShort"), C = this._get(a, "dayNamesMin"), D = this._get(a, "monthNames"), E = this._get(a, "monthNamesShort"), F = this._get(a, "beforeShowDay"), G = this._get(a, "showOtherMonths"), H = this._get(a, "selectOtherMonths"), I = this._get(a, "calculateWeek") || this.iso8601Week, J = this._getDefaultDate(a), K = "";
            for (var L = 0; L < g[0]; L++) {
                var M = "";
                this.maxRows = 4;
                for (var N = 0; N < g[1]; N++) {
                    var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)), P = " ui-corner-all", Q = "";
                    if (j) {
                        Q += '<div class="ui-datepicker-group';
                        if (g[1] > 1)
                            switch (N) {
                                case 0:
                                    Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
                                    break;
                                case g[1] - 1:
                                    Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
                                    break;
                                default:
                                    Q += " ui-datepicker-group-middle", P = ""
                            }
                        Q += '">'
                    }
                    Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                    var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
                    for (var S = 0; S < 7; S++) {
                        var T = (S + y) % 7;
                        R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>"
                    }
                    Q += R + "</tr></thead><tbody>";
                    var U = this._getDaysInMonth(o, n);
                    o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
                    var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7, W = Math.ceil((V + U) / 7), X = j ? this.maxRows > W ? this.maxRows : W : W;
                    this.maxRows = X;
                    var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
                    for (var Z = 0; Z < X; Z++) {
                        Q += "<tr>";
                        var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
                        for (var S = 0; S < 7; S++) {
                            var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""], bb = Y.getMonth() != n, bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
                            _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + a.id + "'," + Y.getMonth() + "," + Y.getFullYear() + ', this);return false;"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y)
                        }
                        Q += _ + "</tr>"
                    }
                    n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q
                }
                K += M
            }
            K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1;
            return K
        },_generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
            var i = this._get(a, "changeMonth"), j = this._get(a, "changeYear"), k = this._get(a, "showMonthAfterYear"), l = '<div class="ui-datepicker-title">', m = "";
            if (f || !i)
                m += '<span class="ui-datepicker-month">' + g[b] + "</span>";
            else {
                var n = d && d.getFullYear() == c, o = e && e.getFullYear() == c;
                m += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" " + ">";
                for (var p = 0; p < 12; p++)
                    (!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
                m += "</select>"
            }
            k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
            if (!a.yearshtml) {
                a.yearshtml = "";
                if (f || !j)
                    l += '<span class="ui-datepicker-year">' + c + "</span>";
                else {
                    var q = this._get(a, "yearRange").split(":"), r = (new Date).getFullYear(), s = function(a) {
                        var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
                        return isNaN(b) ? r : b
                    }, t = s(q[0]), u = Math.max(t, s(q[1] || ""));
                    t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" " + ">";
                    for (; t <= u; t++)
                        a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
                    a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
                }
            }
            l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>";
            return l
        },_adjustInstDate: function(a, b, c) {
            var d = a.drawYear + (c == "Y" ? b : 0), e = a.drawMonth + (c == "M" ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
            a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a)
        },_restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && b < c ? c : b;
            e = d && e > d ? d : e;
            return e
        },_notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },_getNumberOfMonths: function(a) {
            var b = this._get(a, "numberOfMonths");
            return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
        },_getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },_getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },_getFirstDayOfMonth: function(a, b) {
            return (new Date(a, b, 1)).getDay()
        },_canAdjustMonth: function(a, b, c, d) {
            var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
            b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth()));
            return this._isInRange(a, f)
        },_isInRange: function(a, b) {
            var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max");
            return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
        },_getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10);
            return {shortYearCutoff: b,dayNamesShort: this._get(a, "dayNamesShort"),dayNames: this._get(a, "dayNames"),monthNamesShort: this._get(a, "monthNamesShort"),monthNames: this._get(a, "monthNames")}
        },_formatDate: function(a, b, c, d) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
        }}), $.fn.datepicker = function(a) {
        if (!this.length)
            return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var b = Array.prototype.slice.call(arguments, 1);
        if (typeof a == "string" && (a == "isDisabled" || a == "getDate" || a == "widget"))
            return $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b));
        if (a == "option" && arguments.length == 2 && typeof arguments[1] == "string")
            return $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b));
        return this.each(function() {
            typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
        })
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "@VERSION", window["DP_jQuery_" + dpuuid] = $
}(jQuery), function(a, b) {
    var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ", d = {buttons: !0,height: !0,maxHeight: !0,maxWidth: !0,minHeight: !0,minWidth: !0,width: !0}, e = {maxHeight: !0,maxWidth: !0,minHeight: !0,minWidth: !0};
    a.widget("ui.dialog", {version: "@VERSION",options: {autoOpen: !0,buttons: {},closeOnEscape: !0,closeText: "close",dialogClass: "",draggable: !0,hide: null,height: "auto",maxHeight: !1,maxWidth: !1,minHeight: 150,minWidth: 150,modal: !1,position: {my: "center",at: "center",of: window,collision: "fit",using: function(b) {
                    var c = a(this).css(b).offset().top;
                    c < 0 && a(this).css("top", b.top - c)
                }},resizable: !0,show: null,stack: !0,title: "",width: 300,zIndex: 1e3},_create: function() {
            this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.oldPosition = {parent: this.element.parent(),index: this.element.parent().children().index(this.element)}, this.options.title = this.options.title || this.originalTitle;
            var b = this, d = b.options, e = d.title || "&#160;", f = a.ui.dialog.getTitleId(b.element), g = (b.uiDialog = a("<div>")).addClass(c + d.dialogClass).css({display: "none",outline: 0,zIndex: d.zIndex}).attr("tabIndex", -1).keydown(function(c) {
                d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
            }).attr({role: "dialog","aria-labelledby": f}).mousedown(function(a) {
                b.moveToTop(!1, a)
            }).appendTo("body"), h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g), i = (b.uiDialogTitlebar = a("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").prependTo(g), j = a("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role", "button").click(function(a) {
                a.preventDefault(), b.close(a)
            }).appendTo(i), k = (b.uiDialogTitlebarCloseText = a("<span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j), l = a("<span>").addClass("ui-dialog-title"
            ).attr("id", f).html(e).prependTo(i);
            i.find("*").add(i).disableSelection(), this._hoverable(j), this._focusable(j), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe()
        },_init: function() {
            this.options.autoOpen && this.open()
        },_destroy: function() {
            var a = this, b, c = this.oldPosition;
            a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), a.uiDialog.remove(), a.originalTitle && a.element.attr("title", a.originalTitle), b = c.parent.children().eq(c.index), b.length ? b.before(a.element) : c.parent.append(a.element)
        },widget: function() {
            return this.uiDialog
        },close: function(b) {
            if (!this._isOpen)
                return c;
            var c = this, d, e;
            if (!1 !== c._trigger("beforeClose", b)) {
                c._isOpen = !1, c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c.options.hide ? c.uiDialog.hide(c.options.hide, function() {
                    c._trigger("close", b)
                }) : (c.uiDialog.hide(), c._trigger("close", b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a(".ui-dialog").each(function() {
                    this !== c.uiDialog[0] && (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e)))
                }), a.ui.dialog.maxZ = d);
                return c
            }
        },isOpen: function() {
            return this._isOpen
        },moveToTop: function(b, c) {
            var d = this, e = d.options, f;
            if (e.modal && !b || !e.stack && !e.modal)
                return d._trigger("focus", c);
            e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ)), f = {scrollTop: d.element.scrollTop(),scrollLeft: d.element.scrollLeft()}, a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index", a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c);
            return d
        },open: function() {
            if (!this._isOpen) {
                var b = this, c = b.options, d = b.uiDialog;
                b._size(), b._position(c.position), d.show(c.show), b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b.moveToTop(!0), c.modal && d.bind("keydown.ui-dialog", function(b) {
                    if (b.keyCode === a.ui.keyCode.TAB) {
                        var c = a(":tabbable", this), d = c.filter(":first"), e = c.filter(":last");
                        if (b.target === e[0] && !b.shiftKey) {
                            d.focus(1);
                            return !1
                        }
                        if (b.target === d[0] && b.shiftKey) {
                            e.focus(1);
                            return !1
                        }
                    }
                });
                var e = b.element.find(":tabbable");
                e.length || (e = d.find(".ui-dialog-buttonpane :tabbable"), e.length || (e = d)), e.eq(0).focus(), b._isOpen = !0, b._trigger("open");
                return b
            }
        },_createButtons: function(b) {
            var c = this, d = !1;
            c.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof b == "object" && b !== null && a.each(b, function() {
                return !(d = !0)
            });
            if (d) {
                var e = a("<div>").addClass("ui-dialog-buttonpane  ui-widget-content ui-helper-clearfix"), f = a("<div>").addClass("ui-dialog-buttonset").appendTo(e);
                a.each(b, function(b, d) {
                    d = a.isFunction(d) ? {click: d,text: b} : d;
                    var e = a("<button type='button'>").attr(d, !0).unbind("click").click(function() {
                        d.click.apply(c.element[0], arguments)
                    }).appendTo(f);
                    a.fn.button && e.button()
                }), c.uiDialog.addClass("ui-dialog-buttons"), e.appendTo(c.uiDialog)
            } else
                c.uiDialog.removeClass("ui-dialog-buttons")
        },_makeDraggable: function() {
            function d(a) {
                return {position: a.position,offset: a.offset}
            }
            var b = this, c = b.options;
            b.uiDialog.draggable({cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",handle: ".ui-dialog-titlebar",containment: "document",start: function(c, e) {
                    a(this).addClass("ui-dialog-dragging"), b._trigger("dragStart", c, d(e))
                },drag: function(a, c) {
                    b._trigger("drag", a, d(c))
                },stop: function(e, f) {
                    c.position = [f.position.left - b.document.scrollLeft(), f.position.top - b.document.scrollTop()], a(this).removeClass("ui-dialog-dragging"), b._trigger("dragStop", e, d(f)), a.ui.dialog.overlay.resize()
                }})
        },_makeResizable: function(c) {
            function h(a) {
                return {originalPosition: a.originalPosition,originalSize: a.originalSize,position: a.position,size: a.size}
            }
            c = c === b ? this.options.resizable : c;
            var d = this, e = d.options, f = d.uiDialog.css("position"), g = typeof c == "string" ? c : "n,e,s,w,se,sw,ne,nw";
            d.uiDialog.resizable({cancel: ".ui-dialog-content",containment: "document",alsoResize: d.element,maxWidth: e.maxWidth,maxHeight: e.maxHeight,minWidth: e.minWidth,minHeight: d._minHeight(),handles: g,start: function(b, c) {
                    a(this).addClass("ui-dialog-resizing"), d._trigger("resizeStart", b, h(c))
                },resize: function(a, b) {
                    d._trigger("resize", a, h(b))
                },stop: function(b, c) {
                    a(this).removeClass("ui-dialog-resizing"), e.height = a(this).height(), e.width = a(this).width(), d._trigger("resizeStop", b, h(c)), a.ui.dialog.overlay.resize()
                }}).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },_minHeight: function() {
            var a = this.options;
            return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
        },_position: function(b) {
            var c = [], d = [0, 0], e;
            if (b) {
                if (typeof b == "string" || typeof b == "object" && "0" in b)
                    c = b.split ? b.split(" ") : [b[0], b[1]], c.length === 1 && (c[1] = c[0]), a.each(["left", "top"], function(a, b) {
                        +c[a] === c[a] && (d[a] = c[a], c[a] = b)
                    }), b = {my: c.join(" "),at: c.join(" "),offset: d.join(" ")};
                b = a.extend({}, a.ui.dialog.prototype.options.position, b)
            } else
                b = a.ui.dialog.prototype.options.position;
            e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(b), e || this.uiDialog.hide()
        },_setOptions: function(b) {
            var c = this, f = {}, g = !1;
            a.each(b, function(a, b) {
                c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b)
            }), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
        },_setOption: function(b, d) {
            var e = this, f = e.uiDialog;
            switch (b) {
                case "buttons":
                    e._createButtons(d);
                    break;
                case "closeText":
                    e.uiDialogTitlebarCloseText.text("" + d);
                    break;
                case "dialogClass":
                    f.removeClass(e.options.dialogClass).addClass(c + d);
                    break;
                case "disabled":
                    d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
                    break;
                case "draggable":
                    var g = f.is(":data(draggable)");
                    g && !d && f.draggable("destroy"), !g && d && e._makeDraggable();
                    break;
                case "position":
                    e._position(d);
                    break;
                case "resizable":
                    var h = f.is(":data(resizable)");
                    h && !d && f.resizable("destroy"), h && typeof d == "string" && f.resizable("option", "handles", d), !h && d !== !1 && e._makeResizable(d);
                    break;
                case "title":
                    a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;"))
            }
            this._super(b, d)
        },_size: function() {
            var b = this.options, c, d, e = this.uiDialog.is(":visible");
            this.element.show().css({width: "auto",minHeight: 0,height: 0}), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({height: "auto",width: b.width}).outerHeight(), d = Math.max(0, b.minHeight - c);
            if (b.height === "auto")
                if (a.support.minHeight)
                    this.element.css({minHeight: d,height: "auto"});
                else {
                    this.uiDialog.show();
                    var f = this.element.css("height", "auto").height();
                    e || this.uiDialog.hide(), this.element.height(Math.max(f, d))
                }
            else
                this.element.height(Math.max(b.height - c, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }}), a.extend(a.ui.dialog, {uuid: 0,maxZ: 0,getTitleId: function(a) {
            var b = a.attr("id");
            b || (this.uuid += 1, b = this.uuid);
            return "ui-dialog-title-" + b
        },overlay: function(b) {
            this.$el = a.ui.dialog.overlay.create(b)
        }}), a.extend(a.ui.dialog.overlay, {instances: [],oldInstances: [],maxZ: 0,events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(a) {
            return a + ".dialog-overlay"
        }).join(" "),create: function(b) {
            this.instances.length === 0 && (setTimeout(function() {
                a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function(b) {
                    if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ)
                        return !1
                })
            }, 1), a(document).bind("keydown.dialog-overlay", function(c) {
                b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
            }), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
            var c = this.oldInstances.pop() || a("<div>").addClass("ui-widget-overlay");
            c.appendTo(document.body).css({width: this.width(),height: this.height()}), a.fn.bgiframe && c.bgiframe(), this.instances.push(c);
            return c
        },destroy: function(b) {
            var c = a.inArray(b, this.instances);
            c !== -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"), b.height(0).width(0).remove();
            var d = 0;
            a.each(this.instances, function() {
                d = Math.max(d, this.css("z-index"))
            }), this.maxZ = d
        },height: function() {
            var b, c;
            if (a.browser.msie) {
                b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return b < c ? a(window).height() + "px" : b + "px"
            }
            return a(document).height() + "px"
        },width: function() {
            var b, c;
            if (a.browser.msie) {
                b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return b < c ? a(window).width() + "px" : b + "px"
            }
            return a(document).width() + "px"
        },resize: function() {
            var b = a([]);
            a.each(a.ui.dialog.overlay.instances, function() {
                b = b.add(this)
            }), b.css({width: 0,height: 0}).css({width: a.ui.dialog.overlay.width(),height: a.ui.dialog.overlay.height()})
        }}), a.extend(a.ui.dialog.overlay.prototype, {destroy: function() {
            a.ui.dialog.overlay.destroy(this.$el)
        }})
}(jQuery), function(a) {
    var b = 0;
    a.widget("ui.menu", {version: "@VERSION",defaultElement: "<ul>",delay: 300,options: {menus: "ul",position: {my: "left top",at: "right top"},blur: null,focus: null,select: null},_create: function() {
            this.activeMenu = this.element, this.menuId = this.element.attr("id") || "ui-menu-" + b++, this.element.find(".ui-icon").length && this.element.addClass("ui-menu-icons"), this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({id: this.menuId,role: "menu"}).bind("click.menu", a.proxy(function(a) {
                this.options.disabled && a.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled"), this._bind({"mousedown .ui-menu-item > a": function(a) {
                    a.preventDefault()
                },"click .ui-menu-item:has(a)": function(b) {
                    b.stopImmediatePropagation(), a(b.target).closest(".ui-menu-item").is(".ui-state-disabled") || (this.select(b), this._delay(function() {
                        this.element.is(":focus") || this.element.focus()
                    }, 20))
                },"mouseover .ui-menu-item": function(b) {
                    b.stopImmediatePropagation();
                    var c = a(b.currentTarget);
                    c.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c)
                },mouseleave: "collapseAll","mouseleave .ui-menu": "collapseAll",focus: function(b) {
                    var c = this.element.children(".ui-menu-item").not(".ui-state-disabled").eq(0);
                    if (this._hasScroll() && !this.active) {
                        var d = this.element;
                        d.children().each(function() {
                            var b = a(this);
                            if (b.offset().top - d.offset().top >= 0) {
                                c = b;
                                return !1
                            }
                        })
                    } else
                        this.active && (c = this.active);
                    this.focus(b, c)
                },blur: function(b) {
                    this._delay(function() {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                    }, 0)
                }}), this.refresh(), this.element.attr("tabIndex", 0), this._bind({keydown: function(b) {
                    switch (b.keyCode) {
                        case a.ui.keyCode.PAGE_UP:
                            this.previousPage(b), b.preventDefault(), b.stopImmediatePropagation();
                            break;
                        case a.ui.keyCode.PAGE_DOWN:
                            this.nextPage(b), b.preventDefault(), b.stopImmediatePropagation();
                            break;
                        case a.ui.keyCode.HOME:
                            this._move("first", "first", b), b.preventDefault(), b.stopImmediatePropagation();
                            break;
                        case a.ui.keyCode.END:
                            this._move("last", "last", b), b.preventDefault(), b.stopImmediatePropagation();
                            break;
                        case a.ui.keyCode.UP:
                            this.previous(b), b.preventDefault(), b.stopImmediatePropagation();
                            break;
                        case a.ui.keyCode.DOWN:
                            this.next(b), b.preventDefault(), b.stopImmediatePropagation();
                            break;
                        case a.ui.keyCode.LEFT:
                            this.collapse(b) && b.stopImmediatePropagation(), b.preventDefault();
                            break;
                        case a.ui.keyCode.RIGHT:
                            this.expand(b) && b.stopImmediatePropagation(), b.preventDefault();
                            break;
                        case a.ui.keyCode.ENTER:
                            this.active.children("a[aria-haspopup='true']").length ? this.expand(b) && b.stopImmediatePropagation() : (this.select(b), b.stopImmediatePropagation()), b.preventDefault();
                            break;
                        case a.ui.keyCode.ESCAPE:
                            this.collapse(b) && b.stopImmediatePropagation(), b.preventDefault();
                            break;
                        default:
                            b.stopPropagation(), clearTimeout(this.filterTimer);
                            var c, d = this.previousFilter || "", e = String.fromCharCode(b.keyCode), f = !1;
                            e == d ? f = !0 : e = d + e;
                            function g(a) {
                                return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
                            }
                            c = this.activeMenu.children(".ui-menu-item").filter(function() {
                                return (new RegExp("^" + g(e), "i")).test(a(this).children("a").text())
                            }), c = f && c.index(this.active.next()) != -1 ? this.active.nextAll(".ui-menu-item") : c, c.length || (e = String.fromCharCode(b.keyCode), c = this.activeMenu.children(".ui-menu-item").filter(function() {
                                return (new RegExp("^" + g(e), "i")).test(a(this).children("a").text())
                            })), c.length ? (this.focus(b, c), c.length > 1 ? (this.previousFilter = e, this.filterTimer = this._delay(function() {
                                delete this.previousFilter
                            }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
                    }
                }}), this._bind(this.document, {click: function(b) {
                    a(b.target).closest(".ui-menu").length || this.collapseAll(b)
                }})
        },_destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").show(), this.element.find(".ui-menu-item").unbind(".menu").removeClass("ui-menu-item").removeAttr("role").children("a").removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").removeAttr("id").children(".ui-icon").remove()
        },refresh: function() {
            var b = this.element.find(this.options.menus + ":not( .ui-menu )").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr("role", "menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false"), c = this.menuId;
            b.add(this.element).children(":not( .ui-menu-item ):has( a )").addClass("ui-menu-item").attr("role", "presentation").children("a").addClass("ui-corner-all").attr("tabIndex", -1).attr("role", "menuitem").attr("id", function(a) {
                return c + "-" + a
            }), b.each(function() {
                var b = a(this), c = b.prev("a");
                c.attr("aria-haspopup", "true").prepend('<span class="ui-menu-icon ui-icon ui-icon-carat-1-e"></span>'), b.attr("aria-labelledby", c.attr("id"))
            })
        },focus: function(b, c) {
            this.blur(b);
            if (this._hasScroll()) {
                var d = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, e = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, f = c.offset().top - this.activeMenu.offset().top - d - e, g = this.activeMenu.scrollTop(), h = this.activeMenu.height(), i = c.height();
                f < 0 ? this.activeMenu.scrollTop(g + f) : f + i > h && this.activeMenu.scrollTop(g + f - h + i)
            }
            this.active = c.first().children("a").addClass("ui-state-focus").end(), this.element.attr("aria-activedescendant", this.active.children("a").attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            var j = a("> .ui-menu", c);
            j.length && /^mouse/.test(b.type) && this._startOpening(j), this.activeMenu = c.parent(), this._trigger("focus", b, {item: c})
        },blur: function(a) {
            clearTimeout(this.timer);
            !this.active || (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {item: this.active}))
        },_startOpening: function(a) {
            clearTimeout(this.timer);
            a.attr("aria-hidden") === "true" && (this.timer = this._delay(function() {
                this._close(), this._open(a)
            }, this.delay))
        },_open: function(b) {
            clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents()).hide().attr("aria-hidden", "true");
            var c = a.extend({}, {of: this.active}, a.type(this.options.position) == "function" ? this.options.position(this.active) : this.options.position);
            b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
        },collapseAll: function(b, c) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d
            }, this.delay)
        },_close: function(a) {
            a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },collapse: function(a) {
            var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (b && b.length) {
                this._close(), this.focus(a, b);
                return !0
            }
        },expand: function(a) {
            var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").not(".ui-state-disabled").first();
            if (b && b.length) {
                this._open(b.parent()), this._delay(function() {
                    this.focus(a, b)
                }, 20);
                return !0
            }
        },next: function(a) {
            this._move("next", "first", a)
        },previous: function(a) {
            this._move("prev", "last", a)
        },isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },_move: function(a, b, c) {
            var d;
            this.active && (a === "first" || a === "last" ? d = this.active[a === "first" ? "prevAll" : "nextAll"](".ui-menu-item").not(".ui-state-disabled").eq(-1) : d = this.active[a + "All"](".ui-menu-item").not(".ui-state-disabled").eq(0));
            if (!d || !d.length || !this.active)
                d = this.activeMenu.children(".ui-menu-item")[b]();
            this.focus(c, d), d.is(".ui-state-disabled") && this._move(a, b, c)
        },nextPage: function(b) {
            if (!this.active)
                this._move("next", "first", b);
            else {
                if (this.isLastItem())
                    return;
                if (this._hasScroll()) {
                    var c = this.active.offset().top, d = this.element.height(), e;
                    this.active.nextAll(".ui-menu-item").not(".ui-state-disabled").each(function() {
                        e = a(this);
                        return a(this).offset().top - c - d < 0
                    }), this.focus(b, e)
                } else
                    this.focus(b, this.activeMenu.children(".ui-menu-item").not(".ui-state-disabled")[this.active ? "last" : "first"]())
            }
        },previousPage: function(b) {
            if (!this.active)
                this._move("next", "first", b);
            else {
                if (this.isFirstItem())
                    return;
                if (this._hasScroll()) {
                    var c = this.active.offset().top, d = this.element.height(), e;
                    this.active.prevAll(".ui-menu-item").not(".ui-state-disabled").each(function() {
                        e = a(this);
                        return a(this).offset().top - c + d > 0
                    }), this.focus(b, e)
                } else
                    this.focus(b, this.activeMenu.children(".ui-menu-item").not(".ui-state-disabled").first())
            }
        },_hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },select: function(a) {
            var b = {item: this.active};
            this.collapseAll(a, !0), this._trigger("select", a, b)
        }})
}(jQuery), function(a, b) {
    a.ui = a.ui || {};
    var c = /left|center|right/, d = /top|center|bottom/, e = /[+-]\d+%?/, f = /^\w+/, g = /%$/, h = "center", i = a.fn.position;
    a.position = {scrollbarWidth: function() {
            var b, c, d = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), e = d.children()[0];
            a("body").append(d), b = e.offsetWidth, d.css("overflow", "scroll"), c = e.offsetWidth, b === c && (c = d[0].clientWidth), d.remove();
            return b - c
        },getScrollInfo: function(b) {
            var c = b[0] !== window, d = c ? b.css("overflow-x") : "", e = c ? b.css("overflow-y") : "", f = d === "auto" || d === "scroll" ? a.position.scrollbarWidth() : 0, g = e === "auto" || e === "scroll" ? a.position.scrollbarWidth() : 0;
            return {height: b.height() < b[0].scrollHeight ? g : 0,width: b.width() < b[0].scrollWidth ? f : 0}
        }}, a.fn.position = function(b) {
        if (!b || !b.of)
            return i.apply(this, arguments);
        b = a.extend({}, b);
        var j = a(b.of), k = a(b.within || window), l = j[0], m = (b.collision || "flip").split(" "), n = {}, o, p, q, r;
        l.nodeType === 9 ? (p = j.width(), q = j.height(), r = {top: 0,left: 0}) : a.isWindow(l) ? (p = j.width(), q = j.height(), r = {top: j.scrollTop(),left: j.scrollLeft()}) : l.preventDefault ? (b.at = "left top", p = q = 0, r = {top: b.of.pageY,left: b.of.pageX}) : (p = j.outerWidth(), q = j.outerHeight(), r = j.offset()), a.each(["my", "at"], function() {
            var a = (b[this] || "").split(" "), g, i;
            a.length === 1 && (a = c.test(a[0]) ? a.concat([h]) : d.test(a[0]) ? [h].concat(a) : [h, h]), a[0] = c.test(a[0]) ? a[0] : h, a[1] = d.test(a[1]) ? a[1] : h, g = e.exec(a[0]), i = e.exec(a[1]), n[this] = [g ? g[0] : 0, i ? i[0] : 0], b[this] = [f.exec(a[0])[0], f.exec(a[1])[0]]
        }), m.length === 1 && (m[1] = m[0]), b.at[0] === "right" ? r.left += p : b.at[0] === h && (r.left += p / 2), b.at[1] === "bottom" ? r.top += q : b.at[1] === h && (r.top += q / 2), o = [parseInt(n.at[0], 10) * (g.test(n.at[0]) ? p / 100 : 1), parseInt(n.at[1], 10) * (g.test(n.at[1]) ? q / 100 : 1)], r.left += o[0], r.top += o[1];
        return this.each(function() {
            var c = a(this), d = c.outerWidth(), e = c.outerHeight(), f = parseInt(a.css(this, "marginLeft")) || 0, i = parseInt(a.css(this, "marginTop")) || 0, j = a.position.getScrollInfo(k), l = d + f + (parseInt(a.css(this, "marginRight")) || 0) + j.width, s = e + i + (parseInt(a.css(this, "marginBottom")) || 0) + j.height, t = a.extend({}, r), u = [parseInt(n.my[0], 10) * (g.test(n.my[0]) ? c.outerWidth() / 100 : 1), parseInt(n.my[1], 10) * (g.test(n.my[1]) ? c.outerHeight() / 100 : 1)], v;
            b.my[0] === "right" ? t.left -= d : b.my[0] === h && (t.left -= d / 2), b.my[1] === "bottom" ? t.top -= e : b.my[1] === h && (t.top -= e / 2), t.left += u[0], t.top += u[1], a.support.offsetFractions || (t.left = Math.round(t.left), t.top = Math.round(t.top)), v = {marginLeft: f,marginTop: i}, a.each(["left", "top"], function(f, g) {
                a.ui.position[m[f]] && a.ui.position[m[f]][g](t, {targetWidth: p,targetHeight: q,elemWidth: d,elemHeight: e,collisionPosition: v,collisionWidth: l,collisionHeight: s,offset: [o[0] + u[0], o[1] + u[1]],my: b.my,at: b.at,within: k,elem: c})
            }), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(t, {using: b.using}))
        })
    }, a.ui.position = {fit: {left: function(b, c) {
                var d = c.within, e = a(window), f = a.isWindow(c.within[0]), g = f ? e.scrollLeft() : d.offset().left, h = f ? e.width() : d.outerWidth(), i = b.left - c.collisionPosition.marginLeft, j = g - i, k = i + c.collisionWidth - h - g, l, m;
                c.collisionWidth > h ? j > 0 && k <= 0 ? (l = b.left + j + c.collisionWidth - h - g, b.left += j - l) : k > 0 && j <= 0 ? b.left = g : j > k ? b.left = g + h - c.collisionWidth : b.left = g : j > 0 ? b.left += j : k > 0 ? b.left -= k : b.left = Math.max(b.left - i, b.left)
            },top: function(b, c) {
                var d = c.within, e = a(window), f = a.isWindow(c.within[0]), g = f ? e.scrollTop() : d.offset().top, h = f ? e.height() : d.outerHeight(), i = b.top - c.collisionPosition.marginTop, j = g - i, k = i + c.collisionHeight - h - g, l, m;
                c.collisionHeight > h ? j > 0 && k <= 0 ? (m = b.top + j + c.collisionHeight - h - g, b.top += j - m) : k > 0 && j <= 0 ? b.top = g : j > k ? b.top = g + h - c.collisionHeight : b.top = g : j > 0 ? b.top += j : k > 0 ? b.top -= k : b.top = Math.max(b.top - i, b.top)
            }},flip: {left: function(b, c) {
                if (c.at[0] !== h) {
                    c.elem.removeClass("ui-flipped-left ui-flipped-right");
                    var d = c.within, e = a(window), f = a.isWindow(c.within[0]), g = (f ? 0 : d.offset().left) + d.scrollLeft(), i = f ? d.width() : d.outerWidth(), j = b.left - c.collisionPosition.marginLeft, k = j - g, l = j + c.collisionWidth - i - g, m = c.my[0] === "left", n = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0, o = c.at[0] === "left" ? c.targetWidth : -c.targetWidth, p = -2 * c.offset[0], q, r;
                    if (k < 0) {
                        q = b.left + n + o + p + c.collisionWidth - i - g;
                        if (q < 0 || q < Math.abs(k))
                            c.elem.addClass("ui-flipped-right"), b.left += n + o + p
                    } else if (l > 0) {
                        r = b.left - c.collisionPosition.marginLeft + n + o + p - g;
                        if (r > 0 || Math.abs(r) < l)
                            c.elem.addClass("ui-flipped-left"), b.left += n + o + p
                    }
                }
            },top: function(b, c) {
                if (c.at[1] !== h) {
                    c.elem.removeClass("ui-flipped-top ui-flipped-bottom");
                    var d = c.within, e = a(window), f = a.isWindow(c.within[0]), g = (f ? 0 : d.offset().top) + d.scrollTop(), i = f ? d.height() : d.outerHeight(), j = b.top - c.collisionPosition.marginTop, k = j - g, l = j + c.collisionHeight - i - g, m = c.my[1] === "top", n = m ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0, o = c.at[1] === "top" ? c.targetHeight : -c.targetHeight, p = -2 * c.offset[1], q, r;
                    k < 0 ? (r = b.top + n + o + p + c.collisionHeight - i - g, b.top + n + o + p > k && (r < 0 || r < Math.abs(k)) && (c.elem.addClass("ui-flipped-bottom"), b.top += n + o + p)) : l > 0 && (q = b.top - c.collisionPosition.marginTop + n + o + p - g, b.top + n + o + p > l && (q > 0 || Math.abs(q) < l) && (c.elem.addClass("ui-flipped-top"), b.top += n + o + p))
                }
            }},flipfit: {left: function() {
                a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
            },top: function() {
                a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
            }}}, function() {
        var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {visibility: "hidden",width: 0,height: 0,border: 0,margin: 0,background: "none"}, g && a.extend(d, {position: "absolute",left: "-1000px",top: "-1000px"});
        for (f in d)
            b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && e < 11, b.innerHTML = "", c.removeChild(b)
    }(), a.uiBackCompat !== !1 && function(a) {
        var c = a.fn.position;
        a.fn.position = function(d) {
            if (!d || !d.offset)
                return c.call(this, d);
            var e = d.offset.split(" "), f = d.at.split(" ");
            e.length === 1 && (e[1] = e[0]), /^\d/.test(e[0]) && (e[0] = "+" + e[0]), /^\d/.test(e[1]) && (e[1] = "+" + e[1]), f.length === 1 && (/left|center|right/.test(f[0]) ? f[1] = "center" : (f[1] = f[0], f[0] = "center"));
            return c.call(this, a.extend(d, {at: f[0] + e[0] + " " + f[1] + e[1],offset: b}))
        }
    }(jQuery)
}(jQuery), function(a, b) {
    a.widget("ui.progressbar", {version: "@VERSION",options: {value: 0,max: 100},min: 0,_create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role: "progressbar","aria-valuemin": this.min,"aria-valuemax": this.options.max,"aria-valuenow": this._value()}), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
        },_destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },value: function(a) {
            if (a === b)
                return this._value();
            this._setOption("value", a);
            return this
        },_setOption: function(a, b) {
            a === "value" && (this.options.value = b, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), this._super(a, b)
        },_value: function() {
            var a = this.options.value;
            typeof a != "number" && (a = 0);
            return Math.min(this.options.max, Math.max(this.min, a))
        },_percentage: function() {
            return 100 * this._value() / this.options.max
        },_refreshValue: function() {
            var a = this.value(), b = this._percentage();
            this.oldValue !== a && (this.oldValue = a, this._trigger("change")), this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%"), this.element.attr("aria-valuenow", a)
        }})
}(jQuery), function(a, b) {
    var c = 5;
    a.widget("ui.slider", a.ui.mouse, {version: "@VERSION",widgetEventPrefix: "slide",options: {animate: !1,distance: 0,max: 100,min: 0,orientation: "horizontal",range: !1,step: 1,value: 0,values: null},_create: function() {
            var b = this, d = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", g = d.values && d.values.length || 1, h = [];
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [this._valueMin(), this._valueMin()]), d.values.length && d.values.length !== 2 && (d.values = [d.values[0], d.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (d.range === "min" || d.range === "max" ? " ui-slider-range-" + d.range : "")));
            for (var i = e.length; i < g; i += 1)
                h.push(f);
            this.handles = e.add(a(h.join("")).appendTo(b.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(a) {
                a.preventDefault()
            }).hover(function() {
                d.disabled || a(this).addClass("ui-state-hover")
            }, function() {
                a(this).removeClass("ui-state-hover")
            }).focus(function() {
                d.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
            }).blur(function() {
                a(this).removeClass("ui-state-focus")
            }), this.handles.each(function(b) {
                a(this).data("ui-slider-handle-index", b)
            }), this.handles.keydown(function(d) {
                var e = a(this).data("ui-slider-handle-index"), f, g, h, i;
                if (!b.options.disabled) {
                    switch (d.keyCode) {
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_UP:
                        case a.ui.keyCode.PAGE_DOWN:
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            d.preventDefault();
                            if (!b._keySliding) {
                                b._keySliding = !0, a(this).addClass("ui-state-active"), f = b._start(d, e);
                                if (f === !1)
                                    return
                            }
                    }
                    i = b.options.step, b.options.values && b.options.values.length ? g = h = b.values(e) : g = h = b.value();
                    switch (d.keyCode) {
                        case a.ui.keyCode.HOME:
                            h = b._valueMin();
                            break;
                        case a.ui.keyCode.END:
                            h = b._valueMax();
                            break;
                        case a.ui.keyCode.PAGE_UP:
                            h = b._trimAlignValue(g + (b._valueMax() - b._valueMin()) / c);
                            break;
                        case a.ui.keyCode.PAGE_DOWN:
                            h = b._trimAlignValue(g - (b._valueMax() - b._valueMin()) / c);
                            break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                            if (g === b._valueMax())
                                return;
                            h = b._trimAlignValue(g + i);
                            break;
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (g === b._valueMin())
                                return;
                            h = b._trimAlignValue(g - i)
                    }
                    b._slide(d, e, h)
                }
            }).keyup(function(c) {
                var d = a(this).data("ui-slider-handle-index");
                b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"))
            }), this._refreshValue(), this._animateOff = !1
        },destroy: function() {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy();
            return this
        },_mouseCapture: function(b) {
            var c = this.options, d, e, f, g, h, i, j, k, l;
            if (c.disabled)
                return !1;
            this.elementSize = {width: this.element.outerWidth(),height: this.element.outerHeight()}, this.elementOffset = this.element.offset(), d = {x: b.pageX,y: b.pageY}, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function(b) {
                var c = Math.abs(e - h.values(b));
                f > c && (f = c, g = a(this), i = b)
            }), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b, i);
            if (j === !1)
                return !1;
            this._mouseSliding = !0, h._handleIndex = i, g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {left: 0,top: 0} : {left: b.pageX - k.left - g.width() / 2,top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)}, this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0;
            return !0
        },_mouseStart: function(a) {
            return !0
        },_mouseDrag: function(a) {
            var b = {x: a.pageX,y: a.pageY}, c = this._normValueFromMouse(b);
            this._slide(a, this._handleIndex, c);
            return !1
        },_mouseStop: function(a) {
            this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1;
            return !1
        },_detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },_normValueFromMouse: function(a) {
            var b, c, d, e, f;
            this.orientation === "horizontal" ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), this.orientation === "vertical" && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e;
            return this._trimAlignValue(f)
        },_start: function(a, b) {
            var c = {handle: this.handles[b],value: this.value()};
            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values());
            return this._trigger("start", a, c)
        },_slide: function(a, b, c) {
            var d, e, f;
            this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {handle: this.handles[b],value: c,values: e}), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {handle: this.handles[b],value: c}), f !== !1 && this.value(c))
        },_stop: function(a, b) {
            var c = {handle: this.handles[b],value: this.value()};
            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
        },_change: function(a, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {handle: this.handles[b],value: this.value()};
                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("change", a, c)
            }
        },value: function(a) {
            if (arguments.length)
                this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0);
            else
                return this._value()
        },values: function(b, c) {
            var d, e, f;
            if (arguments.length > 1)
                this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
            else {
                if (!arguments.length)
                    return this._values();
                if (!a.isArray(arguments[0]))
                    return this.options.values && this.options.values.length ? this._values(b) : this.value();
                d = this.options.values, e = arguments[0];
                for (f = 0; f < d.length; f += 1)
                    d[f] = this._trimAlignValue(e[f]), this._change(null, f);
                this._refreshValue()
            }
        },_setOption: function(b, c) {
            var d, e = 0;
            a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments);
            switch (b) {
                case "disabled":
                    c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
                    break;
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation
                    ), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    this._animateOff = !0, this._refreshValue();
                    for (d = 0; d < e; d += 1)
                        this._change(null, d);
                    this._animateOff = !1
            }
        },_value: function() {
            var a = this.options.value;
            a = this._trimAlignValue(a);
            return a
        },_values: function(a) {
            var b, c, d;
            if (arguments.length) {
                b = this.options.values[a], b = this._trimAlignValue(b);
                return b
            }
            c = this.options.values.slice();
            for (d = 0; d < c.length; d += 1)
                c[d] = this._trimAlignValue(c[d]);
            return c
        },_trimAlignValue: function(a) {
            if (a <= this._valueMin())
                return this._valueMin();
            if (a >= this._valueMax())
                return this._valueMax();
            var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
            Math.abs(c) * 2 >= b && (d += c > 0 ? b : -b);
            return parseFloat(d.toFixed(5))
        },_valueMin: function() {
            return this.options.min
        },_valueMax: function() {
            return this.options.max
        },_refreshValue: function() {
            var b = this.options.range, c = this.options, d = this, e = this._animateOff ? !1 : c.animate, f, g = {}, h, i, j, k;
            this.options.values && this.options.values.length ? this.handles.each(function(b, i) {
                f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", a(this).stop(1, 1)[e ? "animate" : "css"](g, c.animate), d.options.range === !0 && (d.orientation === "horizontal" ? (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({left: f + "%"}, c.animate), b === 1 && d.range[e ? "animate" : "css"]({width: f - h + "%"}, {queue: !1,duration: c.animate})) : (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({bottom: f + "%"}, c.animate), b === 1 && d.range[e ? "animate" : "css"]({height: f - h + "%"}, {queue: !1,duration: c.animate}))), h = f
            }) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate" : "css"](g, c.animate), b === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[e ? "animate" : "css"]({width: f + "%"}, c.animate), b === "max" && this.orientation === "horizontal" && this.range[e ? "animate" : "css"]({width: 100 - f + "%"}, {queue: !1,duration: c.animate}), b === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[e ? "animate" : "css"]({height: f + "%"}, c.animate), b === "max" && this.orientation === "vertical" && this.range[e ? "animate" : "css"]({height: 100 - f + "%"}, {queue: !1,duration: c.animate}))
        }})
}(jQuery), function(a) {
    function b(a) {
        return function() {
            var b = this.element.val();
            a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change")
        }
    }
    a.widget("ui.spinner", {version: "@VERSION",defaultElement: "<input>",widgetEventPrefix: "spin",options: {culture: null,incremental: !0,max: null,min: null,numberFormat: null,page: 10,step: 1,change: null,spin: null,start: null,stop: null},_create: function() {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._bind(this._events), this._refresh(), this._bind(this.window, {beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }})
        },_getCreateOptions: function() {
            var b = {}, c = this.element;
            a.each(["min", "max", "step"], function(a, d) {
                var e = c.attr(d);
                e !== undefined && e.length && (b[d] = e)
            });
            return b
        },_events: {keydown: function(a) {
                this._start(a) && this._keydown(a) && a.preventDefault()
            },keyup: "_stop",focus: function() {
                this.uiSpinner.addClass("ui-state-active"), this.previous = this.element.val()
            },blur: function(a) {
                this._refresh(), this.uiSpinner.removeClass("ui-state-active"), this.previous !== this.element.val() && this._trigger("change", a)
            },mousewheel: function(a, b) {
                if (!!b) {
                    if (!this.spinning && !this._start(a))
                        return !1;
                    this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(a)
                    }, 100), a.preventDefault()
                }
            },"mousedown .ui-spinner-button": function(b) {
                b.preventDefault(), this.document[0].activeElement !== this.element[0] && this.element.focus();
                this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
            },"mouseup .ui-spinner-button": "_stop","mouseenter .ui-spinner-button": function(b) {
                if (!!a(b.currentTarget).hasClass("ui-state-active")) {
                    if (this._start(b) === !1)
                        return !1;
                    this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
                }
            },"mouseleave .ui-spinner-button": "_stop"},_draw: function() {
            var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this._hoverable(a), this.element.attr("role", "spinbutton"), this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(a.height() * .5) && a.height() > 0 && a.height(a.height()), this.options.disabled && this.disable()
        },_keydown: function(b) {
            var c = this.options, d = a.ui.keyCode;
            switch (b.keyCode) {
                case d.UP:
                    this._repeat(null, 1, b);
                    return !0;
                case d.DOWN:
                    this._repeat(null, -1, b);
                    return !0;
                case d.PAGE_UP:
                    this._repeat(null, c.page, b);
                    return !0;
                case d.PAGE_DOWN:
                    this._repeat(null, -c.page, b);
                    return !0
            }
            return !1
        },_uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-state-default ui-widget ui-widget-content ui-corner-all'></span>"
        },_buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon ui-icon-triangle-1-n'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon ui-icon-triangle-1-s'>&#9660;</span></a>"
        },_start: function(a) {
            if (!this.spinning && this._trigger("start", a) === !1)
                return !1;
            this.counter || (this.counter = 1), this.spinning = !0;
            return !0
        },_repeat: function(a, b, c) {
            a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                this._repeat(40, b, c)
            }, a), this._spin(b * this.options.step, c)
        },_spin: function(a, b) {
            var c = this.value() || 0;
            this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter));
            if (!this.spinning || this._trigger("spin", b, {value: c}) !== !1)
                this._value(c), this.counter++
        },_increment: function(b) {
            var c = this.options.incremental;
            if (c)
                return a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1);
            return 1
        },_precision: function() {
            var a = this._precisionOf(this.options.step);
            this.options.min !== null && (a = Math.max(a, this._precisionOf(this.options.min)));
            return a
        },_precisionOf: function(a) {
            var b = a.toString(), c = b.indexOf(".");
            return c === -1 ? 0 : b.length - c - 1
        },_adjustValue: function(a) {
            var b, c, d = this.options;
            b = d.min !== null ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, a = b + c, a = parseFloat(a.toFixed(this._precision()));
            if (d.max !== null && a > d.max)
                return d.max;
            if (d.min !== null && a < d.min)
                return d.min;
            return a
        },_stop: function(a) {
            !this.spinning || (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a))
        },_setOption: function(a, b) {
            if (a === "culture" || a === "numberFormat") {
                var c = this._parse(this.element.val());
                this.options[a] = b, this.element.val(this._format(c))
            } else
                (a === "max" || a === "min" || a === "step") && typeof b == "string" && (b = this._parse(b)), this._super(a, b), a === "disabled" && (b ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
        },_setOptions: b(function(a) {
            this._super(a), this._value(this.element.val())
        }),_parse: function(a) {
            typeof a == "string" && a !== "" && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a);
            return a === "" || isNaN(a) ? null : a
        },_format: function(a) {
            if (a === "")
                return "";
            return window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
        },_refresh: function() {
            this.element.attr({"aria-valuemin": this.options.min,"aria-valuemax": this.options.max,"aria-valuenow": this._parse(this.element.val())})
        },_value: function(a, b) {
            var c;
            a !== "" && (c = this._parse(a), c !== null && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh()
        },destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this._super(), this.uiSpinner.replaceWith(this.element)
        },stepUp: b(function(a) {
            this._stepUp(a)
        }),_stepUp: function(a) {
            this._spin((a || 1) * this.options.step)
        },stepDown: b(function(a) {
            this._stepDown(a)
        }),_stepDown: function(a) {
            this._spin((a || 1) * -this.options.step)
        },pageUp: b(function(a) {
            this._stepUp((a || 1) * this.options.page)
        }),pageDown: b(function(a) {
            this._stepDown((a || 1) * this.options.page)
        }),value: function(a) {
            if (!arguments.length)
                return this._parse(this.element.val());
            b(this._value).call(this, a)
        },widget: function() {
            return this.uiSpinner
        }})
}(jQuery), function(a, b) {
    function e() {
        return ++c
    }
    var c = 0, d = /#.*$/, f = function(a) {
        a = a.cloneNode(!1);
        return a.hash.length > 1 && a.href.replace(d, "") === location.href.replace(d, "")
    };
    a.widget("ui.tabs", {version: "@VERSION",options: {active: null,collapsible: !1,event: "click",fx: null,activate: null,beforeActivate: null,beforeLoad: null,load: null},_create: function() {
            var b = this, c = b.options, d = c.active;
            b.running = !1, b.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), b._processTabs();
            if (d === null) {
                location.hash && b.anchors.each(function(a, b) {
                    if (b.hash === location.hash) {
                        d = a;
                        return !1
                    }
                }), d === null && (d = b.lis.filter(".ui-tabs-active").index());
                if (d === null || d === -1)
                    d = b.lis.length ? 0 : !1
            }
            d !== !1 && (d = this.lis.eq(d).index(), d === -1 && (d = c.collapsible ? !1 : 0)), c.active = d, !c.collapsible && c.active === !1 && this.anchors.length && (c.active = 0), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function(a, c) {
                return b.lis.index(a)
            }))).sort()), this._setupFx(c.fx), this._refresh(), this.panels.hide(), this.lis.removeClass("ui-tabs-active ui-state-active");
            if (c.active !== !1 && this.anchors.length) {
                this.active = this._findActive(c.active);
                var e = b._getPanelForTab(this.active);
                e.show(), this.lis.eq(c.active).addClass("ui-tabs-active ui-state-active"), this.load(c.active)
            } else
                this.active = a()
        },_getCreateEventData: function() {
            return {tab: this.active,panel: this.active.length ? this._getPanelForTab(this.active) : a()}
        },_setOption: function(a, b) {
            if (a == "active")
                this._activate(b);
            else {
                if (a === "disabled") {
                    this._setupDisabled(b);
                    return
                }
                this._super(a, b), a === "collapsible" && !b && this.options.active === !1 && this._activate(0), a === "event" && this._setupEvents(b), a === "fx" && this._setupFx(b)
            }
        },_tabId: function(b) {
            return a(b).attr("aria-controls") || "ui-tabs-" + e()
        },_sanitizeSelector: function(a) {
            return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@[\]^`{|}~]/g, "\\$&") : ""
        },refresh: function() {
            var b = this, c = this.options, d = this.list.children(":has(a[href])");
            c.disabled = a.map(d.filter(".ui-state-disabled"), function(a) {
                return d.index(a)
            }), this._processTabs(), this._refresh(), this.panels.not(this._getPanelForTab(this.active)).hide();
            if (c.active === !1 || !this.anchors.length)
                c.active = !1, this.active = a();
            else if (this.active.length && !a.contains(this.list[0], this.active[0])) {
                var e = c.active - 1;
                this._activate(e >= 0 ? e : 0)
            } else
                c.active = this.anchors.index(this.active)
        },_refresh: function() {
            var a = this.options;
            this.element.toggleClass("ui-tabs-collapsible", a.collapsible), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), this._setupDisabled(a.disabled), this._setupEvents(a.event), this.lis.unbind(".tabs"), this._focusable(this.lis), this._hoverable(this.lis)
        },_processTabs: function() {
            var b = this;
            this.list = this._getList(), this.lis = a(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function() {
                return a("a", this)[0]
            }), this.panels = a([]), this.anchors.each(function(c, d) {
                var e, g;
                if (f(d))
                    e = d.hash, g = b.element.find(b._sanitizeSelector(e));
                else {
                    var h = b._tabId(d);
                    e = "#" + h, g = b.element.find(e), g.length || (g = b._createPanel(h), g.insertAfter(b.panels[c - 1] || b.list))
                }
                g.length && (b.panels = b.panels.add(g)), a(d).attr("aria-controls", e.substring(1))
            })
        },_getList: function() {
            return this.element.find("ol,ul").eq(0)
        },_createPanel: function(b) {
            return a("<div></div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },_setupDisabled: function(b) {
            a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
            for (var c = 0, d; d = this.lis[c]; c++)
                a(d).toggleClass("ui-state-disabled", b === !0 || a.inArray(c, b) !== -1);
            this.options.disabled = b
        },_setupFx: function(b) {
            b && (a.isArray(b) ? (this.hideFx = b[0], this.showFx = b[1]) : this.hideFx = this.showFx = b)
        },_resetStyle: function(b, c) {
            !a.support.opacity && c.opacity && b[0].style.removeAttribute("filter")
        },_setupEvents: function(b) {
            this.anchors.unbind(".tabs"), b && this.anchors.bind(b.split(" ").join(".tabs ") + ".tabs", a.proxy(this, "_eventHandler")), this.anchors.bind("click.tabs", function(a) {
                a.preventDefault()
            })
        },_eventHandler: function(b) {
            var c = this, d = c.options, e = c.active, f = a(b.currentTarget), g = f[0] === e[0], h = g && d.collapsible, i = h ? a() : c._getPanelForTab(f), j = e.length ? c._getPanelForTab(e) : a(), k = f.closest("li"), l = {oldTab: e,oldPanel: j,newTab: h ? a() : f,newPanel: i};
            b.preventDefault();
            if (k.hasClass("ui-state-disabled") || k.hasClass("ui-tabs-loading") || c.running || g && !d.collapsible || c._trigger("beforeActivate", b, l) === !1)
                f[0].blur();
            else {
                d.active = h ? !1 : c.anchors.index(f), c.active = g ? a() : f, c.xhr && c.xhr.abort();
                if (!j.length && !i.length)
                    throw "jQuery UI Tabs: Mismatching fragment identifier.";
                i.length && (c.load(c.anchors.index(f), b), f[0].blur()), c._toggle(b, l)
            }
        },_toggle: function(b, c) {
            function i() {
                c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), f.length && d.showFx ? f.animate(d.showFx, d.showFx.duration || "normal", function() {
                    d._resetStyle(a(this), d.showFx), h()
                }) : (f.show(), h())
            }
            function h() {
                d.running = !1, d._trigger("activate", b, c)
            }
            var d = this, e = d.options, f = c.newPanel, g = c.oldPanel;
            d.running = !0, g.length && d.hideFx ? g.animate(d.hideFx, d.hideFx.duration || "normal", function() {
                c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), d._resetStyle(a(this), d.hideFx), i()
            }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), g.hide(), i())
        },_activate: function(b) {
            var c = this._findActive(b)[0];
            c !== this.active[0] && (c = c || this.active[0], this._eventHandler({target: c,currentTarget: c,preventDefault: a.noop}))
        },_findActive: function(b) {
            return typeof b == "number" ? this.anchors.eq(b) : typeof b == "string" ? this.anchors.filter("[href$='" + b + "']") : a()
        },_getIndex: function(a) {
            typeof a == "string" && (a = this.anchors.index(this.anchors.filter("[href$=" + a + "]")));
            return a
        },_destroy: function() {
            var b = this.options;
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.unbind(".tabs").removeData("href.tabs").removeData("load.tabs"), this.lis.unbind(".tabs").add(this.panels).each(function() {
                a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-active", "ui-state-active", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom"].join(" "))
            });
            return this
        },enable: function(c) {
            var d = this.options.disabled;
            d !== !1 && (c === b ? d = !1 : (c = this._getIndex(c), a.isArray(d) ? d = a.map(d, function(a) {
                return a !== c ? a : null
            }) : d = a.map(this.lis, function(a, b) {
                return b !== c ? b : null
            })), this._setupDisabled(d))
        },disable: function(c) {
            var d = this.options.disabled;
            if (d !== !0) {
                if (c === b)
                    d = !0;
                else {
                    c = this._getIndex(c);
                    if (a.inArray(c, d) !== -1)
                        return;
                    a.isArray(d) ? d = a.merge([c], d).sort() : d = [c]
                }
                this._setupDisabled(d)
            }
        },load: function(b, c) {
            b = this._getIndex(b);
            var d = this, e = this.options, g = this.anchors.eq(b), h = d._getPanelForTab(g), i = {tab: g,panel: h};
            if (!f(g[0])) {
                this.xhr = a.ajax({url: g.attr("href"),beforeSend: function(b, e) {
                        return d._trigger("beforeLoad", c, a.extend({jqXHR: b,ajaxSettings: e}, i))
                    }}), this.xhr && (this.lis.eq(b).addClass("ui-tabs-loading"), this.xhr.success(function(a) {
                    setTimeout(function() {
                        h.html(a), d._trigger("load", c, i)
                    }, 1)
                }).complete(function(a, c) {
                    setTimeout(function() {
                        c === "abort" && d.panels.stop(!1, !0), d.lis.eq(b).removeClass("ui-tabs-loading"), a === d.xhr && delete d.xhr
                    }, 1)
                }));
                return this
            }
        },_getPanelForTab: function(b) {
            var c = a(b).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + c))
        }});
    if (a.uiBackCompat !== !1) {
        a.ui.tabs.prototype._ui = function(a, b) {
            return {tab: a,panel: b,index: this.anchors.index(a)}
        }, a.widget("ui.tabs", a.ui.tabs, {url: function(a, b) {
                this.anchors.eq(a).attr("href", b)
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {ajaxOptions: null,cache: !1},_create: function() {
                this._super();
                var b = this;
                this.element.bind("tabsbeforeload.tabs", function(c, d) {
                    a.data(d.tab[0], "cache.tabs") ? c.preventDefault() : (a.extend(d.ajaxSettings, b.options.ajaxOptions, {error: function(a, c, e) {
                            try {
                                b.options.ajaxOptions.error(a, c, d.tab.closest("li").index(), d.tab[0])
                            } catch (e) {
                            }
                        }}), d.jqXHR.success(function() {
                        b.options.cache && a.data(d.tab[0], "cache.tabs", !0)
                    }))
                })
            },_setOption: function(a, b) {
                a === "cache" && b === !1 && this.anchors.removeData("cache.tabs"), this._super(a, b)
            },_destroy: function() {
                this.anchors.removeData("cache.tabs"), this._super()
            },url: function(a, b) {
                this.anchors.eq(a).removeData("cache.tabs"), this._superApply(arguments)
            }}), a.widget("ui.tabs", a.ui.tabs, {abort: function() {
                this.xhr && this.xhr.abort()
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {spinner: "<em>Loading&#8230;</em>"},_create: function() {
                this._super(), this._bind({tabsbeforeload: function(a, b) {
                        if (!!this.options.spinner) {
                            var c = b.tab.find("span"), d = c.html();
                            c.html(this.options.spinner), b.jqXHR.complete(function() {
                                c.html(d)
                            })
                        }
                    }})
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {enable: null,disable: null},enable: function(b) {
                var c = this.options, d;
                if (b && c.disabled === !0 || a.isArray(c.disabled) && a.inArray(b, c.disabled) !== -1)
                    d = !0;
                this._superApply(arguments), d && this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b]))
            },disable: function(b) {
                var c = this.options, d;
                if (b && c.disabled === !1 || a.isArray(c.disabled) && a.inArray(b, c.disabled) === -1)
                    d = !0;
                this._superApply(arguments), d && this._trigger("disable", null, this._ui(this.anchors[b], this.panels[b]))
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {add: null,remove: null,tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"},add: function(c, d, e) {
                e === b && (e = this.anchors.length);
                var f = this.options, g = a(f.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)), h = c.indexOf("#") ? this._tabId(g.find("a")[0]) : c.replace("#", "");
                g.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy", !0), g.find("a").attr("aria-controls", h);
                var i = e >= this.lis.length, j = this.element.find("#" + h);
                j.length || (j = this._createPanel(h), i ? e > 0 ? j.insertAfter(this.panels.eq(-1)) : j.appendTo(this.element) : j.insertBefore(this.panels[e])), j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(), i ? g.appendTo(this.list) : g.insertBefore(this.lis[e]), f.disabled = a.map(f.disabled, function(a) {
                    return a >= e ? ++a : a
                }), this.refresh(), this.lis.length === 1 && f.active === !1 && this.option("active", 0), this._trigger("add", null, this._ui(this.anchors[e], this.panels[e]));
                return this
            },remove: function(b) {
                b = this._getIndex(b);
                var c = this.options, d = this.lis.eq(b).remove(), e = this._getPanelForTab(d.find("a[aria-controls]")).remove();
                d.hasClass("ui-tabs-active") && this.anchors.length > 2 && this._activate(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function(a) {
                    return a !== b
                }), function(a) {
                    return a >= b ? --a : a
                }), this.refresh(), this._trigger("remove", null, this._ui(d.find("a")[0], e[0]));
                return this
            }}), a.widget("ui.tabs", a.ui.tabs, {length: function() {
                return this.anchors.length
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {idPrefix: "ui-tabs-"},_tabId: function(b) {
                return a(b).attr("aria-controls") || b.title && b.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {panelTemplate: "<div></div>"},_createPanel: function(b) {
                return a(this.options.panelTemplate).attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            }}), a.widget("ui.tabs", a.ui.tabs, {_create: function() {
                var a = this.options;
                a.active === null && a.selected !== b && (a.active = a.selected === -1 ? !1 : a.selected), this._super(), a.selected = a.active, a.selected === !1 && (a.selected = -1)
            },_setOption: function(a, b) {
                if (a !== "selected")
                    return this._super(a, b);
                var c = this.options;
                this._super("active", b === -1 ? !1 : b), c.selected = c.active, c.selected === !1 && (c.selected = -1)
            },_eventHandler: function(a) {
                this._superApply(arguments), this.options.selected = this.options.active, this.options.selected === !1 && (this.options.selected = -1)
            }}), a.widget("ui.tabs", a.ui.tabs, {options: {show: null,select: null},_create: function() {
                this._super(), this.options.active !== !1 && this._trigger("show", null, this._ui(this.active[0], this._getPanelForTab(this.active)[0]))
            },_trigger: function(a, b, c) {
                var d = this._superApply(arguments);
                if (!d)
                    return !1;
                a === "beforeActivate" && c.newTab.length ? d = this._super("select", b, {tab: c.newTab[0],panel: c.newPanel[0],index: c.newTab.closest("li").index()}) : a === "activate" && c.newTab.length && (d = this._super("show", b, {tab: c.newTab[0],panel: c.newPanel[0],index: c.newTab.closest("li").index()}));
                return d
            }}), a.widget("ui.tabs", a.ui.tabs, {select: function(a) {
                a = this._getIndex(a);
                if (a === -1)
                    if (this.options.collapsible && this.options.selected !== -1)
                        a = this.options.selected;
                    else
                        return;
                this.anchors.eq(a).trigger(this.options.event + ".tabs")
            }});
        var g = 0;
        a.widget("ui.tabs", a.ui.tabs, {options: {cookie: null},_create: function() {
                var a = this.options, b;
                a.active == null && a.cookie && (b = parseInt(this._cookie(), 10), b === -1 && (b = !1), a.active = b), this._super()
            },_cookie: function(b) {
                var c = [this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++g)];
                arguments.length && (c.push(b === !1 ? -1 : b), c.push(this.options.cookie));
                return a.cookie.apply(null, c)
            },_refresh: function() {
                this._super(), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },_eventHandler: function(a) {
                this._superApply(arguments), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },_destroy: function() {
                this._super(), this.options.cookie && this._cookie(null, this.options.cookie)
            }}), a.widget("ui.tabs", a.ui.tabs, {_trigger: function(b, c, d) {
                var e = a.extend({}, d);
                b === "load" && (e.panel = e.panel[0], e.tab = e.tab[0]);
                return this._super(b, c, e)
            }})
    }
}(jQuery), function(a) {
    var b = 0;
    a.widget("ui.tooltip", {version: "@VERSION",options: {content: function() {
                return a(this).attr("title")
            },hide: !0,items: "[title]",position: {my: "left+15 center",at: "right center",collision: "flipfit flipfit"},show: !0,tooltipClass: null,close: null,open: null},_create: function() {
            this._bind({mouseover: "open",focusin: "open"}), this.tooltips = {}
        },_setOption: function(a, b) {
            a === "disabled" ? (this[b ? "_disable" : "_enable"](), this.options[a] = b) : this._super(a, b)
        },_disable: function() {
            var b = this;
            a.each(this.tooltips, function(c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0], b.close(e, !0)
            }), this.element.find(this.options.items).andSelf().each(function() {
                var b = a(this);
                b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "")
            })
        },_enable: function() {
            this.element.find(this.options.items).andSelf().each(function() {
                var b = a(this);
                b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
            })
        },open: function(b) {
            var c, d = this, e = a(b ? b.target : this.element).closest(this.options.items);
            !!e.length && !e.attr("aria-describedby") && (e.data("ui-tooltip-title") || e.data("ui-tooltip-title", e.attr("title")), e.data("tooltip-open", !0), c = this.options.content.call(e[0], function(a) {
                !e.data("tooltip-open") || setTimeout(function() {
                    d._open(b, e, a)
                }, 1)
            }), c && d._open(b, e, c))
        },_open: function(b, c, d) {
            if (!!d) {
                c.is("[title]") && c.attr("title", "");
                var e = this._find(c);
                e.length || (e = this._tooltip(c), c.attr("aria-describedby", e.attr("id"))), e.find(".ui-tooltip-content").html(d), e.stop(!0).position(a.extend({of: c}, this.options.position)).hide(), this._show(e, this.options.show), this._trigger("open", b, {tooltip: e}), this._bind(c, {mouseleave: "close",focusout: "close",keyup: function(b) {
                        if (b.keyCode == a.ui.keyCode.ESCAPE) {
                            var d = a.Event(b);
                            d.currentTarget = c[0], this.close(d, !0)
                        }
                    }})
            }
        },close: function(b, c) {
            var d = this, e = a(b ? b.currentTarget : this.element), f = this._find(e);
            if (!!c || this.document[0].activeElement !== e[0])
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")), e.removeAttr("aria-describedby"), f.stop(!0), this._hide(f, this.options.hide, function() {
                    a(this).remove(), delete d.tooltips[this.id]
                }), e.removeData("tooltip-open"), e.unbind("mouseleave.tooltip focusout.tooltip keyup.tooltip"), this._trigger("close", b, {tooltip: f})
        },_tooltip: function(c) {
            var d = "ui-tooltip-" + b++, e = a("<div>").attr({id: d,role: "tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            a("<div>").addClass("ui-tooltip-content").appendTo(e), e.appendTo(this.document[0].body), a.fn.bgiframe && e.bgiframe(), this.tooltips[d] = c;
            return e
        },_find: function(b) {
            var c = b.attr("aria-describedby");
            return c ? a("#" + c) : a()
        },_destroy: function() {
            a.each(this.tooltips, function(b) {
                a("#" + b).remove()
            })
        }})
}(jQuery)
