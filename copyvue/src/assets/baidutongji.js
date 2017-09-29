var requirejs, require, define; !
function(global) {
	function isFunction(e) {
		return "[object Function]" === ostring.call(e)
	}
	function isArray(e) {
		return "[object Array]" === ostring.call(e)
	}
	function each(e, t) {
		if (e) {
			var n;
			for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
		}
	}
	function eachReverse(e, t) {
		if (e) {
			var n;
			for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
		}
	}
	function hasProp(e, t) {
		return hasOwn.call(e, t)
	}
	function getOwn(e, t) {
		return hasProp(e, t) && e[t]
	}
	function eachProp(e, t) {
		var n;
		for (n in e) if (hasProp(e, n) && t(e[n], n)) break
	}
	function mixin(e, t, n, i) {
		return t && eachProp(t,
		function(t, s) { (n || !hasProp(e, s)) && (!i || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[s] = t: (e[s] || (e[s] = {}), mixin(e[s], t, n, i)))
		}),
		e
	}
	function bind(e, t) {
		return function() {
			return t.apply(e, arguments)
		}
	}
	function scripts() {
		return document.getElementsByTagName("script")
	}
	function defaultOnError(e) {
		throw e
	}
	function getGlobal(e) {
		if (!e) return e;
		var t = global;
		return each(e.split("."),
		function(e) {
			t = t[e]
		}),
		t
	}
	function makeError(e, t, n, i) {
		var s = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
		return s.requireType = e,
		s.requireModules = i,
		n && (s.originalError = n),
		s
	}
	function newContext(e) {
		function t(e) {
			var t, n;
			for (t = 0; t < e.length; t++) if (n = e[t], "." === n) e.splice(t, 1),
			t -= 1;
			else if (".." === n) {
				if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;
				t > 0 && (e.splice(t - 1, 2), t -= 2)
			}
		}
		function n(e, n, i) {
			var s, o, a, r, l, c, d, u, h, p, f, m, g = n && n.split("/"),
			v = _.map,
			b = v && v["*"];
			if (e && (e = e.split("/"), d = e.length - 1, _.nodeIdCompat && jsSuffixRegExp.test(e[d]) && (e[d] = e[d].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), i && v && (g || b)) {
				a = e.split("/");
				e: for (r = a.length; r > 0; r -= 1) {
					if (c = a.slice(0, r).join("/"), g) for (l = g.length; l > 0; l -= 1) if (o = getOwn(v, g.slice(0, l).join("/")), o && (o = getOwn(o, c))) {
						u = o,
						h = r;
						break e
					} ! p && b && getOwn(b, c) && (p = getOwn(b, c), f = r)
				} ! u && p && (u = p, h = f),
				u && (a.splice(0, h, u), e = a.join("/"))
			}
			return s = getOwn(_.pkgs, e),
			s ? s: e
		}
		function i(e) {
			isBrowser && each(scripts(),
			function(t) {
				return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === w.contextName ? (t.parentNode.removeChild(t), !0) : void 0
			})
		}
		function s(e) {
			var t = getOwn(_.paths, e);
			return t && isArray(t) && t.length > 1 ? (t.shift(), w.require.undef(e), w.makeRequire(null, {
				skipMap: !0
			})([e]), !0) : void 0
		}
		function o(e) {
			var t, n = e ? e.indexOf("!") : -1;
			return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)),
			[t, e]
		}
		function a(e, t, i, s) {
			var a, r, l, c, d = null,
			u = t ? t.name: null,
			h = e,
			p = !0,
			f = "";
			return e || (p = !1, e = "_@r" + (N += 1)),
			c = o(e),
			d = c[0],
			e = c[1],
			d && (d = n(d, u, s), r = getOwn(D, d)),
			e && (d ? f = r && r.normalize ? r.normalize(e,
			function(e) {
				return n(e, u, s)
			}) : -1 === e.indexOf("!") ? n(e, u, s) : e: (f = n(e, u, s), c = o(f), d = c[0], f = c[1], i = !0, a = w.nameToUrl(f))),
			l = !d || r || i ? "": "_unnormalized" + (E += 1),
			{
				prefix: d,
				name: f,
				parentMap: t,
				unnormalized: !!l,
				url: a,
				originalName: h,
				isDefine: p,
				id: (d ? d + "!" + f: f) + l
			}
		}
		function r(e) {
			var t = e.id,
			n = getOwn(C, t);
			return n || (n = C[t] = new w.Module(e)),
			n
		}
		function l(e, t, n) {
			var i = e.id,
			s = getOwn(C, i); ! hasProp(D, i) || s && !s.defineEmitComplete ? (s = r(e), s.error && "error" === t ? n(s.error) : s.on(t, n)) : "defined" === t && n(D[i])
		}
		function c(e, t) {
			var n = e.requireModules,
			i = !1;
			t ? t(e) : (each(n,
			function(t) {
				var n = getOwn(C, t);
				n && (n.error = e, n.events.error && (i = !0, n.emit("error", e)))
			}), i || req.onError(e))
		}
		function d() {
			globalDefQueue.length && (each(globalDefQueue,
			function(e) {
				var t = e[0];
				"string" == typeof t && (w.defQueueMap[t] = !0),
				S.push(e)
			}), globalDefQueue = [])
		}
		function u(e) {
			delete C[e],
			delete T[e]
		}
		function h(e, t, n) {
			var i = e.map.id;
			e.error ? e.emit("error", e.error) : (t[i] = !0, each(e.depMaps,
			function(i, s) {
				var o = i.id,
				a = getOwn(C, o); ! a || e.depMatched[s] || n[o] || (getOwn(t, o) ? (e.defineDep(s, D[o]), e.check()) : h(a, t, n))
			}), n[i] = !0)
		}
		function p() {
			var e, t, n = 1e3 * _.waitSeconds,
			o = n && w.startTime + n < (new Date).getTime(),
			a = [],
			r = [],
			l = !1,
			d = !0;
			if (!b) {
				if (b = !0, eachProp(T,
				function(e) {
					var n = e.map,
					c = n.id;
					if (e.enabled && (n.isDefine || r.push(e), !e.error)) if (!e.inited && o) s(c) ? (t = !0, l = !0) : (a.push(c), i(c));
					else if (!e.inited && e.fetched && n.isDefine && (l = !0, !n.prefix)) return d = !1
				}), o && a.length) return e = makeError("timeout", "Load timeout for modules: " + a, null, a),
				e.contextName = w.contextName,
				c(e);
				d && each(r,
				function(e) {
					h(e, {},
					{})
				}),
				o && !t || !l || !isBrowser && !isWebWorker || $ || ($ = setTimeout(function() {
					$ = 0,
					p()
				},
				50)),
				b = !1
			}
		}
		function f(e) {
			hasProp(D, e[0]) || r(a(e[0], null, !0)).init(e[1], e[2])
		}
		function m(e, t, n, i) {
			e.detachEvent && !isOpera ? i && e.detachEvent(i, t) : e.removeEventListener(n, t, !1)
		}
		function g(e) {
			var t = e.currentTarget || e.srcElement;
			return m(t, w.onScriptLoad, "load", "onreadystatechange"),
			m(t, w.onScriptError, "error"),
			{
				node: t,
				id: t && t.getAttribute("data-requiremodule")
			}
		}
		function v() {
			var e;
			for (d(); S.length;) {
				if (e = S.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
				f(e)
			}
			w.defQueueMap = {}
		}
		var b, y, w, x, $, _ = {
			waitSeconds: 7,
			baseUrl: "./",
			paths: {},
			bundles: {},
			pkgs: {},
			shim: {},
			config: {}
		},
		C = {},
		T = {},
		I = {},
		S = [],
		D = {},
		k = {},
		L = {},
		N = 1,
		E = 1;
		return x = {
			require: function(e) {
				return e.require ? e.require: e.require = w.makeRequire(e.map)
			},
			exports: function(e) {
				return e.usingExports = !0,
				e.map.isDefine ? e.exports ? D[e.map.id] = e.exports: e.exports = D[e.map.id] = {}: void 0
			},
			module: function(e) {
				return e.module ? e.module: e.module = {
					id: e.map.id,
					uri: e.map.url,
					config: function() {
						return getOwn(_.config, e.map.id) || {}
					},
					exports: e.exports || (e.exports = {})
				}
			}
		},
		y = function(e) {
			this.events = getOwn(I, e.id) || {},
			this.map = e,
			this.shim = getOwn(_.shim, e.id),
			this.depExports = [],
			this.depMaps = [],
			this.depMatched = [],
			this.pluginMaps = {},
			this.depCount = 0
		},
		y.prototype = {
			init: function(e, t, n, i) {
				i = i || {},
				this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this,
				function(e) {
					this.emit("error", e)
				})), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = i.ignore, i.enabled || this.enabled ? this.enable() : this.check())
			},
			defineDep: function(e, t) {
				this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
			},
			fetch: function() {
				if (!this.fetched) {
					this.fetched = !0,
					w.startTime = (new Date).getTime();
					var e = this.map;
					return this.shim ? void w.makeRequire(this.map, {
						enableBuildCallback: !0
					})(this.shim.deps || [], bind(this,
					function() {
						return e.prefix ? this.callPlugin() : this.load()
					})) : e.prefix ? this.callPlugin() : this.load()
				}
			},
			load: function() {
				var e = this.map.url;
				k[e] || (k[e] = !0, w.load(this.map.id, e))
			},
			check: function() {
				if (this.enabled && !this.enabling) {
					var e, t, n = this.map.id,
					i = this.depExports,
					s = this.exports,
					o = this.factory;
					if (this.inited) {
						if (this.error) this.emit("error", this.error);
						else if (!this.defining) {
							if (this.defining = !0, this.depCount < 1 && !this.defined) {
								if (isFunction(o)) {
									if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
										s = w.execCb(n, o, i, s)
									} catch(a) {
										e = a
									} else s = w.execCb(n, o, i, s);
									if (this.map.isDefine && void 0 === s && (t = this.module, t ? s = t.exports: this.usingExports && (s = this.exports)), e) return e.requireMap = this.map,
									e.requireModules = this.map.isDefine ? [this.map.id] : null,
									e.requireType = this.map.isDefine ? "define": "require",
									c(this.error = e)
								} else s = o;
								this.exports = s,
								this.map.isDefine && !this.ignore && (D[n] = s, req.onResourceLoad && req.onResourceLoad(w, this.map, this.depMaps)),
								u(n),
								this.defined = !0
							}
							this.defining = !1,
							this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
						}
					} else hasProp(w.defQueueMap, n) || this.fetch()
				}
			},
			callPlugin: function() {
				var e = this.map,
				t = e.id,
				i = a(e.prefix);
				this.depMaps.push(i),
				l(i, "defined", bind(this,
				function(i) {
					var s, o, d, h = getOwn(L, this.map.id),
					p = this.map.name,
					f = this.map.parentMap ? this.map.parentMap.name: null,
					m = w.makeRequire(e.parentMap, {
						enableBuildCallback: !0
					});
					return this.map.unnormalized ? (i.normalize && (p = i.normalize(p,
					function(e) {
						return n(e, f, !0)
					}) || ""), o = a(e.prefix + "!" + p, this.map.parentMap), l(o, "defined", bind(this,
					function(e) {
						this.init([],
						function() {
							return e
						},
						null, {
							enabled: !0,
							ignore: !0
						})
					})), d = getOwn(C, o.id), void(d && (this.depMaps.push(o), this.events.error && d.on("error", bind(this,
					function(e) {
						this.emit("error", e)
					})), d.enable()))) : h ? (this.map.url = w.nameToUrl(h), void this.load()) : (s = bind(this,
					function(e) {
						this.init([],
						function() {
							return e
						},
						null, {
							enabled: !0
						})
					}), s.error = bind(this,
					function(e) {
						this.inited = !0,
						this.error = e,
						e.requireModules = [t],
						eachProp(C,
						function(e) {
							0 === e.map.id.indexOf(t + "_unnormalized") && u(e.map.id)
						}),
						c(e)
					}), s.fromText = bind(this,
					function(n, i) {
						var o = e.name,
						l = a(o),
						d = useInteractive;
						i && (n = i),
						d && (useInteractive = !1),
						r(l),
						hasProp(_.config, t) && (_.config[o] = _.config[t]);
						try {
							req.exec(n)
						} catch(u) {
							return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + u, u, [t]))
						}
						d && (useInteractive = !0),
						this.depMaps.push(l),
						w.completeLoad(o),
						m([o], s)
					}), void i.load(e.name, m, s, _))
				})),
				w.enable(i, this),
				this.pluginMaps[i.id] = i
			},
			enable: function() {
				T[this.map.id] = this,
				this.enabled = !0,
				this.enabling = !0,
				each(this.depMaps, bind(this,
				function(e, t) {
					var n, i, s;
					if ("string" == typeof e) {
						if (e = a(e, this.map.isDefine ? this.map: this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, s = getOwn(x, e.id)) return void(this.depExports[t] = s(this));
						this.depCount += 1,
						l(e, "defined", bind(this,
						function(e) {
							this.undefed || (this.defineDep(t, e), this.check())
						})),
						this.errback ? l(e, "error", bind(this, this.errback)) : this.events.error && l(e, "error", bind(this,
						function(e) {
							this.emit("error", e)
						}))
					}
					n = e.id,
					i = C[n],
					hasProp(x, n) || !i || i.enabled || w.enable(e, this)
				})),
				eachProp(this.pluginMaps, bind(this,
				function(e) {
					var t = getOwn(C, e.id);
					t && !t.enabled && w.enable(e, this)
				})),
				this.enabling = !1,
				this.check()
			},
			on: function(e, t) {
				var n = this.events[e];
				n || (n = this.events[e] = []),
				n.push(t)
			},
			emit: function(e, t) {
				each(this.events[e],
				function(e) {
					e(t)
				}),
				"error" === e && delete this.events[e]
			}
		},
		w = {
			config: _,
			contextName: e,
			registry: C,
			defined: D,
			urlFetched: k,
			defQueue: S,
			defQueueMap: {},
			Module: y,
			makeModuleMap: a,
			nextTick: req.nextTick,
			onError: c,
			configure: function(e) {
				e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
				var t = _.shim,
				n = {
					paths: !0,
					bundles: !0,
					config: !0,
					map: !0
				};
				eachProp(e,
				function(e, t) {
					n[t] ? (_[t] || (_[t] = {}), mixin(_[t], e, !0, !0)) : _[t] = e
				}),
				e.bundles && eachProp(e.bundles,
				function(e, t) {
					each(e,
					function(e) {
						e !== t && (L[e] = t)
					})
				}),
				e.shim && (eachProp(e.shim,
				function(e, n) {
					isArray(e) && (e = {
						deps: e
					}),
					!e.exports && !e.init || e.exportsFn || (e.exportsFn = w.makeShimExports(e)),
					t[n] = e
				}), _.shim = t),
				e.packages && each(e.packages,
				function(e) {
					var t, n;
					e = "string" == typeof e ? {
						name: e
					}: e,
					n = e.name,
					t = e.location,
					t && (_.paths[n] = e.location),
					_.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
				}),
				eachProp(C,
				function(e, t) {
					e.inited || e.map.unnormalized || (e.map = a(t, null, !0))
				}),
				(e.deps || e.callback) && w.require(e.deps || [], e.callback)
			},
			makeShimExports: function(e) {
				function t() {
					var t;
					return e.init && (t = e.init.apply(global, arguments)),
					t || e.exports && getGlobal(e.exports)
				}
				return t
			},
			makeRequire: function(t, s) {
				function o(n, i, l) {
					var d, u, h;
					return s.enableBuildCallback && i && isFunction(i) && (i.__requireJsBuild = !0),
					"string" == typeof n ? isFunction(i) ? c(makeError("requireargs", "Invalid require call"), l) : t && hasProp(x, n) ? x[n](C[t.id]) : req.get ? req.get(w, n, t, o) : (u = a(n, t, !1, !0), d = u.id, hasProp(D, d) ? D[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "": ". Use require([])")))) : (v(), w.nextTick(function() {
						v(),
						h = r(a(null, t)),
						h.skipMap = s.skipMap,
						h.init(n, i, l, {
							enabled: !0
						}),
						p()
					}), o)
				}
				return s = s || {},
				mixin(o, {
					isBrowser: isBrowser,
					toUrl: function(e) {
						var i, s = e.lastIndexOf("."),
						o = e.split("/")[0],
						a = "." === o || ".." === o;
						return - 1 !== s && (!a || s > 1) && (i = e.substring(s, e.length), e = e.substring(0, s)),
						w.nameToUrl(n(e, t && t.id, !0), i, !0)
					},
					defined: function(e) {
						return hasProp(D, a(e, t, !1, !0).id)
					},
					specified: function(e) {
						return e = a(e, t, !1, !0).id,
						hasProp(D, e) || hasProp(C, e)
					}
				}),
				t || (o.undef = function(e) {
					d();
					var n = a(e, t, !0),
					s = getOwn(C, e);
					s.undefed = !0,
					i(e),
					delete D[e],
					delete k[n.url],
					delete I[e],
					eachReverse(S,
					function(t, n) {
						t[0] === e && S.splice(n, 1)
					}),
					delete w.defQueueMap[e],
					s && (s.events.defined && (I[e] = s.events), u(e))
				}),
				o
			},
			enable: function(e) {
				var t = getOwn(C, e.id);
				t && r(e).enable()
			},
			completeLoad: function(e) {
				var t, n, i, o = getOwn(_.shim, e) || {},
				a = o.exports;
				for (d(); S.length;) {
					if (n = S.shift(), null === n[0]) {
						if (n[0] = e, t) break;
						t = !0
					} else n[0] === e && (t = !0);
					f(n)
				}
				if (w.defQueueMap = {},
				i = getOwn(C, e), !t && !hasProp(D, e) && i && !i.inited) {
					if (! (!_.enforceDefine || a && getGlobal(a))) return s(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
					f([e, o.deps || [], o.exportsFn])
				}
				p()
			},
			nameToUrl: function(e, t, n) {
				var i, s, o, a, r, l, c, d = getOwn(_.pkgs, e);
				if (d && (e = d), c = getOwn(L, e)) return w.nameToUrl(c, t, n);
				if (req.jsExtRegExp.test(e)) r = e + (t || "");
				else {
					for (i = _.paths, s = e.split("/"), o = s.length; o > 0; o -= 1) if (a = s.slice(0, o).join("/"), l = getOwn(i, a)) {
						isArray(l) && (l = l[0]),
						s.splice(0, o, l);
						break
					}
					r = s.join("/"),
					r += t || (/^data\:|\?/.test(r) || n ? "": ".js"),
					r = ("/" === r.charAt(0) || r.match(/^[\w\+\.\-]+:/) ? "": _.baseUrl) + r
				}
				return _.urlArgs ? r + (( - 1 === r.indexOf("?") ? "?": "&") + _.urlArgs) : r
			},
			load: function(e, t) {
				req.load(w, e, t)
			},
			execCb: function(e, t, n, i) {
				return t.apply(i, n)
			},
			onScriptLoad: function(e) {
				if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
					interactiveScript = null;
					var t = g(e);
					w.completeLoad(t.id)
				}
			},
			onScriptError: function(e) {
				var t = g(e);
				return s(t.id) ? void 0 : c(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
			}
		},
		w.require = w.makeRequire(),
		w
	}
	function getInteractiveScript() {
		return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript: (eachReverse(scripts(),
		function(e) {
			return "interactive" === e.readyState ? interactiveScript = e: void 0
		}), interactiveScript)
	}
	var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.20",
	commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
	cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
	jsSuffixRegExp = /\.js$/,
	currDirRegExp = /^\.\//,
	op = Object.prototype,
	ostring = op.toString,
	hasOwn = op.hasOwnProperty,
	ap = Array.prototype,
	isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
	isWebWorker = !isBrowser && "undefined" != typeof importScripts,
	readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/: /^(complete|loaded)$/,
	defContextName = "_",
	isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
	contexts = {},
	cfg = {},
	globalDefQueue = [],
	useInteractive = !1;
	if ("undefined" == typeof define) {
		if ("undefined" != typeof requirejs) {
			if (isFunction(requirejs)) return;
			cfg = requirejs,
			requirejs = void 0
		}
		"undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0),
		req = requirejs = function(e, t, n, i) {
			var s, o, a = defContextName;
			return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = i) : e = []),
			o && o.context && (a = o.context),
			s = getOwn(contexts, a),
			s || (s = contexts[a] = req.s.newContext(a)),
			o && s.configure(o),
			s.require(e, t, n)
		},
		req.config = function(e) {
			return req(e)
		},
		req.nextTick = "undefined" != typeof setTimeout ?
		function(e) {
			setTimeout(e, 4)
		}: function(e) {
			e()
		},
		require || (require = req),
		req.version = version,
		req.jsExtRegExp = /^\/|:|\?|\.js$/,
		req.isBrowser = isBrowser,
		s = req.s = {
			contexts: contexts,
			newContext: newContext
		},
		req({}),
		each(["toUrl", "undef", "defined", "specified"],
		function(e) {
			req[e] = function() {
				var t = contexts[defContextName];
				return t.require[e].apply(t, arguments)
			}
		}),
		isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)),
		req.onError = defaultOnError,
		req.createNode = function(e, t, n) {
			var i = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
			return i.type = e.scriptType || "text/javascript",
			i.charset = "utf-8",
			i.async = !0,
			i
		},
		req.load = function(e, t, n) {
			var i, s = e && e.config || {};
			if (isBrowser) return i = req.createNode(s, t, n),
			s.onNodeCreated && s.onNodeCreated(i, s, t, n),
			i.setAttribute("data-requirecontext", e.contextName),
			i.setAttribute("data-requiremodule", t),
			!i.attachEvent || i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)),
			i.src = n,
			currentlyAddingScript = i,
			baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i),
			currentlyAddingScript = null,
			i;
			if (isWebWorker) try {
				importScripts(n),
				e.completeLoad(t)
			} catch(o) {
				e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
			}
		},
		isBrowser && !cfg.skipDataMain && eachReverse(scripts(),
		function(e) {
			return head || (head = e.parentNode),
			dataMain = e.getAttribute("data-main"),
			dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/": "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
		}),
		define = function(e, t, n) {
			var i, s;
			"string" != typeof e && (n = t, t = e, e = null),
			isArray(t) || (n = t, t = null),
			!t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp,
			function(e, n) {
				t.push(n)
			}), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))),
			useInteractive && (i = currentlyAddingScript || getInteractiveScript(), i && (e || (e = i.getAttribute("data-requiremodule")), s = contexts[i.getAttribute("data-requirecontext")])),
			s ? (s.defQueue.push([e, t, n]), s.defQueueMap[e] = !0) : globalDefQueue.push([e, t, n])
		},
		define.amd = {
			jQuery: !0
		},
		req.exec = function(text) {
			return eval(text)
		},
		req(cfg)
	}
} (this),
function(e, t) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	}: t(e)
} ("undefined" != typeof window ? window: this,
function(e, t) {
	function n(e) {
		var t = "length" in e && e.length,
		n = se.type(e);
		return "function" === n || se.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
	}
	function i(e, t, n) {
		if (se.isFunction(t)) return se.grep(e,
		function(e, i) {
			return !! t.call(e, i, e) !== n
		});
		if (t.nodeType) return se.grep(e,
		function(e) {
			return e === t !== n
		});
		if ("string" == typeof t) {
			if (he.test(t)) return se.filter(t, e, n);
			t = se.filter(t, e)
		}
		return se.grep(e,
		function(e) {
			return se.inArray(e, t) >= 0 !== n
		})
	}
	function s(e, t) {
		do e = e[t];
		while (e && 1 !== e.nodeType);
		return e
	}
	function o(e) {
		var t = we[e] = {};
		return se.each(e.match(ye) || [],
		function(e, n) {
			t[n] = !0
		}),
		t
	}
	function a() {
		fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", r, !1), e.removeEventListener("load", r, !1)) : (fe.detachEvent("onreadystatechange", r), e.detachEvent("onload", r))
	}
	function r() { (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (a(), se.ready())
	}
	function l(e, t, n) {
		if (void 0 === n && 1 === e.nodeType) {
			var i = "data-" + t.replace(Te, "-$1").toLowerCase();
			if (n = e.getAttribute(i), "string" == typeof n) {
				try {
					n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null: +n + "" === n ? +n: Ce.test(n) ? se.parseJSON(n) : n
				} catch(s) {}
				se.data(e, t, n)
			} else n = void 0
		}
		return n
	}
	function c(e) {
		var t;
		for (t in e) if (("data" !== t || !se.isEmptyObject(e[t])) && "toJSON" !== t) return ! 1;
		return ! 0
	}
	function d(e, t, n, i) {
		if (se.acceptData(e)) {
			var s, o, a = se.expando,
			r = e.nodeType,
			l = r ? se.cache: e,
			c = r ? e[a] : e[a] && a;
			if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = r ? e[a] = V.pop() || se.guid++:a),
			l[c] || (l[c] = r ? {}: {
				toJSON: se.noop
			}),
			("object" == typeof t || "function" == typeof t) && (i ? l[c] = se.extend(l[c], t) : l[c].data = se.extend(l[c].data, t)),
			o = l[c],
			i || (o.data || (o.data = {}), o = o.data),
			void 0 !== n && (o[se.camelCase(t)] = n),
			"string" == typeof t ? (s = o[t], null == s && (s = o[se.camelCase(t)])) : s = o,
			s
		}
	}
	function u(e, t, n) {
		if (se.acceptData(e)) {
			var i, s, o = e.nodeType,
			a = o ? se.cache: e,
			r = o ? e[se.expando] : se.expando;
			if (a[r]) {
				if (t && (i = n ? a[r] : a[r].data)) {
					se.isArray(t) ? t = t.concat(se.map(t, se.camelCase)) : t in i ? t = [t] : (t = se.camelCase(t), t = t in i ? [t] : t.split(" ")),
					s = t.length;
					for (; s--;) delete i[t[s]];
					if (n ? !c(i) : !se.isEmptyObject(i)) return
				} (n || (delete a[r].data, c(a[r]))) && (o ? se.cleanData([e], !0) : ne.deleteExpando || a != a.window ? delete a[r] : a[r] = null)
			}
		}
	}
	function h() {
		return ! 0
	}
	function p() {
		return ! 1
	}
	function f() {
		try {
			return fe.activeElement
		} catch(e) {}
	}
	function m(e) {
		var t = qe.split("|"),
		n = e.createDocumentFragment();
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function g(e, t) {
		var n, i, s = 0,
		o = typeof e.getElementsByTagName !== _e ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== _e ? e.querySelectorAll(t || "*") : void 0;
		if (!o) for (o = [], n = e.childNodes || e; null != (i = n[s]); s++) ! t || se.nodeName(i, t) ? o.push(i) : se.merge(o, g(i, t));
		return void 0 === t || t && se.nodeName(e, t) ? se.merge([e], o) : o
	}
	function v(e) {
		Le.test(e.type) && (e.defaultChecked = e.checked)
	}
	function b(e, t) {
		return se.nodeName(e, "table") && se.nodeName(11 !== t.nodeType ? t: t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}
	function y(e) {
		return e.type = (null !== se.find.attr(e, "type")) + "/" + e.type,
		e
	}
	function w(e) {
		var t = Qe.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"),
		e
	}
	function x(e, t) {
		for (var n, i = 0; null != (n = e[i]); i++) se._data(n, "globalEval", !t || se._data(t[i], "globalEval"))
	}
	function $(e, t) {
		if (1 === t.nodeType && se.hasData(e)) {
			var n, i, s, o = se._data(e),
			a = se._data(t, o),
			r = o.events;
			if (r) {
				delete a.handle,
				a.events = {};
				for (n in r) for (i = 0, s = r[n].length; s > i; i++) se.event.add(t, n, r[n][i])
			}
			a.data && (a.data = se.extend({},
			a.data))
		}
	}
	function _(e, t) {
		var n, i, s;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[se.expando]) {
				s = se._data(t);
				for (i in s.events) se.removeEvent(t, i, s.handle);
				t.removeAttribute(se.expando)
			}
			"script" === n && t.text !== e.text ? (y(t).text = e.text, w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !se.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Le.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected: ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}
	function C(t, n) {
		var i, s = se(n.createElement(t)).appendTo(n.body),
		o = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(s[0])) ? i.display: se.css(s[0], "display");
		return s.detach(),
		o
	}
	function T(e) {
		var t = fe,
		n = Ze[e];
		return n || (n = C(e, t), "none" !== n && n || (Ke = (Ke || se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ke[0].contentWindow || Ke[0].contentDocument).document, t.write(), t.close(), n = C(e, t), Ke.detach()), Ze[e] = n),
		n
	}
	function I(e, t) {
		return {
			get: function() {
				var n = e();
				if (null != n) return n ? void delete this.get: (this.get = t).apply(this, arguments)
			}
		}
	}
	function S(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, s = ht.length; s--;) if (t = ht[s] + n, t in e) return t;
		return i
	}
	function D(e, t) {
		for (var n, i, s, o = [], a = 0, r = e.length; r > a; a++) i = e[a],
		i.style && (o[a] = se._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && De(i) && (o[a] = se._data(i, "olddisplay", T(i.nodeName)))) : (s = De(i), (n && "none" !== n || !s) && se._data(i, "olddisplay", s ? n: se.css(i, "display"))));
		for (a = 0; r > a; a++) i = e[a],
		i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "": "none"));
		return e
	}
	function k(e, t, n) {
		var i = lt.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	}
	function L(e, t, n, i, s) {
		for (var o = n === (i ? "border": "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += se.css(e, n + Se[o], !0, s)),
		i ? ("content" === n && (a -= se.css(e, "padding" + Se[o], !0, s)), "margin" !== n && (a -= se.css(e, "border" + Se[o] + "Width", !0, s))) : (a += se.css(e, "padding" + Se[o], !0, s), "padding" !== n && (a += se.css(e, "border" + Se[o] + "Width", !0, s)));
		return a
	}
	function N(e, t, n) {
		var i = !0,
		s = "width" === t ? e.offsetWidth: e.offsetHeight,
		o = et(e),
		a = ne.boxSizing && "border-box" === se.css(e, "boxSizing", !1, o);
		if (0 >= s || null == s) {
			if (s = tt(e, t, o), (0 > s || null == s) && (s = e.style[t]), it.test(s)) return s;
			i = a && (ne.boxSizingReliable() || s === e.style[t]),
			s = parseFloat(s) || 0
		}
		return s + L(e, t, n || (a ? "border": "content"), i, o) + "px"
	}
	function E(e, t, n, i, s) {
		return new E.prototype.init(e, t, n, i, s)
	}
	function j() {
		return setTimeout(function() {
			pt = void 0
		}),
		pt = se.now()
	}
	function M(e, t) {
		var n, i = {
			height: e
		},
		s = 0;
		for (t = t ? 1 : 0; 4 > s; s += 2 - t) n = Se[s],
		i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e),
		i
	}
	function A(e, t, n) {
		for (var i, s = (yt[t] || []).concat(yt["*"]), o = 0, a = s.length; a > o; o++) if (i = s[o].call(n, t, e)) return i
	}
	function q(e, t, n) {
		var i, s, o, a, r, l, c, d, u = this,
		h = {},
		p = e.style,
		f = e.nodeType && De(e),
		m = se._data(e, "fxshow");
		n.queue || (r = se._queueHooks(e, "fx"), null == r.unqueued && (r.unqueued = 0, l = r.empty.fire, r.empty.fire = function() {
			r.unqueued || l()
		}), r.unqueued++, u.always(function() {
			u.always(function() {
				r.unqueued--,
				se.queue(e, "fx").length || r.empty.fire()
			})
		})),
		1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = se.css(e, "display"), d = "none" === c ? se._data(e, "olddisplay") || T(e.nodeName) : c, "inline" === d && "none" === se.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== T(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
		n.overflow && (p.overflow = "hidden", ne.shrinkWrapBlocks() || u.always(function() {
			p.overflow = n.overflow[0],
			p.overflowX = n.overflow[1],
			p.overflowY = n.overflow[2]
		}));
		for (i in t) if (s = t[i], mt.exec(s)) {
			if (delete t[i], o = o || "toggle" === s, s === (f ? "hide": "show")) {
				if ("show" !== s || !m || void 0 === m[i]) continue;
				f = !0
			}
			h[i] = m && m[i] || se.style(e, i)
		} else c = void 0;
		if (se.isEmptyObject(h))"inline" === ("none" === c ? T(e.nodeName) : c) && (p.display = c);
		else {
			m ? "hidden" in m && (f = m.hidden) : m = se._data(e, "fxshow", {}),
			o && (m.hidden = !f),
			f ? se(e).show() : u.done(function() {
				se(e).hide()
			}),
			u.done(function() {
				var t;
				se._removeData(e, "fxshow");
				for (t in h) se.style(e, t, h[t])
			});
			for (i in h) a = A(f ? m[i] : 0, i, u),
			i in m || (m[i] = a.start, f && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
		}
	}
	function O(e, t) {
		var n, i, s, o, a;
		for (n in e) if (i = se.camelCase(n), s = t[i], o = e[n], se.isArray(o) && (s = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = se.cssHooks[i], a && "expand" in a) {
			o = a.expand(o),
			delete e[i];
			for (n in o) n in e || (e[n] = o[n], t[n] = s)
		} else t[i] = s
	}
	function H(e, t, n) {
		var i, s, o = 0,
		a = bt.length,
		r = se.Deferred().always(function() {
			delete l.elem
		}),
		l = function() {
			if (s) return ! 1;
			for (var t = pt || j(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, o = 1 - i, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(o);
			return r.notifyWith(e, [c, o, n]),
			1 > o && l ? n: (r.resolveWith(e, [c]), !1)
		},
		c = r.promise({
			elem: e,
			props: se.extend({},
			t),
			opts: se.extend(!0, {
				specialEasing: {}
			},
			n),
			originalProperties: t,
			originalOptions: n,
			startTime: pt || j(),
			duration: n.duration,
			tweens: [],
			createTween: function(t, n) {
				var i = se.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
				return c.tweens.push(i),
				i
			},
			stop: function(t) {
				var n = 0,
				i = t ? c.tweens.length: 0;
				if (s) return this;
				for (s = !0; i > n; n++) c.tweens[n].run(1);
				return t ? r.resolveWith(e, [c, t]) : r.rejectWith(e, [c, t]),
				this
			}
		}),
		d = c.props;
		for (O(d, c.opts.specialEasing); a > o; o++) if (i = bt[o].call(c, e, d, c.opts)) return i;
		return se.map(d, A, c),
		se.isFunction(c.opts.start) && c.opts.start.call(e, c),
		se.fx.timer(se.extend(l, {
			elem: e,
			anim: c,
			queue: c.opts.queue
		})),
		c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
	}
	function P(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var i, s = 0,
			o = t.toLowerCase().match(ye) || [];
			if (se.isFunction(n)) for (; i = o[s++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
		}
	}
	function B(e, t, n, i) {
		function s(r) {
			var l;
			return o[r] = !0,
			se.each(e[r] || [],
			function(e, r) {
				var c = r(t, n, i);
				return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), s(c), !1)
			}),
			l
		}
		var o = {},
		a = e === zt;
		return s(t.dataTypes[0]) || !o["*"] && s("*")
	}
	function F(e, t) {
		var n, i, s = se.ajaxSettings.flatOptions || {};
		for (i in t) void 0 !== t[i] && ((s[i] ? e: n || (n = {}))[i] = t[i]);
		return n && se.extend(!0, e, n),
		e
	}
	function R(e, t, n) {
		for (var i, s, o, a, r = e.contents,
		l = e.dataTypes;
		"*" === l[0];) l.shift(),
		void 0 === s && (s = e.mimeType || t.getResponseHeader("Content-Type"));
		if (s) for (a in r) if (r[a] && r[a].test(s)) {
			l.unshift(a);
			break
		}
		if (l[0] in n) o = l[0];
		else {
			for (a in n) {
				if (!l[0] || e.converters[a + " " + l[0]]) {
					o = a;
					break
				}
				i || (i = a)
			}
			o = o || i
		}
		return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
	}
	function z(e, t, n, i) {
		var s, o, a, r, l, c = {},
		d = e.dataTypes.slice();
		if (d[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
		for (o = d.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = d.shift()) if ("*" === o) o = l;
		else if ("*" !== l && l !== o) {
			if (a = c[l + " " + o] || c["* " + o], !a) for (s in c) if (r = s.split(" "), r[1] === o && (a = c[l + " " + r[0]] || c["* " + r[0]])) {
				a === !0 ? a = c[s] : c[s] !== !0 && (o = r[0], d.unshift(r[1]));
				break
			}
			if (a !== !0) if (a && e["throws"]) t = a(t);
			else try {
				t = a(t)
			} catch(u) {
				return {
					state: "parsererror",
					error: a ? u: "No conversion from " + l + " to " + o
				}
			}
		}
		return {
			state: "success",
			data: t
		}
	}
	function U(e, t, n, i) {
		var s;
		if (se.isArray(t)) se.each(t,
		function(t, s) {
			n || Qt.test(e) ? i(e, s) : U(e + "[" + ("object" == typeof s ? t: "") + "]", s, n, i)
		});
		else if (n || "object" !== se.type(t)) i(e, t);
		else for (s in t) U(e + "[" + s + "]", t[s], n, i)
	}
	function W() {
		try {
			return new e.XMLHttpRequest
		} catch(t) {}
	}
	function G() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch(t) {}
	}
	function Q(e) {
		return se.isWindow(e) ? e: 9 === e.nodeType ? e.defaultView || e.parentWindow: !1
	}
	var V = [],
	J = V.slice,
	X = V.concat,
	Y = V.push,
	K = V.indexOf,
	Z = {},
	ee = Z.toString,
	te = Z.hasOwnProperty,
	ne = {},
	ie = "1.11.3",
	se = function(e, t) {
		return new se.fn.init(e, t)
	},
	oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	ae = /^-ms-/,
	re = /-([\da-z])/gi,
	le = function(e, t) {
		return t.toUpperCase()
	};
	se.fn = se.prototype = {
		jquery: ie,
		constructor: se,
		selector: "",
		length: 0,
		toArray: function() {
			return J.call(this)
		},
		get: function(e) {
			return null != e ? 0 > e ? this[e + this.length] : this[e] : J.call(this)
		},
		pushStack: function(e) {
			var t = se.merge(this.constructor(), e);
			return t.prevObject = this,
			t.context = this.context,
			t
		},
		each: function(e, t) {
			return se.each(this, e, t)
		},
		map: function(e) {
			return this.pushStack(se.map(this,
			function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return this.pushStack(J.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq( - 1)
		},
		eq: function(e) {
			var t = this.length,
			n = +e + (0 > e ? t: 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: Y,
		sort: V.sort,
		splice: V.splice
	},
	se.extend = se.fn.extend = function() {
		var e, t, n, i, s, o, a = arguments[0] || {},
		r = 1,
		l = arguments.length,
		c = !1;
		for ("boolean" == typeof a && (c = a, a = arguments[r] || {},
		r++), "object" == typeof a || se.isFunction(a) || (a = {}), r === l && (a = this, r--); l > r; r++) if (null != (s = arguments[r])) for (i in s) e = a[i],
		n = s[i],
		a !== n && (c && n && (se.isPlainObject(n) || (t = se.isArray(n))) ? (t ? (t = !1, o = e && se.isArray(e) ? e: []) : o = e && se.isPlainObject(e) ? e: {},
		a[i] = se.extend(c, o, n)) : void 0 !== n && (a[i] = n));
		return a
	},
	se.extend({
		expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isFunction: function(e) {
			return "function" === se.type(e)
		},
		isArray: Array.isArray ||
		function(e) {
			return "array" === se.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return ! se.isArray(e) && e - parseFloat(e) + 1 >= 0
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return ! 1;
			return ! 0
		},
		isPlainObject: function(e) {
			var t;
			if (!e || "object" !== se.type(e) || e.nodeType || se.isWindow(e)) return ! 1;
			try {
				if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
			} catch(n) {
				return ! 1
			}
			if (ne.ownLast) for (t in e) return te.call(e, t);
			for (t in e);
			return void 0 === t || te.call(e, t)
		},
		type: function(e) {
			return null == e ? e + "": "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object": typeof e
		},
		globalEval: function(t) {
			t && se.trim(t) && (e.execScript ||
			function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(ae, "ms-").replace(re, le)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, i) {
			var s, o = 0,
			a = e.length,
			r = n(e);
			if (i) {
				if (r) for (; a > o && (s = t.apply(e[o], i), s !== !1); o++);
				else for (o in e) if (s = t.apply(e[o], i), s === !1) break
			} else if (r) for (; a > o && (s = t.call(e[o], o, e[o]), s !== !1); o++);
			else for (o in e) if (s = t.call(e[o], o, e[o]), s === !1) break;
			return e
		},
		trim: function(e) {
			return null == e ? "": (e + "").replace(oe, "")
		},
		makeArray: function(e, t) {
			var i = t || [];
			return null != e && (n(Object(e)) ? se.merge(i, "string" == typeof e ? [e] : e) : Y.call(i, e)),
			i
		},
		inArray: function(e, t, n) {
			var i;
			if (t) {
				if (K) return K.call(t, e, n);
				for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n: 0; i > n; n++) if (n in t && t[n] === e) return n
			}
			return - 1
		},
		merge: function(e, t) {
			for (var n = +t.length,
			i = 0,
			s = e.length; n > i;) e[s++] = t[i++];
			if (n !== n) for (; void 0 !== t[i];) e[s++] = t[i++];
			return e.length = s,
			e
		},
		grep: function(e, t, n) {
			for (var i, s = [], o = 0, a = e.length, r = !n; a > o; o++) i = !t(e[o], o),
			i !== r && s.push(e[o]);
			return s
		},
		map: function(e, t, i) {
			var s, o = 0,
			a = e.length,
			r = n(e),
			l = [];
			if (r) for (; a > o; o++) s = t(e[o], o, i),
			null != s && l.push(s);
			else for (o in e) s = t(e[o], o, i),
			null != s && l.push(s);
			return X.apply([], l)
		},
		guid: 1,
		proxy: function(e, t) {
			var n, i, s;
			return "string" == typeof t && (s = e[t], t = e, e = s),
			se.isFunction(e) ? (n = J.call(arguments, 2), i = function() {
				return e.apply(t || this, n.concat(J.call(arguments)))
			},
			i.guid = e.guid = e.guid || se.guid++, i) : void 0
		},
		now: function() {
			return + new Date
		},
		support: ne
	}),
	se.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
	function(e, t) {
		Z["[object " + t + "]"] = t.toLowerCase()
	});
	var ce = function(e) {
		function t(e, t, n, i) {
			var s, o, a, r, l, c, u, p, f, m;
			if ((t ? t.ownerDocument || t: B) !== E && N(t), t = t || E, n = n || [], r = t.nodeType, "string" != typeof e || !e || 1 !== r && 9 !== r && 11 !== r) return n;
			if (!i && M) {
				if (11 !== r && (s = be.exec(e))) if (a = s[1]) {
					if (9 === r) {
						if (o = t.getElementById(a), !o || !o.parentNode) return n;
						if (o.id === a) return n.push(o),
						n
					} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && H(t, o) && o.id === a) return n.push(o),
					n
				} else {
					if (s[2]) return K.apply(n, t.getElementsByTagName(e)),
					n;
					if ((a = s[3]) && x.getElementsByClassName) return K.apply(n, t.getElementsByClassName(a)),
					n
				}
				if (x.qsa && (!A || !A.test(e))) {
					if (p = u = P, f = t, m = 1 !== r && e, 1 === r && "object" !== t.nodeName.toLowerCase()) {
						for (c = T(e), (u = t.getAttribute("id")) ? p = u.replace(we, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", l = c.length; l--;) c[l] = p + h(c[l]);
						f = ye.test(e) && d(t.parentNode) || t,
						m = c.join(",")
					}
					if (m) try {
						return K.apply(n, f.querySelectorAll(m)),
						n
					} catch(g) {} finally {
						u || t.removeAttribute("id")
					}
				}
			}
			return S(e.replace(le, "$1"), t, n, i)
		}
		function n() {
			function e(n, i) {
				return t.push(n + " ") > $.cacheLength && delete e[t.shift()],
				e[n + " "] = i
			}
			var t = [];
			return e
		}
		function i(e) {
			return e[P] = !0,
			e
		}
		function s(e) {
			var t = E.createElement("div");
			try {
				return !! e(t)
			} catch(n) {
				return ! 1
			} finally {
				t.parentNode && t.parentNode.removeChild(t),
				t = null
			}
		}
		function o(e, t) {
			for (var n = e.split("|"), i = e.length; i--;) $.attrHandle[n[i]] = t
		}
		function a(e, t) {
			var n = t && e,
			i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Q) - (~e.sourceIndex || Q);
			if (i) return i;
			if (n) for (; n = n.nextSibling;) if (n === t) return - 1;
			return e ? 1 : -1
		}
		function r(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e
			}
		}
		function l(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}
		function c(e) {
			return i(function(t) {
				return t = +t,
				i(function(n, i) {
					for (var s, o = e([], n.length, t), a = o.length; a--;) n[s = o[a]] && (n[s] = !(i[s] = n[s]))
				})
			})
		}
		function d(e) {
			return e && "undefined" != typeof e.getElementsByTagName && e
		}
		function u() {}
		function h(e) {
			for (var t = 0,
			n = e.length,
			i = ""; n > t; t++) i += e[t].value;
			return i
		}
		function p(e, t, n) {
			var i = t.dir,
			s = n && "parentNode" === i,
			o = R++;
			return t.first ?
			function(t, n, o) {
				for (; t = t[i];) if (1 === t.nodeType || s) return e(t, n, o)
			}: function(t, n, a) {
				var r, l, c = [F, o];
				if (a) {
					for (; t = t[i];) if ((1 === t.nodeType || s) && e(t, n, a)) return ! 0
				} else for (; t = t[i];) if (1 === t.nodeType || s) {
					if (l = t[P] || (t[P] = {}), (r = l[i]) && r[0] === F && r[1] === o) return c[2] = r[2];
					if (l[i] = c, c[2] = e(t, n, a)) return ! 0
				}
			}
		}
		function f(e) {
			return e.length > 1 ?
			function(t, n, i) {
				for (var s = e.length; s--;) if (!e[s](t, n, i)) return ! 1;
				return ! 0
			}: e[0]
		}
		function m(e, n, i) {
			for (var s = 0,
			o = n.length; o > s; s++) t(e, n[s], i);
			return i
		}
		function g(e, t, n, i, s) {
			for (var o, a = [], r = 0, l = e.length, c = null != t; l > r; r++)(o = e[r]) && (!n || n(o, i, s)) && (a.push(o), c && t.push(r));
			return a
		}
		function v(e, t, n, s, o, a) {
			return s && !s[P] && (s = v(s)),
			o && !o[P] && (o = v(o, a)),
			i(function(i, a, r, l) {
				var c, d, u, h = [],
				p = [],
				f = a.length,
				v = i || m(t || "*", r.nodeType ? [r] : r, []),
				b = !e || !i && t ? v: g(v, h, e, r, l),
				y = n ? o || (i ? e: f || s) ? [] : a: b;
				if (n && n(b, y, r, l), s) for (c = g(y, p), s(c, [], r, l), d = c.length; d--;)(u = c[d]) && (y[p[d]] = !(b[p[d]] = u));
				if (i) {
					if (o || e) {
						if (o) {
							for (c = [], d = y.length; d--;)(u = y[d]) && c.push(b[d] = u);
							o(null, y = [], c, l)
						}
						for (d = y.length; d--;)(u = y[d]) && (c = o ? ee(i, u) : h[d]) > -1 && (i[c] = !(a[c] = u))
					}
				} else y = g(y === a ? y.splice(f, y.length) : y),
				o ? o(null, a, y, l) : K.apply(a, y)
			})
		}
		function b(e) {
			for (var t, n, i, s = e.length,
			o = $.relative[e[0].type], a = o || $.relative[" "], r = o ? 1 : 0, l = p(function(e) {
				return e === t
			},
			a, !0), c = p(function(e) {
				return ee(t, e) > -1
			},
			a, !0), d = [function(e, n, i) {
				var s = !o && (i || n !== D) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
				return t = null,
				s
			}]; s > r; r++) if (n = $.relative[e[r].type]) d = [p(f(d), n)];
			else {
				if (n = $.filter[e[r].type].apply(null, e[r].matches), n[P]) {
					for (i = ++r; s > i && !$.relative[e[i].type]; i++);
					return v(r > 1 && f(d), r > 1 && h(e.slice(0, r - 1).concat({
						value: " " === e[r - 2].type ? "*": ""
					})).replace(le, "$1"), n, i > r && b(e.slice(r, i)), s > i && b(e = e.slice(i)), s > i && h(e))
				}
				d.push(n)
			}
			return f(d)
		}
		function y(e, n) {
			var s = n.length > 0,
			o = e.length > 0,
			a = function(i, a, r, l, c) {
				var d, u, h, p = 0,
				f = "0",
				m = i && [],
				v = [],
				b = D,
				y = i || o && $.find.TAG("*", c),
				w = F += null == b ? 1 : Math.random() || .1,
				x = y.length;
				for (c && (D = a !== E && a); f !== x && null != (d = y[f]); f++) {
					if (o && d) {
						for (u = 0; h = e[u++];) if (h(d, a, r)) {
							l.push(d);
							break
						}
						c && (F = w)
					}
					s && ((d = !h && d) && p--, i && m.push(d))
				}
				if (p += f, s && f !== p) {
					for (u = 0; h = n[u++];) h(m, v, a, r);
					if (i) {
						if (p > 0) for (; f--;) m[f] || v[f] || (v[f] = X.call(l));
						v = g(v)
					}
					K.apply(l, v),
					c && !i && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
				}
				return c && (F = w, D = b),
				m
			};
			return s ? i(a) : a
		}
		var w, x, $, _, C, T, I, S, D, k, L, N, E, j, M, A, q, O, H, P = "sizzle" + 1 * new Date,
		B = e.document,
		F = 0,
		R = 0,
		z = n(),
		U = n(),
		W = n(),
		G = function(e, t) {
			return e === t && (L = !0),
			0
		},
		Q = 1 << 31,
		V = {}.hasOwnProperty,
		J = [],
		X = J.pop,
		Y = J.push,
		K = J.push,
		Z = J.slice,
		ee = function(e, t) {
			for (var n = 0,
			i = e.length; i > n; n++) if (e[n] === t) return n;
			return - 1
		},
		te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
		ne = "[\\x20\\t\\r\\n\\f]",
		ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
		se = ie.replace("w", "w#"),
		oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + se + "))|)" + ne + "*\\]",
		ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
		re = new RegExp(ne + "+", "g"),
		le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
		ce = new RegExp("^" + ne + "*," + ne + "*"),
		de = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
		ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
		he = new RegExp(ae),
		pe = new RegExp("^" + se + "$"),
		fe = {
			ID: new RegExp("^#(" + ie + ")"),
			CLASS: new RegExp("^\\.(" + ie + ")"),
			TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
			ATTR: new RegExp("^" + oe),
			PSEUDO: new RegExp("^" + ae),
			CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
			bool: new RegExp("^(?:" + te + ")$", "i"),
			needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
		},
		me = /^(?:input|select|textarea|button)$/i,
		ge = /^h\d$/i,
		ve = /^[^{]+\{\s*\[native \w/,
		be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		ye = /[+~]/,
		we = /'|\\/g,
		xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
		$e = function(e, t, n) {
			var i = "0x" + t - 65536;
			return i !== i || n ? t: 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
		},
		_e = function() {
			N()
		};
		try {
			K.apply(J = Z.call(B.childNodes), B.childNodes),
			J[B.childNodes.length].nodeType
		} catch(Ce) {
			K = {
				apply: J.length ?
				function(e, t) {
					Y.apply(e, Z.call(t))
				}: function(e, t) {
					for (var n = e.length,
					i = 0; e[n++] = t[i++];);
					e.length = n - 1
				}
			}
		}
		x = t.support = {},
		C = t.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName: !1
		},
		N = t.setDocument = function(e) {
			var t, n, i = e ? e.ownerDocument || e: B;
			return i !== E && 9 === i.nodeType && i.documentElement ? (E = i, j = i.documentElement, n = i.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", _e, !1) : n.attachEvent && n.attachEvent("onunload", _e)), M = !C(i), x.attributes = s(function(e) {
				return e.className = "i",
				!e.getAttribute("className")
			}), x.getElementsByTagName = s(function(e) {
				return e.appendChild(i.createComment("")),
				!e.getElementsByTagName("*").length
			}), x.getElementsByClassName = ve.test(i.getElementsByClassName), x.getById = s(function(e) {
				return j.appendChild(e).id = P,
				!i.getElementsByName || !i.getElementsByName(P).length
			}), x.getById ? ($.find.ID = function(e, t) {
				if ("undefined" != typeof t.getElementById && M) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			},
			$.filter.ID = function(e) {
				var t = e.replace(xe, $e);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (delete $.find.ID, $.filter.ID = function(e) {
				var t = e.replace(xe, $e);
				return function(e) {
					var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), $.find.TAG = x.getElementsByTagName ?
			function(e, t) {
				return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
			}: function(e, t) {
				var n, i = [],
				s = 0,
				o = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; n = o[s++];) 1 === n.nodeType && i.push(n);
					return i
				}
				return o
			},
			$.find.CLASS = x.getElementsByClassName &&
			function(e, t) {
				return M ? t.getElementsByClassName(e) : void 0
			},
			q = [], A = [], (x.qsa = ve.test(i.querySelectorAll)) && (s(function(e) {
				j.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\f]' msallowcapture=''><option selected=''></option></select>",
				e.querySelectorAll("[msallowcapture^='']").length && A.push("[*^$]=" + ne + "*(?:''|\"\")"),
				e.querySelectorAll("[selected]").length || A.push("\\[" + ne + "*(?:value|" + te + ")"),
				e.querySelectorAll("[id~=" + P + "-]").length || A.push("~="),
				e.querySelectorAll(":checked").length || A.push(":checked"),
				e.querySelectorAll("a#" + P + "+*").length || A.push(".#.+[+~]")
			}), s(function(e) {
				var t = i.createElement("input");
				t.setAttribute("type", "hidden"),
				e.appendChild(t).setAttribute("name", "D"),
				e.querySelectorAll("[name=d]").length && A.push("name" + ne + "*[*^$|!~]?="),
				e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"),
				e.querySelectorAll("*,:x"),
				A.push(",.*:")
			})), (x.matchesSelector = ve.test(O = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && s(function(e) {
				x.disconnectedMatch = O.call(e, "div"),
				O.call(e, "[s!='']:x"),
				q.push("!=", ae)
			}), A = A.length && new RegExp(A.join("|")), q = q.length && new RegExp(q.join("|")), t = ve.test(j.compareDocumentPosition), H = t || ve.test(j.contains) ?
			function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement: e,
				i = t && t.parentNode;
				return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
			}: function(e, t) {
				if (t) for (; t = t.parentNode;) if (t === e) return ! 0;
				return ! 1
			},
			G = t ?
			function(e, t) {
				if (e === t) return L = !0,
				0;
				var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
				return n ? n: (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === B && H(B, e) ? -1 : t === i || t.ownerDocument === B && H(B, t) ? 1 : k ? ee(k, e) - ee(k, t) : 0 : 4 & n ? -1 : 1)
			}: function(e, t) {
				if (e === t) return L = !0,
				0;
				var n, s = 0,
				o = e.parentNode,
				r = t.parentNode,
				l = [e],
				c = [t];
				if (!o || !r) return e === i ? -1 : t === i ? 1 : o ? -1 : r ? 1 : k ? ee(k, e) - ee(k, t) : 0;
				if (o === r) return a(e, t);
				for (n = e; n = n.parentNode;) l.unshift(n);
				for (n = t; n = n.parentNode;) c.unshift(n);
				for (; l[s] === c[s];) s++;
				return s ? a(l[s], c[s]) : l[s] === B ? -1 : c[s] === B ? 1 : 0
			},
			i) : E
		},
		t.matches = function(e, n) {
			return t(e, null, null, n)
		},
		t.matchesSelector = function(e, n) {
			if ((e.ownerDocument || e) !== E && N(e), n = n.replace(ue, "='$1']"), !(!x.matchesSelector || !M || q && q.test(n) || A && A.test(n))) try {
				var i = O.call(e, n);
				if (i || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
			} catch(s) {}
			return t(n, E, null, [e]).length > 0
		},
		t.contains = function(e, t) {
			return (e.ownerDocument || e) !== E && N(e),
			H(e, t)
		},
		t.attr = function(e, t) { (e.ownerDocument || e) !== E && N(e);
			var n = $.attrHandle[t.toLowerCase()],
			i = n && V.call($.attrHandle, t.toLowerCase()) ? n(e, t, !M) : void 0;
			return void 0 !== i ? i: x.attributes || !M ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value: null
		},
		t.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		},
		t.uniqueSort = function(e) {
			var t, n = [],
			i = 0,
			s = 0;
			if (L = !x.detectDuplicates, k = !x.sortStable && e.slice(0), e.sort(G), L) {
				for (; t = e[s++];) t === e[s] && (i = n.push(s));
				for (; i--;) e.splice(n[i], 1)
			}
			return k = null,
			e
		},
		_ = t.getText = function(e) {
			var t, n = "",
			i = 0,
			s = e.nodeType;
			if (s) {
				if (1 === s || 9 === s || 11 === s) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += _(e)
				} else if (3 === s || 4 === s) return e.nodeValue
			} else for (; t = e[i++];) n += _(t);
			return n
		},
		$ = t.selectors = {
			cacheLength: 50,
			createPseudo: i,
			match: fe,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(xe, $e),
					e[3] = (e[3] || e[4] || e[5] || "").replace(xe, $e),
					"~=" === e[2] && (e[3] = " " + e[3] + " "),
					e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(),
					"nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
					e
				},
				PSEUDO: function(e) {
					var t, n = !e[6] && e[2];
					return fe.CHILD.test(e[0]) ? null: (e[3] ? e[2] = e[4] || e[5] || "": n && he.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					var t = e.replace(xe, $e).toLowerCase();
					return "*" === e ?
					function() {
						return ! 0
					}: function(e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				CLASS: function(e) {
					var t = z[e + " "];
					return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e,
					function(e) {
						return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, n, i) {
					return function(s) {
						var o = t.attr(s, e);
						return null == o ? "!=" === n: n ? (o += "", "=" === n ? o === i: "!=" === n ? o !== i: "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice( - i.length) === i: "~=" === n ? (" " + o.replace(re, " ") + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-": !1) : !0
					}
				},
				CHILD: function(e, t, n, i, s) {
					var o = "nth" !== e.slice(0, 3),
					a = "last" !== e.slice( - 4),
					r = "of-type" === t;
					return 1 === i && 0 === s ?
					function(e) {
						return !! e.parentNode
					}: function(t, n, l) {
						var c, d, u, h, p, f, m = o !== a ? "nextSibling": "previousSibling",
						g = t.parentNode,
						v = r && t.nodeName.toLowerCase(),
						b = !l && !r;
						if (g) {
							if (o) {
								for (; m;) {
									for (u = t; u = u[m];) if (r ? u.nodeName.toLowerCase() === v: 1 === u.nodeType) return ! 1;
									f = m = "only" === e && !f && "nextSibling"
								}
								return ! 0
							}
							if (f = [a ? g.firstChild: g.lastChild], a && b) {
								for (d = g[P] || (g[P] = {}), c = d[e] || [], p = c[0] === F && c[1], h = c[0] === F && c[2], u = p && g.childNodes[p]; u = ++p && u && u[m] || (h = p = 0) || f.pop();) if (1 === u.nodeType && ++h && u === t) {
									d[e] = [F, p, h];
									break
								}
							} else if (b && (c = (t[P] || (t[P] = {}))[e]) && c[0] === F) h = c[1];
							else for (; (u = ++p && u && u[m] || (h = p = 0) || f.pop()) && ((r ? u.nodeName.toLowerCase() !== v: 1 !== u.nodeType) || !++h || (b && ((u[P] || (u[P] = {}))[e] = [F, h]), u !== t)););
							return h -= s,
							h === i || h % i === 0 && h / i >= 0
						}
					}
				},
				PSEUDO: function(e, n) {
					var s, o = $.pseudos[e] || $.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
					return o[P] ? o(n) : o.length > 1 ? (s = [e, e, "", n], $.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
						for (var i, s = o(e, n), a = s.length; a--;) i = ee(e, s[a]),
						e[i] = !(t[i] = s[a])
					}) : function(e) {
						return o(e, 0, s)
					}) : o
				}
			},
			pseudos: {
				not: i(function(e) {
					var t = [],
					n = [],
					s = I(e.replace(le, "$1"));
					return s[P] ? i(function(e, t, n, i) {
						for (var o, a = s(e, null, i, []), r = e.length; r--;)(o = a[r]) && (e[r] = !(t[r] = o))
					}) : function(e, i, o) {
						return t[0] = e,
						s(t, null, o, n),
						t[0] = null,
						!n.pop()
					}
				}),
				has: i(function(e) {
					return function(n) {
						return t(e, n).length > 0
					}
				}),
				contains: i(function(e) {
					return e = e.replace(xe, $e),
					function(t) {
						return (t.textContent || t.innerText || _(t)).indexOf(e) > -1
					}
				}),
				lang: i(function(e) {
					return pe.test(e || "") || t.error("unsupported lang: " + e),
					e = e.replace(xe, $e).toLowerCase(),
					function(t) {
						var n;
						do
						if (n = M ? t.lang: t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
						n === e || 0 === n.indexOf(e + "-");
						while ((t = t.parentNode) && 1 === t.nodeType);
						return ! 1
					}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root: function(e) {
					return e === j
				},
				focus: function(e) {
					return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !!e.checked || "option" === t && !!e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex,
					e.selected === !0
				},
				empty: function(e) {
					for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return ! 1;
					return ! 0
				},
				parent: function(e) {
					return ! $.pseudos.empty(e)
				},
				header: function(e) {
					return ge.test(e.nodeName)
				},
				input: function(e) {
					return me.test(e.nodeName)
				},
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text: function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
				},
				first: c(function() {
					return [0]
				}),
				last: c(function(e, t) {
					return [t - 1]
				}),
				eq: c(function(e, t, n) {
					return [0 > n ? n + t: n]
				}),
				even: c(function(e, t) {
					for (var n = 0; t > n; n += 2) e.push(n);
					return e
				}),
				odd: c(function(e, t) {
					for (var n = 1; t > n; n += 2) e.push(n);
					return e
				}),
				lt: c(function(e, t, n) {
					for (var i = 0 > n ? n + t: n; --i >= 0;) e.push(i);
					return e
				}),
				gt: c(function(e, t, n) {
					for (var i = 0 > n ? n + t: n; ++i < t;) e.push(i);
					return e
				})
			}
		},
		$.pseudos.nth = $.pseudos.eq;
		for (w in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) $.pseudos[w] = r(w);
		for (w in {
			submit: !0,
			reset: !0
		}) $.pseudos[w] = l(w);
		return u.prototype = $.filters = $.pseudos,
		$.setFilters = new u,
		T = t.tokenize = function(e, n) {
			var i, s, o, a, r, l, c, d = U[e + " "];
			if (d) return n ? 0 : d.slice(0);
			for (r = e, l = [], c = $.preFilter; r;) { (!i || (s = ce.exec(r))) && (s && (r = r.slice(s[0].length) || r), l.push(o = [])),
				i = !1,
				(s = de.exec(r)) && (i = s.shift(), o.push({
					value: i,
					type: s[0].replace(le, " ")
				}), r = r.slice(i.length));
				for (a in $.filter) ! (s = fe[a].exec(r)) || c[a] && !(s = c[a](s)) || (i = s.shift(), o.push({
					value: i,
					type: a,
					matches: s
				}), r = r.slice(i.length));
				if (!i) break
			}
			return n ? r.length: r ? t.error(e) : U(e, l).slice(0)
		},
		I = t.compile = function(e, t) {
			var n, i = [],
			s = [],
			o = W[e + " "];
			if (!o) {
				for (t || (t = T(e)), n = t.length; n--;) o = b(t[n]),
				o[P] ? i.push(o) : s.push(o);
				o = W(e, y(s, i)),
				o.selector = e
			}
			return o
		},
		S = t.select = function(e, t, n, i) {
			var s, o, a, r, l, c = "function" == typeof e && e,
			u = !i && T(e = c.selector || e);
			if (n = n || [], 1 === u.length) {
				if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === t.nodeType && M && $.relative[o[1].type]) {
					if (t = ($.find.ID(a.matches[0].replace(xe, $e), t) || [])[0], !t) return n;
					c && (t = t.parentNode),
					e = e.slice(o.shift().value.length)
				}
				for (s = fe.needsContext.test(e) ? 0 : o.length; s--&&(a = o[s], !$.relative[r = a.type]);) if ((l = $.find[r]) && (i = l(a.matches[0].replace(xe, $e), ye.test(o[0].type) && d(t.parentNode) || t))) {
					if (o.splice(s, 1), e = i.length && h(o), !e) return K.apply(n, i),
					n;
					break
				}
			}
			return (c || I(e, u))(i, t, !M, n, ye.test(e) && d(t.parentNode) || t),
			n
		},
		x.sortStable = P.split("").sort(G).join("") === P,
		x.detectDuplicates = !!L,
		N(),
		x.sortDetached = s(function(e) {
			return 1 & e.compareDocumentPosition(E.createElement("div"))
		}),
		s(function(e) {
			return e.innerHTML = "<a href='#'></a>",
			"#" === e.firstChild.getAttribute("href")
		}) || o("type|href|height|width",
		function(e, t, n) {
			return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}),
		x.attributes && s(function(e) {
			return e.innerHTML = "<input/>",
			e.firstChild.setAttribute("value", ""),
			"" === e.firstChild.getAttribute("value")
		}) || o("value",
		function(e, t, n) {
			return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
		}),
		s(function(e) {
			return null == e.getAttribute("disabled")
		}) || o(te,
		function(e, t, n) {
			var i;
			return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value: null
		}),
		t
	} (e);
	se.find = ce,
	se.expr = ce.selectors,
	se.expr[":"] = se.expr.pseudos,
	se.unique = ce.uniqueSort,
	se.text = ce.getText,
	se.isXMLDoc = ce.isXML,
	se.contains = ce.contains;
	var de = se.expr.match.needsContext,
	ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	he = /^.[^:#\[\.,]*$/;
	se.filter = function(e, t, n) {
		var i = t[0];
		return n && (e = ":not(" + e + ")"),
		1 === t.length && 1 === i.nodeType ? se.find.matchesSelector(i, e) ? [i] : [] : se.find.matches(e, se.grep(t,
		function(e) {
			return 1 === e.nodeType
		}))
	},
	se.fn.extend({
		find: function(e) {
			var t, n = [],
			i = this,
			s = i.length;
			if ("string" != typeof e) return this.pushStack(se(e).filter(function() {
				for (t = 0; s > t; t++) if (se.contains(i[t], this)) return ! 0
			}));
			for (t = 0; s > t; t++) se.find(e, i[t], n);
			return n = this.pushStack(s > 1 ? se.unique(n) : n),
			n.selector = this.selector ? this.selector + " " + e: e,
			n
		},
		filter: function(e) {
			return this.pushStack(i(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(i(this, e || [], !0))
		},
		is: function(e) {
			return !! i(this, "string" == typeof e && de.test(e) ? se(e) : e || [], !1).length
		}
	});
	var pe, fe = e.document,
	me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	ge = se.fn.init = function(e, t) {
		var n, i;
		if (!e) return this;
		if ("string" == typeof e) {
			if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e), !n || !n[1] && t) return ! t || t.jquery ? (t || pe).find(e) : this.constructor(t).find(e);
			if (n[1]) {
				if (t = t instanceof se ? t[0] : t, se.merge(this, se.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t: fe, !0)), ue.test(n[1]) && se.isPlainObject(t)) for (n in t) se.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
				return this
			}
			if (i = fe.getElementById(n[2]), i && i.parentNode) {
				if (i.id !== n[2]) return pe.find(e);
				this.length = 1,
				this[0] = i
			}
			return this.context = fe,
			this.selector = e,
			this
		}
		return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : se.isFunction(e) ? "undefined" != typeof pe.ready ? pe.ready(e) : e(se) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), se.makeArray(e, this))
	};
	ge.prototype = se.fn,
	pe = se(fe);
	var ve = /^(?:parents|prev(?:Until|All))/,
	be = {
		children: !0,
		contents: !0,
		next: !0,
		prev: !0
	};
	se.extend({
		dir: function(e, t, n) {
			for (var i = [], s = e[t]; s && 9 !== s.nodeType && (void 0 === n || 1 !== s.nodeType || !se(s).is(n));) 1 === s.nodeType && i.push(s),
			s = s[t];
			return i
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	}),
	se.fn.extend({
		has: function(e) {
			var t, n = se(e, this),
			i = n.length;
			return this.filter(function() {
				for (t = 0; i > t; t++) if (se.contains(this, n[t])) return ! 0
			})
		},
		closest: function(e, t) {
			for (var n, i = 0,
			s = this.length,
			o = [], a = de.test(e) || "string" != typeof e ? se(e, t || this.context) : 0; s > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && se.find.matchesSelector(n, e))) {
				o.push(n);
				break
			}
			return this.pushStack(o.length > 1 ? se.unique(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? se.inArray(this[0], se(e)) : se.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
		},
		add: function(e, t) {
			return this.pushStack(se.unique(se.merge(this.get(), se(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject: this.prevObject.filter(e))
		}
	}),
	se.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t: null
		},
		parents: function(e) {
			return se.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return se.dir(e, "parentNode", n)
		},
		next: function(e) {
			return s(e, "nextSibling")
		},
		prev: function(e) {
			return s(e, "previousSibling")
		},
		nextAll: function(e) {
			return se.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return se.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return se.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return se.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return se.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return se.sibling(e.firstChild)
		},
		contents: function(e) {
			return se.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: se.merge([], e.childNodes)
		}
	},
	function(e, t) {
		se.fn[e] = function(n, i) {
			var s = se.map(this, t, n);
			return "Until" !== e.slice( - 5) && (i = n),
			i && "string" == typeof i && (s = se.filter(i, s)),
			this.length > 1 && (be[e] || (s = se.unique(s)), ve.test(e) && (s = s.reverse())),
			this.pushStack(s)
		}
	});
	var ye = /\S+/g,
	we = {};
	se.Callbacks = function(e) {
		e = "string" == typeof e ? we[e] || o(e) : se.extend({},
		e);
		var t, n, i, s, a, r, l = [],
		c = !e.once && [],
		d = function(o) {
			for (n = e.memory && o, i = !0, a = r || 0, r = 0, s = l.length, t = !0; l && s > a; a++) if (l[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
				n = !1;
				break
			}
			t = !1,
			l && (c ? c.length && d(c.shift()) : n ? l = [] : u.disable())
		},
		u = {
			add: function() {
				if (l) {
					var i = l.length; !
					function o(t) {
						se.each(t,
						function(t, n) {
							var i = se.type(n);
							"function" === i ? e.unique && u.has(n) || l.push(n) : n && n.length && "string" !== i && o(n)
						})
					} (arguments),
					t ? s = l.length: n && (r = i, d(n))
				}
				return this
			},
			remove: function() {
				return l && se.each(arguments,
				function(e, n) {
					for (var i; (i = se.inArray(n, l, i)) > -1;) l.splice(i, 1),
					t && (s >= i && s--, a >= i && a--)
				}),
				this
			},
			has: function(e) {
				return e ? se.inArray(e, l) > -1 : !(!l || !l.length)
			},
			empty: function() {
				return l = [],
				s = 0,
				this
			},
			disable: function() {
				return l = c = n = void 0,
				this
			},
			disabled: function() {
				return ! l
			},
			lock: function() {
				return c = void 0,
				n || u.disable(),
				this
			},
			locked: function() {
				return ! c
			},
			fireWith: function(e, n) {
				return ! l || i && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : d(n)),
				this
			},
			fire: function() {
				return u.fireWith(this, arguments),
				this
			},
			fired: function() {
				return !! i
			}
		};
		return u
	},
	se.extend({
		Deferred: function(e) {
			var t = [["resolve", "done", se.Callbacks("once memory"), "resolved"], ["reject", "fail", se.Callbacks("once memory"), "rejected"], ["notify", "progress", se.Callbacks("memory")]],
			n = "pending",
			i = {
				state: function() {
					return n
				},
				always: function() {
					return s.done(arguments).fail(arguments),
					this
				},
				then: function() {
					var e = arguments;
					return se.Deferred(function(n) {
						se.each(t,
						function(t, o) {
							var a = se.isFunction(e[t]) && e[t];
							s[o[1]](function() {
								var e = a && a.apply(this, arguments);
								e && se.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
							})
						}),
						e = null
					}).promise()
				},
				promise: function(e) {
					return null != e ? se.extend(e, i) : i
				}
			},
			s = {};
			return i.pipe = i.then,
			se.each(t,
			function(e, o) {
				var a = o[2],
				r = o[3];
				i[o[1]] = a.add,
				r && a.add(function() {
					n = r
				},
				t[1 ^ e][2].disable, t[2][2].lock),
				s[o[0]] = function() {
					return s[o[0] + "With"](this === s ? i: this, arguments),
					this
				},
				s[o[0] + "With"] = a.fireWith
			}),
			i.promise(s),
			e && e.call(s, s),
			s
		},
		when: function(e) {
			var t, n, i, s = 0,
			o = J.call(arguments),
			a = o.length,
			r = 1 !== a || e && se.isFunction(e.promise) ? a: 0,
			l = 1 === r ? e: se.Deferred(),
			c = function(e, n, i) {
				return function(s) {
					n[e] = this,
					i[e] = arguments.length > 1 ? J.call(arguments) : s,
					i === t ? l.notifyWith(n, i) : --r || l.resolveWith(n, i)
				}
			};
			if (a > 1) for (t = new Array(a), n = new Array(a), i = new Array(a); a > s; s++) o[s] && se.isFunction(o[s].promise) ? o[s].promise().done(c(s, i, o)).fail(l.reject).progress(c(s, n, t)) : --r;
			return r || l.resolveWith(i, o),
			l.promise()
		}
	});
	var xe;
	se.fn.ready = function(e) {
		return se.ready.promise().done(e),
		this
	},
	se.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? se.readyWait++:se.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? !--se.readyWait: !se.isReady) {
				if (!fe.body) return setTimeout(se.ready);
				se.isReady = !0,
				e !== !0 && --se.readyWait > 0 || (xe.resolveWith(fe, [se]), se.fn.triggerHandler && (se(fe).triggerHandler("ready"), se(fe).off("ready")))
			}
		}
	}),
	se.ready.promise = function(t) {
		if (!xe) if (xe = se.Deferred(), "complete" === fe.readyState) setTimeout(se.ready);
		else if (fe.addEventListener) fe.addEventListener("DOMContentLoaded", r, !1),
		e.addEventListener("load", r, !1);
		else {
			fe.attachEvent("onreadystatechange", r),
			e.attachEvent("onload", r);
			var n = !1;
			try {
				n = null == e.frameElement && fe.documentElement
			} catch(i) {}
			n && n.doScroll && !
			function s() {
				if (!se.isReady) {
					try {
						n.doScroll("left")
					} catch(e) {
						return setTimeout(s, 50)
					}
					a(),
					se.ready()
				}
			} ()
		}
		return xe.promise(t)
	};
	var $e, _e = "undefined";
	for ($e in se(ne)) break;
	ne.ownLast = "0" !== $e,
	ne.inlineBlockNeedsLayout = !1,
	se(function() {
		var e, t, n, i;
		n = fe.getElementsByTagName("body")[0],
		n && n.style && (t = fe.createElement("div"), i = fe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== _e && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
	}),
	function() {
		var e = fe.createElement("div");
		if (null == ne.deleteExpando) {
			ne.deleteExpando = !0;
			try {
				delete e.test
			} catch(t) {
				ne.deleteExpando = !1
			}
		}
		e = null
	} (),
	se.acceptData = function(e) {
		var t = se.noData[(e.nodeName + " ").toLowerCase()],
		n = +e.nodeType || 1;
		return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
	};
	var Ce = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	Te = /([A-Z])/g;
	se.extend({
		cache: {},
		noData: {
			"applet ": !0,
			"embed ": !0,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(e) {
			return e = e.nodeType ? se.cache[e[se.expando]] : e[se.expando],
			!!e && !c(e)
		},
		data: function(e, t, n) {
			return d(e, t, n)
		},
		removeData: function(e, t) {
			return u(e, t)
		},
		_data: function(e, t, n) {
			return d(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return u(e, t, !0)
		}
	}),
	se.fn.extend({
		data: function(e, t) {
			var n, i, s, o = this[0],
			a = o && o.attributes;
			if (void 0 === e) {
				if (this.length && (s = se.data(o), 1 === o.nodeType && !se._data(o, "parsedAttrs"))) {
					for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = se.camelCase(i.slice(5)), l(o, i, s[i])));
					se._data(o, "parsedAttrs", !0)
				}
				return s
			}
			return "object" == typeof e ? this.each(function() {
				se.data(this, e)
			}) : arguments.length > 1 ? this.each(function() {
				se.data(this, e, t)
			}) : o ? l(o, e, se.data(o, e)) : void 0
		},
		removeData: function(e) {
			return this.each(function() {
				se.removeData(this, e)
			})
		}
	}),
	se.extend({
		queue: function(e, t, n) {
			var i;
			return e ? (t = (t || "fx") + "queue", i = se._data(e, t), n && (!i || se.isArray(n) ? i = se._data(e, t, se.makeArray(n)) : i.push(n)), i || []) : void 0
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = se.queue(e, t),
			i = n.length,
			s = n.shift(),
			o = se._queueHooks(e, t),
			a = function() {
				se.dequeue(e, t)
			};
			"inprogress" === s && (s = n.shift(), i--),
			s && ("fx" === t && n.unshift("inprogress"), delete o.stop, s.call(e, a, o)),
			!i && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return se._data(e, n) || se._data(e, n, {
				empty: se.Callbacks("once memory").add(function() {
					se._removeData(e, t + "queue"),
					se._removeData(e, n)
				})
			})
		}
	}),
	se.fn.extend({
		queue: function(e, t) {
			var n = 2;
			return "string" != typeof e && (t = e, e = "fx", n--),
			arguments.length < n ? se.queue(this[0], e) : void 0 === t ? this: this.each(function() {
				var n = se.queue(this, e, t);
				se._queueHooks(this, e),
				"fx" === e && "inprogress" !== n[0] && se.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				se.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, i = 1,
			s = se.Deferred(),
			o = this,
			a = this.length,
			r = function() {--i || s.resolveWith(o, [o])
			};
			for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = se._data(o[a], e + "queueHooks"),
			n && n.empty && (i++, n.empty.add(r));
			return r(),
			s.promise(t)
		}
	});
	var Ie = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	Se = ["Top", "Right", "Bottom", "Left"],
	De = function(e, t) {
		return e = t || e,
		"none" === se.css(e, "display") || !se.contains(e.ownerDocument, e)
	},
	ke = se.access = function(e, t, n, i, s, o, a) {
		var r = 0,
		l = e.length,
		c = null == n;
		if ("object" === se.type(n)) {
			s = !0;
			for (r in n) se.access(e, t, r, n[r], !0, o, a)
		} else if (void 0 !== i && (s = !0, se.isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
			return c.call(se(e), n)
		})), t)) for (; l > r; r++) t(e[r], n, a ? i: i.call(e[r], r, t(e[r], n)));
		return s ? e: c ? t.call(e) : l ? t(e[0], n) : o
	},
	Le = /^(?:checkbox|radio)$/i; !
	function() {
		var e = fe.createElement("input"),
		t = fe.createElement("div"),
		n = fe.createDocumentFragment();
		if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick",
		function() {
			ne.noCloneEvent = !1
		}), t.cloneNode(!0).click()), null == ne.deleteExpando) {
			ne.deleteExpando = !0;
			try {
				delete t.test
			} catch(i) {
				ne.deleteExpando = !1
			}
		}
	} (),
	function() {
		var t, n, i = fe.createElement("div");
		for (t in {
			submit: !0,
			change: !0,
			focusin: !0
		}) n = "on" + t,
		(ne[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ne[t + "Bubbles"] = i.attributes[n].expando === !1);
		i = null
	} ();
	var Ne = /^(?:input|select|textarea)$/i,
	Ee = /^key/,
	je = /^(?:mouse|pointer|contextmenu)|click/,
	Me = /^(?:focusinfocus|focusoutblur)$/,
	Ae = /^([^.]*)(?:\.(.+)|)$/;
	se.event = {
		global: {},
		add: function(e, t, n, i, s) {
			var o, a, r, l, c, d, u, h, p, f, m, g = se._data(e);
			if (g) {
				for (n.handler && (l = n, n = l.handler, s = l.selector), n.guid || (n.guid = se.guid++), (a = g.events) || (a = g.events = {}), (d = g.handle) || (d = g.handle = function(e) {
					return typeof se === _e || e && se.event.triggered === e.type ? void 0 : se.event.dispatch.apply(d.elem, arguments)
				},
				d.elem = e), t = (t || "").match(ye) || [""], r = t.length; r--;) o = Ae.exec(t[r]) || [],
				p = m = o[1],
				f = (o[2] || "").split(".").sort(),
				p && (c = se.event.special[p] || {},
				p = (s ? c.delegateType: c.bindType) || p, c = se.event.special[p] || {},
				u = se.extend({
					type: p,
					origType: m,
					data: i,
					handler: n,
					guid: n.guid,
					selector: s,
					needsContext: s && se.expr.match.needsContext.test(s),
					namespace: f.join(".")
				},
				l), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, c.setup && c.setup.call(e, i, f, d) !== !1 || (e.addEventListener ? e.addEventListener(p, d, !1) : e.attachEvent && e.attachEvent("on" + p, d))), c.add && (c.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), s ? h.splice(h.delegateCount++, 0, u) : h.push(u), se.event.global[p] = !0);
				e = null
			}
		},
		remove: function(e, t, n, i, s) {
			var o, a, r, l, c, d, u, h, p, f, m, g = se.hasData(e) && se._data(e);
			if (g && (d = g.events)) {
				for (t = (t || "").match(ye) || [""], c = t.length; c--;) if (r = Ae.exec(t[c]) || [], p = m = r[1], f = (r[2] || "").split(".").sort(), p) {
					for (u = se.event.special[p] || {},
					p = (i ? u.delegateType: u.bindType) || p, h = d[p] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--;) a = h[o],
					!s && m !== a.origType || n && n.guid !== a.guid || r && !r.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (h.splice(o, 1), a.selector && h.delegateCount--, u.remove && u.remove.call(e, a));
					l && !h.length && (u.teardown && u.teardown.call(e, f, g.handle) !== !1 || se.removeEvent(e, p, g.handle), delete d[p])
				} else for (p in d) se.event.remove(e, p + t[c], n, i, !0);
				se.isEmptyObject(d) && (delete g.handle, se._removeData(e, "events"))
			}
		},
		trigger: function(t, n, i, s) {
			var o, a, r, l, c, d, u, h = [i || fe],
			p = te.call(t, "type") ? t.type: t,
			f = te.call(t, "namespace") ? t.namespace.split(".") : [];
			if (r = d = i = i || fe, 3 !== i.nodeType && 8 !== i.nodeType && !Me.test(p + se.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[se.expando] ? t: new se.Event(p, "object" == typeof t && t), t.isTrigger = s ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : se.makeArray(n, [t]), c = se.event.special[p] || {},
			s || !c.trigger || c.trigger.apply(i, n) !== !1)) {
				if (!s && !c.noBubble && !se.isWindow(i)) {
					for (l = c.delegateType || p, Me.test(l + p) || (r = r.parentNode); r; r = r.parentNode) h.push(r),
					d = r;
					d === (i.ownerDocument || fe) && h.push(d.defaultView || d.parentWindow || e)
				}
				for (u = 0; (r = h[u++]) && !t.isPropagationStopped();) t.type = u > 1 ? l: c.bindType || p,
				o = (se._data(r, "events") || {})[t.type] && se._data(r, "handle"),
				o && o.apply(r, n),
				o = a && r[a],
				o && o.apply && se.acceptData(r) && (t.result = o.apply(r, n), t.result === !1 && t.preventDefault());
				if (t.type = p, !s && !t.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), n) === !1) && se.acceptData(i) && a && i[p] && !se.isWindow(i)) {
					d = i[a],
					d && (i[a] = null),
					se.event.triggered = p;
					try {
						i[p]()
					} catch(m) {}
					se.event.triggered = void 0,
					d && (i[a] = d)
				}
				return t.result
			}
		},
		dispatch: function(e) {
			e = se.event.fix(e);
			var t, n, i, s, o, a = [],
			r = J.call(arguments),
			l = (se._data(this, "events") || {})[e.type] || [],
			c = se.event.special[e.type] || {};
			if (r[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				for (a = se.event.handlers.call(this, e, l), t = 0; (s = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = s.elem, o = 0; (i = s.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((se.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, r), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, e),
				e.result
			}
		},
		handlers: function(e, t) {
			var n, i, s, o, a = [],
			r = t.delegateCount,
			l = e.target;
			if (r && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
				for (s = [], o = 0; r > o; o++) i = t[o],
				n = i.selector + " ",
				void 0 === s[n] && (s[n] = i.needsContext ? se(n, this).index(l) >= 0 : se.find(n, this, null, [l]).length),
				s[n] && s.push(i);
				s.length && a.push({
					elem: l,
					handlers: s
				})
			}
			return r < t.length && a.push({
				elem: this,
				handlers: t.slice(r)
			}),
			a
		},
		fix: function(e) {
			if (e[se.expando]) return e;
			var t, n, i, s = e.type,
			o = e,
			a = this.fixHooks[s];
			for (a || (this.fixHooks[s] = a = je.test(s) ? this.mouseHooks: Ee.test(s) ? this.keyHooks: {}), i = a.props ? this.props.concat(a.props) : this.props, e = new se.Event(o), t = i.length; t--;) n = i[t],
			e[n] = o[n];
			return e.target || (e.target = o.srcElement || fe),
			3 === e.target.nodeType && (e.target = e.target.parentNode),
			e.metaKey = !!e.metaKey,
			a.filter ? a.filter(e, o) : e
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
				e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, t) {
				var n, i, s, o = t.button,
				a = t.fromElement;
				return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || fe, s = i.documentElement, n = i.body, e.pageX = t.clientX + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s && s.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (s && s.scrollTop || n && n.scrollTop || 0) - (s && s.clientTop || n && n.clientTop || 0)),
				!e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement: a),
				e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
				e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== f() && this.focus) try {
						return this.focus(),
						!1
					} catch(e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === f() && this.blur ? (this.blur(), !1) : void 0
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					return se.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
				},
				_default: function(e) {
					return se.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, i) {
			var s = se.extend(new se.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			i ? se.event.trigger(s, null, t) : se.event.dispatch.call(t, s),
			s.isDefaultPrevented() && n.preventDefault()
		}
	},
	se.removeEvent = fe.removeEventListener ?
	function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	}: function(e, t, n) {
		var i = "on" + t;
		e.detachEvent && (typeof e[i] === _e && (e[i] = null), e.detachEvent(i, n))
	},
	se.Event = function(e, t) {
		return this instanceof se.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? h: p) : this.type = e, t && se.extend(this, t), this.timeStamp = e && e.timeStamp || se.now(), void(this[se.expando] = !0)) : new se.Event(e, t)
	},
	se.Event.prototype = {
		isDefaultPrevented: p,
		isPropagationStopped: p,
		isImmediatePropagationStopped: p,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = h,
			e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = h,
			e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = h,
			e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
			this.stopPropagation()
		}
	},
	se.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	},
	function(e, t) {
		se.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, i = this,
				s = e.relatedTarget,
				o = e.handleObj;
				return (!s || s !== i && !se.contains(i, s)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
				n
			}
		}
	}),
	ne.submitBubbles || (se.event.special.submit = {
		setup: function() {
			return se.nodeName(this, "form") ? !1 : void se.event.add(this, "click._submit keypress._submit",
			function(e) {
				var t = e.target,
				n = se.nodeName(t, "input") || se.nodeName(t, "button") ? t.form: void 0;
				n && !se._data(n, "submitBubbles") && (se.event.add(n, "submit._submit",
				function(e) {
					e._submit_bubble = !0
				}), se._data(n, "submitBubbles", !0))
			})
		},
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && se.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function() {
			return se.nodeName(this, "form") ? !1 : void se.event.remove(this, "._submit")
		}
	}),
	ne.changeBubbles || (se.event.special.change = {
		setup: function() {
			return Ne.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (se.event.add(this, "propertychange._change",
			function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), se.event.add(this, "click._change",
			function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1),
				se.event.simulate("change", this, e, !0)
			})), !1) : void se.event.add(this, "beforeactivate._change",
			function(e) {
				var t = e.target;
				Ne.test(t.nodeName) && !se._data(t, "changeBubbles") && (se.event.add(t, "change._change",
				function(e) { ! this.parentNode || e.isSimulated || e.isTrigger || se.event.simulate("change", this.parentNode, e, !0)
				}), se._data(t, "changeBubbles", !0))
			})
		},
		handle: function(e) {
			var t = e.target;
			return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
		},
		teardown: function() {
			return se.event.remove(this, "._change"),
			!Ne.test(this.nodeName)
		}
	}),
	ne.focusinBubbles || se.each({
		focus: "focusin",
		blur: "focusout"
	},
	function(e, t) {
		var n = function(e) {
			se.event.simulate(t, e.target, se.event.fix(e), !0)
		};
		se.event.special[t] = {
			setup: function() {
				var i = this.ownerDocument || this,
				s = se._data(i, t);
				s || i.addEventListener(e, n, !0),
				se._data(i, t, (s || 0) + 1)
			},
			teardown: function() {
				var i = this.ownerDocument || this,
				s = se._data(i, t) - 1;
				s ? se._data(i, t, s) : (i.removeEventListener(e, n, !0), se._removeData(i, t))
			}
		}
	}),
	se.fn.extend({
		on: function(e, t, n, i, s) {
			var o, a;
			if ("object" == typeof e) {
				"string" != typeof t && (n = n || t, t = void 0);
				for (o in e) this.on(o, t, n, e[o], s);
				return this
			}
			if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = p;
			else if (!i) return this;
			return 1 === s && (a = i, i = function(e) {
				return se().off(e),
				a.apply(this, arguments)
			},
			i.guid = a.guid || (a.guid = se.guid++)),
			this.each(function() {
				se.event.add(this, e, i, n, t)
			})
		},
		one: function(e, t, n, i) {
			return this.on(e, t, n, i, 1)
		},
		off: function(e, t, n) {
			var i, s;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
			se(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace: i.origType, i.selector, i.handler),
			this;
			if ("object" == typeof e) {
				for (s in e) this.off(s, t, e[s]);
				return this
			}
			return (t === !1 || "function" == typeof t) && (n = t, t = void 0),
			n === !1 && (n = p),
			this.each(function() {
				se.event.remove(this, e, n, t)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				se.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			return n ? se.event.trigger(e, t, n, !0) : void 0
		}
	});
	var qe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	Oe = / jQuery\d+="(?:null|\d+)"/g,
	He = new RegExp("<(?:" + qe + ")[\\s/>]", "i"),
	Pe = /^\s+/,
	Be = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	Fe = /<([\w:]+)/,
	Re = /<tbody/i,
	ze = /<|&#?\w+;/,
	Ue = /<(?:script|style|link)/i,
	We = /checked\s*(?:[^=]|=\s*.checked.)/i,
	Ge = /^$|\/(?:java|ecma)script/i,
	Qe = /^true\/(.*)/,
	Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	Je = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		area: [1, "<map>", "</map>"],
		param: [1, "<object>", "</object>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	},
	Xe = m(fe),
	Ye = Xe.appendChild(fe.createElement("div"));
	Je.optgroup = Je.option,
	Je.tbody = Je.tfoot = Je.colgroup = Je.caption = Je.thead,
	Je.th = Je.td,
	se.extend({
		clone: function(e, t, n) {
			var i, s, o, a, r, l = se.contains(e.ownerDocument, e);
			if (ne.html5Clone || se.isXMLDoc(e) || !He.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Ye.innerHTML = e.outerHTML, Ye.removeChild(o = Ye.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || se.isXMLDoc(e))) for (i = g(o), r = g(e), a = 0; null != (s = r[a]); ++a) i[a] && _(s, i[a]);
			if (t) if (n) for (r = r || g(e), i = i || g(o), a = 0; null != (s = r[a]); a++) $(s, i[a]);
			else $(e, o);
			return i = g(o, "script"),
			i.length > 0 && x(i, !l && g(e, "script")),
			i = r = s = null,
			o
		},
		buildFragment: function(e, t, n, i) {
			for (var s, o, a, r, l, c, d, u = e.length,
			h = m(t), p = [], f = 0; u > f; f++) if (o = e[f], o || 0 === o) if ("object" === se.type(o)) se.merge(p, o.nodeType ? [o] : o);
			else if (ze.test(o)) {
				for (r = r || h.appendChild(t.createElement("div")), l = (Fe.exec(o) || ["", ""])[1].toLowerCase(), d = Je[l] || Je._default, r.innerHTML = d[1] + o.replace(Be, "<$1></$2>") + d[2], s = d[0]; s--;) r = r.lastChild;
				if (!ne.leadingWhitespace && Pe.test(o) && p.push(t.createTextNode(Pe.exec(o)[0])), !ne.tbody) for (o = "table" !== l || Re.test(o) ? "<table>" !== d[1] || Re.test(o) ? 0 : r: r.firstChild, s = o && o.childNodes.length; s--;) se.nodeName(c = o.childNodes[s], "tbody") && !c.childNodes.length && o.removeChild(c);
				for (se.merge(p, r.childNodes), r.textContent = ""; r.firstChild;) r.removeChild(r.firstChild);
				r = h.lastChild
			} else p.push(t.createTextNode(o));
			for (r && h.removeChild(r), ne.appendChecked || se.grep(g(p, "input"), v), f = 0; o = p[f++];) if ((!i || -1 === se.inArray(o, i)) && (a = se.contains(o.ownerDocument, o), r = g(h.appendChild(o), "script"), a && x(r), n)) for (s = 0; o = r[s++];) Ge.test(o.type || "") && n.push(o);
			return r = null,
			h
		},
		cleanData: function(e, t) {
			for (var n, i, s, o, a = 0,
			r = se.expando,
			l = se.cache,
			c = ne.deleteExpando,
			d = se.event.special; null != (n = e[a]); a++) if ((t || se.acceptData(n)) && (s = n[r], o = s && l[s])) {
				if (o.events) for (i in o.events) d[i] ? se.event.remove(n, i) : se.removeEvent(n, i, o.handle);
				l[s] && (delete l[s], c ? delete n[r] : typeof n.removeAttribute !== _e ? n.removeAttribute(r) : n[r] = null, V.push(s))
			}
		}
	}),
	se.fn.extend({
		text: function(e) {
			return ke(this,
			function(e) {
				return void 0 === e ? se.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(e))
			},
			null, e, arguments.length)
		},
		append: function() {
			return this.domManip(arguments,
			function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = b(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments,
			function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = b(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments,
			function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments,
			function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for (var n, i = e ? se.filter(e, this) : this, s = 0; null != (n = i[s]); s++) t || 1 !== n.nodeType || se.cleanData(g(n)),
			n.parentNode && (t && se.contains(n.ownerDocument, n) && x(g(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && se.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && se.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null == e ? !1 : e,
			t = null == t ? e: t,
			this.map(function() {
				return se.clone(this, e, t)
			})
		},
		html: function(e) {
			return ke(this,
			function(e) {
				var t = this[0] || {},
				n = 0,
				i = this.length;
				if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Oe, "") : void 0;
				if (! ("string" != typeof e || Ue.test(e) || !ne.htmlSerialize && He.test(e) || !ne.leadingWhitespace && Pe.test(e) || Je[(Fe.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(Be, "<$1></$2>");
					try {
						for (; i > n; n++) t = this[n] || {},
						1 === t.nodeType && (se.cleanData(g(t, !1)), t.innerHTML = e);
						t = 0
					} catch(s) {}
				}
				t && this.empty().append(e)
			},
			null, e, arguments.length)
		},
		replaceWith: function() {
			var e = arguments[0];
			return this.domManip(arguments,
			function(t) {
				e = this.parentNode,
				se.cleanData(g(this)),
				e && e.replaceChild(t, this)
			}),
			e && (e.length || e.nodeType) ? this: this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t) {
			e = X.apply([], e);
			var n, i, s, o, a, r, l = 0,
			c = this.length,
			d = this,
			u = c - 1,
			h = e[0],
			p = se.isFunction(h);
			if (p || c > 1 && "string" == typeof h && !ne.checkClone && We.test(h)) return this.each(function(n) {
				var i = d.eq(n);
				p && (e[0] = h.call(this, n, i.html())),
				i.domManip(e, t)
			});
			if (c && (r = se.buildFragment(e, this[0].ownerDocument, !1, this), n = r.firstChild, 1 === r.childNodes.length && (r = n), n)) {
				for (o = se.map(g(r, "script"), y), s = o.length; c > l; l++) i = r,
				l !== u && (i = se.clone(i, !0, !0), s && se.merge(o, g(i, "script"))),
				t.call(this[l], i, l);
				if (s) for (a = o[o.length - 1].ownerDocument, se.map(o, w), l = 0; s > l; l++) i = o[l],
				Ge.test(i.type || "") && !se._data(i, "globalEval") && se.contains(a, i) && (i.src ? se._evalUrl && se._evalUrl(i.src) : se.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Ve, "")));
				r = n = null
			}
			return this
		}
	}),
	se.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	},
	function(e, t) {
		se.fn[e] = function(e) {
			for (var n, i = 0,
			s = [], o = se(e), a = o.length - 1; a >= i; i++) n = i === a ? this: this.clone(!0),
			se(o[i])[t](n),
			Y.apply(s, n.get());
			return this.pushStack(s)
		}
	});
	var Ke, Ze = {}; !
	function() {
		var e;
		ne.shrinkWrapBlocks = function() {
			if (null != e) return e;
			e = !1;
			var t, n, i;
			return n = fe.getElementsByTagName("body")[0],
			n && n.style ? (t = fe.createElement("div"), i = fe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== _e && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(fe.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
		}
	} ();
	var et, tt, nt = /^margin/,
	it = new RegExp("^(" + Ie + ")(?!px)[a-z%]+$", "i"),
	st = /^(top|right|bottom|left)$/;
	e.getComputedStyle ? (et = function(t) {
		return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
	},
	tt = function(e, t, n) {
		var i, s, o, a, r = e.style;
		return n = n || et(e),
		a = n ? n.getPropertyValue(t) || n[t] : void 0,
		n && ("" !== a || se.contains(e.ownerDocument, e) || (a = se.style(e, t)), it.test(a) && nt.test(t) && (i = r.width, s = r.minWidth, o = r.maxWidth, r.minWidth = r.maxWidth = r.width = a, a = n.width, r.width = i, r.minWidth = s, r.maxWidth = o)),
		void 0 === a ? a: a + ""
	}) : fe.documentElement.currentStyle && (et = function(e) {
		return e.currentStyle
	},
	tt = function(e, t, n) {
		var i, s, o, a, r = e.style;
		return n = n || et(e),
		a = n ? n[t] : void 0,
		null == a && r && r[t] && (a = r[t]),
		it.test(a) && !st.test(t) && (i = r.left, s = e.runtimeStyle, o = s && s.left, o && (s.left = e.currentStyle.left), r.left = "fontSize" === t ? "1em": a, a = r.pixelLeft + "px", r.left = i, o && (s.left = o)),
		void 0 === a ? a: a + "" || "auto"
	}),
	function() {
		function t() {
			var t, n, i, s;
			n = fe.getElementsByTagName("body")[0],
			n && n.style && (t = fe.createElement("div"), i = fe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {
				width: "4px"
			}).width, s = t.appendChild(fe.createElement("div")), s.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", s.style.marginRight = s.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(s, null) || {}).marginRight), t.removeChild(s)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = t.getElementsByTagName("td"), s[0].style.cssText = "margin:0;border:0;padding:0;display:none", r = 0 === s[0].offsetHeight, r && (s[0].style.display = "", s[1].style.display = "none", r = 0 === s[0].offsetHeight), n.removeChild(i))
		}
		var n, i, s, o, a, r, l;
		n = fe.createElement("div"),
		n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
		s = n.getElementsByTagName("a")[0],
		i = s && s.style,
		i && (i.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === i.opacity, ne.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, se.extend(ne, {
			reliableHiddenOffsets: function() {
				return null == r && t(),
				r
			},
			boxSizingReliable: function() {
				return null == a && t(),
				a
			},
			pixelPosition: function() {
				return null == o && t(),
				o
			},
			reliableMarginRight: function() {
				return null == l && t(),
				l
			}
		}))
	} (),
	se.swap = function(e, t, n, i) {
		var s, o, a = {};
		for (o in t) a[o] = e.style[o],
		e.style[o] = t[o];
		s = n.apply(e, i || []);
		for (o in t) e.style[o] = a[o];
		return s
	};
	var ot = /alpha\([^)]*\)/i,
	at = /opacity\s*=\s*([^)]*)/,
	rt = /^(none|table(?!-c[ea]).+)/,
	lt = new RegExp("^(" + Ie + ")(.*)$", "i"),
	ct = new RegExp("^([+-])=(" + Ie + ")", "i"),
	dt = {
		position: "absolute",
		visibility: "hidden",
		display: "block"
	},
	ut = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	ht = ["Webkit", "O", "Moz", "ms"];
	se.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = tt(e, "opacity");
						return "" === n ? "1": n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": ne.cssFloat ? "cssFloat": "styleFloat"
		},
		style: function(e, t, n, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var s, o, a, r = se.camelCase(t),
				l = e.style;
				if (t = se.cssProps[r] || (se.cssProps[r] = S(l, r)), a = se.cssHooks[t] || se.cssHooks[r], void 0 === n) return a && "get" in a && void 0 !== (s = a.get(e, !1, i)) ? s: l[t];
				if (o = typeof n, "string" === o && (s = ct.exec(n)) && (n = (s[1] + 1) * s[2] + parseFloat(se.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || se.cssNumber[r] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, i))))) try {
					l[t] = n
				} catch(c) {}
			}
		},
		css: function(e, t, n, i) {
			var s, o, a, r = se.camelCase(t);
			return t = se.cssProps[r] || (se.cssProps[r] = S(e.style, r)),
			a = se.cssHooks[t] || se.cssHooks[r],
			a && "get" in a && (o = a.get(e, !0, n)),
			void 0 === o && (o = tt(e, t, i)),
			"normal" === o && t in ut && (o = ut[t]),
			"" === n || n ? (s = parseFloat(o), n === !0 || se.isNumeric(s) ? s || 0 : o) : o
		}
	}),
	se.each(["height", "width"],
	function(e, t) {
		se.cssHooks[t] = {
			get: function(e, n, i) {
				return n ? rt.test(se.css(e, "display")) && 0 === e.offsetWidth ? se.swap(e, dt,
				function() {
					return N(e, t, i)
				}) : N(e, t, i) : void 0
			},
			set: function(e, n, i) {
				var s = i && et(e);
				return k(e, n, i ? L(e, t, i, ne.boxSizing && "border-box" === se.css(e, "boxSizing", !1, s), s) : 0)
			}
		}
	}),
	ne.opacity || (se.cssHooks.opacity = {
		get: function(e, t) {
			return at.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
		},
		set: function(e, t) {
			var n = e.style,
			i = e.currentStyle,
			s = se.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")": "",
			o = i && i.filter || n.filter || "";
			n.zoom = 1,
			(t >= 1 || "" === t) && "" === se.trim(o.replace(ot, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = ot.test(o) ? o.replace(ot, s) : o + " " + s)
		}
	}),
	se.cssHooks.marginRight = I(ne.reliableMarginRight,
	function(e, t) {
		return t ? se.swap(e, {
			display: "inline-block"
		},
		tt, [e, "marginRight"]) : void 0
	}),
	se.each({
		margin: "",
		padding: "",
		border: "Width"
	},
	function(e, t) {
		se.cssHooks[e + t] = {
			expand: function(n) {
				for (var i = 0,
				s = {},
				o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) s[e + Se[i] + t] = o[i] || o[i - 2] || o[0];
				return s
			}
		},
		nt.test(e) || (se.cssHooks[e + t].set = k)
	}),
	se.fn.extend({
		css: function(e, t) {
			return ke(this,
			function(e, t, n) {
				var i, s, o = {},
				a = 0;
				if (se.isArray(t)) {
					for (i = et(e), s = t.length; s > a; a++) o[t[a]] = se.css(e, t[a], !1, i);
					return o
				}
				return void 0 !== n ? se.style(e, t, n) : se.css(e, t)
			},
			e, t, arguments.length > 1)
		},
		show: function() {
			return D(this, !0)
		},
		hide: function() {
			return D(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				De(this) ? se(this).show() : se(this).hide()
			})
		}
	}),
	se.Tween = E,
	E.prototype = {
		constructor: E,
		init: function(e, t, n, i, s, o) {
			this.elem = e,
			this.prop = n,
			this.easing = s || "swing",
			this.options = t,
			this.start = this.now = this.cur(),
			this.end = i,
			this.unit = o || (se.cssNumber[n] ? "": "px")
		},
		cur: function() {
			var e = E.propHooks[this.prop];
			return e && e.get ? e.get(this) : E.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = E.propHooks[this.prop];
			return this.pos = t = this.options.duration ? se.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
			this.now = (this.end - this.start) * t + this.start,
			this.options.step && this.options.step.call(this.elem, this.now, this),
			n && n.set ? n.set(this) : E.propHooks._default.set(this),
			this
		}
	},
	E.prototype.init.prototype = E.prototype,
	E.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = se.css(e.elem, e.prop, ""), t && "auto" !== t ? t: 0) : e.elem[e.prop]
			},
			set: function(e) {
				se.fx.step[e.prop] ? se.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[se.cssProps[e.prop]] || se.cssHooks[e.prop]) ? se.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	},
	E.propHooks.scrollTop = E.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	},
	se.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return.5 - Math.cos(e * Math.PI) / 2
		}
	},
	se.fx = E.prototype.init,
	se.fx.step = {};
	var pt, ft, mt = /^(?:toggle|show|hide)$/,
	gt = new RegExp("^(?:([+-])=|)(" + Ie + ")([a-z%]*)$", "i"),
	vt = /queueHooks$/,
	bt = [q],
	yt = {
		"*": [function(e, t) {
			var n = this.createTween(e, t),
			i = n.cur(),
			s = gt.exec(t),
			o = s && s[3] || (se.cssNumber[e] ? "": "px"),
			a = (se.cssNumber[e] || "px" !== o && +i) && gt.exec(se.css(n.elem, e)),
			r = 1,
			l = 20;
			if (a && a[3] !== o) {
				o = o || a[3],
				s = s || [],
				a = +i || 1;
				do r = r || ".5",
				a /= r,
				se.style(n.elem, e, a + o);
				while (r !== (r = n.cur() / i) && 1 !== r && --l)
			}
			return s && (a = n.start = +a || +i || 0, n.unit = o, n.end = s[1] ? a + (s[1] + 1) * s[2] : +s[2]),
			n
		}]
	};
	se.Animation = se.extend(H, {
		tweener: function(e, t) {
			se.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, i = 0,
			s = e.length; s > i; i++) n = e[i],
			yt[n] = yt[n] || [],
			yt[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? bt.unshift(e) : bt.push(e)
		}
	}),
	se.speed = function(e, t, n) {
		var i = e && "object" == typeof e ? se.extend({},
		e) : {
			complete: n || !n && t || se.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !se.isFunction(t) && t
		};
		return i.duration = se.fx.off ? 0 : "number" == typeof i.duration ? i.duration: i.duration in se.fx.speeds ? se.fx.speeds[i.duration] : se.fx.speeds._default,
		(null == i.queue || i.queue === !0) && (i.queue = "fx"),
		i.old = i.complete,
		i.complete = function() {
			se.isFunction(i.old) && i.old.call(this),
			i.queue && se.dequeue(this, i.queue)
		},
		i
	},
	se.fn.extend({
		fadeTo: function(e, t, n, i) {
			return this.filter(De).css("opacity", 0).show().end().animate({
				opacity: t
			},
			e, n, i)
		},
		animate: function(e, t, n, i) {
			var s = se.isEmptyObject(e),
			o = se.speed(t, n, i),
			a = function() {
				var t = H(this, se.extend({},
				e), o); (s || se._data(this, "finish")) && t.stop(!0)
			};
			return a.finish = a,
			s || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function(e, t, n) {
			var i = function(e) {
				var t = e.stop;
				delete e.stop,
				t(n)
			};
			return "string" != typeof e && (n = t, t = e, e = void 0),
			t && e !== !1 && this.queue(e || "fx", []),
			this.each(function() {
				var t = !0,
				s = null != e && e + "queueHooks",
				o = se.timers,
				a = se._data(this);
				if (s) a[s] && a[s].stop && i(a[s]);
				else for (s in a) a[s] && a[s].stop && vt.test(s) && i(a[s]);
				for (s = o.length; s--;) o[s].elem !== this || null != e && o[s].queue !== e || (o[s].anim.stop(n), t = !1, o.splice(s, 1)); (t || !n) && se.dequeue(this, e)
			})
		},
		finish: function(e) {
			return e !== !1 && (e = e || "fx"),
			this.each(function() {
				var t, n = se._data(this),
				i = n[e + "queue"],
				s = n[e + "queueHooks"],
				o = se.timers,
				a = i ? i.length: 0;
				for (n.finish = !0, se.queue(this, e, []), s && s.stop && s.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
				delete n.finish
			})
		}
	}),
	se.each(["toggle", "show", "hide"],
	function(e, t) {
		var n = se.fn[t];
		se.fn[t] = function(e, i, s) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, i, s)
		}
	}),
	se.each({
		slideDown: M("show"),
		slideUp: M("hide"),
		slideToggle: M("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	},
	function(e, t) {
		se.fn[e] = function(e, n, i) {
			return this.animate(t, e, n, i)
		}
	}),
	se.timers = [],
	se.fx.tick = function() {
		var e, t = se.timers,
		n = 0;
		for (pt = se.now(); n < t.length; n++) e = t[n],
		e() || t[n] !== e || t.splice(n--, 1);
		t.length || se.fx.stop(),
		pt = void 0
	},
	se.fx.timer = function(e) {
		se.timers.push(e),
		e() ? se.fx.start() : se.timers.pop()
	},
	se.fx.interval = 13,
	se.fx.start = function() {
		ft || (ft = setInterval(se.fx.tick, se.fx.interval))
	},
	se.fx.stop = function() {
		clearInterval(ft),
		ft = null
	},
	se.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	},
	se.fn.delay = function(e, t) {
		return e = se.fx ? se.fx.speeds[e] || e: e,
		t = t || "fx",
		this.queue(t,
		function(t, n) {
			var i = setTimeout(t, e);
			n.stop = function() {
				clearTimeout(i)
			}
		})
	},
	function() {
		var e, t, n, i, s;
		t = fe.createElement("div"),
		t.setAttribute("className", "t"),
		t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
		i = t.getElementsByTagName("a")[0],
		n = fe.createElement("select"),
		s = n.appendChild(fe.createElement("option")),
		e = t.getElementsByTagName("input")[0],
		i.style.cssText = "top:1px",
		ne.getSetAttribute = "t" !== t.className,
		ne.style = /top/.test(i.getAttribute("style")),
		ne.hrefNormalized = "/a" === i.getAttribute("href"),
		ne.checkOn = !!e.value,
		ne.optSelected = s.selected,
		ne.enctype = !!fe.createElement("form").enctype,
		n.disabled = !0,
		ne.optDisabled = !s.disabled,
		e = fe.createElement("input"),
		e.setAttribute("value", ""),
		ne.input = "" === e.getAttribute("value"),
		e.value = "t",
		e.setAttribute("type", "radio"),
		ne.radioValue = "t" === e.value
	} ();
	var wt = /\r/g;
	se.fn.extend({
		val: function(e) {
			var t, n, i, s = this[0]; {
				if (arguments.length) return i = se.isFunction(e),
				this.each(function(n) {
					var s;
					1 === this.nodeType && (s = i ? e.call(this, n, se(this).val()) : e, null == s ? s = "": "number" == typeof s ? s += "": se.isArray(s) && (s = se.map(s,
					function(e) {
						return null == e ? "": e + ""
					})), t = se.valHooks[this.type] || se.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, s, "value") || (this.value = s))
				});
				if (s) return t = se.valHooks[s.type] || se.valHooks[s.nodeName.toLowerCase()],
				t && "get" in t && void 0 !== (n = t.get(s, "value")) ? n: (n = s.value, "string" == typeof n ? n.replace(wt, "") : null == n ? "": n)
			}
		}
	}),
	se.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = se.find.attr(e, "value");
					return null != t ? t: se.trim(se.text(e))
				}
			},
			select: {
				get: function(e) {
					for (var t, n, i = e.options,
					s = e.selectedIndex,
					o = "select-one" === e.type || 0 > s,
					a = o ? null: [], r = o ? s + 1 : i.length, l = 0 > s ? r: o ? s: 0; r > l; l++) if (n = i[l], !(!n.selected && l !== s || (ne.optDisabled ? n.disabled: null !== n.getAttribute("disabled")) || n.parentNode.disabled && se.nodeName(n.parentNode, "optgroup"))) {
						if (t = se(n).val(), o) return t;
						a.push(t)
					}
					return a
				},
				set: function(e, t) {
					for (var n, i, s = e.options,
					o = se.makeArray(t), a = s.length; a--;) if (i = s[a], se.inArray(se.valHooks.option.get(i), o) >= 0) try {
						i.selected = n = !0
					} catch(r) {
						i.scrollHeight
					} else i.selected = !1;
					return n || (e.selectedIndex = -1),
					s
				}
			}
		}
	}),
	se.each(["radio", "checkbox"],
	function() {
		se.valHooks[this] = {
			set: function(e, t) {
				return se.isArray(t) ? e.checked = se.inArray(se(e).val(), t) >= 0 : void 0
			}
		},
		ne.checkOn || (se.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on": e.value
		})
	});
	var xt, $t, _t = se.expr.attrHandle,
	Ct = /^(?:checked|selected)$/i,
	Tt = ne.getSetAttribute,
	It = ne.input;
	se.fn.extend({
		attr: function(e, t) {
			return ke(this, se.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				se.removeAttr(this, e)
			})
		}
	}),
	se.extend({
		attr: function(e, t, n) {
			var i, s, o = e.nodeType;
			if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === _e ? se.prop(e, t, n) : (1 === o && se.isXMLDoc(e) || (t = t.toLowerCase(), i = se.attrHooks[t] || (se.expr.match.bool.test(t) ? $t: xt)), void 0 === n ? i && "get" in i && null !== (s = i.get(e, t)) ? s: (s = se.find.attr(e, t), null == s ? void 0 : s) : null !== n ? i && "set" in i && void 0 !== (s = i.set(e, n, t)) ? s: (e.setAttribute(t, n + ""), n) : void se.removeAttr(e, t))
		},
		removeAttr: function(e, t) {
			var n, i, s = 0,
			o = t && t.match(ye);
			if (o && 1 === e.nodeType) for (; n = o[s++];) i = se.propFix[n] || n,
			se.expr.match.bool.test(n) ? It && Tt || !Ct.test(n) ? e[i] = !1 : e[se.camelCase("default-" + n)] = e[i] = !1 : se.attr(e, n, ""),
			e.removeAttribute(Tt ? n: i)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!ne.radioValue && "radio" === t && se.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t),
						n && (e.value = n),
						t
					}
				}
			}
		}
	}),
	$t = {
		set: function(e, t, n) {
			return t === !1 ? se.removeAttr(e, n) : It && Tt || !Ct.test(n) ? e.setAttribute(!Tt && se.propFix[n] || n, n) : e[se.camelCase("default-" + n)] = e[n] = !0,
			n
		}
	},
	se.each(se.expr.match.bool.source.match(/\w+/g),
	function(e, t) {
		var n = _t[t] || se.find.attr;
		_t[t] = It && Tt || !Ct.test(t) ?
		function(e, t, i) {
			var s, o;
			return i || (o = _t[t], _t[t] = s, s = null != n(e, t, i) ? t.toLowerCase() : null, _t[t] = o),
			s
		}: function(e, t, n) {
			return n ? void 0 : e[se.camelCase("default-" + t)] ? t.toLowerCase() : null
		}
	}),
	It && Tt || (se.attrHooks.value = {
		set: function(e, t, n) {
			return se.nodeName(e, "input") ? void(e.defaultValue = t) : xt && xt.set(e, t, n)
		}
	}),
	Tt || (xt = {
		set: function(e, t, n) {
			var i = e.getAttributeNode(n);
			return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)),
			i.value = t += "",
			"value" === n || t === e.getAttribute(n) ? t: void 0
		}
	},
	_t.id = _t.name = _t.coords = function(e, t, n) {
		var i;
		return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value: null
	},
	se.valHooks.button = {
		get: function(e, t) {
			var n = e.getAttributeNode(t);
			return n && n.specified ? n.value: void 0
		},
		set: xt.set
	},
	se.attrHooks.contenteditable = {
		set: function(e, t, n) {
			xt.set(e, "" === t ? !1 : t, n)
		}
	},
	se.each(["width", "height"],
	function(e, t) {
		se.attrHooks[t] = {
			set: function(e, n) {
				return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
			}
		}
	})),
	ne.style || (se.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || void 0
		},
		set: function(e, t) {
			return e.style.cssText = t + "";

		}
	});
	var St = /^(?:input|select|textarea|button|object)$/i,
	Dt = /^(?:a|area)$/i;
	se.fn.extend({
		prop: function(e, t) {
			return ke(this, se.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = se.propFix[e] || e,
			this.each(function() {
				try {
					this[e] = void 0,
					delete this[e]
				} catch(t) {}
			})
		}
	}),
	se.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, t, n) {
			var i, s, o, a = e.nodeType;
			if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !se.isXMLDoc(e),
			o && (t = se.propFix[t] || t, s = se.propHooks[t]),
			void 0 !== n ? s && "set" in s && void 0 !== (i = s.set(e, n, t)) ? i: e[t] = n: s && "get" in s && null !== (i = s.get(e, t)) ? i: e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = se.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : St.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		}
	}),
	ne.hrefNormalized || se.each(["href", "src"],
	function(e, t) {
		se.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	}),
	ne.optSelected || (se.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
			null
		}
	}),
	se.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
	function() {
		se.propFix[this.toLowerCase()] = this
	}),
	ne.enctype || (se.propFix.enctype = "encoding");
	var kt = /[\t\r\n\f]/g;
	se.fn.extend({
		addClass: function(e) {
			var t, n, i, s, o, a, r = 0,
			l = this.length,
			c = "string" == typeof e && e;
			if (se.isFunction(e)) return this.each(function(t) {
				se(this).addClass(e.call(this, t, this.className))
			});
			if (c) for (t = (e || "").match(ye) || []; l > r; r++) if (n = this[r], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(kt, " ") : " ")) {
				for (o = 0; s = t[o++];) i.indexOf(" " + s + " ") < 0 && (i += s + " ");
				a = se.trim(i),
				n.className !== a && (n.className = a)
			}
			return this
		},
		removeClass: function(e) {
			var t, n, i, s, o, a, r = 0,
			l = this.length,
			c = 0 === arguments.length || "string" == typeof e && e;
			if (se.isFunction(e)) return this.each(function(t) {
				se(this).removeClass(e.call(this, t, this.className))
			});
			if (c) for (t = (e || "").match(ye) || []; l > r; r++) if (n = this[r], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(kt, " ") : "")) {
				for (o = 0; s = t[o++];) for (; i.indexOf(" " + s + " ") >= 0;) i = i.replace(" " + s + " ", " ");
				a = e ? se.trim(i) : "",
				n.className !== a && (n.className = a)
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e;
			return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(se.isFunction(e) ?
			function(n) {
				se(this).toggleClass(e.call(this, n, this.className, t), t)
			}: function() {
				if ("string" === n) for (var t, i = 0,
				s = se(this), o = e.match(ye) || []; t = o[i++];) s.hasClass(t) ? s.removeClass(t) : s.addClass(t);
				else(n === _e || "boolean" === n) && (this.className && se._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "": se._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ",
			n = 0,
			i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(kt, " ").indexOf(t) >= 0) return ! 0;
			return ! 1
		}
	}),
	se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
	function(e, t) {
		se.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}),
	se.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	var Lt = se.now(),
	Nt = /\?/,
	Et = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	se.parseJSON = function(t) {
		if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
		var n, i = null,
		s = se.trim(t + "");
		return s && !se.trim(s.replace(Et,
		function(e, t, s, o) {
			return n && t && (i = 0),
			0 === i ? e: (n = s || t, i += !o - !s, "")
		})) ? Function("return " + s)() : se.error("Invalid JSON: " + t)
	},
	se.parseXML = function(t) {
		var n, i;
		if (!t || "string" != typeof t) return null;
		try {
			e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
		} catch(s) {
			n = void 0
		}
		return n && n.documentElement && !n.getElementsByTagName("parsererror").length || se.error("Invalid XML: " + t),
		n
	};
	var jt, Mt, At = /#.*$/,
	qt = /([?&])_=[^&]*/,
	Ot = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
	Ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	Pt = /^(?:GET|HEAD)$/,
	Bt = /^\/\//,
	Ft = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	Rt = {},
	zt = {},
	Ut = "*/".concat("*");
	try {
		Mt = location.href
	} catch(Wt) {
		Mt = fe.createElement("a"),
		Mt.href = "",
		Mt = Mt.href
	}
	jt = Ft.exec(Mt.toLowerCase()) || [],
	se.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Mt,
			type: "GET",
			isLocal: Ht.test(jt[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Ut,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": se.parseJSON,
				"text xml": se.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? F(F(e, se.ajaxSettings), t) : F(se.ajaxSettings, e)
		},
		ajaxPrefilter: P(Rt),
		ajaxTransport: P(zt),
		ajax: function(e, t) {
			function n(e, t, n, i) {
				var s, d, v, b, w, $ = t;
				2 !== y && (y = 2, r && clearTimeout(r), c = void 0, a = i || "", x.readyState = e > 0 ? 4 : 0, s = e >= 200 && 300 > e || 304 === e, n && (b = R(u, x, n)), b = z(u, b, x, s), s ? (u.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (se.lastModified[o] = w), w = x.getResponseHeader("etag"), w && (se.etag[o] = w)), 204 === e || "HEAD" === u.type ? $ = "nocontent": 304 === e ? $ = "notmodified": ($ = b.state, d = b.data, v = b.error, s = !v)) : (v = $, (e || !$) && ($ = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || $) + "", s ? f.resolveWith(h, [d, $, x]) : f.rejectWith(h, [x, $, v]), x.statusCode(g), g = void 0, l && p.trigger(s ? "ajaxSuccess": "ajaxError", [x, u, s ? d: v]), m.fireWith(h, [x, $]), l && (p.trigger("ajaxComplete", [x, u]), --se.active || se.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (t = e, e = void 0),
			t = t || {};
			var i, s, o, a, r, l, c, d, u = se.ajaxSetup({},
			t),
			h = u.context || u,
			p = u.context && (h.nodeType || h.jquery) ? se(h) : se.event,
			f = se.Deferred(),
			m = se.Callbacks("once memory"),
			g = u.statusCode || {},
			v = {},
			b = {},
			y = 0,
			w = "canceled",
			x = {
				readyState: 0,
				getResponseHeader: function(e) {
					var t;
					if (2 === y) {
						if (!d) for (d = {}; t = Ot.exec(a);) d[t[1].toLowerCase()] = t[2];
						t = d[e.toLowerCase()]
					}
					return null == t ? null: t
				},
				getAllResponseHeaders: function() {
					return 2 === y ? a: null
				},
				setRequestHeader: function(e, t) {
					var n = e.toLowerCase();
					return y || (e = b[n] = b[n] || e, v[e] = t),
					this
				},
				overrideMimeType: function(e) {
					return y || (u.mimeType = e),
					this
				},
				statusCode: function(e) {
					var t;
					if (e) if (2 > y) for (t in e) g[t] = [g[t], e[t]];
					else x.always(e[x.status]);
					return this
				},
				abort: function(e) {
					var t = e || w;
					return c && c.abort(t),
					n(0, t),
					this
				}
			};
			if (f.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, u.url = ((e || u.url || Mt) + "").replace(At, "").replace(Bt, jt[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = se.trim(u.dataType || "*").toLowerCase().match(ye) || [""], null == u.crossDomain && (i = Ft.exec(u.url.toLowerCase()), u.crossDomain = !(!i || i[1] === jt[1] && i[2] === jt[2] && (i[3] || ("http:" === i[1] ? "80": "443")) === (jt[3] || ("http:" === jt[1] ? "80": "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = se.param(u.data, u.traditional)), B(Rt, u, t, x), 2 === y) return x;
			l = se.event && u.global,
			l && 0 === se.active++&&se.event.trigger("ajaxStart"),
			u.type = u.type.toUpperCase(),
			u.hasContent = !Pt.test(u.type),
			o = u.url,
			u.hasContent || (u.data && (o = u.url += (Nt.test(o) ? "&": "?") + u.data, delete u.data), u.cache === !1 && (u.url = qt.test(o) ? o.replace(qt, "$1_=" + Lt++) : o + (Nt.test(o) ? "&": "?") + "_=" + Lt++)),
			u.ifModified && (se.lastModified[o] && x.setRequestHeader("If-Modified-Since", se.lastModified[o]), se.etag[o] && x.setRequestHeader("If-None-Match", se.etag[o])),
			(u.data && u.hasContent && u.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", u.contentType),
			x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Ut + "; q=0.01": "") : u.accepts["*"]);
			for (s in u.headers) x.setRequestHeader(s, u.headers[s]);
			if (u.beforeSend && (u.beforeSend.call(h, x, u) === !1 || 2 === y)) return x.abort();
			w = "abort";
			for (s in {
				success: 1,
				error: 1,
				complete: 1
			}) x[s](u[s]);
			if (c = B(zt, u, t, x)) {
				x.readyState = 1,
				l && p.trigger("ajaxSend", [x, u]),
				u.async && u.timeout > 0 && (r = setTimeout(function() {
					x.abort("timeout")
				},
				u.timeout));
				try {
					y = 1,
					c.send(v, n)
				} catch($) {
					if (! (2 > y)) throw $;
					n( - 1, $)
				}
			} else n( - 1, "No Transport");
			return x
		},
		getJSON: function(e, t, n) {
			return se.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return se.get(e, void 0, t, "script")
		}
	}),
	se.each(["get", "post"],
	function(e, t) {
		se[t] = function(e, n, i, s) {
			return se.isFunction(n) && (s = s || i, i = n, n = void 0),
			se.ajax({
				url: e,
				type: t,
				dataType: s,
				data: n,
				success: i
			})
		}
	}),
	se._evalUrl = function(e) {
		return se.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			"throws": !0
		})
	},
	se.fn.extend({
		wrapAll: function(e) {
			if (se.isFunction(e)) return this.each(function(t) {
				se(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = se(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]),
				t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return this.each(se.isFunction(e) ?
			function(t) {
				se(this).wrapInner(e.call(this, t))
			}: function() {
				var t = se(this),
				n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = se.isFunction(e);
			return this.each(function(n) {
				se(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				se.nodeName(this, "body") || se(this).replaceWith(this.childNodes)
			}).end()
		}
	}),
	se.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || se.css(e, "display"))
	},
	se.expr.filters.visible = function(e) {
		return ! se.expr.filters.hidden(e)
	};
	var Gt = /%20/g,
	Qt = /\[\]$/,
	Vt = /\r?\n/g,
	Jt = /^(?:submit|button|image|reset|file)$/i,
	Xt = /^(?:input|select|textarea|keygen)/i;
	se.param = function(e, t) {
		var n, i = [],
		s = function(e, t) {
			t = se.isFunction(t) ? t() : null == t ? "": t,
			i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
		};
		if (void 0 === t && (t = se.ajaxSettings && se.ajaxSettings.traditional), se.isArray(e) || e.jquery && !se.isPlainObject(e)) se.each(e,
		function() {
			s(this.name, this.value)
		});
		else for (n in e) U(n, e[n], t, s);
		return i.join("&").replace(Gt, "+")
	},
	se.fn.extend({
		serialize: function() {
			return se.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = se.prop(this, "elements");
				return e ? se.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !se(this).is(":disabled") && Xt.test(this.nodeName) && !Jt.test(e) && (this.checked || !Le.test(e))
			}).map(function(e, t) {
				var n = se(this).val();
				return null == n ? null: se.isArray(n) ? se.map(n,
				function(e) {
					return {
						name: t.name,
						value: e.replace(Vt, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Vt, "\r\n")
				}
			}).get()
		}
	}),
	se.ajaxSettings.xhr = void 0 !== e.ActiveXObject ?
	function() {
		return ! this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && W() || G()
	}: W;
	var Yt = 0,
	Kt = {},
	Zt = se.ajaxSettings.xhr();
	e.attachEvent && e.attachEvent("onunload",
	function() {
		for (var e in Kt) Kt[e](void 0, !0)
	}),
	ne.cors = !!Zt && "withCredentials" in Zt,
	Zt = ne.ajax = !!Zt,
	Zt && se.ajaxTransport(function(e) {
		if (!e.crossDomain || ne.cors) {
			var t;
			return {
				send: function(n, i) {
					var s, o = e.xhr(),
					a = ++Yt;
					if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (s in e.xhrFields) o[s] = e.xhrFields[s];
					e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType),
					e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
					for (s in n) void 0 !== n[s] && o.setRequestHeader(s, n[s] + "");
					o.send(e.hasContent && e.data || null),
					t = function(n, s) {
						var r, l, c;
						if (t && (s || 4 === o.readyState)) if (delete Kt[a], t = void 0, o.onreadystatechange = se.noop, s) 4 !== o.readyState && o.abort();
						else {
							c = {},
							r = o.status,
							"string" == typeof o.responseText && (c.text = o.responseText);
							try {
								l = o.statusText
							} catch(d) {
								l = ""
							}
							r || !e.isLocal || e.crossDomain ? 1223 === r && (r = 204) : r = c.text ? 200 : 404
						}
						c && i(r, l, c, o.getAllResponseHeaders())
					},
					e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Kt[a] = t: t()
				},
				abort: function() {
					t && t(void 0, !0)
				}
			}
		}
	}),
	se.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return se.globalEval(e),
				e
			}
		}
	}),
	se.ajaxPrefilter("script",
	function(e) {
		void 0 === e.cache && (e.cache = !1),
		e.crossDomain && (e.type = "GET", e.global = !1)
	}),
	se.ajaxTransport("script",
	function(e) {
		if (e.crossDomain) {
			var t, n = fe.head || se("head")[0] || fe.documentElement;
			return {
				send: function(i, s) {
					t = fe.createElement("script"),
					t.async = !0,
					e.scriptCharset && (t.charset = e.scriptCharset),
					t.src = e.url,
					t.onload = t.onreadystatechange = function(e, n) { (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || s(200, "success"))
					},
					n.insertBefore(t, n.firstChild)
				},
				abort: function() {
					t && t.onload(void 0, !0)
				}
			}
		}
	});
	var en = [],
	tn = /(=)\?(?=&|$)|\?\?/;
	se.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = en.pop() || se.expando + "_" + Lt++;
			return this[e] = !0,
			e
		}
	}),
	se.ajaxPrefilter("json jsonp",
	function(t, n, i) {
		var s, o, a, r = t.jsonp !== !1 && (tn.test(t.url) ? "url": "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
		return r || "jsonp" === t.dataTypes[0] ? (s = t.jsonpCallback = se.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, r ? t[r] = t[r].replace(tn, "$1" + s) : t.jsonp !== !1 && (t.url += (Nt.test(t.url) ? "&": "?") + t.jsonp + "=" + s), t.converters["script json"] = function() {
			return a || se.error(s + " was not called"),
			a[0]
		},
		t.dataTypes[0] = "json", o = e[s], e[s] = function() {
			a = arguments
		},
		i.always(function() {
			e[s] = o,
			t[s] && (t.jsonpCallback = n.jsonpCallback, en.push(s)),
			a && se.isFunction(o) && o(a[0]),
			a = o = void 0
		}), "script") : void 0
	}),
	se.parseHTML = function(e, t, n) {
		if (!e || "string" != typeof e) return null;
		"boolean" == typeof t && (n = t, t = !1),
		t = t || fe;
		var i = ue.exec(e),
		s = !n && [];
		return i ? [t.createElement(i[1])] : (i = se.buildFragment([e], t, s), s && s.length && se(s).remove(), se.merge([], i.childNodes))
	};
	var nn = se.fn.load;
	se.fn.load = function(e, t, n) {
		if ("string" != typeof e && nn) return nn.apply(this, arguments);
		var i, s, o, a = this,
		r = e.indexOf(" ");
		return r >= 0 && (i = se.trim(e.slice(r, e.length)), e = e.slice(0, r)),
		se.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"),
		a.length > 0 && se.ajax({
			url: e,
			type: o,
			dataType: "html",
			data: t
		}).done(function(e) {
			s = arguments,
			a.html(i ? se("<div>").append(se.parseHTML(e)).find(i) : e)
		}).complete(n &&
		function(e, t) {
			a.each(n, s || [e.responseText, t, e])
		}),
		this
	},
	se.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
	function(e, t) {
		se.fn[t] = function(e) {
			return this.on(t, e)
		}
	}),
	se.expr.filters.animated = function(e) {
		return se.grep(se.timers,
		function(t) {
			return e === t.elem
		}).length
	};
	var sn = e.document.documentElement;
	se.offset = {
		setOffset: function(e, t, n) {
			var i, s, o, a, r, l, c, d = se.css(e, "position"),
			u = se(e),
			h = {};
			"static" === d && (e.style.position = "relative"),
			r = u.offset(),
			o = se.css(e, "top"),
			l = se.css(e, "left"),
			c = ("absolute" === d || "fixed" === d) && se.inArray("auto", [o, l]) > -1,
			c ? (i = u.position(), a = i.top, s = i.left) : (a = parseFloat(o) || 0, s = parseFloat(l) || 0),
			se.isFunction(t) && (t = t.call(e, n, r)),
			null != t.top && (h.top = t.top - r.top + a),
			null != t.left && (h.left = t.left - r.left + s),
			"using" in t ? t.using.call(e, h) : u.css(h)
		}
	},
	se.fn.extend({
		offset: function(e) {
			if (arguments.length) return void 0 === e ? this: this.each(function(t) {
				se.offset.setOffset(this, e, t)
			});
			var t, n, i = {
				top: 0,
				left: 0
			},
			s = this[0],
			o = s && s.ownerDocument;
			if (o) return t = o.documentElement,
			se.contains(t, s) ? (typeof s.getBoundingClientRect !== _e && (i = s.getBoundingClientRect()), n = Q(o), {
				top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
				left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
			}) : i
		},
		position: function() {
			if (this[0]) {
				var e, t, n = {
					top: 0,
					left: 0
				},
				i = this[0];
				return "fixed" === se.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), se.nodeName(e[0], "html") || (n = e.offset()), n.top += se.css(e[0], "borderTopWidth", !0), n.left += se.css(e[0], "borderLeftWidth", !0)),
				{
					top: t.top - n.top - se.css(i, "marginTop", !0),
					left: t.left - n.left - se.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || sn; e && !se.nodeName(e, "html") && "static" === se.css(e, "position");) e = e.offsetParent;
				return e || sn
			})
		}
	}),
	se.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	},
	function(e, t) {
		var n = /Y/.test(t);
		se.fn[e] = function(i) {
			return ke(this,
			function(e, i, s) {
				var o = Q(e);
				return void 0 === s ? o ? t in o ? o[t] : o.document.documentElement[i] : e[i] : void(o ? o.scrollTo(n ? se(o).scrollLeft() : s, n ? s: se(o).scrollTop()) : e[i] = s)
			},
			e, i, arguments.length, null)
		}
	}),
	se.each(["top", "left"],
	function(e, t) {
		se.cssHooks[t] = I(ne.pixelPosition,
		function(e, n) {
			return n ? (n = tt(e, t), it.test(n) ? se(e).position()[t] + "px": n) : void 0
		})
	}),
	se.each({
		Height: "height",
		Width: "width"
	},
	function(e, t) {
		se.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		},
		function(n, i) {
			se.fn[i] = function(i, s) {
				var o = arguments.length && (n || "boolean" != typeof i),
				a = n || (i === !0 || s === !0 ? "margin": "border");
				return ke(this,
				function(t, n, i) {
					var s;
					return se.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (s = t.documentElement, Math.max(t.body["scroll" + e], s["scroll" + e], t.body["offset" + e], s["offset" + e], s["client" + e])) : void 0 === i ? se.css(t, n, a) : se.style(t, n, i, a)
				},
				t, o ? i: void 0, o, null)
			}
		})
	}),
	se.fn.size = function() {
		return this.length
	},
	se.fn.andSelf = se.fn.addBack,
	"function" == typeof define && define.amd && define("jquery", [],
	function() {
		return se
	});
	var on = e.jQuery,
	an = e.$;
	return se.noConflict = function(t) {
		return e.$ === se && (e.$ = an),
		t && e.jQuery === se && (e.jQuery = on),
		se
	},
	typeof t === _e && (e.jQuery = e.$ = se),
	se
}),
function(e, t, n) {
	function i(n) {
		var i = t.console;
		o[n] || (o[n] = !0, e.migrateWarnings.push(n), i && i.warn && !e.migrateMute && (i.warn("JQMIGRATE: " + n), e.migrateTrace && i.trace && i.trace()))
	}
	function s(t, n, s, o) {
		if (Object.defineProperty) try {
			return void Object.defineProperty(t, n, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return i(o),
					s
				},
				set: function(e) {
					i(o),
					s = e
				}
			})
		} catch(a) {}
		e._definePropertyBroken = !0,
		t[n] = s
	}
	var o = {};
	e.migrateWarnings = [],
	!e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"),
	e.migrateTrace === n && (e.migrateTrace = !0),
	e.migrateReset = function() {
		o = {},
		e.migrateWarnings.length = 0
	},
	"BackCompat" === document.compatMode && i("jQuery is not compatible with Quirks Mode");
	var a = e("<input/>", {
		size: 1
	}).attr("size") && e.attrFn,
	r = e.attr,
	l = e.attrHooks.value && e.attrHooks.value.get ||
	function() {
		return null
	},
	c = e.attrHooks.value && e.attrHooks.value.set ||
	function() {
		return n
	},
	d = /^(?:input|button)$/i,
	u = /^[238]$/,
	h = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	p = /^(?:checked|selected)$/i;
	s(e, "attrFn", a || {},
	"jQuery.attrFn is deprecated"),
	e.attr = function(t, s, o, l) {
		var c = s.toLowerCase(),
		f = t && t.nodeType;
		return l && (r.length < 4 && i("jQuery.fn.attr( props, pass ) is deprecated"), t && !u.test(f) && (a ? s in a: e.isFunction(e.fn[s]))) ? e(t)[s](o) : ("type" === s && o !== n && d.test(t.nodeName) && t.parentNode && i("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && h.test(c) && (e.attrHooks[c] = {
			get: function(t, i) {
				var s, o = e.prop(t, i);
				return o === !0 || "boolean" != typeof o && (s = t.getAttributeNode(i)) && s.nodeValue !== !1 ? i.toLowerCase() : n
			},
			set: function(t, n, i) {
				var s;
				return n === !1 ? e.removeAttr(t, i) : (s = e.propFix[i] || i, s in t && (t[s] = !0), t.setAttribute(i, i.toLowerCase())),
				i
			}
		},
		p.test(c) && i("jQuery.fn.attr('" + c + "') may use property instead of attribute")), r.call(e, t, s, o))
	},
	e.attrHooks.value = {
		get: function(e, t) {
			var n = (e.nodeName || "").toLowerCase();
			return "button" === n ? l.apply(this, arguments) : ("input" !== n && "option" !== n && i("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value: null)
		},
		set: function(e, t) {
			var n = (e.nodeName || "").toLowerCase();
			return "button" === n ? c.apply(this, arguments) : ("input" !== n && "option" !== n && i("jQuery.fn.attr('value', val) no longer sets properties"), void(e.value = t))
		}
	};
	var f, m, g = e.fn.init,
	v = e.parseJSON,
	b = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
	e.fn.init = function(t, n, s) {
		var o;
		return t && "string" == typeof t && !e.isPlainObject(n) && (o = b.exec(e.trim(t))) && o[0] && ("<" !== t.charAt(0) && i("$(html) HTML strings must start with '<' character"), o[3] && i("$(html) HTML text after last tag is ignored"), "#" === o[0].charAt(0) && (i("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? g.call(this, e.parseHTML(o[2], n, !0), n, s) : g.apply(this, arguments)
	},
	e.fn.init.prototype = e.fn,
	e.parseJSON = function(e) {
		return e || null === e ? v.apply(this, arguments) : (i("jQuery.parseJSON requires a valid JSON string"), null)
	},
	e.uaMatch = function(e) {
		e = e.toLowerCase();
		var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
		return {
			browser: t[1] || "",
			version: t[2] || "0"
		}
	},
	e.browser || (f = e.uaMatch(navigator.userAgent), m = {},
	f.browser && (m[f.browser] = !0, m.version = f.version), m.chrome ? m.webkit = !0 : m.webkit && (m.safari = !0), e.browser = m),
	s(e, "browser", e.browser, "jQuery.browser is deprecated"),
	e.sub = function() {
		function t(e, n) {
			return new t.fn.init(e, n)
		}
		e.extend(!0, t, this),
		t.superclass = this,
		t.fn = t.prototype = this(),
		t.fn.constructor = t,
		t.sub = this.sub,
		t.fn.init = function(i, s) {
			return s && s instanceof e && !(s instanceof t) && (s = t(s)),
			e.fn.init.call(this, i, s, n)
		},
		t.fn.init.prototype = t.fn;
		var n = t(document);
		return i("jQuery.sub() is deprecated"),
		t
	},
	e.ajaxSetup({
		converters: {
			"text json": e.parseJSON
		}
	});
	var y = e.fn.data;
	e.fn.data = function(t) {
		var s, o, a = this[0];
		return ! a || "events" !== t || 1 !== arguments.length || (s = e.data(a, t), o = e._data(a, t), s !== n && s !== o || o === n) ? y.apply(this, arguments) : (i("Use of jQuery.fn.data('events') is deprecated"), o)
	};
	var w = /\/(java|ecma)script/i,
	x = e.fn.andSelf || e.fn.addBack;
	e.fn.andSelf = function() {
		return i("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
		x.apply(this, arguments)
	},
	e.clean || (e.clean = function(t, n, s, o) {
		n = n || document,
		n = !n.nodeType && n[0] || n,
		n = n.ownerDocument || n,
		i("jQuery.clean() is deprecated");
		var a, r, l, c, d = [];
		if (e.merge(d, e.buildFragment(t, n).childNodes), s) for (l = function(e) {
			return ! e.type || w.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : s.appendChild(e) : void 0
		},
		a = 0; null != (r = d[a]); a++) e.nodeName(r, "script") && l(r) || (s.appendChild(r), "undefined" != typeof r.getElementsByTagName && (c = e.grep(e.merge([], r.getElementsByTagName("script")), l), d.splice.apply(d, [a + 1, 0].concat(c)), a += c.length));
		return d
	});
	var $ = e.event.add,
	_ = e.event.remove,
	C = e.event.trigger,
	T = e.fn.toggle,
	I = e.fn.live,
	S = e.fn.die,
	D = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
	k = new RegExp("\\b(?:" + D + ")\\b"),
	L = /(?:^|\s)hover(\.\S+|)\b/,
	N = function(t) {
		return "string" != typeof t || e.event.special.hover ? t: (L.test(t) && i("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(L, "mouseenter$1 mouseleave$1"))
	};
	e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"),
	e.event.dispatch && s(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"),
	e.event.add = function(e, t, n, s, o) {
		e !== document && k.test(t) && i("AJAX events should be attached to document: " + t),
		$.call(this, e, N(t || ""), n, s, o)
	},
	e.event.remove = function(e, t, n, i, s) {
		_.call(this, e, N(t) || "", n, i, s)
	},
	e.fn.error = function() {
		var e = Array.prototype.slice.call(arguments, 0);
		return i("jQuery.fn.error() is deprecated"),
		e.splice(0, 0, "error"),
		arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
	},
	e.fn.toggle = function(t, n) {
		if (!e.isFunction(t) || !e.isFunction(n)) return T.apply(this, arguments);
		i("jQuery.fn.toggle(handler, handler...) is deprecated");
		var s = arguments,
		o = t.guid || e.guid++,
		a = 0,
		r = function(n) {
			var i = (e._data(this, "lastToggle" + t.guid) || 0) % a;
			return e._data(this, "lastToggle" + t.guid, i + 1),
			n.preventDefault(),
			s[i].apply(this, arguments) || !1
		};
		for (r.guid = o; a < s.length;) s[a++].guid = o;
		return this.click(r)
	},
	e.fn.live = function(t, n, s) {
		return i("jQuery.fn.live() is deprecated"),
		I ? I.apply(this, arguments) : (e(this.context).on(t, this.selector, n, s), this)
	},
	e.fn.die = function(t, n) {
		return i("jQuery.fn.die() is deprecated"),
		S ? S.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
	},
	e.event.trigger = function(e, t, n, s) {
		return n || k.test(e) || i("Global events are undocumented and deprecated"),
		C.call(this, e, t, n || document, s)
	},
	e.each(D.split("|"),
	function(t, n) {
		e.event.special[n] = {
			setup: function() {
				var t = this;
				return t !== document && (e.event.add(document, n + "." + e.guid,
				function() {
					e.event.trigger(n, null, t, !0)
				}), e._data(this, n, e.guid++)),
				!1
			},
			teardown: function() {
				return this !== document && e.event.remove(document, n + "." + e._data(this, n)),
				!1
			}
		}
	})
} (jQuery, window),
define("jquery-migrate", [],
function() {}),
function() {
	var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this,
	t = e._,
	n = Array.prototype,
	i = Object.prototype,
	s = "undefined" != typeof Symbol ? Symbol.prototype: null,
	o = n.push,
	a = n.slice,
	r = i.toString,
	l = i.hasOwnProperty,
	c = Array.isArray,
	d = Object.keys,
	u = Object.create,
	h = function() {},
	p = function(e) {
		return e instanceof p ? e: this instanceof p ? void(this._wrapped = e) : new p(e)
	};
	"undefined" == typeof exports || exports.nodeType ? e._ = p: ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = p), exports._ = p),
	p.VERSION = "1.8.3";
	var f = function(e, t, n) {
		if (void 0 === t) return e;
		switch (null == n ? 3 : n) {
		case 1:
			return function(n) {
				return e.call(t, n)
			};
		case 3:
			return function(n, i, s) {
				return e.call(t, n, i, s)
			};
		case 4:
			return function(n, i, s, o) {
				return e.call(t, n, i, s, o)
			}
		}
		return function() {
			return e.apply(t, arguments)
		}
	},
	m = function(e, t, n) {
		return null == e ? p.identity: p.isFunction(e) ? f(e, t, n) : p.isObject(e) ? p.matcher(e) : p.property(e)
	};
	p.iteratee = function(e, t) {
		return m(e, t, 1 / 0)
	};
	var g = function(e, t) {
		return t = null == t ? e.length - 1 : +t,
		function() {
			for (var n = Math.max(arguments.length - t, 0), i = Array(n), s = 0; n > s; s++) i[s] = arguments[s + t];
			switch (t) {
			case 0:
				return e.call(this, i);
			case 1:
				return e.call(this, arguments[0], i);
			case 2:
				return e.call(this, arguments[0], arguments[1], i)
			}
			var o = Array(t + 1);
			for (s = 0; t > s; s++) o[s] = arguments[s];
			return o[t] = i,
			e.apply(this, o)
		}
	},
	v = function(e) {
		if (!p.isObject(e)) return {};
		if (u) return u(e);
		h.prototype = e;
		var t = new h;
		return h.prototype = null,
		t
	},
	b = function(e) {
		return function(t) {
			return null == t ? void 0 : t[e]
		}
	},
	y = Math.pow(2, 53) - 1,
	w = b("length"),
	x = function(e) {
		var t = w(e);
		return "number" == typeof t && t >= 0 && y >= t
	};
	p.each = p.forEach = function(e, t, n) {
		t = f(t, n);
		var i, s;
		if (x(e)) for (i = 0, s = e.length; s > i; i++) t(e[i], i, e);
		else {
			var o = p.keys(e);
			for (i = 0, s = o.length; s > i; i++) t(e[o[i]], o[i], e)
		}
		return e
	},
	p.map = p.collect = function(e, t, n) {
		t = m(t, n);
		for (var i = !x(e) && p.keys(e), s = (i || e).length, o = Array(s), a = 0; s > a; a++) {
			var r = i ? i[a] : a;
			o[a] = t(e[r], r, e)
		}
		return o
	};
	var $ = function(e) {
		var t = function(t, n, i, s) {
			var o = !x(t) && p.keys(t),
			a = (o || t).length,
			r = e > 0 ? 0 : a - 1;
			for (s || (i = t[o ? o[r] : r], r += e); r >= 0 && a > r; r += e) {
				var l = o ? o[r] : r;
				i = n(i, t[l], l, t)
			}
			return i
		};
		return function(e, n, i, s) {
			var o = arguments.length >= 3;
			return t(e, f(n, s, 4), i, o)
		}
	};
	p.reduce = p.foldl = p.inject = $(1),
	p.reduceRight = p.foldr = $( - 1),
	p.find = p.detect = function(e, t, n) {
		var i;
		return i = x(e) ? p.findIndex(e, t, n) : p.findKey(e, t, n),
		void 0 !== i && -1 !== i ? e[i] : void 0
	},
	p.filter = p.select = function(e, t, n) {
		var i = [];
		return t = m(t, n),
		p.each(e,
		function(e, n, s) {
			t(e, n, s) && i.push(e)
		}),
		i
	},
	p.reject = function(e, t, n) {
		return p.filter(e, p.negate(m(t)), n)
	},
	p.every = p.all = function(e, t, n) {
		t = m(t, n);
		for (var i = !x(e) && p.keys(e), s = (i || e).length, o = 0; s > o; o++) {
			var a = i ? i[o] : o;
			if (!t(e[a], a, e)) return ! 1
		}
		return ! 0
	},
	p.some = p.any = function(e, t, n) {
		t = m(t, n);
		for (var i = !x(e) && p.keys(e), s = (i || e).length, o = 0; s > o; o++) {
			var a = i ? i[o] : o;
			if (t(e[a], a, e)) return ! 0
		}
		return ! 1
	},
	p.contains = p.includes = p.include = function(e, t, n, i) {
		return x(e) || (e = p.values(e)),
		("number" != typeof n || i) && (n = 0),
		p.indexOf(e, t, n) >= 0
	},
	p.invoke = g(function(e, t, n) {
		var i = p.isFunction(t);
		return p.map(e,
		function(e) {
			var s = i ? t: e[t];
			return null == s ? s: s.apply(e, n)
		})
	}),
	p.pluck = function(e, t) {
		return p.map(e, p.property(t))
	},
	p.where = function(e, t) {
		return p.filter(e, p.matcher(t))
	},
	p.findWhere = function(e, t) {
		return p.find(e, p.matcher(t))
	},
	p.max = function(e, t, n) {
		var i, s, o = -(1 / 0),
		a = -(1 / 0);
		if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e) {
			e = x(e) ? e: p.values(e);
			for (var r = 0,
			l = e.length; l > r; r++) i = e[r],
			null != i && i > o && (o = i)
		} else t = m(t, n),
		p.each(e,
		function(e, n, i) {
			s = t(e, n, i),
			(s > a || s === -(1 / 0) && o === -(1 / 0)) && (o = e, a = s)
		});
		return o
	},
	p.min = function(e, t, n) {
		var i, s, o = 1 / 0,
		a = 1 / 0;
		if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e) {
			e = x(e) ? e: p.values(e);
			for (var r = 0,
			l = e.length; l > r; r++) i = e[r],
			null != i && o > i && (o = i)
		} else t = m(t, n),
		p.each(e,
		function(e, n, i) {
			s = t(e, n, i),
			(a > s || s === 1 / 0 && o === 1 / 0) && (o = e, a = s)
		});
		return o
	},
	p.shuffle = function(e) {
		return p.sample(e, 1 / 0)
	},
	p.sample = function(e, t, n) {
		if (null == t || n) return x(e) || (e = p.values(e)),
		e[p.random(e.length - 1)];
		var i = x(e) ? p.clone(e) : p.values(e),
		s = w(i);
		t = Math.max(Math.min(t, s), 0);
		for (var o = s - 1,
		a = 0; t > a; a++) {
			var r = p.random(a, o),
			l = i[a];
			i[a] = i[r],
			i[r] = l
		}
		return i.slice(0, t)
	},
	p.sortBy = function(e, t, n) {
		var i = 0;
		return t = m(t, n),
		p.pluck(p.map(e,
		function(e, n, s) {
			return {
				value: e,
				index: i++,
				criteria: t(e, n, s)
			}
		}).sort(function(e, t) {
			var n = e.criteria,
			i = t.criteria;
			if (n !== i) {
				if (n > i || void 0 === n) return 1;
				if (i > n || void 0 === i) return - 1
			}
			return e.index - t.index
		}), "value")
	};
	var _ = function(e, t) {
		return function(n, i, s) {
			var o = t ? [[], []] : {};
			return i = m(i, s),
			p.each(n,
			function(t, s) {
				var a = i(t, s, n);
				e(o, t, a)
			}),
			o
		}
	};
	p.groupBy = _(function(e, t, n) {
		p.has(e, n) ? e[n].push(t) : e[n] = [t]
	}),
	p.indexBy = _(function(e, t, n) {
		e[n] = t
	}),
	p.countBy = _(function(e, t, n) {
		p.has(e, n) ? e[n]++:e[n] = 1
	});
	var C = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
	p.toArray = function(e) {
		return e ? p.isArray(e) ? a.call(e) : p.isString(e) ? e.match(C) : x(e) ? p.map(e) : p.values(e) : []
	},
	p.size = function(e) {
		return null == e ? 0 : x(e) ? e.length: p.keys(e).length
	},
	p.partition = _(function(e, t, n) {
		e[n ? 0 : 1].push(t)
	},
	!0),
	p.first = p.head = p.take = function(e, t, n) {
		return null == e ? void 0 : null == t || n ? e[0] : p.initial(e, e.length - t)
	},
	p.initial = function(e, t, n) {
		return a.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
	},
	p.last = function(e, t, n) {
		return null == e ? void 0 : null == t || n ? e[e.length - 1] : p.rest(e, Math.max(0, e.length - t))
	},
	p.rest = p.tail = p.drop = function(e, t, n) {
		return a.call(e, null == t || n ? 1 : t)
	},
	p.compact = function(e) {
		return p.filter(e)
	};
	var T = function(e, t, n, i) {
		i = i || [];
		for (var s = i.length,
		o = 0,
		a = w(e); a > o; o++) {
			var r = e[o];
			if (x(r) && (p.isArray(r) || p.isArguments(r))) if (t) for (var l = 0,
			c = r.length; c > l;) i[s++] = r[l++];
			else T(r, t, n, i),
			s = i.length;
			else n || (i[s++] = r)
		}
		return i
	};
	p.flatten = function(e, t) {
		return T(e, t, !1)
	},
	p.without = g(function(e, t) {
		return p.difference(e, t)
	}),
	p.uniq = p.unique = function(e, t, n, i) {
		p.isBoolean(t) || (i = n, n = t, t = !1),
		null != n && (n = m(n, i));
		for (var s = [], o = [], a = 0, r = w(e); r > a; a++) {
			var l = e[a],
			c = n ? n(l, a, e) : l;
			t ? (a && o === c || s.push(l), o = c) : n ? p.contains(o, c) || (o.push(c), s.push(l)) : p.contains(s, l) || s.push(l)
		}
		return s
	},
	p.union = g(function(e) {
		return p.uniq(T(e, !0, !0))
	}),
	p.intersection = function(e) {
		for (var t = [], n = arguments.length, i = 0, s = w(e); s > i; i++) {
			var o = e[i];
			if (!p.contains(t, o)) {
				var a;
				for (a = 1; n > a && p.contains(arguments[a], o); a++);
				a === n && t.push(o)
			}
		}
		return t
	},
	p.difference = g(function(e, t) {
		return t = T(t, !0, !0),
		p.filter(e,
		function(e) {
			return ! p.contains(t, e)
		})
	}),
	p.unzip = function(e) {
		for (var t = e && p.max(e, w).length || 0, n = Array(t), i = 0; t > i; i++) n[i] = p.pluck(e, i);
		return n
	},
	p.zip = g(p.unzip),
	p.object = function(e, t) {
		for (var n = {},
		i = 0,
		s = w(e); s > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
		return n
	};
	var I = function(e) {
		return function(t, n, i) {
			n = m(n, i);
			for (var s = w(t), o = e > 0 ? 0 : s - 1; o >= 0 && s > o; o += e) if (n(t[o], o, t)) return o;
			return - 1
		}
	};
	p.findIndex = I(1),
	p.findLastIndex = I( - 1),
	p.sortedIndex = function(e, t, n, i) {
		n = m(n, i, 1);
		for (var s = n(t), o = 0, a = w(e); a > o;) {
			var r = Math.floor((o + a) / 2);
			n(e[r]) < s ? o = r + 1 : a = r
		}
		return o
	};
	var S = function(e, t, n) {
		return function(i, s, o) {
			var r = 0,
			l = w(i);
			if ("number" == typeof o) e > 0 ? r = o >= 0 ? o: Math.max(o + l, r) : l = o >= 0 ? Math.min(o + 1, l) : o + l + 1;
			else if (n && o && l) return o = n(i, s),
			i[o] === s ? o: -1;
			if (s !== s) return o = t(a.call(i, r, l), p.isNaN),
			o >= 0 ? o + r: -1;
			for (o = e > 0 ? r: l - 1; o >= 0 && l > o; o += e) if (i[o] === s) return o;
			return - 1
		}
	};
	p.indexOf = S(1, p.findIndex, p.sortedIndex),
	p.lastIndexOf = S( - 1, p.findLastIndex),
	p.range = function(e, t, n) {
		null == t && (t = e || 0, e = 0),
		n || (n = e > t ? -1 : 1);
		for (var i = Math.max(Math.ceil((t - e) / n), 0), s = Array(i), o = 0; i > o; o++, e += n) s[o] = e;
		return s
	},
	p.chunk = function(e, t) {
		if (null == t || 1 > t) return [];
		for (var n = [], i = 0, s = e.length; s > i;) n.push(a.call(e, i, i += t));
		return n
	};
	var D = function(e, t, n, i, s) {
		if (! (i instanceof t)) return e.apply(n, s);
		var o = v(e.prototype),
		a = e.apply(o, s);
		return p.isObject(a) ? a: o
	};
	p.bind = g(function(e, t, n) {
		if (!p.isFunction(e)) throw new TypeError("Bind must be called on a function");
		var i = g(function(s) {
			return D(e, i, t, this, n.concat(s))
		});
		return i
	}),
	p.partial = g(function(e, t) {
		var n = p.partial.placeholder,
		i = function() {
			for (var s = 0,
			o = t.length,
			a = Array(o), r = 0; o > r; r++) a[r] = t[r] === n ? arguments[s++] : t[r];
			for (; s < arguments.length;) a.push(arguments[s++]);
			return D(e, i, this, this, a)
		};
		return i
	}),
	p.partial.placeholder = p,
	p.bindAll = g(function(e, t) {
		t = T(t, !1, !1);
		var n = t.length;
		if (1 > n) throw new Error("bindAll must be passed function names");
		for (; n--;) {
			var i = t[n];
			e[i] = p.bind(e[i], e)
		}
	}),
	p.memoize = function(e, t) {
		var n = function(i) {
			var s = n.cache,
			o = "" + (t ? t.apply(this, arguments) : i);
			return p.has(s, o) || (s[o] = e.apply(this, arguments)),
			s[o]
		};
		return n.cache = {},
		n
	},
	p.delay = g(function(e, t, n) {
		return setTimeout(function() {
			return e.apply(null, n)
		},
		t)
	}),
	p.defer = p.partial(p.delay, p, 1),
	p.throttle = function(e, t, n) {
		var i, s, o, a, r = 0;
		n || (n = {});
		var l = function() {
			r = n.leading === !1 ? 0 : p.now(),
			i = null,
			a = e.apply(s, o),
			i || (s = o = null)
		},
		c = function() {
			var c = p.now();
			r || n.leading !== !1 || (r = c);
			var d = t - (c - r);
			return s = this,
			o = arguments,
			0 >= d || d > t ? (i && (clearTimeout(i), i = null), r = c, a = e.apply(s, o), i || (s = o = null)) : i || n.trailing === !1 || (i = setTimeout(l, d)),
			a
		};
		return c.cancel = function() {
			clearTimeout(i),
			r = 0,
			i = s = o = null
		},
		c
	},
	p.debounce = function(e, t, n) {
		var i, s, o = function(t, n) {
			i = null,
			n && (s = e.apply(t, n))
		},
		a = g(function(a) {
			var r = n && !i;
			return i && clearTimeout(i),
			r ? (i = setTimeout(o, t), s = e.apply(this, a)) : n || (i = p.delay(o, t, this, a)),
			s
		});
		return a.cancel = function() {
			clearTimeout(i),
			i = null
		},
		a
	},
	p.wrap = function(e, t) {
		return p.partial(t, e)
	},
	p.negate = function(e) {
		return function() {
			return ! e.apply(this, arguments)
		}
	},
	p.compose = function() {
		var e = arguments,
		t = e.length - 1;
		return function() {
			for (var n = t,
			i = e[t].apply(this, arguments); n--;) i = e[n].call(this, i);
			return i
		}
	},
	p.after = function(e, t) {
		return function() {
			return--e < 1 ? t.apply(this, arguments) : void 0
		}
	},
	p.before = function(e, t) {
		var n;
		return function() {
			return--e > 0 && (n = t.apply(this, arguments)),
			1 >= e && (t = null),
			n
		}
	},
	p.once = p.partial(p.before, 2),
	p.restArgs = g;
	var k = !{
		toString: null
	}.propertyIsEnumerable("toString"),
	L = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
	N = function(e, t) {
		var n = L.length,
		s = e.constructor,
		o = p.isFunction(s) && s.prototype || i,
		a = "constructor";
		for (p.has(e, a) && !p.contains(t, a) && t.push(a); n--;) a = L[n],
		a in e && e[a] !== o[a] && !p.contains(t, a) && t.push(a)
	};
	p.keys = function(e) {
		if (!p.isObject(e)) return [];
		if (d) return d(e);
		var t = [];
		for (var n in e) p.has(e, n) && t.push(n);
		return k && N(e, t),
		t
	},
	p.allKeys = function(e) {
		if (!p.isObject(e)) return [];
		var t = [];
		for (var n in e) t.push(n);
		return k && N(e, t),
		t
	},
	p.values = function(e) {
		for (var t = p.keys(e), n = t.length, i = Array(n), s = 0; n > s; s++) i[s] = e[t[s]];
		return i
	},
	p.mapObject = function(e, t, n) {
		t = m(t, n);
		for (var i = p.keys(e), s = i.length, o = {},
		a = 0; s > a; a++) {
			var r = i[a];
			o[r] = t(e[r], r, e)
		}
		return o
	},
	p.pairs = function(e) {
		for (var t = p.keys(e), n = t.length, i = Array(n), s = 0; n > s; s++) i[s] = [t[s], e[t[s]]];
		return i
	},
	p.invert = function(e) {
		for (var t = {},
		n = p.keys(e), i = 0, s = n.length; s > i; i++) t[e[n[i]]] = n[i];
		return t
	},
	p.functions = p.methods = function(e) {
		var t = [];
		for (var n in e) p.isFunction(e[n]) && t.push(n);
		return t.sort()
	};
	var E = function(e, t) {
		return function(n) {
			var i = arguments.length;
			if (t && (n = Object(n)), 2 > i || null == n) return n;
			for (var s = 1; i > s; s++) for (var o = arguments[s], a = e(o), r = a.length, l = 0; r > l; l++) {
				var c = a[l];
				t && void 0 !== n[c] || (n[c] = o[c])
			}
			return n
		}
	};
	p.extend = E(p.allKeys),
	p.extendOwn = p.assign = E(p.keys),
	p.findKey = function(e, t, n) {
		t = m(t, n);
		for (var i, s = p.keys(e), o = 0, a = s.length; a > o; o++) if (i = s[o], t(e[i], i, e)) return i
	};
	var j = function(e, t, n) {
		return t in n
	};
	p.pick = g(function(e, t) {
		var n = {},
		i = t[0];
		if (null == e) return n;
		p.isFunction(i) ? (t.length > 1 && (i = f(i, t[1])), t = p.allKeys(e)) : (i = j, t = T(t, !1, !1), e = Object(e));
		for (var s = 0,
		o = t.length; o > s; s++) {
			var a = t[s],
			r = e[a];
			i(r, a, e) && (n[a] = r)
		}
		return n
	}),
	p.omit = g(function(e, t) {
		var n, i = t[0];
		return p.isFunction(i) ? (i = p.negate(i), t.length > 1 && (n = t[1])) : (t = p.map(T(t, !1, !1), String), i = function(e, n) {
			return ! p.contains(t, n)
		}),
		p.pick(e, i, n)
	}),
	p.defaults = E(p.allKeys, !0),
	p.create = function(e, t) {
		var n = v(e);
		return t && p.extendOwn(n, t),
		n
	},
	p.clone = function(e) {
		return p.isObject(e) ? p.isArray(e) ? e.slice() : p.extend({},
		e) : e
	},
	p.tap = function(e, t) {
		return t(e),
		e
	},
	p.isMatch = function(e, t) {
		var n = p.keys(t),
		i = n.length;
		if (null == e) return ! i;
		for (var s = Object(e), o = 0; i > o; o++) {
			var a = n[o];
			if (t[a] !== s[a] || !(a in s)) return ! 1
		}
		return ! 0
	};
	var M, A;
	M = function(e, t, n, i) {
		if (e === t) return 0 !== e || 1 / e === 1 / t;
		if (null == e || null == t) return e === t;
		if (e !== e) return t !== t;
		var s = typeof e;
		return "function" !== s && "object" !== s && "object" != typeof t ? !1 : A(e, t, n, i)
	},
	A = function(e, t, n, i) {
		e instanceof p && (e = e._wrapped),
		t instanceof p && (t = t._wrapped);
		var o = r.call(e);
		if (o !== r.call(t)) return ! 1;
		switch (o) {
		case "[object RegExp]":
		case "[object String]":
			return "" + e == "" + t;
		case "[object Number]":
			return + e !== +e ? +t !== +t: 0 === +e ? 1 / +e === 1 / t: +e === +t;
		case "[object Date]":
		case "[object Boolean]":
			return + e === +t;
		case "[object Symbol]":
			return s.valueOf.call(e) === s.valueOf.call(t)
		}
		var a = "[object Array]" === o;
		if (!a) {
			if ("object" != typeof e || "object" != typeof t) return ! 1;
			var l = e.constructor,
			c = t.constructor;
			if (l !== c && !(p.isFunction(l) && l instanceof l && p.isFunction(c) && c instanceof c) && "constructor" in e && "constructor" in t) return ! 1
		}
		n = n || [],
		i = i || [];
		for (var d = n.length; d--;) if (n[d] === e) return i[d] === t;
		if (n.push(e), i.push(t), a) {
			if (d = e.length, d !== t.length) return ! 1;
			for (; d--;) if (!M(e[d], t[d], n, i)) return ! 1
		} else {
			var u, h = p.keys(e);
			if (d = h.length, p.keys(t).length !== d) return ! 1;
			for (; d--;) if (u = h[d], !p.has(t, u) || !M(e[u], t[u], n, i)) return ! 1
		}
		return n.pop(),
		i.pop(),
		!0
	},
	p.isEqual = function(e, t) {
		return M(e, t)
	},
	p.isEmpty = function(e) {
		return null == e ? !0 : x(e) && (p.isArray(e) || p.isString(e) || p.isArguments(e)) ? 0 === e.length: 0 === p.keys(e).length
	},
	p.isElement = function(e) {
		return ! (!e || 1 !== e.nodeType)
	},
	p.isArray = c ||
	function(e) {
		return "[object Array]" === r.call(e)
	},
	p.isObject = function(e) {
		var t = typeof e;
		return "function" === t || "object" === t && !!e
	},
	p.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"],
	function(e) {
		p["is" + e] = function(t) {
			return r.call(t) === "[object " + e + "]"
		}
	}),
	p.isArguments(arguments) || (p.isArguments = function(e) {
		return p.has(e, "callee")
	});
	var q = e.document && e.document.childNodes;
	"function" != typeof / . / &&"object" != typeof Int8Array && "function" != typeof q && (p.isFunction = function(e) {
		return "function" == typeof e || !1
	}),
	p.isFinite = function(e) {
		return ! p.isSymbol(e) && isFinite(e) && !isNaN(parseFloat(e))
	},
	p.isNaN = function(e) {
		return p.isNumber(e) && isNaN(e)
	},
	p.isBoolean = function(e) {
		return e === !0 || e === !1 || "[object Boolean]" === r.call(e)
	},
	p.isNull = function(e) {
		return null === e
	},
	p.isUndefined = function(e) {
		return void 0 === e
	},
	p.has = function(e, t) {
		return null != e && l.call(e, t)
	},
	p.noConflict = function() {
		return e._ = t,
		this
	},
	p.identity = function(e) {
		return e
	},
	p.constant = function(e) {
		return function() {
			return e
		}
	},
	p.noop = function() {},
	p.property = b,
	p.propertyOf = function(e) {
		return null == e ?
		function() {}: function(t) {
			return e[t]
		}
	},
	p.matcher = p.matches = function(e) {
		return e = p.extendOwn({},
		e),
		function(t) {
			return p.isMatch(t, e)
		}
	},
	p.times = function(e, t, n) {
		var i = Array(Math.max(0, e));
		t = f(t, n, 1);
		for (var s = 0; e > s; s++) i[s] = t(s);
		return i
	},
	p.random = function(e, t) {
		return null == t && (t = e, e = 0),
		e + Math.floor(Math.random() * (t - e + 1))
	},
	p.now = Date.now ||
	function() {
		return (new Date).getTime()
	};
	var O = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"`": "&#x60;"
	},
	H = p.invert(O),
	P = function(e) {
		var t = function(t) {
			return e[t]
		},
		n = "(?:" + p.keys(e).join("|") + ")",
		i = RegExp(n),
		s = RegExp(n, "g");
		return function(e) {
			return e = null == e ? "": "" + e,
			i.test(e) ? e.replace(s, t) : e
		}
	};
	p.escape = P(O),
	p.unescape = P(H),
	p.result = function(e, t, n) {
		var i = null == e ? void 0 : e[t];
		return void 0 === i && (i = n),
		p.isFunction(i) ? i.call(e) : i
	};
	var B = 0;
	p.uniqueId = function(e) {
		var t = ++B + "";
		return e ? e + t: t
	},
	p.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var F = /(.)^/,
	R = {
		"'": "'",
		"\\": "\\",
		"\r": "r",
		"\n": "n",
		"\u2028": "u2028",
		"\u2029": "u2029"
	},
	z = /\\|'|\r|\n|\u2028|\u2029/g,
	U = function(e) {
		return "\\" + R[e]
	};
	p.template = function(e, t, n) { ! t && n && (t = n),
		t = p.defaults({},
		t, p.templateSettings);
		var i = RegExp([(t.escape || F).source, (t.interpolate || F).source, (t.evaluate || F).source].join("|") + "|$", "g"),
		s = 0,
		o = "__p+='";
		e.replace(i,
		function(t, n, i, a, r) {
			return o += e.slice(s, r).replace(z, U),
			s = r + t.length,
			n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'": i ? o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'": a && (o += "';\n" + a + "\n__p+='"),
			t
		}),
		o += "';\n",
		t.variable || (o = "with(obj||{}){\n" + o + "}\n"),
		o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
		var a;
		try {
			a = new Function(t.variable || "obj", "_", o)
		} catch(r) {
			throw r.source = o,
			r
		}
		var l = function(e) {
			return a.call(this, e, p)
		},
		c = t.variable || "obj";
		return l.source = "function(" + c + "){\n" + o + "}",
		l
	},
	p.chain = function(e) {
		var t = p(e);
		return t._chain = !0,
		t
	};
	var W = function(e, t) {
		return e._chain ? p(t).chain() : t
	};
	p.mixin = function(e) {
		p.each(p.functions(e),
		function(t) {
			var n = p[t] = e[t];
			p.prototype[t] = function() {
				var e = [this._wrapped];
				return o.apply(e, arguments),
				W(this, n.apply(p, e))
			}
		})
	},
	p.mixin(p),
	p.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
	function(e) {
		var t = n[e];
		p.prototype[e] = function() {
			var n = this._wrapped;
			return t.apply(n, arguments),
			"shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
			W(this, n)
		}
	}),
	p.each(["concat", "join", "slice"],
	function(e) {
		var t = n[e];
		p.prototype[e] = function() {
			return W(this, t.apply(this._wrapped, arguments))
		}
	}),
	p.prototype.value = function() {
		return this._wrapped
	},
	p.prototype.valueOf = p.prototype.toJSON = p.prototype.value,
	p.prototype.toString = function() {
		return "" + this._wrapped
	},
	"function" == typeof define && define.amd && define("underscore", [],
	function() {
		return p
	})
} (),
function() {
	function e(t, i) {
		function o(e, t) {
			try {
				e()
			} catch(n) {
				t && t()
			}
		}
		function a(e) {
			if (null != a[e]) return a[e];
			var t;
			if ("bug-string-char-index" == e) t = "a" != "a" [0];
			else if ("json" == e) t = a("json-stringify") && a("date-serialization") && a("json-parse");
			else if ("date-serialization" == e) {
				if (t = a("json-stringify") && w) {
					var n = i.stringify;
					o(function() {
						t = '"-271821-04-20T00:00:00.000Z"' == n(new u( - 864e13)) && '"+275760-09-13T00:00:00.000Z"' == n(new u(864e13)) && '"-000001-01-01T00:00:00.000Z"' == n(new u( - 621987552e5)) && '"1969-12-31T23:59:59.999Z"' == n(new u( - 1))
					})
				}
			} else {
				var s, r = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
				if ("json-stringify" == e) {
					var n = i.stringify,
					d = "function" == typeof n;
					d && ((s = function() {
						return 1
					}).toJSON = s, o(function() {
						d = "0" === n(0) && "0" === n(new l) && '""' == n(new c) && n(b) === g && n(g) === g && n() === g && "1" === n(s) && "[1]" == n([s]) && "[null]" == n([g]) && "null" == n(null) && "[null,null,null]" == n([g, b, null]) && n({
							a: [s, !0, !1, null, "\x00\b\n\f\r	"]
						}) == r && "1" === n(null, s) && "[\n 1,\n 2\n]" == n([1, 2], null, 1)
					},
					function() {
						d = !1
					})),
					t = d
				}
				if ("json-parse" == e) {
					var h, p = i.parse;
					"function" == typeof p && o(function() {
						0 !== p("0") || p(!1) || (s = p(r), h = 5 == s.a.length && 1 === s.a[0], h && (o(function() {
							h = !p('"	"')
						}), h && o(function() {
							h = 1 !== p("01")
						}), h && o(function() {
							h = 1 !== p("1.")
						})))
					},
					function() {
						h = !1
					}),
					t = h
				}
			}
			return a[e] = !!t
		}
		function r(e) {
			return E(this)
		}
		t || (t = s.Object()),
		i || (i = s.Object());
		var l = t.Number || s.Number,
		c = t.String || s.String,
		d = t.Object || s.Object,
		u = t.Date || s.Date,
		h = t.SyntaxError || s.SyntaxError,
		p = t.TypeError || s.TypeError,
		f = t.Math || s.Math,
		m = t.JSON || s.JSON;
		"object" == typeof m && m && (i.stringify = m.stringify, i.parse = m.parse);
		var g, v = d.prototype,
		b = v.toString,
		y = v.hasOwnProperty,
		w = new u( - 0xc782b5b800cec);
		if (o(function() {
			w = -109252 == w.getUTCFullYear() && 0 === w.getUTCMonth() && 1 === w.getUTCDate() && 10 == w.getUTCHours() && 37 == w.getUTCMinutes() && 6 == w.getUTCSeconds() && 708 == w.getUTCMilliseconds()
		}), a["bug-string-char-index"] = a["date-serialization"] = a.json = a["json-stringify"] = a["json-parse"] = null, !a("json")) {
			var x = "[object Function]",
			$ = "[object Date]",
			_ = "[object Number]",
			C = "[object String]",
			T = "[object Array]",
			I = "[object Boolean]",
			S = a("bug-string-char-index"),
			D = function(e, t) {
				var i, s, o, a = 0; (i = function() {
					this.valueOf = 0
				}).prototype.valueOf = 0,
				s = new i;
				for (o in s) y.call(s, o) && a++;
				return i = s = null,
				a ? D = function(e, t) {
					var n, i, s = b.call(e) == x;
					for (n in e) s && "prototype" == n || !y.call(e, n) || (i = "constructor" === n) || t(n); (i || y.call(e, n = "constructor")) && t(n)
				}: (s = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], D = function(e, t) {
					var i, o, a = b.call(e) == x,
					r = !a && "function" != typeof e.constructor && n[typeof e.hasOwnProperty] && e.hasOwnProperty || y;
					for (i in e) a && "prototype" == i || !r.call(e, i) || t(i);
					for (o = s.length; i = s[--o]; r.call(e, i) && t(i));
				}),
				D(e, t)
			};
			if (!a("json-stringify") && !a("date-serialization")) {
				var k = {
					92 : "\\\\",
					34 : '\\"',
					8 : "\\b",
					12 : "\\f",
					10 : "\\n",
					13 : "\\r",
					9 : "\\t"
				},
				L = "000000",
				N = function(e, t) {
					return (L + (t || 0)).slice( - e)
				},
				E = function(e) {
					var t, n, i, s, o, a, r, l, c;
					if (w) t = function(e) {
						n = e.getUTCFullYear(),
						i = e.getUTCMonth(),
						s = e.getUTCDate(),
						a = e.getUTCHours(),
						r = e.getUTCMinutes(),
						l = e.getUTCSeconds(),
						c = e.getUTCMilliseconds()
					};
					else {
						var d = f.floor,
						u = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
						h = function(e, t) {
							return u[t] + 365 * (e - 1970) + d((e - 1969 + (t = +(t > 1))) / 4) - d((e - 1901 + t) / 100) + d((e - 1601 + t) / 400)
						};
						t = function(e) {
							for (s = d(e / 864e5), n = d(s / 365.2425) + 1970 - 1; h(n + 1, 0) <= s; n++);
							for (i = d((s - h(n, 0)) / 30.42); h(n, i + 1) <= s; i++);
							s = 1 + s - h(n, i),
							o = (e % 864e5 + 864e5) % 864e5,
							a = d(o / 36e5) % 24,
							r = d(o / 6e4) % 60,
							l = d(o / 1e3) % 60,
							c = o % 1e3
						}
					}
					return (E = function(e) {
						return e > -1 / 0 && 1 / 0 > e ? (t(e), e = (0 >= n || n >= 1e4 ? (0 > n ? "-": "+") + N(6, 0 > n ? -n: n) : N(4, n)) + "-" + N(2, i + 1) + "-" + N(2, s) + "T" + N(2, a) + ":" + N(2, r) + ":" + N(2, l) + "." + N(3, c) + "Z", n = i = s = a = r = l = c = null) : e = null,
						e
					})(e)
				};
				if (a("json-stringify") && !a("date-serialization")) {
					var j = i.stringify;
					i.stringify = function(e, t, n) {
						var i = u.prototype.toJSON;
						u.prototype.toJSON = r;
						var s = j(e, t, n);
						return u.prototype.toJSON = i,
						s
					}
				} else {
					var M = "\\u00",
					A = function(e) {
						var t = e.charCodeAt(0),
						n = k[t];
						return n ? n: M + N(2, t.toString(16))
					},
					q = /[\x00-\x1f\x22\x5c]/g,
					O = function(e) {
						return q.lastIndex = 0,
						'"' + (q.test(e) ? e.replace(q, A) : e) + '"'
					},
					H = function(e, t, n, i, s, a, r) {
						var l, c, d, h, f, m, v, y, w;
						if (o(function() {
							l = t[e]
						}), "object" == typeof l && l && (l.getUTCFullYear && b.call(l) == $ && l.toJSON === u.prototype.toJSON ? l = E(l) : "function" == typeof l.toJSON && (l = l.toJSON(e))), n && (l = n.call(t, e, l)), l == g) return l === g ? l: "null";
						switch (c = typeof l, "object" == c && (d = b.call(l)), d || c) {
						case "boolean":
						case I:
							return "" + l;
						case "number":
						case _:
							return l > -1 / 0 && 1 / 0 > l ? "" + l: "null";
						case "string":
						case C:
							return O("" + l)
						}
						if ("object" == typeof l) {
							for (v = r.length; v--;) if (r[v] === l) throw p();
							if (r.push(l), h = [], y = a, a += s, d == T) {
								for (m = 0, v = l.length; v > m; m++) f = H(m, l, n, i, s, a, r),
								h.push(f === g ? "null": f);
								w = h.length ? s ? "[\n" + a + h.join(",\n" + a) + "\n" + y + "]": "[" + h.join(",") + "]": "[]"
							} else D(i || l,
							function(e) {
								var t = H(e, l, n, i, s, a, r);
								t !== g && h.push(O(e) + ":" + (s ? " ": "") + t)
							}),
							w = h.length ? s ? "{\n" + a + h.join(",\n" + a) + "\n" + y + "}": "{" + h.join(",") + "}": "{}";
							return r.pop(),
							w
						}
					};
					i.stringify = function(e, t, i) {
						var s, o, a, r;
						if (n[typeof t] && t) if (r = b.call(t), r == x) o = t;
						else if (r == T) {
							a = {};
							for (var l, c = 0,
							d = t.length; d > c; l = t[c++], r = b.call(l), (r == C || r == _) && (a[l] = 1));
						}
						if (i) if (r = b.call(i), r == _) {
							if ((i -= i % 1) > 0) for (s = "", i > 10 && (i = 10); s.length < i; s += " ");
						} else r == C && (s = i.length <= 10 ? i: i.slice(0, 10));
						return H("", (l = {},
						l[""] = e, l), o, a, s, "", [])
					}
				}
			}
			if (!a("json-parse")) {
				var P, B, F = c.fromCharCode,
				R = {
					92 : "\\",
					34 : '"',
					47 : "/",
					98 : "\b",
					116 : "	",
					110 : "\n",
					102 : "\f",
					114 : "\r"
				},
				z = function() {
					throw P = B = null,
					h()
				},
				U = function() {
					for (var e, t, n, i, s, o = B,
					a = o.length; a > P;) switch (s = o.charCodeAt(P)) {
					case 9:
					case 10:
					case 13:
					case 32:
						P++;
						break;
					case 123:
					case 125:
					case 91:
					case 93:
					case 58:
					case 44:
						return e = S ? o.charAt(P) : o[P],
						P++,
						e;
					case 34:
						for (e = "@", P++; a > P;) if (s = o.charCodeAt(P), 32 > s) z();
						else if (92 == s) switch (s = o.charCodeAt(++P)) {
						case 92:
						case 34:
						case 47:
						case 98:
						case 116:
						case 110:
						case 102:
						case 114:
							e += R[s],
							P++;
							break;
						case 117:
							for (t = ++P, n = P + 4; n > P; P++) s = o.charCodeAt(P),
							s >= 48 && 57 >= s || s >= 97 && 102 >= s || s >= 65 && 70 >= s || z();
							e += F("0x" + o.slice(t, P));
							break;
						default:
							z()
						} else {
							if (34 == s) break;
							for (s = o.charCodeAt(P), t = P; s >= 32 && 92 != s && 34 != s;) s = o.charCodeAt(++P);
							e += o.slice(t, P)
						}
						if (34 == o.charCodeAt(P)) return P++,
						e;
						z();
					default:
						if (t = P, 45 == s && (i = !0, s = o.charCodeAt(++P)), s >= 48 && 57 >= s) {
							for (48 == s && (s = o.charCodeAt(P + 1), s >= 48 && 57 >= s) && z(), i = !1; a > P && (s = o.charCodeAt(P), s >= 48 && 57 >= s); P++);
							if (46 == o.charCodeAt(P)) {
								for (n = ++P; a > n && (s = o.charCodeAt(n), s >= 48 && 57 >= s); n++);
								n == P && z(),
								P = n
							}
							if (s = o.charCodeAt(P), 101 == s || 69 == s) {
								for (s = o.charCodeAt(++P), (43 == s || 45 == s) && P++, n = P; a > n && (s = o.charCodeAt(n), s >= 48 && 57 >= s); n++);
								n == P && z(),
								P = n
							}
							return + o.slice(t, P)
						}
						i && z();
						var r = o.slice(P, P + 4);
						if ("true" == r) return P += 4,
						!0;
						if ("fals" == r && 101 == o.charCodeAt(P + 4)) return P += 5,
						!1;
						if ("null" == r) return P += 4,
						null;
						z()
					}
					return "$"
				},
				W = function(e) {
					var t, n;
					if ("$" == e && z(), "string" == typeof e) {
						if ("@" == (S ? e.charAt(0) : e[0])) return e.slice(1);
						if ("[" == e) {
							for (t = []; e = U(), "]" != e;) n ? "," == e ? (e = U(), "]" == e && z()) : z() : n = !0,
							"," == e && z(),
							t.push(W(e));
							return t
						}
						if ("{" == e) {
							for (t = {}; e = U(), "}" != e;) n ? "," == e ? (e = U(), "}" == e && z()) : z() : n = !0,
							("," == e || "string" != typeof e || "@" != (S ? e.charAt(0) : e[0]) || ":" != U()) && z(),
							t[e.slice(1)] = W(U());
							return t
						}
						z()
					}
					return e
				},
				G = function(e, t, n) {
					var i = Q(e, t, n);
					i === g ? delete e[t] : e[t] = i
				},
				Q = function(e, t, n) {
					var i, s = e[t];
					if ("object" == typeof s && s) if (b.call(s) == T) for (i = s.length; i--; G(s, i, n));
					else D(s,
					function(e) {
						G(s, e, n)
					});
					return n.call(e, t, s)
				};
				i.parse = function(e, t) {
					var n, i;
					return P = 0,
					B = "" + e,
					n = W(U()),
					"$" != U() && z(),
					P = B = null,
					t && b.call(t) == x ? Q((i = {},
					i[""] = n, i), "", t) : n
				}
			}
		}
		return i.runInContext = e,
		i
	}
	var t = "function" == typeof define && define.amd,
	n = {
		"function": !0,
		object: !0
	},
	i = n[typeof exports] && exports && !exports.nodeType && exports,
	s = n[typeof window] && window || this,
	o = i && n[typeof module] && module && !module.nodeType && "object" == typeof global && global;
	if (!o || o.global !== o && o.window !== o && o.self !== o || (s = o), i && !t) e(s, i);
	else {
		var a = s.JSON,
		r = s.JSON3,
		l = !1,
		c = e(s, s.JSON3 = {
			noConflict: function() {
				return l || (l = !0, s.JSON = a, s.JSON3 = r, a = r = null),
				c
			}
		});
		s.JSON = {
			parse: c.parse,
			stringify: c.stringify
		}
	}
	t && define("json", [],
	function() {
		return c
	})
}.call(this),
define("domReady", [],
function() {
	"use strict";
	function e(e) {
		var t;
		for (t = 0; t < e.length; t += 1) e[t](c)
	}
	function t() {
		var t = d;
		l && t.length && (d = [], e(t))
	}
	function n() {
		l || (l = !0, a && clearInterval(a), t())
	}
	function i(e) {
		return l ? e(c) : d.push(e),
		i
	}
	var s, o, a, r = "undefined" != typeof window && window.document,
	l = !r,
	c = r ? document: null,
	d = [];
	if (r) {
		if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1),
		window.addEventListener("load", n, !1);
		else if (window.attachEvent) {
			window.attachEvent("onload", n),
			o = document.createElement("div");
			try {
				s = null === window.frameElement
			} catch(u) {}
			o.doScroll && s && window.external && (a = setInterval(function() {
				try {
					o.doScroll(),
					n()
				} catch(e) {}
			},
			30))
		}
		"complete" === document.readyState && n()
	}
	return i.version = "2.0.1",
	i.load = function(e, t, n, s) {
		s.isBuild ? n(null) : i(n)
	},
	i
}),
require(["jquery", "jquery-migrate", "underscore", "json", "domReady"]),
define("common", ["jquery", "jquery-migrate", "underscore", "json", "domReady"],
function() {}),
define("base/util", ["require", "exports", "module", "underscore"],
function(e) {
	var t = e("underscore"),
	n = function(e, t) {
		null !== t.decimalLength && t.decimalLength >= 0 && (e = e.toFixed(~~t.decimalLength));
		var n = 0 > e ? "-": t.symbol;
		e = 0 > e ? -e: e;
		var i = (e + "").split(t.decimal),
		s = i[0].split("").reverse(),
		o = i[1] || "",
		a = 0,
		r = 0;
		a = parseInt(s.length / t.groupLength, 10),
		r = s.length % t.groupLength,
		a = 0 === r ? a - 1 : a;
		for (var l = 1; a >= l; l++) s.splice(t.groupLength * l + (l - 1), 0, t.group);
		s = s.reverse(),
		t.trimZero && (o = o.replace(/0+$/, ""));
		var c = n + s.join("") + (o.length > 0 ? t.decimal + o: "");
		return c
	},
	i = function(e, t, i, s) {
		if (null === e) return "";
		if ("--" === e) return e;
		if (isNaN(parseFloat(e))) return e;
		var o = {
			group: ",",
			groupLength: 3,
			decimal: ".",
			decimalLength: t,
			symbol: "",
			trimZero: !!i
		};
		return s > e && e > 0 ? "< " + n(s, o) : e > -s && 0 > e ? "> " + n( - s, o) : n(e, o)
	},
	s = function(e, t, n) {
		return null === e ? "": "--" === e ? e: isNaN(parseFloat(e)) ? e: (null === t && (t = 2), i( + e, t, !0, n) + "%")
	},
	o = function(e, t) {
		var n, i, s, o, a;
		if ("--" === e) return e;
		if (2 === t) {
			s = e / 60 | 0,
			o = Math.round(e) - 60 * s;
			var r = "";
			return s && (r += s + "&#039;"),
			r += o + "&quot;"
		}
		return n = e / 86400 | 0,
		e = Math.round(e) - 24 * n * 3600,
		i = e / 3600 | 0,
		e = Math.round(e) - 3600 * i,
		s = e / 60 | 0,
		o = Math.round(e) - 60 * s,
		Math.round(n) < 10 && (n = n > 0 ? "0" + n: ""),
		Math.round(i) < 10 && (i = "0" + i),
		Math.round(s) < 10 && (s = "0" + s),
		Math.round(o) < 10 && (o = "0" + o),
		a = n ? n + " " + i + ":" + s + ":" + o: i + ":" + s + ":" + o
	},
	a = function(e, t, n) {
		if ("--" === e) return e;
		var t = null == t ? 2 : ~~t,
		n = n || "￥",
		s = parseFloat(e);
		return isNaN(s) && (s = 0),
		s = s.toFixed(t),
		n + i(s)
	},
	r = function(e, n) {
		if (null === e) return "";
		if ("--" === e || "未知" === e) return e;
		if (t.isString(n)) switch (n) {
		case "number":
			return i(e);
		case "ratio":
			return s(e);
		case "datetime":
			return d.formatDate(e, "yyyy/MM/dd HH:mm:ss");
		case "time":
			return o(e);
		case "time2":
			return o(e, 2);
		case "currency":
			return a(e);
		case "level":
			return l(e);
		case "date":
			return d.formatDate(e, "yyyy年MM月dd日");
		case "toggle":
			return !! e;
		case "index":
			return ""
		}
		return e
	},
	l = function(e) {
		var t = e.split(",");
		if (null == t[1]) return e;
		for (var n = [~~t[2]], i = 0; i < t[1]; i++) n.push(i < t[0] ? 1 : 0);
		return n
	},
	c = {
		'"': "quot",
		"'": "#39",
		"<": "lt",
		">": "gt",
		"&": "amp",
		" ": "nbsp"
	},
	d = {
		prefixInteger: function(e, t) {
			return (e / Math.pow(10, t)).toFixed(t).substr(2)
		},
		encodeAttr: function(e) {
			return String(e).replace(/["']/g,
			function(e) {
				return "&" + c[e] + ";"
			})
		},
		encodeHTML: function(e) {
			return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/ /g, "&nbsp;")
		},
		decodeHTML: function(e) {
			var t = String(e).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
			return t.replace(/&#([\d]+);/g,
			function(e, t) {
				return String.fromCharCode(parseInt(t, 10))
			})
		},
		camelize: function(e) {
			return e = e.toLowerCase(),
			e = e.replace(/\b\w+\b/g,
			function(e) {
				return e.substring(0, 1).toUpperCase() + e.substring(1)
			})
		},
		truncat: function(e, t) {
			if (null == e) return e;
			var n = 1;
			return /[^\x00-\xff]/.test(e) && (t = Math.floor(2 * t / 3), n = 2),
			e.length > t ? e.substr(0, t - 2 / n) + "...": e
		},
		format: function(e, t) {
			e = String(e);
			var n = Array.prototype.slice.call(arguments, 1),
			i = Object.prototype.toString;
			return n.length ? (n = 1 === n.length && null !== t && /\[object Array\]|\[object Object\]/.test(i.call(t)) ? t: n, e.replace(/(#|!)\{(.+?)(?:\s*,\s*(\d+?))*?\}/g,
			function(e, t, s, o) {
				var a = n[s];
				return "[object Function]" === i.call(a) && (a = a(s)),
				o && (a = d.truncat(a, o)),
				"!" === t && (a = d.encodeHTML(a)),
				"undefined" == typeof a ? "": a
			})) : e
		},
		formatDate: function(e, t) {
			function n(e, n) {
				t = t.replace(e, n)
			}
			if ("string" != typeof t) return e.toString();
			d.isDate(e) || (e = new Date(e));
			var i = function(e, t) {
				var n = "",
				i = 0 > e,
				s = String(Math.abs(e));
				return s.length < t && (n = new Array(t - s.length + 1).join("0")),
				(i ? "-": "") + n + s
			},
			s = e.getFullYear(),
			o = e.getMonth() + 1,
			a = e.getDate(),
			r = e.getHours(),
			l = e.getMinutes(),
			c = e.getSeconds();
			return n(/yyyy/g, i(s, 4)),
			n(/yy/g, i(parseInt(s.toString().slice(2), 10), 2)),
			n(/MM/g, i(o, 2)),
			n(/M/g, o),
			n(/dd/g, i(a, 2)),
			n(/d/g, a),
			n(/HH/g, i(r, 2)),
			n(/H/g, r),
			n(/hh/g, i(r % 12, 2)),
			n(/h/g, r % 12),
			n(/mm/g, i(l, 2)),
			n(/m/g, l),
			n(/ss/g, i(c, 2)),
			n(/s/g, c),
			t
		},
		parseDate: function(e) {
			var t = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+$");
			if ("string" == typeof e) {
				if (t.test(e) || isNaN(Date.parse(e))) {
					var n = e.split(/ |T/),
					i = n.length > 1 ? n[1].split(/[^\d]/) : [0, 0, 0],
					s = n[0].split(/[^\d]/);
					return new Date(s[0] - 0, s[1] - 1, s[2] - 0, i[0] - 0, i[1] - 0, i[2] - 0)
				}
				return new Date(e)
			}
			return new Date
		},
		namespace: function(e) {
			if (!e || !e.length) return null;
			for (var t = window,
			n = e.split("."), i = n.length, s = "window" === n[0] ? 1 : 0; i > s; t = t[n[s]] = t[n[s]] || {},
			s++);
			return t
		},
		truncate: function(e, t, n, i) {
			return null === e ? "": (e = String(e), "undefined" != typeof i ? (i = n, n = "...") : n = n || "...", t = ~~t, i ? e.length > t ? e.slice(0, t / 2) + n + e.slice( - t / 2) : e: e.length > t ? e.slice(0, t) + n: e)
		},
		truncatFloat: function(e, t) {
			var n = Math.pow(10, t);
			return Math.round(e * n) / n
		},
		dasherize: function(e, t) {
			var n = d.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase();
			return t ? n.replace(/^-/, "") : n
		},
		getParameterByName: function(e) {
			e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
			n = t.exec(location.search);
			return null === n ? "": decodeURIComponent(n[1].replace(/\+/g, " "))
		},
		upperCaseFirstLetter: function(e) {
			return e.replace(/\b[a-z]/g,
			function(e) {
				return e.toUpperCase()
			})
		},
		gup: function(e, t) {
			t || (t = location.href),
			e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var n = "[\\?&]" + e + "=([^&#]*)",
			i = new RegExp(n),
			s = i.exec(t);
			return null == s ? null: s[1]
		},
		arrayContains: function(e, t) {
			var n = function(e, t, n) {
				var i = e.length;
				for (n = 0 | n, 0 > n && (n = Math.max(0, i + n)); i > n; n++) if (n in e && String(e[n]) === String(t)) return n;
				return - 1
			};
			return n(e, t) >= 0
		},
		arrayRemoveAt: function(e, t) {
			return e.splice(t, 1)[0]
		},
		arrayRemove: function(e, t) {
			for (var n = e.length; n--;) n in e && e[n] === t && e.splice(n, 1);
			return e
		},
		arrayFind: function(e, t) {
			var n, i, s = e.length;
			if ("function" == typeof t) for (i = 0; s > i; i++) if (n = e[i], !0 === t.call(e, n, i)) return n;
			return null
		},
		isDate: function(e) {
			return "[object Date]" === Object.prototype.toString.call(e)
		},
		isPhone: function(e) {
			return e += "",
			/(^(\d{3,4}-?)?\d{7,8}$)|(^1\d{10}$)/.test(e)
		},
		isUrl: function(e) {
			var t = new RegExp("^((https|http|ftp|rtsp|mms)?:\\/\\/)?(([\\w-]+\\.)+[a-z]{2,6}|((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d))(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?", "i");
			return t.test(e)
		},
		isEmail: function(e) {
			return /^\w+([-\.]\w+)*@\w+([-\.]\w+)*\.\w+([-\.]\w+)*$/i.test(e)
		},
		isString: function(e) {
			return t.isString(e)
		},
		swfVersion: function() {
			var e = navigator;
			if (e.plugins && e.mimeTypes.length) {
				var t = e.plugins["Shockwave Flash"];
				if (t && t.description) return t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
			} else if (window.ActiveXObject && !window.opera) for (var n = 12; n >= 2; n--) try {
				var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n);
				if (i) {
					var s = "GetVariable",
					o = i[s]("$version");
					return o.replace(/WIN/g, "").replace(/,/g, ".")
				}
			} catch(a) {}
		},
		swfCreateHTML: function(e) {
			e = e || {};
			var t, n, i, s, o, a, r = this.swfVersion(),
			l = e.ver || "6.0.0",
			c = {},
			d = this.encodeHTML;
			for (s in e) c[s] = e[s];
			if (e = c, !r) return "";
			for (r = r.split("."), l = l.split("."), i = 0; 3 > i && (t = parseInt(r[i], 10), n = parseInt(l[i], 10), !(t > n)); i++) if (n > t) return "";
			var u = e.vars,
			h = ["classid", "codebase", "id", "width", "height", "align"];
			if (e.align = e.align || "middle", e.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", e.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0", e.movie = e.url || "", delete e.vars, delete e.url, "string" == typeof u) e.flashvars = u;
			else {
				var p = [];
				for (s in u) a = u[s],
				p.push(s + "=" + encodeURIComponent(a));
				e.flashvars = p.join("&")
			}
			var f = ["<object "];
			for (i = 0, o = h.length; o > i; i++) a = h[i],
			f.push(" ", a, '="', d(e[a]), '"');
			f.push(">");
			var m = {
				wmode: 1,
				scale: 1,
				quality: 1,
				play: 1,
				loop: 1,
				menu: 1,
				salign: 1,
				bgcolor: 1,
				base: 1,
				allowscriptaccess: 1,
				allownetworking: 1,
				allowfullscreen: 1,
				seamlesstabbing: 1,
				devicefont: 1,
				swliveconnect: 1,
				flashvars: 1,
				movie: 1
			};
			for (s in e) a = e[s],
			s = s.toLowerCase(),
			m[s] && (a || a === !1 || 0 === a) && f.push('<param name="' + s + '" value="' + d(a) + '" />');
			e.src = e.movie,
			e.name = e.id,
			delete e.id,
			delete e.movie,
			delete e.classid,
			delete e.codebase,
			e.type = "application/x-shockwave-flash",
			e.pluginspage = "http://www.macromedia.com/go/getflashplayer",
			f.push("<embed");
			var g;
			for (s in e) if (a = e[s], a || a === !1 || 0 === a) {
				if (new RegExp("^salign$", "i").test(s)) {
					g = a;
					continue
				}
				f.push(" ", s, '="', d(a), '"')
			}
			return g && f.push(' salign="', d(g), '"'),
			f.push("></embed></object>"),
			f.join("")
		},
		swfCreate: function(e, t) {
			e = e || {};
			var n = this.swfCreateHTML(e) || e.errorMessage || "";
			t && "string" == typeof t && (t = document.getElementById(t)),
			t ? t.innerHTML = n: document.write(n)
		},
		swfGetMovie: function(e) {
			var n, i = document[e];
			return $.browser.msie && 9 === +$.browser.version ? i && i.length ? 1 === (n = this.arrayRemove(t.toArray(i),
			function(e) {
				return "embed" !== e.tagName.toLowerCase()
			})).length ? n[0] : n: i: i || window[e]
		},
		formatNumber: i,
		formatRatio: s,
		formatData: r,
		formatTime: o,
		formatCurrency: a,
		formatLevel: l
	};
	return d
}),
define("base/class", [],
function() {
	var e = !1,
	t = /xyz/.test(function() {}) ? /\b_super\b/: /.*/,
	n = function() {};
	return n.extend = function(n) {
		function i() { ! e && this.init && this.init.apply(this, arguments)
		}
		var s = this.prototype;
		e = !0;
		var o = new this;
		e = !1;
		for (var a in n) o[a] = "function" == typeof n[a] && "function" == typeof s[a] && t.test(n[a]) ?
		function(e, t) {
			return function() {
				var n = this._super;
				this._super = s[e];
				var i = t.apply(this, arguments);
				return this._super = n,
				i
			}
		} (a, n[a]) : n[a];
		return i.prototype = o,
		i.prototype.constructor = i,
		i.extend = arguments.callee,
		i
	},
	n
}),
define("base/guid", ["require", "exports", "module"],
function(e) {
	var t = window.guid || {},
	n = function() {
		return "HM__" + (t._counter++).toString(36)
	};
	return t._counter = t._counter || 1,
	n
}),
define("component/UIBase", ["require", "exports", "module", "base/class", "base/util", "base/guid"],
function(e) {
	var t = e("base/class"),
	n = (e("base/util"), e("base/guid"));
	return t.extend({
		EVENTS: {},
		_cache: {},
		template: "",
		templates: [],
		_type: "",
		_getGuid: function() {
			return this.hasOwnProperty("_guid") ? this._guid: (this._guid = n(), this._guid)
		},
		init: function(e) {
			this.options = $.extend(!0, $.extend(!0, {},
			this.options), e),
			this.uiType = this._type,
			this.classPrefix = this._type,
			this._init && this._init(),
			e.autoRender && this.render()
		},
		get: function(e) {
			return this.options[e]
		},
		set: function(e, t) {
			this.options[e] = t
		},
		getId: function(e) {
			var t = this,
			n = ["jquery-", t._type || "", "--", t.id ? t.id: t._getGuid()];
			return n = n.join(""),
			void 0 !== e ? n + "-" + e: n
		}
	})
}),
define("component/Tip", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	{
		var t = e("./UIBase");
		e("base/util")
	}
	return t.extend({
		_type: "tip",
		options: {
			target: document.body,
			tip: null,
			position: null,
			layout: ""
		},
		_init: function() {
			this.position = this.options.position || $(this.target).offset(),
			this.target = this.options.target,
			this.tip = this.options.tip;
			var e = $(this.target);
			if ($.holmes.Tip = $.holmes.Tip || {},
			$.holmes.Tip.targetsTips = $.holmes.Tip.targetsTips || [], e.length) {
				var t = $.holmes.Tip.targetsTips.length;
				if (0 === t) $.holmes.Tip.targetsTips.push(this);
				else {
					for (var n = !1,
					i = 0; t > i; i++) {
						if ($.holmes.Tip.targetsTips[i].target === this.target) {
							$.holmes.Tip.targetsTips[i] = this,
							n = !0;
							break
						}
						n = !1
					}
					n || $.holmes.Tip.targetsTips.push(this)
				}
			}
		},
		getTargetPosition: function() {
			return $(this.target).offset()
		},
		render: function() {
			var e;
			if (this.getTargetPosition().left + 275 >= $(document.body).width()) {
				{
					$(document.body).width()
				}
				$(this.tip).css({
					left: $(document.body).width() - 275,
					top: this.getTargetPosition().top + this.target.get(0).offsetHeight + 10
				}),
				e = $(".tip-arrow", this.tip);
				var t = this.getTargetPosition().left + 275 - $(document.body).width();
				e.css("left", 10 + t)
			} else e = $(".tip-arrow", this.tip),
			$(this.tip).css({
				left: this.getTargetPosition().left,
				top: this.getTargetPosition().top + this.target.get(0).offsetHeight + 10
			}),
			e.css("left", "10px");
			$(this.tip).addClass(this.options.layout),
			$(document.body).append($(this.tip)),
			$.fn.bgIframe($("#tip-container"))
		}
	})
}),
define("base/base", ["require", "exports", "module", "base/util", "component/Tip", "underscore"],
function(e) {
	$.holmes = $.holmes || {};
	var t = e("base/util"),
	n = e("component/Tip"),
	i = e("underscore");
	$.holmes.util = t,
	$.holmes.getCornerPosition = function(e, t, n) {
		var s;
		s = $(i.isString(e) ? "#" + e: e);
		var o = s.position();
		switch (t) {
		case "br":
			o.left += s.width(),
			o.top += s.height();
			break;
		case "tr":
			o.left += s.width();
			break;
		case "bl":
			o.top += s.height()
		}
		return n && (n.left && (o.left += n.left), n.top && (o.top += n.top)),
		o
	},
	$.holmes.setPosition = function(e, t) {
		var n;
		n = $(i.isString(e) ? "#" + e: e),
		n.css({
			top: t.top - (parseFloat(n.css("margin-top")) || 0),
			left: t.left - (parseFloat(n.css("margin-left")) || 0)
		})
	},
	$.holmes.setRelatedPosition = function(e, t, n, i) {
		$.holmes.setPosition(e, $.holmes.getCornerPosition(t, n, i))
	},
	$.holmes.ajaxCheckConditionalPageTip = function(e) {
		var t, n = $("#ConditionalPageTip");
		e ? (t = $(".text", n).eq(0)[0], t.innerHTML = e, n.show()) : n.hide()
	},
	$.holmes.showNewVersion = function() {
		function e() {
			b(),
			s(),
			n()
		}
		function n() {
			$(document).on("click",
			function(e) {
				var t = $(e.target);
				t.hasClass("intro-next") ? o() : (t.hasClass("intro-close") || t.hasClass("intro-enter")) && i()
			})
		}
		function i() {
			$.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, {
				method: "trend/time/closeGuide",
				id: $.holmes.config.userInfo.id
			},
			function() {
				window.location.href = $.holmes.config.systemConfig.baseUri + "/homepage/index"
			},
			function() {
				window.location.href = $.holmes.config.systemConfig.baseUri + "/homepage/index"
			})
		}
		function s() {
			var e = '<div class="intro-step intro-welcome"><div class="intro-welcome-detail"></div><div class="intro-btn intro-welcome-btn intro-next"></div></div>';
			T.append(e);
			var t = $(".intro-welcome");

			t.css({
				left: ($(window).width() - t.width()) / 2,
				top: ($(window).height() - t.height()) / 2
			}),
			$(window).on("resize",
			function() {
				t.css({
					left: ($(window).width() - t.width()) / 2,
					top: ($(window).height() - t.height()) / 2
				})
			})
		}
		function o() {
			if (x = "undefined" == typeof x ? 0 : ++x, C >= x) {
				var e = $("#" + _[x]);
				a(),
				r(e)
			}
		}
		function a() {
			$(".intro-step").remove(),
			$(".intro-helper-layer").remove(),
			$(".intro-show-element").removeClass("intro-show-element"),
			$(".intro-show-relative").removeClass("intro-show-relative")
		}
		function r(e) {
			"static" === e.css("position") && e.addClass("intro-show-relative"),
			e.addClass("intro-show-element"),
			v(e),
			l(e)
		}
		function l(e) {
			var n = x !== C - 1 ? "intro-next intro-next-btn": "intro-enter intro-enter-btn",
			i = t.format('<div class="intro-step intro-tooltip"><div class="intro-close"></div><div class="intro-btn #{0}"></div></div>', n);
			T.append(i);
			var s = $(".intro-tooltip"),
			o = $(".intro-helper-layer"),
			a = $(".intro-btn"),
			r = $(".intro-close");
			switch ($(window).off("scroll", h), $(window).off("resize", h), $(window).off("resize", u), e.attr("id")) {
			case "aside":
				s.css({
					top:
					110,
					left: 120
				}),
				s.addClass("intro-aside"),
				a.css({
					"margin-top": 269,
					"margin-left": 214
				}),
				r.css({
					top: 65,
					left: 400
				});
				break;
			case "content-header-wrapper":
				h(),
				$(window).on("scroll", h),
				$(window).on("resize", h),
				s.addClass("intro-filter"),
				a.css({
					"margin-top": 309,
					"margin-left": 168
				}),
				r.css({
					top: 110,
					left: 360
				});
				break;
			case "table-indicator":
				w(e),
				s.css("position", "absolute"),
				o.css("position", "absolute"),
				s.css({
					top: e.offset().top - s.height() + 45,
					left: e.offset().left + 100
				}),
				s.addClass("intro-indicator"),
				a.css({
					"margin-top": 238,
					"margin-left": 155
				}),
				r.css({
					top: 30,
					left: 335
				});
				break;
			case "misc":
				u(),
				$(window).on("resize", u),
				s.addClass("intro-misc"),
				a.css({
					"margin-top": 237,
					"margin-left": 103
				}),
				r.css({
					top: 30,
					left: 292
				});
				break;
			case "homepage":
				w(e),
				d(),
				c(),
				$(window).on("scroll", c),
				$(window).on("resize", c),
				s.addClass("intro-homepage"),
				a.css({
					"margin-top": 273,
					"margin-left": 89
				}),
				r.css({
					top: 60,
					left: 280
				})
			}
		}
		function c() {
			var e = $("#homepage"),
			t = $(".intro-tooltip");
			t.css({
				top: e.offset().top - $(window).scrollTop() + 60,
				left: e.offset().left - 136
			})
		}
		function d() {
			var e = $(".header-wrapper"),
			t = $(".header"),
			n = '<div class="intro-header-homepage intro-header-overlay"></div>';
			e.css("z-index", 1e4),
			t.append(n);
			var i = $(".intro-header-homepage");
			i.css({
				height: e.height()
			}),
			$("#homepage").css("background-color", "#1276e5"),
			$("#site-list-container").css("z-index", -1)
		}
		function u() {
			var e = $("#misc"),
			t = $(".intro-tooltip");
			t.css({
				top: e.position().top - 174,
				left: e.position().left - 394
			})
		}
		function h() {
			var e = $("#content-header"),
			t = $(".intro-tooltip");
			t.css({
				top: e.offset().top - $(window).scrollTop() + 74,
				left: e.offset().left + 130
			})
		}
		function p(e) {
			var t = $(".intro-helper-layer"),
			n = e.data.el;
			t.css({
				top: n.position().top,
				left: n.position().left
			})
		}
		function f(e) {
			var t = $(".intro-helper-layer"),
			n = $("#content-header"),
			i = e.data.el;
			"relative" === n.css("position") ? t.css({
				top: i.offset().top - $(window).scrollTop(),
				left: i.offset().left
			}) : "fixed" === n.css("position") && t.css({
				top: n.position().top,
				left: n.position().left
			})
		}
		function m(e) {
			var t = $(".intro-helper-layer"),
			n = e.data.el;
			t.css({
				width: n.outerWidth(),
				height: n.outerHeight()
			})
		}
		function g(e) {
			{
				var t = $(".header-wrapper"),
				n = $(".intro-header-homepage");
				e.data.el
			}
			"static" === t.css("position") ? n.removeClass("intro-header-overlay") : n.addClass("intro-header-overlay")
		}
		function v(e) {
			var t = '<div class="intro-helper-layer"></div>';
			T.append(t);
			var n = $(".intro-helper-layer");
			switch (n.css({
				width: e.outerWidth(),
				height: e.outerHeight(),
				top: e.position().top,
				left: e.position().left
			}), $(window).off("scroll", m), $(window).off("scroll", p), $(window).off("scroll", f), $(window).off("scroll", g), $(window).off("resize", m), $(window).off("resize", p), $(window).off("resize", f), $(window).off("resize", g), $(window).on("resize", {
				el: e
			},
			m), $(window).on("scroll", {
				el: e
			},
			m), e.attr("id")) {
			case "aside":
			case "misc":
				$(window).on("resize", {
					el: e
				},
				p),
				$(window).on("scroll", {
					el: e
				},
				p);
				break;
			case "content-header-wrapper":
				$(window).on("scroll", {
					el: e
				},
				f),
				$(window).on("resize", {
					el: e
				},
				f),
				$(window).triggerHandler("scroll");
				break;
			case "homepage":
				n.css("left", e.position().left + 8),
				$(window).on("resize", {
					el: e
				},
				g),
				$(window).on("scroll", {
					el: e
				},
				g),
				$(window).triggerHandler("scroll")
			}
		}
		function b() {
			var e = '<div class="intro-overlay"></div>';
			T.append(e)
		}
		function y(e) {
			var t = e[0],
			n = t.getBoundingClientRect();
			return n.top >= 0 && n.left >= 0 && n.bottom + 80 <= window.innerHeight && n.right <= window.innerWidth
		}
		function w(e) {
			var t = e[0];
			if (!y(e)) {
				var n = t.getBoundingClientRect(),
				i = $(window).height(),
				s = n.bottom - (n.bottom - n.top),
				o = n.bottom - i;
				0 > s || t.clientHeight > i ? window.scrollBy(0, s - 400) : window.scrollBy(0, o + 70 + 30)
			}
		}
		var x, _ = ["aside", "content-header-wrapper", "table-indicator", "misc", "homepage"],
		C = _.length,
		T = $("body");
		_ && _.length && e()
	},
	$.holmes.ajaxJsonPost = function(e, t, n, i) {
		return $.ajax(e, {
			data: $.param(t),
			dataType: "text",
			success: function(e, s, o) {
				var a = null;
				try {
					a = new Function("return (" + o.responseText + ")")(),
					0 === a.status || a.status > 2 ? (n(a.data, a.status), 0 === a.status && /\/a$/i.test(t.method) && $.holmes.ajaxCheckConditionalPageTip(a.msg)) : 1 === a.status ? i && i(a.msg) : 2 === a.status && (window.location = a.data)
				} catch(r) {
					i && i("系统错误，请稍候再试…")
				}
			},
			error: function(e) {
				0 !== e.status && i && i("系统错误，请稍候再试…")
			},
			type: "POST",
			noCache: !0
		})
	},
	$.holmes.inlineTip = function(e) {
		var t = $("#" + e);
		if (t[0]) if (t.attr("defaultText")) {
			t.on("click",
			function() {
				$.trim(this.value) === $(this).attr("defaultText") ? ($(this).removeClass("gray"), this.value = "") : $(this).removeClass("gray")
			}),
			t.on("blur",
			function() { ("" === $.trim(this.value) || $.trim(this.value) === this.attr("defaultText")) && ($(this).addClass("gray"), this.value = $(this).attr("defaultText"))
			});
			var n = t.attr("defaultText");
			n !== t.val() ? t.removeClass("gray") : t.addClass("gray")
		} else t.addClass("gray"),
		t.on("click",
		function() {
			$.trim(this.value) === this.defaultValue && ($(this).removeClass("gray"), this.value = "")
		}),
		t.on("blur",
		function() {
			"" === $.trim(this.value) && ($(this).addClass("gray"), this.value = this.defaultValue)
		})
	},
	$.holmes.getInlineTipInputValue = function(e) {
		var t = $("#" + e);
		if (t[0]) return t.attr("defaultText") && t.attr("defaultText") === t.val() ? "": t.val()
	},
	$.holmes.clearInlineTipInputValue = function(e) {
		var t = $("#" + e);
		t[0] && null != t[0].defaultValue && (t.removeClass("gray"), t.val(t[0].defaultValue), t.off("focus blur"))
	},
	$.holmes.getTipElement = function(e) {
		var t = $("<div>")[0];
		return $(t).css("position", "absolute"),
		t.className = "tip-container",
		t.innerHTML = '<div style="position: relative;top:8px; left:-10px;" class="tip-div tip-theme title-theme"><div class="tip-arrow"></div><div class="tip-wrap">' + e + "</div></div>",
		t
	},
	$.holmes.Tip = {
		targetsTips: [],
		customTips: [{
			id: "trans",
			tip: '在此选择您所设置的转化目标，<a href="//sitecenter.baidu.com/sc-web/#{userId}/home/trans/basicsetting?siteId=#{siteId}" target="_blank">设置转化</a>'
		},
		{
			id: "oc",
			tip: "触发关键词的搜索词和关键词对应的URL的内容集合。"
		},
		{
			id: "expand_content",
			tip: "触发关键词的搜索词和关键词对应的URL的内容集合。"
		},
		{
			id: "anti_code",
			tip: "用于屏蔽异常访客，使得您网站的搜索广告不对被屏蔽的访客展示。屏蔽码由商盾提供，一个网民可能对应多个屏蔽码。"
		},
		{
			id: "visitorId",
			tip: "访客标识码是百度统计根据访客的访问设备、系统环境、cookie等参数生成的一个用于识别唯一访客的标记。"
		}],
		close: function() {
			$(".tip-container").remove()
		},
		bindEvent: function() {
			$(document).on("click",
			function(e) {
				for (var t = $(e.target), n = !1, i = $.holmes.Tip.targetsTips, s = 0, o = i.length; o > s; s++) t.get(0) === i[s].target.get(0) && ($.holmes.Tip.close(), i[s].render(), n = !0);
				n || t.closest(".help").length || t.closest(".tip-container").length || $.holmes.Tip.close()
			});
			var e, t;
			$(document).on("mouseover",
			function(n) {
				var i = $(n.target);
				$(".tip-container").length && (i.closest(".help").length || i.closest(".tip-container").length ? clearTimeout(e) : (clearTimeout(e), e = setTimeout(function() {
					$.holmes.Tip.close()
				},
				500))),
				i.closest(".help").length ? (clearTimeout(t), t = setTimeout(function() {
					for (var e = !1,
					t = $.holmes.Tip.targetsTips,
					n = 0,
					s = t.length; s > n; n++) i.get(0) === t[n].target.get(0) && ($.holmes.Tip.close(), t[n].render(), e = !0);
					e || $.holmes.Tip.close()
				},
				500)) : clearTimeout(t)
			})
		},
		loadTips: function() {
			var e = $.extend({},
			$.holmes.Tip.targetsTips, !0);
			$.holmes.Tip.targetsTips = [];
			var i = $(".help"),
			s = $.holmes.config;
			i.each(function() {
				var i = $(this),
				o = i.attr("customTip");
				if (o) {
					for (var a = 0,
					r = e.length; r > a; a++) if (i === $(e[a].target)) {
						new n({
							target: i,
							tip: e[a].tip,
							layout: e[a].layout
						});
						break
					}
				} else {
					var l = i.attr("data");
					if (l) {
						var c = s.indexInfo;
						if (c && c.indicators) {
							var i = $(this),
							d = i.attr("data"),
							u = c.indicators.concat(c.indexes);
							u = u.concat($.holmes.Tip.customTips);
							for (var a = 0,
							r = u.length; r > a; a++) if (u[a] && u[a].tip && u[a].id === d) {
								var h = $("<div/>", {
									style: "position: absolute;"
								});
								h.addClass("tip-container");
								var p = s.pageInfo.targetUserId,
								f = s.siteInfo.siteId,
								m = {
									userId: p,
									siteId: f
								};
								u[a].tip = t.format(u[a].tip, m),
								h.html('<div style="zoom: 1;position: relative; left:-12px;" class="tip-div tip-theme indicator-theme"><div class="tip-arrow"></div><div class="tip-wrap">' + u[a].tip + "</div></div>"),
								new n({
									target: i,
									tip: h
								})
							}
						}
					} else if (s.pageInfo.tip) {
						var h = $("<div/>", {
							style: "position: absolute;"
						});
						h.addClass("tip-container"),
						h.html('<div style="zoom: 1;position: relative; left:-13px;" class="tip-div tip-theme report-theme"><div class="tip-arrow"></div><div class="tip-wrap"><div class="tip-head"><div class="tip-head-text">' + s.pageInfo.title + '</div><div class="tip-close" onclick="$.holmes.Tip.close()">×</div></div><div class="tip-body"><table class="tip-table"><tbody class="tip-table-body"><tr class="tip-row"><th class="tip-title">含义：</th><th class="tip-content">' + s.pageInfo.tip.title + '</th></tr><tr class="tip-row"><th class="tip-title">作用：</th><th class="tip-content">' + s.pageInfo.tip.content + "</th></tr></tbody></table></div></div></div>"),
						new n({
							target: i,
							tip: h
						})
					}
				}
			})
		}
	},
	$.holmes.isIco = function() {
		return $.holmes.config.userInfo.roles.ico
	},
	$.holmes.isUnion = function() {
		return $.holmes.config.userInfo.roles.webmaster
	},
	$.holmes.isMultipleSite = function() {
		return $.holmes.config.siteInfo.isMultipleSite
	},
	$.holmes.isCustomer = function() {
		var e, t = /.*customer$/i;
		for (var n in $.holmes.config.userInfo.roles) $.holmes.config.userInfo.roles.hasOwnProperty(n) && t.test(n) && $.holmes.config.userInfo.roles[n] && (e = !0);
		return e
	},
	function(e) {
		function t(e) {
			return e && e.constructor === Number ? e + "px": e
		}
		e.fn.bgiframe = e.browser.msie && /msie 6.0/i.test(navigator.userAgent) ?
		function(n, i) {
			i = e.extend({
				top: "auto",
				left: "auto",
				width: "auto",
				height: "auto",
				opacity: !0,
				src: "javascript:false;"
			},
			i);
			var s = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + i.src + '"style="display:block;position:absolute;z-index:-1;' + (i.opacity !== !1 ? "filter:Alpha(Opacity='0');": "") + "top:" + ("auto" === i.top ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')": t(i.top)) + ";left:" + ("auto" === i.left ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')": t(i.left)) + ";width:" + ("auto" === i.width ? "expression(this.parentNode.offsetWidth+'px')": t(i.width)) + ";height:" + ("auto" === i.height ? "expression(this.parentNode.offsetHeight+'px')": t(i.height)) + ';"/>';
			return e.each(n,
			function(t, n) {
				0 === e("iframe.bgiframe", n).length && n.insertBefore(e(s)[0], n.firstChild)
			})
		}: function() {
			return this
		},
		e.fn.bgIframe = e.fn.bgiframe
	} (jQuery),
	function() {
		var e = null,
		t = null;
		$(document.body).on("click",
		function(n) {
			var i = $(n.target)[0],
			s = null,
			o = null;
			do i !== document && ($(i).hasClass("layer") && (o = i), void 0 !== $(i).attr("layer") && (s = i));
			while (i = i.parentNode);
			var a = function(e, t) {
				t ? $(e).addClass("selected") : $(e).removeClass("selected"),
				t ? $(e).find(".arrow").addClass("selected") : $(e).find(".arrow").removeClass("selected")
			};
			if (null == s) null != t && o !== t && ($(t).hide(), a(e, !1), t = null, e = null);
			else {
				var r = $($(s).attr("layer"))[0];
				null != r && (null != t && r !== t && ($(t).hide(), a(e, !1)), t = null, e = null, "none" === r.style.display || $(r).hasClass("shared-layer") ? ($(r).show(), a(s, !0), t = r, e = s) : ($(r).hide(), a(s, !1)))
			}
		})
	} (),
	function(e) {
		var t = function(e, t, n, i) {
			return e ? (e.dispatchEvent ? e.addEventListener(t, n, !!i) : e.attachEvent("on" + t, n), n) : void 0
		},
		n = function(e, t, n, i) {
			e && (e.dispatchEvent ? e.removeEventListener(t, n, !!i) : e.detachEvent("on" + t, n))
		},
		i = "mousewheel";
		try {
			document.createEvent("MouseScrollEvents"),
			i = "DOMMouseScroll"
		} catch(s) {}
		var o, a = function(t, n) {
			var i = n.delta;
			return "wheelDelta" in n ? (i = n.wheelDelta, window.opera && opera.version() < 10 && (i = -i), n.delta = Math.round(i) / 120) : "detail" in n && (n.wheelDelta = 40 * -n.detail, n.delta = n.wheelDelta / 120),
			i = n.delta,
			n.stopPropagation && n.stopPropagation(),
			n.cancelBubble = !0,
			e(t).innerHeight() + e(t).scrollTop() >= t.scrollHeight && 0 > i ? (n.preventDefault && n.preventDefault(), !1) : 0 === e(t).scrollTop() && i > 0 ? (n.preventDefault && n.preventDefault(), !1) : void 0
		};
		e.stopScrollBubble = function(n) {
			o = t(n, i, e.proxy(a, this, n))
		},
		e.offStopScrollBubble = function(e) {
			n(e, i, o)
		}
	} (jQuery),
	function(e) {
		e.fn.addBack = e.fn.addBack || e.fn.andSelf,
		e.fn.extend({
			actual: function(t, n) {
				if (!this[t]) throw '$.actual => The jQuery method "' + t + '" you called does not exist';
				var i, s, o = {
					absolute: !1,
					clone: !1,
					includeMargin: !1
				},
				a = e.extend(o, n),
				r = this.eq(0);
				if (a.clone === !0) i = function() {
					var e = "position: absolute !important; top: -1000 !important; ";
					r = r.clone().attr("style", e).appendTo("body")
				},
				s = function() {
					r.remove()
				};
				else {
					var l, c = [],
					d = "";
					i = function() {
						l = r.parents().addBack().filter(":hidden"),
						d += "visibility: hidden !important; display: block !important;",
						a.absolute === !0 && (d += "position: absolute !important;"),
						l.each(function() {
							var t = e(this);
							c.push(t.attr("style")),
							t.attr("style", d)
						})
					},
					s = function() {
						l.each(function(t) {
							var n = e(this),
							i = c[t];
							void 0 === i ? n.removeAttr("style") : n.attr("style", i)
						})
					}
				}
				i();
				var u = /(outer)/.test(t) ? r[t](a.includeMargin) : r[t]();
				return s(),
				u
			}
		})
	} (jQuery),
	window.loadedCallback = function(e) {
		$.holmes.eventEmitter.trigger("onflashLoaded", e)
	},
	window.createImageSuccess = function(e) {
		$.holmes.eventEmitter.trigger("onflashCreateImageSuccess", e)
	}
}),
define("base/eventEmitter", ["require", "exports", "module", "underscore"],
function(e) {
	var t = e("underscore"),
	n = {
		events: {},
		_owner: window,
		register: function(e, n) {
			if (t.isFunction(n)) {
				var i = this.events;
				0 !== e.indexOf("on") && (e = "on" + e),
				t.isArray(i[e]) || (i[e] = []),
				i[e].push(n)
			}
		},
		unbind: function(e, n) {
			var i = this.events;
			0 !== e.indexOf("on") && (e = "on" + e),
			i[e] && ("undefined" != typeof n ? t.each(i[e],
			function(t, s) {
				n === t && delete i[e][s]
			}) : i[e] = [])
		},
		trigger: function(e) {
			var n = [].slice.call(arguments, 1),
			i = 0;
			this.events[e] && (i = this.events[e].length);
			var s = this;
			this.events[e] && i > 0 ? t.each(this.events[e],
			function(e) {
				t.isFunction(e) && e.apply(s._owner, n)
			}) : (0 !== e.indexOf("on") && (e = "on" + e), t.isFunction(this._owner[e]) && this._owner[e].apply(this._owner, n))
		},
		setOwner: function(e) {
			this._owner = e
		}
	};
	return $.holmes = $.holmes || {},
	$.holmes.eventEmitter = n,
	n
}),
define("component/ClassBase", ["require", "exports", "module", "base/class", "base/guid"],
function(e) {
	var t = e("base/class"),
	n = e("base/guid");
	return t.extend({
		_type: "",
		_getGuid: function() {
			return this.hasOwnProperty("_guid") ? this._guid: (this._guid = n(), this._guid)
		},
		init: function(e) {
			this.options = $.extend(!0, $.extend(!0, {},
			this.options), e),
			this.classPrefix = this._type,
			this._init && this._init(this.options)
		},
		get: function(e) {
			return this.options[e]
		},
		set: function(e, t) {
			this.options[e] = t
		},
		getId: function(e) {
			var t = this,
			n = ["jquery-", t._type || "", "--", t.id ? t.id: t._getGuid()];
			return n = n.join(""),
			void 0 !== e ? n + "-" + e: n
		}
	})
}),
define("base/cookie", ["require", "exports", "module"],
function(e) {
	var t = {};
	return t.set = function(e, t, n) {
		var i;
		n = n || {},
		n.expires && (i = new Date, i.setTime(i.getTime() + n.expires)),
		document.cookie = e + "=" + t + (n.domain ? "; domain=" + n.domain: "") + (n.path ? "; path=" + n.path: "") + (i ? "; expires=" + i.toGMTString() : "") + (n.secure ? "; secure": "")
	},
	t.get = function(e) {
		var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
		n = t.exec(document.cookie);
		return n ? n[2] : null
	},
	t
}),
define("component/SiteSelector", ["require", "exports", "module", "component/UIBase", "base/util", "base/base"],
function(e) {
	{
		var t = e("./UIBase"),
		n = e("base/util");
		e("base/base")
	}
	return t.extend({
		_type: "siteSelector",
		options: {
			containerId: "site-list-container",
			siteListId: "site-list",
			siteList: null,
			siteId: null,
			defaultSiteId: "",
			subDirHoverClass: "sub-dir-hover",
			subDirTemplate: '<ul class="site-selector-subdir hm-scroll" style="display: none" id="#{1}">#{0}</ul>',
			subDirLiTemplate: '<li><a class="dir" href="javascript:void(0);" data="#{0}" title="!{6}">!{1}#{5}</a><a href="javascript:void(0)" data="#{2}" class="set-default #{3}" title="#{4}"></a></li>',
			subDirWithAuth: '<span class="auth">(权限子目录)</span>',
			settings: {
				isDefault: {
					title: "取消默认网站",
					className: "is-default"
				},
				isNotDefault: {
					title: "设为默认网站",
					className: "is-not-default"
				}
			}
		},
		_container: null,
		_init: function() {
			this._container = $("#" + this.options.containerId),
			this._initSubDirs()
		},
		_initSubDirs: function() {
			for (var e = this.options.siteList,
			t = this.options,
			i = t.settings,
			s = 0,
			o = e.length; o > s; s++) {
				var a = e[s],
				r = [];
				if (a.children) {
					var l = a.children;
					for (var c in l) if (l.hasOwnProperty(c)) {
						var d = l[c].id,
						u = l[c].name,
						h = l[c].id,
						p = l[c].id === t.defaultSiteId ? i.isDefault.className: i.isNotDefault.className,
						f = l[c].id === t.defaultSiteId ? i.isDefault.title: i.isNotDefault.title,
						m = l[c].isAuth ? t.subDirWithAuth: "",
						g = l[c].isAuth ? u + "(权限网站)": u;
						r.push(n.format(t.subDirLiTemplate, d, u, h, p, f, m, g))
					}
					r.length && (r = n.format(t.subDirTemplate, r.join(""), a.id + "SubDir"), this._container.append(r))
				}
			}
			this._bindSubDirEvent()
		},
		_bindSubDirEvent: function() {
			var e = $(".site-selector-subdir > li", this._container);
			e.on("mouseover",
			function(e) {
				var t = $(e.target),
				n = t.closest(".site-selector-subdir");
				$("li", n).each(function() {
					$(this).removeClass("sub-dir-hover")
				}),
				$(this).addClass("sub-dir-hover")
			}),
			e.on("mouseout",
			function() {
				$(this).removeClass("sub-dir-hover")
			})
		},
		_bindEvent: function() {
			var e = this,
			t = $("#" + e.options.siteListId);
			e._container.on("click",
			function(t) {
				t.stopPropagation();
				var n = $(t.target); (n.hasClass("arrow") || n.closest(".text").length) && e._toggleSiteList(),
				n.hasClass("set-default") && "set-current-default-site" !== n.attr("id") && (n.hasClass("is-default") ? e._switchDefaultStatus(n, !0) : e._switchDefaultStatus(n, !1)),
				n.hasClass("set-default") && "set-current-default-site" === n.attr("id") && e._setDefaultSiteForCurrentSite(t),
				(n.closest(".url").length || n.closest(".dir").length) && e.handlePageJump(t)
			}),
			$("li", t).on("mouseover", $.proxy(this._toggleSubDir, this)),
			$(document).on("click", $.proxy(this._hideSiteList, this))
		},
		handlePageJump: function(e) {
			var t = $(e.target),
			n = t.closest("a");
			if (!n.hasClass("disabled")) {
				var i = n.attr("data"),
				s = window.location.search,
				o = window.location.href;
				if ( - 1 !== s.indexOf("?")) {
					var a = /siteId=(\d*)/i;
					a.test(s) ? o = o.replace(a, "siteId=" + i) : o += "&siteId=" + i
				} else o += "?siteId=" + i;
				window.location = o
			}
		},
		_toggleSubDir: function(e) {
			e.stopPropagation();
			var t = $(e.target),
			n = "li" === t.prop("tagName").toLowerCase() ? t: t.closest("li"),
			i = $("a", n).last(),
			s = i.attr("data"),
			o = $("#" + this.options.siteListId);
			$("li", o).each(function() {
				$(this).removeClass("hover")
			}),
			n.addClass("hover"),
			$(".site-selector-subdir", this._container).each(function() {
				$(this).hide()
			});
			var a = n.position(),
			r = $("#" + s + "SubDir");
			r.length && ($("li", r).first().addClass(this.options.subDirHoverClass), r.css({
				top: a.top + 25
			}), r.show())
		},
		_hideSiteList: function(e) {
			e.stopPropagation();
			var t = $(e.target),
			n = t.closest(".site-selector"),
			i = $("#" + this.options.siteListId);
			n.length || (i.hide(), $(".site-selector-subdir", this._container).each(function() {
				$(this).hide()
			}))
		},
		_toggleSiteList: function() {
			var e = $("#" + this.options.siteListId);
			e.toggle(),
			$(".site-selector-subdir", this._container).each(function() {
				$(this).hide()
			}),
			$("li", e).each(function() {
				$(this).removeClass("hover")
			})
		},
		_setDefaultSiteForCurrentSite: function(e) {
			var t = $(e.target);
			if (t.hasClass("set-default")) {
				var i = n.format("#" + this.options.containerId + " li>a.set-default[data=#{0}]", this.options.siteId),
				s = $(i);
				if (t.hasClass("is-default")) t.removeClass("is-default"),
				t.addClass("is-not-default"),
				t.attr("title", "设为默认网站"),
				s.removeClass("is-default"),
				s.addClass("is-not-default"),
				s.attr("title", "设为默认网站"),
				$.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, {
					method: "home/user/setDefaultSite",
					sId: 0
				});
				else {
					var o = $("li > a.is-default", this._container);
					o.length && (o.removeClass("is-default"), o.addClass("is-not-default"), o.attr("title", "设置默认网站")),
					t.removeClass("is-not-default"),
					t.addClass("is-default"),
					t.attr("title", "取消默认网站"),
					s.removeClass("is-not-default"),
					s.addClass("is-default"),
					s.attr("title", "取消默认网站"),
					$.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, {
						method: "home/user/setDefaultSite",
						sId: this.options.siteId
					})
				}
			}
		},
		_switchDefaultStatus: function(e, t) {
			var n = e.attr("data"),
			i = $("#set-current-default-site", this._container);
			if (t) e.removeClass("is-default"),
			e.addClass("is-not-default"),
			e.attr("title", "设为默认网站"),
			n === i.attr("data") && (i.removeClass("is-default"), i.addClass("is-not-default"), i.attr("title", "设为默认网站")),
			$.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, {
				method: "home/user/setDefaultSite",
				sId: 0
			});
			else {
				var s = $("li > a.is-default", this._container);
				s.length && (s.removeClass("is-default"), s.addClass("is-not-default"), s.attr("title", "设置默认网站")),
				e.removeClass("is-not-default"),
				e.addClass("is-default"),
				e.attr("title", "取消默认网站"),
				n === i.attr("data") ? (i.removeClass("is-not-default"), i.addClass("is-default"), i.attr("title", "取消默认网站")) : (i.removeClass("is-default"), i.addClass("is-not-default"), i.attr("title", "设为默认网站")),
				$.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, {
					method: "home/user/setDefaultSite",
					sId: n
				})
			}
		},
		render: function() {
			this._bindEvent()
		}
	})
}),
define("component/RecordTarget", ["require", "exports", "module", "component/ClassBase"],
function(e) {
	var t = e("component/ClassBase");
	return t.extend({
		_type: "recordTarget",
		options: {
			sign: "recordable",
			recordUri: null,
			memo: null,
			onchange: function(e) {}
		},
		_memo: null,
		_init: function(e) {
			this.options.recordUri = this.options.recordUri || $.holmes.config.systemConfig.memoUri,
			this._memo = $.extend({},
			this.options.memo || {}),
			$(document.body).on("mouseup", $.proxy(this.recordHandler, this))
		},
		parseJson: function(e) {
			return new Function("return (" + e + ")")()
		},
		recordHandler: function(e, t) {
			var n = e.target,
			i = $(n),
			s = this.options.sign;
			if (i.parents("." + s).length && (i = i.parents("." + s).eq(0)), i.attr(s) || i.hasClass(s)) {
				var o, a, r = i.attr("id") || "",
				l = i.attr("memo");
				if (l) {
					var c = this.parseJson(l);
					c.hasOwnProperty("id") && (r = c.id),
					c.hasOwnProperty("type") && (o = c.type),
					c.hasOwnProperty("global") && (a = c.global)
				}
				var d = {
					elementId: r,
					type: o || ""
				};
				a || $.extend(d, {
					siteId: $.holmes.config.siteInfo.id,
					pageId: $.holmes.config.pageInfo.id
				});
				var u;
				this._memo.hasOwnProperty(r) ? u = this._memo[r] ? 0 : 1 : i.hasClass("close") ? u = 1 : i.hasClass("open") && (u = 0),
				this._memo[r] = u,
				d.status = u,
				this.options.onchange(d),
				this.postData(d)
			}
		},
		postData: function(e) {
			var t = (new Date).getTime(),
			n = window["bd_holmes" + t] = new Image;
			n.src = this.options.recordUri + "?r=" + t + "&" + $.param(e),
			n.onload = n.onerror = n.onabort = function() {
				n.onload = n.onerror = n.onabort = null,
				n = null
			}
		}
	})
}),
define("base/feedback", ["require", "exports", "module", "base/util", "underscore"],
function(e) {
	var t = (e("./util"), e("underscore"), {
		initFeedback: function() {
			if (void 0 !== typeof bds && bds.qa && bds.qa.ShortCut && bds.qa.ShortCut.initRightBar) {
				var e = {
					appid: 215655,
					product_id: 70,
					plugintitle: "意见反馈",
					issueTips: "对百度统计不满意吗？请告诉我们",
					issuePlaceholder: "欢迎提出您在使用过程中遇到的问题或宝贵建议（400字以内），感谢您对百度的支持。",
					emailPlaceholder: "留下您的邮箱，便于我们及时回复您。",
					guide: "<span>有任何问题请联系fankui@baidu.com</span><br>",
					cutFileTips: "上传问题图片，图片大小不超过3M",
					cutCanvasTips: "（点我，可以在当前页面标记问题哦）",
					emailTips: "联系方式（选填）",
					needIssueTips: !0,
					needIssue: !0,
					needCut: !0,
					needEmail: !0,
					needGuide: !1,
					showPosition: "right",
					onlyUpFile: !1,
					cutImg: "biaoji.png",
					upImg: "upload_btn.png",
					skinStyle: "flat"
				};
				bds.qa.ShortCut.initRightBar(e);
				var t = {
					appid: "215655",
					product_id: "70",
					username: $.holmes.config.userInfo.name,
					version: "hm-fe-v4"
				};
				bds.qa.ShortCut._getProData(t)
			}
		},
		loadRightBar: function() {
			return window.bds && window.bds.qa && window.bds.qa.ShortCut ? t.initFeedback() : t.loadScript("https://ufosdk.baidu.com/Public/feedback/js/feedback_plugin_1.0.js",
			function() {
				t.initFeedback()
			},
			{
				charset: "utf-8",
				id: "feedback_script"
			}),
			!1
		},
		bind: function(e) {
			$(e).on("click", t.loadRightBar)
		},
		loadScript: function(e, t, n) {
			var i = document.createElement("script"),
			n = n || {};
			i.type = "text/javascript",
			n.charset && (i.charset = n.charset),
			n.id && (i.id = n.id),
			i.readyState ? i.onreadystatechange = function() { ("loaded" === i.readyState || "complete" === i.readyState) && (i.onreadystatechange = null, t())
			}: i.onload = function() {
				t()
			},
			i.src = e,
			document.body.appendChild(i)
		}
	});
	return t
}),
define("base/browserHappy", ["require", "exports", "module"],
function(e) {
	var t = {
		initNotice: function() {
			t.isUnsupportedBrowser() && (t.renderNoticeContent(), t.bindEvents())
		},
		isUnsupportedBrowser: function() {
			return $.browser.msie && +$.browser.version < 8
		},
		renderNoticeContent: function() {
			var e = $(document.body),
			t = ['<div class="browser-warning">', '<p><a class="browser-close" href="javascript:void(0);"></a>', "当前浏览器版本过低，可能会影响部分功能的使用，请升级浏览器到最新版本或IE8以上。谢谢！</p>", "</div>"].join("");
			e.prepend(t)
		},
		bindEvents: function() {
			$(document.body).on("click", ".browser-close", $.proxy(t.closeNotice, t))
		},
		closeNotice: function() {
			$(".browser-warning").remove()
		}
	};
	return t
}),
define("base/event", ["require", "exports", "module", "underscore"],
function(e) {
	function t(e, t) {
		for (var n = 0,
		i = e.length,
		s = {}; i > n; n++) s[e[n]] = t[e[n]],
		delete t[e[n]];
		return s
	}
	function n(e, n, i) {
		i = $.extend(!0, {},
		i);
		var s = r.values(t(p[n], i)),
		o = document.createEvent(n);
		return s.unshift(e),
		"KeyEvents" === n ? o.initKeyEvent.apply(o, s) : "MouseEvents" === n ? o.initMouseEvent.apply(o, s) : "UIEvents" === n ? o.initUIEvent.apply(o, s) : o.initEvent.apply(o, s),
		o = $.extend(!0, o, i)
	}
	function i(e) {
		var t;
		return document.createEventObject && (t = document.createEventObject(), t = $.extend(!0, t, e)),
		t
	}
	function s(e, s) {
		s = t(p.KeyEvents, s);
		var o;
		if (document.createEvent) try {
			o = n(e, "KeyEvents", s)
		} catch(a) {
			try {
				o = n(e, "Events", s)
			} catch(r) {
				o = n(e, "UIEvents", s)
			}
		} else s.keyCode = s.charCode > 0 ? s.charCode: s.keyCode,
		o = i(s);
		return o
	}
	function o(e, s) {
		s = t(p.MouseEvents, s);
		var o;
		return document.createEvent ? (o = n(e, "MouseEvents", s), s.relatedTarget && !o.relatedTarget && ("mouseout" === e.toLowerCase() ? o.toElement = s.relatedTarget: "mouseover" === e.toLowerCase() && (o.fromElement = s.relatedTarget))) : (s.button = 0 === s.button ? 1 : 1 === s.button ? 4 : r.isNumber(s.button) ? s.button: 0, o = i(s)),
		o
	}
	function a(e, s) {
		s.bubbles = h.hasOwnProperty(e),
		s = t(p.HTMLEvents, s);
		var o;
		if (document.createEvent) try {
			o = n(e, "HTMLEvents", s)
		} catch(a) {
			try {
				o = n(e, "UIEvents", s)
			} catch(r) {
				o = n(e, "Events", s)
			}
		} else o = i(s);
		return o
	}
	var r = e("underscore"),
	l = {},
	c = {
		keydown: 1,
		keyup: 1,
		keypress: 1
	},
	d = {
		click: 1,
		dblclick: 1,
		mousedown: 1,
		mousemove: 1,
		mouseup: 1,
		mouseover: 1,
		mouseout: 1
	},
	u = {
		abort: 1,
		blur: 1,
		change: 1,
		error: 1,
		focus: 1,
		load: $.browser.msie ? 0 : 1,
		reset: 1,
		resize: 1,
		scroll: 1,
		select: 1,
		submit: 1,
		unload: $.browser.msie ? 0 : 1
	},
	h = {
		scroll: 1,
		resize: 1,
		reset: 1,
		submit: 1,
		change: 1,
		select: 1,
		error: 1,
		abort: 1
	},
	p = {
		KeyEvents: ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
		MouseEvents: ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
		HTMLEvents: ["bubbles", "cancelable"],
		UIEvents: ["bubbles", "cancelable", "view", "detail"],
		Events: ["bubbles", "cancelable"]
	};
	return h = $.extend(!0, h, c),
	h = $.extend(!0, h, d),
	l.fire = function(e, t, n) {
		var i;
		if (t = t.replace(/^on/i, ""), n = $.extend(!0, {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 1,
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			keyCode: 0,
			charCode: 0,
			button: 0,
			relatedTarget: null
		},
		n), c[t]) i = s(t, n);
		else if (d[t]) i = o(t, n);
		else {
			if (!u[t]) throw new Error(t + " is not support!");
			i = a(t, n)
		}
		i && (e.dispatchEvent ? e.dispatchEvent(i) : e.fireEvent && e.fireEvent("on" + t, i))
	},
	l
}),
require(["domReady", "base/cookie", "component/SiteSelector", "base/util", "component/RecordTarget", "base/eventEmitter", "base/feedback", "base/browserHappy", "base/event"],
function(e, t, n, i, s, o, a, r, l) {
	e(function() {
		function e() {
			var e, t = $("#pin-btn"),
			n = $(".header-wrapper"),
			i = $("#report-wrapper"),
			s = $("#content-header"),
			o = $("#content-header-wrapper"),
			a = o.height(),
			r = n.height(),
			l = i.offset().top,
			c = $(window).scrollTop(),
			d = $(".aside").width(); (!t || t.hasClass("open")) && ("static" === n.css("position") ? (e = c, s.removeClass("fixed-scroll-bar"), e > l ? (o.css("height", a), s.addClass("static-scroll-bar"), s.css({
				width: $(".main").width() - 40,
				left: d + 1 - $(window).scrollLeft()
			})) : (o.css("height", "auto"), s.removeClass("static-scroll-bar"), s.css({
				width: "auto",
				left: 0
			}))) : (e = c + r, s.removeClass("static-scroll-bar"), e > l ? (o.css("height", a), s.addClass("fixed-scroll-bar"), s.css({
				width: $(".main").width() - 40,
				left: d + 1 - $(window).scrollLeft()
			})) : (o.css("height", "auto"), s.removeClass("fixed-scroll-bar"), s.css({
				width: "auto",
				left: 0
			}))))
		} !
		function() {
			if ($.browser.msie && Number($.browser.version) < 9) {
				var e = document.getElementsByTagName("head")[0],
				t = document.createElement("style");
				t.type = "text/css",
				t.styleSheet.cssText = ":before,:after{content:none !important",
				e.appendChild(t),
				setTimeout(function() {
					e.removeChild(t)
				},
				0)
			}
		} (),
		function() {
			var n = !1,
			i = $(".simple-nav-wrapper"),
			s = $(".simple-nav"),
			o = $(".nav-wrapper"),
			a = $(".aside"),
			r = $(".nav"),
			c = $(".header-wrapper");
			$(".menu-item", s).on("mouseover",
			function() {
				var e, t = $(".item-content", this);
				t.length > 0 && (t.removeClass("hide"), $(this).addClass("cur"), t.data("height") ? e = t.data("height") : (e = t.height(), t.data("height", e)), e + t.offset().top - $(window).scrollTop() > $(window).height() && t.css($.browser.msie && /msie (6.0|7.0|8.0)/i.test(navigator.userAgent) ? {
					height: $(window).height() - t.offset().top + $(window).scrollTop(),
					"overflow-x": "hidden",
					overflow: "auto"
				}: {
					height: $(window).height() - t.offset().top + $(window).scrollTop(),
					"overflow-x": "hidden"
				}))
			}),
			$(".simple-nav .item-content").each(function(e, t) {
				$.stopScrollBubble(t)
			}),
			$(".menu-item", s).on("mouseout",
			function() {
				$(this).removeClass("cur"),
				$(".item-content", this).addClass("hide")
			});
			var d = function() {
				var e = c.height(),
				t = $(".header-wrapper");
				return "static" === a.css("position") ? ($.offStopScrollBubble($(".nav")[0]), n = !1, a.css("height", "auto"), void r.css("height", "auto")) : (0 === $(".nav").length || n || $.stopScrollBubble($(".nav")[0]), void("static" === t.css("position") ? (a.css("height", $(window).height()), $(document).scrollTop() < e ? (r.css("height", $(window).height() - $(".title", o).height() - e), $(".aside").css({
					left: -$(document).scrollLeft(),
					top: e - $(document).scrollTop()
				})) : (r.css("height", $(window).height() - $(".title", o).height()), $(".aside").css({
					left: 0,
					top: 0
				}))) : (a.css("height", $(window).height() - e), a.css("top", e), a.css("left", 0), r.css("height", $(window).height() - e - $(".title", o).height()))))
			};
			d(),
			$(window).on("resize",
			function() {
				d()
			}),
			$(window).on("scroll",
			function() {
				d()
			}),
			a.on("click", ".operation",
			function(n) {
				var s = $(n.target),
				a = $.holmes.config.systemConfig.domain || "";
				a = a.substring(0, a.indexOf(":")),
				s.hasClass("close") ? (t.set("operation", "close", {
					domain: a,
					path: $.holmes.config.systemConfig.webRoot
				}), o.addClass("hide"), i.removeClass("hide"), $(".main").css("margin-left", i.width() + 1 + "px")) : s.hasClass("open") && (t.set("operation", "open", {
					domain: a,
					path: $.holmes.config.systemConfig.webRoot
				}), o.removeClass("hide"), i.addClass("hide"), $(".main").css("margin-left", o.width() + 1 + "px")),
				$.browser.msie && /msie (6.0|7.0|8.0)/i.test(navigator.userAgent) && e(),
				l.fire(window, "resize")
			}),
			$(".expandable").on("click",
			function(e) {
				e.preventDefault();
				var t = $(this).parents("li").eq(0);
				$(".toggle", $(this)).toggleClass("close-icon"),
				$(".expandable-content", t).toggle()
			})
		} (),
		function() {
			if ($(".header-wrapper .layer").on("mouseover",
			function() {
				var e = $(this);
				$(".layer .content").addClass("hide"),
				$(".content", e).removeClass("hide")
			}), $(document).on("mouseover",
			function(e) {
				var t = e.target;
				$(t).parents(".layer").length > 0 || $(t).hasClass("layer") || $(".layer .content").addClass("hide")
			}), $.holmes.config && $.holmes.config.siteInfo && $.holmes.config.siteList && $.holmes.config.userInfo && $("#site-list-container").length > 0) {
				var e = new n({
					siteList: $.holmes.config.siteList,
					defaultSiteId: $.holmes.config.userInfo.defaultSiteId,
					siteId: $.holmes.config.siteInfo.id,
					containerId: "site-list-container"
				});
				e.render()
			}
		} (),
		function() {
			$(".misc .item").on("mouseenter",
			function() {
				if ($(".item-icon", this).removeClass("item-show").addClass("item-icon-hidden"), $(".item-text", this).removeClass("item-text-hidden").addClass("item-show"), void 0 !== $(this).attr("toggle-data")) {
					{
						var e = $(".misc-body ." + $(this).attr("toggle-data"));
						$(".misc .item").index($(this))
					}
					e.css("bottom", parseInt($(".misc").css("bottom"), 10)).show()
				}
			}),
			$(".misc .item").on("mouseleave",
			function() {
				$(".item-text", this).removeClass("item-show").addClass("item-text-hidden"),
				$(".item-icon", this).removeClass("item-icon-hidden").addClass("item-show"),
				void 0 !== $(this).attr("toggle-data") && $(".misc-body ." + $(this).attr("toggle-data")).hide();

			});
			var e = function() { (document.documentElement.scrollTop || document.body.scrollTop) > 0 ? $("#back-to-top").show() : $("#back-to-top").hide()
			};
			$("#back-to-top")[0] && $(window).on("scroll",
			function() {
				e()
			}),
			$("#back-to-top")[0] && $(window).on("resize",
			function() {
				e()
			}),
			$("#back-to-top").on("click",
			function(e) {
				e.preventDefault(),
				$("html, body").animate({
					scrollTop: 0
				},
				120)
			})
		} (),
		function() {
			new s({
				onchange: function(e) {
					o.trigger("onchangeRecordTarget", e)
				}
			})
		} ();
		var i = 100; !
		function() {
			var t = $("#report-tip-icon"),
			n = $("#report-tip"),
			s = $(".tip-arrow", n);
			t.on("click",
			function() {
				var e = "none" === n.css("display");
				if (e) {
					var t = $(this).position().left - 15;
					n.show(),
					s.css({
						left: t
					})
				} else n.hide()
			});
			var o = "http://yingxiao.baidu.com/support/tongji/?module=default&controller=index&action=search";
			$(".report-tip-search-btn").on("click",
			function() {
				var e = $("#ReportHelp"),
				t = e.val(),
				n = o + "&keyword=" + t;
				window.open(n)
			}),
			$("#ReportHelp").on("keyup",
			function(e) {
				if (13 === e.keyCode) {
					var t = $(this).val(),
					n = o + "&keyword=" + t;
					window.open(n)
				}
			}),
			$("#pin-btn").length && (e(), $(window).on("scroll", e), $(window).on("resize", e)),
			$("#pin-btn").on("click",
			function() {
				$(this).hasClass("open") ? $(this).removeClass("open").addClass("close").addClass("inactive").removeClass("active") : $(this).hasClass("open") || $(this).addClass("open").removeClass("close").addClass("active").removeClass("inactive");
				var e = $("#content-header"),
				t = $("#content-header-wrapper");
				$(this).hasClass("close") && (e.removeClass("fixed-scroll-bar"), e.removeClass("static-scroll-bar"), e.css({
					width: "auto",
					left: 0
				}), t.css("height", "auto"))
			}),
			$("#pin-btn").on("mouseout",
			function() {
				$(this).removeClass("inactive").removeClass("active")
			}),
			$("#common-report").on("click",
			function() {
				var e, t, n = $(".nav-wrapper .nav"),
				s = $(".simple-nav-wrapper .simple-nav"),
				o = $(".common-report", n),
				a = $(".common-report", s),
				r = $(".expandable-level1", o),
				l = $(".item-content", a),
				c = $.holmes.config,
				d = c.pageInfo.menuId,
				u = c.pageInfo.menuId,
				h = $(this),
				p = {
					addCustomMenu: "custommenu/addCustomMenu",
					deleteCustomMenu: "custommenu/deleteCustomMenu"
				};
				if (!$(this).hasClass("disabled")) if ($(this).addClass("disabled"), $(this).hasClass("selected")) {
					var f = $("li", r),
					m = $("li", l);
					d = +d > 1e3 ? +d: +d * i,
					f.each(function() {
						var e = $(".menu-label", $(this)).attr("data"),
						t = $(this);
						String(e) === String(d) && $.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, {
							method: p.deleteCustomMenu,
							id: u
						},
						function(e, n) {
							h.removeClass("selected"),
							h.removeClass("disabled"),
							t.remove(),
							m.each(function() {
								var e = $(".menu-label", $(this)).attr("data"),
								t = $(this);
								String(e) === String(d) && t.remove()
							})
						},
						function(e) {
							h.removeClass("disabled"),
							alert(e)
						})
					})
				} else $(".menu-label", n).each(function() {
					var t = $(this).html(),
					n = $(this).attr("data"),
					s = $(this).closest("a").attr("href");
					$(this).closest(".common-report").length || (String(n) === String(d) || String( + n * i) === String(d)) && (e = $(this).hasClass("item-title") ? '<li><a href="' + s + '"><span class="l menu-label" data="' + +n * i + '">' + t + "</span></a></li>": $(this).closest("li").clone())
				}),
				$(".menu-label", s).each(function() {
					var e = $(this).attr("data"),
					n = $(this).html();
					if (!$(this).closest(".common-report").length && (String(e) === String(d) || String( + e * i) === String(d))) if ("A" !== $(this)[0].tagName.toUpperCase() || $(this).hasClass("trend-title")) t = $(this).closest("li").clone();
					else {
						var s = $(this).attr("href");
						t = '<li><a href="' + s + '" class="menu-label" data="' + +e * i + '">' + n + "</a></li>"
					}
				}),
				$.holmes.ajaxJsonPost(c.systemConfig.ajaxUri, {
					method: p.addCustomMenu,
					id: u
				},
				function(n, s) {
					if ($("#common-report-tip").length && $("#common-report-tip").remove(), h.removeClass("disabled"), 0 === s) {
						h.addClass("selected"),
						r.append(e),
						l.append(t);
						var o = $("a", e).first(),
						a = $("a", t).first(),
						c = $("span", o),
						d = $("span", a);
						if (o.attr("data")) {
							var u = o.attr("data"),
							p = a.attr("data");
							o.attr("data", +u * i),
							a.attr("data", +p * i)
						} else {
							var p, u = c.attr("data");
							d.length && (p = d.attr("data"), d.attr("data", +p * i)),
							c.attr("data", +u * i)
						}
						o.hasClass("selected") && o.removeClass("selected"),
						a.hasClass("selected") && a.removeClass("selected");
						var f = o.attr("href") + "&fromMenu=top",
						m = a.attr("href") + "&fromMenu=top";
						o.attr("href", f),
						a.attr("href", m)
					} else 10 === s && h.after('<div id="common-report-tip"><div class="common-report-tip-arrow"></div><div class="common-report-tip-wrap">最多可添加10个常用报告。</div></div>')
				},
				function(e) {
					h.removeClass("disabled"),
					alert(e)
				})
			}),
			$(document).on("click",
			function(e) {
				var t = $(e.target);
				"common-report-tip" !== t.attr("id") && $("#common-report-tip").length && $("#common-report-tip").remove()
			})
		} (),
		function() {
			var e = $(".misc #feedback");
			e.length && a.bind(e)
		} (),
		function() {
			r.initNotice()
		} (),
		function() {
			var e = $("#main-menu .selected");
			if (e.length) {
				var t = e.closest(".menu-item");
				if (t.length && !t.hasClass("common-report")) {
					var n = $("#main-menu");
					n.scrollTop(n.scrollTop() + t.position().top - 40)
				}
			}
		} ()
	})
}),
define("component/DocumentReady", ["domReady", "base/cookie", "component/SiteSelector", "base/util", "component/RecordTarget", "base/eventEmitter", "base/feedback", "base/browserHappy", "base/event"],
function() {}),
define("component/TimeSpan", ["require", "exports", "module", "component/ClassBase"],
function(e) {
	var t = e("./ClassBase");
	return t.extend({
		_type: "timeSpan",
		options: {
			byHourId: "by-hour",
			byDayId: "by-day",
			byWeekId: "by-week",
			byMonthId: "by-month",
			containerId: "time-span",
			gran: 6,
			disabledGrans: [],
			day: 864e5,
			onchange: function(e) {}
		},
		granIDMap: {},
		_granLinks: null,
		_init: function() {
			this.granIDMap = {
				3 : this.options.byMonthId,
				4 : this.options.byWeekId,
				5 : this.options.byDayId,
				6 : this.options.byHourId
			};
			var e = this.granIDMap[this.options.gran];
			this._granLinks = $("#" + this.options.containerId + " a"),
			this._addActiveClass($(void 0 !== e ? "#" + e: "#" + this.options.byHourId)),
			this.reset($.holmes.config.pageInfo.st, $.holmes.config.pageInfo.et),
			this.bind()
		},
		_addActiveClass: function(e) {
			var t = this;
			t._granLinks.each(function() {
				$(this).removeClass("selected")
			}),
			e.addClass("selected")
		},
		reset: function(e, t) {
			var n = $("#" + this.options.byMonthId),
			i = $("#" + this.options.byWeekId),
			s = this.options.day;
			n.addClass("disable"),
			i.addClass("disable"),
			t - e > 7 * s && (i.removeClass("disable"), t - e > 31 * s && n.removeClass("disable"));
			var o = this.options.disabledGrans;
			if (o && o.length) for (var a = 0,
			r = o.length; r > a; a++) {
				var l = o[a],
				c = $("#" + l);
				c.length && c.addClass("disable")
			}
		},
		bind: function() {
			var e = this;
			this._granLinks.on("click",
			function(t) {
				var n = $(t.target);
				n.hasClass("disable") || (e._addActiveClass(n), e.options.onchange(n.attr("data")))
			})
		}
	})
}),
define("component/ToggleTarget", ["require", "exports", "module", "component/ClassBase", "base/util"],
function(e) {
	{
		var t = e("component/ClassBase");
		e("base/util")
	}
	return t.extend({
		_type: "toggleTarget",
		options: {
			sign: "toggleable",
			onchange: function(e) {},
			smoothExpandableElements: [".report-tip"],
			memo: null
		},
		_memo: null,
		_init: function() {
			this._memo = $.extend(!0, {},
			this.options.memo || {}),
			this._initStatus(),
			$(document.body).on("click", $.proxy(this.toggleHandler, this))
		},
		_initStatus: function() {
			var e = this;
			$(".recordable").each(function() {
				var t = this.id || "",
				n = $(this).attr("memo");
				if (n) {
					var i = new Function("return (" + n + ")")();
					i.hasOwnProperty("id") && (t = i.id)
				}
				if (e._memo.hasOwnProperty(t)) {
					var s;
					$(this).removeClass("open"),
					$(this).removeClass("close"),
					e._memo[t] ? (s = !0, $(this).addClass("open")) : (s = !1, $(this).addClass("close"));
					var o = $(this).attr("targets");
					o && ($(o).each(function() {
						s ? ($(this).removeClass("toggleable-hidden"), $(this).removeClass("unvisible")) : ($(this).addClass("toggleable-hidden"), ($(this).children(".flash-container").length || $(this).hasClass("flash-container").length) && ($(this).show(), $(this).addClass("unvisible")))
					}), -1 !== o.indexOf(".flash-text") && (s ? $(".flash-text").eq(0).addClass("toggleable-hidden") : $(".flash-text").eq(0).removeClass("toggleable-hidden")))
				}
			})
		},
		toggleHandler: function(e, t) {
			var n = e.target;
			if (n[this.options.sign] || $(n).hasClass(this.options.sign)) {
				var i = $(n).attr("targets");
				$(i).each(function() {
					$(this).toggleClass("toggleable-hidden"),
					($(this).children(".flash-container").length || $(this).hasClass("flash-container").length) && $(this).toggleClass("unvisible")
				}),
				$(n).toggleClass("open"),
				$(n).toggleClass("close"),
				this.options.onchange(n.id)
			}
		}
	})
}),
define("component/TrackTarget", ["require", "exports", "module", "component/ClassBase"],
function(e) {
	var t = e("component/ClassBase");
	return t.extend({
		_type: "trackTarget",
		options: {
			sign: "trackable",
			recordUri: null,
			onchange: function(e) {}
		},
		init: function(e) {
			this.options = $.extend({},
			this.options, e, !0),
			$(document.body).on("mousedown", $.proxy(this.trackHandler, this))
		},
		parseJson: function(e) {
			return new Function("return (" + e + ")")()
		},
		_getTrackTarget: function(e) {
			var t = e.target,
			n = $(t),
			i = this.options.sign;
			return n.attr(i) || n.hasClass(i) || (t = n.closest("." + i).get(0)),
			t
		},
		trackHandler: function(e, t) {
			var n = this._getTrackTarget(e);
			if (n) {
				var i = $(n),
				s = $(n).attr("id") || "",
				o = $(n).attr("memo");
				if (o) {
					var a = this.parseJson(o);
					a.hasOwnProperty("id") && (s = a.id)
				}
				var r = {
					siteId: $.holmes.config.id,
					pageId: $.holmes.config.id,
					elementId: s
				},
				l = i.attr("href");
				l && !/^javascript|#/.test(l) && (r.url = encodeURIComponent(l));
				var c = i.html();
				r.value = $.trim(c),
				this.options.onchange(r),
				this.postData(r)
			}
		},
		postData: function(e) {
			var t = (new Date).getTime(),
			n = window["bd_holmes" + t] = new Image;
			n.src = this.options.recordUri + "?r=" + t + "&" + $.param(e),
			n.onload = n.onerror = n.onabort = function() {
				n.onload = n.onerror = n.onabort = null,
				n = null
			}
		}
	})
}),
define("component/Dialog", ["require", "exports", "module", "component/UIBase", "base/base", "underscore", "base/eventEmitter"],
function(e) {
	var t = e("./UIBase"),
	n = (e("../base/base"), e("underscore")),
	i = e("base/eventEmitter");
	return t.extend({
		options: {
			id: "",
			titleText: "默认标题",
			content: "默认内容",
			position: {
				left: 360,
				top: 100
			},
			isSingle: !1,
			isModal: !1,
			hasClose: !0,
			hideInsteadofClose: !1,
			className: "dialog",
			onclose: function() {},
			zIndex: 99999
		},
		_type: "dialog",
		_init: function() {
			this.options.id = this.id = this.getId(),
			i.setOwner(this),
			this.render(),
			this._bindResizeHander()
		},
		_getInnerString: function() {
			var e = (document, this),
			t = ['<div class="dialog-title">'];
			return t.push('<div class="dialog-title-text">'),
			t.push(e.options.titleText),
			t.push("</div>"),
			this.options.hasClose && (t.push('<a href="javascript:void(0);" class="dialog-close">&nbsp;'), t.push("</a>")),
			t.push("</div>"),
			t.push('<div class="dialog-content">'),
			t.push(e._getContentHTML()),
			t.push("</div>"),
			t.join("")
		},
		_update: function() {
			var e = this,
			t = e.getContainer();
			if (t) {
				var n = "#" + e.id + " .dialog-title-text",
				i = $(n);
				i.length && i.html(e.options.titleText);
				var s = "#" + e.id + " .dialog-content",
				o = $(s);
				o.length && o.html(e._getContentHTML()),
				$.holmes.setPosition(t, e.options.position)
			}
		},
		_setIFrame: function(e, t, n) {
			var i = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="javascript:false;"style="display:block;position:absolute;z-index:-1;filter:Alpha(Opacity=\'0\');top:0px;left:0px;width:' + t + "px;height:" + n + 'px;"/>';
			0 === $(e).find("bgiframe").length && $(e).before(i)
		},
		_getContentHTML: function() {
			var e = this,
			t = document;
			if (n.isString(e.options.content)) return e.options.content;
			if (n.isElement(e.options.content)) {
				$(e.options.content).show();
				var i = t.createElement("div");
				return $(i).append(e.options.content),
				$(i).html()
			}
			return ""
		},
		setTitleText: function(e) {
			var t = this;
			n.isString(e) && (t.options.titleText = e),
			t._update()
		},
		setContent: function(e) {
			var t = this,
			i = e; (n.isString(i) || n.isElement(i)) && (t.options.content = i),
			t._update()
		},
		render: function() {
			var e = document,
			t = this,
			n = e.createElement("div");
			n.id = t.id,
			n.className = "dialog-container " + t.options.className;
			if (t.options.isModal) {
				var i = t.options.zIndex - 1,
				s = e.createElement("div");
				if (s.className = t.options.className + " modal", s.id = t.id + "modal", $(s).css({
					position: "absolute",
					top: 0,
					left: 0,
					"background-color": "black",
					width: $(document).width(),
					height: $(document).height(),
					opacity: .6,
					"z-index": i
				}), $(e.body).append(s), $.browser.msie && +$.browser.version < 7) {
					var o = e.createElement("div");
					s.appendChild(o),
					t._setIFrame(s.firstChild, $(window).width(), $(window).height())
				}
			}
			if (n.innerHTML = t._getInnerString(), e.body.appendChild(n), $.browser.msie && +$.browser.version < 7 && t._setIFrame(n.firstChild, n.offsetWidth, n.offsetHeight), $(t.getContainer()).css({
				position: "absolute",
				"z-index": t.options.zIndex
			}), t.options.width && ($(t.getContainer()).css({
				width: t.options.width
			}), t.options.position.left = $(window).scrollLeft() + ($(window).width() - t.options.width) / 2, t.options.position.top = Math.max($(window).scrollTop() + ($(window).height() - t.getContainer().offsetHeight) / 2, 0)), $.holmes.setPosition(t.getContainer(), {
				left: t.options.position.left,
				top: t.options.position.top
			}), this.options.hasClose) {
				var a = "#" + t.id + " .dialog-close";
				$(a).on("click",
				function() {
					t.options.hideInsteadofClose ? t.hide() : t.close()
				})
			}
			t.hide()
		},
		getContainer: function() {
			return $("#" + this.id)[0]
		},
		setPosition: function(e) {
			var t = this;
			t.options.position.left = e.left,
			t.options.position.top = e.top,
			t._update()
		},
		fixPosition: function() {
			var e = this.getModalContainer();
			e.css({
				width: $(document).width(),
				height: $(document).height()
			})
		},
		show: function() {
			var e = this;
			$(e.getContainer()).show(),
			e.options.width && ($(e.getContainer()).css({
				width: e.options.width
			}), e.options.position.left = $(window).scrollLeft() + ($(window).width() - e.options.width) / 2, e.options.position.top = Math.max($(window).scrollTop() + ($(window).height() - e.getContainer().offsetHeight) / 2, 0)),
			$(e.getContainer()).css({
				left: e.options.position.left,
				top: e.options.position.top
			}),
			this.fixPosition(),
			e.getModalContainer() && $(e.getModalContainer()).show()
		},
		hide: function() {
			var e = this;
			$(e.getContainer()).hide(),
			e.getModalContainer() && $(e.getModalContainer()).hide()
		},
		close: function() {
			this.options.isSingle ? this.hide() : (this.getContainer() && $(this.getContainer()).remove(), this.getModalContainer() && $(this.getModalContainer()).remove(), $(window).off("resize", this._modalResizeHandler)),
			i.trigger("onclose")
		},
		getModalContainer: function() {
			return $("#" + this.id + "modal")
		},
		_modalResizeHandler: function() {
			for (var e = $(".modal"), t = 0; t < e.length; t++) $(e[t]).css({
				width: $(window).width(),
				height: $(window).height()
			})
		},
		_bindResizeHander: function() {
			var e = this;
			$(window).resize(function() {
				e.fixPosition()
			})
		}
	})
}),
define("component/Slide", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("component/UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "slide",
		options: {
			containerId: "SlidesContainer",
			sliderId: "Slider",
			controlId: "SilderBtn",
			controlTemplate: "<ul>#{0}</ul>",
			sliderTemplate: '<table cellspacing="0" cellpadding="0" border="0" id="SliderTable"><tbody><tr>#{0}</tr></tbody></table>',
			items: null,
			count: null,
			width: 680,
			height: 355,
			direction: "left",
			auto: !1,
			change: 0,
			duration: 35,
			time: 10,
			pause: 2e3,
			tween: null,
			onStart: function() {},
			onFinish: function() {}
		},
		items: null,
		auto: null,
		_slider: null,
		_container: null,
		_sliderControl: null,
		_timer: null,
		_count: null,
		_target: null,
		_t: null,
		_b: null,
		_c: null,
		index: 0,
		_init: function() {
			this._slider = $("#" + this.options.sliderId)[0],
			this._container = $("#" + this.options.containerId)[0],
			this._sliderControl = $("#" + this.options.controlId)[0],
			this._timer = null,
			this._target = 0,
			this._t = this._b = this._c = 0,
			this.auto = this.options.auto,
			this.index = 0,
			this.options.tween = this.options.tween ||
			function(e, t, n, i) {
				return - n * ((e = e / i - 1) * e * e * e - 1) + t
			};
			var e = $(this._container).css("position");
			"relative" !== e && "absolute" !== e && (this._container.style.position = "relative"),
			this.items = $.extend(!0, [], this.options.items),
			this.count = this.options.count || this.items.length,
			this._container.style.overflow = "hidden",
			this._slider.style.position = "absolute"
		},
		renderHtml: function() {
			if (this._slider) {
				for (var e = [], t = 0, i = this.count; i > t; t++) e.push("object" == typeof this.items[t] && this.items[t].imgUrl && this.items[t].link ? n.format('<td><a href="#{3}" target="_blank"><img width = "#{1}" height="#{2}" src="#{0}" /></a></td>', this.items[t].imgUrl, this.options.width, this.options.height, this.items[t].link) : n.format('<td><img width = "#{1}" height="#{2}" src="#{0}" /></td>', this.items[t], this.options.width, this.options.height));
				$(this._slider).empty(),
				$(this._slider).append(n.format(this.options.sliderTemplate, e.join("")));
				var s = "left" !== this.options.direction;
				this._change = this.options.change ? this.options.change: this._slider[s ? "offsetHeight": "offsetWidth"] / this.count
			}
			if (this._sliderControl && ($(this._sliderControl).empty(), 1 !== this.count)) {
				for (var o = [], t = 0, i = this.count; i > t; t++) o.push("<li></li>");
				$(this._sliderControl).append(n.format(this.options.controlTemplate, o.join("")))
			}
		},
		render: function(e) {
			this.renderHtml(),
			this.bind()
		},
		bind: function() {
			if (this._sliderControl) {
				var e = this._sliderControl.getElementsByTagName("li"),
				t = this;
				$.each(e,
				function(e, n) {
					$(n).on("mouseover",
					function(i, s) {
						n.className = "on",
						t.auto = !1,
						t.run(e)
					}),
					$(n).on("mouseout",
					function(e, i) {
						n.className = "",
						t.auto = !0,
						t.run()
					})
				})
			}
		},
		run: function(e) {
			if ( + e === this.count) if ("left" === this.options.direction) {
				var t = $("#SliderTable");
				if (t[0]) {
					var n = t[0].rows[0];
					n.appendChild(n.children[0].cloneNode(!0))
				}
			} else {
				var i = $("#users_logos")[0];
				if (i) for (var s = 0; 5 > s; s++) {
					var o = i.children[s].cloneNode(!0);
					i.appendChild(o)
				}
			}
			void 0 === e ? e = this.index: 0 > e ? e = this.count - 1 : e > this.count && (e = 0),
			this.index = e,
			this._target = -Math.abs(this._change) * this.index,
			this._t = 0,
			this._b = parseInt($(this._slider).css(this.options.direction), 10),
			this._c = this._target - this._b,
			this.start(),
			this.move()
		},
		start: function() {
			var e = this,
			t = $("#" + this.options.controlId)[0];
			if (t) {
				var n = t.getElementsByTagName("li");
				$.each(n,
				function(t, n) {
					n.className = e.index % e.count === t ? "on": ""
				})
			}
			this.options.onStart.call(this)
		},
		move: function() {
			if (clearTimeout(this._timer), this._c && this._t < this.options.duration) this.moveTo(Math.round(this.options.tween(this._t++, this._b, this._c, this.options.duration))),
			this._timer = setTimeout($.proxy(this.move, this), this.options.time);
			else {
				if (this.index === this.count) if (this.moveTo(0), "left" === this.options.direction) {
					var e = $("#SliderTable")[0];
					if (e) {
						var t = e.rows[0];
						t.removeChild(t.children[t.cells.length - 1])
					}
				} else {
					var n = $("#users_logos")[0];
					if (n) for (var i = 0; 5 > i; i++) {
						var s = n.children[n.children.length - 1];
						n.removeChild(s)
					}
				} else this.moveTo(this._target);
				this.auto && (this._timer = setTimeout($.proxy(this.next, this), this.options.pause))
			}
		},
		moveTo: function(e) {
			$(this._slider).css(this.options.direction, e + "px")
		},
		next: function() {
			this.run(++this.index)
		},
		previous: function() {
			this.run(--this.index)
		},
		stop: function() {
			clearTimeout(this._timer),
			this.options.onFinish.call(this),
			this.moveTo(this._target)
		}
	})
}),
define("base/aceTemplate.min", [],
function() {
	function e(e) {
		var t = [];
		t.push("with(this){"),
		t.push(e.replace(/[\r\n]+/g, "\n").replace(/^\n+|\s+$/gm, "").replace(/((^\s*[<>!#^&\u0000-\u0008\u007F-\uffff].*$|^.*[<>]\s*$|^(?!\s*(else|do|try|finally)\s*$)[^'":;,\[\]{}()\n\/]+$|^(\s*(([\w-]+\s*=\s*"[^"]*")|([\w-]+\s*=\s*'[^']*')))+\s*$|^\s*([.#][\w-.]+(:\w+)?(\s*|,))*(?!(else|do|while|try|return)\b)[.#]?[\w-.*]+(:\w+)?\s*\{.*$)\s?)+/gm,
		function(e) {
			return e = ['"', e.replace(/&none;/g, "").replace(/["'\\]/g, "\\$&").replace(/\n/g, "\\n").replace(/(!?!?#)\{(.*?)\}/g,
			function(e, t, n) {
				n = n.replace(/\\n/g, "\n").replace(/\\([\\'"])/g, "$1");
				var i = /^[a-z$][\w+$]+$/i.test(n) && !/^(true|false|NaN|null|this)$/.test(n);
				return ['",', i ? ["typeof ", n, '=="undefined"?"":'].join("") : "", "#" == t ? "_encode_": "!!#" == t ? "_encodeAttr_": "", "(", n, '),"'].join("")
			}), '"'].join("").replace(/^"",|,""$/g, ""),
			e ? ["_output_.push(", e, ");"].join("") : ""
		})),
		t.push("}");
		var n = new Function("_output_", "_encode_", "helper", "_encodeAttr_", t.join(""));
		return n
	}
	var t = t || {},
	n = {
		"#39": "'",
		quot: '"',
		lt: "<",
		gt: ">",
		amp: "&",
		nbsp: " "
	},
	i = {
		"'": "#39",
		'"': "quot",
		"<": "lt",
		">": "gt",
		"&": "amp",
		" ": "nbsp"
	},
	s = {
		g: function(e) {
			return "string" != typeof e ? e: document.getElementById(e)
		},
		decodeHTML: function(e) {
			return String(e).replace(/&(#39|quot|lt|gt|amp|nbsp);/gi,
			function(e, t) {
				return n[t]
			}).replace(/&#u([a-f\d]{4});/gi,
			function(e, t) {
				return String.fromCharCode(parseInt("0x" + t))
			}).replace(/&#(\d+);/gi,
			function(e, t) {
				return String.fromCharCode( + t)
			})
		},
		encodeAttr: function(e) {
			return String(e).replace(/["']/g,
			function(e) {
				return "&" + i[e] + ";"
			})
		},
		encodeHTML: function(e) {
			return String(e).replace(/['"<>& ]/g,
			function(e) {
				return "&" + i[e] + ";"
			})
		},
		elementText: function(e) {
			return e && e.tagName ? /^(input|textarea)$/i.test(e.tagName) ? e.value: s.decodeHTML(e.innerHTML) : ""
		}
	},
	o = {},
	a = !1;
	return t.format = function(t, n, i) {
		if (!t) return "";
		var a, r;
		"object" == typeof t && t.tagName && (r = t, t = r.getAttribute("id")),
		i = i || this,
		a = o[t],
		a || (/[^\w-]/.test(t) ? a = e(t) : (r || (r = s.g(t)), a = this.register(t, r)));
		var l = [];
		return a.call(n || "", l, s.encodeHTML, i, s.encodeAttr),
		l.join("")
	},
	t.register = function(t, n) {
		if (!arguments.length && !a) {
			a = !0;
			for (var i = document.getElementsByTagName("script"), r = 0; r < i.length; r++) {
				var l = i[r];
				if (/^(text\/template)$/i.test(l.getAttribute("type"))) {
					var t = l.getAttribute("id");
					t && arguments.callee.call(this, t, l)
				}
			}
		}
		if (t) return o[t] ? o[t] : ("string" != typeof n && ("undefined" == typeof n && (n = s.g(t)), n = s.elementText(n)), o[t] = e(n))
	},
	t.unregister = function(e) {
		delete o[e]
	},
	t.format && (t._format = t.format, t.format = function(e, n, i) {
		var s = t._format(e, n, i);
		return String(s).replace(/(.+?)>\s*<(.+?)/g, "$1><$2")
	}),
	t
}),
define("component/Guide", ["require", "exports", "module", "component/UIBase", "component/Dialog", "component/Slide", "base/eventEmitter", "base/aceTemplate.min", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("component/Dialog"),
	i = e("component/Slide"),
	s = e("base/eventEmitter"),
	o = e("base/aceTemplate.min"),
	a = e("base/util");
	return t.extend({
		_type: "guide",
		options: {
			template: '<div id="guide-tip" class="guide-tip" style="display:none"><div class="tip-arrow"></div><div class="close-tip open #{recordable}" memo="{id:\'GuideTipClose\',type:\'guide\',global:1}" layer="#GuideTip">X</div><div class="tip-content"><p>#{content}</p></div></div>',
			getNewFunctionList: {
				name: "getNewFunctionList",
				uri: "guide/getNewFunctionList"
			},
			newFunctionGuide: !1,
			hasMarketAuth: !1,
			onsuccess: function(e) {},
			onclose: function() {}
		},
		_init: function() {
			this.options.newFunctionGuide && this.getNewFunctionList();
			var e = $.holmes.config.memo; ! this.options.hasMarketAuth || e.hasOwnProperty("GuideTipClose") && !e.GuideTipClose || this.showTip("您已经开通百度精算权限！"),
			s.setOwner(this)
		},
		showTip: function(e) {
			var t = $("#guide-tip");
			t.length && t.remove(),
			$(document.body).append(a.format(this.options.template, {
				content: e,
				recordable: this.options.hasMarketAuth ? "recordable": ""
			}));
			var n = $(".market-link").eq(0)[0];
			if (n) {
				t.show();
				var i = n.offsetWidth - t[0].offsetWidth;
				$.holmes.setRelatedPosition(t, n, "bl", {
					left: i,
					top: 7
				}),
				$(".tip-arrow", t).eq(0).css({
					left: t[0].offsetWidth - n.offsetWidth / 2
				})
			}
		},
		getNewFunctionList: function() {
			this.ajax(this.options.getNewFunctionList)
		},
		ongetNewFunctionListSuccess: function(e) {
			this.show(e)
		},
		ajax: function(e, t) {
			var n = this;
			t = t || {},
			s.trigger("on" + e.name),
			$.extend(!0, t, {
				method: e.uri
			}),
			$.holmes.ajaxJsonPost($.holmes.config.systemConfig.ajaxUri, t,
			function(e) {
				n.ongetNewFunctionListSuccess(e),
				n.options.onsuccess(e)
			},
			function(e) {})
		},
		closeHandler: function() {
			this.GuideSilder.stop(),
			this.options.onclose()
		},
		show: function(e, t) {
			this.GuideDialog = new n({
				titleText: "",
				content: o.format("guide-template", {
					items: e.items,
					type: "function"
				}),
				isModal: !0,
				className: "guide-dialog",
				width: 739,
				height: 530
			}),
			this.GuideDialog.show(),
			s.setOwner(this.GuideDialog),
			s.register("onclose", $.proxy(this.closeHandler, this)),
			s.setOwner(this);
			var a = e.items[0].images;
			this.GuideSilder = new i({
				containerId: "slides-container",
				sliderId: "slider",
				controlId: "slider-btn",
				direction: "left",
				duration: 35,
				pause: 2e3,
				width: 700,
				height: 430,
				auto: a.length > 1,
				autoRender: !0,
				items: a
			}),
			this.GuideSilder.run(0)
		}
	})
}),
define("base/ajax", [],
function() {
	return function(e, t, n, i) {
		var s = t.name,
		o = t.uri;
		n = $.extend(n, {
			method: o
		}),
		i = i || {};
		var a = e["on" + s + "Done"] ||
		function() {},
		r = e["on" + s + "Failed"] ||
		function() {};
		return $.ajax($.holmes.config.systemConfig.ajaxUri, {
			data: n,
			dataType: "text",
			cache: i.cache || !1,
			beforeSend: $.proxy(e["onbefore" + s], e),
			success: function(t, i, s) {
				try {
					t = new Function("return (" + s.responseText + ")")(),
					0 === t.status || t.status > 2 ? a && a.call(e, t.data, n) : 1 === t.status ? r && r.call(e, t.msg, t.data || {}) : 2 === t.status && (window.location = t.data)
				} catch(o) {
					r && r.call(e, "系统错误，请稍候再试…")
				}
			},
			error: function(t) {
				0 !== +t.status && r && r.call(e, "系统错误，请稍候再试…")
			},
			type: i.type || "post"
		})
	}
}),
define("component/Download", ["require", "exports", "module", "component/UIBase", "component/Dialog", "base/util", "base/ajax", "underscore"],
function(e) {
	var t = e("./UIBase"),
	n = e("./Dialog"),
	i = e("../base/util"),
	s = (e("../base/ajax"), e("underscore"));
	return t.extend({
		_type: "download",
		queryId: null,
		downloadType: null,
		sri: null,
		eri: null,
		downloadHistory: {},
		options: {
			trigerId: null,
			isShowNumberFilter: !0,
			reportTitle: null,
			reportId: null,
			siteId: null,
			reportTypes: ["pdf", "csv"],
			url: null,
			ajaxUri: null,
			downloadMethod: "download/generate",
			queryMethod: "download/query",
			onchange: function(e) {},
			queryInterval: function(e) {
				var t = function(e) {
					for (var t = 1,
					n = 0; e >= t; t++) n += 1 / t;
					return n
				};
				return 44 >= e ? Math.round(4e3 * t(e)) : !1
			},
			className: "download-dialog",
			wrapperTemplate: '<div class="download-report-wrapper"><div class="download-report-items"><span class="download-report-item-label">文件类型：</span>#{items}</div><div id="#{tipId}" class="download-report-tip">#{tip}</div>#{rangeTpl}<div class="download-report-buttons"><a class="btn btn-blue btn-large" id="#{downloadId}" href="javascript:void(0)"><span>下载</span></a><a class="btn btn-large" id="#{cancelId}" href="javascript:void(0)">取消</a></div></div>',
			itemTemplate: '<input type="radio" rangeTitle="#{5}" title="#{2}" class="custom-radio" data="#{4}" id="#{0}"#{3} name="download__report"/><label for="#{0}" rangeTitle="#{5}" title="#{2}">#{1}</label>',
			iframeTemplate: '<iframe id="#{0}" width="0" height="0"></iframe>',
			dataRangeTemplate: '<div class="download-report-items download-report-items-range"><span class="download-report-item-label">数据区间：</span><input class="text sri" type="text" placeholder="请输入" value="#{sri}"><span class="download-report-items-range-sep">-</span><input class="text eri" type="text" placeholder="请输入" value="#{eri}"><span>条</span></div><div id="#{rangeId}" class="download-report-tip">#{rangeTip}</div>',
			loadingText: "报告生成中，可能需要等待30秒到5分钟",
			defaultText: "下载",
			downloadingText: "下载中",
			errorText: "发生错误，请点击重试",
			timeoutText: "获取超时，请点击重试",
			downloads: [{
				id: "pdf",
				label: "PDF",
				limit: 500,
				rangeTip: "单次最多支持500条数据下载，请填写相应区间。",
				title: "本格式图文并茂，阅读时需pdf相应软件。"
			},
			{
				id: "csv",
				label: "CSV",
				limit: 1e4,
				rangeTip: "单次最多支持10000条数据下载，请填写相应区间。",
				title: "本格式不含图示，支持较大量数据，便于后期数据处理。"
			},
			{
				id: "html",
				label: "HTML",
				title: "本格式图文并茂，支持数据量较少，体积小便于下载阅读。"
			}]
		},
		init: function(e) {
			this.options = $.extend(!0, $.extend(!0, {},
			this.options), e),
			void 0 !== e.reportTypes && (this.options.reportTypes = e.reportTypes),
			this.uiType = this._type,
			this.classPrefix = this._type,
			this._init && this._init(),
			e.autoRender && this.render()
		},
		renderHTML: function() {
			var e = [];
			for (var t in this.options.downloads) if (this.options.downloads.hasOwnProperty(t)) {
				var n = this.options.downloads[t]; - 1 !== s.indexOf(this.options.reportTypes, n.id) && e.push(i.format(this.options.itemTemplate, this.getId(n.id), n.label, n.title, 0 === +t ? ' checked="checked"': "", n.id, n.rangeTip))
			}
			var o = this.options.downloads[0],
			a = o.title,
			r = o.rangeTip,
			l = i.format(this.options.wrapperTemplate, {
				title: this.options.reportTitle || "下载报告",
				items: e.join(""),
				tipId: this.getId("Tip"),
				tip: a,
				rangeTpl: i.format(this.options.dataRangeTemplate, {
					rangeId: this.getId("Range"),
					rangeTip: r,
					sri: this.sri,
					eri: this.eri
				}),
				downloadId: this.getId("Download"),
				cancelId: this.getId("Cancel")
			});
			return l
		},
		isShowNumberFilter: function() {
			var e = !0,
			t = null;
			if (!$("#paging").length || void 0 === $("#paging").data("paging-total")) return ! 1;
			t = +$("#paging").data("paging-total");
			var n = this.downloadType,
			i = s.find(this.options.downloads,
			function(e) {
				return e.id === n
			}),
			o = i.limit || null;
			return s.isNumber(t) && s.isNumber(o) && o >= t && (e = !1),
			e
		},
		changeDataRangeFilter: function() {
			this.options.isShowNumberFilter && this.isShowNumberFilter() ? ($(this.dialog.getContainer()).find(".download-report-items-range").show(), $("#" + this.getId("Range")).show(), this.setDownloadRange()) : ($(this.dialog.getContainer()).find(".download-report-items-range").hide(), $("#" + this.getId("Range")).hide(), this.sri = null, this.eri = null)
		},
		bindEvents: function() {
			var e = this;
			for (var t in this.options.reportTypes) if (this.options.reportTypes.hasOwnProperty(t)) {
				var n = this.options.reportTypes[t];
				$(document).on("click", "#" + this.getId(n),
				function() {
					$("#" + e.getId("Tip")).html(this.title),
					$("#" + e.getId("Range")).html($(this).attr("rangeTitle")),
					e.downloadType = $(this).attr("data"),
					e.changeDataRangeFilter()
				})
			}
			$(document).on("click", "#" + this.getId("Download"),
			function(t) {
				e.options.onchange(e.downloadType)
			}),
			$(document).on("click", "#" + this.getId("Cancel"),
			function() {
				e.dialog.close()
			}),
			$(this.dialog.getContainer()).on("focus", ".sri,.eri",
			function() {
				$(this).removeClass("error")
			}),
			$(this.dialog.getContainer()).on("keyup", ".sri",
			function() {
				var t = $(this),
				n = t.val();
				if (/^[1-9][0-9]*$/.test(n)) {
					var i = $(e.dialog.getContainer()).find(".eri");
					i.val( + n + e.getDownloadTypeLimit() - 1)
				} else t.addClass("error")
			})
		},
		loading: function(e) {
			$("#" + this.options.trigerId).html(e || this.options.loadingText),
			$("#" + this.options.trigerId).addClass("download-loading")
		},
		download: function(e) {
			if (this.dialog) {
				if (!this.checkDownloadDataRange()) return ! 1;
				this.dialog.close()
			}
			this.loading(),
			null == e.reportId && (e.reportId = this.options.reportId),
			null == e.siteId && (e.siteId = this.options.siteId),
			null == e.format && (e.format = this.downloadType),
			this.queryHandler && clearTimeout(this.queryHandler),
			this.queryXHR && this.queryXHR.abort(),
			this.downloadXHR && this.downloadXHR.abort();
			var t = e || {};
			$.extend(t, {
				method: this.options.downloadMethod
			}),
			null != this.sri && null != this.eri && (t.sri = this.sri, t.eri = this.eri),
			this.downloadXHR = $.holmes.ajaxJsonPost(this.options.ajaxUri, t, $.proxy(this.onDownloadSuccess, this), $.proxy(this.onFailure, this))
		},
		query: function() {
			if (this.queryId) {
				var e = {
					method: this.options.queryMethod,
					queryId: this.queryId
				};
				this.queryXHR && this.queryXHR.abort(),
				this.queryXHR = $.holmes.ajaxJsonPost(this.options.ajaxUri, e, $.proxy(this.onQuerySuccess, this), $.proxy(this.onFailure, this))
			}
		},
		runQuery: function() {
			if ($.isFunction(this.options.queryInterval)) var e = this.options.queryInterval.call(null, this.intervalIndex);
			else var e = this.options.queryInterval;
			e ? this.queryHandler = setTimeout($.proxy(this.query, this), e) : this.onFailure(this.options.timeoutText)
		},
		onDownloadSuccess: function(e) {
			this.queryId = e,
			this.intervalIndex = 1,
			this.runQuery()
		},
		onFailure: function(e) {
			$("#" + this.options.trigerId).innerHTML = e || this.options.errorText,
			$("#" + this.options.trigerId).hasClass("download-loading") && $("#" + this.options.trigerId).removeClass("download-loading"),
			this.queryId = null
		},
		onQuerySuccess: function(e) {
			e ? this.startDownload() : (this.intervalIndex++, this.runQuery())
		},
		startDownload: function() {
			0 === $("#DownloadChannel").length && $(document.body).append(i.format(this.options.iframeTemplate, "DownloadChannel")),
			$("#DownloadChannel")[0].src = this.options.url + "siteId=" + this.options.siteId + "&queryId=" + this.queryId,
			this.loading(this.options.downloadingText),
			setTimeout($.proxy(this.renderDefaultText, this), 2e3),
			this.downloadHistory[this.downloadType] = this.eri
		},
		renderDefaultText: function() {
			$("#" + this.options.trigerId).html(this.options.defaultText),
			$("#" + this.options.trigerId).hasClass("download-loading") && $("#" + this.options.trigerId).removeClass("download-loading")
		},
		setDownloadRange: function() {
			var e = this.downloadType || this.options.downloads[0].id,
			t = void 0 === this.downloadHistory[e] ? 0 : +this.downloadHistory[e],
			n = this.getDownloadTypeLimit();
			this.sri = t + 1,
			this.eri = t + n,
			$(this.dialog.getContainer()).find(".sri").val(this.sri).removeClass("error"),
			$(this.dialog.getContainer()).find(".eri").val(this.eri).removeClass("error")
		},
		checkDownloadDataRange: function() {
			var e = !1;
			if ($(this.dialog.getContainer()).length) {
				var t = $(this.dialog.getContainer()),
				n = t.find(".sri"),
				i = t.find(".eri");
				if (t.find(".download-report-items-range").is(":hidden")) e = !0,
				this.sri = null,
				this.eri = null;
				else {
					var s = $.trim(n.val()),
					o = $.trim(i.val());
					/^[1-9][0-9]*$/.test(s) ? /^[1-9][0-9]*$/.test(o) ? void 0 !== this.getDownloadTypeLimit() && +o - +s >= this.getDownloadTypeLimit() ? (n.addClass("error"), i.addClass("error")) : +s > +o ? (n.addClass("error"), i.addClass("error")) : (n.removeClass("error"), i.removeClass("error"), this.sri = +s, this.eri = +o, e = !0) : i.addClass("error") : n.addClass("error")
				}
			}
			return e
		},
		getDownloadTypeLimit: function(e) {
			e = e || this.downloadType || this.options.downloads[0].id;
			var t = s.find(this.options.downloads,
			function(t) {
				return t.id === e
			});
			return t.limit
		},
		renderDialog: function() {
			this.dialog = new n({
				id: this.getId("Dialog"),
				titleText: null != this.options.reportTitle ? "下载报告：<i>" + this.options.reportTitle + "</i>": "下载报告",
				content: this.renderHTML(),
				isModal: !0,
				isSingle: !0,
				width: 518,
				className: this.options.className
			}),
			this.setDownloadRange(),
			this.bindEvents()
		},
		render: function() {
			var e = this;
			this.downloadType = this.options.reportTypes[0],
			this.options.reportTypes.length > 1 ? $(document).on("click", "#" + this.options.trigerId,
			function(t) {
				return $("#" + e.options.trigerId).hasClass("download-loading") ? void t.preventDefault() : (e.pagingTotal = $("#paging").length && void 0 !== $("#paging").data("paging-total") ? +$("#paging").data("paging-total") : null, e.dialog || e.renderDialog(), e.dialog.show(), void e.changeDataRangeFilter())
			}) : $(document).on("click", "#" + this.options.trigerId,
			function(t) {
				return $("#" + e.options.trigerId).hasClass("download-loading") ? void t.preventDefault() : void e.options.onchange(e.downloadType)
			})
		}
	})
}),
define("component/CustomSelect", ["require", "exports", "module", "component/UIBase", "base/base", "base/util", "underscore"],
function(e) {
	var t = e("./UIBase"),
	n = (e("../base/base"), e("../base/util")),
	i = e("underscore");
	return t.extend({
		_type: "CustomSelect",
		options: {
			containerId: null,
			items: {
				systemItems: null,
				customItems: null
			},
			selectedId: null,
			defaultLabel: "",
			customizable: !0,
			customizableButtonLabel: "自定义推广方式",
			width: 200,
			onexpand: function() {},
			oncolspan: function() {},
			onchange: function(e) {},
			ondelete: function(e) {},
			onadd: function() {},
			templates: {
				listItemSelectedClass: "cst-dp-item-selected",
				header: '<span class="cst-dp-header">                         <span class="cst-dp-desc">#{0}</span>                         <span class="cst-dp-label" title="!{1}">!{2}</span>                         <span class="cst-dp-arrow btn-arrow"></span>                    </span>',
				droplist: '<ul class="cst-dp-body hm-dropdown-shadow hm-scroll" style="display: none">#{0}</ul>',
				droplistItemTitle: ['<li class="cst-dp-group-title">', '<a title="!{0}" class="ellipsis cst-dp-item-title">!{1}</a>', "</li>"].join(""),
				droplistItem: '<li data="#{2}" class="cst-dp-item #{4}">                              <a title="!{0}" class="ellipsis cst-dp-item-label">!{1}</a>#{3}                          </li>',
				droplistItemDelete: '<a class="cst-dp-item-del" data="#{0}">×</a>',
				droplistItemAdd: '<li class="cst-dp-item-add">                                  <a title="#{0}" class="ellipsis cst-dp-item-label">#{0}</a>                             </li>'
			},
			layout: "cst-01"
		},
		_selectedId: null,
		_systemItems: [],
		_customItems: [],
		_defaultLabel: "",
		_init: function() {
			this._selectedId = this.options.selectedId,
			this._defaultLabel = this.options.defaultLabel && this.options.defaultLabel + "：",
			this.options.customizable && i.isArray(this.options.items.systemItems) ? (this._systemItems = this.options.items.systemItems, this._customItems = this.options.items.customItems) : this._systemItems = this.options.items,
			this._render()
		},
		_render: function() {
			var e = $("#" + this.options.containerId);
			e.css("position", "relative").addClass(this.options.layout),
			void 0 !== this.options.className && e.addClass(this.options.className),
			this._renderHeader(),
			this._renderDropdown(),
			this._bindEvents()
		},
		_renderHeader: function() {
			var e = this._fetchLabel(this._selectedId),
			t = n.format(this.options.templates.header, this._defaultLabel, e.title, e.label);
			$("#" + this.options.containerId).append(t)
		},
		_updateHeader: function(e) {
			var t = $("#" + this.options.containerId);
			t.find("li").removeClass(this.options.templates.listItemSelectedClass),
			t.find("li[data=" + this._selectedId + "]").addClass(this.options.templates.listItemSelectedClass);
			var n = this._fetchLabel(this._selectedId),
			s = t.find(".cst-dp-label").first();
			s.html(i.escape(n.label)),
			s.attr("title", n.title)
		},
		_renderDropdown: function() {
			var e = this._createDropItemHtml(),
			t = n.format(this.options.templates.droplist, e);
			$("#" + this.options.containerId).append(t)
		},
		_createDropItemHtml: function() {
			for (var e, t = [], s = 0; s < this._systemItems.length; s++) {
				e = this._systemItems[s];
				var o = (e.title || e.label, $.trim(e.name));
				"" !== o && t.push(n.format(this.options.templates.droplistItemTitle, o, o));
				for (var a = 0; a < e.items.length; a++) {
					var r = String(e.items[a].id) === String(this._selectedId) ? this.options.templates.listItemSelectedClass: "";
					t.push(n.format(this.options.templates.droplistItem, e.items[a].title || e.items[a].label, e.items[a].label, e.items[a].id, "", r))
				}
			}
			if (!this.options.customizable) return t.join("");
			t.push(n.format(this.options.templates.droplistItemAdd, this.options.customizableButtonLabel));
			for (var a = 0; a < this._customItems.length; a++) {
				e = this._customItems[a];
				var o = (e.title || e.label, $.trim(e.name));
				if ("" !== o && t.push(n.format(this.options.templates.droplistItemTitle, o, o)), i.isArray(e.items)) for (var a = 0; a < e.items.length; a++) {
					var r = String(e.items[a].id) === String(this._selectedId) ? this.options.templates.listItemSelectedClass: "";
					t.push(n.format(this.options.templates.droplistItem, e.items[a].title || e.items[a].label, e.items[a].label, e.items[a].id, n.format(this.options.templates.droplistItemDelete, e.items[a].id), r))
				} else {
					var r = String(e.id) === String(this._selectedId) ? this.options.templates.listItemSelectedClass: "";
					t.push(n.format(this.options.templates.droplistItem, e.title || e.label, e.label, e.id, n.format(this.options.templates.droplistItemDelete, e.id), r))
				}
			}
			return t.join("")
		},
		_bindEvents: function() {
			var e = $("#" + this.options.containerId);
			e.hover(function() {
				e.addClass("btn-hover")
			},
			function() {
				e.removeClass("btn-hover")
			}),
			$(document).on("click", $.proxy(this._toggleBody, this));
			var t = e.find(".cst-dp-body");
			if (t.on("mouseout", $.proxy(this._listItemHoverClearHandler, this)), t.on("mouseover", $.proxy(this._listItemHoverHandler, this)), t.on("click", $.proxy(this._listItemClickHandler, this)), this.options.customizable) {
				var n = e.find(".cst-dp-item-del");
				n.on("click", $.proxy(this._listItemDeleteHandler, this))
			}
		},
		_toggleBody: function(e) {
			e.stopPropagation();
			var t = $(e.target),
			n = $("#" + this.options.containerId),
			i = n.find(".cst-dp-header").first(),
			s = n.find(".cst-dp-body").first();
			i.length && t.length && $.contains(i[0], t[0]) ? (i.addClass("cst-dp-header-selected"), i.addClass("btn-selected"), s.show(), this.options.onexpand()) : s.length && t.length && !$.contains(s[0], t[0]) && (s.hide(), i.removeClass("cst-dp-header-selected"), i.removeClass("btn-selected"), this.options.oncolspan())
		},
		_listItemClickHandler: function(e) {
			e.stopPropagation(),
			e.preventDefault();
			var t = $(e.target)[0],
			n = "LI" !== t.tagName ? $(t).closest("li") : $(t),
			i = $("#" + this.options.containerId),
			s = i.find(".cst-dp-header").first(),
			o = i.find(".cst-dp-body").first();
			if (n.length && $.contains(i[0], n[0]) && n.hasClass("cst-dp-item")) {
				var a = n.attr("data");
				this._selectedId = a,
				this._updateHeader(),
				this.options.onchange(a, this._fetchLabel(a).label)
			} else if (n.hasClass("cst-dp-item-add")) this.options.onadd();
			else if (n.hasClass("cst-dp-group-title")) return ! 1;
			o.hide(),
			s.removeClass("cst-dp-header-selected"),
			s.removeClass("btn-selected")
		},
		_listItemDeleteHandler: function(e) {
			e.stopPropagation(),
			e.preventDefault();
			var t = $(e.target),
			n = t.attr("data");
			this.options.ondelete(n)
		},
		_listItemHoverClearHandler: function(e) {
			var t = $("#" + this.options.containerId).find(".cst-dp-body li");
			t.removeClass("hover")
		},
		_listItemHoverHandler: function(e) {
			e.stopPropagation(),
			e.preventDefault();
			var t = $(e.target)[0],
			n = "LI" !== t.tagName ? $(t).closest("li") : $(t);
			this._listItemHoverClearHandler(),
			n.addClass("hover")
		},
		_fetchLabel: function(e) {
			for (var t, n = this._systemItems.concat(this._customItems), s = 0; s < n.length; s++) if (t = n[s], void 0 === t.id && i.isArray(t.items)) {
				for (var o = 0; o < t.items.length; o++) if (String(t.items[o].id) === String(e)) {
					var a = t.items[o].label || "";
					return {
						label: a,
						title: t.items[o].title || a
					}
				}
			} else if (String(t.id) === String(e)) {
				var a = t.label || "";
				return {
					label: a,
					title: t.title || a
				}
			}
			return {
				label: "",
				title: ""
			}
		},
		fetchLabel: function(e) {
			e = e || this._selectedId;
			var t, n = this._fetchLabel(e);
			return n && (t = n.label),
			t
		},
		getItem: function(e) {
			for (var t, n = this._systemItems.concat(this._customItems), i = 0; i < n.length; i++) if (t = n[i], String(t.id) === String(e)) return t
		},
		hide: function() {
			$("#" + this.options.containerId).hide()
		},
		show: function() {
			$("#" + this.options.containerId).show()
		},
		updateItemList: function(e) {
			var t = $("#" + this.options.containerId);
			this._systemItems = e.items,
			this._selectedId = e.selectedId;
			var n = this._fetchLabel(this._selectedId),
			s = t.find(".cst-dp-label").first();
			s.attr("title", n.label),
			s.html(i.escape(n.label)),
			t.find(".cst-dp-body").first().remove(),
			this._renderDropdown();
			var o = t.find(".cst-dp-body");
			o.on("mouseout", $.proxy(this._listItemHoverClearHandler, this)),
			o.on("mouseover", $.proxy(this._listItemHoverHandler, this)),
			o.on("click", $.proxy(this._listItemClickHandler, this))
		}
	})
}),
define("component/SendReport", ["require", "exports", "module", "component/UIBase", "component/Dialog", "component/CustomSelect", "base/util", "base/ajax", "underscore"],
function(e) {
	var t = e("./UIBase"),
	n = e("./Dialog"),
	i = e("component/CustomSelect"),
	s = e("../base/util"),
	o = (e("../base/ajax"), e("underscore"));
	return t.extend({
		_type: "send-report",
		options: {
			trigerId: null,
			reportTitle: null,
			reportId: null,
			siteId: null,
			reportTypes: ["html", "csv"],
			url: null,
			onchange: function(e) {},
			wrapperTemplate: ['<div class="send-report-wrapper">', '<div class="send-report-items">', '<div class="send-report-item send-report-item-mail">', '<span class="download-report-item-label">邮箱地址：</span>#{mail}</div>', '<div class=""><span class="download-report-item-label">文件类型：</span>#{types}', '</div><div id="#{tipId}" class="send-report-tip">#{typeTip}</div>', '<div class="send-report-item"><span class="download-report-item-label">发送周期：</span>#{durations}', '</div><div class="send-report-item"><span class="download-report-item-label">发送时间：</span>', '<span id="#{timesId}"></span></div><div id="#{sendTipId}" class="red" style="display: none;"></div>', '<div class="send-report-buttons">', '<a class="btn btn-blue btn-large" id="#{sendReportId}" href="javascript:void(0)"><span>确定</span>', '</a><a class="btn btn-large" id="#{cancelId}" href="javascript:void(0)">取消</a>', "</div>", "</div>"].join(""),
			typeTemplate: ['<input type="radio" class="custom-radio" title="#{2}" data="#{4}" id="#{0}" #{3} ', 'name="send__report"/>', '<label for="#{0}" title="#{2}">#{1}</label>'].join(""),
			types: [{
				id: "html",
				label: "HTML",
				title: "本格式图文并茂，支持数据量较少，体积小便于下载阅读。"
			},
			{
				id: "csv",
				label: "CSV",
				title: "本格式不含图示，支持较大量数据，便于后期数据处理。"
			}],
			durationTemplate: ['<input class="custom-radio" type="radio" data="#{3}" id="#{0}"#{2} name="send__duration"/>', '<label for="#{0}">#{1}</label>'].join(""),
			durations: [{
				id: "day",
				label: "每天"
			},
			{
				id: "week",
				label: "每周一"
			},
			{
				id: "month",
				label: "每月一号"
			}],
			mailTemplate: '<input type="text" class="text send-report-mail" style="ime-mode:disabled" id="#{0}" ><div class="send-report-tip"> 多个邮箱请用分号隔开。</div>',
			successTemplate: '<div class="send-report-items send-report-success-items">#{0}</div><div class="send-report-buttons"><a class="btn btn-blue btn-large" id="#{1}" href="javascript:void(0)"><span>确定</span></a></div>',
			className: "send-report-dialog"
		},
		_downloadType: null,
		_renderHTML: function() {
			for (var e = [], t = this, n = 0; n < this.options.reportTypes.length; n++) {
				var i = this.options.reportTypes[n];
				o.each(this.options.types,
				function(o) {
					o.id === i && e.push(s.format(t.options.typeTemplate, t.getId(o.id), o.label, o.title, 0 === n ? ' checked="checked"': "", o.id))
				})
			}
			for (var a = [], r = 0; r < this.options.durations.length; r++) {
				var l = this.options.durations[r];
				a.push(s.format(this.options.durationTemplate, this.getId(l.id), l.label, 0 === r ? ' checked="checked"': "", l.id))
			}
			var c = [],
			d = (new Date).getHours();
			d > 8 && 22 > d ? d += 1 : d = 8;
			for (var n = 8; 23 >= n; n++) c.push(s.format('<option value="#{0}" #{1}>#{0}</option>', "" + (10 > n ? "0" + n: n) + ":00", n === d ? ' selected="selected"': ""));
			var u = this.options.types[0].title;
			return this._downloadType = this.options.reportTypes[0],
			this._duration = this.options.durations[0].id,
			s.format(this.options.wrapperTemplate, {
				title: this.options.reportTitle || "邮件订阅",
				types: e.join(""),
				typeTip: u,
				durations: a.join(""),
				times: s.format('<select id="#{0}">#{1}</select>', this.getId("Time"), c.join("")),
				timesId: this.getId("TimeContainer"),
				tipId: this.getId("Tip"),
				sendTipId: this.getId("SendTip"),
				mail: s.format(this.options.mailTemplate, this.getId("Mail")),
				sendReportId: this.getId("Send"),
				cancelId: this.getId("Cancel")
			})
		},
		_bindEvents: function() {
			for (var e = this,
			t = 0; t < this.options.reportTypes.length; t++) {
				var n = this.options.reportTypes[t];
				$("#" + this.getId(n)).on("click",
				function() {
					$("#" + e.getId("Tip")).html(this.title),
					e._downloadType = $(this).attr("data")
				})
			}
			for (var i = 0; i < this.options.durations.length; i++) {
				var o = this.options.durations[i];
				$("#" + this.getId(o.id)).on("click",
				function() {
					e._duration = $(this).attr("data")
				})
			}
			$("#" + this.getId("Send")).on("click",
			function() {
				if (!$(this).hasClass("disabled")) {
					var t = $("#" + e.getId("Mail")),
					n = t.val().replace("；", ";"),
					i = n.split(";"),
					o = i.length;
					o > 20 && alert("最多可输入20个电子邮件地址！");
					for (var a = 0; o > a; a++) {
						if ("" === $.trim(i[a])) return alert("您输入的第" + (a + 1) + "个电子邮件地址为空，请重新填写！"),
						!1;
						if (!s.isEmail(i[a])) return alert("您输入的第" + (a + 1) + "个电子邮件地址有误，请重新填写！"),
						!1
					}
					e.options.onchange({
						format: e._downloadType,
						duration: e._duration,
						time: e.timeSelected,
						mails: $.trim($("#" + e.getId("Mail")).val())
					}),
					$(this).addClass("disabled")
				}
			}),
			$("#" + this.getId("Cancel")).on("click",
			function() {
				e.dialog.close()
			})
		},
		_renderDialog: function() {
			this.dialog = new n({
				id: this.getId("Dialog"),
				titleText: null != this.options.reportTitle ? "邮件订阅：<i>" + this.options.reportTitle + "</i>": "邮件订阅",
				content: this._renderHTML(),
				isModal: !0,
				isSingle: !0,
				width: 518,
				className: this.options.className
			}),
			this._renderTimeSelector(),
			this._bindEvents()
		},
		_renderTimeSelector: function() {
			var e = [],
			t = (new Date).getHours();
			t > 8 && 22 > t ? t += 1 : t = 8;
			for (var n = 8; 23 >= n; n++) e.push({
				id: n,
				label: "" + (10 > n ? "0" + n: n) + ":00"
			});
			this.timeSelector = new i({
				containerId: this.getId("TimeContainer"),
				items: this._formatTimeSelectData(e),
				defaultLabel: "",
				selectedId: t,
				customizable: !1,
				onchange: $.proxy(this._changeTimeSelector, this)
			}),
			this.timeSelected = this._updateTimeFormat(t)
		},
		_changeTimeSelector: function(e) {
			e = this._updateTimeFormat(e),
			this.timeSelected = e
		},
		_updateTimeFormat: function(e) {
			return "" + (10 > e ? "0" + e: e) + ":00"
		},
		_formatTimeSelectData: function(e) {
			return [{
				items: e
			}]
		},
		render: function() {
			if (0 !== $("#" + this.options.trigerId).length) {
				var e = this;
				$("#" + this.options.trigerId).on("click",
				function() {
					e.dialog || e._renderDialog(),
					$("#" + e.getId("SendTip")).hide(),
					$("#" + e.getId("Send")).removeClass("disabled"),
					e.dialog.show()
				})
			}
		},
		send: function(e) {
			var t = {
				method: this.options.method,
				reportId: this.options.reportId,
				format: this._downloadType,
				duration: this._duration,
				time: this.timeSelected,
				mails: $.trim($("#" + this.getId("Mail")).val()),
				siteId: this.options.siteId,
				params: $.param(e)
			},
			i = this;
			$.holmes.ajaxJsonPost(this.options.url, t,
			function(e) {
				$("#" + i.getId("SendTip")).show(),
				$("#" + i.getId("SendTip")).html(e),
				$("#" + i.getId("Send")).removeClass("disabled"),
				i.dialog.close(),
				i.successDialog = new n({
					titleText: "设置成功",
					content: s.format(i.options.successTemplate, e, i.getId("sendConfirm")),
					width: 518,
					isModal: !0
				}),
				i.successDialog.show(),
				$("#" + i.getId("sendConfirm")).on("click",
				function() {
					i.successDialog.close()
				})
			},
			function(e) {
				alert(e || "发送数据失败请稍后重试！"),
				$("#" + i.getId("Send")).removeClass("disabled")
			})
		}
	})
}),
define("component/DropDownList", ["require", "exports", "module", "component/UIBase", "base/util", "underscore"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util"),
	i = e("underscore");
	return t.extend({
		_type: "dropDownList",
		options: {
			containerId: "drop-down-list-container",
			label: "",
			shortcuts: !0,
			width: 150,
			items: [],
			query: !0,
			selectedItems: null,
			isDynamicChildren: !1,
			onchange: function() {}
		},
		_levelNum: 1,
		_subLevelIndex: 1,
		_container: null,
		_direction: "right",
		_shortcuts: null,
		_firstItem: null,
		_allLabels: null,
		_allItems: null,
		_allLis: null,
		_labelWidth: null,
		selectLabel: null,
		template: {
			dropDownListText: '<div class="drop-down-header"><span class="drop-down-text ellipsis" data-id="#{1}" title="!{0}">!{0}</span><span class="btn-arrow">&nbsp;</span></div>',
			dropDownList: '<div class="drop-down-list hm-scroll #{1}" style="display: none;" level="#{2}"><ul>#{0}</ul></div>',
			dropDownLi: '<li class="drop-down-li #{5}" data-id="#{1}" data-children="#{2}"><span class="drop-down-arrow-style #{3} #{4}">&nbsp;</span><span class="drop-down-li-content" title="!{0}">!{0}</span></li>',
			dropDownQueryLi: '<li class="drop-down-query-li"><span class="drop-down-search-btn">&nbsp;</span><input type="text" class="drop-down-query" placeholder="请输入关键词..."></li>',
			dropDownQueryNoResult: '<li class="drop-down-no-result-li"><span>未找到搜索结果</span></li>',
			dropDownQueryResult: '<li class="drop-down-result-li drop-down-clickable" data-id="#{0}"><span class="drop-down-li-content" title="!{1}">!{1}</span></li>'
		},
		_init: function() {
			if (this._container = $("#" + this.options.containerId), this._container.length) {
				this._container.addClass("drop-down-container");
				var e = this.options.items;
				this._allItems = [],
				this._allLabels = [],
				this._allLis = [],
				this._shortcuts = [],
				e && e.length && (this._levelNum = this._getLevelNum(e), this._getAllLabels(e), this._firstItem = this._allItems[0]),
				this._checkDirection()
			}
		},
		_getLevelNum: function(e) {
			var t = 1;
			for (var n in e) if (e.hasOwnProperty(n)) {
				var i = e[n];
				if (i.children && i.children.length) {
					var s = this._getLevelNum(i.children) + 1;
					t = Math.max(s, t)
				}
			}
			return t
		},
		_checkDirection: function() {
			var e = this._container.offset(),
			t = this.options.width,
			n = this._levelNum,
			i = $(document.body).width();
			e.left + n * t > i && (this._direction = "left")
		},
		_bindContainerEvents: function() {
			var e = this;
			this._container.on("mouseover",
			function(t) {
				var n = $(t.target);
				n.closest(".drop-down-header").length ? $(this).hasClass("btn-selected") || $(this).addClass("btn-hover") : $.proxy(e._handleSubList, e)(t)
			}),
			this._container.on("mouseout",
			function(e) {
				var t = $(e.target);
				t.closest(".drop-down-header").length && $(this).hasClass("btn-hover") && $(this).removeClass("btn-hover")
			}),
			this._container.on("click", $.proxy(this._handleList, this)),
			this._container.on("keyup",
			function(t) {
				var n = $(t.target);
				n.hasClass("drop-down-query") && $.proxy(e._search, e)(t)
			})
		},
		_bindEvents: function() {
			var e = this;
			this._bindContainerEvents(),
			$(document).on("click",
			function(t) {
				var n = $(t.target),
				i = n.closest(".drop-down-header"),
				s = n.closest(".drop-down-list");
				i.length || s.length || $(".drop-down-header", e._container).hasClass("btn-selected") && e._hideList()
			})
		},
		_search: function(e) {
			var t = $(e.target),
			i = $.trim(t.val()),
			s = $(".drop-down-level1 ul", this._container);
			if (this._removeSubList(1), this._removeResult(), i) {
				this._hideListLi();
				var o = this._getMatchedLabels(i);
				if (o.length) for (var a = 0,
				r = o.length; r > a; a++) {
					var l = o[a];
					s.append(n.format(this.template.dropDownQueryResult, l.allId, l.label))
				} else s.append(this.template.dropDownQueryNoResult)
			} else this._showListLi()
		},
		_removeResult: function() {
			var e = $(".drop-down-result-li", this._container),
			t = $(".drop-down-no-result-li", this._container);
			t.remove(),
			e.each(function() {
				$(this).remove()
			})
		},
		_getMatchedLabels: function(e) {
			e = e.toLowerCase();
			for (var t = [], n = this._allLabels, i = 0, s = n.length; s > i; i++) {
				var o = n[i],
				a = o.label.toLowerCase();
				a.indexOf(e) > -1 && t.push(o)
			}
			return t
		},
		_hideListLi: function() {
			var e = $(".drop-down-li", this._container),
			t = $(".drop-down-shortcut", this._container);
			e.each(function() {
				$(this).hide()
			}),
			t.hide()
		},
		_showListLi: function() {
			var e = $(".drop-down-li", this._container),
			t = $(".drop-down-shortcut", this._container);
			e.each(function() {
				$(this).show()
			}),
			t.show()
		},
		_handleList: function(e) {
			var t = $(e.target),
			n = this,
			i = t.closest(".drop-down-header");
			if (n._hideAllDropDownList(), i.length) {
				var s = $(".drop-down-level1", this._container),
				o = "none" !== s.css("display");
				i.hasClass("btn-selected") || i.addClass("btn-selected"),
				o ? n._hideList() : (s.show(), n.removeSelectedClass(), n.addSelectedClass())
			}
			var a = t.closest(".drop-down-clickable");
			if (a.length) {
				var r = a.attr("data-id"),
				l = $(".drop-down-query", this._container);
				n.options.onchange(r),
				n._hideList(),
				n.changeHeader(r),
				n._removeResult(),
				n._showListLi(),
				l.length && l.val("");
				var c = t.closest(".shortcut-li");
				n.selectLabel = {
					id: r,
					isShortcut: !!c.length
				}
			}
		},
		_hideAllDropDownList: function() {
			var e = $(".drop-down-container"),
			t = this;
			e.each(function() {
				if (!$(this).is(t._container)) {
					var e = ($(".drop-down-level1", $(this)), $(".drop-down-header", $(this)));
					e.removeClass("btn-selected");
					var n = $(".drop-down-list", $(this));
					n.each(function(e) {
						if (0 === e) {
							$(this).hide();
							var t = $(".drop-down-li", $(this));
							t.each(function() {
								$(this).removeClass("hover")
							})
						} else $(this).remove()
					})
				}
			})
		},
		_hideList: function() {
			var e = $(".drop-down-level1", this._container),
			t = $(".drop-down-header", this._container);
			this._removeSubList(1),
			t.removeClass("btn-selected");
			var n = $(".drop-down-li", this._container);
			n.each(function() {
				$(this).removeClass("hover")
			}),
			e.hide()
		},
		_removeSubList: function(e) {
			for (var t = e; t < this._levelNum; t++) {
				var n = "drop-down-level" + (t + 1),
				i = $("." + n, this._container);
				i.each(function() {
					$(this).remove()
				})
			}
		},
		_handleSubList: function(e) {
			var t = $(e.target),
			n = this;
			if (t.hasClass("drop-down-li")) {
				var i = t.closest("ul"),
				s = $("li", i);
				s.each(function() {
					$(this).removeClass("hover")
				}),
				t.hasClass("hover") || t.addClass("hover");
				var o = t.closest(".drop-down-list"),
				a = +o.attr("level"),
				r = t.attr("data-id"),
				l = "true" === t.attr("data-children");
				if (n._removeSubList(a), l) {
					var c = n._getChildrenById(n.options.items, r);
					n._render(c, r, a + 1);
					var d = t.position(),
					u = t.closest(".drop-down-list").position(),
					h = $(".drop-down-level" + (a + 1), this._container),
					p = u.top + d.top - 5,
					f = (n.options.width + 2) * a;
					f = this._labelWidth ? "right" === n._direction ? f += this._labelWidth: -(f - this._labelWidth) : "right" === n._direction ? f: -f,
					h.css({
						left: f,
						top: p
					}),
					h.show(),
					n.removeSelectedClass(),
					n.addSelectedClass()
				}
			}
		},
		_getChildrenById: function(e, t) {
			var n, i = t.split(",");
			return e && e.length ? (n = $.map(e,
			function(e) {
				return String(e.id) === i[0] ? e: void 0
			}), n = n[0], i.shift(), i.length && (n = this._getChildrenById(n.children, i.join())), n.children || n) : void 0
		},
		render: function(e) {
			this._container.length && (e && (this.options.items = e), this.options.items.length && (this._renderLabel(), this._renderHeader(), this._render(this.options.items, null, 1), this._labelWidth && $(".drop-down-list", this._container).css({
				left: this._labelWidth
			}), this.options.shortcuts && this._renderShortcuts(), this.options.selectedItems && this.select(this.options.selectedItems), this._bindEvents()))
		},
		select: function(e) {
			if (e) {
				i.isArray(e) && (e = e.join(",")),
				e = String(e);
				for (var t = 0,
				n = this._allItems.length; n > t; t++) {
					var s = this._allItems[t];
					s.allId === e && (this.changeHeader(e), this.options.onchange(e))
				}
				this.selectLabel = {
					id: e,
					isShortcut: !1
				}
			}
		},
		_getAllLabels: function(e, t) {
			for (var n in e) if (e.hasOwnProperty(n)) {
				var i = e[n];
				i.children && i.children.length ? t ? (i.allId = t + "," + i.id, this._allLis.push(i), this._getAllLabels(i.children, t + "," + i.id)) : (i.allId = String(i.id), this._allLis.push(i), this._getAllLabels(i.children, i.id)) : i.label && (i.allId = t ? t + "," + i.id: String(i.id), "全部" !== i.label && this._allLabels.push(i), this._allItems.push(i), this._allLis.push(i))
			}
		},
		_getShortcuts: function(e, t) {
			for (var n in e) if (e.hasOwnProperty(n)) {
				var i = e[n];
				i.shortcut && (i.allId = t ? t + "," + i.id: String(i.id), this._shortcuts.push(i)),
				i.children && i.children.length && (t ? this._getShortcuts(i.children, t + "," + i.id) : this._getShortcuts(i.children, i.id))
			}
		},
		_renderShortcuts: function() {
			if (this._getShortcuts(this.options.items), this._shortcuts.length) {
				for (var e = '<li class="drop-down-shortcut"><span class="drop-down-arrow-style">&nbsp;</span><span class="drop-down-li-content">快捷操作</span></li>',
				t = 0,
				i = this._shortcuts.length; i > t; t++) {
					var s = this._shortcuts[t],
					o = s.label,
					a = s.allId;
					e += n.format(this.template.dropDownLi, $.trim(o), a, !1, "", "", "drop-down-clickable shortcut-li")
				}
				var r = $(".drop-down-level1 ul", this._container);
				r.append(e),
				this._adjustStyle()
			}
		},
		_renderLabel: function() {
			if (this.options.label) {
				this._container.append(n.format('<span class="drop-down-label">#{0}：</span>', this.options.label));
				var e = $(".drop-down-label", this._container);
				this._labelWidth = e.actual("outerWidth")
			}
		},
		_renderHeader: function() {
			this._container.append(n.format(this.template.dropDownListText, this._firstItem.label, this._firstItem.allId))
		},
		changeHeader: function(e) {
			var t = $(".drop-down-text", this._container);
			if (e) {
				e = String(e);
				for (var i = 0,
				s = this._allLis.length; s > i; i++) {
					var o = this._allLis[i];
					if (o.allId === e) {
						if ("全部" === o.label) {
							var a, r = o.allId.split(",");
							if (r.length > 1) {
								r.pop(),
								a = r.join();
								for (var l = 0,
								c = this._allLis.length; c > l; l++) {
									var d = this._allLis[l];
									if (d.allId === a) {
										t.html(n.encodeHTML(d.label)),
										t.attr("title", n.encodeHTML(d.label)),
										t.attr("data-id", d.allId);
										break
									}
								}
							} else t.html(n.encodeHTML(o.label)),
							t.attr("title", n.encodeHTML(o.label)),
							t.attr("data-id", o.allId)
						} else t.html(n.encodeHTML(o.label)),
						t.attr("title", n.encodeHTML(o.label)),
						t.attr("data-id", o.allId);
						break
					}
				}
			}
		},
		disable: function() {
			this._container.addClass("disabled"),
			this._container.off()
		},
		enable: function() {
			this._container.removeClass("disabled"),
			this._bindContainerEvents()
		},
		addSelectedClass: function() {
			if (this.selectLabel) {
				var e = $('li.drop-down-li[data-id="' + this.selectLabel.id + '"]', this._container),
				t = this;
				e.each(function() {
					var e = $(this).hasClass("shortcut-li");
					t.selectLabel.isShortcut === e && $(this).addClass("selected")
				})
			} else {
				var n = this._firstItem.label,
				e = $('span.drop-down-li-content[title="' + n + '"]', this._container);
				if (e.length) {
					var i = e.first();
					i.parent().addClass("selected")
				}
			}
		},
		removeSelectedClass: function() {
			var e = $(".drop-down-li", this._container);
			e.each(function() {
				$(this).removeClass("selected")
			})
		},
		_render: function(e, t, i) {
			if (e && e.length) {
				var s = [],
				o = "";
				if (1 === i && this.options.query) {
					var a = this.template.dropDownQueryLi;
					s.push(a)
				}
				for (var r in e) if (e.hasOwnProperty(r)) {
					var l = e[r],
					c = !(!l.children || !l.children.length),
					d = t ? t + "," + l.id: l.id,
					u = l.label;
					o = n.format(this.template.dropDownLi, $.trim(u), d, c, c ? "drop-down-arrow": "", c && "left" === this._direction ? "left": "", c ? "": "drop-down-clickable"),
					s.push(o)
				}
				var h = n.format(this.template.dropDownList, s.join(""), "drop-down-level" + i, i);
				this._container.append(h),
				this._adjustStyle()
			}
		},
		getSelectedItems: function() {
			for (var e = $(".drop-down-text", this._container), t = e.attr("data-id"), n = [], i = t.split(","), s = ""; i.length;) {
				s = i.join();
				for (var o = 0,
				a = this._allLis.length; a > o; o++) {
					var r = this._allLis[o];
					r.allId === s && n.unshift(r)
				}
				i.pop()
			}
			return n
		},
		getSelectedLabels: function() {
			for (var e = this.getSelectedItems(), t = [], n = 0, i = e.length; i > n; n++) {
				var s = e[n];
				t.push(s.label)
			}
			return t
		},
		getSelectedIds: function() {
			for (var e = this.getSelectedItems(), t = [], n = 0, i = e.length; i > n; n++) {
				var s = e[n];
				t.push(s.id)
			}
			return t
		},
		_adjustStyle: function() {
			var e = $(".drop-down-arrow-style", this._container),
			t = this,
			n = $(".drop-down-list", this._container),
			i = $(".drop-down-query", this._container);
			e.each(function() {
				$(this).css({
					"float": t._direction,
					width: 6
				})
			}),
			n.each(function() {
				$(this).css({
					width: t.options.width
				})
			}),
			i.css({
				width: t.options.width - 70
			})
		},
		reinit: function(e) {
			return this._container = $("#" + this.options.containerId),
			this._container.length && this._domCache ? (this._container.hasClass("drop-down-container") || this._container.addClass("drop-down-container"), this._container.append(this._domCache), this._hideList(), e = e || this.options.selectedItems, e && this.select(e), this._bindEvents(), this._domCache = null, !0) : !1
		},
		detachList: function() {
			this._container.length && (this._domCache = this._container.children().detach())
		},
		removeList: function() {
			this._container.length && (this._container.empty(), this._domCache = null)
		}
	})
}),
define("component/SelectGroup", ["require", "exports", "module", "component/UIBase", "component/DropDownList", "base/util", "underscore"],
function(e) {
	var t = e("component/UIBase"),
	n = e("component/DropDownList"),
	i = e("base/util"),
	s = e("underscore");
	return t.extend({
		_type: "select_group",
		options: {
			containerId: null,
			isDynamicChildren: !1,
			label: "",
			items: [],
			selectedItems: [],
			separator: "",
			wrapperTemplate: '<span id="#{0}_container" level="#{1}" class="select-group"></span>',
			onchange: function(e) {}
		},
		_showLevel: 1,
		_values: null,
		_init: function() {
			this._values = []
		},
		_getData: function(e, t, n, i) {
			if (i > n) return null;
			for (var s = 0; s < e.length; s++) {
				var o = e[s];
				if (n === i && String(o.id) === String(t)) return o;
				var a = this._getData(o.children, t, n, i + 1);
				if (null !== a) return a
			}
			return null
		},
		_select: function(e, t) {
			var n = this._getData(this.options.items, e, t, 1);
			if (null !== n) {
				for (var i = t + 1,
				s = i; s <= this._showLevel; s++) $("#" + this.getId() + "_" + s + "_container").remove();
				this._values.splice(t - 1, this._values.length - t + 1),
				this._values[t - 1] = e,
				n && n.children && n.children.length > 0 ? (this._showLevel = i, this._values[t] = n.children[0].id, this._render(n.children, t)) : this._showLevel = t
			}
		},
		_getLabels: function(e) {
			for (var t = [], n = this.options.items, i = 0; i < e.length && (null !== n && 0 !== n.length); i++) for (var s in n) if (n.hasOwnProperty(s) && e[i] === n[s].id) {
				t.push(n[s].label),
				n = n[s].children;
				break
			}
			return t
		},
		_change: function(e, t) {
			var n = this.options.isDynamicChildren;
			n ? this._syncDynamicItemStatus(e, t) : this._select(e, t),
			1 === this._values.length && this._values[0] === this.options.items[0].id ? n ? this.options.onchange($.extend(!0, [], this._values), [], e, t) : this.options.onchange($.extend(!0, [], this._values), []) : n ? this.options.onchange($.extend(!0, [], this._values), this._getLabels(this._values), e, t) : this.options.onchange($.extend(!0, [], this._values), this._getLabels(this._values))
		},
		_render: function(e, t) {
			var o = this,
			a = this.getId() + "_" + this._showLevel,
			r = $("#" + this.options.containerId),
			l = $.extend(!0, {},
			e);
			r.append(i.format(o.options.wrapperTemplate, a, o._showLevel));
			var c;
			setTimeout(function() {
				if (e) {
					var i = s.map(l,
					function(e) {
						return e.children = null,
						e
					});
					c = new n({
						containerId: a + "_container",
						label: o.options.label[o._showLevel - 1] ? o.options.label[o._showLevel - 1] : "",
						items: i,
						onchange: function(e) {
							o._change(e, parseInt($("#" + a + "_container").attr("level"), 10))
						}
					}),
					c.render();
					for (var r in e) if (e.hasOwnProperty(r)) {
						var d = e[r];
						d.id === o.options.selectedItems[t] && c.changeHeader(d.id)
					}
					$("#" + a + "_container").data("dropDownList", c)
				}
				if (o.options.selectedItems) for (var r = 0; r < o.options.selectedItems.length; r++) {
					var u = o.options.selectedItems[r];
					o._select(u, r + 1)
				}
				o.options.selectedItems = []
			},
			0)
		},
		render: function(e) {
			var t = $("#" + this.options.containerId);
			t.length && (e && (this.options.items = e), t.empty(), this._render(this.options.items, 0))
		},
		disable: function() {
			for (var e = 1; e <= this._showLevel; e++) {
				var t = $("#" + this.getId() + "_" + e);
				t.data("dropDownList") && t.data("dropDownList").disable()
			}
		},
		disableSelectComponent: function() {
			this.disable()
		},
		enable: function() {
			for (var e = 1; e <= this._showLevel; e++) {
				var t = $("#" + this.getId() + "_" + e);
				t.data("dropDownList") && t.data("dropDownList").enable()
			}
		},
		enableSelectComponent: function() {
			this.enable()
		},
		select: function(e) {
			$(this.getId() + "_" + this._showLevel).value = e
		},
		getGroupId: function(e) {
			return this.getId() + "_" + e
		},
		reset: function() {
			this._select(this.options.items[0].id, 1),
			this.select(this.options.items[0].id),
			this.options.onchange([], [])
		},
		getSelectedLabels: function() {
			return this._getLabels(this._values)
		},
		_syncDynamicItemStatus: function(e, t) {
			for (var n = -1 !== e,
			i = t + 1,
			s = i; s <= this._showLevel; s++) {
				var o = $("#" + this.getId() + "_" + s + "_container");
				o[0] && o.remove()
			}
			this._values.splice(t - 1, this._values.length - t + 1),
			this._values[t - 1] = e,
			this._showLevel = n ? i: t
		},
		renderDynamicItems: function(e, t, n) {
			var i = -1 !== t;
			if (i) if (0 === e.length) this._showLevel = n;
			else {
				for (var s = this.options.items,
				o = this._values,
				a = 0; a < o.length; a++) for (var r = 0; r < s.length && (null !== s && 0 !== s.length); r++) if (s[r].id === o[a]) {
					if (!s[r].children || 0 === s[r].children.length) {
						s[r].children = e;
						break
					}
					s = s[r].children
				}
				this._values[n] = e[0].id,
				this._render(e, n)
			}
		}
	})
}),
define("component/CustomRadio", ["require", "exports", "module", "component/UIBase", "base/util", "underscore"],
function(e) {
	var t = e("component/UIBase"),
	n = e("base/util"),
	i = e("underscore");
	return t.extend({
		_type: "customRadio",
		options: {
			containerId: null,
			label: "",
			items: [],
			limit: 1,
			selectedItems: [],
			template: '<li id="#{0}" data="#{1}" title="#{2}" class="#{3}#{4}#{5}">#{2}</li>',
			groupTemplate: '#{1}<ul class="group">#{0}</ul>',
			disabled: !1,
			onchange: function(e, t) {}
		},
		_items: null,
		_selectedItems: null,
		_init: function() {
			this._items = i.isArray(this.options.items[0]) ? this.options.items: [this.options.items],
			this._selectedItems = $.extend([], this.options.selectedItems, !0)
		},
		_renderHtml: function() {
			var e = [],
			t = this;
			return i.each(this._items,
			function(s) {
				var o = [];
				s.length > 0 && (i.each(s,
				function(e, i) {
					o.push(n.format(t.options.template, t.getId(e.id), e.id, e.label, n.arrayContains(t._selectedItems, e.id) ? "cur": "", 0 === i ? " first": "", i === s.length - 1 ? " last": ""))
				}), e.push(n.format(t.options.groupTemplate, o.join(""), t.options.label ? '<label class="label">' + t.options.label + "：</label>": "")))
			}),
			e.join("")
		},
		reset: function() {
			var e = $("#" + this.options.containerId),
			t = this.getId(this.options.items[0].id);
			e.length && $("li", e).each(function(e, n) {
				var i = n.id;
				t === i ? $(n).addClass("checked") : $(n).removeClass("checked")
			}),
			this._selectedItems = $(!0, {},
			[this.options.items[0].id]),
			this.options.onchange(this._selectedItems, [])
		},
		getSelectedLabels: function() {
			var e = [],
			t = this;
			return i.each(this._selectedItems,
			function(n) {
				e.push($("#" + t.getId(n)).attr("title"))
			}),
			e
		},
		getSelectedItems: function() {
			return this._selectedItems
		},
		render: function() {
			var e = $("#" + this.options.containerId);
			e.length > 0 && (e.addClass("filter"), e.html(this._renderHtml()), this.bindHandle())
		},
		bindHandle: function() {
			var e = $("#" + this.options.containerId),
			t = this;
			$("li", e).on("click",
			function() {
				var s = $(this).attr("data");
				if (1 === t.options.limit) {
					if (t._selectedItems && t._selectedItems[0] === s) return;
					t._selectedItems = [s]
				} else n.arrayContains(t._selectedItems, s) ? t._selectedItems = i.without(t._selectedItems, s) : t._selectedItems.splice(0, t._selectedItems.length - t.options.limit + 1, s);
				$("li", e).removeClass("cur");
				var o = [];
				i.each(t._selectedItems,
				function(e) {
					var n = $("#" + t.getId(e));
					o.push(n.attr("title")),
					n.addClass("cur")
				}),
				t.options.onchange(t._selectedItems, o)
			})
		},
		hide: function() {
			$("#" + this.options.containerId).hide()
		},
		show: function() {
			$("#" + this.options.containerId).show()
		},
		disable: function() {
			var e = $("#" + this.options.containerId);
			e.addClass("disable"),
			$("li", e).off()
		},
		enable: function() {
			var e = $("#" + this.options.containerId);
			e.removeClass("disable"),
			this.bindHandle()
		}
	})
}),
define("component/Search", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "search",
		options: {
			containerId: "search-container",
			placeholder: "请输入...",
			onchange: function(e) {}
		},
		inputTemplate: '<span class="search-btn">&nbsp;</span><span class="search-close" style="display: none;">&nbsp;</span><input type="text" class="search-input" placeholder="#{0}"/>',
		_init: function() {
			this.container = $("#" + this.options.containerId),
			this.container.addClass("search-container")
		},
		_search: function() {
			var e = this.options.containerId,
			t = $(".search-input", this.container),
			n = $(".search-close", this.container),
			i = t.val(),
			s = {};
			i && (s[e] = i, this.options.onchange($.trim(i), s), n.show())
		},
		_bindEvents: function() {
			{
				var e = this,
				t = $(".search-btn", this.container),
				n = $(".search-close", this.container),
				i = $(".search-input", this.container);
				this.options.containerId
			}
			t.on("click",
			function(t) {
				t.stopPropagation(),
				e._search()
			}),
			i.on("keydown",
			function(t) {
				t.stopPropagation(),
				13 === t.keyCode && e._search()
			}),
			n.on("click",
			function(t) {
				n.hide(),
				i.val(""),
				e.options.onchange(null)
			}),
			i.on("focus",
			function() {
				e.container.addClass("search-container-focus")
			}),
			i.on("blur",
			function() {
				e.container.removeClass("search-container-focus")
			})
		},
		render: function() {
			this.container.append(n.format(this.inputTemplate, this.options.placeholder)),
			this._bindEvents()
		},
		changePlaceholder: function(e) {
			var t = $(".search-input", this.container);
			t.attr("placeholder", e)
		},
		resetSearch: function() {
			var e = $(".search-close", this.container),
			t = $(".search-input", this.container);
			e.hide(),
			t.val("")
		}
	})
}),
define("component/ShortDate", ["require", "exports", "module", "component/ClassBase", "base/util"],
function(e) {
	var t = e("component/ClassBase"),
	n = e("base/util");
	return t.extend({
		_type: "shortDate",
		options: {
			containerId: "DateSelectBar",
			onchange: function() {}
		},
		_init: function() {
			for (var e = $("#" + this.options.containerId)[0].getElementsByTagName("A"), t = 0, n = e.length; n > t; t++) $(e[t]).on("click", this._selectHandler())
		},
		_selectHandler: function() {
			var e = this;
			return function(t) {
				t.preventDefault(),
				e.removeClass(),
				$(this).addClass("cur");
				var n = this.href.lastIndexOf("#") + 1,
				i = parseInt(this.href.substring(n), 10);
				if (0 !== i) {
					var s = -1 === i ? -1 : i,
					o = -1 === i ? -1 : 0;
					e.options.onchange([e._recentDate(s), e._recentDate(o)], i)
				} else e.options.onchange([$.holmes.config.systemConfig.now, +$.holmes.config.systemConfig.now], i)
			}
		},
		removeClass: function() {
			for (var e = $("#" + this.options.containerId)[0].getElementsByTagName("A"), t = 0, n = e.length; n > t; t++) $(e[t]).removeClass("cur")
		},
		_dateDiff: function(e, t) {
			return parseInt(Math.abs(e - t) / 1e3 / 60 / 60 / 24, 10)
		},
		_recentDate: function(e) {
			return parseInt($.holmes.config.systemConfig.now, 10) + 3600 * e * 24 * 1e3
		},
		showDateTip: function(e, t) {
			var i = $("#Date"),
			s = n.formatDate,
			o = s(new Date(e), "yyyy/MM/dd"),
			a = s(new Date(t), "yyyy/MM/dd"),
			r = o === a ? o: o + "~" + a;
			i[0] && (i[0].innerHTML = "(" + r + ")");
			var l = $(".report-help");
			l.eq(0) && $(".tip-arrow").eq(0).css("left", l.eq(0)[0].offsetLeft + 2 + "px")
		}
	})
}),
define("component/DateSelector", ["require", "exports", "module", "component/ClassBase", "base/util"],
function(e) {
	var t = e("component/ClassBase"),
	n = e("base/util");
	return t.extend({
		_type: "dateSelector",
		_init: function(e) {
			this.uniqueId = this.getId(),
			e = e || {},
			this.onselect = e.onselect || new Function,
			this.singleSelection = e.singleSelection || !1,
			this.onviewchange = e.onviewchange,
			this.autoFill = e.autoFill,
			("undefined" == typeof this.autoFill || null === this.autoFill) && (this.autoFill = !0),
			this.dateStyle = e.dateStyle || "",
			this.weekStyle = e.weekStyle || "",
			this.sideButtonStyle = e.sideButtonStyle,
			this.sideButtonClass = e.sideButtonClass,
			this.calendarCount = e.calendarCount || 2,
			this.selected = e.selected || null;
			var t = this.selected ? this.selected.to: new Date;
			this.viewDate = new Date(t.getFullYear(), t.getMonth(), 1),
			this.clickState = "from",
			this.calWrapIdPrefix = this.uniqueId + "ds-calendar-wrap",
			this.wrapClass = "ds-wrap",
			this.prevClass = "ds-prev",
			this.nextClass = "ds-next",
			this.prevYearClass = "ds-prevyear",
			this.prevMonthClass = "ds-prevmonth",
			this.prevMonthActiveClass = "ds-prevmonth-active",
			this.nextYearClass = "ds-nextyear",
			this.nextMonthClass = "ds-nextmonth",
			this.nextMonthActiveClass = "ds-nextmonth-active",
			this.prevYearId = "ds-prev-year",
			this.prevMonthId = "ds-prev-month",
			this.nextYearId = "ds-next-year",
			this.nextMonthId = "ds-next-month",
			this.calWrapClass = "ds-cal-wrap",
			this.calBlankClass = "ds-cal-blank",
			this.calHeadClass = "ds-cal-head",
			this.calHeadSelClass = "ds-cal-head-selected",
			this.dateClass = "ds-date-thismonth",
			this.dateSelectedClass = "ds-date-selected",
			this.dateOtherClass = "ds-date-othermonth",
			this.weekClass = "ds-week"
		},
		getDateCountByMonth: function(e) {
			var t = new Date(e.getFullYear(), e.getMonth() + 1, 0);
			return t.getDate()
		},
		setSelected: function(e) {
			return this.selected = e && e.from && e.to ? e: {},
			this.renderCalendars(),
			this.clickState = "from",
			this
		},
		getSelected: function() {
			return this.selected
		},
		appendTo: function(e) {
			var t = document.createElement("table"),
			n = document.createElement("tbody"),
			i = document.createElement("tr");
			t.className = this.wrapClass,
			n.appendChild(i),
			t.appendChild(n),
			e.appendChild(t),
			t.onclick = this.getClickHandler(),
			$(t).on("mousedown", this.getMouseDownHandler()),
			$(t).on("mouseup", this.getMouseUpHandler()),
			this.renderSide("prev", i);
			for (var s = 0; s < this.calendarCount; s++) {
				var o = document.createElement("td");
				o.vAlign = "top",
				o.id = this.calWrapIdPrefix + s,
				o.className = this.calWrapClass,
				s === this.calendarCount - 1 && (o.className = this.calWrapClass + " ds-cal-wrap-last"),
				i.appendChild(o),
				s < this.calendarCount - 1 && (o = document.createElement("td"), o.className = this.calBlankClass, i.appendChild(o))
			}
			this.renderSide("next", i),
			this.renderCalendars(),
			this.appendTo = new Function
		},
		renderSide: function(e, t) {
			for (var i, s, o, a = '<div class="#{yearclass}" id="#{yearId}" sign="#{type}year" style="#{yearstyle}"></div><div class="#{monthclass}" id="#{monthId}" sign="#{type}month" style="#{monthstyle}"></div>',
			r = ["year", "month"], l = ["class", "style"], c = {
				styleFn: this.sideButtonStyle || new Function,
				classFn: this.sideButtonClass || new Function
			},
			d = {
				from: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - this.calendarCount + 1, 1),
				to: this.viewDate
			},
			u = {
				monthstyle: this[e + "MonthStyle"],
				yearstyle: this[e + "YearStyle"],
				monthclass: this[e + "MonthClass"],
				yearclass: this[e + "YearClass"],
				yearId: this[e + "YearId"],
				monthId: this[e + "MonthId"]
			},
			h = 0; h < r.length; h++) {
				i = r[h];
				for (var p = 0; p < l.length; p++) switch (o = c[l[p] + "Fn"], typeof o) {
				case "function":
					d.type = e + i,
					s = o(d),
					s && (u[i + l[p]] = s);
					break;
				case "string":
					u[i + l[p]] = o
				}
			}
			var f = this.uniqueId + e + "-side",
			m = $("#" + f)[0];
			if (!m) {
				if (!t) return;
				m = document.createElement("td"),
				m.id = f,
				e = e.toLowerCase(),
				m.vAlign = "top",
				m.className = this[e + "Class"],
				t.appendChild(m)
			}
			m.innerHTML = n.format(a, {
				type: e,
				yearclass: u.yearclass,
				monthclass: u.monthclass,
				yearstyle: u.yearstyle,
				monthstyle: u.monthstyle,
				yearId: u.yearId,
				monthId: u.monthId
			})
		},
		renderCalendars: function() {
			for (var e = 0; e < this.calendarCount; e++) {
				var t = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - this.calendarCount + 1 + e, 1);
				$("#" + this.calWrapIdPrefix + e)[0].innerHTML = this.getCalendarHtml(t.getFullYear(), t.getMonth())
			}
		},
		getCalendarHtml: function(e, t) {
			var i = '<div id="calendar-#{year}-#{month}" class="#{clazz}" sign="month" y="#{year}" m="#{month}">#{year}年#{nextmonth}月</div>',
			s = '<table cellpadding="0" cellspacing="0" border="0" class="#{className}"><thead>#{thead}</thead><tbody>#{tbody}</tbody></table>',
			o = [],
			a = this.calHeadClass,
			r = new Date(e, t, 1),
			l = new Date(r);
			return l.setMonth(l.getMonth() + 1),
			l.setDate(0),
			this.selected && r - this.selected.from >= 0 && l - this.selected.to <= 0 && (a = this.calHeadSelClass),
			o.push(n.format(i, {
				clazz: a,
				year: e,
				month: t,
				nextmonth: t + 1
			}), n.format(s, {
				thead: this.getCalHeadHtml(),
				className: this.singleSelection ? "single": "",
				tbody: this.getCalBodyHtml(e, t)
			})),
			o.join("")
		},
		getCalHeadHtml: function() {
			for (var e = ["日", "一", "二", "三", "四", "五", "六"], t = [n.format('<tr><td class="#{0}"></td>', this.weekClass)], i = "<td>#{0}</td>", s = 0; 7 > s; s++) t.push(n.format(i, e[s]));
			return t.push("</tr>"),
			t.join("")
		},
		getCalBodyHtml: function(e, t) {
			function i() {
				var e = Array.prototype.slice.call(arguments);
				e.unshift(d),
				h.push(n.format.apply(null, e))
			}
			var s, o, a, r, l, c, d = '<td><div sign="#{3}" style="#{5}" class="content #{4}#{7}#{8}#{9}#{10}" y="#{2}" m="#{1}" d="#{0}">#{6}</div></td>',
			u = '<td class="#{0}" sign="week" style="#{1}"></td>',
			h = [],
			p = new Date(e, t, 1),
			f = new Date(e, t - 1, 1),
			m = this.getDateCountByMonth(f),
			g = this.getDateCountByMonth(p),
			v = 0 - new Date(e, t, 1).getDay();
			this.dateStyle.constructor === String && (l = this.dateStyle),
			"function" == typeof this.weekStyle && (c = this.weekStyle(new Date(f.getFullYear(), f.getMonth(), m + v + 1)) || ""),
			h.push("<tr>", n.format(u, this.weekClass, c));
			for (var b = 0; g > v; v++, b++) {
				var y = "date",
				w = "",
				x = "",
				$ = "",
				_ = "";
				if (b > 0 && b % 7 === 0 && ($ = " sunday", "function" == typeof this.weekStyle && (c = this.weekStyle(new Date(e, t, v + 1)) || ""), h.push("</tr><tr>", n.format(u, this.weekClass, c))), 6 === new Date(e, t, v + 1).getDay() && (_ = " saturday"), 0 > v) s = m + v + 1,
				o = f.getMonth(),
				a = f.getFullYear(),
				r = this.dateOtherClass,
				this.autoFill || (y = "");
				else if (s = v + 1, o = t, a = e, r = this.dateClass, this.selected) {
					var C = new Date(a, o, s);
					C - this.selected.from === 0 && (w = " ds-date-first-selected"),
					C - this.selected.to === 0 && (x = " ds-date-last-selected"),
					C - this.selected.from >= 0 && C - this.selected.to <= 0 && (r = this.dateSelectedClass)
				}
				"function" == typeof this.dateStyle && y && (l = this.dateStyle(new Date(a, o, s)) || ""),
				i(s, o, a, y, r, r === this.dateSelectedClass ? "": l, y ? s: "", w, x, $, _)
			}
			o = t + 1,
			a = e,
			o > 11 && (o = 0, a++),
			r = this.dateOtherClass,
			l = "";
			for (var T = b % 7,
			I = T; T > 0 && 7 > T; T++) this.autoFill ? (y = "date", s = T - I + 1, "function" == typeof this.dateStyle && (l = this.dateStyle(new Date(a, o, s)) || "")) : (s = "&nbsp;", y = ""),
			i(s, o, a, y, r, l, s);
			return h.push("</tr>"),
			h.join("")
		},
		getMouseUpHandler: function() {
			var e = this;
			return function(t) {
				t = t || window.event;
				var n = t.srcElement || t.target,
				i = n.getAttribute("sign");
				"prevmonth" === i && $(n).removeClass(e.prevMonthActiveClass),
				"nextmonth" === i && $(n).removeClass(e.nextMonthActiveClass)
			}
		},
		getMouseDownHandler: function() {
			var e = this;
			return function(t) {
				t = t || window.event;
				var n = t.srcElement || t.target,
				i = n.getAttribute("sign");
				"prevmonth" === i && $(n).addClass(e.prevMonthActiveClass),
				"nextmonth" === i && $(n).addClass(e.nextMonthActiveClass)
			}
		},
		getClickHandler: function() {
			var e = this;
			return function(t) {
				t = t || window.event;
				var n, i, s, o, a = t.srcElement || t.target,
				r = a.getAttribute("sign"),
				l = new Date(e.viewDate);
				switch (r) {
				case "prevmonth":
					l.setMonth(e.viewDate.getMonth() - 1);
					break;
				case "prevyear":
					l.setFullYear(e.viewDate.getFullYear() - 1);
					break;
				case "nextmonth":
					l.setMonth(e.viewDate.getMonth() + 1);
					break;
				case "nextyear":
					l.setFullYear(e.viewDate.getFullYear() + 1);
					break;
				case "date":
					var c = new Date(a.getAttribute("y"), a.getAttribute("m"), a.getAttribute("d"));
					if ("from" === e.clickState) n = {
						from: c,
						to: c
					};
					else if (n = {
						from: e.selected.from,
						to: c
					},
					n.to - n.from < 0) {
						var d = n.to;
						n.to = n.from,
						n.from = d
					}
					break;
				case "week":
					if (e.singleSelection) return;
					var u = a.nextSibling;
					s = new Date(u.getAttribute("y"), u.getAttribute("m"), u.getAttribute("d")),
					o = new Date(s),
					o.setDate(o.getDate() + 6),
					n = {
						from: s,
						to: o
					};
					break;
				case "month":
					if (e.singleSelection) return;
					s = new Date(a.getAttribute("y"), a.getAttribute("m"), 1),
					o = new Date(s),
					o.setMonth(o.getMonth() + 1),
					o.setDate(0),
					n = {
						from: s,
						to: o
					};
					break;
				default:
					return
				}
				switch (r) {
				case "prevmonth":
				case "prevyear":
				case "nextmonth":
				case "nextyear":
					if (e.onviewchange) {
						var h = new Date(l);
						if (h.setMonth(h.getMonth() - e.calendarCount + 1), i = e.onviewchange.call(e, {
							from: h,
							to: l
						}), i === !1) return
					}
					e.viewDate = l,
					e.renderSide("prev"),
					e.renderSide("next");
					break;
				case "date":
				case "week":
				case "month":
					if (i = e.onselect.call(e, n), i === !1) return;
					e.selected = n,
					e.clickState = "date" === r && "from" === e.clickState ? "to": "from",
					e.singleSelection && (e.clickState = "from")
				}
				e.renderCalendars()
			}
		},
		renderManualInputBoxes: function(e) {
			var t = '<div class="date-range"><input type="text" value="" placeholder="起始日期" id="#{0}date-start" class="date-start" maxlength="10" style="IME-MODE: disabled" /><span> - </span><input type="text" value="" placeholder="终止日期" id="#{0}date-end" class="date-end" maxlength="10" style="IME-MODE: disabled" /></div>';
			$(e).prepend(n.format(t, this.uniqueId));
			var i = $("#" + this.uniqueId + "date-start, #" + this.uniqueId + "date-end"),
			s = this;
			i.on("keyup",
			function(e) {
				var t = e.which;
				if (8 !== t && 9 !== t && 17 !== t && 16 !== t && 229 !== t && 35 !== t && 36 !== t && 37 !== t && 38 !== t && 39 !== t && 40 !== t) {
					{
						var n = $.trim($("#" + s.uniqueId + "date-start")[0].value),
						i = $.trim($("#" + s.uniqueId + "date-end")[0].value);
						new Date(n),
						new Date(i)
					}
					10 === this.value.length && (s.validateDateInputs(), s.setSelected(s.selected))
				}
			}),
			i.on("blur",
			function(e) {
				s.validateDateInputs()
			})
		},
		validateDateInputs: function() {
			var e = $("#" + this.uniqueId + "date-start"),
			t = $("#" + this.uniqueId + "date-end"),
			n = $(".date-change input"),
			i = /^[\d]{4,4}[\/]([0][1-9]|[1][0-2])[\/]([0][1-9]|[1-2][\d]|[3][0-1])$/,
			s = $.trim(e.val()),
			o = $.trim(t.val()),
			a = new Date(s),
			r = new Date(o);
			if (i.test(s)) if (i.test(o)) if ("" !== s && "" !== o && a > r) t.addClass("date-invalid"),
			n.eq(0)[0].disabled = !0,
			n.eq(0).addClass("disabled"),
			this.onselect.call(this, l, "结束日期不能小于开始日期！");
			else {
				e.removeClass("date-invalid"),
				t.removeClass("date-invalid"),
				n.eq(0)[0].disabled = !1,
				n.eq(0).removeClass("disabled");
				var l = {
					from: a,
					to: r
				},
				c = this.onselect.call(this, l);
				if (c === !1) return;
				this.selected = l
			} else t.addClass("date-invalid"),
			n.eq(0)[0].disabled = !0,
			n.eq(0).addClass("disabled"),
			this.onselect.call(this, l, "结束日期输入有误，日期格式yyyy/MM/dd。");
			else e.addClass("date-invalid"),
			n.eq(0)[0].disabled = !0,
			n.eq(0).addClass("disabled"),
			this.onselect.call(this, l, "开始日期输入有误，日期格式yyyy/MM/dd。")
		},
		syncManualInputBoxes: function(e, t) {
			e && (e = n.formatDate(new Date(e), "yyyy/MM/dd")),
			t && (t = n.formatDate(new Date(t), "yyyy/MM/dd")),
			e = e || "",
			t = t || "",
			$("#" + this.uniqueId + "date-start")[0].value = e,
			$("#" + this.uniqueId + "date-end")[0].value = t;
			var i = $("#" + this.uniqueId + "date-start, #" + this.uniqueId + "date-end"),
			s = $(".date-change input", i.eq(0).parent().parent());
			i.eq(0).removeClass("date-invalid"),
			i.eq(1).removeClass("date-invalid"),
			s.eq(0).removeClass("disabled"),
			s.eq(0)[0].disabled = !1
		}
	})
}),
define("component/DateController", ["require", "exports", "module", "component/ClassBase", "base/util", "component/DateSelector"],
function(e) {
	var t = e("component/ClassBase"),
	n = e("base/util"),
	i = e("component/DateSelector");
	return t.extend({
		_type: "dateController",
		options: {
			tpl: '<iframe src="about:blank" frameborder="0" scrolling="no" id="#{maskIframeId}"></iframe><div></div><div class="#{btnBarClass} clearfix"><div class="#{toolTipClass}"></div><div class="date-change"><input type="button" value="确定" id="#{prefix}change-date" class="btn btn-blue">&nbsp;&nbsp;&nbsp;<input type="button" value="取消" id="#{prefix}cancel-change-date" class="btn"></div></div>'
		},
		_init: function(e) {
			this.dateSelectBar = e.container || "control-bar",
			this.prefix = e.prefix || "",
			this.singleSelection = e.singleSelection || !1,
			this.alwaysCompare = e.alwaysCompare || !1,
			this.calendarCount = e.calendarCount || 3;
			var t = this.getId();
			this.calendarContainerId = "calendar-container-" + t,
			this.maskIframeId = "iframe-" + t,
			this.calendarContainerClass = e.calendarContainerClass || "calendar-box",
			this.toolTipClass = e.toolTipClass || "date-select-tip",
			this.btnBarClass = e.toolTipClass || "btn-bar",
			this.onchange = e.onchange || {},
			this.compareChange = e.compareChange || {},
			this.startDate = e.startDate || new Date(1970, 1, 1),
			this.endDate = e.endDate || new Date,
			this.otherStartDate = e.otherStartDate || null,
			this.otherEndDate = e.otherEndDate || null,
			this.todayDate = e.todayDate || new Date,
			this.firstDate = e.firstDate || new Date(1970, 1, 1),
			this.dateCompare = !1,
			this.msg = "",
			this.dateSelector = null,
			this.diff = null,
			this.selected = {},
			this.hasManualInputs = void 0 !== e.hasManualInputs ? e.hasManualInputs: !0;
			var n = $("#" + this.prefix + "date-select-bar")[0].getElementsByTagName("A");
			$(n).on("click", this.selectHandle()),
			this.createCalendarContainer(),
			this.createCalendar(),
			this.initInputDate(),
			this.initShortcutDate(),
			this.bindHandle(),
			this.showDateTip(),
			this.hideDateBoxFn = this.hideDateBoxHandle()
		},
		reset: function(e) {
			this.startDate = e.startDate || this.startDate,
			this.endDate = e.endDate || this.endDate,
			this.otherStartDate = e.otherStartDate || this.otherStartDate,
			this.otherEndDate = e.otherEndDate || this.otherEndDate,
			this.todayDate = e.todayDate || new Date,
			this.firstDate = e.firstDate || new Date(1970, 1, 1),
			this.dateCompare = e.dateCompare || this.dateCompare,
			$("#" + this.calendarContainerId).remove(),
			this.createCalendarContainer(),
			this.createCalendar(),
			this.initInputDate(),
			this.initShortcutDate(),
			this.bindResetHandle(),
			this.showDateTip(),
			this.hideDateBoxFn = this.hideDateBoxHandle()
		},
		bindResetHandle: function() {
			var e = $("#" + this.calendarContainerId);
			e.on("click",
			function(e) {
				e.stopPropagation()
			});
			var t = $(".date-change input", e);
			t.eq(0).on("click", this.submitDateSelect()),
			t.eq(1).on("click", this.hideDateBoxHandle())
		},
		bindHandle: function() {
			var e = $("#" + this.calendarContainerId),
			t = $("#" + this.prefix + "date-select"),
			n = t.parents(".select-bar-item");
			n[0] && n.on("click", this.showDateBox(0));
			var i = $("#" + this.prefix + "compare-date");
			i[0] && i.on("click", this.showDustDateInput());
			var s = $("#" + this.prefix + "compare-date-select"),
			o = s.parents(".compare-date-container");
			o[0] && o.on("click", this.showDateBox(2)),
			e.on("click",
			function(e) {
				e.stopPropagation()
			});
			var a = $(".date-change input", e);
			a.eq(0).on("click", this.submitDateSelect()),
			a.eq(1).on("click", this.hideDateBoxHandle()),
			$(window).on("resize", $.proxy(this.dateResizeHandler, this)),
			$(window).on("scroll", $.proxy(this.dateResizeHandler, this))
		},
		dateResizeHandler: function() {
			this.hideDateBoxHandle().call(this)
		},
		showDustDateInput: function() {
			var e = this;
			return function(t) {
				if (t.stopPropagation(), this.checked) {
					if ($(this).prev() && $(this).prev().hasClass("checkbox") && $(this).prev().addClass("checked"), !e.otherStartDate && !e.otherEndDate) {
						var n = e.dateDiff(e.endDate, e.startDate),
						i = e.startDate.getTime() - 864e5,
						s = e.startDate.getTime() - 864e5 - 24 * n * 3600 * 1e3;
						i <= e.todayDate.getTime() && s >= e.firstDate.getTime() && (e.autoOtherEndDate = new Date(new Date(i)), e.autoOtherStartDate = new Date(new Date(s)))
					}
					e.showInput(),
					e.showDateBox(2).call(this, t)
				} else $(this).prev() && $(this).prev().hasClass("checkbox") && $(this).prev().removeClass("checked"),
				e.hideInput(),
				e.hideDateBoxHandle().call(this),
				e.otherStartDate = null,
				e.otherEndDate = null,
				e.autoOtherStartDate = null,
				e.autoOtherEndDate = null,
				e.msg = "",
				e.initInputDate(),
				e.onchange(this.id)
			}
		},
		submitDateSelect: function() {
			var e = this;
			return function() {
				var t = e.selected.from,
				n = e.selected.to;
				e.dateCompare ? (e.otherStartDate = t, e.otherEndDate = n) : (e.startDate = t, e.endDate = n),
				e.currentSubmit = !0,
				e.showDateTip(),
				e.initShortcutDate(),
				e.hideDateBoxFn(),
				e.onchange("submit-date-select")
			}
		},
		hideDateBoxHandle: function() {
			var e = this;
			return function() {
				$(document).off("click", e.hideDateBoxFn),
				$("#" + e.calendarContainerId).hide(),
				e.initInputDate(),
				$("#custom-date-select .select-bar-item").each(function(e, t) {
					$(t).removeClass("cur")
				})
			}
		},
		showDateBox: function(e) {
			var t = this;
			return function(i) {
				var s = $(".date-select-tip", "#" + t.calendarContainerId);
				s.eq(0)[0] && (s.eq(0)[0].innerHTML = "");
				var o = i.currentTarget;
				$(o).hasClass("select-bar-item") ? ($(o).addClass("cur"), o = $("input", o).eq(0)[0]) : $(o).parents(".select-bar-item") && $(o).parents(".select-bar-item").addClass("cur"),
				o && o.id && o.id === this.prefix + "compare-date" && (o = $("#" + this.prefix + "compare-date-Select")[0]),
				i.stopPropagation(),
				t.msg = "",
				t.currentIndex = e;
				var a = n.formatDate,
				r = (n.parseDate, $("#" + t.calendarContainerId));
				t.dateCompare = 2 === e,
				t.diff = 2 === e ? t.dateDiff(t.startDate, t.endDate) : 0,
				r[0].style.display = "block",
				t.dateSelector.clickState = "from";
				var l, c;
				l = 2 === e ? t.otherStartDate || t.autoOtherStartDate: t.startDate,
				c = 2 === e ? t.otherEndDate || t.autoOtherEndDate: t.endDate,
				t.selected.from = l,
				t.selected.to = c,
				l ? (l = new Date(a(l, "yyyy/MM/dd")).getTime(), c = new Date(a(c, "yyyy/MM/dd")).getTime(), t.dateSelector.setSelected({
					from: l,
					to: c
				}), t.hasManualInputs && t.dateSelector.syncManualInputBoxes(l, c)) : (t.dateSelector.setSelected({}), t.hasManualInputs && t.dateSelector.syncManualInputBoxes());
				var d = this,
				u = 2 === e && 3 === t.calendarCount ? -150 : 0,
				h = d ? d.offsetHeight: 26;
				h = 26 > h ? 26 : h;
				var p = $(d).offset().left + u,
				f = $(d).offset().top + h;
				if (r[0].style.top = f + "px", r[0].style.left = p + r[0].offsetWidth < $(window).width() ? p + "px": 2 === e && 3 === t.calendarCount ? p + d.offsetWidth - r[0].offsetWidth + 150 + "px": p + d.offsetWidth - r[0].offsetWidth + "px", $(document).on("click", t.hideDateBoxFn), "msie" === $.browser.browser && "6.0" === $.browser.version) {
					var m = $("#" + t.maskIframeId)[0];
					m.style.display = "block";
					var g = r[0].offsetHeight,
					v = r[0].offsetWidth;
					m.style.height = g - 5 + "px",
					m.style.width = v + "px"
				}
			}
		},
		initInputDate: function() {
			var e = $("#" + this.prefix + "date-select"),
			t = n.formatDate,
			i = t(this.startDate, "yyyy/MM/dd"),
			s = t(this.endDate, "yyyy/MM/dd"),
			o = i === s ? s: i + " - " + s;
			if (e[0].value = o, this.otherStartDate && this.otherStartDate.constructor === Date) {
				var a = Math.abs(this.dateDiff(this.startDate, this.endDate)),
				r = Math.abs(this.dateDiff(this.otherStartDate, this.otherEndDate));
				r !== a && (this.otherEndDate = new Date(this.otherStartDate.getTime() + 3600 * a * 24 * 1e3));
				var l = t(this.otherStartDate, "yyyy/MM/dd"),
				c = t(this.otherEndDate, "yyyy/MM/dd"),
				d = $("#" + this.prefix + "compare-date-select");
				d[0] && (d[0].value = l === c ? c: l + " - " + c),
				this.showInput()
			} else this.hideInput();
			this.showDateTip()
		},
		initShortcutDate: function() {
			{
				var e = $("#" + this.dateSelectBar),
				t = e[0].getElementsByTagName("A"),
				n = t.length,
				i = this.endDate,
				s = this.startDate,
				o = this.todayDate;
				new Date( + $.holmes.config.systemConfig.now)
			}
			this.removeClass();
			var a = this.dateDiff,
			r = a(i, o),
			l = a(s, i),
			c = l,
			c = Number.MAX_VALUE; - 1 === r && 0 === l && (c = -1),
			0 === r && -1 !== l && (c = l);
			for (var d = 0,
			n = t.length; n > d; d++) {
				var u = t[d].href.indexOf("#");
				if ( - 1 !== u) {
					var h = parseInt(t[d].href.substr(u + 1), 10);
					if (h === c) {
						$(t[d]).addClass("cur");
						break
					}
				}
			}
		},
		showInput: function() {
			var e = $("#" + this.prefix + "compare-date")[0],
			t = $("#" + this.prefix + "compare-date-select")[0],
			n = $(t).parents(".select-bar-item");
			t && this.alwaysCompare ? 2 === this.currentIndex && this.currentSubmit && (e && (e.checked = !0), $(e).prev() && $(e).prev().hasClass("checkbox") && $(e).prev().addClass("checked"), n.length && n.addClass("cur"), $("#date-compare-title").text("对比"), $("#compare-date-container").removeClass("hide")) : (e && (e.checked = !0), $(e).prev() && $(e).prev().hasClass("checkbox") && $(e).prev().addClass("checked"), n.length && n.addClass("cur"), $("#date-compare-title").text("对比"), $("#compare-date-container").removeClass("hide")),
			this.currentIndex = null,
			this.currentSubmit = null
		},
		hideInput: function() {
			var e = $("#" + this.prefix + "compare-date"),
			t = $("#" + this.prefix + "compare-date-select");
			e.length && (e[0].checked = !1),
			e.prev() && e.prev().hasClass("checkbox") && e.prev().removeClass("checked"),
			t.length && (t[0].value = "与其他时间段对比"),
			$("#date-compare-title").text("对比时间段"),
			$("#compare-date-container").addClass("hide")
		},
		disableInput: function() {
			var e = $("#" + this.prefix + "compare-date"),
			t = $("#" + this.prefix + "compare-date-select");
			e.length && (e[0].checked = !1),
			e.prev() && e.prev().hasClass("checked") && e.prev().removeClass("checked"),
			t.length && (t[0].value = "与其他时间段对比"),
			$("#date-compare-title").text("对比时间段"),
			$("#compare-date-container").addClass("hide"),
			$(".select-bar-item").eq(1).hide()
		},
		enableInput: function() {
			$(".select-bar-item").eq(1).show()
		},
		createCalendar: function() {
			var e = $("#" + this.calendarContainerId)[0],
			t = e.getElementsByTagName("DIV"),
			s = $(".date-select-tip", e)[0],
			o = $(".btn-bar", e)[0],
			a = this.todayDate,
			r = this.firstDate,
			l = this.todayDate.getTime(),
			c = 864e5,
			d = n.formatDate,
			u = this;
			this.dateSelector = new i({
				calendarCount: this.calendarCount,
				singleSelection: this.singleSelection,
				autoFill: 0,
				onviewchange: function(e) {
					var t = new Date(l + 31 * c);
					return t.setDate(1),
					e.to - t > 0 ? !1 : void 0
				},
				dateStyle: function(e) {
					if (u.dateCompare) {
						var t = u.diff ? Math.abs(Math.floor(u.diff)) + 1 : 1;
						if ("to" === this.clickState && Math.abs(this.selected.from - e) < c * t) return "background:#daf4e1"
					}
					return e - a > 0 || 0 > e - r ? "color:#999;cursor:default;background:#fff": d(e, "yyyy/MM/dd") === d(a, "yyyy/MM/dd") ? "color:#1276ef;font-weight:600;font-family: Arial;": void 0
				},
				sideButtonClass: function(e) {
					var t = a;
					return "nextmonth" === e.type && e.to >= new Date(t.getFullYear(), t.getMonth(), 1) ? "ds-nextmonth-ed": void 0
				}
			}),
			this.dateSelector.viewDate = new Date(l - 1 * c),
			this.dateSelector.onselect = function(e, t) {
				if (t) return s.style.display = "block",
				s.innerHTML = t,
				!1;
				var n = e.from,
				i = e.to;
				if (0 > a - i) return s.style.display = "block",
				s.innerHTML = "您所选日期内暂无数据，请重新选择。",
				!1;
				if (i - a > 0 || 0 > n - r) return s.style.display = "block",
				s.innerHTML = "您所选日期内暂无数据，请重新选择。",
				!1;
				if (0 > i - r || 0 > n - r) return ! 1;
				var o = (i - n) / c;
				return o > 366 ? (s.style.display = "block", s.innerHTML = "非常抱歉，时间范围查询不能超出366天!", !1) : (s.innerHTML = "", u.selected = e, void u.onSelect())
			},
			$(t[0]).empty(),
			this.dateSelector.appendTo(t[0]),
			this.hasManualInputs && this.dateSelector.renderManualInputBoxes(o)
		},
		onSelect: function() {
			var e = n.formatDate,
			t = this.selected,
			i = this.dateCompare ? $("#" + this.prefix + "compare-date-select")[0] : $("#" + this.prefix + "date-select")[0],
			s = e(t.from, "yyyy/MM/dd"),
			o = e(t.to, "yyyy/MM/dd");
			i.value = s === o ? o: s + " - " + o,
			$("#" + this.prefix + "compare-date-select")[0] || $("#" + this.prefix + "date-select").addClass("mt"),
			this.hasManualInputs && this.dateSelector.syncManualInputBoxes(s, o)
		},
		createCalendarContainer: function() {
			var e = document.createElement("DIV");
			e.id = this.calendarContainerId,
			e.className = this.calendarContainerClass,
			e.innerHTML = n.format(this.options.tpl, {
				maskIframeId: this.maskIframeId,
				toolTipClass: this.toolTipClass,
				btnBarClass: this.btnBarClass,
				prefix: this.prefix
			}),
			document.body.appendChild(e)
		},
		selectHandle: function() {
			var e = this;
			return function(t) {
				t.preventDefault(),
				e.msg = "";
				var n = this.href.lastIndexOf("#") + 1,
				i = parseInt(this.href.substring(n), 10);
				if (0 !== i) {
					var s = -1 === s ? -1 : i;
					e.startDate = new Date(e.recentDate(s));
					var o = -1 === i ? i: 0;
					e.endDate = new Date(e.recentDate(o))
				} else {
					var a = e.todayDate;
					e.startDate = a,
					e.endDate = a
				}
				e.alwaysCompare || (e.otherStartDate = null, e.otherEndDate = null),
				e.initInputDate(),
				e.removeClass(),
				$(this).addClass("cur");
				var r = $("#" + e.prefix + "date-select");
				r.removeClass("mt"),
				e.showDateTip(),
				e.onchange()
			}
		},
		removeClass: function() {
			for (var e = $("#" + this.dateSelectBar)[0].getElementsByTagName("A"), t = 0, n = e.length; n > t; t++) $(e[t]).removeClass("cur")
		},
		dateDiff: function(e, t) {
			return e.setHours(0),
			e.setMinutes(0),
			e.setSeconds(0),
			e.setMilliseconds(0),
			t.setHours(0),
			t.setMinutes(0),
			t.setSeconds(0),
			t.setMilliseconds(0),
			parseInt((e - t) / 1e3 / 60 / 60 / 24, 10)
		},
		recentDate: function(e) {
			return this.todayDate.getTime() + 3600 * e * 24 * 1e3
		},
		showDateTip: function() {
			var e = $("#date")[0],
			t = n.formatDate,
			i = this.otherStartDate && this.otherStartDate.constructor === Date ? !0 : !1,
			s = t(this.startDate, "yyyy/MM/dd"),
			o = t(this.endDate, "yyyy/MM/dd"),
			a = s === o ? s: s + "~" + o;
			if (i) {
				var r = t(this.otherStartDate, "yyyy/MM/dd"),
				l = t(this.otherEndDate, "yyyy/MM/dd"),
				c = r === l ? r: r + "~" + l;
				e && (e.innerHTML = "(" + a + "与" + c + ")")
			} else e && (e.innerHTML = "(" + a + ")")
		},
		getDateString: function(e, t) {
			var i = n.formatDate,
			s = i(e, "yyyy/MM/dd"),
			o = i(t, "yyyy/MM/dd"),
			a = s === o ? o: s + "~" + o;
			return "时间范围 (" + a + ")"
		},
		setDate: function(e, t) {
			this.startDate = e,
			this.endDate = t,
			this.initInputDate(),
			this.onchange("submitDateSelect"),
			this.initShortcutDate()
		},
		setCompareDate: function(e, t) {
			this.showInput(),
			this.otherStartDate = new Date(e),
			this.otherEndDate = new Date(t),
			this.initInputDate()
		},
		setDateWithoutCallback: function(e, t) {
			this.startDate = e,
			this.endDate = t,
			this.initInputDate(),
			this.initShortcutDate()
		},
		setCompareDateWithoutCallback: function(e, t) {
			this.showInput(),
			this.otherStartDate = new Date(e),
			this.otherEndDate = new Date(t),
			this.initInputDate()
		},
		hideCompareDate: function() {
			this.hideInput(),
			this.otherStartDate = null,
			this.otherEndDate = null
		},
		disableCompareDate: function() {
			this.disableInput(),
			this.otherStartDate = null,
			this.otherEndDate = null
		},
		enableCompareDate: function() {
			this.enableInput()
		}
	})
}),
define("component/DateCompare", ["require", "exports", "module", "component/ClassBase", "base/util", "underscore"],
function(e) {
	{
		var t = e("component/ClassBase"),
		n = e("base/util");
		e("underscore")
	}
	return t.extend({
		options: {
			containerId: "check-option-container",
			onchange: function() {},
			isComparable: 0,
			checkedId: null,
			date: null
		},
		_checkedId: null,
		params: {},
		_init: function() {
			this._checkedId = this.options.checkedId;
			var e = $("#" + this.options.containerId);
			if (e.length) {
				var t = $("input", e);
				t.on("click", this._onchange())
			}
			var n = parseInt($.holmes.config.pageInfo.st, 10),
			i = parseInt($.holmes.config.pageInfo.et, 10),
			s = parseInt($.holmes.config.pageInfo.st2, 10),
			o = parseInt($.holmes.config.pageInfo.et2, 10),
			a = 864e5;
			this.params.st = this.params.et = n,
			a >= i - n ? $("#custom-date-select").length && s && o && a >= o - s ? (this.params.et2 = this.params.st2 = s, this.show(this.params.st, 1)) : this.show(this.params.st) : this.hide()
		},
		_onchange: function() {
			var e = this;
			return function() {
				e._syncStartDate();
				var t = this.id,
				n = e._checkedId;
				if (n) {
					var i = $("#" + n)[0];
					n !== t ? (i.checked = !1, e._checkedId = t) : e._checkedId = null
				} else e._checkedId = t;
				e._handleParams(),
				e.options.onchange(e.params, e.options.isComparable)
			}
		},
		checkComparation: function(e) {
			var t = $("#" + this.options.containerId);
			if (t.length) {
				switch (e) {
				case 0:
					this._checkedId = "last-day";
					break;
				case 1:
					this._checkedId = "last-week";
					break;
				default:
					this._checkedId = null
				}
				for (var n = $("input", t), i = 0, s = n.length; s > i; i++) n.eq(i)[0].checked = i === e
			}
		},
		hide: function() {
			var e = $("#" + this.options.containerId)[0];
			e && (e.style.display = "none", this.params.st2 = null, this.params.et2 = null, this.options.isComparable = 0)
		},
		show: function(e, t) {
			var i = $("#" + this.options.containerId)[0];
			if (i) {
				var s = n.formatDate(new Date(e), "yyyy-MM-dd");
				e = n.parseDate(s),
				this.options.date = e.getTime(),
				t ? this.params.st2 + 864e5 === this.params.st ? this.checkComparation(0) : this.params.st2 + 6048e5 === this.params.st ? this.checkComparation(1) : this.checkComparation() : this._handleParams(),
				i.style.display = "block"
			}
		},
		_handleParams: function() {
			var e = this.options.date,
			t = $("#last-day")[0],
			n = $("#last-week")[0];
			t && t.checked ? (this.params.et2 = this.params.st2 = e - 864e5, this.options.isComparable = 1) : n && n.checked ? (this.params.et2 = this.params.st2 = e - 6048e5, this.options.isComparable = 1) : (this.options.isComparable = 0, this.params.st2 = null, this.params.et2 = null)
		},
		_syncStartDate: function() {
			var e = $("a.cur", "#date-select-bar");
			if (e.length > 0) {
				var t = e[0],
				n = t.href.indexOf("#");
				if ( - 1 !== n) {
					var i = parseInt(t.href.substring(n + 1, t.href.length), 10); (0 === i || -1 === i) && (this.options.date = parseInt($.holmes.config.systemConfig.now, 10) + 3600 * i * 24 * 1e3)
				}
			} else {
				var s = $("input", "#custom-date-select")[0];
				s && "自定义时间段" !== s.value && (this.options.date = +new Date(s.value))
			}
		},
		setDate: function(e) {
			var t = n.formatData;
			this.params.st = new Date(t(new Date(e.st), "yyyy/MM/dd")).getTime(),
			this.params.et = new Date(t(new Date(e.et), "yyyy/MM/dd")).getTime(),
			this.params.st2 = e.st2 ? new Date(t(new Date(e.st2), "yyyy/MM/dd")).getTime() : null,
			this.params.et2 = e.et2 ? new Date(t(new Date(e.et2), "yyyy/MM/dd")).getTime() : null
		}
	})
}),
define("component/Table", ["require", "exports", "module", "component/UIBase", "base/util", "component/DropDownList", "underscore"],
function(e) {
	var t = e("component/UIBase"),
	n = e("base/util"),
	i = e("component/DropDownList"),
	s = e("underscore");
	return t.extend({
		_type: "table",
		options: {
			containerId: null,
			showNumber: !0,
			multilevel: !1,
			hasOperations: !1,
			order: null,
			transTarget: null,
			onchange: function(e) {},
			onexpand: function(e) {},
			onoperate: function(e) {},
			ontransListChange: function(e) {},
			loadingText: '<div class="loading">正在加载，请稍候……</div>',
			noDataText: '<div class="empty">暂无数据</div>',
			noOperateColText: "&nbsp",
			className: null,
			thTemplate: '<td class="#{className}" data="#{id}" id="#{id}" colspan="#{colspan}" rowspan="#{rowspan}"><div class="td-content">#{label}</div></td>',
			tdTemplate: '<td class="#{className}" data="#{data}" id="#{id}" colspan="#{colspan}"><div class="td-content" title="#{title}">#{label}</div></td>',
			theadTemplate: "<thead>#{0}</thead>",
			tdStyleFn: null,
			thTextFn: null,
			expandTdStyle: {
				hover: {
					"background-color": "#e8effb"
				}
			},
			operationTdTemplate: '<td colspan="#{colspan}" class="#{className}" id="#{id}"><div class="td-content" data="#{data}" title="#{title}" layer="#Operations">#{label}</div></td>',
			tbodyTemplate: "<tbody>#{0}</tbody>",
			tfootTemplate: "<tfoot>#{0}</tfoot>",
			trTemplate: '<tr class="#{1}" id="#{2}">#{0}</tr>',
			tableTemplate: '<table class="#{2}">#{0}#{1}#{3}</table>',
			tipTemplate: '<tbody><tr class="#{className}"><td colspan="#{colspan}">#{tip}</td></tr></tbody>'
		},
		_thead: null,
		_tbody: null,
		_tfoot: null,
		_group: 1,
		_sortField: null,
		_offset: null,
		_sortDir: null,
		_expandTrId: null,
		_continuous: !1,
		_colspanCount: null,
		_isGroup: null,
		transList: null,
		currentTransListId: null,
		_init: function() {
			this.syncSortBehavior.call(this, this.options.order)
		},
		_renderLoading: function() {
			return n.format(this.options.tableTemplate, this._renderThead(), this._renderTipBody(this.options.loadingText), this.options.className ? this.options.className: "table")
		},
		_renderTable: function() {
			var e;
			return e = this._isGroup && this.options.multilevel ? "table-layout-02": "table-layout-03",
			this.options.className = this.options.className ? this.options.className: "table " + e,
			null === this._tbody || 0 === this._tbody.length ? n.format(this.options.tableTemplate, this._renderThead(), this._renderTipBody(this.options.noDataText), this.options.className) : n.format(this.options.tableTemplate, this._renderThead(), this._renderTbody(), this.options.className, this._renderTfoot())
		},
		_renderThead: function() {
			var e, t = this,
			i = [],
			o = this._isGroup,
			a = function(e) {
				e.sortable && (e.className += " sortable"),
				e.id === t._sortField && (e.className += " " + t._sortDir)
			};
			if (this._thead && this._thead.length > 0) for (var r = 0; r < this._thead.length; r++) {
				var l = this._thead[r],
				c = [];
				0 === r && o ? (e = {
					rowIndex: null,
					expandable: !1,
					number: null,
					colspan: 1,
					rowspan: 2,
					isRenderHeader: !0
				},
				t._prefixTds(c, e)) : o || (e = {
					rowIndex: null,
					expandable: !1,
					number: null,
					colspan: 1,
					rowspan: 1,
					isRenderHeader: !0
				},
				t._prefixTds(c, e)),
				s.each(l,
				function(e, i) {
					s.each(e,
					function(e, s) {
						a(e),
						0 !== s || 0 === i && 0 === r || o && (e.className = e.className + " group"),
						o && 4 === +e.id && (e.className = e.className + " trans-group"),
						e.label = e.label || e.name,
						c.push(n.format(t.options.thTemplate, e)),
						0 === r && t.options.hasOperations && 0 === i && c.push(n.format(t.options.thTemplate, {
							className: "no-operate-col",
							label: t.options.noOperateColText,
							rowspan: o ? 2 : 1
						}))
					})
				}),
				t._suffixTds(c, !0),
				i.push(0 === r ? n.format(t.options.trTemplate, c.join(""), o ? "group-title": "group-item") : n.format(t.options.trTemplate, c.join(""), "group-item"))
			} else i.push(n.format(this.options.thTemplate, {
				label: "&nbsp;"
			}));
			return n.format(this.options.theadTemplate, i.join(""))
		},
		_renderTipBody: function(e) {
			return n.format(this.options.tipTemplate, {
				colspan: this._colspanCount,
				tip: e,
				className: "line"
			})
		},
		renderThText: function(e) {
			var t = this;
			s.isArray(e) || (e = [e]),
			s.isFunction(t.options.thTextFn) ? s.each(e,
			function(e) {
				t.options.thTextFn(e)
			}) : s.each(e,
			function(e) {
				var t = $("#" + e + " .td-content", "thead").html();
				$("#" + e + " .td-content", "thead").html('<span class="text">' + t + '</span><a href="javascript:void(0)" class="help" data=' + e + "></a>")
			})
		},
		_renderTbody: function() {
			for (var e, t = this,
			i = [], o = 0; o < this._tbody.length / this._group; o++) for (var a = 0; a < this._group; a++) {
				var r = this._tbody[o * this._group + a],
				l = r[0][0].expandable !== !1,
				c = r[0][0].hasOperation !== !1,
				d = [],
				u = "";
				0 === a ? (e = {
					rowIndex: o,
					expandable: l,
					number: o + 1 + this._offset
				},
				this._prefixTds(d, e)) : (e = {
					rowIndex: o,
					expandable: l,
					number: null
				},
				this._prefixTds(d, e)),
				s.each(r,
				function(e, i) {
					s.each(e,
					function(e, s) {
						0 === s && 0 !== i && t._isGroup && (e.className = e.className + " group"),
						e.className = e.className ? e.className + " " + e.id: e.id,
						e.id = "",
						e.title = e.title ? e.title: "",
						d.push(n.format(t.options.tdTemplate, e)),
						0 === i && t.options.hasOperations && d.push(t.options.hasOperations && c && 0 === a ? t.options.hasOperations.isSingleOperation ? n.format(t.options.operationTdTemplate, {
							className: "operate-col single-operate",
							label: "&nbsp;",
							data: o,
							title: "查看历史趋势"
						}) : n.format(t.options.operationTdTemplate, {
							className: "operate-col",
							label: "&nbsp;",
							data: o
						}) : n.format(t.options.tdTemplate, {
							className: "",
							label: "&nbsp;",
							data: o
						}))
					})
				}),
				this._suffixTds(d),
				+this._group === a + 1 ? (u = "line", a > 1 && (u += " line-last"), i.push(n.format(this.options.trTemplate, d.join(""), u, this._getRowId(o)))) : 0 === a && +this._group > 1 ? (u = "line-first", i.push(n.format(this.options.trTemplate, d.join(""), u))) : i.push(n.format(this.options.trTemplate, d.join("")))
			}
			return n.format(this.options.tbodyTemplate, i.join(""))
		},
		_prefixTds: function(e, t) {
			var i = t.rowIndex,
			s = t.expandable,
			o = t.number,
			a = t.colspan,
			r = t.rowspan,
			l = t.isRenderHeader,
			c = t.isIndent || void 0 === t.isIndent;
			this.options.multilevel && (e.push(n.format(l ? this.options.thTemplate: this.options.tdTemplate, {
				className: "empty-col",
				data: null !== i ? i: "",
				label: "&nbsp;",
				colspan: a,
				rowspan: r
			})), c && e.push(n.format(l ? this.options.thTemplate: this.options.tdTemplate, {
				id: null !== i ? "expand_" + this._getRowId(i) : "",
				className: s && null !== o ? "expand-col": "no-expand-col",
				data: null !== i ? i: "",
				label: "&nbsp;",
				colspan: a,
				rowspan: r
			}))),
			this.options.showNumber && c && e.push(n.format(l ? this.options.thTemplate: this.options.tdTemplate, {
				className: "number-col",
				label: o || "&nbsp;",
				title: o || "&nbsp;",
				colspan: a,
				rowspan: r
			}))
		},
		_suffixTds: function(e, t) {
			this.options.multilevel && e.push(n.format(t ? this.options.thTemplate: this.options.tdTemplate, {
				className: "empty-col last",
				label: "&nbsp;"
			}))
		},
		_renderTfoot: function() {
			for (var e, t = [], i = this, o = 0; o < this._tfoot.length; o = ++o * this._group) for (var a = 0; a < this._group; a++) {
				var r = this._tfoot[o + a],
				l = [];
				e = {
					rowIndex: -1,
					expandable: !1,
					number: "&nbsp;"
				},
				this._prefixTds(l, e),
				s.each(r,
				function(e, t) {
					s.each(e,
					function(e, s) {
						0 !== t && 0 === s && i._isGroup && (e.className = e.className + " group"),
						0 === t && i.options.hasOperations && (e.colspan = 2),
						e.className = e.className + " " + e.id,
						e.id = "",
						l.push(n.format(i.options.tdTemplate, e))
					})
				}),
				this._suffixTds(l),
				t.push(n.format(this.options.trTemplate, l.join("")))
			}
			return n.format(this.options.tfootTemplate, t.join(""))
		},
		_sort: function(e) {
			var t = $(e.target);
			t = t.parents("td");
			var n = "desc",
			i = t.attr("data");
			i === this._sortField && "desc" === this._sortDir && (n = "asc"),
			this._sortField = i,
			this._sortDir = n,
			this.loading(),
			this.options.onchange(i + "," + n)
		},
		_expand: function(e) {
			var t = $(e.currentTarget);
			t.toggleClass("open");
			var n = parseInt(t.attr("data"), 10),
			i = this._getRowId(n);
			if (t.hasClass("open")) if ($("#" + i).addClass("expand-tr"), t.hasClass("loaded")) $("tr." + i).each(function(e, t) {
				$(t).show()
			});
			else {
				t.addClass("mini-loading");
				var s = this._colspanCount;
				this.options.showNumber && s--,
				this.options.multilevel && (s -= 3),
				this.options.hasOperations && s--,
				this.options.onexpand({
					target: t[0],
					expandTrId: i,
					rowIndex: n,
					colspanCount: s,
					data: $.extend(!0, {},
					this._tbody[n * this._group][0][0].data)
				})
			} else $("#" + i).removeClass("expand-empty-col").removeClass("expand-tr"),
			$("tr." + i).each(function(e, t) {
				$(t).hide()
			})
		},
		_operate: function(e) {
			var t = e.target,
			n = parseInt($(t).attr("data"), 10);
			this.options.onoperate({
				target: t,
				rowIndex: n,
				data: $.extend(!0, {},
				this._tbody[n * this._group][0][0].data)
			})
		},
		getCellsCount: function() {
			var e = 0;
			return this.options.multilevel && (e += 3),
			this.options.showNumber && e++,
			this.options.hasOperations && e++,
			s.each(this._groupName,
			function(t) {
				e += t[0].colspan ? t[0].colspan: 1
			}),
			this._colspanCount = e,
			e
		},
		_bindEvent: function() {
			var e = this,
			t = $("#" + this.options.containerId);
			$("thead .sortable .td-content", t).on("click", $.proxy(this._sort, this)),
			$("tbody .expand-col", t).on("click", $.proxy(this._expand, this)),
			$("tbody .operate-col .td-content", t).on("click", $.proxy(this._operate, this)),
			this.options.hasOperations.isSingleOperation !== !0 && $("tbody .operate-col .td-content", t).on("mouseover", $.proxy(this._operate, this)),
			$("tbody", t).on("mouseover", ".sub-line",
			function(t) {
				var n = t.currentTarget;
				$("td", n).each(function(t, n) {
					$(n).hasClass("empty-col") || ($(n).data("background-color") || $(n).data("background-color", $(n).css("background-color")), e.options.expandTdStyle && e.options.expandTdStyle.hover && $(n).css(e.options.expandTdStyle.hover))
				})
			}),
			$("tbody", t).on("mouseout", ".sub-line",
			function(e) {
				var t = e.currentTarget;
				$("td", t).each(function(e, t) {
					$(t).hasClass("empty-col") || $(t).css("background-color", $(t).data("background-color"))
				})
			}),
			$("window").on("resize",
			function() {
				e.setTransListPosition()
			})
		},
		render: function(e) {
			var t = $("#" + this.options.containerId);
			t.length && (this._thead = e.thead, this._tbody = e.tbody, this._tfoot = e.tfoot, this._group = e.group, this._groupName = e.groupName, this._offset = e.offset || 0, this._isGroup = e.thead && e.thead.length > 1, this._expandTrId = null, this.getCellsCount(), t.html(this._renderTable()), this.renderTransList(), this._bindEvent())
		},
		_renderSubBody: function(e, t, i) {
			for (var o, a = this,
			r = [], l = e.length, c = !1, d = 0; l > d; d++) {
				var u = e[d],
				h = [],
				p = "";
				o = {
					rowIndex: null,
					isIndent: i
				},
				this.options.showSubNumber && (o.number = d),
				this._prefixTds(h, o);
				var f = u[0][0].hasOperation !== !1;
				s.each(u,
				function(e, t) {
					s.each(e,
					function(e, o) {
						if (0 === o && 0 !== t && a._isGroup && (e.className = e.className + " group"), 0 === d && 0 === t && 0 === o) {
							var r = e.className && e.className.split(" ") || [];
							s.contains(r, "title") && (c = !0),
							e.className = (e.className || "") + " sub-title",
							e.label = '<span class="icon"></span>' + e.label,
							i || (e.className = e.className + " no-indent")
						}
						i || (a.options.multilevel && (e.colspan = e.colspan ? ++e.colspan: 2), a.options.showNumber && (e.colspan = e.colspan ? ++e.colspan: 2)),
						e.className = e.className + " " + e.id,
						e.id = "",
						0 === t && a.options.hasOperations ? a.options.hasOperations && f && 0 === o ? (h.push(n.format(a.options.tdTemplate, e)), h.push(a.options.hasOperations.isSingleOperation ? n.format(a.options.operationTdTemplate, {
							className: "operate-col single-operate",
							label: "&nbsp;",
							data: d,
							title: "查看历史趋势"
						}) : n.format(a.options.operationTdTemplate, {
							className: "operate-col",
							label: "&nbsp;",
							data: d
						}))) : a.options.hasOperations && !f && 0 === o && 0 === d ? (e.colspan = e.colspan ? ++e.colspan: 2, h.push(n.format(a.options.tdTemplate, e))) : (h.push(n.format(a.options.tdTemplate, e)), h.push(n.format(a.options.tdTemplate, {
							className: "",
							label: "&nbsp;",
							data: d
						}))) : h.push(n.format(a.options.tdTemplate, e))
					})
				}),
				this._suffixTds(h),
				0 === d && (p = c ? " tr-title sub-line-first": " sub-line-first"),
				d === l - 1 && (p += " sub-line-last"),
				r.push(n.format(this.options.trTemplate, h.join(""), "sub-line " + t + p))
			}
			return r.join("")
		},
		getId: function(e) {
			return this.options.containerId + "-" + e
		},
		_getRowId: function(e) {
			return this.getId("tr_" + e)
		},
		beforeRenderSub: function(e) {
			var t = e.expandTrId,
			n = $("#expand_" + t);
			n.hasClass("loaded") || (n.addClass("loaded"), n.removeClass("mini-loading"), $("#" + this.options.containerId + " ." + t).each(function(e) {
				$(e).empty()
			}))
		},
		renderSub: function(e, t, n) {
			var i = t.expandTrId;
			n = void 0 === n ? !0 : n,
			this.beforeRenderSub(t),
			$("#" + i).after(this._renderSubBody(e, i, n));
			var s = this;
			$("." + i + " .operate-col .td-content", "#" + this.options.containerId).on("click",
			function() {
				var t = parseInt($(this).attr("data"), 10);
				s.options.onoperate({
					target: this,
					rowIndex: t,
					data: $.extend(!0, {},
					e[t][0][0].data)
				})
			}),
			this.options.hasOperations.isSingleOperation !== !0 && $("." + i + " .operate-col .td-content", "#" + this.options.containerId).on("mouseover",
			function() {
				var t = parseInt($(this).attr("data"), 10);
				s.options.onoperate({
					target: this,
					rowIndex: t,
					data: $.extend(!0, {},
					e[t][0][0].data)
				})
			})
		},
		setTransListPosition: function() {
			var e, t = $(".trans-group"),
			n = this;
			t.length && setTimeout(function() {
				e = n.options.multilevel ? 200 : 215,
				t.css(t.width() < e ? {
					width: e + "px"
				}: {
					width: "auto"
				})
			},
			0)
		},
		renderTransList: function() {
			var e = $("#trans-select-container");
			if (e.length) {
				var t = this.currentTransListId || this.options.transTarget;
				t || (t = null),
				this.currentTransListId = t;
				var n = !1;
				this.transList && (n = this.transList.reinit(t)),
				n || (this.transList = new i({
					containerId: "trans-select-container",
					shortcuts: !1,
					items: $.holmes.config.targetList,
					selectedItems: t,
					autoRender: !0,
					onchange: $.proxy(function(e) {
						this.currentTransListId !== e && (this.currentTransListId = e, this.options.ontransListChange(e))
					},
					this)
				})),
				this.setTransListPosition()
			}
		},
		loading: function() {
			var e = $("#" + this.options.containerId);
			if (!this._continuous) {
				var t = $("#trans-select-container");
				this.transList && t.length && t.children().length && this.transList.detachList(),
				e.empty(),
				e.append(this._renderLoading())
			}
		},
		syncSortBehavior: function(e) {
			if (e) {
				var t = e.split(",");
				this._sortField = $.trim(t[0]),
				this._sortDir = $.trim(t[1])
			}
		},
		changeTransListHeader: function(e) {
			this.transList && this.transList.changeHeader(e)
		}
	})
}),
define("component/SiteSummary", ["require", "exports", "module", "component/UIBase", "base/util", "underscore"],
function(e) {
	var t = e("component/UIBase"),
	n = e("base/util"),
	i = e("underscore");
	return t.extend({
		_type: "siteSummary",
		options: {
			containerId: null,
			showNumber: !1,
			multilevel: !0,
			hasOperations: !0,
			order: null,
			onchange: function(e) {},
			onexpand: function(e) {},
			onoperate: function(e) {},
			onfavFilter: function(e) {},
			ontransListChange: function(e) {},
			loadingText: '<div class="loading">正在加载，请稍候……</div>',
			noDataText: '<div class="empty">暂无数据</div>',
			className: "table site-summary-layout-02",
			thTemplate: '<td class="#{className}" data="#{id}" id="#{id}" colspan="#{colspan}" rowspan="#{rowspan}"><div class="td-content">#{label}</div></td>',
			tdTemplate: '<td class="#{className}" data="#{data}" id="#{id}" colspan="#{colspan}"><div class="td-content">#{label}</div></td>',
			theadTemplate: "<thead>#{0}</thead>",
			tdStyleFn: null,
			thTextFn: null,
			expandTdStyle: {
				hover: {
					"background-color": "#e8effb"
				}
			},
			operationTdTemplate: '<td colspan="#{colspan}" class="#{className}" id="#{id}"><div class="td-content" data="#{data}" title="#{title}" layer="#Operations">#{label}</div></td>',
			tbodyTemplate: "<tbody>#{0}</tbody>",
			tfootTemplate: "<tfoot>#{0}</tfoot>",
			trTemplate: '<tr class="#{1}" id="#{2}">#{0}</tr>',
			tableTemplate: '<table class="#{2}">#{0}#{1}#{3}</table>',
			tipTemplate: '<tbody><tr class="#{className}"><td colspan="#{colspan}">#{tip}</td></tr></tbody>',
			valuesTemplate: '<div title="#{0}">#{0}</div><div title="#{1}">#{1}</div><div title="#{2}">#{2}</div>'
		},
		_thead: null,
		_tbody: null,
		_tfoot: null,
		_sortField: null,
		_offset: null,
		_sortDir: null,
		_expandTrId: null,
		_continuous: !1,
		_colspanCount: null,
		_isGroup: null,
		transList: null,
		_init: function() {
			this.syncSortBehavior.call(this, this.options.order)
		},
		_renderLoading: function() {
			return n.format(this.options.tableTemplate, this._renderEmptyHeader(), this._renderTipBody(this.options.loadingText), this.options.className ? this.options.className: "site-summary")
		},
		_renderTable: function() {
			return 0 === this.items.length ? n.format(this.options.tableTemplate, this._renderThead(), this._renderTipBody(this.options.noDataText), this.options.className) : n.format(this.options.tableTemplate, this._renderThead(), this._renderTbody(), this.options.className)
		},
		_renderThead: function() {
			var e, t = this,
			s = [];
			if (this.indicators && this.indicators.length > 0) {
				var o = [];
				e = {
					rowIndex: null,
					expandable: !1,
					number: null,
					colspan: 1,
					rowspan: 1,
					isRenderHeader: !0
				},
				t._prefixTds(o, e),
				o.push(n.format(t.options.thTemplate, {
					label: "网站名称"
				})),
				o.push(n.format(t.options.thTemplate, {
					className: "no-operate-col",
					label: "&nbsp;",
					rowspan: 1
				})),
				o.push(n.format(t.options.thTemplate, {
					label: "&nbsp;",
					className: "days"
				})),
				i.each(this.indicators,
				function(e) {
					var i = {
						label: e.label,
						id: e.id,
						className: "number sortable"
					};
					e.id === t._sortField && (i.className += " " + t._sortDir),
					o.push(n.format(t.options.thTemplate, i))
				}),
				o.push(n.format(t.options.thTemplate, {
					className: "site-overview-cell",
					label: "操作&emsp;&emsp;",
					id: "site-overview"
				})),
				t._suffixTds(o, !0),
				s.push(n.format(t.options.trTemplate, o.join(""), "group-item"))
			} else s.push(n.format(t.options.thTemplate, {
				label: "&nbsp;"
			}));
			return n.format(t.options.theadTemplate, s.join(""))
		},
		_renderEmptyHeader: function() {
			var e = this,
			t = [];
			return t.push(n.format(e.options.thTemplate, {
				colspan: 12,
				label: "&nbsp;"
			})),
			n.format(e.options.theadTemplate, t.join(""))
		},
		_renderTipBody: function(e) {
			return n.format(this.options.tipTemplate, {
				colspan: 12,
				tip: e,
				className: "line"
			})
		},
		_renderTbody: function() {
			for (var e, t = this,
			i = [], s = 0; s < this.items.length; s++) {
				var o = this.items[s],
				a = !!o.hasSubDirData,
				r = [];
				e = {
					rowIndex: o.id,
					expandable: a
				},
				this._prefixTds(r, e);
				var l = $.holmes.config.systemConfig.webRoot + "/" + $.holmes.config.pageInfo.targetUserId + "/overview/index?siteId=" + o.id,
				c = '<a target="_blank" href="' + l + '">' + o.domain + "</a>";
				r.push(n.format(t.options.tdTemplate, {
					label: c + "<span>" + n.encodeHTML(o.name) + "</span>",
					className: "table-index"
				})),
				r.push(n.format(this.options.operationTdTemplate, {
					className: "operate-col single-operate" + (o.isFavorite ? " is-favorite": ""),
					label: "&nbsp;",
					data: o.id,
					title: "收藏站点"
				}));
				for (var d = 0; d < o.items[0].length; d++) {
					var u = this.indicators[d - 1],
					h = u && u.type,
					p = o.items[2][d].val ? o.items[2][d].val: o.items[2][d],
					f = [n.formatData(o.items[0][d], h), n.formatData(o.items[1][d], h), n.formatData(p, h)],
					m = {
						"-1": " arrow-down",
						0 : "",
						1 : " arrow-up"
					} [o.items[2][d].flag] || "";
					r.push(n.format(t.options.tdTemplate, {
						label: n.format(this.options.valuesTemplate, f[0], f[1], f[2]),
						className: "value summary-ellipsis" + (0 === d ? " seperator days": "") + m
					}))
				}
				r.push(n.format(this.options.tdTemplate, {
					label: '<a class="site-overview" href="' + l + '">查看报告</a>',
					className: "seperator site-overview-cell"
				})),
				this._suffixTds(r),
				i.push(n.format(this.options.trTemplate, r.join(""), "line", this._getRowId(o.id)))
			}
			return n.format(this.options.tbodyTemplate, i.join(""))
		},
		_prefixTds: function(e, t) {
			var i = t.rowIndex,
			s = t.expandable,
			o = t.number,
			a = t.colspan,
			r = t.rowspan,
			l = t.isRenderHeader,
			c = t.isIndent || void 0 === t.isIndent;
			this.options.multilevel && (e.push(n.format(l ? this.options.thTemplate: this.options.tdTemplate, {
				className: "empty-col",
				data: null !== i ? i: "",
				label: "&nbsp;",
				colspan: a,
				rowspan: r
			})), c && e.push(n.format(l ? this.options.thTemplate: this.options.tdTemplate, {
				id: null !== i ? "expand_" + this._getRowId(i) : "",
				className: s && null !== o ? "expand-col": "no-expand-col",
				data: null !== i ? i: "",
				label: "&nbsp;",
				colspan: a,
				rowspan: r
			}))),
			this.options.showNumber && c && e.push(n.format(l ? this.options.thTemplate: this.options.tdTemplate, {
				className: "number-col",
				label: o || "&nbsp;",
				colspan: a,
				rowspan: r
			}))
		},
		_suffixTds: function(e, t) {
			this.options.multilevel && e.push(n.format(t ? this.options.thTemplate: this.options.tdTemplate, {
				className: "empty-col last",
				label: "&nbsp;"
			}))
		},
		_sort: function(e) {
			var t = $(e.target);
			t = t.parents("td");
			var n = "desc",
			i = t.attr("data");
			i === this._sortField && "desc" === this._sortDir && (n = "asc"),
			this._sortField = i,
			this._sortDir = n,
			this.loading(),
			this.options.onchange(i + "," + n)
		},
		_expand: function(e) {
			var t = $(e.currentTarget);
			t.toggleClass("open");
			var n = parseInt(t.attr("data"), 10),
			i = this._getRowId(n);
			if (t.hasClass("open")) if ($("#" + i).addClass("expand-tr"), t.hasClass("loaded")) $("tr." + i).each(function(e, t) {
				$(t).show()
			});
			else {
				t.addClass("mini-loading");
				var s = this._colspanCount;
				this.options.showNumber && s--,
				this.options.multilevel && (s -= 3),
				this.options.hasOperations && s--,
				this.options.onexpand({
					target: t[0],
					expandTrId: i,
					rowIndex: n,
					colspanCount: s,
					data: $.extend(!0, {},
					{})
				})
			} else $("#" + i).removeClass("expand-empty-col").removeClass("expand-tr"),
			$("tr." + i).each(function(e, t) {
				$(t).hide()
			}),
			$("#" + i + "_cloned").hide()
		},
		_operate: function(e) {
			var t = e.target,
			n = $(t).parent();
			this.options.onoperate({
				target: t,
				siteId: $(t).attr("data"),
				isFavorite: n.hasClass("is-favorite")
			})
		},
		_bindEvent: function() {
			var e = this,
			t = $("#" + this.options.containerId);
			$("thead .sortable .td-content", t).on("click", $.proxy(this._sort, this)),
			$("tbody .expand-col", t).on("click", $.proxy(this._expand, this)),
			$("tbody .operate-col .td-content", t).on("click", $.proxy(this._operate, this)),
			$("tbody", t).on("mouseover", ".sub-line",
			function(t) {
				var n = t.currentTarget;
				$("td", n).each(function(t, n) {
					$(n).hasClass("empty-col") || ($(n).data("background-color") || $(n).data("background-color", $(n).css("background-color")), e.options.expandTdStyle && e.options.expandTdStyle.hover && $(n).css(e.options.expandTdStyle.hover))
				})
			}),
			$("tbody", t).on("mouseout", ".sub-line",
			function(e) {
				var t = e.currentTarget;
				$("td", t).each(function(e, t) {
					$(t).hasClass("empty-col") || $(t).css("background-color", $(t).data("background-color"))
				})
			})
		},
		init: function(e) {
			$.extend(!0, this.options, $.extend(!0, {},
			this.options), e),
			this.syncSortBehavior.call(this, this.options.order)
		},
		render: function(e, t) {
			var n = $("#" + this.options.containerId);
			n.length && (this.items = e, this.indicators = t, n.html(this._renderTable()), this._bindEvent())
		},
		_renderSubBody: function(e, t, i) {
			for (var s, o = this,
			a = [], r = e.length, l = 0; r > l; l++) {
				var c = e[l],
				d = [],
				u = "";
				s = {
					rowIndex: null,
					isIndent: i
				},
				this._prefixTds(d, s);
				var h = $.holmes.config.systemConfig.webRoot + "/" + $.holmes.config.pageInfo.targetUserId + "/overview/index?siteId=" + c.id,
				p = (0 === l ? '<span class="icon"></span>': "") + '<a href="' + h + '">' + n.encodeHTML(c.name) + "</a>";
				d.push(n.format(o.options.tdTemplate, {
					label: p,
					className: "table-index"
				})),
				d.push(n.format(this.options.operationTdTemplate, {
					className: "",
					label: ""
				}));
				for (var f = 0; f < c.items[0].length; f++) {
					var m = this.indicators[f - 1],
					g = m && m.type,
					v = c.items[2][f].val ? c.items[2][f].val: c.items[2][f],
					b = [n.formatData(c.items[0][f], g), n.formatData(c.items[1][f], g), n.formatData(v, g)],
					y = {
						"-1": " arrow-down",
						0 : "",
						1 : " arrow-up"
					} [c.items[2][f].flag] || "";
					d.push(n.format(o.options.tdTemplate, {
						label: n.format(this.options.valuesTemplate, b[0], b[1], b[2]),
						className: "value summary-ellipsis" + y + (0 === f ? " days": "")
					}))
				}
				d.push(n.format(this.options.tdTemplate, {
					label: '<a class="site-overview site-overview-sub" href="' + h + '">查看报告</a>',
					className: ""
				})),
				this._suffixTds(d),
				0 === l && (u = " sub-line-first"),
				l === r - 1 && (u = " sub-line-last"),
				a.push(n.format(this.options.trTemplate, d.join(""), "sub-line " + t + u))
			}
			return a.join("")
		},
		getId: function(e) {
			return this.options.containerId + "-" + e
		},
		_getRowId: function(e) {
			return this.getId("tr_" + e)
		},
		beforeRenderSub: function(e) {
			var t = e.expandTrId,
			n = $("#expand_" + t);
			n.hasClass("loaded") || (n.addClass("loaded"), n.removeClass("mini-loading"), $("#" + this.options.containerId + " ." + t).each(function(e) {
				$(e).empty()
			}))
		},
		renderSub: function(e, t, n) {
			var i = t.expandTrId;
			n = void 0 === n ? !0 : n,
			this.beforeRenderSub(t),
			$("#" + i).after(this._renderSubBody(e, i, n))
		},
		loading: function() {
			var e = $("#" + this.options.containerId);
			this._continuous || (e.empty(), e.append(this._renderLoading()))
		},
		syncSortBehavior: function(e) {
			if (e) {
				var t = e.split(",");
				this._sortField = $.trim(t[0]),
				this._sortDir = $.trim(t[1])
			}
		}
	})
}),
define("component/FuzzyQuery", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "fuzzyQuery",
		options: {
			containerId: "query-container",
			submitId: "query-by-word",
			cancelId: "cancel-query-by-word",
			inputs: {
				"search-word": null
			},
			onchange: function(e) {}
		},
		_init: function() {
			this._container = $("#" + this.options.containerId)
		},
		_bindEvents: function() {
			var e = this,
			t = e.options.inputs,
			n = $("#" + this.options.submitId, this._container),
			i = $("#" + this.options.cancelId, this._container);
			n.on("click",
			function(n) {
				n.preventDefault();
				var s = !0;
				for (var o in t) if (t.hasOwnProperty(o)) {
					var a = ($("#" + o), $.trim($("#" + o).val()));
					"" === a ? e.options.inputs[o] = null: (e.options.inputs[o] = a, s = !1)
				}
				s ? i.hide() : i.show(),
				e.options.onchange(t)
			}),
			i.on("click",
			function() {
				$(this).hide();
				for (var n in t) t.hasOwnProperty(n) && ($("#" + n).val(""), e.options.inputs[n] = null);
				e.options.onchange(t)
			})
		},
		render: function() {
			var e = '<a id="#{0}" style="display: none;" href="javascript:void(0);">返回</a>';
			$("#" + this.options.submitId, this._container).after(n.format(e, this.options.cancelId)),
			this._bindEvents()
		},
		hideCancelButton: function() {
			var e = $("#" + this.options.cancelId, this._container),
			t = this.options.inputs;
			for (var n in t) if (t.hasOwnProperty(n)) {
				var i = $("#" + n, this._container);
				i.val("")
			}
			e.hide()
		}
	})
}),
define("component/Layer", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("../base/util");
	return t.extend({
		_type: "layer",
		options: {
			containerId: null,
			handlerSelector: null,
			type: "mouseover",
			autoClose: !0,
			relatedOther: !1,
			relatedPosition: "br",
			closeButton: !1,
			mouseoverTime: 500,
			mouseoutTime: 500,
			className: "",
			offset: {
				left: 0,
				top: 0
			},
			onchange: function(e) {},
			containerTemplate: ['<div id="#{0}" class="layer shared-layer #{2}" style="display:none;position:absolute;">#{1}', '<div id="#{0}Content" class="layer-content"></div></div>'].join(""),
			closeTemplate: '<div class="layer-close">&nbsp;</div>'
		},
		_containerId: null,
		_handlerSelector: null,
		_init: function() {
			this._containerId = this.options.containerId,
			this._handlerSelector = this.options.handlerSelector
		},
		_show: function(e) {
			this.options.onchange(e),
			$("#" + this._containerId).show(),
			$.holmes.setRelatedPosition(this._containerId, e, this.options.relatedPosition, this.options.offset)
		},
		_bindClick: function() {
			var e = this;
			$(e._handlerSelector).on("click",
			function() {
				e.options.onchange(this),
				e.options.relatedOther || $.holmes.setRelatedPosition(e._containerId, this, e.options.relatedPosition, e.options.offset)
			})
		},
		_bindMouseOver: function() {
			var e = null,
			t = this;
			0 === $("#" + t._containerId).length && (t._render(), $("#" + t._containerId).on("mouseover",
			function() {
				clearTimeout(e)
			}), this.options.autoClose && $("#" + t._containerId).on("mouseout",
			function() {
				e = setTimeout(function() {
					t.close()
				},
				t.options.mouseoutTime)
			})),
			$(t._handlerSelector).on("mouseover",
			function() {
				var n = this;
				clearTimeout(e),
				t.options.mouseoverTime > 0 ? e = setTimeout(function() {
					t._show(n)
				},
				t.options.mouseoverTime) : t._show(n)
			}),
			this.options.autoClose && $(t._handlerSelector).on("mouseout",
			function() {
				clearTimeout(e),
				e = setTimeout(function() {
					t.close()
				},
				t.options.mouseoutTime)
			})
		},
		_bindEvent: function() {
			var e = this.options.type,
			t = this;
			"click" === e ? (0 === $("#" + t._containerId).length && t._render(), this._bindClick()) : "mouseover" === e ? this._bindMouseOver() : ("mouseover&click" === e || "click&mouseover" === e) && (this._bindMouseOver(), this._bindClick()),
			this.options.closeButton && $("#" + this._containerId).find(".layer-close").on("click",
			function() {
				t.close()
			})
		},
		_render: function() {
			$(document.body).append(n.format(this.options.containerTemplate, this._containerId, this.options.closeButton ? this.options.closeTemplate: "", this.options.className))
		},
		render: function() {
			this._bindEvent()
		},
		content: function(e, t) {
			$("#" + this._containerId + "Content").html(e),
			t && $.holmes.setRelatedPosition(this._containerId, t, this.options.relatedPosition, this.options.offset)
		},
		setPosition: function(e) {
			$.holmes.setRelatedPosition(this._containerId, e, this.options.relatedPosition, this.options.offset)
		},
		close: function() {
			$("#" + this._containerId).hide()
		}
	})
}),
define("component/Tabs", ["require", "exports", "module", "component/UIBase"],
function(e) {
	var t = e("component/UIBase");
	return t.extend({
		_type: "tabs",
		options: {
			containerId: null,
			tabsSelector: " .tabs>ul>li:not(.separator)",
			toggleSelector: " .tabs>.toggle",
			contentsSelector: ">.tab-contents>ul>li",
			contentContainerSelector: ">.tab-contents",
			tabContainerSelector: " .tabs>ul",
			eventType: "click",
			selectedClass: "selected",
			selectedIndex: null,
			onchange: function(e, t) {}
		},
		_currentIndex: null,
		_tabs: null,
		_toggle: null,
		_contents: null,
		_tabContainer: null,
		_contentContainer: null,
		_init: function() {
			var e = $("#" + this.options.containerId),
			t = this;
			if (e.length) {
				this._tabs = $("#" + this.options.containerId + this.options.tabsSelector),
				this._contents = $("#" + this.options.containerId + this.options.contentsSelector);
				var n = $("#" + this.options.containerId + this.options.toggleSelector);
				n.length && (this._toggle = n.first());
				var i = $("#" + this.options.containerId + this.options.contentContainerSelector);
				i.length && (this._contentContainer = i.first());
				var s = $("#" + this.options.containerId + this.options.tabContainerSelector);
				s.length && (this._tabContainer = s.first()),
				this._tabs.each(function(e) {
					$(this).on(t.options.eventType,
					function(n) {
						n.preventDefault(),
						t._change(e, this)
					})
				}),
				this._toggle && this._toggle.on("click", $.proxy(this._toggleFn, this)),
				null !== this.options.selectedIndex && (this._change(this.options.selectedIndex, this._tabs[this.options.selectedIndex], !1), this._currentIndex = this.options.selectedIndex)
			}
		},
		_toggleFn: function() {
			this._toggle.hasClass("open") ? this.close() : this.open(),
			this.options.onchange(this._currentIndex, this._tabs[this._currentIndex], !0)
		},
		open: function() {
			if (this._contentContainer && this._toggle && (this._toggle.removeClass("close"), this._toggle.html("收起"), this._toggle.addClass("open"), this._contentContainer.show()), null === this._currentIndex && (this._currentIndex = 0), "none" === this._tabs[this._currentIndex].style.display) for (var e = 0,
			t = this._tabs.length; t > e; e++) if (e !== this._currentIndex && "none" !== this._tabs[e].display) {
				this._currentIndex = e;
				break
			}
			this._select(this._currentIndex)
		},
		close: function() {
			this._contentContainer && this._toggle && (this._toggle.removeClass("open"), this._toggle.html("展开"), this._toggle.addClass("close"), this._contentContainer.hide()),
			this._tabContainer.removeClass(this.options.selectedClass),
			this._unselect(this._currentIndex)
		},
		_select: function(e) {
			var t = $(this._tabs[e]);
			this._tabContainer.addClass(this.options.selectedClass),
			t.addClass(this.options.selectedClass);
			var n = t.next();
			n.hasClass("separator") && n.hide();
			var i = t.prev();
			i.hasClass("separator") && i.hide(),
			this._contents.length && $(this._contents[e]).show()
		},
		_unselect: function(e) {
			if (null !== e) {
				var t = $(this._tabs[e]);
				t.removeClass(this.options.selectedClass);
				var n = t.next();
				n.hasClass("separator") && n.show();
				var i = t.prev();
				i.hasClass("separator") && i.show(),
				this._contents.length && $(this._contents[this._currentIndex]).hide()
			}
		},
		select: function(e) {
			this._unselect(this._currentIndex),
			this._currentIndex = e,
			this.open(),
			this.options.onchange(e, this._tabs[e], !1)
		},
		reset: function() {
			$(this._currentIndex).removeClass(this.options.selectedClass),
			this._currentIndex = null
		},
		show: function(e) {
			var t = $(this._tabs[e]);
			if (t.show(), 0 === e) {
				var n = t.next();
				n.hasClass("separator") && n.removeClass("invisible-separator")
			} else {
				var i = t.prev();
				i.hasClass("separator") && i.removeClass("invisible-separator")
			}
		},
		getCurrentContent: function() {
			return this._contents[this._currentIndex]
		},
		hide: function(e) {
			var t = $(this._tabs[e]);
			if (t.hide(), 0 === e) {
				var n = t.next();
				n.hasClass("separator") && n.addClass("invisible-separator")
			} else {
				var i = t.prev();
				i.hasClass("separator") && i.addClass("invisible-separator")
			} (e === this._currentIndex || null === this._currentIndex) && this.close()
		},
		_change: function(e, t, n) {
			return n !== !1 && (n = !0),
			e === this._currentIndex ? (this._toggle && this._toggleFn(), !1) : (this._unselect(this._currentIndex), this._currentIndex = e, this.open(), void this.options.onchange(e, t, n))
		}
	})
}),
define("component/Operations", ["require", "exports", "module", "component/UIBase", "component/Layer", "base/util", "component/Tabs"],
function(e) {
	var t = e("./UIBase"),
	n = e("./Layer"),
	i = e("../base/util"),
	s = e("./Tabs");
	return t.extend({
		options: {
			template: '<div id="Operations" class="operations-panel layer shared-layer" style="display:none"><div class="tip-content"><ul id="OperationItems"></ul></div></div>',
			itemTemplate: '<li class="#{4}"><a target="#{3}" data="#{2}" class="#{2}" href="#{0}" layer="##{2}Layer">#{1}</a></li>',
			loadingTemplate: '<div class="loading">正在加载，请稍候……</div>',
			isSingleHistory: !1,
			showLayer: !0
		},
		allOperations: {
			history: {
				label: "查看历史趋势",
				target: "_blank",
				hrefTemplate: "#{baseUri}/trend/history?#{query}"
			},
			speed: {
				label: "对该URL进行速度诊断",
				target: "_blank",
				hrefTemplate: "#{baseUri}/opt/speed?#{query}"
			},
			area: {
				label: "查看按地域分布情况",
				target: "_blank",
				hrefTemplate: "#{baseUri}/pro/conn?viewType=area&flag=area&#{query}"
			},
			isp: {
				label: "查看按网络供应商分布情况",
				target: "_blank",
				hrefTemplate: "#{baseUri}/pro/conn?viewType=isp&flag=isp&#{query}"
			},
			word: {
				label: "查看相关热门搜索词",
				hrefTemplate: "javascript:void(0);",
				render: function(e, t) {
					for (var n = ['<tr><th class="order">序号</th><th>搜索词</th><th>热门程度</th></tr>'], s = 0; s < t.length; s++) t[s].order = s + 1,
					n.push(i.format('<tr><td class="order">#{order}</td><td><div class="word"><a href="http://www.baidu.com/s?wd=#{gbkWord}" title="!{word}" target="_blank">!{word}</a></div></td><td><div class="ratio" style="width:#{frequence}%"></div></td></tr>', t[s]));
					return 0 === t.length && n.push('<tr><td class="empty" colspan="3">暂无数据</td></tr>'),
					i.format('<div class="title">查看与<span class="red">&nbsp;&nbsp;!{0,30}&nbsp;&nbsp;</span>相关的热门搜索词</div><table>#{1}</table>', e, n.join(""))
				}
			},
			referer: {
				label: "查看入口页链接",
				hrefTemplate: "javascript:void(0);",
				render: function(e, t) {
					for (var n = ['<tr><th class="order">排名</th><th class="text-left">入口页链接<th></tr>'], s = 0; s < t.length; s++) n.push(i.format('<tr><td class="order">#{0}</td><td><div class="link"><a href="!{1}" title="!{1}" target="_blank">!{1}</a></div></td></tr>', s + 1, t[s]));
					return 0 === t.length && n.push('<tr><td class="empty" colspan="2">暂无数据</td></tr>'),
					i.format('<div class="title">查看以<span class="red">&nbsp;&nbsp;!{0,30}&nbsp;&nbsp;</span>为来源的入口页面</div><table>#{1}</table>', e, n.join(""));

				}
			},
			refererDistribution: {
				label: "查看来源分布",
				hrefTemplate: "javascript:void(0);",
				render: function(e, t) {
					for (var n = '<div id="RefererDistributionTab"><div class="title"><span class="red title-ellipsis l" title="#{0}">#{0}</span><span class="l">&nbsp;&nbsp;来源分布情况</span></div><div class="rd-tabs"><ul class="clearfix"><li class="selected"><a class="clearfix" href="javascript:void(0);">来源类型</a></li><li><a class="clearfix" href="javascript:void(0);">来源URL</a></li></ul></div><div class="rd-tab-contents clearfix"><ul class="clearfix"><li class="rd-tab-type"><div>#{1}</div></li><li style="display: none;" class="rd-tab-url"><table>#{2}</table></li></ul></div></div>',
					s = '<div class="rd-tab-type-row clearfix"><div class="refer-dis-type">#{0}</div><div class="refer-dis-type-base"><div style="width:#{1}%">&nbsp;</div></div><div class="refer-dis-type-value" title="#{1}%">#{1}%</div></div>',
					o = '<tr class="source-url-row"><td class="rd-tab-type-index"><span>!{3}</span></td><td class="source-url"><div class="link"><a href="!{0}" title="!{0}" target="_blank">!{0}</a></div></td><td class="source-number number"><div class="td-content" title="#{1}">#{1}</div></td><td class="number"><div class="td-content" title="#{2}">#{2}</div></td></tr>',
					a = [], r = ['<th class="rd-tab-type-index">排名</th><th class="source-url">来源URL</th><th class="source-number number">来源次数</th><th class="number">带来浏览量</th></tr>'], l = 0; l < t.items.length; l++) {
						for (var c = 0; c < t.items[l].length; c++) 0 === l && a.push(i.format(s, t.items[l][c][0].type, t.items[l][c][0].value)),
						1 === l && r.push(i.format(o, t.items[l][c][0], i.formatNumber(t.items[l][c][1]), i.formatNumber(t.items[l][c][2]), c + 1));
						0 === t.items[l].length && (0 === l && a.push("暂无数据"), 1 === l && r.push('<tr><td class="empty" colspan="3">暂无数据</td></tr>'))
					}
					return i.format(n, e.length > 150 ? e.substr(0, 150) + "...": e, a.join(""), r.join(""))
				},
				bindEvents: function() {
					new s({
						containerId: "RefererDistributionTab",
						selectedIndex: 0,
						tabsSelector: " >.rd-tabs>ul>li:not(.separator)",
						toggleSelector: " >.rd-tabs>.toggle",
						contentsSelector: " >.rd-tab-contents>ul>li",
						contentContainerSelector: " >.rd-tab-contents",
						tabContainerSelector: " >.rd-tabs>ul"
					})
				}
			},
			record: {
				label: "查看站点索引情况",
				target: "_blank",
				hrefTemplate: "#{sourceEngineUrl}!{siteDomain}"
			},
			index: {
				label: "查看百度指数",
				target: "_blank",
				hrefTemplate: "http://index.baidu.com/main/word.php?word=#{word}"
			},
			engine: {
				label: "查看搜索来路URL",
				hrefTemplate: "javascript:void(0);",
				render: function(e, t) {
					for (var n = ["<tr>", '<th class="text-left">搜索链接</th>', '<th class="order">次数</th>', '<th class="index-number">第几页</th>', "</tr>"], s = 0; s < t.length; s++) t[s].order = s + 1,
					n.push(i.format('<tr><td><div class="link"><a href="!{url}" title="!{url}" target="_blank">!{url}</a></div></td><td class="order">#{count}</td><td class="index-number">#{page}</td></tr>', t[s]));
					return 0 === t.length && n.push('<tr><td class="empty" colspan="3">暂无数据</td></tr>'),
					i.format('<div class="title"><span class="red">!{0,30}&nbsp;&nbsp;</span>的搜索来路URL</div><table>#{1}</table>', e, n.join(""))
				}
			},
			onlyOneIp: {
				label: "仅看该IP",
				hrefTemplate: "javascript: void(0);"
			},
			allIp: {
				label: "看全部IP",
				hrefTemplate: "javascript: void(0);"
			},
			copyThisIp: {
				label: "复制IP地址",
				hrefTemplate: "javascript: void(0);"
			},
			notShowThisIp: {
				label: "屏蔽该IP",
				hrefTemplate: "javascript: void(0);"
			},
			showThisIp: {
				label: "已屏蔽该IP",
				hrefTemplate: "javascript: void(0);"
			},
			onlyOneVisitor: {
				label: "仅看该访客",
				hrefTemplate: "javascript: void(0);"
			},
			allVisitor: {
				label: "看全部访客",
				hrefTemplate: "javascript: void(0);"
			},
			copyThisVisitor: {
				label: "复制标识码",
				hrefTemplate: "javascript: void(0);"
			},
			notShowThisVisitor: {
				label: "屏蔽该访客",
				hrefTemplate: "javascript: void(0);"
			},
			showThisVisitor: {
				label: "已屏蔽该访客",
				hrefTemplate: "javascript: void(0);"
			},
			showDetailIp: {
				label: "查看IP明细",
				hrefTemplate: "javascript: void(0);"
			},
			showDetailVisitor: {
				label: "查看访客明细",
				hrefTemplate: "javascript: void(0);"
			},
			path: {
				label: "查看路径转化",
				target: "_blank",
				hrefTemplate: "#{baseUri}/custom/newpath?#{query}"
			}
		},
		type: "operations",
		data: null,
		contentType: null,
		element: null,
		renderItems: function(e, t) {
			var n = [];
			this.data = t;
			for (var s = 0; s < e.length; s++) {
				var o = e[s];
				o.siteId = $.holmes.config.siteInfo.id;
				var a = {
					webRoot: $.holmes.config.systemConfig.webRoot,
					baseUri: $.holmes.config.systemConfig.baseUri,
					sourceEngineUrl: o.sourceEngineUrl,
					userId: $.holmes.config.userInfo.id,
					query: $.param(o)
				};
				"index" === o.id && (a.word = o.word),
				"record" === o.id && ("www.baidu.com/s?wd=" === a.sourceEngineUrl ? (a.siteDomain = "", a.sourceEngineUrl = $.holmes.config.systemConfig.baseUri + "/opt/indexes?siteId=" + $.holmes.config.siteInfo.id) : (a.siteDomain = "site:" + $.holmes.config.siteInfo.name, a.sourceEngineUrl = "http://" + a.sourceEngineUrl));
				var r = i.format(this.allOperations[o.id].hrefTemplate, a),
				l = "";
				0 === s && (l = "first"),
				s === e.length - 1 && (l = "last"),
				n.push(i.format(this.options.itemTemplate, r, this.allOperations[o.id].label, o.id, this.allOperations[o.id].target || "", l))
			}
			return n.join("")
		},
		afterShow: function(e, t) {
			for (var n = this,
			i = 0; i < e.length; i++) {
				var s = e[i];
				t(s, n.data)
			}
		},
		bindEvents: function(e) {
			for (var t = this,
			i = 0; i < e.length; i++) {
				var s = e[i];
				this[s.id] || "_blank" === this.allOperations[s.id].target || !
				function(e) {
					t[e] = new n({
						containerId: e + "Layer",
						type: "click",
						closeButton: !0,
						relatedOther: !0,
						className: e + "-layer",
						handlerSelector: "#Operations ." + e,
						onchange: function(n) {
							t.contentType = e,
							t[e].setPosition(t.element),
							t.loading(),
							t.options.onchange(t.contentType, t.data)
						}
					})
				} (s.id),
				"_blank" !== this.allOperations[s.id].target && this[s.id].render()
			}
		},
		show: function(e, t, n) {
			if (this.options.isSingleHistory && t[0] && "history" === t[0].id) {
				var s = {};
				for (var o in t[0]) t[0].hasOwnProperty(o) && null != t[0][o] && (s[o] = t[0][o]);
				s.siteId = $.holmes.config.siteInfo.id;
				var a = i.format("#{0}/trend/history?#{1}", $.holmes.config.systemConfig.baseUri, $.param(s));
				window.open(a)
			} else this.element = e,
			0 === $("#Operations").length && $(document.body).append(this.options.template),
			$("#OperationItems").empty(),
			$("#OperationItems").append(this.renderItems(t, n)),
			$("#OperationItems").find(".word").length && $("#OperationItems").find(".word").each(function(e, t) {
				$(t).removeClass("word"),
				$(t).addClass("disabled")
			}),
			$.holmes.setPosition($("#Operations"), $.holmes.getCornerPosition(e, "tr")),
			$("#Operations").show(),
			this.options.showLayer && this.bindEvents(t),
			this.options.isSingleHistory === !1 && this.bindMouseoverEvent()
		},
		content: function(e, t) {
			this[this.contentType].content(this.allOperations[this.contentType].render(e, t)),
			this.allOperations[this.contentType].bindEvents && this.allOperations[this.contentType].bindEvents()
		},
		loading: function() {
			$("#Operations").hide(),
			this[this.contentType].content(this.options.loadingTemplate)
		},
		bindMouseoverEvent: function() {
			function e() {
				$("#Operations").hide()
			}
			function t() {
				$("#Operations").show()
			}
			function n() {
				window.clearTimeout(s),
				s = window.setTimeout(t, 300)
			}
			function i() {
				window.clearTimeout(s),
				s = window.setTimeout(e, 300)
			}
			var s = null,
			o = $("#copy-btn");
			$("#Operations").on("mouseover", n),
			$("#Operations").on("mouseout", i),
			o.length && o.on("mouseover", n),
			$("#table").on("mouseover",
			function(e) {
				var t = $(e.target);
				"#Operations" === t.attr("layer") && n()
			}),
			$("#table").on("mouseout",
			function(e) {
				var t = $(e.target);
				"#Operations" === t.attr("layer") && i()
			})
		}
	})
}),
define("component/Summary", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "summary",
		options: {
			containerId: null,
			tdTemplate: '<td #{last}><span class="text">#{text}<a href="javascript:void(0);" data="#{id}" class="help">&nbsp;</a></span><div class="value summary-ellipsis" title="#{value}">#{value}</div>#{compare}</td>',
			compareDataTemplate: '<div class="compare-value summary-ellipsis" title="#{0}">#{0}</div>',
			tableTemplate: '<table class="summary"><tbody><tr>#{0}</tr></tbody></table>',
			lastClass: 'class="last"'
		},
		_init: function() {},
		_render: function(e, t) {
			for (var i = [], s = e[1] && e[1].length > 0, o = 0, a = t.length; a > o; o++) {
				var r = t[o],
				l = o === t.length - 1 ? this.options.lastClass: "";
				if (s) {
					var c = n.format(this.options.compareDataTemplate, e[1][o]);
					i.push(n.format(this.options.tdTemplate, {
						id: r.id,
						text: r.label,
						value: e[0][o],
						compare: c,
						last: l
					}))
				} else i.push(n.format(this.options.tdTemplate, {
					id: r.id,
					text: r.label,
					value: e[0][o],
					last: l
				}))
			}
			return n.format(this.options.tableTemplate, i.join(""))
		},
		render: function(e, t) {
			var n = this.options.containerId,
			i = $("#" + n);
			i.length && (i.empty(), i.append(this._render(e, t)))
		}
	})
}),
define("component/ProSummary", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "proSummary",
		options: {
			containerId: null,
			noDataText: '<table><tr><td><div class="empty">最近两日暂无消费。</div></td></tr></table>',
			thTemplate: '<th class="#{first} #{last}"><span class="text">#{field}</span></th>',
			tdTemplate: '<td class="#{first} #{last}"><div class="value summary-ellipsis today" title="#{todayValue}">#{todayValue}</div><div class="value summary-ellipsis yesterday" title="#{yesterdayValue}">#{yesterdayValue}</div></td>',
			tableTemplate: '<table class="summary"><tbody><tr>#{0}</tr><tr>#{1}</tr></tbody></table>',
			firstClass: "first",
			lastClass: "last"
		},
		_init: function() {},
		_render: function(e, t) {
			for (var i = [], s = [], o = 0, a = t.length; a > o; o++) {
				var r = t[o],
				l = 0 === o ? this.options.firstClass: "",
				c = o === t.length - 1 ? this.options.lastClass: "";
				i.push(n.format(this.options.thTemplate, {
					field: r.label,
					first: l,
					last: c
				})),
				e[0][o] = n.formatData(e[0][o], r.type),
				e[1][o] = n.formatData(e[1][o], r.type),
				s.push(n.format(this.options.tdTemplate, {
					todayValue: e[0][o],
					yesterdayValue: e[1][o],
					first: l,
					last: c
				}))
			}
			return n.format(this.options.tableTemplate, i.join(""), s.join(""))
		},
		render: function(e, t) {
			var n = this.options.containerId,
			i = $("#" + n);
			if (i.length) {
				if (e[0] && "--" === e[0][1] && e[1] && "--" === e[1][1]) return i.empty(),
				void i.append(this.options.noDataText);
				"null" === e[1][e[1].length - 1] && (e[1][e[1].length - 1] = "代码详情"),
				t.unshift({
					label: ""
				}),
				t.push({
					label: "操作&emsp;&emsp;"
				}),
				e[0].push("推广概况");
				var s = this._render(e, t),
				o = $.holmes.config.systemConfig.scUri + "/home/site/index?flag=proUrl",
				a = '<a id="event-monitor-code-detail" class="code-detail" target="_blank" href="' + o + '">代码详情</a>',
				r = $.holmes.config.systemConfig.webRoot + "/" + $.holmes.config.pageInfo.targetUserId + "/pro/outline?siteId=" + $.holmes.config.siteInfo.id;
				s = s.replace(">代码详情<", ">" + a + "<").replace(">推广概况<", '><a id="event-monitor-promotion-overview" class="promotion-overview" href="' + r + '">推广概况</a><'),
				i.empty(),
				i.append(s)
			}
		}
	})
}),
define("component/Paging", ["require", "exports", "module", "component/UIBase", "base/util", "underscore", "component/CustomSelect"],
function(e) {
	var t = e("component/UIBase"),
	n = e("base/util"),
	i = e("underscore"),
	s = e("component/CustomSelect");
	return t.extend({
		_type: "paging",
		options: {
			containerId: null,
			onchange: function(e) {},
			offset: 0,
			pageSize: 20,
			pageSizeRange: [20, 50, 100],
			pageSizeSelectText: "显示行数：",
			fuzzy: !1,
			withoutGoto: !1,
			round: 2,
			previousTemplate: '<a href="javascript:void(0);" class="previous" data="#{0}"></a>',
			pageNumberTemplate: '<a class="number#{0}" href="javascript:void(0);" data="#{1}">#{1}</a>',
			moreTemplate: '<span class="dot">...</span>',
			nextTemplate: '<a href="javascript:void(0);" class="next" data="#{0}"></a>',
			pagingWrapperTemplate: '<div class="paging clearfix">#{0}</div>',
			pageNumberWrapperTemplate: '<div class="page-number" id="page-number">#{0}#{1}</div>',
			gotoTemplate: '<span class="jump-text">跳转至第<input class="text" type="text"/>页</span><a href="javascript:void(0)" class="btn button"><span>确定</span></a>',
			pageSizeWrapperTemplate: '<div class="page-size"><span class="page-size-text">#{0}</span>#{1}</div>',
			pageSizeSelectTemplate: '<div id="page-size"></div>',
			pageSizeOptionTemplate: '<option value="#{0}"#{1}>#{0}</option>'
		},
		_total: 0,
		_offset: 0,
		_pageSize: 0,
		_fuzzy: !1,
		_pageCount: 0,
		_currentPage: 0,
		_init: function() {
			this._offset = this.options.offset,
			this._pageSize = this.options.pageSize,
			this._fuzzy = this.options.fuzzy
		},
		_computeParams: function() {
			this._pageCount = Math.ceil(this._total / this._pageSize),
			0 === this._pageCount && (this._pageCount = 1),
			this._currentPage = this._offset / this._pageSize + 1
		},
		_computePageRange: function(e, t, n) {
			var i = t - n,
			s = t + n;
			return 1 > i && (i = 1, s = Math.min(2 * n + 1, e)),
			s > e && (s = e, i = Math.max(e - 2 * n, 1)),
			{
				from: i,
				to: s
			}
		},
		_renderPageSize: function() {
			return $.isArray(this.options.pageSizeRange) && 0 !== this.options.pageSizeRange.length ? this._total <= this.options.pageSizeRange[0] ? "": n.format(this.options.pageSizeWrapperTemplate, this.options.pageSizeSelectText, this.options.pageSizeSelectTemplate) : ""
		},
		_renderPaging: function() {
			if (this._pageCount <= 1) return "";
			var e = "";
			this._currentPage > 1 && (e += n.format(this.options.previousTemplate, this._currentPage - 1));
			var t = this._computePageRange(this._pageCount, this._currentPage, this.options.round);
			if (!this._fuzzy) {
				t.from > 1 && (e += 2 === t.from ? n.format(this.options.pageNumberTemplate, "", 1) : n.format(this.options.pageNumberTemplate, "", 1) + this.options.moreTemplate);
				for (var i = t.from; i <= t.to; i++) e += n.format(this.options.pageNumberTemplate, this._currentPage === i ? " selected": "", i);
				t.to < this._pageCount && (e += t.to + 1 === this._pageCount ? n.format(this.options.pageNumberTemplate, "", this._pageCount) : this.options.moreTemplate + n.format(this.options.pageNumberTemplate, "", this._pageCount))
			}
			return this._currentPage < this._pageCount && (e += n.format(this.options.nextTemplate, this._currentPage + 1)),
			n.format(this.options.pageNumberWrapperTemplate, e, this._fuzzy || this.options.withoutGoto ? "": this.options.gotoTemplate)
		},
		_changePage: function(e) {
			var t = e.target,
			n = $(t).attr("data");
			if (null != n) {
				var i = parseInt(n, 10),
				s = (i - 1) * this._pageSize;
				this._offset = s,
				this._currentPage = i,
				this.options.onchange({
					offset: this._offset,
					currentPage: this._currentPage,
					pageSize: this._pageSize,
					paging: this
				})
			}
		},
		_gotoPage: function(e) {
			var t = $(".text", "#" + this.options.containerId).eq(0)[0],
			n = parseInt($.trim(t.value), 10);
			if (! (isNaN(n) || n > this._pageCount || n === this._currentPage || 1 > n)) {
				var i = (n - 1) * this._pageSize;
				this._offset = i,
				this._currentPage = n,
				this.options.onchange({
					offset: this._offset,
					currentPage: this._currentPage,
					pageSize: this._pageSize,
					paging: this
				})
			}
		},
		_changePageSize: function(e) {
			this._pageSize = parseInt(e, 10),
			this._offset = 0,
			this._computeParams(),
			this.options.onchange({
				offset: this._offset,
				currentPage: this._currentPage,
				pageSize: this._pageSize,
				paging: this
			})
		},
		_bindEvent: function() {
			var e = this,
			t = $("#" + this.options.containerId);
			$(".page-number", t).on("click", $.proxy(e._changePage, e)),
			$(".button", t).on("click", $.proxy(e._gotoPage, e))
		},
		clear: function() {
			$("#" + this.options.containerId).empty()
		},
		_format: function(e) {
			var t = i.map(e,
			function(e) {
				return {
					id: e,
					label: e
				}
			});
			return [{
				items: t
			}]
		},
		render: function(e, t, i) {
			var o = $("#" + this.options.containerId);
			o.data("paging-total", e);
			var a = this;
			if (! (!o.length > 0)) {
				null !== e && (this._total = e),
				null !== t && (this._offset = t),
				null !== i && (this._fuzzy = i),
				(null !== e || null !== t) && this._computeParams(),
				o.empty();
				var r = this._renderPageSize() + this._renderPaging();
				null !== r && r.length > 0 && (o.append(n.format(this.options.pagingWrapperTemplate, r)), $(".page-size").length && new s({
					containerId: "page-size",
					items: a._format(a.options.pageSizeRange),
					defaultLabel: "",
					selectedId: a._pageSize,
					customizable: !1,
					onchange: $.proxy(a._changePageSize, a)
				}), this._bindEvent())
			}
		}
	})
}),
define("component/LinePie", ["require", "exports", "module", "component/UIBase", "base/base", "base/util", "underscore"],
function(e) {
	var t = e("./UIBase"),
	n = (e("../base/base"), e("base/util")),
	i = e("underscore");
	return t.extend({
		options: {
			id: "",
			pie: {
				width: "30%",
				data: [],
				defaultChartOpts: {
					plotOptions: {
						pie: {
							donut: !0,
							cursor: "pointer",
							dataLabels: {
								enabled: !0,
								showLabelNumber: 5,
								color: "#323437",
								connectorColor: "#d8dbdf"
							},
							showInLegend: !1,
							margin: [20, 50, 50, 55]
						}
					},
					radius: [95, 70],
					series: []
				}
			},
			line: {
				width: "70%",
				data: [],
				defaultChartOpts: {
					xAxis: [],
					yAxis: [],
					series: [],
					canvasLayout: {
						margin: [33, 35, 73, 80]
					},
					legend: {
						position: "custom"
					}
				},
				maxLineNumber: 4
			},
			onclose: function() {}
		},
		_type: "linepie",
		_init: function() {
			var e = this.options.id || this.options.flashContainerId;
			this.$container = $("#" + e),
			this.initLinePieSubContainers(),
			this.render()
		},
		render: function() {
			this.renderPie(),
			this.renderLine()
		},
		initLinePieSubContainers: function() {
			var e = this.getLineId(),
			t = this.getPieId(),
			n = this.options,
			i = n.line,
			s = n.pie;
			this.$pieContainer = $('<div id="' + t + '"></div>').appendTo(this.$container).addClass("hm-charts-linepie-pie").css("width", s.width),
			this.$lineContainer = $('<div id="' + e + '"></div>').appendTo(this.$container).addClass("hm-charts-linepie-line").css("width", i.width)
		},
		renderPie: function() {
			var e = $.extend(!0, $.extend(!0, {},
			this.options.pie.defaultChartOpts), {
				containerId: this.getPieId(),
				callbacks: {
					onhighlight: $.proxy(this.onhighlightPie, this),
					onunhighlight: $.proxy(this.onunhighlightPie, this)
				}
			});
			this.Pie = hmcharts.create(hmcharts.pie, e, e)
		},
		renderLine: function() {
			var e = $.extend(!0, $.extend(!0, {},
			this.options.line.defaultChartOpts), {
				containerId: this.getLineId(),
				callbacks: {
					onhighlight: $.proxy(this.onhighlightLine, this),
					onunhighlight: $.proxy(this.onunhighlightLine, this),
					onunselect: $.proxy(this.onunselectLine, this),
					onselect: $.proxy(this.onselectLine, this),
					onhighLightTooltip: $.proxy(this.onhighLightTooltip, this)
				}
			});
			e = this.buildLineDataTooltip(e),
			this.Line = hmcharts.create(hmcharts.series, e, e)
		},
		setData: function(e) {
			e ? (e.pie && this.setPieData(e), e.line && this.setLineData(e)) : (this.Pie && this.Pie.showNoData(), this.Line && this.Line.showNoData())
		},
		showLoading: function() {
			$(".hm-charts-custom-legend").remove(),
			this.Pie && this.Pie.showLoading(),
			this.Line && this.Line.showLoading()
		},
		setPieData: function(e) {
			for (var t = $.extend(!0, $.extend(!0, {},
			this.options.pie.defaultChartOpts), {
				containerId: this.getPieId()
			}), s = {
				name: i.isArray(e.indicator) ? e.indicator[0] : "",
				type: "pie",
				data: []
			},
			o = 0; o < e.pie.items.length; o++) {
				var a = e.pie.items[o];
				s.data.push({
					name: n.truncat(a[0], 18),
					value: +a[1]
				})
			}
			t.series.push(s),
			this.Pie.setData(t)
		},
		setLineData: function(e) {
			var t = $.extend(!0, $.extend(!0, {},
			this.options.line.defaultChartOpts), {
				containerId: this.getLineId()
			});
			t = this.buildLineData(t, e),
			$(".hm-charts-custom-legend").remove(),
			this.Line.setData(t);
			var n = this;
			setTimeout(function() {
				$("#" + n.getLineId() + " .hm-charts-custom-legend").appendTo(n.$container),
				$(".hm-charts-custom-legend .hm-html-legend-item").length > 7 ? $(".flash-linepie-container").addClass("flash-linepie-container-lg") : $(".flash-linepie-container").removeClass("flash-linepie-container-lg")
			},
			0)
		},
		buildLineData: function(e, t) {
			return e = this.buildLineDataAxis(e, t),
			e = this.buildLineDataSeries(e, t),
			e = this.buildLineDataTooltip(e, t)
		},
		buildLineDataAxis: function(e, t) {
			var n = {
				type: "category",
				data: [],
				axisLabel: {
					margin: 15
				}
			};
			i.each(t.line.items,
			function(e, t) {
				n.data.push(e[0])
			}),
			e.xAxis.push(n);
			var s = {
				type: "value",
				position: "left",
				axisTick: !1,
				axisLine: !1
			};
			return e.yAxis.push(s),
			e
		},
		buildLineDataSeries: function(e, t) {
			var s = this;
			this.displayedLines = [];
			var o = Array.prototype.slice.call(t.line.fields, 2);
			return i.each(o,
			function(o, a) {
				var r = [];
				i.each(t.line.items,
				function(e, t) {
					r.push(e[a + 2])
				}),
				e.series[a] = {
					name: n.truncat(o, 30),
					yAxis: 1,
					data: r
				},
				a >= s.options.line.maxLineNumber ? e.series[a].isHidden = !0 : s.displayedLines.push(a)
			}),
			e
		},
		buildLineDataTooltip: function(e, t) {
			var s = t && t.indicator.join(",");
			return e.tooltip = e.tooltip || {},
			e.tooltip.formatter = function(e, t, o, a) {
				var r = [],
				l = o[a];
				e.length > 0 && e[0].category && e[0].category[a] && (l = e[0].category[a]),
				l = i.isObject(l) ? l.tipLabel: l,
				r.push('<div class="hm-charts-tooltip-header"><span class="hm-charts-tooltip-header-category">' + l + '</span><span class="hm-charts-tooltip-item-value">' + s + "</span></div>"),
				r.push('<div class="hm-charts-tooltip-body">');
				for (var c = 0; c < t.length; c++) if (!e[c].isHidden) {
					var d = t[c],
					u = n.formatData(d.data[a], d.dataType || "number"),
					h = e[c] && e[c].color || "#000";
					d.tooltip && d.tooltip.valueSuffix && (u += d.tooltip.valueSuffix),
					r.push('<p class="hm-charts-tooltip-item"><span class="hm-charts-tooltip-item-icon" style="color:' + h + '">' + hmcharts.resources.serieIconInfo.getIcon(e[c].type || "line") + '</span><span class="hm-charts-tooltip-item-label">' + d.name + ' </span><span class="hm-charts-tooltip-item-value">' + u + "</span></p>")
				}
				return r.push("</div>"),
				r.join("")
			},
			e
		},
		onhighlightPie: function(e) {
			$(".hm-charts-linepie-line .hm-charts-tooltip").hide(),
			this.Line.highLightSerie(e)
		},
		onunhighlightPie: function(e) {
			this.Line.unHighLightSerie(e)
		},
		onhighlightLine: function(e) {
			$(".hm-charts-linepie-line .hm-charts-tooltip").hide(),
			$(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ") label:eq(1)").css("color", "#323437"),
			this.Pie.highlightSector(e)
		},
		onunhighlightLine: function(e) {
			var t = $(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ")");
			t.hasClass("hm-html-legend-unselected") ? t.find("label:eq(1)").css("color", "#c6c6c6") : t.find("label:eq(1)").css("color", "#5a5c5e"),
			this.Pie.unHighLightSector(e)
		},
		onselectLine: function(e) {
			if ($(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ") label:eq(1)").css("color", "#323437"), this.displayedLines.length >= 6) {
				var t = i.first(this.displayedLines);
				this.Line.opts.series[t].isHidden = !0,
				this.displayedLines.shift(),
				$(".hm-charts-custom-legend .hm-html-legend-item:eq(" + t + ")").addClass("hm-html-legend-unselected"),
				$(".hm-charts-custom-legend .hm-html-legend-item:eq(" + t + ") label:eq(1)").css("color", "#c6c6c6")
			}
			this.displayedLines.push(e)
		},
		onunselectLine: function(e) {
			$(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ") label:eq(1)").css("color", "#c6c6c6"),
			this.displayedLines = i.without(this.displayedLines, e)
		},
		onhighLightTooltip: function() {
			$(".hm-charts-linepie-pie .hm-charts-tooltip").hide()
		},
		resizeChart: function() {
			this.Line.resizeChart()
		},
		getLineId: function() {
			return this.getId("linepie-line")
		},
		getPieId: function() {
			return this.getId("linepie-pie")
		},
		serialize: function() {
			var e = this.Pie.paper.toSVG(this.Pie),
			t = this.Line.paper.toSVG(this.Line);
			return [e, t]
		}
	})
}),
define("component/BarLinePie", ["require", "exports", "module", "component/LinePie", "underscore", "base/util"],
function(e) {
	var t = e("component/LinePie"),
	n = e("underscore"),
	i = e("base/util");
	return t.extend({
		options: {
			pie: {
				width: "30%",
				data: [],
				defaultChartOpts: {
					plotOptions: {
						pie: {
							donut: !0,
							cursor: "pointer",
							dataLabels: {
								enabled: !0,
								showLabelNumber: 5,
								color: "#323437",
								connectorColor: "#d8dbdf"
							},
							showInLegend: !1,
							margin: [20, 50, 50, 55]
						}
					},
					radius: [100, 74],
					series: [],
					style: {
						colors: ["#4fa8f9", "#6ec71e", "#f56e6a", "#fc8b40", "#818af8", "#31c9d7", "#f35e7a", "#ab7aee", "#14d68b", "#edb00d"]
					}
				}
			},
			line: {
				width: "70%",
				data: [],
				defaultChartOpts: {
					xAxis: [],
					yAxis: [],
					series: [],
					canvasLayout: {
						margin: [33, 30, 73, 80]
					},
					color: ["#4fa8f9", "#6ec71e", "#f56e6a", "#fc8b40", "#818af8", "#31c9d7", "#f35e7a", "#ab7aee", "#14d68b", "#edb00d"],
					legend: {
						position: "custom"
					}
				},
				maxLineNumber: 4
			},
			summaryColor: "#cde5ff"
		},
		_type: "barlinepie",
		_init: function() {
			this._super()
		},
		setLineData: function(e) {
			this._super(e)
		},
		buildLineDataSeries: function(e, t) {
			var s = this;
			this.displayedLines = [];
			var o = Array.prototype.slice.call(t.line.fields, 1);
			n.each(o,
			function(o, a) {
				var r = [];
				n.each(t.line.items,
				function(e, t) {
					r.push(e[a + 1])
				}),
				e.series[a] = {
					name: i.truncat(o, 30),
					yAxis: 1,
					data: r
				},
				0 === a && (e.series[a].type = "bar", e.series[a].color = s.options.summaryColor),
				a >= s.options.line.maxLineNumber ? e.series[a].isHidden = !0 : s.displayedLines.push(a)
			});
			var a = $.extend(!0, {},
			e.series[0]);
			return e.series = Array.prototype.slice.call(e.series, 1),
			e.series.push(a),
			this.totalSerieLength = e.series.length,
			e
		},
		onhighlightPie: function(e) {
			this.Line.highLightSerie(e)
		},
		onunhighlightPie: function(e) {
			this.Line.unHighLightSerie(e)
		},
		onhighlightLine: function(e) {
			e === this.totalSerieLength - 1 ? $(".hm-charts-linepie-pie .hm-charts-tooltip").hide() : ($(".hm-charts-linepie-line .hm-charts-tooltip").hide(), $(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ") label:eq(1)").css("color", "#323437"), this.Pie.highlightSector(e))
		},
		onunhighlightLine: function(e) {
			if (e === this.totalSerieLength - 1) $(".hm-charts-linepie-pie .hm-charts-tooltip").hide();
			else {
				var t = $(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ")");
				t.hasClass("hm-html-legend-unselected") ? t.find("label:eq(1)").css("color", "#c6c6c6") : t.find("label:eq(1)").css("color", "#5a5c5e"),
				this.Pie.unHighLightSector(e)
			}
		},
		onselectLine: function(e) {
			if ($(".hm-charts-custom-legend .hm-html-legend-item:eq(" + e + ") label:eq(1)").css("color", "#323437"), this.displayedLines.length >= 6) {
				var t = n.first(this.displayedLines);
				"bar" !== this.Line.opts.series[t].type ? this.displayedLines.shift() : (t = this.displayedLines[1], this.displayedLines = n.without(this.displayedLines, t)),
				this.Line.opts.series[t].isHidden = !0,
				$(".hm-charts-custom-legend .hm-html-legend-item:eq(" + t + ")").addClass("hm-html-legend-unselected"),
				$(".hm-charts-custom-legend .hm-html-legend-item:eq(" + t + ") label:eq(1)").css("color", "#c6c6c6")
			}
			this.displayedLines.push(e)
		}
	})
}),
define("component/FlashIndicator", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "chartIndicator",
		options: {
			containerId: "flash-indicator",
			onchange: function(e) {},
			limit: Number.MAX_VALUE,
			items: null,
			selectedItems: null,
			defaultItems: null,
			indicatorContainerTemplate: '<div class="flash-indicator-container layer" id="flash-option-container">#{1}<div id="flash-indicator-container">#{0}</div></div>',
			indicatorTextTemplate: '<div class="flash-indicator-wrapper">指标：<a id="flash-indicator-btn"><span class="flash-indicator-text trackable" memo="{id:\'flash_poin\'}" id="flash-indicator-text">正在加载中...</span></a><span class="btn-arrow">&nbsp;</span></div>',
			setDefaultTemplate: '<div id="flash-tip" class="text">提示：可同时选择<span id="max-flash-indicator-num" class="max-flash-indicator-num">#{0}</span>项</div>',
			indicatorTemplate: '<label for="#{0}"><div class="form-style #{6}#{7}"></div><input name="#{5}" id="#{0}" value="#{1}" type="#{3}" title="#{2}" #{4} />#{2}</label>',
			indicatorWrapperTemplate: '<div class="group clearfix">#{0}</div>',
			separatorTemplate: '<div class="separator"></div>'
		},
		_defaultItems: null,
		_defaultLimit: Number.MAX_VALUE,
		_groupItems: [],
		selectedItems: [],
		_init: function() {
			var e = this,
			t = $("#" + this.options.containerId);
			t.addClass("flash-indicator"),
			this.selectedItems = $.map(this.options.selectedItems,
			function(e) {
				return e
			}),
			$.isArray(this.options.items) && ($.each(this.options.items,
			function(t, n) {
				e._groupItems[n.group] || (e._groupItems[n.group] = []),
				e._groupItems[n.group].push(n)
			}), this._defaultLimit = this.options.limit, this._defaultItems = this.selectedItems)
		},
		showIndicatorContainer: function(e) {
			e.stopPropagation();
			var t = $("#" + this.options.containerId),
			n = $(".flash-indicator-wrapper", t),
			i = $("#flash-option-container", t),
			s = "none" === i.css("display") ? "block": "none";
			i.css({
				left: 0,
				top: n[0].offsetHeight + 5,
				display: s
			}),
			"block" === s ? n.addClass("btn-selected") : n.removeClass("btn-selected")
		},
		hideIndicatorContainer: function(e) {
			e.stopPropagation();
			var t = $("#" + this.options.containerId),
			n = $(".flash-indicator-wrapper", t),
			i = $(e.target),
			s = $("#flash-option-container"),
			o = $.contains(s.get(0), i.get(0));
			o || (s.hide(), n.removeClass("btn-selected"))
		},
		showSingleIndicatorContent: function() {
			var e = this.selectedItems[0];
			this.options.limit = 1,
			this.showIndicatorContent([e])
		},
		showIndicatorContent: function(e) {
			var t = $("#flash-indicator-text");
			if (t.length) {
				var n = [],
				i = [],
				s = e || this._defaultItems;
				this._set(s);
				for (var o = 0,
				a = s.length; a > o; o++) {
					var r = $("#" + this.getId(s[o]));
					r.length && (n.push(s[o]), i.push(r.attr("title")))
				}
				var l = $("#max-flash-indicator-num");
				l.length && l.html(l.get(0).innerHTML.replace(/\d/g, this.options.limit)),
				t.html(i.join("、"))
			}
		},
		showDefaultIndicatorContent: function() {
			this.options.limit = this._defaultLimit,
			this.showIndicatorContent(this._defaultItems)
		},
		_set: function(e) {
			var t = this; ! e || e && !e.length || (this._unCheckAll(), $.each(e,
			function(e, n) {
				var i = $("#" + t.getId(n));
				if (i.length) {
					i.attr("checked", !0);
					var s = i.prev("div");
					s.addClass("checked")
				}
			}), this.selectedItems = e)
		},
		_unCheckAll: function() {
			var e = this;
			$.each(this.selectedItems,
			function(t, n) {
				var i = $("#" + e.getId(n));
				if (i.length) {
					i.attr("checked", !1);
					var s = i.prev();
					s.removeClass("checked")
				}
			}),
			this.selectedItems = []
		},
		_bind: function() {
			var e = $("#" + this.options.containerId),
			t = $(".flash-indicator-wrapper", e),
			n = $("#flash-option-container input", e);
			t.on("click", $.proxy(this.showIndicatorContainer, this)),
			$(document).on("click", $.proxy(this.hideIndicatorContainer, this));
			var i = this;
			n.on("click",
			function(e) {
				var t = $(e.target),
				n = i.selectedItems;
				if (t.attr("value")) {
					if (t.prop("checked")) {
						var s = t.prev();
						s.addClass("checked"),
						n.push(t.attr("value"))
					} else {
						var s = t.prev();
						if (s.removeClass("checked"), 1 === n.length) return t.attr("checked", !0),
						s.addClass("checked"),
						!1;
						n.splice($.inArray(t.attr("value"), n), 1)
					}
					if (n.length > i.options.limit) {
						var o = n.shift(),
						a = $("#" + i.getId(o));
						a.attr("checked", !1);
						var s = a.prev();
						s.removeClass("checked")
					}
					i.options.onchange(i.selectedItems)
				}
			}),
			t.on("mouseover",
			function() {
				$(this).hasClass("btn-selected") || $(this).addClass("btn-hover")
			}),
			t.on("mouseout",
			function() {
				$(this).hasClass("btn-hover") && $(this).removeClass("btn-hover")
			})
		},
		_renderIndicators: function() {
			var e, t = [],
			i = [],
			s = 1 === this.options.limit ? "radio": "checkbox",
			o = this;
			t.push(this.options.indicatorTextTemplate);
			for (var a in this._groupItems) if (this._groupItems.hasOwnProperty(a)) {
				var r = this._groupItems[a];
				e = [],
				$.each(r,
				function(t, i) {
					e.push(n.format(o.options.indicatorTemplate, o.getId(i.id), i.id, i.label, s, $.inArray(i.id, o.selectedItems) > -1 ? ' checked="checked"': "", o.getId(o.options.containerId), s, $.inArray(i.id, o.selectedItems) > -1 ? " checked": ""))
				}),
				i.push(n.format(o.options.indicatorWrapperTemplate, e.join(""))),
				+a !== o._groupItems.length - 1 && i.push(o.options.separatorTemplate)
			}
			return t.push(n.format(this.options.indicatorContainerTemplate, i.join(""), n.format(this.options.setDefaultTemplate, this.options.limit))),
			t.join("")
		},
		render: function() {
			var e = $("#" + this.options.containerId);
			e.length && (e.append(this._renderIndicators()), this.showIndicatorContent(this.selectedItems), this._bind())
		}
	})
}),
define("component/TableIndicator", ["require", "exports", "module", "component/UIBase", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("base/util");
	return t.extend({
		_type: "tableIndicator",
		_polymericGroup: 1,
		_groupItems: [],
		_allIds: [],
		_selected: [],
		_tempSelected: [],
		_defaultOrder: null,
		options: {
			containerId: null,
			items: null,
			groupNames: null,
			selected: null,
			limit: 6,
			byGroup: !0,
			defaultSelected: null,
			extraSelected: null,
			onchange: function(e) {},
			wrapperTemplate: '<div class="table-indicator-custom-btn"><span>自定义指标</span></div><div class="table-indicator" style="display: none;">#{0}</div>',
			shortcutsTemplate: '<div class="shortcuts"><em class="gray">提示：#{1}项</em>#{0}</div>',
			shortcutsItemTemplate: '<a href="javascript:void(0)" id="#{0}" class="shortcutsButton" type="#{2}">#{1}</a>',
			buttonsTemplate: '<div class="table-indicator-btn"><a id="#{0}" class="btn btn-focused" href="javascript:void(0)">确定</a></div>',
			groupNameTemplate: '<label class="groupName">#{0}:</label>',
			indicatorTemplate: '<label for="#{0}"><div class="checkbox"></div>    <input type="checkbox" title="#{2}" value="#{1}" id="#{0}">#{2}</label>',
			indicatorWrapperTemplate: '<div class="group clearfix">#{0}</div>',
			separatorTemplate: '<div class="separator #{0}"></div>'
		},
		_init: function() {
			if ($.isArray(this.options.items)) for (var e = 0,
			t = this.options.items.length; t > e; e++) {
				var n = this.options.items[e];
				this._allIds.push(n.id),
				null == this._groupItems[n.group] && (this._groupItems[n.group] = []),
				this._groupItems[n.group].push(n)
			}
		},
		_renderIndicators: function() {
			var e = [],
			t = this.options;
			if (t.byGroup) {
				var i = [],
				s = {
					Default: {
						title: "系统默认指标",
						indicators: t.defaultSelected
					}
				};
				i.push(this._renderShortCuts(s.Default, "Default"));
				for (var o in t.extraSelected) t.extraSelected.hasOwnProperty(o) && i.push(this._renderShortCuts(t.extraSelected[o], o));
				var a = 1 === t.limit ? '只能选择<em class="red">1</em>': '可同时选择<em class="red">' + t.limit + "</em>";
				t.extraSelected = $.extend(s, t.extraSelected),
				e.push(n.format(t.shortcutsTemplate, i.join(""), a));
				for (var r in this._groupItems) if (this._groupItems.hasOwnProperty(r)) {
					var l = [],
					c = this._groupItems[r];
					l.push(n.format(t.groupNameTemplate, t.groupNames[r].title)),
					l.push('<div style="overflow: hidden;">');
					for (var d in c) if (c.hasOwnProperty(d)) {
						var u = c[d];
						l.push(n.format(t.indicatorTemplate, this.getId(u.id), u.id, u.label))
					}
					l.push("</div>"),
					e.push(n.format(t.indicatorWrapperTemplate, l.join("")))
				}
			} else {
				for (var c = t.items,
				l = [], o = 0, h = c.length; h > o; o++) {
					var u = c[o];
					l.push(n.format(t.indicatorTemplate, this.getId(u.id), u.id, u.label))
				}
				e.push(n.format(t.indicatorWrapperTemplate, l.join("")))
			}
			return e.push(n.format(t.buttonsTemplate, this.getId("Ok"))),
			n.format(t.wrapperTemplate, e.join(""))
		},
		_renderShortCuts: function(e, t) {
			return n.format(this.options.shortcutsItemTemplate, this.getId(t), e.title, t)
		},
		_clickOne: function(e) {
			var t = $(e.target);

			if (t.attr("value")) {
				var n = t.attr("value"),
				i = t.prev();
				if (t.attr("checked")) {
					if (i.addClass("checked"), this._tempSelected.push(n), this._tempSelected.length > this.options.limit) {
						var s = this._tempSelected.shift(),
						o = $("#" + this.getId(s)),
						i = o.prev();
						o.length && (o.attr("checked", !1), i.removeClass("checked"))
					}
				} else {
					if (i.removeClass("checked"), 1 === this._tempSelected.length) return t.attr("checked", !0),
					void i.addClass("checked");
					this._tempSelected.splice($.inArray(n, this._tempSelected), 1)
				}
				this._highlightShortcut()
			}
		},
		_highlightShortcut: function() {
			var e = this.options,
			t = $(".shortcutsButton.selected");
			this._defaultOrder = null,
			t.each(function() {
				$(this).removeClass("selected")
			});
			for (var n in e.extraSelected) if (e.extraSelected.hasOwnProperty(n)) {
				var i = e.extraSelected[n].indicators;
				if (i.length === this._tempSelected.length) {
					var s = !0;
					for (var o in this._tempSelected) if (this._tempSelected.hasOwnProperty(o) && -1 === $.inArray(this._tempSelected[o], i)) {
						s = !1;
						break
					}
					if (s) {
						$('.shortcutsButton[type="' + n + '"]').addClass("selected"),
						"Default" !== n && (this._defaultOrder = e.extraSelected[n].default_order);
						break
					}
				}
			}
		},
		_change: function() {
			var e = $("#" + this.options.containerId);
			this._selected = $.map(this._tempSelected,
			function(e) {
				return e
			}),
			this.options.onchange(this._selected, this._defaultOrder),
			$(".table-indicator", e).hide()
		},
		_selectDefault: function(e) {
			var t = $(e.target),
			n = t.attr("type"),
			i = this.options;
			this._tempSelected = $.map(i.extraSelected[n].indicators,
			function(e) {
				return e
			}),
			this._selectItems(this._tempSelected),
			this._highlightShortcut()
		},
		_bindEvents: function() {
			var e = $("#" + this.options.containerId),
			t = $(".table-indicator", e);
			$(".table-indicator-custom-btn", e).on("click",
			function(e) {
				t.toggle()
			}),
			$(".shortcutsButton", t).on("click", $.proxy(this._selectDefault, this)),
			t.on("click", $.proxy(this._clickOne, this)),
			$("#" + this.getId("Ok")).on("click", $.proxy(this._change, this)),
			$(document).on("click",
			function(e) {
				var n = $(e.target),
				i = n.closest(".table-indicator-custom-btn"),
				s = n.closest(".table-indicator");
				i.length || s.length || t.hide()
			})
		},
		_initSelected: function() {
			var e = this.options;
			this._selected = $.map(e.selected,
			function(e) {
				return e
			}),
			this._tempSelected = $.map(e.selected,
			function(e) {
				return e
			}),
			this._selectItems(this._tempSelected),
			this._highlightShortcut()
		},
		setSelected: function(e) {
			this._selected = $.map(e,
			function(e) {
				return e
			}),
			this._tempSelected = $.map(e,
			function(e) {
				return e
			}),
			this._selectItems(this._tempSelected),
			this._highlightShortcut()
		},
		_selectItems: function(e) {
			for (var t in this._allIds) if (this._allIds.hasOwnProperty(t)) {
				var n = this._allIds[t],
				i = $("#" + this.getId(n)),
				s = i.prev();
				$.inArray(n, e) > -1 ? (i.attr("checked", !0), s.addClass("checked")) : (i.attr("checked", !1), s.removeClass("checked"))
			}
		},
		_cancel: function() {
			this._tempSelected = $.map(this._selected,
			function(e) {
				return e
			});
			for (var e in this._allIds) if (this._allIds.hasOwnProperty(e)) {
				var t = this._allIds[e],
				n = $("#" + this.getId(t)),
				i = n.prev();
				$.inArray(t, this._selected) > -1 ? (n.attr("checked", !0), i.addClass("checked")) : (n.attr("checked", !1), i.removeClass("checked"))
			}
			this._highlightShortcut()
		},
		render: function() {
			var e = $("#" + this.options.containerId);
			e.length && (e.append(this._renderIndicators()), this.options.byGroup || $(".table-indicator-btn ", e).css("padding-left", 20), this._bindEvents(), this._initSelected())
		}
	})
}),
define("component/Indicator", ["require", "exports", "module", "component/ClassBase", "base/util", "underscore"],
function(e) {
	var t = e("component/ClassBase"),
	n = e("base/util"),
	i = e("underscore");
	return t.extend({
		options: {
			indicators: null,
			groups: [1, 2]
		},
		_init: function() {
			var e = this;
			i.map(this.options.indicators,
			function(t) {
				t.format = e._format()
			})
		},
		_format: function() {
			return function(e) {
				if (null == e) return "";
				if (!i.isNumber(e)) return e;
				if (i.isString(this.type)) switch (this.type) {
				case "number":
					return n.formatNumber(e);
				case "ratio":
					return n.formatRatio(e);
				case "time":
					return n.formatTime(e);
				case "time2":
					return n.formatTime(e, 2)
				}
				return e
			}
		},
		map: function(e) {
			var t = this;
			return i.map(e,
			function(e) {
				return i.find(t.options.indicators,
				function(t) {
					return String(e) === String(t.id)
				})
			})
		},
		index: function(e) {
			return i.find(this.options.indexes,
			function(t) {
				return String(e) === String(t.id)
			})
		},
		group: function(e) {
			var t = [];
			return i.each(this.options.groups,
			function(n) {
				t.push(i.filter(e,
				function(e) {
					return e && String(e.group) === String(n)
				}))
			}),
			t
		}
	})
}),
define("component/DataAdapter", ["require", "exports", "module", "component/ClassBase", "base/util", "underscore", "component/Indicator"],
function(e) {
	var t = e("component/ClassBase"),
	n = e("base/util"),
	i = e("underscore"),
	s = e("./Indicator");
	return t.extend({
		options: {
			chartConfig: {
				xAxis: [],
				yAxis: [],
				series: [],
				legend: {
					position: "bottom-center"
				}
			},
			tableConfig: {
				group: !0
			},
			lineChartDayTimeMap: {
				0 : "00:00 - 00:59",
				1 : "01:00 - 01:59",
				2 : "02:00 - 02:59",
				3 : "03:00 - 03:59",
				4 : "04:00 - 04:59",
				5 : "05:00 - 05:59",
				6 : "06:00 - 06:59",
				7 : "07:00 - 07:59",
				8 : "08:00 - 08:59",
				9 : "09:00 - 09:59",
				10 : "10:00 - 10:59",
				11 : "11:00 - 11:59",
				12 : "12:00 - 12:59",
				13 : "13:00 - 13:59",
				14 : "14:00 - 14:59",
				15 : "15:00 - 15:59",
				16 : "16:00 - 16:59",
				17 : "17:00 - 17:59",
				18 : "18:00 - 18:59",
				19 : "19:00 - 19:59",
				20 : "20:00 - 20:59",
				21 : "21:00 - 21:59",
				22 : "22:00 - 22:59",
				23 : "23:00 - 23:59"
			}
		},
		convertTableData: function(e) {
			var t = this,
			n = $.holmes.config.indexInfo.indexes,
			s = i.map(n,
			function(e) {
				return e ? e.id: void 0
			}),
			o = null;
			i.each(e.fields,
			function(e) {
				var t = i.indexOf(s, e);
				t > -1 && (o = n[t])
			});
			var a = $.extend(!0, {},
			$.holmes.config.indexInfo.indicators),
			r = i.map(a,
			function(e) {
				return e.id
			}),
			l = [];
			i.each(e.fields,
			function(e) {
				var t = i.indexOf(r, e);
				t > -1 && l.push(a[t])
			}),
			void 0 === $.holmes.config.indexInfo.indicatorGroups && ($.holmes.config.indexInfo.indicatorGroups = {
				1 : {
					title: "消费指标",
					polymericGroup: 1
				}
			});
			var c = $.extend(!0, {},
			$.holmes.config.indexInfo.indicatorGroups),
			d = [];
			this.options.tableConfig.group ? (i.each(c,
			function(e, t) {
				4 !== e.polymericGroup && d.push(c[t])
			}), c[4] = $.holmes.config.indexInfo.indicatorGroups[4], c[4].title = '<span class="trans-title">转化<a href="javascript:void(0)" class="help" data="trans"></a></span><div id="trans-select-container" class="drop-down-container"></div>', d.push(c[4])) : d = c;
			var u, h = [],
			p = [],
			f = [],
			m = 1,
			g = [],
			v = [];
			o && (u = o.type ? "table-index " + o.type: "table-index", g.push(this.options.tableConfig.group ? [{
				id: o.id,
				name: o.label,
				className: u,
				sortable: o.sortable,
				colspan: 1,
				rowspan: 2
			}] : [{
				id: o.id,
				name: o.label,
				className: u,
				sortable: o.sortable,
				colspan: 1
			}]));
			var b = [],
			y = 0,
			w = 999;
			i.each(d,
			function(e) {
				for (var t = e.polymericGroup,
				n = 0,
				i = [], s = 0; s < l.length; s++) {
					var o = l[s]; + o.group === +t ? (i.push({
						id: o.id,
						label: o.label,
						sortable: o.sortable,
						className: o.type
					}), n++) : void 0 === o.group && (b.push({
						id: o.id,
						label: o.label,
						sortable: o.sortable,
						className: o.type
					}), o.group = w, y++)
				}
				n > 0 && (g.push([{
					colspan: n,
					name: e.title,
					id: t,
					className: "group-name" + t,
					polymericGroup: t
				}]), v.push(i))
			}),
			y > 0 && (g.push([{
				colspan: y,
				name: "自定义group",
				id: w,
				className: "group-name" + w,
				polymericGroup: w
			}]), v.push(b)),
			this.options.tableConfig.group ? h.push(g, v) : h.push([g[0]].concat(v));
			var x = !1,
			_ = !1;
			if (e.items) {
				e.items[2] && e.items[2].length > 0 && (x = !0, m = 3),
				e.items[3] && e.items[3].length > 0 && (_ = !0, m = 4);
				for (var C in e.items[0]) if (e.items[0].hasOwnProperty(C)) {
					var T = e.items[0][C],
					I = e.items[1][C] ? e.items[1][C] : null,
					S = x ? e.items[2][C] : null,
					D = _ ? e.items[3][C] : null,
					k = [],
					L = [],
					N = [],
					E = [],
					j = [],
					M = [],
					A = [],
					q = [];
					if (o) {
						if (u = o.type ? "table-index " + o.type: "table-index", i.isObject(T[0])) {
							var O = {
								id: o.id,
								label: T[0].label || T[0].name,
								className: u
							};
							null !== T[0].expandable && (O.expandable = T[0].expandable),
							null !== T[0].hasOperation && (O.hasOperation = T[0].hasOperation),
							null !== T[0].data && (O.data = T[0].data)
						} else O = {
							id: o.id,
							label: T[0],
							className: u
						};
						j.push(O),
						x && I && (M.push({
							id: o.id,
							label: I[0],
							className: u
						}), q.push({
							id: o.id,
							label: S[0],
							className: u
						}), _ && A.push({
							id: o.id,
							label: D[0],
							className: u
						}))
					}
					k.push(j),
					x && (L.push(M), N.push(q), _ && E.push(A)),
					i.each(g,
					function(e) {
						if (e = e[0], e.polymericGroup) {
							for (var n = [], i = [], s = [], o = [], a = 0; a < l.length; a++) {
								var r = l[a]; + r.group === +e.id && (!x && I ? n.push({
									id: r.id,
									label: t._formatTableText(I[a], r.type),
									className: r.type
								}) : I && (n.push({
									label: "&nbsp;",
									className: "",
									id: ""
								}), i.push({
									id: r.id,
									label: t._formatTableText(I[a + 1], r.type),
									className: r.type
								}), s.push({
									id: r.id,
									label: t._formatTableText(S[a + 1], r.type),
									className: r.type
								}), _ && o.push({
									id: r.id,
									label: t._formatTableText(D[a + 1], "ratio"),
									className: r.type
								})))
							}
							k.push(n),
							L.push(i),
							N.push(s),
							E.push(o)
						}
					}),
					p.push(k),
					x && (p.push(L), p.push(N), _ && p.push(E))
				}
			}
			if (e.pageSum && e.pageSum.length > 0 && (I = e.pageSum[0], S = x ? e.pageSum[1] : null, D = _ ? e.pageSum[2] : null, k = [], L = [], N = [], E = [], o && (k.push([{
				id: o.id,
				label: "当前汇总",
				className: "summary",
				colspan: 1
			}]), x && (L.push([{
				id: o.id,
				label: I[0],
				className: u
			}]), N.push([{
				id: o.id,
				label: S[0],
				className: u
			}]), _ && E.push([{
				id: o.id,
				label: D[0],
				className: u
			}]))), i.each(g,
			function(e) {
				if (e = e[0], e.polymericGroup) {
					for (var n = [], i = [], s = [], o = [], a = 0; a < l.length; a++) {
						var r = l[a]; + r.group === +e.id && (!x && I ? n.push({
							id: r.id,
							label: t._formatTableText(I[a], r.type),
							className: r.type
						}) : I && (n.push({
							label: "&nbsp;",
							className: "no-group"
						}), i.push({
							id: r.id,
							label: t._formatTableText(I[a + 1], r.type),
							className: r.type
						}), s.push({
							id: r.id,
							label: t._formatTableText(S[a + 1], r.type),
							className: r.type
						}), _ && o.push({
							id: r.id,
							label: t._formatTableText(D[a + 1], "ratio"),
							className: r.type
						})))
					}
					k.push(n),
					L.push(i),
					N.push(s),
					E.push(o)
				}
			}), f.push(k), x && (f.push(L), f.push(N), _ && f.push(E))), e.sum && e.sum.length > 0) for (var H = 0; H < l.length; H++) {
				var P = l[H];
				e.sum[0][H] = t._formatTableText(e.sum[0][H], P.type),
				e.sum[1] && e.sum[1].length > 0 && (e.sum[1][H] = t._formatTableText(e.sum[1][H], P.type))
			}
			return e.thead = h,
			e.tbody = p,
			e.tfoot = f,
			e.group = m,
			e.indicators = l,
			e.groupName = g,
			e.isCompare = x,
			e
		},
		convertSingleTableData: function(e) {
			return this.options.tableConfig.group = !1,
			this.convertTableData(e)
		},
		convertCommonTableData: function(e) {
			return this.convertCommonTableData(e)
		},
		convertCommonFlashData: function(e) {
			return this.convertCommonTableData(e, "flash")
		},
		convertCommonTableData: function(e, t) {
			var n = $.holmes.config.indexInfo.indexes,
			i = "flash" === t ? $.holmes.config.indexInfo.flashIndicators: $.holmes.config.indexInfo.indicators,
			s = e.fields,
			o = e.items,
			a = $.extend(!0, [], s),
			r = o[0].length > 0;
			if (r) for (var l = o[0], c = 0; c < l.length; c++) for (var d = 0; d < n.length; d++) if (n[d].id === s[0]) {
				a[0] = n[d].label,
				l[c] = this._formatTableText(l[c], n[d].type);
				break
			}
			var c = r ? 1 : 0;
			for (c; c < s.length; c++) for (var u = s[c], d = 0; d < i.length; d++) {
				var h = i[d];
				if (h.id === u) {
					a[c] = h.label;
					for (var p = 0; p < o[1].length; p++) {
						var f = r ? c - 1 : c;
						o[1][p][f] = this._formatTableText(o[1][p][f], h.type)
					}
					break
				}
			}
			return e.labels = a,
			e
		},
		convertFlashAreaDataFormat: function(e) {
			return this.convertFlashBarDataFormatBase(e, !0)
		},
		convertTransFlashLineDataFormat: function(e) {
			var t = $.extend(!0, {},
			this.options.chartConfig),
			n = this.parseTransChartData(e);
			return t = this.buildChartCategoryAxis(t, n, e),
			t = this.buildChartValueAxis(t, n, e),
			t = this.buildTransChartSeries(t, n, e),
			t = this.buildTransChartTooltip(t, n, e),
			t = this.buildTransChartLegend(t, n, e)
		},
		convertFlashLinePieDataFormat: function(e) {
			var t = e.flashId,
			n = e.line,
			s = n.fields,
			o = n.items,
			a = e.pie,
			r = (a.fields, a.items),
			l = [],
			c = ["label"],
			d = [],
			u = o[0],
			h = o[1];
			if (null == u || 0 === u.length || null == h || 0 === h.length) return void this.showErrorTip(t);
			for (var p = 1,
			f = s.length; f > p; p++) c.push(s[p]);
			i.each(u,
			function(e, t) {
				d.push(e.concat(h[t]))
			}),
			this.adjuestHourlyDisplay(e, d);
			var m = ["label", "value"],
			g = [],
			v = r[0],
			h = r[1];
			i.each(v,
			function(e, t) {
				g.push(e.concat(h[t]))
			});
			var b = {
				flashId: t,
				type: e.type,
				units: this.getUnits([e.indicator]),
				highlightIndexs: l,
				indicator: this.getIndicatorLabel(e.indicator),
				bar: e.bar,
				line: {
					fields: c,
					items: d
				},
				pie: {
					fields: m,
					items: g
				}
			};
			return b
		},
		convertFlashBarDataFormat: function(e) {
			return this.convertFlashBarDataFormatBase(e, !1)
		},
		convertFlashBarDataFormatBase: function(e, t) {
			var n = $.extend(!0, {},
			this.options.chartConfig),
			i = this.parseChartData(e);
			return n = this.buildChartCategoryAxis(n, i, e),
			n = this.buildChartValueAxis(n, i, e),
			n = this.buildChartSeries(n, i, e, t),
			n = this.buildChartTooltip(n, i, e),
			n = this.buildChartLegend(n, i, e)
		},
		buildChartCategoryAxis: function(e, t, n) {
			this.adjuestHourlyDisplay(n, t.category);
			var i = {
				type: "category",
				axisLabel: {
					margin: 15
				},
				data: t.category
			};
			return e.xAxis.push(i),
			e
		},
		buildChartValueAxis: function(e, t, n) {
			var s = this,
			o = {
				type: "value",
				axisTick: !1,
				axisLine: !1
			},
			a = t.units,
			r = ["left", "right"];
			return i.each(a,
			function(t, n) {
				if (n > 1) return - 1;
				var i = $.extend(!0, {
					position: r[n]
				},
				o),
				a = /百分比|%/.test(t) ? "": t;
				i.axisLabel = {
					dataType: s.getDataType(t),
					format: "{value}" + a
				},
				e.yAxis.push(i)
			}),
			e
		},
		buildTransChartSeries: function(e, t, n) {
			var s = this,
			o = 0,
			a = t.units;
			return t.isCompare ? i.each(t.series,
			function(t) {
				var r = i.indexOf(a, t.unit);
				o = -1 === r ? 1 : r + 1,
				o = o > 2 ? 1 : o,
				e.series.push($.extend(!0, {
					dataType: s.getDataType(t.unit),
					type: n.type,
					yAxis: o
				},
				t))
			}) : i.each(t.series,
			function(t) {
				var r = i.indexOf(a, t.unit);
				o = -1 === r ? 1 : r + 1,
				o = o > 2 ? 1 : o,
				e.series.push($.extend(!0, {
					dataType: s.getDataType(t.unit),
					type: n.type,
					yAxis: o
				},
				t))
			}),
			e
		},
		buildChartSeries: function(e, t, n, s) {
			var o = this,
			a = 0,
			r = t.units;
			if (t.isCompare) {
				var l = ["#4fa8f9", "#6ec71e", "#f56e6a", "#fc8b40", "#818af8", "#31c9d7", "#f35e7a", "#ab7aee", "#14d68b", "#edb00d"],
				c = ["#b9dcfd", "#c5e9a5", "#fbc5c3", "#fed1b3", "#cdd0fc", "#ade9ef", "#fabfca", "#ddcaf8", "#a1efd1", "#f8df9e"];
				i.each(t.flashFields,
				function(d, u) {
					for (var h = l[u], p = c[u], f = !1, m = 0; m < t.series.length; m++) {
						var g = t.series[m];
						if (g.fieldId === d) {
							var v = i.indexOf(r, g.unit);
							a = -1 === v ? 1 : v + 1,
							a = a > 2 ? 1 : a;
							var b = $.extend(!0, {
								dataType: o.getDataType(g.unit),
								type: n.type,
								yAxis: a,
								color: f ? p: h
							},
							g);
							s && !f && (b.isArea = !0),
							e.series.push(b),
							f = !0
						}
					}
				})
			} else i.each(t.series,
			function(t, l) {
				var c = i.indexOf(r, t.unit);
				a = -1 === c ? 1 : c + 1,
				a = a > 2 ? 1 : a;
				var d = $.extend(!0, {
					dataType: o.getDataType(t.unit),
					type: n.type,
					yAxis: a
				},
				t);
				s && (d.isArea = !0),
				e.series.push(d)
			});
			return e
		},
		parseTransChartData: function(e) {
			var t = [["#4fa8f9", "#6ec71e", "#f56e6a", "#fc8b40", "#818af8", "#31c9d7", "#f35e7a", "#ab7aee", "#14d68b", "#edb00d"], ["#b9dcfd", "#c5e9a5", "#fbc5c3", "#fed1b3", "#cdd0fc", "#ade9ef", "#fabfca", "#ddcaf8", "#a1efd1", "#f8df9e"]],
			n = this,
			o = {};
			o.isCompare = e.timeSpan && e.timeSpan.length > 1 || e.compare_items && e.compare_items.length > 1,
			o.indicator = e.indicator && e.indicator.split(",") || [],
			o.indicatorLabels = this.getIndicatorLabel(o.indicator),
			o.timeSpan = e.timeSpan || [],
			o.compareItems = e.compare_items || [],
			o.units = this.getUnits(e.fields, o.isCompare),
			o.category = [],
			i.each(e.items[0],
			function(e, t) {
				var n = i.indexOf(e[0], "与");
				n > -1 && (e[0] = e[0].substring(0, n)),
				o.category.push(e[0])
			});
			for (var a = [], r = [], l = new s({
				indicators: $.holmes.config.indexInfo.flashIndicators
			}), c = l.map(e.fields), d = 1, u = c.length; u > d; d++) c[d] && (a.push(c[d].id), r.push(c[d].label));
			o.flashFields = a,
			o.flashFieldLabels = e.flashFieldLabels || r;
			var h = !1,
			p = !1,
			f = !1;
			return - 1 !== i.indexOf(e.fields, "time") && (h = !0),
			e.compare_items && e.compare_items.length > 0 && (p = !0),
			a.length > 1 && (f = !0),
			o.hasTimeCompare = h,
			o.hasTargetCompare = p,
			o.hasIndicatorCompare = f,
			o.series = [],
			o.isCompare ? (i.each(o.timeSpan,
			function(e, s) {
				p ? i.each(o.compareItems,
				function(r, l) {
					i.each(o.flashFields,
					function(c, d) {
						var u, p = "",
						m = r,
						g = "";
						h && (p = e, u = t[s][l]),
						f && (g = o.flashFieldLabels[d], u = t[l][d]),
						o.series.push({
							name: i.isArray(e) ? e.join("") : String(e),
							timeInfo: e,
							targetInfo: r,
							legendName: p + m + g,
							fieldId: c,
							data: [],
							unit: n.getUnits([a[d]])[0],
							color: u
						})
					})
				}) : i.each(o.flashFields,
				function(r, l) {
					var c, d = "",
					u = "";
					h && (d = e, c = t[s][l]),
					f && (u = o.flashFieldLabels[l], c = t[s][l]),
					o.series.push({
						name: i.isArray(e) ? e.join("") : String(e),
						timeInfo: e,
						fieldId: r,
						legendName: d + u,
						data: [],
						unit: n.getUnits([a[l]])[0],
						color: c
					})
				})
			}), o.timeSpan.length > 1 ? i.each(o.timeSpan,
			function(t, n) {
				i.each(e.items[n + 1],
				function(t) {
					i.each(t,
					function(t, i) {
						0 !== i && o.series[n * (e.items[n + 1][0].length - 1) + (i - 1)].data.push(t)
					})
				})
			}) : i.each(e.items[1],
			function(e) {
				i.each(e,
				function(e, t) {
					o.series[t].data.push(e)
				})
			})) : (i.each(o.flashFieldLabels,
			function(e, t) {
				o.series[t] = {
					name: i.isArray(e) ? e.join("") : String(e),
					data: [],
					unit: n.getUnits([a[t]])[0]
				}
			}), i.each(e.items[1],
			function(e, t) {
				var n = 0;
				i.each(e,
				function(e, t) {
					o.series[n].data.push(e),
					n++
				})
			})),
			o.rawData = e,
			o
		},
		parseChartData: function(e) {
			var t = this,
			n = {};
			n.indicator = e.indicator && e.indicator.split(",") || [],
			n.indicatorLabels = this.getIndicatorLabel(n.indicator),
			n.isCompare = e.items[2] && 0 !== e.items[2].length,
			n.units = this.getUnits(e.fields, n.isCompare),
			n.category = [],
			i.each(e.items[0],
			function(e, t) {
				n.category.push(e[0])
			});
			for (var o = [], a = [], r = [], l = new s({
				indicators: $.holmes.config.indexInfo.flashIndicators
			}), c = l.map(e.fields), d = 1, u = c.length; u > d; d++) c[d] ? (o.push(c[d].id), a.push(c[d].label)) : /^ratio/i.test(e.fields[d]) && r.push(d - 1);
			if (n.flashFields = o, n.flashFieldLabels = e.flashFieldLabels || a, n.series = [], n.isCompare) {
				var h = e.items[1],
				p = e.items[2];
				n.timeSpan = e.timeSpan || [],
				i.each(n.timeSpan,
				function(e, s) {
					i.each(n.flashFields,
					function(a, r) {
						n.series[s * n.flashFields.length + r] = {
							name: i.isArray(e) ? e.join("") : String(e),
							timeInfo: e,
							fieldId: a,
							data: [],
							unit: t.getUnits([o[r]])[0]
						}
					})
				}),
				i.each(h,
				function(e, t) {
					var s = 0;
					i.each(e,
					function(e, t) {
						return 0 === t ? void s++:void( - 1 === i.indexOf(r, t) ? n.series[t - s].data.push(e) : s = t)
					})
				}),
				i.each(p,
				function(e, t) {
					var s = 0;
					i.each(e,
					function(e, t) {
						return 0 === t ? void s++:void( - 1 === i.indexOf(r, t) ? n.series[n.flashFields.length + t - s].data.push(e) : s = t)
					})
				})
			} else i.each(n.flashFieldLabels,
			function(e, s) {
				n.series[s] = {
					name: i.isArray(e) ? e.join("") : String(e),
					data: [],
					unit: t.getUnits([o[s]])[0]
				}
			}),
			i.each(e.items[1],
			function(e, t) {
				var s = 0;
				i.each(e,
				function(e, t) { - 1 === i.indexOf(r, t) && (n.series[s].data.push(e), s++)
				})
			});
			return n
		},
		buildTransChartTooltip: function(e, t) {
			var s = "● ",
			o = t.rawData,
			a = t.hasTimeCompare,
			r = t.hasTargetCompare,
			l = t.hasIndicatorCompare,
			c = t.flashFieldLabels,
			d = hmcharts.resources.holidayInfo.isHoliday,
			u = {
				timeLabels: [[], []],
				targetLabels: [],
				indicatorLabels: []
			},
			h = o.items[1],
			p = o.items[2];
			a ? (i.each(h,
			function(e) {
				var t = e[0];
				d(t) && (t = t + "(" + d(t) + ")"),
				u.timeLabels[0].push(t)
			}), i.each(p,
			function(e) {
				var t = e[0];
				d(t) && (t = t + "(" + d(t) + ")"),
				u.timeLabels[1].push(t)
			})) : i.each(o.items[0],
			function(e) {
				u.timeLabels[0].push(e[0])
			}),
			r && (u.targetLabels = o.compare_items),
			u.indicatorLabels = c;
			var f = [];
			a ? (f.push("time"), r && f.push("target"), l && f.push("indicator")) : r ? (f.push("target"), l && f.push("indicator")) : l && f.push("indicator");
			var m = {};
			return t.isCompare ? m.formatter = function(e, t, o, a) {
				var r = [],
				l = o[a];
				e.length > 0 && e[0].category && e[0].category[a] && (l = e[0].category[a]),
				l = i.isObject(l) ? l.tipLabel: l;
				var c, d, h, p = f.length;
				if (1 === p) {
					r.push('<div class="hm-charts-tooltip-header">'),
					"time" === f[0] ? (h = "时间", c = u.timeLabels, d = u.indicatorLabels[0]) : "target" === f[0] ? (h = l, c = u.targetLabels, d = u.indicatorLabels[0]) : "indicator" === f[0] && (h = l, c = u.indicatorLabels, d = ""),
					r.push('<span class="hm-charts-tooltip-header-category">' + h + "</span>"),
					r.push('<span class="hm-charts-tooltip-header-indicator">' + d + "</span>"),
					r.push("</div>"),
					r.push('<div class="hm-charts-tooltip-body">');
					for (var m = 0; m < t.length; m++) if (!e[m].isHidden) {
						var g, v = t[m];
						g = i.isArray(c[m]) ? c[m][a] : c[m];
						var b = "--";
						"--" !== v.data[a] && (b = n.formatData(v.data[a], v.dataType));
						var y = e[m] && e[m].color || "#000";
						v.tooltip && v.tooltip.valueSuffix && (b += v.tooltip.valueSuffix),
						r.push('<p class="hm-charts-tooltip-item"><span class="hm-charts-tooltip-item-icon" style="color:' + y + '">' + s + '</span><span class="hm-charts-tooltip-item-label">' + g + ' </span><span class="hm-charts-tooltip-item-value">' + b + "</span></p>")
					}
					r.push("</div>")
				} else {
					"time" === f[0] ? (l = u.timeLabels, "indicator" === f[1] ? (d = "", c = u.indicatorLabels) : "target" === f[1] && (d = u.indicatorLabels[0], c = u.targetLabels)) : "target" === f[0] && (l = u.targetLabels, d = "", c = u.indicatorLabels);
					for (var m = 0; p > m; m++) {
						h = i.isArray(l[m]) ? l[m][a] : l[m],
						r.push('<div class="hm-charts-tooltip-header ' + (0 === m ? "first": "") + '">'),
						r.push('<span class="hm-charts-tooltip-header-category">' + h + "</span>"),
						r.push('<span class="hm-charts-tooltip-header-indicator">' + d + "</span>"),
						r.push("</div>"),
						r.push('<div class="hm-charts-tooltip-body">');
						for (var w = m * p; m * p + p > w; w++) if (!e[w].isHidden) {
							var g, v = t[w];
							g = i.isArray(c[m]) ? c[w - m * p][a] : c[w - m * p];
							var b = "--";
							"--" !== v.data[a] && (b = n.formatData(v.data[a], v.dataType));
							var y = e[w] && e[w].color || "#000";
							v.tooltip && v.tooltip.valueSuffix && (b += v.tooltip.valueSuffix),
							r.push('<p class="hm-charts-tooltip-item"><span class="hm-charts-tooltip-item-icon" style="color:' + y + '">' + s + '</span><span class="hm-charts-tooltip-item-label">' + g + ' </span><span class="hm-charts-tooltip-item-value">' + b + "</span></p>")
						}
						r.push("</div>")
					}
				}
				return r.join("")
			}: delete m.formatter,
			e.tooltip = m,
			e
		},
		buildChartTooltip: function(e, t, s) {
			var o = function(e) {
				var t, n = {
					line: "● ",
					square: "■ ",
					circle: "● ",
					defaults: "● "
				};
				switch (e) {
				case "bar":
					t = n.square;
					break;
				case "stack-bar":
					t = n.square;
					break;
				case "area":
					t = n.square;
					break;
				case "circle":
					t = n.circle;
					break;
				case "square":
					t = n.square;
					break;
				case "line":
					t = n.line;
					break;
				default:
					t = n.defaults
				}
				return t
			},
			a = {};
			return t.isCompare ? a.formatter = function(e, s, a, r) {
				var l = [],
				c = a[r];
				e.length > 0 && e[0].category && e[0].category[r] && (c = e[0].category[r]),
				c = i.isObject(c) ? c.tipLabel: c;
				for (var d = t.flashFields,
				u = t.flashFieldLabels,
				h = 0; h < u.length; h++) {
					l.push('<div class="hm-charts-tooltip-header ' + (0 === h ? "first": "") + '">'),
					l.push('<span class="hm-charts-tooltip-header-category">' + c + "</span>"),
					l.push('<span class="hm-charts-tooltip-header-indicator">' + u[h] + "</span>"),
					l.push("</div>"),
					l.push('<div class="hm-charts-tooltip-body">');
					for (var p = 0; p < s.length; p++) if (!e[p].isHidden && s[p].fieldId === d[h]) {
						var f = s[p],
						m = "--";
						"--" !== f.data[r] && (m = n.formatData(f.data[r], f.dataType));
						var g = e[p] && e[p].color || "#000";
						f.tooltip && f.tooltip.valueSuffix && (m += f.tooltip.valueSuffix),
						l.push('<p class="hm-charts-tooltip-item"><span class="hm-charts-tooltip-item-icon" style="color:' + g + '">' + o(e[p].type || "line") + '</span><span class="hm-charts-tooltip-item-label">' + f.name + ' </span><span class="hm-charts-tooltip-item-value">' + m + "</span></p>")
					}
					l.push("</div>")
				}
				return l.join("")
			}: delete a.formatter,
			e.tooltip = a,
			e
		},
		buildTransChartLegend: function(e, t, n) {
			e.legend = e.legend || {};
			var s = this;
			return e.legend.nameFormatter = function(t, n) {
				var o = t.name;
				if (e.series[n].legendName) o = e.series[n].legendName;
				else {
					var a = e.series[n] && e.series[n].fieldId,
					r = s.getIndicatorLabel(a);
					r && i.isArray(r) && r.length && (o += r.join(""))
				}
				return o
			},
			e
		},
		buildChartLegend: function(e, t, n) {
			var s = this;
			return e.legend = e.legend || {},
			e.legend.nameFormatter = function(t, n) {
				var o = t.name + " ",
				a = e.series[n] && e.series[n].fieldId,
				r = s.getIndicatorLabel(a);
				return r && i.isArray(r) && r.length && (o += r.join("")),
				o
			},
			e
		},
		getDataType: function(e) {
			switch (e) {
			case "%":
				return "ratio";
			case "百分比":
				return "ratio";
			case "时长":
				return "time";
			default:
				return "number"
			}
		},
		getIndicatorLabel: function(e) {
			if (e) {
				e = i.isArray(e) ? e: [e];
				var t = [];
				return i.each(e,
				function(e) {
					var n = i.find($.holmes.config.indexInfo.flashIndicators,
					function(t) {
						return String(e) === String(t.id)
					});
					n && t.push(n.label)
				}),
				t
			}
		},
		getUnits: function(e, t) {
			var n = i.map(e,
			function(e) {
				return i.find($.holmes.config.indexInfo.flashIndicators,
				function(t) {
					return String(e) === String(t.id)
				})
			}),
			s = [];
			return i.each(n,
			function(e) {
				if (e) {
					var t = e.unit; - 1 === i.indexOf(s, t) && s.push(t)
				}
			}),
			s
		},
		showErrorTip: function(e, t) {},
		adjuestHourlyDisplay: function(e, t) {
			if ("hour" === e.by) {
				var n = this.options.lineChartDayTimeMap;
				i.each(t,
				function(e, s) {
					if (s === t.length - 1) {
						var o = {
							categoryLabel: s + "/点"
						};
						i.isArray(e) ? (o.tipLabel = void 0 !== n[e[0]] ? n[e[0]] : e[0], e[0] = o) : (o.tipLabel = void 0 !== n[e] ? n[e] : e, t[s] = o)
					} else {
						var o = {
							categoryLabel: s
						};
						i.isArray(e) ? (o.tipLabel = void 0 !== n[e[0]] ? n[e[0]] : e[0], e[0] = o) : (o.tipLabel = void 0 !== n[e] ? n[e] : e, t[s] = o)
					}
				})
			}
		},
		_formatTableText: function(e, t) {
			if (null === e) return "";
			if ("--" === e || "未知" === e || "正在访问" === e) return e;
			if (i.isString(t)) switch (t) {
			case "number":
				return n.formatNumber(e);
			case "ratio":
				return n.formatRatio(e);
			case "time":
				return n.formatTime(e);
			case "time2":
				return n.formatTime(e, 2);
			default:
				return e
			}
			return e
		},
		formatText: function(e, t) {
			return this._formatTableText(e, t)
		},
		convertFlashCircleGraphDataFormat: function(e) {
			var t = e.flashId,
			n = (e.fields, e.items),
			s = ["label", "dataB", "dataL", "dataR"],
			o = [],
			a = n[0],
			r = n[1];
			return null == a || 0 === a.length || null == r || 0 === r.length ? void 0 : (i.each(a,
			function(e, t) {
				o.push(e.concat(r[t]))
			}), {
				flashId: t,
				fields: s,
				items: o,
				type: e.type
			})
		}
	})
}),
define("component/Combobox", ["require", "exports", "module", "component/UIBase", "underscore", "base/util"],
function(e) {
	var t = e("./UIBase"),
	n = e("underscore"),
	i = e("../base/util");
	return t.extend({
		_type: "combobox",
		options: {
			containerId: null,
			items: null,
			selectedId: null,
			defaultText: "请选择",
			label: "",
			width: 200,
			onchange: function(e) {},
			comboboxTemplate: ['<a class="combobox" href="javascript:void(0)" id="#{1}" layer="##{2}">', '<span title="!{0}" class="text">#{3}!{0}</span><span class="arrow"></span></a>'].join(""),
			itemTemplate: ['<li class="#{3}"><a title="!{0}" href="javascript:void(0)" data="#{1}" class="#{2}">!{0}</a></li>'].join(""),
			wrapperTemplate: ['<ul class="options layer hm-scroll hm-select-layer" ', 'style="display:none;position:absolute;width:#{2}px" id="#{1}">#{0}</ul>'].join("")
		},
		_init: function() {
			this._selectedId = this.options.selectedId,
			this._items = this.options.items,
			this._defaultText = this.options.defaultText
		},
		_selectedId: null,
		_items: null,
		_defaultText: null,
		_bindEvents: function() {
			var e = this,
			t = $("#" + this.getId("List") + ">li>a"),
			s = $("#" + this.getId("List") + ">li");
			t.on("click",
			function() {
				var t = $(this).attr("data"),
				o = "LI" !== $(this)[0].tagName ? $(this).closest("li") : $(this);
				s.removeClass("selected"),
				o.addClass("selected");
				var a = n.findIndex(e._items,
				function(e) {
					return String(e.id) === t
				}),
				r = e._items[a],
				l = $("#" + e.getId()).find(".text").first();
				l.length && (l.html(i.format("!{0}", e.options.label ? e.options.label + "：" + r.label: r.label)), l.attr("title", r.label)),
				e._hide(),
				e.options.onchange(t)
			}),
			$("#" + this.getId()).on("click",
			function() {
				if (!$(this).hasClass("combobox-disabled")) {
					var t = $(this).find(".arrow").first();
					t.hasClass("selected") || e._show()
				}
			})
		},
		_show: function() {
			var e = $.holmes.getCornerPosition(this.getId(), "bl");
			$.holmes.setPosition(this.getId("List"), e)
		},
		_hide: function() {
			var e = $("#" + this.getId()).find(".arrow").first();
			e.hasClass("selected") && e.removeClass("selected"),
			$("#" + this.getId("List")).hide()
		},
		_render: function() {
			var e = this._defaultText;
			if (this._items && this._items.length > 0 && (e = this._items[0].label, this._selectedId)) for (var t in this._items) if (this._items.hasOwnProperty(t)) {
				var n = this._items[t];
				if (String(n.id) === String(this._selectedId)) {
					e = n.label;
					break
				}
			}
			if ($("#" + this.options.containerId).append(i.format(this.options.comboboxTemplate, e, this.getId(), this.getId("List"), this.options.label ? this.options.label + "：": "")), this._items && this._items.length > 0) {
				$("#" + this.getId()).removeClass("combobox-disabled");
				for (var s = [], t = 0; t < this._items.length; t++) {
					var n = this._items[t],
					o = n.disabled ? "disabled": "",
					a = String(n.id) === String(this._selectedId) ? "selected": "";
					s.push(i.format(this.options.itemTemplate, n.label, n.id, o, a))
				}
				$(document.body).append(i.format(this.options.wrapperTemplate, s.join(""), this.getId("List"), this.options.width))
			} else $("#" + this.getId()).addClass("combobox-disabled")
		},
		setDefaultText: function(e) {
			this._defaultText = e
		},
		render: function(e, t) {
			0 !== $("#" + this.options.containerId).length && ((e || null === e) && (this._items = e), (t || null === t) && (this._selectedId = t), $("#" + this.options.containerId).empty(), $("#" + this.getId("List")).length && $("#" + this.getId("List")).remove(), this._render(), this._bindEvents())
		}
	})
}),
define("component/Webpage", ["require", "exports", "module", "base/util", "base/base", "base/eventEmitter", "component/UIBase", "component/ClassBase", "component/DocumentReady", "component/TimeSpan", "component/ToggleTarget", "component/TrackTarget", "component/RecordTarget", "component/Guide", "component/Download", "component/SendReport", "component/DropDownList", "component/CustomSelect", "component/SelectGroup", "component/CustomRadio", "component/Search", "component/ShortDate", "component/DateController", "component/DateCompare", "component/Table", "component/SiteSummary", "component/FuzzyQuery", "component/Operations", "component/Summary", "component/ProSummary", "component/Paging", "component/Tabs", "component/LinePie", "component/BarLinePie", "component/FlashIndicator", "component/TableIndicator", "component/DataAdapter", "component/Combobox", "component/Tip", "component/Indicator"],
function(e) {
	var t = e("base/util"),
	n = (e("base/base"), e("base/eventEmitter")),
	i = (e("component/UIBase"), e("component/ClassBase"), e("component/DocumentReady"), e("component/TimeSpan")),
	s = e("component/ToggleTarget"),
	o = e("component/TrackTarget"),
	a = e("component/RecordTarget"),
	r = e("component/Guide"),
	l = e("component/Download"),
	c = e("component/SendReport"),
	d = e("component/DropDownList"),
	u = (e("component/CustomSelect"), e("component/SelectGroup")),
	h = e("component/CustomRadio"),
	p = e("component/Search"),
	f = e("component/ShortDate"),
	m = e("component/DateController"),
	g = e("component/DateCompare"),
	v = e("component/Table"),
	b = e("component/SiteSummary"),
	y = e("component/FuzzyQuery"),
	w = e("component/Operations"),
	x = e("component/Summary"),
	C = e("component/ProSummary"),
	T = e("component/Paging"),
	I = (e("component/Tabs"), e("component/LinePie")),
	S = e("component/BarLinePie"),
	D = e("component/FlashIndicator"),
	k = e("component/TableIndicator"),
	L = e("component/DataAdapter"),
	N = e("component/Combobox"),
	E = (e("component/Tip"), e("component/Indicator"));
	return function(e) {
		$.extend(!0, this, {
			components: [],
			_init: function() {
				$.extend(!0, this, this.options),
				$.extend(!0, this, $.holmes.config),
				n.setOwner(this),
				n.trigger("onbeforeInit"),
				this.initComponents(this.components),
				n.setOwner(this),
				n.trigger("oninit")
			},
			on: function(e, t) {
				n.register(e, t)
			},
			fire: function(e) {
				n.setOwner(this),
				n.trigger.apply(n, arguments)
			},
			initComponents: function(e) {
				var n, i, s = [],
				o = !1,
				a = !1,
				r = this;
				for (var l in e) if (e.hasOwnProperty(l)) {
					var c = e[l],
					d = null,
					u = null,
					h = null;
					t.isString(c) ? (d = c, h = d) : (d = c.type, u = c.options, h = c.id ? c.id: d),
					"Chart" === d && (o = !0, n = +l),
					"Table" === d && (a = !0, i = +l),
					s.push({
						id: h,
						type: d,
						options: u
					})
				}
				if (o && a) {
					var p = $.extend(!0, {},
					s[n]);
					n > i && (s[n] = $.extend(!0, {},
					s[i]), s[i] = p)
				}
				_.each(s,
				function(e) {
					var t = e.type,
					n = e.id,
					i = e.options,
					s = "_init" + t;
					"_init" !== s && $.isFunction(r[s]) && r[s]({
						id: n,
						type: t,
						options: i
					}),
					$.isFunction(r["on" + n + "Initialized"]) && r["on" + n + "Initialized"]()
				})
			},
			_getEventName: function(e, t) {
				return t ? t + e: "onchange" + e
			},
			_initChart: function(e) {
				this.initChart = !0;
				var n = e.options || {},
				i = n.type || "series",
				s = n.containerId || e.id;
				n.height && $(s).css("height", n.height),
				n.width && $(s).css("height", n.width);
				var o = {
					xAxis: [],
					yAxis: [],
					series: [],
					canvasLayout: {
						margin: [130, 90, 30, 90]
					},
					legend: {
						selectable: !1
					}
				},
				a = /bar|line/.test(i) ? "series": i,
				r = $.extend(!0, $.extend(!0, {},
				o), n);
				if (e.options.noDataMsg) r.noDataMsg = e.options.noDataMsg;
				else {
					var l;
					if (this.siteInfo && (!this.userInfo.roles || !this.userInfo.roles.ico)) {
						l = this.siteInfo.isMultipleSite ? '暂无数据,请确认<a href="#{url}" target="_blank">代码安装</a>，或站点选择是否正确。': '本站点的id是#{signature}，请确认<a href="#{url}" target="_blank">代码安装</a>，或站点选择是否正确。';
						var c = {
							signature: this.siteInfo.signature || this.siteInfo.belongSiteSignature,
							url: "http://tongji.baidu.com/web/help/article?id=93&type=0"
						};
						r.noDataMsg = t.format(l, c)
					}
				}
				this[e.id] = hmcharts.create(hmcharts[a], r, r)
			},
			_initLinePie: function(e) {
				var t = this;
				this[e.id] = new I($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initBarLinePie: function(e) {
				var t = this;
				this[e.id] = new S($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initTimeSpan: function(e) {
				var t = this;
				this[e.id] = new i($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initToggleTarget: function(e) {
				var t = this;
				this[e.id] = new s($.extend({
					data: t.memo,
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initTrackTarget: function(e) {
				var t = this;
				this[e.id] = new o($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initRecordTarget: function(e) {
				var t = this;
				this[e.id] = new a($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initDownload: function(e) {
				var n = this;
				this[e.id] = new l($.extend({
					trigerId: "download-report",
					reportId: this.pageInfo.id,
					siteId: this.siteInfo.id,
					url: t.format("#{0}/download/fetch?", this.systemConfig.baseUri),
					ajaxUri: this.systemConfig.ajaxUri,
					reportTitle: this.pageInfo.title,
					onchange: function(t) {
						n.fire(n._getEventName(e.id), t)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initSendReport: function(e) {
				var t = this;
				this[e.id] = new c($.extend({
					trigerId: "send-report",
					url: this.systemConfig.ajaxUri,
					method: "home/reportsend/add",
					reportId: this.pageInfo.id,
					siteId: this.siteInfo.id,
					reportTitle: this.pageInfo.title,
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initGuide: function(e) {
				var t = this;
				this[e.id] = new r($.extend({
					onsuccess: function(n) {
						t.fire(t._getEventName(e.id, "onsuccess"), n)
					},
					onclose: function() {
						t.fire(t._getEventName(e.id, "onclose"));

					}
				},
				e.options))
			},
			_initAreas: function(e) {
				var t = this;
				this[e.id] = new d($.extend({
					containerId: "Areas",
					label: "地域",
					items: this.areaList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initClientDevices: function(e) {
				var t = this;
				this[e.id] = new h($.extend({
					containerId: "ClientDevices",
					label: "设备",
					limit: 1,
					selectedItems: void 0 !== this.pageInfo.clientDevice ? [this.pageInfo.clientDevice] : ["all"],
					items: this.clientDeviceList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initSources: function(e) {
				var t = this;
				this[e.id] = new d($.extend({
					containerId: "Sources",
					label: "来源",
					items: this.sourceList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initEngines: function(e) {
				var t = this;
				e.options && e.options.selectedItems && (e.options.selectedItems = e.options.selectedItems.slice(1)),
				this[e.id] = new d($.extend({
					containerId: "Engines",
					label: "搜索引擎",
					items: this.sourceList,
					onchange: function(n, i) {
						n = n.split(","),
						n.unshift("search"),
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initVisitors: function(e) {
				var t = this;
				this[e.id] = new h($.extend({
					containerId: "Visitors",
					label: "访客",
					limit: 1,
					selectedItems: ["all"],
					items: this.visitorList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initVisitors2: function(e) {
				var t = this;
				this[e.id] = new h($.extend({
					containerId: "Visitors2",
					label: "访客",
					items: this.visitorList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initISP: function(e) {
				var t = this;
				this[e.id] = new d($.extend({
					containerId: "ISP",
					label: "网络提供商",
					items: this.ispList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initDomainTypes: function(e) {
				var t = this;
				this[e.id] = new h($.extend({
					containerId: "DomainTypes",
					limit: 1,
					label: "网站类型",
					selectedItems: [0],
					items: this.domainTypeList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initAdProducts: function(e) {
				var t = this;
				this[e.id] = new u($.extend({
					containerId: "AdProducts",
					label: ["推广方式"],
					items: this.adProductList,
					isDynamicChildren: !0,
					onchange: function(n, i, s, o) {
						t.fire(t._getEventName(e.id), n, i, s, o)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initSearch: function(e) {
				var t = this;
				this[e.id] = new p($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initFuzzyQuery: function(e) {
				var t = this;
				this[e.id] = new y($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initDateCompare: function(e) {
				var t = this;
				this[e.id] = new g($.extend({
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n, i)
					}
				},
				e.options))
			},
			_initShortDate: function(e) {
				var t = this;
				this[e.id] = new f($.extend({
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initDate: function(e) {
				var t = this;
				this[e.id] = new m($.extend({
					todayDate: $.holmes.config.pageInfo.ed ? new Date( + $.holmes.config.pageInfo.ed) : "",
					firstDate: $.holmes.config.pageInfo.sd ? new Date( + $.holmes.config.pageInfo.sd) : "",
					startDate: new Date( + $.holmes.config.pageInfo.st),
					endDate: new Date( + $.holmes.config.pageInfo.et),
					otherStartDate: $.holmes.config.pageInfo.st2 ? new Date( + $.holmes.config.pageInfo.st2) : "",
					otherEndDate: $.holmes.config.pageInfo.et2 ? new Date( + $.holmes.config.pageInfo.et2) : "",
					onchange: function(n) {
						t.fire(t._getEventName(e.id), {
							st: this.startDate && this.startDate.getTime(),
							et: this.endDate && this.endDate.getTime(),
							st2: this.otherStartDate && this.otherStartDate.getTime(),
							et2: this.otherEndDate && this.otherEndDate.getTime(),
							id: n
						})
					}
				},
				e.options))
			},
			_initTable: function(e) {
				var n = this,
				i = this.getOriginTransTarget();
				if (i.length && this.context.hasOwnProperty("target") && (this.context.target = i.split(",").pop()), e.options = e.options || {},
				!this.initChart && !e.options.noDataText) {
					var s;
					if (this.siteInfo && (!this.userInfo.roles || !this.userInfo.roles.ico)) {
						s = this.siteInfo.isMultipleSite ? '<div class="empty">暂无数据,请确认<a href="#{url}" target="_blank">代码安装</a>，或站点选择是否正确。</div>': '<div class="empty">本站点的id是#{signature}，请确认<a href="#{url}" target="_blank">代码安装</a>，或站点选择是否正确。<div>';
						var o = {
							signature: this.siteInfo.signature || this.siteInfo.belongSiteSignature,
							url: "http://tongji.baidu.com/web/help/article?id=93&type=0"
						};
						e.options.noDataText = t.format(s, o)
					}
				}
				this[e.id] = new v($.extend({
					containerId: "table",
					order: this.pageInfo.order,
					index: this.indexInfo.indexes[0],
					transTarget: i,
					onchange: function(t) {
						n.fire(n._getEventName(e.id), t)
					},
					onexpand: function(t) {
						n.fire("onexpand" + e.id, t)
					},
					onoperate: function(t) {
						n.fire("onoperate" + e.id, t)
					},
					ontransListChange: function(t) {
						n.fire("ontransListChange" + e.id, t)
					}
				},
				e.options))
			},
			_initSiteSummary: function(e) {
				var t = this;
				this[e.id] = new b($.extend({
					containerId: "site-summary",
					order: this.pageInfo.order,
					index: this.indexInfo.indexes[0],
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					},
					onexpand: function(n) {
						t.fire("onexpand" + e.id, n)
					},
					onoperate: function(n) {
						t.fire("onoperate" + e.id, n)
					},
					ontransListChange: function(n) {
						t.fire("ontransListChange" + e.id, n)
					}
				},
				e.options))
			},
			_initOperations: function(e) {
				var t = this;
				this[e.id] = new w($.extend({
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n, i)
					}
				},
				e.options))
			},
			_initSummary: function(e) {
				this[e.id] = new x($.extend({
					containerId: "summary"
				},
				e.options))
			},
			_initProSummary: function(e) {
				this[e.id] = new C($.extend({
					containerId: "pro-summary"
				},
				e.options))
			},
			_initPaging: function(e) {
				var t = this;
				this[e.id] = new T($.extend({
					containerId: "paging",
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options))
			},
			_initFilterTabs: function(e) {
				$(".advanced-filter").on("click",
				function(e) {
					var t = $(e.target);
					t.toggleClass("up"),
					t.text(t.hasClass("up") ? "收起筛选": "高级筛选"),
					$(".filter-content-wrapper").toggle()
				})
			},
			_initIntelligentAnalytics: function(e) {},
			_initCharacters: function(e) {
				var t = this;
				this[e.id] = new h($.extend({
					containerId: "CharacterIndicatorContainer",
					limit: 1,
					tip: !0,
					label: "访问特征:&nbsp;&nbsp;",
					selectedItems: [this.characterList[0].id],
					items: this.characterList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n, i)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initClients: function(e) {
				var t = this;
				this[e.id] = new h($.extend({
					containerId: "ClientIndicatorContainer",
					limit: 1,
					tip: !0,
					selectedItems: [this.clientList[0].id],
					items: this.clientList,
					onchange: function(n, i) {
						t.fire(t._getEventName(e.id), n, i)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initPlan: function(e) {
				var t = this;
				this[e.id] = new u($.extend({
					containerId: "Plan",
					items: this.planList,
					selectedItems: this.pageInfo.planId ? [this.pageInfo.planId] : [],
					label: ["计划"],
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initUnit: function(e) {
				var t = this;
				this[e.id] = new u($.extend({
					containerId: "Unit",
					items: this.unitList ? this.unitList: [{
						id: -1,
						label: "全部"
					}],
					selectedItems: this.pageInfo.unitId ? [this.pageInfo.unitId] : [],
					label: ["单元"],
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				this[e.id].render()
			},
			_initIndicator: function(e) {
				this[e.id] = new E($.extend({
					indicators: this.indexInfo.indicators,
					indexes: this.indexInfo.indexes
				},
				e.options))
			},
			_initFlashIndicator: function(e) {
				var t = this;
				this[e.id] = new D($.extend({
					containerId: "flash-indicator",
					items: this.indexInfo.flashIndicators,
					selectedItems: this.indexInfo.flashSelected,
					defaultItems: this.indexInfo.defaultFlashSelected,
					limit: this.indexInfo.maxFlashSelectedNumber,
					autoRender: !0,
					onchange: function(n) {
						t.fire(t._getEventName(e.id), n)
					}
				},
				e.options)),
				(this.pageInfo.st2 || this.pageInfo.et2) && this[e.id].showSingleIndicatorContent()
			},
			_initTableIndicator: function(e) {
				var t = this;
				this[e.id] = new k($.extend({
					containerId: "table-indicator",
					items: this.indexInfo.indicators,
					groupNames: this.indexInfo.indicatorGroups,
					selected: this.indexInfo.selected,
					limit: this.indexInfo.maxSelectedNumber,
					defaultSelected: this.indexInfo.defaultSelected,
					extraSelected: this.indexInfo.extraSelected,
					autoRender: !0,
					onchange: function(n, i) {
						i && (t.context.order = i, t.Table.syncSortBehavior(i)),
						t.fire(t._getEventName(e.id), n)
					},
					oncancelChange: function(n) {
						t.fire(t._getEventName(e.id, "oncancelChange"), n)
					}
				},
				e.options))
			},
			_initTip: function(e) {
				$.holmes.Tip && $.holmes.Tip.bindEvent(),
				$.holmes.Tip.loadTips()
			},
			_initDataAdapter: function(e) {
				var t = this;
				this.DataAdapter = new L($.extend({
					onflashError: function(e, n) {
						t.fire("onflashError", e, n)
					},
					onchartError: function(e, n) {
						t.fire("onchartError", e, n)
					}
				},
				e.options))
			},
			_initCombobox: function(e) {
				this.combobox = new N($.extend({
					trigerId: "combobox-container",
					autoRender: !0,
					items: []
				},
				e.options))
			},
			auth: function(e) {
				return this.userInfo.auths[e]
			},
			role: function(e) {
				return this.userInfo.roles[e]
			},
			ajax: function(e, n, i) {
				var s = this;
				n = n || {},
				n.reportId = this.pageInfo.id,
				$.extend(n, {
					method: e.uri,
					queryId: e.queryId || ""
				}),
				s.fire("on" + e.name),
				$.holmes.ajaxJsonPost(this.systemConfig.ajaxUri, n,
				function(o, a) {
					t.isString(e.adapter) && $.isFunction(s.DataAdapter[e.adapter]) && (s.fire("on" + e.adapter, o, {
						postData: n,
						extData: i
					}), o = s.DataAdapter[e.adapter](o), s.fire("after" + e.adapter, o, {
						postData: n,
						extData: i
					})),
					s.fire("on" + e.name + "Success", o, {
						status: a,
						postData: n,
						extData: i
					})
				},
				function(t) {
					$.isFunction(s["on" + e.name + "Failed"]) && s.fire("on" + e.name + "Failed", t)
				})
			},
			download: function(e) {
				$("#download-channel")[0].src = e
			},
			setIndexItem: function(e, t) {
				var n = $.extend(!0, {},
				e);
				for (var i in e) e.hasOwnProperty(i) && delete e[i];
				$.isPlainObject(t) ? $.extend(e, t) : e.label = t,
				e.data = n
			},
			isSpecialWord: function(e) {
				return t.arrayContains(["其他", "未知", "--", "未知（推广页面未装代码或存在跳转导致）"], e)
			},
			getOriginTransTarget: function() {
				var e = [];
				for (var t in $.holmes.config.targetList) {
					var n = $.holmes.config.targetList[t];
					n.selected && e.push(n.id);
					for (var i in n.children) {
						var s = n.children[i];
						s.selected && e.push(s.id)
					}
				}
				return e = e.join(",")
			}
		}),
		$.extend(!0, this, e),
		this._init()
	}
});