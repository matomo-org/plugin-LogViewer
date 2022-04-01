<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<todo>
- get to build
- test in UI
- create PR
</todo>

<template>
  <div class="logViewer">
    <ContentBlock :content-title="translate('LogViewer_LogViewer')">
      <div class="row">
        <div class="logWriters col s4 m3 l2">
          <Field
            uicontrol="select"
            name="logWriter"
            :model-value="selectedLogWriter"
            @update:model-value="selectedLogWriter = $event; update()"
            :full-width="true"
            :options="logWriters"
          >
          </Field>
        </div>
        <div class="severities col s4 m3 l2">
          <Field
            uicontrol="select"
            name="selectedSeverity"
            :model-value="selectedSeverity"
            @update:model-value="selectedSeverity = $event; update()"
            :full-width="true"
            :options="severities"
          >
          </Field>
        </div>
        <div class="col s12 m12 l8">
          <input
            type="text"
            class="search"
            @keydown="onSearchKeydown($event)"
            :title="translate('LogViewer_SearchHelp')"
            v-model="query"
            :placeholder="translate('LogViewer_SearchPattern')"
          >
          <span
            class="icon-search searchIcon"
            :title="translate('General_ClickToSearch')"
            @click="update()"
          />
          <div class="useRegExp">
            <Field
              uicontrol="checkbox"
              :title="translate('LogViewer_UseRegExp')"
              v-model="useRegExp"
            />
          </div>
          <a
            class="icon-reload"
            @click="update()"
          />
          <form
            method="POST"
            id="export"
            ref="export"
            target="_blank"
            :action="exportFormAction"
          >
            <input
              type="hidden"
              name="token_auth"
              :value="tokenAuth"
            />
            <input
              type="hidden"
              name="force_api_session"
              value="1"
            />
            <a
              class="icon-export"
              onclick="this.$refs.submit()"
              :title="translate('LogViewer_ExportThisSearch', 'TSV', 5000)"
            />
          </form>
          <a
            class="icon-info"
            target="_blank"
            href="https://piwik.org/faq/troubleshooting/faq_115/"
            rel="noreferrer noopener"
            :title="translate('LogViewer_CurrentLogConfigIs', logConfigJson)"
          />
          <br />
        </div>
        <table v-content-table>
          <thead>
            <tr>
              <th class="severity">{{ translate('LogViewer_Severity') }}</th>
              <th class="tag">{{ translate('LogViewer_Tag') }}</th>
              <th class="date">{{ translate('General_Date') }}</th>
              <th class="date">{{ translate('LogViewer_RequestId') }}</th>
              <th class="message">{{ translate('LogViewer_Message') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(log, index) in logsWithMessage"
              :key="index"
            >
              <td
                class="severity"
                :title="log.severity ? translate('LogViewer_ClickToSearchForThis') : ''"
                @click="searchSeverity(log.severity)"
                :class="{selectable: log.severity}"
              >{{ log.severity || '-' }}</td>
              <td
                class="tag"
                :title="log.tag ? translate('LogViewer_ClickToSearchForThis') : ''"
                @click="searchText(log.tag)"
                :class="{selectable: log.tag}"
              >{{ log.tag || '-' }}</td>
              <td
                class="date"
                :title="log.datetime ? translate('LogViewer_ClickToSearchForThis') : ''"
                @click="searchDate(log.datetime)"
                :class="{selectable: log.datetime}"
              >{{ log.datetime || '-' }}</td>
              <td
                class="requestId"
                :title="log.requestId ? translate('LogViewer_ClickToSearchForThis') : ''"
                @click="searchRequestId(log.requestId)"
                :class="{selectable: log.requestId}"
              >{{ log.requestId || '-' }}</td>
              <td class="message">{{ log.message }}</td>
            </tr>
            <tr v-if="!isLoading && logs.length === 0">
              <td colspan="5">
                {{ translate('General_SearchNoResults') }}
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="5">
                <span class="loadingPiwik">
                  <img src="plugins/Morpheus/images/loading-blue.gif" />
                  {{ translate('General_Loading') }}
                </span>
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                class="paging"
              >
                <span
                  id="prev"
                  class="previous"
                  @click="previousPage()"
                  v-show="!(page < 1)"
                >
                  <a
                    class="btn"
                    @click.prevent=""
                  ><span>&#xAB; {{ translate('General_Previous') }}</span></a>
                </span>
                <span
                  id="next"
                  class="next pointer"
                  @click="nextPage()"
                  v-show="!(logs.length < 1)"
                >
                  <a
                    class="btn"
                    @click.prevent=""
                  ><span>{{ translate('General_Next') }} &#xBB;</span></a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ContentBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  translate,
  Matomo,
  AjaxHelper,
  ContentBlock,
  ContentTable,
  MatomoUrl, NotificationsStore,
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';

interface Option {
  key: string;
  value: string;
}

interface LogEntry {
  severity: string;
  tag: string;
  datetime: string;
  requestId: string;
  message: string;
}

interface LogViewerState {
  page: number;
  query: string;
  isLoading: boolean;
  logWriters: Option[];
  selectedLogWriter: string;
  useRegExp: boolean;
  severities: Option[];
  selectedSeverity: string;
  fetchLogEntriesAbort: null|AbortController; // TODO: test
  logs?: LogEntry[];
  logConfig?: unknown;
}

declare global {
  interface Window {
    preg_quote(str: string, delimiter?: string): string;
  }
}

export default defineComponent({
  props: {
    limit: {
      type: Number,
      required: true,
    },
  },
  components: {
    ContentBlock,
    Field,
  },
  directives: {
    ContentTable,
  },
  data(): LogViewerState {
    return {
      page: 0,
      query: '',
      isLoading: true,
      logWriters: [],
      selectedLogWriter: '',
      useRegExp: false,
      severities: [
        {
          key: '',
          value: translate('LogViewer_AnySeverity'),
        },
        {
          key: 'DEBUG',
          value: 'DEBUG',
        },
        {
          key: 'INFO',
          value: 'INFO',
        },
        {
          key: 'NOTICE',
          value: 'NOTICE',
        },
        {
          key: 'WARNING',
          value: 'WARNING',
        },
        {
          key: 'ERROR',
          value: 'ERROR',
        },
        {
          key: 'CRITICAL',
          value: 'CRITICAL',
        },
        {
          key: 'ALERT',
          value: 'ALERT',
        },
        {
          key: 'EMERGENCY',
          value: 'EMERGENCY',
        },
      ],
      selectedSeverity: '',
      fetchLogEntriesAbort: null,
    };
  },
  created() {
    AjaxHelper.fetch({
      method: 'LogViewer.getAvailableLogReaders',
    }).then((logWriters) => {
      if (Array.isArray(logWriters)) {
        this.logWriters = logWriters.map((logWriter) => ({
          key: logWriter,
          value: logWriter,
        }));
      }
    }).then(
      () => AjaxHelper.fetch({ method: 'LogViewer.getConfiguredLogReaders' }),
    ).then((logWriters) => {
      if (logWriters?.[0]) {
        [this.selectedLogWriter] = logWriters;
      } else {
        const title = translate('LogViewer_NoSupportedLogWriterConfiguredTitle');
        const message = translate('LogViewer_NoSupportedLogWriterConfiguredMessage', [
          '<a href="https://piwik.org/faq/troubleshooting/faq_115/">',
          '</a>',
          this.logWriters.map((item) => item.value).join(', '),
        ]);

        NotificationsStore.show({
          message,
          title,
          context: 'info',
          noclear: true,
          type: 'transient',
        });

        if (this.logWriters?.[0]) {
          this.selectedLogWriter = this.logWriters[0].value;
        }
      }

      if (this.selectedLogWriter) {
        this.update();
      } else {
        this.isLoading = false;
      }
    });

    AjaxHelper.fetch({
      method: 'LogViewer.getLogConfig',
      filter_limit: '-1',
    }).then((config) => {
      this.logConfig = config;
    });
  },
  methods: {
    update() {
      this.isLoading = true;

      if (this.fetchLogEntriesAbort) {
        this.fetchLogEntriesAbort.abort();
        this.fetchLogEntriesAbort = null;
      }

      this.fetchLogEntriesAbort = new AbortController();

      this.logs = [];
      AjaxHelper.fetch({
        method: 'LogViewer.getLogEntries',
        query: this.buildQuery,
        limitPerPage: this.limit,
        source: this.selectedLogWriter,
        page: this.page,
      }).then((logs) => {
        this.logs = logs;
      }).catch((error) => {
        NotificationsStore.show({
          message: error,
          context: 'error',
          type: 'transient',
        });
      }).finally(() => {
        this.isLoading = false;
        this.fetchLogEntriesAbort = null;
      });
    },
    searchSeverity(severity: string) {
      if (!severity) {
        return;
      }

      this.selectedSeverity = severity.toUpperCase();
      this.update();
    },
    searchDate(datetime: string) {
      if (!datetime) {
        return;
      }

      this.selectedSeverity = '';
      this.query = `\\[${datetime.substr(0, 10)}.{9}\\]`;
      this.useRegExp = true;
      this.update();
    },
    searchRequestId(requestId: string) {
      if (!requestId) {
        return;
      }

      this.searchText(`[${requestId}]`);
    },
    searchText(text: string) {
      if (!text) {
        return;
      }

      this.selectedSeverity = '';
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
      if (this.logs?.length) {
        this.page += 1;
        this.update();
      }
    },
    onSearchKeydown(event: KeyboardEvent) {
      if (event.code !== 'Enter') {
        return;
      }

      this.update();
    },
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
      return `?${MatomoUrl.stringify({
        module: 'API',
        method: 'LogViewer.getLogEntries',
        query: this.buildQuery,
        format: 'TSV',
        page: 0,
        limitPerPage: 5000,
      })}`;
    },
    logConfigJson() {
      return JSON.stringify(this.logConfig || {});
    },
    tokenAuth() {
      return Matomo.token_auth;
    },
    logsWithMessage() {
      return (this.logs || []).filter((l) => l.message);
    },
  },
});
</script>
