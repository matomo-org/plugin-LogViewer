(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("CoreHome"), require("CorePluginsAdmin")) : typeof define === "function" && define.amd ? define(["exports", "vue", "CoreHome", "CorePluginsAdmin"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.LogViewer = {}, global.Vue, global.CoreHome, global.CorePluginsAdmin));
})(this, (function(exports2, vue, CoreHome, CorePluginsAdmin) {
  "use strict";var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  const _sfc_main = vue.defineComponent({
    props: {
      limit: {
        type: Number,
        required: true
      }
    },
    components: {
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field
    },
    directives: {
      ContentTable: CoreHome.ContentTable
    },
    data() {
      return {
        page: 0,
        query: "",
        isLoading: true,
        logWriters: [],
        selectedLogWriter: "",
        useRegExp: false,
        severities: [
          {
            key: "",
            value: CoreHome.translate("LogViewer_AnySeverity")
          },
          {
            key: "DEBUG",
            value: "DEBUG"
          },
          {
            key: "INFO",
            value: "INFO"
          },
          {
            key: "NOTICE",
            value: "NOTICE"
          },
          {
            key: "WARNING",
            value: "WARNING"
          },
          {
            key: "ERROR",
            value: "ERROR"
          },
          {
            key: "CRITICAL",
            value: "CRITICAL"
          },
          {
            key: "ALERT",
            value: "ALERT"
          },
          {
            key: "EMERGENCY",
            value: "EMERGENCY"
          }
        ],
        selectedSeverity: "",
        logs: void 0,
        logConfig: void 0
      };
    },
    setup() {
      let fetchLogEntriesAbort = null;
      const getLogEntries = (params) => {
        if (fetchLogEntriesAbort) {
          fetchLogEntriesAbort.abort();
          fetchLogEntriesAbort = null;
        }
        fetchLogEntriesAbort = new AbortController();
        return CoreHome.AjaxHelper.fetch(
          __spreadProps(__spreadValues({}, params), {
            method: "LogViewer.getLogEntries"
          }),
          {
            abortController: fetchLogEntriesAbort,
            createErrorNotification: false
          }
        ).finally(() => {
          fetchLogEntriesAbort = null;
        });
      };
      return {
        getLogEntries
      };
    },
    created() {
      CoreHome.AjaxHelper.fetch({
        method: "LogViewer.getAvailableLogReaders"
      }).then((logWriters) => {
        if (Array.isArray(logWriters)) {
          this.logWriters = logWriters.map((logWriter) => ({
            key: logWriter,
            value: logWriter
          }));
        }
      }).then(
        () => CoreHome.AjaxHelper.fetch({ method: "LogViewer.getConfiguredLogReaders" })
      ).then((logWriters) => {
        var _a;
        if (logWriters == null ? void 0 : logWriters[0]) {
          [this.selectedLogWriter] = logWriters;
        } else {
          const title = CoreHome.translate("LogViewer_NoSupportedLogWriterConfiguredTitle");
          const message = CoreHome.translate("LogViewer_NoSupportedLogWriterConfiguredMessage", [
            '<a href="https://piwik.org/faq/troubleshooting/faq_115/">',
            "</a>",
            this.logWriters.map((item) => item.value).join(", ")
          ]);
          CoreHome.NotificationsStore.show({
            message,
            title,
            context: "info",
            noclear: true,
            type: "transient"
          });
          if ((_a = this.logWriters) == null ? void 0 : _a[0]) {
            this.selectedLogWriter = this.logWriters[0].value;
          }
        }
        if (this.selectedLogWriter) {
          this.update();
        } else {
          this.isLoading = false;
        }
      });
      CoreHome.AjaxHelper.fetch({
        method: "LogViewer.getLogConfig",
        filter_limit: "-1"
      }).then((config) => {
        this.logConfig = config;
      });
    },
    methods: {
      update() {
        this.isLoading = true;
        this.logs = [];
        this.getLogEntries({
          query: this.buildQuery,
          limitPerPage: this.limit,
          source: this.selectedLogWriter,
          page: this.page
        }).catch((error) => {
          CoreHome.NotificationsStore.show({
            message: error.message || error,
            context: "error",
            type: "transient"
          });
          return [];
        }).then((logs) => {
          this.logs = logs;
        }).finally(() => {
          this.isLoading = false;
        });
      },
      searchSeverity(severity) {
        if (!severity) {
          return;
        }
        this.selectedSeverity = severity.toUpperCase();
        this.update();
      },
      searchDate(datetime) {
        if (!datetime) {
          return;
        }
        this.selectedSeverity = "";
        this.query = `\\[${datetime.substr(0, 10)}.{9}\\]`;
        this.useRegExp = true;
        this.update();
      },
      searchRequestId(requestId) {
        if (!requestId) {
          return;
        }
        this.searchText(`[${requestId}]`);
      },
      searchText(text) {
        if (!text) {
          return;
        }
        this.selectedSeverity = "";
        this.query = text;
        if (this.useRegExp) {
          this.query = window.preg_quote(this.query);
        }
        this.update();
      },
      previousPage() {
        if (this.page > 0) {
          this.page -= 1;
          this.update();
        }
      },
      nextPage() {
        var _a;
        if ((_a = this.logs) == null ? void 0 : _a.length) {
          this.page += 1;
          this.update();
        }
      },
      onSearchKeydown(event) {
        if (event.code !== "Enter") {
          return;
        }
        this.update();
      }
    },
    computed: {
      buildQuery() {
        let { query } = this;
        if (!this.useRegExp) {
          query = window.preg_quote(this.query);
        }
        if (this.selectedSeverity) {
          query = `^${this.selectedSeverity}(.*)${query}`;
        }
        return query;
      },
      exportFormAction() {
        return `?${CoreHome.MatomoUrl.stringify({
          module: "API",
          method: "LogViewer.getLogEntries",
          query: this.buildQuery,
          format: "TSV",
          page: 0,
          limitPerPage: 5e3
        })}`;
      },
      logConfigJson() {
        return JSON.stringify(this.logConfig || {});
      },
      tokenAuth() {
        return CoreHome.Matomo.token_auth;
      },
      logsWithMessage() {
        return (this.logs || []).filter((l) => l.message);
      }
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1 = { class: "logViewer" };
  const _hoisted_2 = { class: "row" };
  const _hoisted_3 = { class: "logWriters col s4 m3 l2" };
  const _hoisted_4 = { class: "severities col s4 m3 l2" };
  const _hoisted_5 = { class: "col s12 m12 l8" };
  const _hoisted_6 = ["title", "placeholder"];
  const _hoisted_7 = ["title"];
  const _hoisted_8 = {
    class: "useRegExp",
    style: { "margin-right": "3.5px" }
  };
  const _hoisted_9 = ["action"];
  const _hoisted_10 = ["value"];
  const _hoisted_11 = ["title"];
  const _hoisted_12 = ["title"];
  const _hoisted_13 = { class: "severity" };
  const _hoisted_14 = { class: "tag" };
  const _hoisted_15 = { class: "date" };
  const _hoisted_16 = { class: "date" };
  const _hoisted_17 = { class: "message" };
  const _hoisted_18 = ["title", "onClick"];
  const _hoisted_19 = ["title", "onClick"];
  const _hoisted_20 = ["title", "onClick"];
  const _hoisted_21 = ["title", "onClick"];
  const _hoisted_22 = { class: "message" };
  const _hoisted_23 = { key: 0 };
  const _hoisted_24 = { colspan: "5" };
  const _hoisted_25 = { colspan: "5" };
  const _hoisted_26 = { class: "loadingPiwik" };
  const _hoisted_27 = {
    colspan: "5",
    class: "paging"
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.createVNode(_component_ContentBlock, {
        "content-title": _ctx.translate("LogViewer_LogViewer")
      }, {
        default: vue.withCtx(() => {
          var _a, _b;
          return [
            vue.createElementVNode("div", _hoisted_2, [
              vue.createElementVNode("div", _hoisted_3, [
                vue.createVNode(_component_Field, {
                  uicontrol: "select",
                  name: "logWriter",
                  "model-value": _ctx.selectedLogWriter,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                    _ctx.selectedLogWriter = $event;
                    _ctx.update();
                  }),
                  "full-width": true,
                  options: _ctx.logWriters
                }, null, 8, ["model-value", "options"])
              ]),
              vue.createElementVNode("div", _hoisted_4, [
                vue.createVNode(_component_Field, {
                  uicontrol: "select",
                  name: "selectedSeverity",
                  "model-value": _ctx.selectedSeverity,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => {
                    _ctx.selectedSeverity = $event;
                    _ctx.update();
                  }),
                  "full-width": true,
                  options: _ctx.severities
                }, null, 8, ["model-value", "options"])
              ]),
              vue.createElementVNode("div", _hoisted_5, [
                vue.withDirectives(vue.createElementVNode("input", {
                  type: "text",
                  class: "search",
                  onKeydown: _cache[2] || (_cache[2] = ($event) => _ctx.onSearchKeydown($event)),
                  title: _ctx.translate("LogViewer_SearchHelp"),
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.query = $event),
                  placeholder: _ctx.translate("LogViewer_SearchPattern"),
                  style: { "margin-right": "3.5px" }
                }, null, 40, _hoisted_6), [
                  [vue.vModelText, _ctx.query]
                ]),
                vue.createElementVNode("span", {
                  class: "icon-search searchIcon",
                  title: _ctx.translate("General_ClickToSearch"),
                  onClick: _cache[4] || (_cache[4] = ($event) => _ctx.update())
                }, null, 8, _hoisted_7),
                vue.createElementVNode("div", _hoisted_8, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "checkbox",
                    title: _ctx.translate("LogViewer_UseRegExp"),
                    modelValue: _ctx.useRegExp,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.useRegExp = $event)
                  }, null, 8, ["title", "modelValue"])
                ]),
                vue.createElementVNode("a", {
                  class: "icon-reload",
                  onClick: _cache[6] || (_cache[6] = ($event) => _ctx.update()),
                  style: { "margin-right": "3.5px" }
                }),
                vue.createElementVNode("form", {
                  method: "POST",
                  id: "export",
                  ref: "export",
                  target: "_blank",
                  action: _ctx.exportFormAction
                }, [
                  vue.createElementVNode("input", {
                    type: "hidden",
                    name: "token_auth",
                    value: _ctx.tokenAuth
                  }, null, 8, _hoisted_10),
                  _cache[12] || (_cache[12] = vue.createElementVNode("input", {
                    type: "hidden",
                    name: "force_api_session",
                    value: "1",
                    style: { "margin-right": "3.5px" }
                  }, null, -1)),
                  vue.createElementVNode("a", {
                    class: "icon-export",
                    onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$refs.export.submit()),
                    title: _ctx.translate("LogViewer_ExportThisSearch", "TSV", "5000"),
                    style: { "margin-right": "3.5px" }
                  }, null, 8, _hoisted_11)
                ], 8, _hoisted_9),
                vue.createElementVNode("a", {
                  class: "icon-info",
                  target: "_blank",
                  href: "https://piwik.org/faq/troubleshooting/faq_115/",
                  rel: "noreferrer noopener",
                  title: _ctx.translate("LogViewer_CurrentLogConfigIs", _ctx.logConfigJson)
                }, null, 8, _hoisted_12),
                _cache[13] || (_cache[13] = vue.createElementVNode("br", null, null, -1))
              ]),
              vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
                vue.createElementVNode("thead", null, [
                  vue.createElementVNode("tr", null, [
                    vue.createElementVNode("th", _hoisted_13, vue.toDisplayString(_ctx.translate("LogViewer_Severity")), 1),
                    vue.createElementVNode("th", _hoisted_14, vue.toDisplayString(_ctx.translate("LogViewer_Tag")), 1),
                    vue.createElementVNode("th", _hoisted_15, vue.toDisplayString(_ctx.translate("General_Date")), 1),
                    vue.createElementVNode("th", _hoisted_16, vue.toDisplayString(_ctx.translate("LogViewer_RequestId")), 1),
                    vue.createElementVNode("th", _hoisted_17, vue.toDisplayString(_ctx.translate("LogViewer_Message")), 1)
                  ])
                ]),
                vue.createElementVNode("tbody", null, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.logsWithMessage, (log, index) => {
                    return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                      vue.createElementVNode("td", {
                        class: vue.normalizeClass(["severity", { selectable: log.severity }]),
                        title: log.severity ? _ctx.translate("LogViewer_ClickToSearchForThis") : "",
                        onClick: ($event) => _ctx.searchSeverity(log.severity)
                      }, vue.toDisplayString(log.severity || "-"), 11, _hoisted_18),
                      vue.createElementVNode("td", {
                        class: vue.normalizeClass(["tag", { selectable: log.tag }]),
                        title: log.tag ? _ctx.translate("LogViewer_ClickToSearchForThis") : "",
                        onClick: ($event) => _ctx.searchText(log.tag)
                      }, vue.toDisplayString(log.tag || "-"), 11, _hoisted_19),
                      vue.createElementVNode("td", {
                        class: vue.normalizeClass(["date", { selectable: log.datetime }]),
                        title: log.datetime ? _ctx.translate("LogViewer_ClickToSearchForThis") : "",
                        onClick: ($event) => _ctx.searchDate(log.datetime)
                      }, vue.toDisplayString(log.datetime || "-"), 11, _hoisted_20),
                      vue.createElementVNode("td", {
                        class: vue.normalizeClass(["requestId", { selectable: log.requestId }]),
                        title: log.requestId ? _ctx.translate("LogViewer_ClickToSearchForThis") : "",
                        onClick: ($event) => _ctx.searchRequestId(log.requestId)
                      }, vue.toDisplayString(log.requestId || "-"), 11, _hoisted_21),
                      vue.createElementVNode("td", _hoisted_22, vue.toDisplayString(log.message), 1)
                    ]);
                  }), 128)),
                  !_ctx.isLoading && ((_a = _ctx.logs) == null ? void 0 : _a.length) === 0 ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_23, [
                    vue.createElementVNode("td", _hoisted_24, vue.toDisplayString(_ctx.translate("General_SearchNoResults")), 1)
                  ])) : vue.createCommentVNode("", true),
                  vue.withDirectives(vue.createElementVNode("tr", null, [
                    vue.createElementVNode("td", _hoisted_25, [
                      vue.createElementVNode("span", _hoisted_26, [
                        _cache[14] || (_cache[14] = vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1)),
                        vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_Loading")), 1)
                      ])
                    ])
                  ], 512), [
                    [vue.vShow, _ctx.isLoading]
                  ]),
                  vue.createElementVNode("tr", null, [
                    vue.createElementVNode("td", _hoisted_27, [
                      vue.withDirectives(vue.createElementVNode("span", {
                        id: "prev",
                        class: "previous",
                        onClick: _cache[9] || (_cache[9] = ($event) => _ctx.previousPage())
                      }, [
                        vue.createElementVNode("a", {
                          class: "btn",
                          onClick: _cache[8] || (_cache[8] = vue.withModifiers(() => {
                          }, ["prevent"]))
                        }, [
                          vue.createElementVNode("span", null, "« " + vue.toDisplayString(_ctx.translate("General_Previous")), 1)
                        ])
                      ], 512), [
                        [vue.vShow, !(_ctx.page < 1)]
                      ]),
                      vue.withDirectives(vue.createElementVNode("span", {
                        id: "next",
                        class: "next pointer",
                        onClick: _cache[11] || (_cache[11] = ($event) => _ctx.nextPage())
                      }, [
                        vue.createElementVNode("a", {
                          class: "btn",
                          onClick: _cache[10] || (_cache[10] = vue.withModifiers(() => {
                          }, ["prevent"]))
                        }, [
                          vue.createElementVNode("span", null, vue.toDisplayString(_ctx.translate("General_Next")) + " »", 1)
                        ])
                      ], 512), [
                        [vue.vShow, !((((_b = _ctx.logs) == null ? void 0 : _b.length) || 0) < 1)]
                      ])
                    ])
                  ])
                ])
              ])), [
                [_directive_content_table]
              ])
            ])
          ];
        }),
        _: 1
      }, 8, ["content-title"])
    ]);
  }
  const LogViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  exports2.LogViewer = LogViewer;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
